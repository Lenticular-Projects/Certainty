# The Certainty System — Screen Map
*Every screen, every element, every interaction*
*v2.0 — Updated with origin story, Closer's Edge repositioned, Focus Mode, team benchmarks, personal best moment, surprise insight, Knowledge Hub last-studied tracking*

---

## HOW TO READ THIS

Each screen entry follows this structure:
- **What's on screen** — all visible elements
- **Every clickable/interactive element** → where it goes or what it does
- **Notes** — edge cases, conditional logic, empty states

Screens marked 🔒 are **manager only.**
Screens marked 👤 are **agent only.**
Screens marked 🔁 are **shared** (both roles, different data).

---

## SCREEN 0 — Origin Story (First Login)
**Route:** `/welcome`
**Access:** 👤 Agent only — shown exactly once on first login. Never shown again.

### What's on screen
- Full-screen narrative experience. No sidebar. No nav.
- Five text beats that auto-advance or tap-to-advance (first 8 seconds no skip):
  1. "Most agents know their products..."
  2. "What separates the ones who close is something different..."
  3. "That's what The Certainty System teaches. Not scripts. Craft."
  4. "You'll learn to read Three Signals. Work Four Pillars. Recognize Nine Patterns..."
  5. "Every call you make is a lesson. This platform finds it."
- CTA button: "Enter The System →" (appears after Beat 5)

### Interactions
| Element | Action |
|---|---|
| "Enter The System →" | Sets `has_seen_welcome = true` → redirects to `/dashboard` |
| Navigating away before CTA | Screen shown again on next login until CTA is clicked |

### Notes
- Managers never see this screen — redirect to `/dashboard` on first login
- No skip button for first 8 seconds — the narrative needs to land

---

## SCREEN 1 — Login
**Route:** `/`
**Access:** Public (unauthenticated only — authenticated users redirect to `/dashboard`)

### What's on screen
- App logo / wordmark (centered, above card)
- Email input field
- Password input field
- "Sign In" button
- "Forgot your password?" link (below button)

### Interactions
| Element | Action |
|---|---|
| "Sign In" button | Validates fields → authenticates → redirects to `/dashboard` |
| "Forgot your password?" | Opens password reset modal (email input + send button) |
| Invalid credentials | Inline error below password field: "Invalid credentials" |
| Empty field on submit | Inline error below empty field: "Required" |

### Notes
- No public signup. Accounts created by managers only via `/admin` invite flow.
- Authenticated users who land on `/` are immediately redirected to `/dashboard`.

---

## SCREEN 2A — Agent Dashboard
**Route:** `/dashboard`
**Access:** 👤 Agent

### What's on screen
- **Score Block** — Current Certainty Score (avg last 5 calls), animated ring, trend indicator (↑ ↓ →), level badge + name, XP bar with progress to next level
- **Recent Calls Strip** — 3 most recent analyzed calls (date, call type, classification badge, score)
- **Pattern Alert Card** — Shown only if a pattern appears in 3+ of last 5 calls. Pattern name, count ("flagged 4 of last 5 calls"), link to Knowledge Hub page for that pattern
- **AI Coach Prompt Card** — Static card: "Ask your coach anything" with brief example prompt
- **Category Badges Row** — 6 badges (Lead, Signal Reading, Math Breakdown, Objection Handling, Call Outcome Quality, Compliance), each showing current tier (Developing / Proficient / Sharp)
- **Pattern Feed** — Chronological coaching events: pattern flagged, pattern cleared, level up, badge earned, personal best

- **Focus Mode selector** — agent pins 1–2 categories. Highlighted in score breakdown + badge row. "Change focus" link. Default: prompt on first visit — "Pin a category to focus your coaching."
- **Level Preview line** — below XP bar, always visible: "[X XP] to [Next Level Name]"
- **Team Benchmark** — on score breakdown, per-category line: "Team avg: 13/20 · You: 11/20" (anonymized, no names, calibration only)
- **Surprise Insight feed entry** — appears ~1 in 5 sessions. Distinct visual treatment. "I noticed something about your last N calls. →" Expands to 2–3 sentence coaching insight.

