import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  // Agents can only see their own progress
  if (user.role === "agent" && user.id !== id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const db = getDb();
  const progress = db
    .prepare("SELECT * FROM agent_progress WHERE agent_id = ?")
    .get(id);

  if (!progress) {
    return NextResponse.json({
      agent_id: id,
      total_xp: 0,
      current_level: 1,
      current_level_name: "Green Light",
      avg_score_last5: null,
      score_trend: "flat",
      focus_categories: [],
    });
  }

  const p = progress as Record<string, unknown>;
  return NextResponse.json({
    ...p,
    focus_categories: JSON.parse((p.focus_categories as string) || "[]"),
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (user.role === "agent" && user.id !== id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const db = getDb();

  if (body.focus_categories !== undefined) {
    const cats = Array.isArray(body.focus_categories) ? body.focus_categories.slice(0, 2) : [];
    db.prepare(
      "UPDATE agent_progress SET focus_categories = ?, updated_at = datetime('now') WHERE agent_id = ?"
    ).run(JSON.stringify(cats), id);
  }

  return NextResponse.json({ ok: true });
}
