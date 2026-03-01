import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const agentId = url.searchParams.get("agent_id");
  const limit = parseInt(url.searchParams.get("limit") || "20");

  const db = getDb();

  let query =
    "SELECT id, agent_id, agent_name, call_date, call_type, classification, display_score, status, created_at FROM calls WHERE status = 'complete'";
  const params: unknown[] = [];

  if (user.role === "agent") {
    query += " AND agent_id = ?";
    params.push(user.id);
  } else if (agentId) {
    query += " AND agent_id = ?";
    params.push(agentId);
  }

  query += " ORDER BY call_date DESC LIMIT ?";
  params.push(limit);

  const calls = db.prepare(query).all(...params);

  return NextResponse.json({ calls });
}
