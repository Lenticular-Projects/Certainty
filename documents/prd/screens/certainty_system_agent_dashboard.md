# The Certainty System — Agent Dashboard
## Screen Deep-Dive Spec v2.0
*Route: `/dashboard` | Role: Agent*
*Updated: Origin story context, Closer's Edge in report, Level Preview, Focus Mode, Team Benchmarks, Personal Best moment, Surprise Insight*

---

## WHY THIS SCREEN MATTERS

This is the first thing an agent sees after login. It sets the answer to: *is this worth coming back to?* Every decision here — layout, hierarchy, motion — serves one goal: make the agent feel like they're on a journey, they know where they stand, and there's always a next move.

This screen should never feel like a report card. It should feel like a coaching session that knows who you are.

---

## LAYOUT OVERVIEW

```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR (fixed left, 240px)                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────┐  ┌─────────────────┐  │
│  │  SCORE BLOCK                 │  │  PATTERN ALERT  │  │
│  │  (large, left-dominant)      │  │  (conditional)  │  │
│  └──────────────────────────────┘  └─────────────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  RECENT CALLS STRIP  (3 cards, horizontal)          │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                         │
│  ┌──────────────────────────┐  ┌────────────────────┐   │
│  │  CATEGORY BADGES ROW     │  │  AI COACH CARD     │   │
│  │  (6 badges)              │  │                    │   │
│  └──────────────────────────┘  └────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  PATTERN FEED  (coaching event timeline)            │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Breakpoints:**
- 1280px: Two-column (Score Block + Pattern Alert side by side; Badges + Coach Card side by side)
- 1024px: Single column, blocks stack
- Mobile: Not the primary experience — tablet-friendly minimum

---

## SECTION 1 — SCORE BLOCK

### Purpose
The agent's identity in the system. Level, score, trajectory. Felt immediately.

### Contents (in visual hierarchy order)

**1.1 — Level Badge**
- Level number (e.g. "3") + level name (e.g. "Signal Reader")
- Tier-appropriate visual treatment — each level should feel distinct (not just a number change)
- Clicking opens the Level Detail modal

**1.2 — Score Ring**
- Large SVG ring, animated on mount (spring fill — not a linear progress animation)
- Center: current Certainty Score (avg of last 5 calls) as a large number
- Ring color responds to score range: strong / mid / needs work
- Below ring: trend indicator — ↑ +4 pts | ↓ -2 pts | → flat (vs. previous 5-call avg)
- Trend text: "vs. your last 5 calls"

**1.3 — XP Progress Bar**
- Label: "[Current XP] / [Next Level XP] XP"
- Thin bar, fills proportionally
- On hover: tooltip shows "[X XP] to [Next Level Name]"

**1.4 — Level Preview Line**
- Sits directly below XP bar, always visible
- Text: "[X XP] to [Next Level Name]"
- No interaction — purely informational. The destination is always visible.

**1.5 — Last Call Snapshot**
- Small line below XP bar
- "Last analyzed call: [date] — [score]/100 — [ENROLLED / MISSED OPPORTUNITY / etc.]"
- Clicking navigates to that report

### Behavior
- Animates in on page load: ring fills with spring physics, number counts up from 0, level badge scales in
- If no calls analyzed yet: ring shows 0, text reads "Your score appears after your first analyzed call"

---

## SECTION 2 — PATTERN ALERT CARD

### Purpose
The one thing to fix right now. Surfaced automatically — agent doesn't have to go looking for it.

### Visibility
Only shown if a pattern has appeared in **3 or more of the last 5 analyzed calls.** Hidden otherwise — no placeholder.

### Contents
- Pattern number + name (e.g. "Pattern 2 — Incomplete Math Breakdown")
- Frequency line: "Flagged in 4 of your last 5 calls"
- One-sentence description of what this pattern means in plain terms
- Two actions:
  - "Study this pattern" → `/knowledge/[pattern-slug]`
  - "See the calls" → `/calls/history` filtered to calls with this pattern flagged

### Visual Treatment
- This card should have visual urgency without being alarming — not a red error state, more like a focused amber coaching nudge
- If multiple patterns qualify, show only the most frequent one. Secondary patterns surface in the Pattern Feed below.

---

## SECTION 3 — RECENT CALLS STRIP

### Purpose
Quick access to the last 3 calls. Continuity — the agent picks up where they left off.

### Contents
3 horizontally arranged call cards. Each card:
- Call date
- Call type (if classified — "Scared Switcher", "Money Caller", etc.)
- Classification badge: ENROLLED | MISSED OPPORTUNITY | UNCLOSABLE | CORRECT NO-SALE
- Score: large number
- Score ring (small version, filled to score %)
- "View Report" link

Plus: "View all calls →" text link to the right

### Behavior
- Cards animate in with stagger on page load (after Score Block has settled)
- If fewer than 3 calls: fewer cards shown. If 0: empty state card — "No analyzed calls yet. Your manager will upload your first call soon."
- On hover: card lifts slightly, score ring pulses once

---

## SECTION 4 — CATEGORY BADGES ROW

### Purpose
One glance — where is this agent sharp, where are they still developing?

### Contents
6 badge cards in a row (wraps to 2 rows on smaller viewports). Each badge:
- Category icon (visual TBD — should feel designed)
- Category name
- Tier label: DEVELOPING | PROFICIENT | SHARP
- Tier-appropriate treatment: Developing is neutral, Proficient is elevated, Sharp has premium feel

**6 Categories:**
1. Lead
2. Signal Reading
3. Math Breakdown
4. Objection Handling
5. Call Outcome Quality
6. Compliance & Professionalism

### Behavior
- Clicking any badge → `/knowledge/[category-slug]` (relevant framework reference page)
- Tier changes animate — badge "upgrades" with a brief celebration (not a full-screen moment, but noticeable)
- On hover: tooltip shows threshold info — "Sharp requires ≥ 4 of last 5 calls at near-perfect"

---

## SECTION 4B — FOCUS MODE

### Purpose
The one small ownership mechanic that makes the dashboard feel personal. The agent pins up to 2 scoring categories they are actively working to improve. These become the lens for everything else on the dashboard.

### Contents
- Appears below the Category Badges Row
- Label: "Your Focus" or "No focus set"
- When active: 1–2 category chips shown (e.g. "Math Breakdown · Signal Reading")
- "Change focus" link opens an inline selector (6 categories, max 2 selectable, spring animation)
- On first visit with no focus set: soft prompt shown — "Pin a category to focus your coaching."

### How Focus Mode affects other sections
- **Category Badges Row:** Focused badges are visually elevated — slightly larger or with a distinct border treatment
- **Score Breakdown:** Focused categories shown first, or with a subtle accent treatment
- **AI Coach Card:** Subtext becomes contextual — "Ask me about [Focus Category]"
- **AI Coach system prompt:** `focus_categories` injected so the coach references them proactively

### Behavior
- Stored in `agent_progress.focus_categories`
- Can be changed at any time — no limit on changes
- Empty state: soft prompt, never blocking

---

## SECTION 4C — TEAM BENCHMARK

### Purpose
Calibration without competition. Agents need to know what "good" looks like on the team. This gives them that signal without creating a ranking or shame mechanic.

### Contents
- Lives within the score breakdown section (not a separate card)
- Each of the 6 category score cards shows one additional line below the agent's score:
  "Team avg: 13/20 · You: 11/20"
- Text is small, secondary — supporting information, not dominant
- No names. No ranks. No positions. Completely anonymized.

### Behavior
- Only shown once the team has 3+ agents with analyzed calls (below that threshold, hidden entirely)
- Team avg is a rolling average of all active agents' last 5 calls per category
- Focused categories (if Focus Mode active) get the benchmark line slightly more prominent

---

## SECTION 5 — AI COACH CARD

### Purpose
Low-friction entry point to the coach. Should feel like an invitation, not a button.

### Contents
- CS coach avatar or icon
- Heading: "Your Coach"
- Subtext: one line that changes based on agent context:
  - If pattern alert active: "Ask me about [Pattern Name] — I can show you exactly what to say."
  - If no calls yet: "Ask me anything about The Certainty System."
  - Default: "Ask me anything. I know your numbers."
- "Start a session" button → `/coach` (new conversation)
- Secondary link: "Continue last conversation" → `/coach/[last-conversation-id]` (if exists)

### Notes
- The contextual subtext makes this feel alive — not a generic CTA
- This should feel warm. The coach is on your side.

---

## SECTION 6 — PATTERN FEED

### Purpose
The coaching record. Everything that's happened — patterns caught, improvements recognized, milestones hit. Scrollable history of the agent's journey.

### Contents
Chronological list of feed events, newest first. Each entry:
- Timestamp (relative: "2 days ago", "last week")
- Feed type icon (distinct per type)
- Feed text (examples below)
- Related link if applicable

**Feed entry types and example text:**

| Type | Example Text |
|---|---|
| `pattern_flagged` | "Pattern 2 (Incomplete Math Breakdown) flagged — appeared in 3 of your last 5 calls." + "Study it →" link |
| `pattern_cleared` | "Pattern 2 has cleared — not flagged in your last 3 calls. Good work." |
| `level_up` | "You reached Level 4: The Reframer." (also triggers full cinematic — this is the feed record) |
| `badge_earned` | "Signal Reading badge upgraded to Proficient." |
| `personal_best` | "New personal best — Math Breakdown: 19/20 on your last call." |

### Behavior
- Paginated (show 10, "Load more" at bottom)
- Unread entries have a subtle visual indicator (dot or left border treatment)
- Clicking a feed item → relevant call or knowledge page
- Empty state: "Coaching insights will appear here after your first analyzed call."

---

## PAGE-LEVEL BEHAVIOR

### On First Load (after login)
1. Sidebar slides in from left
2. Score Block animates: ring fills with spring physics, number counts up, level badge scales in
3. Recent Calls Strip staggers in (cards appear left to right, 80ms apart)
4. Category Badges Row fades up in sequence
5. AI Coach Card and Pattern Alert appear
6. Pattern Feed loads last

Total reveal: under 800ms. Feels choreographed, not slow.

### On Return Visit (tab refocus or navigation)
- If new analysis completed since last visit: Score Block ring re-animates to new value
- If new feed entries: feed items slide in at top
- No full re-animation — only changed elements update

### Level Up Moment
Triggered when XP crosses a level threshold (happens after a new call is analyzed and page reloads/updates):
1. Full viewport overlay (not a modal — an experience)
2. Previous level fades out
3. New level name appears large, centered
4. Ring pulses with spring animation 3 times
5. Confetti or particle effect (tasteful — design TBD)
6. Auto-collapses after ~3 seconds, or on any interaction
7. Returns to dashboard with level badge updated
8. Feed entry added automatically

### Personal Best Moment
Triggered when an agent sets a new best overall score OR a new best on any individual category:
1. Centered overlay card (not full-screen — smaller than level-up)
2. Spring scale in from center
3. Category name (or "Overall Score") + new best value
4. One line: "Your best [Category] yet."
5. Liquid fade out after ~3 seconds, dismissable on tap
6. Feed entry added automatically: `personal_best`
7. Design treatment: glass surface, warm accent color — feels earned, not alarming

### Surprise Insight Moment
Triggered server-side approximately 1 in 5 dashboard visits (capped at once per week per agent):
1. Appears as a feed entry with distinct visual treatment — slightly elevated card, different icon
2. Header: "I noticed something about your last [N] calls. →"
3. Agent taps to expand: 2–3 sentence LLM-generated coaching observation based on recent patterns
4. Never a warning or negative framing — always observational and forward-facing
5. Examples: "Your Signal Reading has been strong when the client mentions a specific benefit early. In 3 of your last 4 calls, you identified that moment correctly." OR "Your Math Breakdown completions have improved significantly over the last month. One pattern: Step 3 (Annual Net Impact) is still the most common drop-off point."
6. Links to relevant Knowledge Hub page if applicable

---

## EMPTY STATE (No Calls Analyzed Yet)

When an agent first logs in and no calls have been analyzed:

| Element | State |
|---|---|
| Score Block | Ring at 0, "—" in center. Text: "Your score appears after your first analyzed call." |
| Level | Level 1, Green Light — shown normally |
| Recent Calls Strip | Single card: "No calls analyzed yet. Your manager will upload your first call soon." |
| Pattern Alert | Hidden |
| Category Badges | All 6 shown at Developing tier |
| AI Coach Card | "Ask me anything about The Certainty System." |
| Pattern Feed | "Coaching insights will appear here after your first analyzed call." |

The empty state should feel welcoming and clear, not broken. The agent knows exactly what's missing and why.

---

## DATA REQUIREMENTS

The dashboard requires the following API calls on load:

```
GET /api/agents/:id/progress
  → total_xp, current_level, current_level_name, trend data

GET /api/calls/history?agent=:id&limit=3&sort=desc
  → last 3 calls with classification, score, call_type, date

GET /api/agents/:id/badges
  → all 6 badges with current tier

GET /api/agents/:id/feed?limit=10
  → pattern feed events

GET /api/agents/:id/profile
  → pattern alert data (top pattern, frequency in last 5 calls)
```

All 5 calls should fire in parallel. Dashboard renders progressively — Score Block first, then Calls, then Badges, then Feed.

---

*The Certainty System — Agent Dashboard Deep-Dive v2.0 | February 2026*
*Behavioral design: CD1 (origin story context), CD2 (personal best, level preview), CD4 (focus mode), CD5 (team benchmarks), CD7 (surprise insight)*
