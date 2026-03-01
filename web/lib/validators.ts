/**
 * Validates an analysis result object against the LLM Analysis Response Schema
 * from cs_api_contract.md (lines 531-667).
 */

import type { AnalysisResult } from "./types";

const VALID_CLASSIFICATIONS = [
  "enrolled",
  "missed_opportunity",
  "unclosable",
  "correct_no_sale",
];

interface ValidationError {
  field: string;
  message: string;
}

export function validateAnalysisResult(
  data: Record<string, unknown>
): { valid: true; result: AnalysisResult } | { valid: false; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  // Classification
  if (!data.classification || !VALID_CLASSIFICATIONS.includes(data.classification as string)) {
    errors.push({
      field: "classification",
      message: `Must be one of: ${VALID_CLASSIFICATIONS.join(", ")}`,
    });
  }

  // Scores
  if (typeof data.display_score !== "number" && typeof data.raw_score !== "number") {
    // Try pillar_scores.total for backward compat
    const ps = data.pillar_scores as Record<string, unknown> | undefined;
    if (!ps || typeof ps.total !== "number") {
      errors.push({ field: "display_score", message: "Must be a number" });
    }
  }

  // Closer's Edge
  if (typeof data.closers_edge !== "string" || !data.closers_edge) {
    errors.push({ field: "closers_edge", message: "Must be a non-empty string" });
  }

  // Executive Summary
  if (typeof data.executive_summary !== "string" || !data.executive_summary) {
    errors.push({ field: "executive_summary", message: "Must be a non-empty string" });
  }

  // Categories (should be array of 6)
  if (!Array.isArray(data.categories) || data.categories.length === 0) {
    errors.push({ field: "categories", message: "Must be a non-empty array" });
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Normalize the result
  const ps = data.pillar_scores as Record<string, unknown> | undefined;
  const displayScore =
    typeof data.display_score === "number"
      ? data.display_score
      : typeof data.raw_score === "number"
        ? data.raw_score
        : typeof ps?.total === "number"
          ? (ps.total as number)
          : 0;

  const result: AnalysisResult = {
    classification: data.classification as AnalysisResult["classification"],
    root_cause: (data.root_cause as AnalysisResult["root_cause"]) || null,
    raw_score: (data.raw_score as number) ?? displayScore,
    display_score: displayScore,
    closers_edge: data.closers_edge as string,
    recovery_line: (data.recovery_line as string) || null,
    executive_summary: data.executive_summary as string,
    categories: (data.categories as AnalysisResult["categories"]) || [],
    signal_audit: (data.signal_audit as AnalysisResult["signal_audit"]) || {
      signal_detected: "GREEN",
      signal_correct: true,
      signal_reading_notes: "",
      moments: [],
    },
    math_breakdown: (data.math_breakdown as AnalysisResult["math_breakdown"]) || (data.mathematical_pivot as AnalysisResult["math_breakdown"]) || {
      completed: false,
      steps_completed: [],
      steps_missed: [],
      notes: "",
    },
    objections: (data.objections as AnalysisResult["objections"]) || (data.objection_handling as AnalysisResult["objections"]) || [],
    failure_patterns: (data.failure_patterns as AnalysisResult["failure_patterns"]) || [],
    client_gold: (data.client_gold as AnalysisResult["client_gold"]) || (data.client_gold_audit as AnalysisResult["client_gold"]) || [],
    annotated_transcript: (data.annotated_transcript as string) || (data.transcript_annotated as string) || "",
  };

  return { valid: true, result };
}
