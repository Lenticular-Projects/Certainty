import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();

  const call = db
    .prepare("SELECT * FROM calls WHERE id = ?")
    .get(id) as Record<string, unknown> | undefined;

  if (!call) {
    return NextResponse.json({ error: "Call not found" }, { status: 404 });
  }

  // Agents can only see their own calls
  if (user.role === "agent" && call.agent_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Parse the stored JSON
  const analysisJson = call.analysis_json
    ? JSON.parse(call.analysis_json as string)
    : null;

  return NextResponse.json({
    id: call.id,
    agent_id: call.agent_id,
    agent_name: call.agent_name,
    call_date: call.call_date,
    call_type: call.call_type,
    classification: call.classification,
    display_score: call.display_score,
    status: call.status,
    created_at: call.created_at,
    analysis_result: analysisJson,
  });
}