### Interactions
| Element | Action |
|---|---|
| Recent call row (click) | → `/calls/[id]` — full report |
| "View all calls" link | → `/calls/history` |
| Pattern Alert — "Study this pattern" | → `/knowledge/[pattern-slug]` |
| AI Coach Card — "Start a session" | → `/coach` (new conversation) |
| Category badge (click) | → `/knowledge/[category-slug]` (relevant framework page) |
| Level badge (click) | Opens level detail modal — current XP, next level threshold, what changes at next level |
| Level Preview line | Static — no interaction, always visible |
| Score ring (click) | Scrolls to score breakdown with team benchmarks |
| Focus Mode "Change focus" | Opens category selection (inline, 6 options, max 2 selectable) |
| Pattern feed item (click) | → `/calls/[id]` if call-related, or → `/knowledge/[slug]` if pattern/badge |
| Surprise Insight "→" | Expands inline coaching text |
| Personal best moment | Auto-triggered overlay card (~3s) when new best score is set |

### Notes
- If no calls analyzed yet: Score Block shows "—", Recent Calls empty state, Pattern Alert hidden, Badges all Developing.
- Pattern Feed empty state: "Coaching insights will appear here after your first analyzed call."
- Team benchmark only shows once 3+ agents have analyzed calls (otherwise hidden)

---

## SCREEN 2B — Manager Dashboard
**Route:** `/dashboard`
**Access:** 🔒 Manager

### What's on screen
- **Summary Bar** — Total calls analyzed this week | Team average score | Most flagged pattern this week
- **Upload Call Button** — Persistent top-right. Always visible.
- **Team Table** — Agent name | Level | Last Analyzed Call date | Avg Score (last 5) | Top Pattern
- **Upload History Strip** — Last 5 uploads with status badge (pending / processing / complete / failed)

### Interactions
| Element | Action |
|---|---|
| "Upload Call" button | → `/calls/upload` |
| Team table row (click) | → `/profile/[agentId]` |
| Upload history item (click) | → `/calls/[id]` |
| Failed upload — "Retry" | Re-triggers analysis for that call |
| "View all uploads" | → `/calls/history` (manager view — all agents) |

### Notes
- If no agents yet: Team Table shows empty state — "No agents yet. Invite your first agent." with link to `/admin`.

---

## SCREEN 3 — Knowledge Hub Index
**Route:** `/knowledge`
**Access:** 🔁 Both

### What's on screen
- **Two large panels** side by side:
  - "Browse by Topic" — navigates to call types grid
  - "Search the System" — navigates to semantic search
- **Quick Reference Chip Row** — Three Signals | Four Pillars | The Math Breakdown | Close Confirmation | Nine Patterns

### Interactions
| Element | Action |
|---|---|
| "Browse by Topic" panel | → `/knowledge/call-types` |
| "Search the System" panel | → `/knowledge/search` |
| "Three Signals" chip | → `/knowledge/three-signals` |
| "Four Pillars" chip | → `/knowledge/four-pillars` |
| "The Math Breakdown" chip | → `/knowledge/math-breakdown` |
| "Close Confirmation" chip | → `/knowledge/close-confirmation` |
| "Nine Patterns" chip | → `/knowledge/nine-patterns` |

---

## SCREEN 4A — Call Types Grid
**Route:** `/knowledge/call-types`
**Access:** 🔁 Both

### What's on screen
- **Sub-nav tabs** — "Call Types" (active) | "Objections"
- **3×3 grid of Call Type Tiles** — each tile: name, one-sentence summary, signal pill (GREEN / RED / YELLOW)

### Interactions
| Element | Action |
|---|---|
| "Objections" tab | → `/knowledge/objections` (smooth tab transition) |
| Any call type tile | → `/knowledge/[call-type-slug]` |

**9 tiles:** Money Caller | Scared Switcher | Misinformed | Third Party Controlled | Detail Staller | Time Bomb | Commercial Myth Caller | Veteran | Timing Objector

