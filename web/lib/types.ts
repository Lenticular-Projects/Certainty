/* ═══════════════════════════════════════════
   CERTAINTY SYSTEM — TypeScript Types
   Built against: cs_api_contract.md
═══════════════════════════════════════════ */

// ─── Classification ───

export type Classification =
  | "enrolled"
  | "missed_opportunity"
  | "unclosable"
  | "correct_no_sale";

export type RootCause = "RC1" | "RC2" | "RC3" | null;

// ─── Scoring Categories ───

export interface CategoryScore {
  name: string;
  score: number;
  max_score: number;
  verdict: string;
  feedback: string;
}

// ─── Signal Audit ───

export interface SignalMoment {
  timestamp: string;
  type: "signal_correct" | "signal_incorrect";
  what_happened: string;
  what_should_happen: string | null;
}

export interface SignalAudit {
  signal_detected: "GREEN" | "YELLOW" | "RED";
  signal_correct: boolean;
  signal_reading_notes: string;
  moments: SignalMoment[];
}

// ─── Math Breakdown ───

export interface MathBreakdown {
  completed: boolean;
  steps_completed: number[];
  steps_missed: number[];
  notes: string;
}

// ─── Objection Handling ───

export interface ObjectionEntry {
  timestamp: string;
  objection_text: string;
  category: string;
  handled_correctly: boolean;
  response_used: string;
  recommended_response: string | null;
  verdict: string;
}

// ─── Failure Patterns ───

export interface FailurePattern {
  pattern_name: string;
  pattern_number: number;
  timestamp: string;
  description: string;
  exact_language: string;
  knowledge_slug: string;
}

// ─── Client Gold ───

export interface ClientGoldEntry {
  timestamp: string;
  client_statement: string;
  status: "weaponized" | "partially_used" | "missed";
  how_used: string | null;
  how_should_have_used: string;
}

// ─── Full Analysis Result (from LLM) ───

export interface AnalysisResult {
  classification: Classification;
  root_cause: RootCause;
  raw_score: number;
  display_score: number;
  closers_edge: string;
  recovery_line: string | null;
  executive_summary: string;
  categories: CategoryScore[];
  signal_audit: SignalAudit;
  math_breakdown: MathBreakdown;
  objections: ObjectionEntry[];
  failure_patterns: FailurePattern[];
  client_gold: ClientGoldEntry[];
  annotated_transcript: string;
}

// ─── Call Record ───

export interface CallRecord {
  id: string;
  agent_id: string;
  agent_name: string;
  call_date: string;
  call_type: string;
  status: "pending" | "complete" | "failed";
  created_at: string;
  analysis_result: AnalysisResult | null;
}

// ─── Agent ───

export type ScoreTrend = "up" | "down" | "flat";

export interface AgentProgress {
  agent_id: string;
  total_xp: number;
  current_level: number;
  current_level_name: string;
  next_level: number;
  next_level_name: string;
  xp_to_next_level: number;
  avg_score_last5: number;
  score_trend: ScoreTrend;
  focus_categories: string[];
  last_analyzed_call_id: string | null;
}

export type CategoryTier = "Developing" | "Proficient" | "Sharp";

export interface AgentBadge {
  category: string;
  tier: CategoryTier;
  score: number;
  max_score: number;
  team_avg: number | null;
  last_updated: string;
}

// ─── Feed ───

export type FeedType =
  | "pattern_flagged"
  | "pattern_cleared"
  | "level_up"
  | "badge_earned"
  | "personal_best"
  | "surprise_insight";

export interface FeedEntry {
  id: string;
  type: FeedType;
  content: string;
  related_href: string | null;
  is_read: boolean;
  created_at: string;
  expanded_content: string | null;
}

// ─── Agent Profile ───

export interface AgentProfile {
  id: string;
  name: string;
  email: string;
  role: "agent" | "manager";
  is_active: boolean;
  joined_date: string;
  has_seen_welcome: boolean;
  top_pattern: string | null;
  pattern_count_last5: number;
  has_pattern_alert: boolean;
}

// ─── Team / Manager ───

export interface AgentSummary {
  id: string;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  level_name: string;
  avg_score: number | null;
  score_trend: ScoreTrend | null;
  last_analyzed_date: string | null;
  last_call_classification: Classification | null;
  top_pattern: string | null;
  total_calls_analyzed: number;
}

export interface TeamPatterns {
  top_patterns: Array<{
    name: string;
    agent_count: number;
    call_count: number;
  }>;
}

// ─── Call History ───

export interface CallHistoryEntry {
  id: string;
  agent_id: string;
  agent_name: string;
  call_date: string;
  call_type: string;
  classification: Classification;
  score: number;
  status: string;
}
