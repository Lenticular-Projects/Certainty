"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import type { AnalysisResult } from "@/lib/types";
import styles from "./page.module.css";

interface CallResponse {
  id: string;
  agent_id: string;
  agent_name: string;
  call_date: string;
  call_type: string;
  classification: string;
  display_score: number;
  status: string;
  created_at: string;
  analysis_result: AnalysisResult | null;
}

interface ReportContentProps {
  callId: string;
}

const REPORT_SECTIONS = [
  "Closer's Edge",
  "Call Snapshot",
  "Executive Summary",
  "Score Breakdown",
  "What Agent Did Right",
  "Failure Patterns",
  "Math Breakdown",
  "Client Gold Audit",
  "Objection Handling",
  "Close Confirmation",
  "Full Transcript",
];

function classLabel(c: string | undefined): string {
  const map: Record<string, string> = {
    enrolled: "Enrolled",
    missed_opportunity: "Missed Opportunity",
    unclosable: "Unclosable",
    correct_no_sale: "Correct No Sale",
  };
  return map[c || ""] || c || "—";
}

function classBadgeStyle(c: string | undefined): string {
  if (c === "enrolled") return styles.badgeEnrolled;
  return styles.classificationBadge;
}

export default function ReportContent({ callId }: ReportContentProps) {
  const [call, setCall] = useState<CallResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/calls/${callId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Call not found");
        return r.json();
      })
      .then((data) => {
        setCall(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [callId]);

  // Scroll observer for nav
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
        if (idx !== -1) setActiveSection(idx);
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-100px 0px -60% 0px",
      threshold: 0.1,
    });
    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [call, observerCallback]);

  if (loading) {
    return (
      <>
        <div className={styles.colPanel}>
          <p className={styles.panelEyebrow}>Call Report</p>
        </div>
        <div className={styles.colMain}>
          <div className={styles.mainHeader}>
            <span className={styles.mhTitle}>Loading...</span>
          </div>
        </div>
      </>
    );
  }

  if (error || !call || !call.analysis_result) {
    return (
      <>
        <div className={styles.colPanel}>
          <p className={styles.panelEyebrow}>Call Report</p>
        </div>
        <div className={styles.colMain}>
          <div className={styles.mainHeader}>
            <span className={styles.mhTitle}>Call Report</span>
          </div>
          <div className={styles.mainContent}>
            <p className={styles.emptyText}>{error || "No analysis data available for this call."}</p>
          </div>
        </div>
      </>
    );
  }

  const d = call.analysis_result;
  const score = d.display_score || d.raw_score || 0;

  // Determine nav dot colors based on content
  function getNavDot(i: number): string | null {
    if (i === 4 && d.categories?.some((c) => c.score / c.max_score >= 0.7)) return "sage";
    if (i === 5 && d.failure_patterns?.length > 0) return "terracotta";
    if (i === 7 && d.client_gold?.some((g) => g.status === "missed")) return "terracotta";
    if (i === 9) return "terracotta";
    return null;
  }

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      {/* Col 2 — Report nav */}
      <div className={styles.colPanel}>
        <p className={styles.panelEyebrow}>Call Report</p>
        <nav className={styles.reportNav}>
          {REPORT_SECTIONS.map((label, i) => {
            const dot = getNavDot(i);
            return (
              <a
                key={label}
                className={`${styles.navLink} ${activeSection === i ? styles.active : ""}`}
                href={`#section-${i}`}
                onClick={(e) => {
                  e.preventDefault();
                  sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {dot && <span className={`${styles.navDot} ${styles[dot]}`} />}
                <span className={styles.navText}>{label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Col 3 — Main content */}
      <div className={styles.colMain}>
        <div className={styles.mainHeader}>
          <div>
            <span className={styles.mhTitle}>Call Report</span>
            <span className={styles.mhMeta}>
              {call.agent_name} &middot; {formatDate(call.call_date)}
            </span>
          </div>
          <div className={classBadgeStyle(call.classification)}>
            {classLabel(call.classification)}
          </div>
        </div>

        <div className={styles.mainContent}>
          {/* 0: Closer's Edge */}
          <section
            id="section-0"
            ref={(el) => { sectionRefs.current[0] = el; }}
            className={styles.section}
          >
            <div className={styles.closersEdge}>
              <div className={styles.ceLabel}>
                <span className={styles.ceDot} />
                <span className={styles.ceEyebrow}>The Closer&apos;s Edge</span>
              </div>
              <h2 className={styles.ceTitle}>The One Move That Changes This Call</h2>
              <p className={styles.ceQuote}>&ldquo;{d.closers_edge}&rdquo;</p>
              {d.recovery_line && (
                <div className={styles.ceRecovery}>
                  <span className={styles.ceRecoveryLabel}>Recovery line</span>
                  <p className={styles.ceRecoveryText}>&ldquo;{d.recovery_line}&rdquo;</p>
                </div>
              )}
            </div>
          </section>

          {/* 1: Call Snapshot */}
          <section
            id="section-1"
            ref={(el) => { sectionRefs.current[1] = el; }}
            className={styles.section}
          >
            <h3 className={styles.sectionEyebrow}>Call Snapshot</h3>
            <div className={styles.snapshotGrid}>
              {[
                { label: "Agent", value: call.agent_name },
                { label: "Classification", value: classLabel(call.classification) },
                { label: "Call Type", value: call.call_type || "—" },
                { label: "Call Date", value: formatDate(call.call_date) },
                { label: "Score", value: `${Math.round(score)}/100` },
                { label: "Signal", value: d.signal_audit?.signal_detected || "—" },
              ].map((row) => (
                <div key={row.label} className={styles.snapshotRow}>
                  <span className={styles.snapshotLabel}>{row.label}</span>
                  <span className={styles.snapshotValue}>{row.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 2: Executive Summary */}
          <section
            id="section-2"
            ref={(el) => { sectionRefs.current[2] = el; }}
            className={styles.section}
          >
            <h3 className={styles.sectionEyebrow}>Executive Summary</h3>
            <p className={styles.summaryText}>{d.executive_summary}</p>
          </section>

          {/* 3: Score Breakdown */}
          <section
            id="section-3"
            ref={(el) => { sectionRefs.current[3] = el; }}
            className={styles.section}
          >
            <h3 className={styles.sectionEyebrow}>Score Breakdown</h3>
            <div className={styles.scoreRows}>
              {d.categories.map((cat) => {
                const pct = cat.max_score > 0 ? (cat.score / cat.max_score) * 100 : 0;
                const barColor =
                  pct >= 70
                    ? "var(--sage)"
                    : pct >= 40
                      ? "var(--mustard)"
                      : "var(--terracotta)";
                return (
                  <div key={cat.name} className={styles.scoreRow}>
                    <div className={styles.scoreRowHeader}>
                      <span className={styles.scoreRowName}>{cat.name}</span>
                      <span className={styles.scoreRowValue}>
                        {cat.score}/{cat.max_score}
                      </span>
                    </div>
                    <div className={styles.scoreBarTrack}>
                      <div
                        className={styles.scoreBar}
                        style={{ width: `${pct}%`, background: barColor }}
                      />
                    </div>
                    {cat.verdict && (
                      <p className={styles.scoreVerdict}>{cat.verdict}</p>
                    )}
                    {cat.feedback && (
                      <p className={styles.scoreFeedback}>{cat.feedback}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 4: What Agent Did Right */}
          <section
            id="section-4"
            ref={(el) => { sectionRefs.current[4] = el; }}
            className={styles.section}
          >
            <h3 className={styles.sectionEyebrow}>What Agent Did Right</h3>
            {d.categories.filter((c) => c.score / c.max_score >= 0.6).length > 0 ? (
              <div className={styles.strengthsList}>
                {d.categories
                  .filter((c) => c.score / c.max_score >= 0.6)
                  .map((c, i) => (
                    <div key={c.name} className={styles.strengthBlock}>
                      <span className={styles.strengthNum}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <span className={styles.strengthTitle}>{c.name}</span>
                        <p className={styles.strengthText}>{c.verdict}</p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className={styles.emptyText}>No standout strengths identified on this call.</p>
            )}
          </section>

          {/* 5: Failure Patterns */}
          <section
            id="section-5"
            ref={(el) => { sectionRefs.current[5] = el; }}
            className={styles.section}
          >
            <h3 className={styles.sectionEyebrow}>Failure Patterns</h3>
            {d.failure_patterns.length > 0 ? (
              <div className={styles.patternList}>
                {d.failure_patterns.map((pat, i) => (
                  <div key={i} className={styles.patternBlock}>
                    <div className={styles.pbHeader}>
                      <span className={styles.pbTitle}>{pat.pattern_name}</span>
                      {pat.timestamp && (
                        <span className={styles.pbTimestamp}>{pat.timestamp}</span>
                      )}
                    </div>
                    <p className={styles.pbDesc}>{pat.description}</p>
                    {pat.exact_language && (
                      <div className={styles.exactLang}>
                        <span className={styles.elLabel}>Exact language</span>
                        <div className={styles.elText}>{pat.exact_language}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyText}>No failure patterns detected on this call.</p>
            )}
          </section>

          {/* 6: Math Breakdown */}
          <section
            id="section-6"
            ref={(el) => { sectionRefs.current[6] = el; }}
            className={styles.section}
          >
            <h3 className={styles.sectionEyebrow}>Math Breakdown</h3>
            <div className={styles.mathGrid}>
              <div className={styles.mathItem}>
                <span className={styles.mathLabel}>Completed</span>
                <span className={styles.mathValue}>
                  {d.math_breakdown.completed ? "Yes" : "No"}
                </span>
              </div>
              {d.math_breakdown.steps_completed.length > 0 && (
                <div className={styles.mathItem}>
                  <span className={styles.mathLabel}>Steps Completed</span>
                  <span className={styles.mathValue}>
                    {d.math_breakdown.steps_completed.join(", ")}
                  </span>
                </div>
              )}
              {d.math_breakdown.steps_missed.length > 0 && (
                <div className={styles.mathItem}>
                  <span className={styles.mathLabel}>Steps Missed</span>
                  <span className={styles.mathValue}>
                    {d.math_breakdown.steps_missed.join(", ")}
                  </span>
                </div>
              )}
            </div>
            {d.math_breakdown.notes && (
              <p className={styles.mathNotes}>{d.math_breakdown.notes}</p>
            )}
          </section>

          {/* 7: Client Gold Audit */}
          <section
            id="section-7"
            ref={(el) => { sectionRefs.current[7] = el; }}
            className={styles.section}
          >
            <h3 className={styles.sectionEyebrow}>Client Gold Audit</h3>
            {d.client_gold.length > 0 ? (
              <div className={styles.goldList}>
                {d.client_gold.map((g, i) => (
                  <div key={i} className={styles.goldItem}>
                    <div className={styles.goldHeader}>
                      {g.timestamp && (
                        <span className={styles.goldTs}>{g.timestamp}</span>
                      )}
                      <span
                        className={`${styles.goldBadge} ${
                          g.status === "weaponized"
                            ? styles.goldUsed
                            : g.status === "missed"
                              ? styles.goldMissed
                              : styles.goldPartial
                        }`}
                      >
                        {g.status}
                      </span>
                    </div>
                    <p className={styles.goldQuote}>&ldquo;{g.client_statement}&rdquo;</p>
                    {g.how_used && (
                      <p className={styles.goldNote}>{g.how_used}</p>
                    )}
                    {g.how_should_have_used && (
                      <div className={styles.goldShould}>
                        <span className={styles.goldShouldLabel}>How to use this</span>
                        <p>{g.how_should_have_used}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyText}>No Client Gold moments identified.</p>
            )}
          </section>

          {/* 8: Objection Handling */}
          <section
            id="section-8"
            ref={(el) => { sectionRefs.current[8] = el; }}
            className={styles.section}
          >
            <h3 className={styles.sectionEyebrow}>Objection Handling Log</h3>
            {d.objections.length > 0 ? (
              <div className={styles.objectionList}>
                {d.objections.map((obj, i) => (
                  <div key={i} className={styles.objectionBlock}>
                    <div className={styles.obHeader}>
                      <span className={styles.obQuote}>
                        &ldquo;{obj.objection_text}&rdquo;
                      </span>
                      {obj.timestamp && (
                        <span className={styles.obTs}>{obj.timestamp}</span>
                      )}
                    </div>
                    <div className={styles.obMeta}>
                      <div>
                        <span className={styles.obMetaLabel}>Category</span>
                        <span className={styles.obMetaText}>{obj.category}</span>
                      </div>
                      <div>
                        <span className={styles.obMetaLabel}>Response</span>
                        <span className={styles.obMetaText}>{obj.response_used}</span>
                      </div>
                    </div>
                    <div
                      className={`${styles.obAssessment} ${
                        obj.handled_correctly ? styles.obPass : styles.obFail
                      }`}
                    >
                      {obj.verdict}
                    </div>
                    {obj.recommended_response && (
                      <div className={styles.exactLang}>
                        <span className={styles.elLabel}>Recommended response</span>
                        <div className={styles.elText}>{obj.recommended_response}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyText}>No objections recorded on this call.</p>
            )}
          </section>

          {/* 9: Close Confirmation */}
          <section
            id="section-9"
            ref={(el) => { sectionRefs.current[9] = el; }}
            className={styles.section}
          >
            <h3 className={styles.sectionEyebrow}>Close Confirmation Audit</h3>
            {d.categories
              .filter((c) => c.name.toLowerCase().includes("close") || c.name.toLowerCase().includes("pillar 4"))
              .map((c) => (
                <div key={c.name} className={styles.closeBlock}>
                  <div className={styles.closeHeader}>
                    <span className={styles.closeScore}>
                      {c.score}/{c.max_score}
                    </span>
                  </div>
                  {c.verdict && <p className={styles.closeVerdict}>{c.verdict}</p>}
                  {c.feedback && <p className={styles.closeFeedback}>{c.feedback}</p>}
                </div>
              ))}
          </section>

          {/* 10: Full Transcript */}
          <section
            id="section-10"
            ref={(el) => { sectionRefs.current[10] = el; }}
            className={styles.section}
          >
            <div className={styles.transcriptHeader}>
              <h3 className={styles.sectionEyebrow}>Full Transcript</h3>
              <button
                className={styles.transcriptToggle}
                onClick={() => setTranscriptOpen(!transcriptOpen)}
              >
                {transcriptOpen ? "Collapse" : "Expand"} Transcript
              </button>
            </div>
            {transcriptOpen && d.annotated_transcript && (
              <div className={styles.transcriptBody}>
                <pre className={styles.transcriptPre}>{d.annotated_transcript}</pre>
              </div>
            )}
            {!d.annotated_transcript && (
              <p className={styles.emptyText}>No annotated transcript available.</p>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
