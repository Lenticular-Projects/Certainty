# The Certainty System — Manager Dashboard Deep-Dive
## Screen Spec: `/dashboard` (Manager Role)
*The manager's dashboard is not a report. It is a decision-making surface.*
*Everything on this screen answers one of three questions.*

---

## THE MANAGER'S THREE QUESTIONS

Before specifying a single component, understand what a manager is actually asking when they open this screen:

1. **Who needs help right now?** — Which agents have patterns, low scores, or no recent calls?
2. **What patterns are spreading?** — Are failure patterns isolated to one agent or appearing across the team?
3. **Who should I recognize?** — Who leveled up, earned a badge, or hit a personal best this week?

Every section of this dashboard exists to answer one of these three questions. Nothing else earns a place on this screen.

---

## LAYOUT

```
┌─────────────────────────────────────────────────────────────┐
│ SIDEBAR (same as agent dashboard, manager nav items)        │
├────────────────────────────┬────────────────────────────────┤
│ TEAM SUMMARY BLOCK         │ PATTERN RADAR                  │
│ (answers Q2 + Q3)          │ (answers Q2)                   │
│                            │                                │
├────────────────────────────┴────────────────────────────────┤
│ TEAM TABLE — full width (answers Q1 + Q2)                   │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ RECENT ACTIVITY STRIP (answers Q1 + Q3)                     │
└─────────────────────────────────────────────────────────────┘
```

Bento-box layout. Team Table is the dominant element — it takes the most space because it is where managers make decisions. The top row (Team Summary + Pattern Radar) gives context before the table.

---

## SECTION 1 — TEAM SUMMARY BLOCK

### Purpose
Answers Q2 and Q3 at a glance. Three numbers, always visible at the top of the screen.

### Contents

```
┌─────────────────────────────────────┐
│ TEAM CERTAINTY SCORE                │
│ [Large number] /100                 │
│ Team avg · Last 5 calls per agent   │
│                                     │
│ ↑ Up from last period    (trend)    │
│                                     │
│ [Active Agents: N]                  │
│ [Calls This Week: N]                │
│ [Agents with No Calls: N]  ← alert  │
└─────────────────────────────────────┘
```

**Team Certainty Score:** Average of all active agents' 5-call rolling averages. Single number. Large. Trend indicator (↑/↓/—) vs previous period.

**Active Agents:** Count of agents with `is_active = true`.

**Calls This Week:** Count of calls analyzed in the last 7 days across the team.

**Agents with No Calls (14+ days):** Count of agents who have not had a call analyzed in 14+ days. **If count > 0, this number is shown in warning color** — it is a signal that someone on the team may be slipping through the cracks. Clicking it filters the Team Table to those agents.

### Data source
```
GET /api/analytics/team-summary
Returns: {
  team_avg_score: number,
  team_score_trend: 'up' | 'down' | 'flat',
  active_agent_count: number,
  calls_this_week: number,
  agents_without_recent_calls: number  // 14+ days
}
```

---

## SECTION 2 — PATTERN RADAR

### Purpose
Answers Q2. Shows the manager which failure patterns are appearing across the team — not just on one agent's calls.

### Contents

```
┌──────────────────────────────────────┐
│ PATTERN RADAR                        │
│                                      │
│ Top patterns this week:              │
│                                      │
│ Detail Stall          ████ 4 agents  │
│ Third Party Block     ██   2 agents  │
│ Math Drop             █    1 agent   │
│                                      │
│ [View all patterns →]                │
└──────────────────────────────────────┘
```

**Top 3 patterns this week** — sorted by agent count (how many distinct agents triggered this pattern in the last 7 days). Shows pattern name + mini bar + agent count.

**Why agent count, not occurrence count:** A pattern appearing 10 times on one agent is a coaching issue for that agent. A pattern appearing on 4 different agents is a systemic training issue. The manager needs to know the difference.

**"View all patterns →"** links to a future analytics view (Phase 2). At launch, it can link to a filtered call history.

**If no patterns this week:**
```
No patterns flagged this week.
```
Plain text. No empty state graphic needed — this is a positive signal.

### Data source
```
GET /api/analytics/team-patterns
Returns: {
  top_patterns: [
    { name: string, agent_count: number, call_count: number }
  ] (max 3)
}
```

---

## SECTION 3 — TEAM TABLE

### Purpose
Answers all three questions. The primary working surface. Every agent in one view.

### Columns

| Column | Content | Sortable |
|---|---|---|
| **Agent** | Full name + level badge | No |
| **Score** | Rolling avg last 5 calls — mini score ring (sm) + number | ✅ |
| **Last Call** | Date of last analyzed call + classification badge | ✅ |
| **Top Pattern** | Most frequent current pattern (or "None") | No |
| **Calls** | Total calls analyzed, all time | ✅ |
| **Actions** | View Profile · Upload Call | No |

### Row states

**Standard row** — agent is active, has recent calls, no alerts.

**Warning row** — agent has an active pattern alert (pattern in 3+ of last 5 calls). Row gets a subtle left border in warning color. Pattern name shown in warning treatment in the Top Pattern column.

**Dormant row** — agent has not had a call analyzed in 14+ days. Row gets a subtle treatment — not alarming, but distinct. "No recent calls" appears in the Last Call column in secondary text color.

**New agent row** — agent has zero analyzed calls. Score column shows "—". Last Call shows "No calls yet." Top Pattern shows "—".

### Sorting

Default sort: Score descending (highest performers at top). Managers can re-sort by Score, Last Call date, or Calls count by clicking column headers. Sort direction toggles on repeated click.

### Filtering

A filter row above the table (not in the header — separate row):
- **All Agents** (default) | **Has Pattern** | **No Recent Calls** (14+ days) | **New Agents** (0 calls)
- These are single-select chips. One active at a time.