Each tile shows a faint "Last studied: X days ago" timestamp (or "Not yet studied").

---

## SCREEN 4B — Objections Grid
**Route:** `/knowledge/objections`
**Access:** 🔁 Both

### What's on screen
- **Sub-nav tabs** — "Call Types" | "Objections" (active)
- **3×3 grid of Objection Tiles** — each tile: client phrase in quotes, signal pill, emotional subtext

### Interactions
| Element | Action |
|---|---|
| "Call Types" tab | → `/knowledge/call-types` |
| Any objection tile | → `/knowledge/[objection-slug]` |

**9 tiles:** Think about it | Happy with what I have | Don't want to change doctors | Heard bad things | Can't afford it | Not ready yet | Send mail first | Family member handles it | Don't trust insurance

---

## SCREEN 4C — Individual Knowledge Page
**Route:** `/knowledge/[slug]`
**Access:** 🔁 Both

### What's on screen (Call Type page)
- Breadcrumb: Knowledge Hub > Call Types > [Name]
- Hero block: name (H1), signal pill, one-sentence description
- Who This Is
- Identify in the First 2 Minutes
- Primary Move (accent callout block)
- Biggest Mistake to Avoid (warning block)
- Response Options (tabbed: Option 1 | Option 2 | Option 3)
- What's Underneath Emotionally
- Related Objections (linked chips)

### What's on screen (Objection page)
- Breadcrumb: Knowledge Hub > Objections > [Phrase]
- Hero block: client phrase (large, quoted), signal pill
- What's Underneath
- What NOT to Say (warning block)
- Response Options (tabbed: Option 1 | Option 2 | Option 3)
- Relevant Pillar
- Related Call Type (linked chip)

### What's on screen (Framework page — Pillars, Patterns, Protocol, etc.)
- Breadcrumb: Knowledge Hub > [Section] > [Item]
- Single-column article render
- Language examples in styled blocks

### Interactions
| Element | Action |
|---|---|
| Breadcrumb links | Navigate back to parent section |
| Response Option tabs | Switches content in place (shared layout animation) |
| Related Objection chips | → `/knowledge/[objection-slug]` |
| Related Call Type chip | → `/knowledge/[call-type-slug]` |
| Relevant Pillar link | → `/knowledge/[pillar-slug]` |

---

## SCREEN 4D — Semantic Search
**Route:** `/knowledge/search`
**Access:** 🔁 Both

### What's on screen
- Large centered search input
- Placeholder: "Try 'scared switcher', 'math breakdown', or 'what do I say when they say they're happy'"
- Results list (after query): type badge + title + one-line excerpt + "View" link
- Never empty — if no close match, shows "Closest match" labeled result

### Interactions
| Element | Action |
|---|---|
| Input (Enter or 400ms debounce) | Fires semantic search query via pgvector |
| Result "View" link | → `/knowledge/[slug]` |

---

## SCREEN 5A — Call Upload 🔒
**Route:** `/calls/upload`
**Access:** 🔒 Manager only

### What's on screen
- **Step 1 — Select Agent:** Dropdown of all active agents. Steps 2–4 disabled until agent selected.
- **Step 2 — Input Transcript:** Two tabs — "Paste Text" (textarea) | "Upload File" (drag-and-drop: .txt, .pdf, .docx)
- **Step 3 — Call Details (optional):** Date picker (defaults today) | Manager notes textarea
- **Step 4 — Submit:** "Analyze Call" button

### Interactions
| Element | Action |
|---|---|
| Agent dropdown | Enables rest of form |
| "Upload File" tab | Shows drag-and-drop zone |
| File dropped/selected | Server parses text → shows preview |
| "Analyze Call" button | Creates call record → redirects to `/calls/[id]` (pending state) |
| Back navigation | Confirms exit if transcript entered |

---

## SCREEN 5B — Call Pending State
**Route:** `/calls/[id]` (status: pending / processing)
**Access:** 🔒 Manager (upload initiator) + 👤 Agent (their own call)

