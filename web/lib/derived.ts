/**
 * Computes derived data from call analysis results.
 * Updates agent_progress, agent_badges, and feed_entries.
 */

import { getDb } from "./db";
import type { AnalysisResult, CategoryTier, FeedType } from "./types";
import crypto from "crypto";

const LEVEL_THRESHOLDS: Record<number, { name: string; xp: number }> = {
  1: { name: "Green Light", xp: 0 },
  2: { name: "Listener", xp: 500 },
  3: { name: "Reader", xp: 1000 },
  4: { name: "Builder", xp: 1500 },
  5: { name: "Shifter", xp: 2500 },
  6: { name: "Closer", xp: 4000 },
  7: { name: "Architect", xp: 6000 },
  8: { name: "Master Certified", xp: 10000 },
};

function getTier(score: number, maxScore: number): CategoryTier {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  if (pct >= 80) return "Sharp";
  if (pct >= 50) return "Proficient";
  return "Developing";
}

function getLevelForXP(xp: number): { level: number; name: string } {
  let result = { level: 1, name: "Green Light" };
  for (const [level, data] of Object.entries(LEVEL_THRESHOLDS)) {
    if (xp >= data.xp) {
      result = { level: Number(level), name: data.name };
    }
  }
  return result;
}

export function computeAgentProgress(agentId: string) {
  const db = getDb();

  // Get last 5 completed calls for this agent
  const recentCalls = db
    .prepare(
      "SELECT display_score FROM calls WHERE agent_id = ? AND status = 'complete' ORDER BY call_date DESC LIMIT 5"
    )
    .all(agentId) as { display_score: number }[];

  const totalCalls = db
    .prepare(
      "SELECT COUNT(*) as count FROM calls WHERE agent_id = ? AND status = 'complete'"
    )
    .get(agentId) as { count: number };

  // Compute average
  const avgScore =
    recentCalls.length > 0
      ? recentCalls.reduce((sum, c) => sum + (c.display_score || 0), 0) /
        recentCalls.length
      : null;

  // Compute trend (compare last 5 vs previous 5)
  let trend: "up" | "down" | "flat" = "flat";
  if (recentCalls.length >= 3) {
    const prev = db
      .prepare(
        "SELECT display_score FROM calls WHERE agent_id = ? AND status = 'complete' ORDER BY call_date DESC LIMIT 5 OFFSET 5"
      )
      .all(agentId) as { display_score: number }[];

    if (prev.length >= 2) {
      const prevAvg =
        prev.reduce((s, c) => s + (c.display_score || 0), 0) / prev.length;
      if (avgScore !== null) {
        if (avgScore > prevAvg + 3) trend = "up";
        else if (avgScore < prevAvg - 3) trend = "down";
      }
    }
  }

  // XP: 100 per call + bonus for high scores
  const xp = totalCalls.count * 100 + recentCalls.filter((c) => c.display_score >= 80).length * 50;
  const { level, name } = getLevelForXP(xp);

  db.prepare(
    `UPDATE agent_progress
     SET total_xp = ?, current_level = ?, current_level_name = ?,
         avg_score_last5 = ?, score_trend = ?, updated_at = datetime('now')
     WHERE agent_id = ?`
  ).run(xp, level, name, avgScore, trend, agentId);
}

export function computeBadges(agentId: string, analysis: AnalysisResult) {
  const db = getDb();

  for (const cat of analysis.categories) {
    const tier = getTier(cat.score, cat.max_score);

    db.prepare(
      `INSERT INTO agent_badges (agent_id, category, tier, score, max_score, updated_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))
       ON CONFLICT(agent_id, category) DO UPDATE SET
         tier = excluded.tier,
         score = excluded.score,
         max_score = excluded.max_score,
         updated_at = excluded.updated_at`
    ).run(agentId, cat.name, tier, cat.score, cat.max_score);
  }
}

export function generateFeedEntries(
  agentId: string,
  callId: string,
  analysis: AnalysisResult
) {
  const db = getDb();

  const entries: Array<{
    type: FeedType;
    content: string;
    href: string | null;
    expanded: string | null;
  }> = [];

  // Failure pattern alerts
  for (const pat of analysis.failure_patterns) {
    entries.push({
      type: "pattern_flagged",
      content: `Pattern flagged: ${pat.pattern_name}`,
      href: `/report/${callId}#failure-patterns`,
      expanded: pat.description,
    });
  }

  // High score = personal best check
  const prev = db
    .prepare(
      "SELECT MAX(display_score) as max_score FROM calls WHERE agent_id = ? AND status = 'complete' AND id != ?"
    )
    .get(agentId, callId) as { max_score: number | null };

  if (prev.max_score !== null && analysis.display_score > prev.max_score) {
    entries.push({
      type: "personal_best",
      content: `New personal best: ${analysis.display_score}/100`,
      href: `/report/${callId}`,
      expanded: null,
    });
  }

  // Coaching insight from Closer's Edge
  if (analysis.closers_edge) {
    entries.push({
      type: "surprise_insight",
      content: analysis.closers_edge.slice(0, 120) + (analysis.closers_edge.length > 120 ? "..." : ""),
      href: `/report/${callId}`,
      expanded: analysis.closers_edge,
    });
  }

  const insertFeed = db.prepare(
    `INSERT INTO feed_entries (id, agent_id, type, content, related_href, expanded_content)
     VALUES (?, ?, ?, ?, ?, ?)`
  );

  for (const entry of entries) {
    insertFeed.run(
      crypto.randomUUID(),
      agentId,
      entry.type,
      entry.content,
      entry.href,
      entry.expanded
    );
  }
}
