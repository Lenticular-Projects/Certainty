/**
 * PDF text extraction and JSON parsing — client-side
 * Ported from claude-prototypes/manager-dashboard.html
 *
 * Uses PDF.js loaded via CDN script tag.
 * Supports both pre-analyzed PDFs (containing JSON) and raw transcripts.
 */

declare const pdfjsLib: {
  getDocument: (params: { data: ArrayBuffer }) => {
    promise: Promise<{
      numPages: number;
      getPage: (n: number) => Promise<{
        getTextContent: () => Promise<{
          items: Array<{ str: string }>;
        }>;
      }>;
    }>;
  };
};

export async function extractPdfText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((s) => s.str).join(" ");
  }
  return text;
}

export function extractTextFromPlain(file: File): Promise<string> {
  return file.text();
}

export function cleanAndParse(text: string): Record<string, unknown> | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    return null; // No JSON found — treat as raw transcript
  }

  let slice = text.slice(start, end + 1);

  // Try parsing as-is first (clean PDFs)
  try {
    return JSON.parse(slice);
  } catch {
    // fall through
  }

  // Collapse whitespace artifacts introduced by PDF text extraction
  slice = slice
    .replace(/\s+/g, " ")
    .replace(/,\s*\}/g, "}")
    .replace(/,\s*\]/g, "]");

  try {
    return JSON.parse(slice);
  } catch {
    return null; // Couldn't parse — treat as raw transcript
  }
}