### What's on screen
- Full-page animated state (liquid/pulse — not a spinner)
- Agent name + call date
- Rotating subtitle: "Reading signal patterns..." / "Evaluating the Four Pillars..." / "Building your report..." / "Almost there..."

### Interactions
| Element | Action |
|---|---|
| Page polls `/api/calls/status/:id` every 5s | On 'complete': report reveals with orchestrated animation |
| On 'failed': | Error state shows with "Retry Analysis" button |

---

## SCREEN 5C — Call Report
**Route:** `/calls/[id]` (status: complete)
**Access:** 🔁 Both (agent sees own, manager sees all)

### What's on screen
1. **Report Header** — Agent name, call date, classification badge (ENROLLED / MISSED OPPORTUNITY / UNCLOSABLE / CORRECT NO-SALE), total score `/100`, root cause pill (RC1 / RC2 / RC3)
2. **The Closer's Edge** — Full-width accent card with glass surface. "The One Move That Changes This Call." Always above the fold. Always first. Recovery Line shown here on Missed Opportunity reports.
3. **Executive Summary** — Prose card, no bullets
4. **Certainty Score Breakdown** — 6 category cards with scores, bars, verdicts. Overall score ring.
4. **Failure Patterns** — (conditional) Each with timestamp, what happened, what should have happened, exact language block
5. **Strengths** — (conditional) Each with category badge, timestamp, what happened, why it worked
6. **The Math Breakdown** — Step 1/2/3 indicators, verdict badge, comparison table, Cost of Inaction prose
7. **Client Gold Audit** — Each moment: timestamp, quote, status badge (WEAPONIZED / PARTIALLY USED / MISSED)
8. **Signal Reading Audit** — Timeline: signal + timestamp, client statement, agent response, correct/incorrect
9. **Objection Handling** — Each objection: client phrase, signal, agent response, assessment, reframe if needed
10. **The Closer's Edge** — Accent card with the one move
11. **Annotated Transcript** — Collapsible. Full transcript with inline tags.

### Interactions
| Element | Action |
|---|---|
| Section headers (click) | Smooth scroll to section |
| "Annotated Transcript" expand | Reveals full tagged transcript |
| Failure pattern Knowledge Hub link | → `/knowledge/[pattern-slug]` |
| Client Gold "How to deploy" (if missed) | Expands inline coaching block |
| Root cause pill (hover) | Tooltip explaining RC1 / RC2 / RC3 |
| Back button | → `/calls/history` or previous location |
| Manager only: "Download Report" | Exports report as PDF |

---

## SCREEN 5D — Call History
**Route:** `/calls/history`
**Access:** 🔁 Both (agent sees own, manager sees all with agent filter)

### What's on screen
- Filter bar: Date range | Classification | Score range | (Manager only: Agent dropdown)
- Call list: date | agent name (manager view) | call type | classification badge | score | "View" link
- Pagination

### Interactions
| Element | Action |
|---|---|
| Filter controls | Update list in place |
| Call row or "View" link | → `/calls/[id]` |
| Pagination controls | Navigate pages |

---

## SCREEN 6 — AI Coach
**Route:** `/coach`
**Access:** 👤 Agent only

### What's on screen
- **Left panel** — Conversation list (newest first), "New Conversation" button at top
- **Right panel** — Active chat: agent messages (right-aligned), coach messages (left-aligned, CS avatar), typing indicator
- **Input bar** — Fixed bottom. Send on Enter. Shift+Enter for newline.

### Interactions
| Element | Action |
|---|---|
| "New Conversation" button | Creates new thread, opens blank right panel |
| Past conversation (click) | Loads that conversation in right panel |
| Send message | POST to `/api/coach/message` → streams response |
| Knowledge Hub reference in coach response | Linked chip → `/knowledge/[slug]` |

### Notes
- System prompt injected server-side per turn — includes agent name, level, top failure patterns, category averages, last 3 call summaries.
- Agents cannot delete conversations.

---

## SCREEN 7 — Agent Profile (Own)
**Route:** `/profile`
**Access:** 👤 Agent (own profile)

