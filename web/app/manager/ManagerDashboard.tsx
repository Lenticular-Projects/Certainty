"use client";

import { useState, useEffect, useCallback } from "react";
import UploadSlideover from "@/components/UploadSlideover";
import EmptyState from "@/components/EmptyState";
import styles from "./page.module.css";

interface AgentRow {
  id: string;
  name: string;
  current_level_name: string | null;
  avg_score_last5: number | null;
  score_trend: string | null;
  total_calls: number;
  last_analyzed_date: string | null;
}

interface PatternRow {
  name: string;
  call_count: number;
}

function getStatusClass(agent: AgentRow): string {
  if (agent.total_calls === 0) return "new";
  if (!agent.last_analyzed_date) return "dormant";
  const daysSince = Math.floor(
    (Date.now() - new Date(agent.last_analyzed_date).getTime()) / 86400000
  );
  if (daysSince > 14) return "dormant";
  if (agent.avg_score_last5 !== null && agent.avg_score_last5 < 55) return "warning";
  return "active";
}

function getTopPattern(agentId: string, calls: Array<{ agent_id: string; analysis_json: string }>): string {
  const agentCalls = calls.filter((c) => c.agent_id === agentId);
  const patterns: Record<string, number> = {};
  for (const call of agentCalls) {
    try {
      const analysis = JSON.parse(call.analysis_json);
      for (const p of analysis.failure_patterns || []) {
        const name = p.pattern_name || p.name;
        if (name) patterns[name] = (patterns[name] || 0) + 1;
      }
    } catch { /* skip */ }
  }
  const sorted = Object.entries(patterns).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] || "—";
}

export default function ManagerDashboard() {
  const [agents, setAgents] = useState<AgentRow[]>([]);
  const [patterns, setPatterns] = useState<PatternRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [slideoverOpen, setSlideoverOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [agentsRes, patternsRes] = await Promise.all([
        fetch("/api/agents"),
        fetch("/api/analytics/team-patterns"),
      ]);
      const agentsData = await agentsRes.json();
      const patternsData = await patternsRes.json();
      setAgents(agentsData.agents || []);
      setPatterns(patternsData.top_patterns || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const hasData = agents.some((a) => a.total_calls > 0);
  const maxPatternCount = patterns.length > 0 ? Math.max(...patterns.map((p) => p.call_count)) : 1;

  const formatDate = (d: string | null) => {
    if (!d) return "—";
    try {
      return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return d;
    }
  };

  return (
    <>
      {/* Col 2 — Ink panel */}
      <div className={styles.colPanel}>
        <p className={styles.panelEyebrow}>Team</p>
        <div className={styles.agentList}>
          {agents.map((agent) => {
            const status = getStatusClass(agent);
            return (
              <div
                key={agent.id}
                className={`${styles.agentItem} ${styles[status] || ""}`}
              >
                <span className={`${styles.statusDot} ${styles[status] || ""}`} />
                <div className={styles.agentBody}>
                  <div className={styles.agentName}>{agent.name}</div>
                  <div className={styles.agentLevel}>
                    {agent.current_level_name || "New"}
                  </div>
                </div>
              </div>
            );
          })}
          {agents.length === 0 && !loading && (
            <div className={styles.agentItem}>
              <div className={styles.agentBody}>
                <div className={styles.agentLevel}>No agents found</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Col 3 — Cream main */}
      <div className={styles.colMain}>
        <div className={styles.mainHeader}>
          <span className={styles.mhTitle}>Manager Dashboard</span>
          <button
            className={styles.uploadCta}
            onClick={() => setSlideoverOpen(true)}
          >
            Upload Call
          </button>
        </div>

        <div className={styles.mainContent}>
          {/* Team table */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Team Overview</h2>
            {hasData ? (
              <div className={styles.tableWrap}>
                <table className={styles.teamTable}>
                  <thead>
                    <tr>
                      <th>Agent</th>
                      <th>Level</th>
                      <th>Avg Score</th>
                      <th>Calls</th>
                      <th>Last Analyzed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent) => (
                      <tr key={agent.id}>
                        <td className={styles.tdName}>{agent.name}</td>
                        <td>{agent.current_level_name || "—"}</td>
                        <td>
                          {agent.avg_score_last5 !== null
                            ? Math.round(agent.avg_score_last5)
                            : "—"}
                        </td>
                        <td>{agent.total_calls}</td>
                        <td>{formatDate(agent.last_analyzed_date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                message="No agents have analyzed calls yet."
                sub="Upload a call to get started."
              />
            )}
          </div>

          {/* Pattern Radar */}
          {patterns.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Pattern Radar</h2>
              <p className={styles.sectionSubtitle}>
                Frequency of failure patterns across team
              </p>
              <div className={styles.radarBars}>
                {patterns.map((bar) => (
                  <div key={bar.name} className={styles.radarRow}>
                    <span className={styles.radarLabel}>{bar.name}</span>
                    <div className={styles.radarTrack}>
                      <div
                        className={styles.radarBar}
                        style={{
                          width: `${(bar.call_count / maxPatternCount) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <UploadSlideover
        open={slideoverOpen}
        onClose={() => {
          setSlideoverOpen(false);
          fetchData(); // Refresh data after upload
        }}
      />
    </>
  );
}
