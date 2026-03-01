"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./page.module.css";

interface Progress {
  total_xp: number;
  current_level: number;
  current_level_name: string;
  avg_score_last5: number | null;
  score_trend: string;
  focus_categories: string[];
}

interface Badge {
  category: string;
  tier: string;
  score: number;
  max_score: number;
}

interface FeedEntry {
  id: string;
  type: string;
  content: string;
  related_href: string | null;
  expanded_content: string | null;
  created_at: string;
}

const LEVEL_XP: Record<number, number> = {
  1: 500, 2: 1000, 3: 1500, 4: 2500, 5: 4000, 6: 6000, 7: 10000, 8: 15000,
};

const BADGE_DESCRIPTIONS: Record<string, string> = {
  "Signal Reading": "Reading the three signals",
  "Math Breakdown": "Comparing plans in live numbers",
  "Objection Handling": "Turning resistance into movement",
  "Client Gold": "Using client language as leverage",
  "Communication": "Clarity and professionalism",
  "Close Confirmation": "Securing the enrollment decision",
};

export default function DashboardContent() {
  const [agentId, setAgentId] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [feed, setFeed] = useState<FeedEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Resolve agent ID: first agent from the DB
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/agents");
        const data = await res.json();
        if (data.agents?.length > 0) {
          setAgentId(data.agents[0].id);
        } else {
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    })();
  }, []);

  const fetchData = useCallback(async () => {
    if (!agentId) return;
    try {
      const [progRes, badgesRes, feedRes] = await Promise.all([
        fetch(`/api/agents/${agentId}/progress`),
        fetch(`/api/agents/${agentId}/badges`),
        fetch(`/api/agents/${agentId}/feed`),
      ]);
      const progData = await progRes.json();
      const badgesData = await badgesRes.json();
      const feedData = await feedRes.json();
      setProgress(progData);
      setBadges(badgesData.badges || []);
      setFeed(feedData.entries || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFocusToggle = useCallback(
    async (category: string) => {
      if (!agentId || !progress) return;
      let cats = [...progress.focus_categories];
      if (cats.includes(category)) {
        cats = cats.filter((c) => c !== category);
      } else {
        if (cats.length >= 2) cats.shift(); // FIFO
        cats.push(category);
      }
      setProgress({ ...progress, focus_categories: cats });
      await fetch(`/api/agents/${agentId}/progress`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ focus_categories: cats }),
      });
    },
    [agentId, progress]
  );

  const score = progress?.avg_score_last5 ?? 0;
  const scoreRound = Math.round(score);
  const hasData = score > 0;
  const circumference = 2 * Math.PI * 30;
  const dashOffset = hasData ? circumference * (1 - score / 100) : circumference;

  const xpToNext = LEVEL_XP[progress?.current_level || 1] || 500;
  const xpPct = progress ? Math.min((progress.total_xp / xpToNext) * 100, 100) : 0;

  // Find the coaching insight for Closer's Edge
  const closersEdgeEntry = feed.find((f) => f.type === "surprise_insight");
  const patternEntry = feed.find((f) => f.type === "pattern_flagged");

  const trendIcon = progress?.score_trend === "up" ? "↑" : progress?.score_trend === "down" ? "↓" : "→";

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (loading) return null;

  return (
    <>
      {/* Col 2 — Ink panel: Your Focus */}
      <div className={styles.colPanel}>
        <p className={styles.panelEyebrow}>Your Focus</p>
        <p className={styles.focusSubtitle}>
          Select up to 2 categories to prioritize this week
        </p>

        <div className={styles.catList}>
          {badges.map((badge) => {
            const isFocused = progress?.focus_categories.includes(badge.category);
            const tierClass =
              badge.tier === "Sharp"
                ? styles.sharp
                : badge.tier === "Proficient"
                  ? styles.proficient
                  : styles.developing;
            return (
              <div
                key={badge.category}
                className={`${styles.catItem} ${isFocused ? styles.focused : ""}`}
                onClick={() => handleFocusToggle(badge.category)}
              >
                <span className={`${styles.catDot} ${tierClass}`} />
                <div className={styles.catBody}>
                  <div className={styles.catName}>{badge.category}</div>
                </div>
                <span className={styles.catScore}>
                  {badge.score}/{badge.max_score}
                </span>
              </div>
            );
          })}
        </div>

        <div className={styles.panelSep} />

        {/* Pattern Alert */}
        {patternEntry && (
          <div className={styles.patternAlert}>
            <p className={styles.paEyebrow}>Pattern Alert</p>
            <div className={styles.paPill}>
              <span className={styles.paPillDot} />
              {patternEntry.content.replace("Pattern flagged: ", "")}
            </div>
            <div className={styles.paLinks}>
              <Link className={styles.paLink} href="/hub">
                Study →
              </Link>
              {patternEntry.related_href && (
                <Link className={styles.paLink} href={patternEntry.related_href}>
                  See call →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Level + XP */}
        <div className={styles.panelLevel}>
          <p className={styles.plEyebrow}>Your Level</p>
          <p className={styles.plName}>
            L{progress?.current_level || 1} — {progress?.current_level_name || "Green Light"}
          </p>
          <div className={styles.xpTrack}>
            <div className={styles.xpBar} style={{ width: `${xpPct}%` }} />
          </div>
          <p className={styles.xpLabel}>
            {progress?.total_xp || 0} / {xpToNext} XP
          </p>
        </div>
      </div>

      {/* Col 3 — Terracotta hero */}
      <div className={styles.colMain}>
        <div className={styles.mainHeader}>
          <span className={styles.mhTitle}>Dashboard</span>
          <span className={styles.mhDate}>{today}</span>
        </div>

        {/* Left: Closer's Edge */}
        <div className={styles.mainLeft}>
          <div className={styles.coachCard}>
            <p className={styles.ccAiLabel}>AI Coaching Note — from your last call</p>
            <div className={styles.ccLabel}>
              <span className={styles.ccDot} />
              <span className={styles.ccEyebrow}>The Closer&apos;s Edge</span>
            </div>
            {closersEdgeEntry ? (
              <>
                <p className={styles.ccQuote}>
                  &ldquo;{closersEdgeEntry.expanded_content || closersEdgeEntry.content}&rdquo;
                </p>
                {closersEdgeEntry.related_href && (
                  <Link
                    href={closersEdgeEntry.related_href}
                    style={{
                      display: "block",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "var(--mustard)",
                      paddingBottom: "16px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    View full report →
                  </Link>
                )}
              </>
            ) : (
              <p className={styles.ccBody}>
                Your coaching insights will appear here after your first call is reviewed.
              </p>
            )}
          </div>
        </div>

        {/* Right: Score */}
        <div className={styles.mainRight}>
          <div className={styles.scoreWatermark}>{hasData ? scoreRound : "—"}</div>
          <div className={styles.scoreDisplay}>
            <span className={styles.scoreGiant}>{hasData ? scoreRound : "—"}</span>
            <div className={styles.scoreRingWrap}>
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle
                  cx="36" cy="36" r="30"
                  fill="none"
                  stroke="rgba(26,13,8,0.12)"
                  strokeWidth="5"
                />
                <circle
                  cx="36" cy="36" r="30"
                  fill="none"
                  stroke="var(--tc-text)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90 36 36)"
                  style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                />
              </svg>
              <span className={styles.scoreDenom}>/100</span>
            </div>
            <div className={styles.scoreLabelStack}>
              <span className={styles.scoreLabel}>Certainty Score</span>
              <span className={styles.scoreDesc}>Last 5 calls</span>
            </div>
            {hasData && (
              <div className={styles.scoreBadge}>
                <span>{trendIcon}</span> {progress?.score_trend || "flat"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2 — Category badges */}
      <div className={styles.colBadges}>
        {badges.map((badge) => {
          const tierLower = badge.tier.toLowerCase();
          return (
            <div
              key={badge.category}
              className={`${styles.badgeCell} ${styles[tierLower] || ""}`}
            >
              <p className={styles.badgeName}>{badge.category}</p>
              <p className={styles.badgeTier}>{badge.tier}</p>
              <p className={styles.badgeDesc}>
                {BADGE_DESCRIPTIONS[badge.category] || ""}
              </p>
            </div>
          );
        })}
      </div>

      {/* Row 3 — Feed */}
      <div className={styles.colData}>
        {feed.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {feed.slice(0, 5).map((entry) => (
              <div
                key={entry.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 0",
                  borderBottom: "var(--rule-lt)",
                  fontSize: "11.5px",
                  color: "rgba(19,17,16,0.65)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    background:
                      entry.type === "pattern_flagged"
                        ? "var(--terracotta)"
                        : entry.type === "personal_best"
                          ? "var(--mustard)"
                          : "var(--sage)",
                  }}
                />
                {entry.related_href ? (
                  <Link href={entry.related_href} style={{ color: "inherit" }}>
                    {entry.content}
                  </Link>
                ) : (
                  <span>{entry.content}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.dataPlaceholder}>
            Coaching insights appear here after your first analyzed call.
          </div>
        )}
      </div>
    </>
  );
}