### What's on screen
- Name, level badge, join date
- **Overall stats** — Total calls analyzed, avg score all-time, avg score last 30 days, best score ever
- **Score trend chart** — Line chart, last 10 analyzed calls
- **Category averages** — Bar chart or card grid, all 6 categories
- **Badge display** — All 6 category badges with current tier
- **Top patterns** — 3 most recurring patterns overall with counts
- **Full call history** — Paginated table (same as `/calls/history` filtered to self)

### Interactions
| Element | Action |
|---|---|
| Call row | → `/calls/[id]` |
| Category badge | → `/knowledge/[category-slug]` |
| Pattern chip | → `/knowledge/[pattern-slug]` |

---

## SCREEN 7B — Agent Profile (Manager View)
**Route:** `/profile/[agentId]`
**Access:** 🔒 Manager only

### What's on screen
Same layout as Screen 7, plus:
- **Manager action bar** — "Upload Call for [Agent]" button → `/calls/upload` (agent pre-selected)
- Agent's full call history visible to manager

### Interactions
Same as Screen 7, plus:
| Element | Action |
|---|---|
| "Upload Call for [Agent]" | → `/calls/upload` with agent pre-selected |

---

## SCREEN 8 — Admin Panel 🔒
**Route:** `/admin`
**Access:** 🔒 Manager only

### What's on screen
- **Agent Roster table** — Name | Email | Status (active/inactive) | Last Login | Level | Actions
- **"Invite Agent" button** — top right
- **Upload History table** — all submissions with status, date, agent, score, retry button

### Interactions
| Element | Action |
|---|---|
| "Invite Agent" button | Opens invite modal (email input + "Send Invite" button) |
| "Send Invite" | Sends Auth.js invite email → closes modal → success toast |
| Agent row "Deactivate" toggle | Soft-deactivates agent (data preserved, login blocked) → confirm dialog first |
| Agent row "Reactivate" toggle | Re-enables login |
| Upload history "Retry" | Re-triggers failed analysis |
| Upload history row | → `/calls/[id]` |

---

## GLOBAL ELEMENTS (present on all authenticated screens)

### Sidebar (left, fixed)
| Item | Route | Visibility |
|---|---|---|
| Dashboard | `/dashboard` | Both |
| Knowledge Hub | `/knowledge` | Both |
| My Calls | `/calls/history` | Both |
| AI Coach | `/coach` | Agent only |
| Upload Call | `/calls/upload` | Manager only |
| My Profile | `/profile` | Both |
| Admin | `/admin` | Manager only |
| Sign Out | — | Both |

### Toast Notifications
| Trigger | Message |
|---|---|
| Agent tries manager route | "You don't have access to that" |
| Analysis complete (polling) | "Your call report is ready" + link |
| Level up | Replaced by full cinematic — no toast |
| Badge tier change | "[Category] badge upgraded to Proficient" |
| Invite sent | "Invite sent to [email]" |
| Analysis failed | "Analysis failed — tap to retry" |

---

## MODAL INVENTORY

| Modal | Trigger | Contents |
|---|---|---|
| Level Detail | Level badge click (dashboard) | Current XP, next level threshold, level name, what changes |
| Invite Agent | "Invite Agent" button in `/admin` | Email input, Send button, cancel |
| Deactivate Confirm | "Deactivate" toggle in `/admin` | "This will block [name] from logging in. Their data is preserved." Confirm / Cancel |
| Password Reset | "Forgot password?" on login | Email input, send reset link |
| File Preview | After file upload in `/calls/upload` | Parsed transcript text, confirm/re-upload options |

---

## FULL SCREEN MOMENTS (not modals — take over the viewport)

| Moment | Trigger | What happens |
|---|---|---|
| Call Pending | After upload submit | Full-page animated state until analysis completes |
| Level Up | XP crosses level threshold | Cinematic full-screen — level name large, ring pulses, then collapses back to dashboard |
| Score Reveal | Report loads (complete) | Orchestrated section-by-section animation — score ring fills, categories stagger in |

---

*The Certainty System — Screen Map v2.0 | February 2026*