### "Upload Call" action

In the Actions column, "Upload Call" opens a slide-over panel (`<SlideOver>`) — the agent is pre-selected. Manager fills in date, call type (optional), file upload. Submit triggers analysis flow without leaving the dashboard. After submission: row updates to show pending state in Last Call column. After analysis completes: row updates to show new call data.

### "View Profile" action

Navigates to `/profile/:agentId`. Full agent profile in a new page view.

### Pagination

Show 10 agents per page at launch (enough for initial team size). Simple prev/next pagination. Total count shown: "Showing 1–10 of 14 agents."

### Empty state (no agents)

```
No agents yet.
Invite your first agent from the Admin panel.
[Go to Admin]
```

### Data source
```
GET /api/agents
Returns: [
  {
    id, name, level_name, avg_score, score_trend,
    last_analyzed_date, last_call_classification,
    top_pattern, total_calls_analyzed, is_active
  }
]
```

---

## SECTION 4 — RECENT ACTIVITY STRIP

### Purpose
Answers Q1 and Q3. A live feed of recent events across the entire team — new calls analyzed, level-ups, badge achievements, personal bests.

### Contents

Horizontal strip of 5 event cards, most recent first. Each card:

```
┌─────────────────────────┐
│ [Agent Name]            │
│ [Event description]     │
│ [Time ago]              │
│ [View →] (if applicable)│
└─────────────────────────┘
```

**Event types displayed:**
- Call analyzed: "Enrolled · 74/100" → links to report
- Level up: "Reached The Closer" — show with elevated treatment
- Badge earned: "Signal Reading: Sharp"
- Personal best: "New personal best — Math Breakdown: 19/20"
- Pattern flagged: "Detail Stall detected" — warning treatment

**"View all activity →"** at end of strip links to a full activity log (can be the team call history at launch).

### Why this section matters for managers

The agent dashboard's feed shows the agent their own milestones. The manager needs to see the team's milestones in one place — to catch who leveled up (recognition opportunity) and who just had a pattern flagged (coaching opportunity) without having to open each agent profile.

### Data source
```
GET /api/analytics/team-activity?limit=5
Returns: [
  {
    agent_id, agent_name, event_type, event_content,
    created_at, related_href
  }
]
```

---

## PAGE-LEVEL BEHAVIOR

### Load sequence

```
1. Team Summary Block and Pattern Radar fetch in parallel
2. Team Table fetches in parallel with the above
3. Recent Activity Strip fetches last (lowest priority)
4. Each section renders independently as data arrives
5. No full-page loading state — sections load in place
```

### Upload Call flow (from Team Table)

When manager clicks "Upload Call" on any row:

1. `<SlideOver>` opens from the right. Agent pre-populated.
2. Fields: Call Date (date picker, defaults to today), Call Type (optional dropdown — 9 types), File Upload.
3. "Analyze Call" button — disabled until file is selected.
4. On submit: file uploads, call created with `status: 'pending'`.
5. SlideOver closes. Row in Team Table updates: Last Call column shows "Analyzing..." with `<LoadingPulse>`.
6. Row polls status every 5s. When complete: updates Last Call column with new call data. If level-up or personal best triggered for agent — feed entry appears in Recent Activity Strip.
7. If analysis fails: row shows "Analysis failed" in Last Call column with "Retry" link.

### No full-page redirect for uploads

Manager stays on dashboard throughout the upload flow. They do not navigate to a pending screen. The pending state is handled inline in the Team Table row. This allows managers to upload multiple calls back-to-back without losing their place.

---

## EMPTY STATES

**No agents (fresh account):**
Team Table empty state: "No agents yet. Invite your first agent from the Admin panel." [Go to Admin] button.

**No calls this week:**
Calls This Week: "0" — shown plainly. Not alarming.

**No patterns this week:**
Pattern Radar: "No patterns flagged this week." Plain text.

**No recent activity:**
Recent Activity Strip: "No recent activity. Activity will appear here after calls are analyzed."

---

## WHAT THE MANAGER DASHBOARD IS NOT

- Not a leaderboard. Agents are never ranked against each other with names attached.
- Not a surveillance tool. The table shows performance trends, not minute-by-minute activity.
- Not a duplicate of the agent dashboard. Managers see team-level patterns, not a grid of individual score rings.
- Not a reporting tool. It is a decision surface. Every element should suggest an action: upload a call, view a profile, recognize an achievement.

---

## DATA SOURCES — COMPLETE LIST

```
GET /api/analytics/team-summary          → Team Summary Block
GET /api/analytics/team-patterns         → Pattern Radar
GET /api/agents                          → Team Table
GET /api/analytics/team-activity?limit=5 → Recent Activity Strip

POST /api/calls/upload                   → Upload Call (SlideOver)
GET  /api/calls/status/:id               → Polling (inline row, 5s interval)
```

All fetches fire in parallel on mount except team-activity (fires after others).

---

## INTERACTION MAP

| Element | Action |
|---|---|
| "Agents with No Calls" count | Filters Team Table to dormant agents |
| Pattern name in Radar | Links to filtered call history for that pattern (future: analytics page) |
| Table column header (Score/Last Call/Calls) | Sorts table by that column |
| Filter chips (Has Pattern / No Recent Calls / etc.) | Filters table rows |
| "Upload Call" in table row | Opens SlideOver with agent pre-selected |
| "View Profile" in table row | Navigates to `/profile/:agentId` |
| Recent Activity card — "View →" | Navigates to call report or agent profile |
| Team Summary score | No interaction — display only |

---

*The Certainty System — Manager Dashboard Deep-Dive v1.0 | February 2026*
*Three questions. Every section answers one of them. Nothing on this screen exists for any other reason.*
