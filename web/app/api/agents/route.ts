import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();

  // Return active agents (for upload dropdown and manager views)
  const agents = db
    .prepare(
      `SELECT u.id, u.name, u.email, u.role, u.is_active, u.joined_date,
              ap.current_level, ap.current_level_name, ap.avg_score_last5, ap.score_trend,
              (SELECT COUNT(*) FROM calls WHERE agent_id = u.id AND status = 'complete') as total_calls,
              (SELECT call_date FROM calls WHERE agent_id = u.id AND status = 'complete' ORDER BY call_date DESC LIMIT 1) as last_analyzed_date,
              (SELECT classification FROM calls WHERE agent_id = u.id AND status = 'complete' ORDER BY call_date DESC LIMIT 1) as last_classification
       FROM users u
       LEFT JOIN agent_progress ap ON u.id = ap.agent_id
       WHERE u.role = 'agent' AND u.is_active = 1
       ORDER BY u.name`
    )
    .all();

  return NextResponse.json({ agents });
}
