import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  const user = await getSessionUser();
  if (!user || user.role !== "manager") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const db = getDb();

  // Get all completed calls and extract failure patterns
  const calls = db
    .prepare(
      "SELECT analysis_json FROM calls WHERE status = 'complete' AND analysis_json IS NOT NULL"
    )
    .all() as { analysis_json: string }[];

  const patternCounts: Record<string, { agents: Set<string>; count: number }> = {};

  for (const call of calls) {
    try {
      const analysis = JSON.parse(call.analysis_json);
      const patterns = analysis.failure_patterns || [];
      for (const pat of patterns) {
        const name = pat.pattern_name || pat.name;
        if (!name) continue;
        if (!patternCounts[name]) {
          patternCounts[name] = { agents: new Set(), count: 0 };
        }
        patternCounts[name].count++;
        if (analysis.agent_id) patternCounts[name].agents.add(analysis.agent_id);
      }
    } catch {
      // skip invalid JSON
    }
  }

  const topPatterns = Object.entries(patternCounts)
    .map(([name, data]) => ({
      name,
      agent_count: data.agents.size,
      call_count: data.count,
    }))
    .sort((a, b) => b.call_count - a.call_count)
    .slice(0, 6);

  return NextResponse.json({ top_patterns: topPatterns });
}
