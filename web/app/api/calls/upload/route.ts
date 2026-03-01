import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { validateAnalysisResult } from "@/lib/validators";
import { computeAgentProgress, computeBadges, generateFeedEntries } from "@/lib/derived";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role !== "manager") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { agent_id, call_date, analysis } = body;

    if (!agent_id || !call_date || !analysis) {
      return NextResponse.json(
        { error: "agent_id, call_date, and analysis are required" },
        { status: 400 }
      );
    }

    // Validate analysis data
    const validation = validateAnalysisResult(analysis);
    if (!validation.valid) {
      return NextResponse.json(
        { error: "Invalid analysis data", details: validation.errors },
        { status: 400 }
      );
    }

    const result = validation.result;
    const db = getDb();

    // Get agent name
    const agent = db
      .prepare("SELECT name FROM users WHERE id = ? AND role = 'agent'")
      .get(agent_id) as { name: string } | undefined;

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Determine call type from analysis metadata
    const callMeta = analysis.call_metadata as Record<string, unknown> | undefined;
    const callType = (callMeta?.primary_call_type as string) || (analysis.call_type as string) || "Unknown";

    const callId = crypto.randomUUID();

    db.prepare(
      `INSERT INTO calls (id, agent_id, agent_name, call_date, call_type, classification, display_score, raw_score, status, analysis_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'complete', ?)`
    ).run(
      callId,
      agent_id,
      agent.name,
      call_date,
      callType,
      result.classification,
      result.display_score,
      result.raw_score,
      JSON.stringify(result)
    );

    // Compute derived data
    computeAgentProgress(agent_id);
    computeBadges(agent_id, result);
    generateFeedEntries(agent_id, callId, result);

    return NextResponse.json({ call_id: callId, score: result.display_score });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
