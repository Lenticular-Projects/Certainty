# The Certainty System — Web App
## Product Requirements Document (PRD) v4.0
*Built with Cursor / Windsurf / Claude Code*
*Last updated: February 2026*
*Changes from v3: Origin story screen, Closer's Edge repositioned, Focus Mode, team benchmarks, personal best moment, surprise insight feed, recovery language on reports, Design Philosophy updated with Malewicz depth/layering and designer references, Knowledge Hub expanded spec*

---

## 0. HOW TO READ THIS DOCUMENT

This PRD is a complete product specification. It describes **what the product does, who it's for, and how it is structured.** Visual design direction is captured as philosophy and intent — not as locked specs. Final color palette, component choices, and animation details will be defined separately once reference material and screenshots are provided.

**Do not invent features not listed here. Do not simplify features that are specified. Build exactly what is described.**

**Companion files required alongside this PRD:**

*Foundational Certainty System documents — `/documents/the-certainty-system-foundational-documents/the-certainty-system-documents/`*
1. `certainty_system_qa_prompt_v4.md` — The full LLM system prompt for call analysis. Drop into the system field of every analysis API call.
2. `the_certainty_system_UPDATED.md` — The full agent framework (Three Signals, Four Pillars, Root Causes, Nine Patterns). Source of truth.
3. `certainty_system_9_call_type_playbook_UPDATED.md` — All 9 call type playbooks. Seed the knowledge base from this.
4. `Certainty_System_Objection_Handbook_UPDATED.md` — All objection categories and response sets. Seed the knowledge base from this.
5. `certainty_system_close_confirmation_protocol.md` — The Close Confirmation Protocol. Seed as a knowledge item.
6. `certainty_system_agent_framework_UPDATED.md` — Three Signals, Four Pillars, Math Breakdown detail, Story Templates. Seed from this.
7. `certainty_system_story_bank.md` — Story templates. Seed as knowledge items.

*Core documents — `/documents/prd/core/`*
8. `certainty_system_screen_map.md` — Every screen, every element, every interaction. The master navigation blueprint for the entire product.
9. `cs_visual_design_brief.md` — Visual design brief for the entire product.

*Build reference documents — `/documents/prd/build-reference/`*
9. `cs_component_library_spec.md` — Every reusable component: props, states, variants, composition rules, build order. Read before building any UI.
10. `cs_data_flow.md` — Screen-by-screen data requirements: what fetches, when, in what order, what triggers re-fetch. Read before building any page.
11. `cs_copy_tone_guide.md` — Every string in the app. Three voices. Wrong/right rewrites. Banned words. Capitalization rules. Read before writing a single label.
12. `cs_error_edge_case_spec.md` — Every failure scenario: exact user-facing message, system behavior, recovery path. Read before shipping any feature.
13. `cs_api_contract.md` — Request/response shapes for all endpoints. LLM analysis response schema. The report renderer is built against this. Read before writing any API route or fetch call.
14. `cs_user_stories.md` — One story per user goal with binary acceptance criteria. A feature is done when every criterion passes.

*Screen specs — `/documents/prd/screens/`*
15. `certainty_system_agent_dashboard.md` — Agent dashboard deep-dive: every section, animation sequence, data requirements, empty states.
16. `cs_manager_dashboard.md` — Manager dashboard deep-dive: three core questions the screen answers, every section, upload flow, interaction map.

**Build order:**
1. Auth (login, roles, invite flow)
2. Database schema + seed knowledge base
3. Knowledge Hub (no AI needed — static content, but exhaustive)
4. Agent Profile + Manager Dashboard (read-only first)
5. Call Upload + Analysis Engine (LLM integration)
6. Call Report renderer
7. AI Coach
8. Gamification layer (XP, levels, badges, feed, Focus Mode, surprise insight)
9. Origin story screen (first-login experience)
10. Polish pass (animations, motion, empty states, error states)

---

## 1. PRODUCT OVERVIEW

### What This Is

A web-based performance coaching platform for Medicare Advantage sales agents, built around The Certainty System — a proprietary sales framework. The platform has two functions that work together:

**Function 1 — Knowledge Hub:** A living reference library containing the complete Certainty System framework. Every call type, every objection response, every pillar, every failure pattern — organized for fast access so agents can study, self-coach, and look things up between calls. This is the educational layer.

**Function 2 — Agent Performance Engine:** Every call an agent makes can be submitted as a transcript. The platform analyzes it using the full Certainty System framework via LLM API, generates a forensic call report, tracks patterns over time, updates the agent's level and badges, and surfaces coaching feedback automatically. This is the accountability layer.

Together: agents learn the system in the Knowledge Hub, then see how well they're applying it in their call reports, then return to the Knowledge Hub for the specific areas where they're failing. The loop closes itself.

### Who Uses It

- **Agents (~10 at launch, scaling to 30+):** View their own dashboard, scorecard, call reports, Knowledge Hub, AI Coach. Cannot see other agents' data. Cannot upload transcripts.
- **Managers (2 at launch):** Everything agents see, plus: upload transcripts for any agent, view all agent profiles, manage accounts, see team-wide pattern trends.

### One-Line Summary Per Feature
- **Knowledge Hub** — Read the system. Look things up. Get better on your own time. The most content-rich section of the app — exhaustive by design.
- **Call Analysis** — See exactly what happened on your call, timestamped, with exact language alternatives.
- **Agent Dashboard** — Your score, your level, your patterns, your focus. The home base.
- **Manager Dashboard** — See your whole team at a glance. Upload calls. Track patterns.
- **AI Coach** — Ask anything. Get answers from the system, applied to your actual call history.

---

## 2. TECH STACK

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | Full-stack in one repo. API routes built in. Vercel deploys natively. |
| Language | **TypeScript** | Required. Type safety across the full stack. |
| Styling | **Tailwind CSS** | Utility-first. Fast iteration. |
| Animation | **Framer Motion** | Primary animation library. Push it — this is not a place for default transitions. |
| Database | **Vercel Postgres (Neon)** | Native to the Vercel ecosystem. No separate Supabase project. |
| Auth | **Auth.js (NextAuth v5)** | Email/password. Role-based. Credential provider + JWT sessions. No third-party auth service required. |
| LLM / Call Analysis | **Anthropic Claude API** | Model: `claude-sonnet-4-6`. Configured via env var. |
| File Storage | **Vercel Blob** | Transcript uploads (TXT, PDF, DOCX). Native to Vercel ecosystem. |
| Semantic Search | **pgvector** (Postgres extension on Neon) | Knowledge Hub AI search. Cosine similarity. |
| PDF/DOCX Parsing | **pdf-parse + mammoth** (npm) | Server-side extraction before LLM submission. |
| Hosting | **Vercel** | Native Next.js hosting. Auto-deploys from GitHub. |
| Environment | `.env.local` dev / Vercel env vars prod | |

**Do not use:** Redux, class components, CSS modules, Supabase, any auth service other than Auth.js.

---

## 3. DESIGN PHILOSOPHY

*This section captures the creative direction in language. Final implementation details — palette, specific component styling, typography choices — will be refined separately using reference screenshots and visual inspiration. This philosophy governs every decision until then.*

### The Core Feeling

This platform needs to feel like something agents **want to come back to** — not a compliance tool they are required to open. It should feel like a journey. Every session should feel like progress. The experience should be light, engaging, and slightly playful without ever tipping into corny.

The word to hold onto: **expressive without being loud.**

### Light Mode — Intentional and Specific

Light mode is the correct choice here. This is a productivity tool agents use during their working day — light mode is more readable in normal conditions. The performance coaching angle benefits from a sense of openness and energy rather than the closed, serious weight of dark UI. And it differentiates: everything in insurance and Medicare tech defaults to dark corporate blue.

Light mode here should not feel like a default. It should feel **warm, clean, and alive** — achieved through tonal variation, surface depth, and strategic color rather than making everything white with thin borders.

### Material 3 Expressive as a Reference Point

Google's Material 3 Expressive (2025) is the right philosophical reference. The principles worth borrowing:

- **Springy, physics-based motion** — animations that feel like they have mass and momentum, not easing curves applied to boxes
- **Expressive color** — color used to communicate meaning and emotional state, not just to decorate
- **Shape as personality** — rounded geometry that feels considered, not defaulted
- **Motion as communication** — every transition tells the user what just happened and where they are

This is not about using Material components. It is about the same *philosophy* — UI should feel responsive, physical, and emotionally resonant.

### The Japanese Design Influence

The Japanese aesthetic reference — the **functional warmth** found in Japanese product and app design — translates to specific principles:

- **MA** — intentional negative space. Elements breathe. Nothing is crammed. The space between things is as considered as the things themselves.
- **Emotional connection through small details** — micro-interactions, hover states, and transitions designed for delight, not just function.
- **Information density without visual noise** — hierarchy and containment rather than whitespace as the only tool.
- **Natural color sensibility** — soft, intentional palettes. Not corporate. Not loud. Colors that feel chosen rather than generated.

### The Liquid Element

The "liquid" quality shows up in:
- **Motion** — elements that flow into and out of view rather than appearing or disappearing
- **Surfaces** — subtle tonal shifts and depth that give surfaces life without harsh edges
- **State transitions** — pending → complete, score revealed, level up — these should feel like water moving, not things snapping into place

### Framer Motion — Used to Its Limit, Not Its Default

Framer Motion has a ceiling most apps never approach. This app should approach it:

- **No default fade/slide combinations** — every transition specific to the content
- **Stagger and sequence** — multiple elements revealing in choreographed order
- **Spring physics throughout** — `type: "spring"` with custom `stiffness` and `damping`, not easing curves
- **Shared layout animations** — elements that morph between states rather than cut
- **Gesture-driven interactions** — drag and swipe where appropriate
- **Orchestrated sequences** — level-up, score reveal, report load — these are cinematic moments

What to avoid: the standard AI-generated pattern of cards that fade up 8px. That is the floor, not the ceiling.

### What This Is NOT

- Dark mode navy with gold accents (that was v2 — it is gone)
- Generic SaaS dashboard with a sidebar and white cards
- Corny gamification — big shiny badges that look like a school reward app
- Over-animated to the point of distraction
- Healthcare software aesthetic in any form

### Depth, Layering, and Surface (Malewicz Principle)

Michał Malewicz's work on glassmorphism and depth-based UI — the foundational influence behind Apple's Liquid Glass in iOS 26 — contributes one principle: **elevation should communicate meaning, not decoration.**

This does not mean frosted glass everywhere. Specific surfaces feel elevated above others. The rule:

- **Glass treatment (frosted, translucent, background blur):** Reserved for achievement surfaces only — badge displays, the Closer's Edge card, the personal best moment, the score ring container, modal overlays. Anywhere something feels earned or premium.
- **Flat tonal surfaces:** Body content, data tables, transcript text, form inputs. Legibility is always the priority on content-dense screens.
- **Never glass on body copy.** A 54-year-old agent reading a dense annotated transcript through a frosted layer is not premium — it is inaccessible.

### Design Confidence (Halo Lab Principle)

Halo Lab's neubrutalist work is not the aesthetic here — thick black borders and clashing hues are wrong for this audience and context. What it contributes is **attitude**: the willingness to have a visual point of view, to use scale and weight decisively, to not default to safe.

This translates to bold typographic hierarchy, decisive use of color as signal (not decoration), and components that feel built for a purpose rather than assembled from a library. This product should feel designed, not scaffolded.

### Data as Visual Story (Dashboard Specialist Principle)

A score of 61/100 by itself means nothing. A score of 61/100 surrounded by category bars, a trend line, a team benchmark, and a pattern alert becomes a coaching conversation. Every data element on every screen should serve a narrative, not just display a number.

### Open for Visual Direction

The following will be decided once reference screenshots and inspiration are provided:
- Final color palette (warm, tonal, light — amber/gold or deep teal accent space likely)
- Typography selection
- Component shape language (radius, shadow, border approach)
- Specific animation choreography per section
- Icon set
- Whether illustration or character elements are appropriate for empty states / origin story

---

## 4. INFORMATION ARCHITECTURE

```
/ (Login)
├── /welcome                         First-login origin story (agent only, one-time)
├── /dashboard
│     Agent: score block, recent calls, pattern alert, AI Coach prompt, badges
│     Manager: team table, upload CTA, pattern summary
│
├── /knowledge
│   ├── /knowledge/call-types        9 call type tiles
│   ├── /knowledge/objections        9 objection tiles
│   ├── /knowledge/[slug]            Individual content page
│   └── /knowledge/search            Semantic search
│
├── /calls
│   ├── /calls/upload                Manager only
│   ├── /calls/[id]                  Full analysis report
│   └── /calls/history               Paginated call list
│
├── /coach                           AI Coach chat
│
├── /profile                         Own profile
│   └── /profile/[agentId]           Manager: any agent profile
│
└── /admin                           Manager: agent management
```

---

## 5. AUTHENTICATION & ROLES

### Login Page (`/`)

Full-screen layout. Centered card (max-width 400px). App logo/wordmark above. Email + password fields. Submit button. "Forgot password" link below. No public signup — all accounts created by managers.

**Error handling:** Inline validation below fields. "Invalid credentials" — do not specify which field failed.

### Auth Rules
- All routes except `/` require auth — middleware redirects to `/`
- Manager-only routes: agent access redirects to `/dashboard` with toast notification
- Access control enforced at both middleware (route) and API (data) level
- Session: 7-day JWT via Auth.js, auto-refresh on activity

### Roles
- `agent` — own data only
- `manager` — all data, upload capability, admin panel

---

## 5A. FIRST-LOGIN ORIGIN STORY

### Route: `/welcome`
### Access: Agent only — shown exactly once, on first login. Never shown again.

### Purpose
This is the emotional foundation of the entire product. Before an agent ever sees their dashboard, score, or levels — they understand what they are joining. Not a tutorial. Not a feature walkthrough. A narrative.

### What's on screen
Full-screen experience. No sidebar. No nav. No skip button for the first 8 seconds.

- Single column, centered, generous padding
- The Certainty System wordmark or mark at top
- Text reveals in sections with spring-physics stagger (not scrolled — auto-advances or tap to advance):

**Beat 1:**
"Most agents know their products. They know the plans, the benefits, the numbers."

**Beat 2:**
"What separates the ones who close is something different. They know how to read a room. How to hear what a client doesn't say. How to make the cost of staying put feel real."

**Beat 3:**
"That's what The Certainty System teaches. Not scripts. Craft."

**Beat 4:**
"You'll learn to read Three Signals. Work Four Pillars. Recognize Nine Patterns. And understand exactly why every call ends the way it does."

**Beat 5:**
"Every call you make is a lesson. This platform finds it."

**CTA button appears:**
"Enter The System →"

### Behavior
- Clicking CTA redirects to `/dashboard`
- `has_seen_welcome` flag set to `true` in `users` table — never shown again
- If agent navigates away before completing, shown again on next login until CTA is clicked
- Managers never see this screen

### Database change
Add `has_seen_welcome BOOLEAN DEFAULT false` to `users` table.

---

## 6. KNOWLEDGE HUB

### Design Principle

The Knowledge Hub is the most important educational surface in the product. It is **exhaustive by design** — every call type, every objection, every pillar, every failure pattern, every protocol, every story — fully documented and immediately accessible. Agents should be able to open it mid-shift and find exactly what they need in under 30 seconds. Every failure pattern flagged in a call report links directly to the relevant hub page.

### Index (`/knowledge`)

Large search bar (centered, prominent) at top — always visible on this screen. Below it: two large clickable panels:
- **Browse by Topic** → call-types grid (default), sub-nav to switch to objections
- **Search the System** → `/knowledge/search`

Below the panels: a "Quick Reference" chip row — Three Signals | Four Pillars | The Math Breakdown | Close Confirmation | Nine Patterns. Each chip links to the relevant `/knowledge/[slug]` page.

**Last Studied tracking:** Each call type and objection tile shows a faint "Last studied: X days ago" timestamp so agents can see gaps in their own review at a glance.

---

### Call Type Tiles (`/knowledge/call-types`)

3×3 grid. Each tile:
- Call type name (large, prominent, semibold)
- One-sentence summary
- Signal pill (GREEN / RED / YELLOW)
- Hover state with elevation and visual response

**9 Call Types:**
1. Money Caller — "Calling about the spending card, OTC allowance, or Part B giveback"
2. Scared Switcher — "Interested but afraid of losing something they trust"
3. Misinformed — "Operating on false beliefs from TV ads or bad intel"
4. Third Party Controlled — "A family member or spouse is the real decision-maker on this call"
5. Detail Staller — "'I want to think about it' is a polite exit, not an information request"
6. Time Bomb — "Willing to enroll but running out of time on this specific call"
7. Commercial Myth Caller — "Expectations set by TV ads don't match what's actually available"
8. Veteran — "VA benefits user who sees Medicare Advantage as competition to what they have"
9. Timing Objector — "'I'll wait until open enrollment' — make the wait expensive in real dollars"

---

### Objection Tiles (`/knowledge/objections`)

3×3 grid. Same tile layout:
- Client phrase in quotes (prominent)
- Signal pill (RED or YELLOW)
- Emotional subtext — one line

**9 Objection Categories:**
1. "I need to think about it / talk to my doctor / talk to my family"
2. "I'm happy with what I have — my plan is fine"
3. "I don't want to change my doctors"
4. "I've heard bad things about Medicare Advantage"
5. "I can't afford it — I'm on a fixed income"
6. "I'm not ready yet — call me back later"
7. "Send me something in the mail first"
8. "My [family member] handles all of this"
9. "I don't trust insurance companies"

---

### Individual Content Page (`/knowledge/[slug]`)

**Call Type page sections (in order):**
1. Hero block: name (H1), signal pill, one-sentence description
2. Who This Is — 2–3 sentence caller profile
3. Identify in the First 2 Minutes — exact client phrases
4. Primary Move — accent-colored callout block. Bold. The one thing to do.
5. Biggest Mistake to Avoid — warning-tinted block
6. Response Options — tabbed: Option 1 | Option 2 | Option 3. Exact language per tab.
7. What's Underneath Emotionally — 1–2 sentences
8. Related Objections — linked chips

**Objection page sections (in order):**
1. Hero block: client phrase large + quoted, signal pill
2. What's Underneath — emotional subtext
3. What NOT to Say — warning-tinted block
4. Response Options — tabbed: Option 1 | Option 2 | Option 3
5. Relevant Pillar — which pillar this tests
6. Related Call Type — linked chip

**Framework pages (Pillars, Patterns, Protocol, Stories):**
Single-column article. Clean render. Exact language examples in styled blocks.

**Breadcrumb navigation at top:** Knowledge Hub > [Section] > [Item]

---

### Semantic Search (`/knowledge/search`)

- Large centered input. Placeholder: *"Try 'scared switcher', 'math breakdown', or 'what do I say when they say they're happy'"*
- Trigger: Enter key or 400ms debounce
- Results: cards with type badge + title + one-line excerpt + View link
- **Never returns empty.** If no close match, show closest result labeled "Closest match"
- Powered by pgvector cosine similarity on `knowledge_items.embedding`

---

## 7. CALL ANALYSIS ENGINE

### Upload (`/calls/upload`) — Manager Only

**Step 1 — Select Agent:**
Dropdown of all active agents. Nothing else enabled until agent is selected.

**Step 2 — Input Transcript:**
Two tabs:
- **Paste Text** — large textarea
- **Upload File** — drag-and-drop zone. Accepts `.txt`, `.pdf`, `.docx`. Server parses text, shows preview before submit.

**Step 3 — Call Details (optional):**
- Date picker (defaults today)
- Manager notes textarea

**Step 4 — Submit:**
"Analyze Call" button. On click: spinner + "Sending to analysis engine..." → redirect to `/calls/[id]` showing pending state.

---

### Pending State (`/calls/[id]` while analyzing)

Full-page animated state — not a spinner widget.
- Central animated element (liquid/pulse quality — exact design TBD)
- Agent name + call date above
- Rotating subtitle cycling every 3 seconds: "Reading signal patterns..." / "Evaluating the Four Pillars..." / "Building your report..." / "Almost there..."
- Polling `/api/calls/status/:id` every 5 seconds
- On `complete`: full report reveals with orchestrated animation sequence

---

### Call Report (`/calls/[id]`)

Most important page in the app. Every section intentional and readable.

**Report Header:**
- Agent name + call date
- Classification badge (large): ENROLLED | MISSED OPPORTUNITY | UNCLOSABLE | CORRECT NO-SALE
- Total score: large number + `/100`
- Root cause pill: RC1 | RC2 | RC3
- *For Correct No-Sale: display rescaled score with note "Scored on execution — 90pt scale, rescaled to 100"*

**Section 1 — Executive Summary:**
Full-width card. Prose paragraphs. No bullet points. Sets the tone.

**Section 2 — Certainty Score Breakdown:**
6-category layout (v4 scoring framework — not the old 4-pillar scorecard). Each category card:
- Category name
- Score (large) + max points
- Color-coded bar: high / mid / low thresholds
- Verdict text + "To improve this score" line
- Animated on mount
- Overall score ring (SVG, animated) displayed prominently

*Categories: Lead (20) | Signal Reading (20) | Math Breakdown (20) | Objection Handling (15) | Call Outcome Quality (10) | Compliance & Professionalism (15)*
*For Correct No-Sale: Call Outcome Quality shown as "N/A — Not scored" with brief explanation*

**Section 3 — Failure Patterns:**
Shown only if patterns present. Each pattern:
- Number + name in warning-tinted header
- Timestamp badge
- What happened (prose)
- What should have happened (prose)
- Exact language to use — accent-tinted styled block

**Section 4 — Strengths:**
Shown only if present. Each:
- Category badge + timestamp
- What happened
- Why it worked

**Section 5 — The Math Breakdown:**
Always shown. Includes:
- Step 1 / Step 2 / Step 3 completion indicators (✅ / ❌ / ⚠️ partial)
- Verdict badge: COMPLETE | INCOMPLETE | NOT ATTEMPTED
- Comparison table (styled, not a code block)
- Annual Net Impact row highlighted
- "Cost of Inaction" prose below table
- If incomplete or absent: callout showing "What the client never understood"

**Section 6 — Client Gold Audit:**
Each Client Gold moment:
- Timestamp + client quote (accent-tinted)
- Status badge: WEAPONIZED | PARTIALLY USED | MISSED
- "How to deploy" shown if missed or partial

**Section 7 — Signal Reading Audit:**
Timeline layout. Each entry:
- Signal icon (GREEN / RED / YELLOW) + timestamp
- Client statement (quoted)
- Agent response (quoted)
- ✅ CORRECT or ❌ INCORRECT
- If incorrect: callout with correct move

**Section 8 — Objection Handling:**
Each objection:
- Numbered header with client phrase
- Signal + timestamp
- Agent response
- Assessment + reasoning
- If incorrect: exact reframe in accent-styled block

**Section 9 — Annotated Transcript:**
Collapsible. Full transcript with inline tags: signal pills, Client Gold chips, pattern flags, objection markers at correct timestamps.

---

## 8. AGENT PROFILE & GAMIFICATION

### Agent Dashboard (`/dashboard`)

**Score block:**
- Current Certainty Score (avg of last 5 calls) — large, animated ring
- Score trend vs. previous 5 calls (up / down / flat)
- Level badge + name + XP bar showing progress to next level
- **Level Preview line:** Always visible below XP bar — "[X XP] to [Next Level Name]" — so the destination is always concrete, never abstract

**Recent calls strip:**
3 most recent analyzed calls. Each: date, call type, classification badge, score. Click → full report.

**Pattern alert:**
If a pattern appears in 3+ of last 5 calls: prominent card with pattern name, count, and link to relevant Knowledge Hub page.

**Focus Mode:**
Agent pins 1–2 scoring categories they are actively working on. Selected categories are highlighted throughout the dashboard (score breakdown, badge row, AI Coach context). A small "Change focus" link allows updating. Default on first login: no focus set, prompt shown — "Pin a category to focus your coaching." Focus selection is stored per agent in `agent_progress` as `focus_categories TEXT[]`.

**Team Benchmark (per category):**
On the score breakdown section of the dashboard, each category shows a single benchmark line: "Team avg: 13/20 · You: 11/20." Completely anonymized — no names, no ranking, no position indicator. Purpose is calibration only. Agents know what the standard looks like without public comparison.

**AI Coach prompt:**
Card with "Ask your coach anything" → `/coach`
If Focus Mode is active, the card subtext is contextual: "Ask me about [Focus Category] — I can show you what to work on next."

**Surprise Insight (CD7 — Unpredictability):**
Approximately 1 in 5 dashboard visits, the system surfaces an unprompted pattern observation in the feed — generated server-side based on recent call data. Format: "I noticed something about your last [N] calls. →" Agent taps to expand a 2–3 sentence coaching insight. This is not a notification. It appears as a feed entry with a distinct visual treatment (slightly elevated, different icon). Frequency is intentionally low — if it appears every session it becomes noise.

---

### Levels & XP

XP earned = Certainty Score per analyzed call (0–100 per call).

| Level | Name | XP Range |
|---|---|---|
| 1 | Green Light | 0–299 |
| 2 | In the Frame | 300–599 |
| 3 | Signal Reader | 600–999 |
| 4 | The Reframer | 1,000–1,399 |
| 5 | Momentum Builder | 1,400–1,799 |
| 6 | The Shift | 1,800–2,249 |
| 7 | Lead Holder | 2,250–2,749 |
| 8 | Closer | 2,750–3,299 |
| 9 | Certainty | 3,300+ |

*Level-up should be a designed cinematic moment — not a toast notification. Full-screen, then collapses back to context.*

**Personal Best Moment:**
When an agent hits their best overall score ever or their best score on any individual category, it triggers a designed moment — not full-screen like level-up, but elevated above a toast. A centered overlay card appears for approximately 3 seconds (dismissable): the category name, the new best score, and a brief line like "Your best Math Breakdown yet." Spring scale animation in, liquid fade out. Cannot be missed. This is a reward for a real achievement and should feel like one.

---

### Category Badges

6 badges, one per scoring category. Three tiers:
- **Developing** (default) — neutral treatment
- **Proficient** — elevated treatment. Threshold: at or above target on that category in 3 of last 5 calls.
- **Sharp** — premium treatment. Threshold: near-perfect on that category in 4 of last 5 calls.

Recalculate after every new analysis. Tiers can downgrade if performance drops. Tier changes generate a pattern feed entry.

*Badges should feel earned — design pass required. Not generic.*

---

## 9. AI COACH

### Route: `/coach`

**Layout:**
- Left panel: conversation list, newest first. "New Conversation" button at top.
- Right panel: active chat. Agent messages right-aligned. Coach messages left-aligned with CS avatar. Typing indicator with character.
- Input bar fixed at bottom. Send on Enter. Shift+Enter for newline.

**System prompt injected server-side per turn:**

```
You are The Certainty System Coach — an elite Medicare Advantage sales coach.
You help agents improve using The Certainty System framework exclusively.

Agent profile:
- Name: [agent_name]
- Level: [level_name]
- Top failure patterns (last 10 calls): [comma-separated list]
- Category averages (last 5 calls): Lead [x]/20, Signal Reading [x]/20,
  Math Breakdown [x]/20, Objection Handling [x]/15,
  Call Outcome Quality [x]/10, Compliance [x]/15
- Last 3 calls: [brief summaries]

Rules:
- Reference the agent's actual data when relevant
- Use The Certainty System's exact terminology (Three Signals, Four Pillars,
  Nine Patterns, The Math Breakdown, The Shift, etc.)
- Never contradict the framework
- Stay on topic: sales performance and The Certainty System only
- Be direct, tactical, specific. Never generic.
- If asked something outside sales coaching: "That's outside what I coach on.
  Let's focus on what's going to move your numbers."
```

Conversation history stored per agent. Agents can return to past conversations. No conversation count limit.

---

## 10. MANAGER DASHBOARD

### Manager's `/dashboard`

**Summary bar:**
- Total calls analyzed this week
- Team average score
- Most flagged pattern this week

**Team table:**
| Agent | Level | Last Analyzed | Avg Score | Top Pattern |

Click row → `/profile/[agentId]`

"Upload Call" button persistent in top-right — always visible to managers.

---

### Admin (`/admin`)

- Agent roster: name, email, status, last login, level
- "Invite Agent" → modal with email input → sends invite email
- Deactivate toggle per agent (soft delete — data preserved, login blocked)
- Upload history: all submissions with status, date, agent, score when complete, retry button if failed

---

## 11. DATABASE SCHEMA

```sql
-- Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('agent', 'manager')),
  created_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  has_seen_welcome BOOLEAN DEFAULT false             -- origin story shown once
);

-- Calls
CREATE TABLE calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES users(id) NOT NULL,
  uploaded_by UUID REFERENCES users(id) NOT NULL,
  transcript_raw TEXT NOT NULL,
  call_date DATE DEFAULT CURRENT_DATE,
  manager_notes TEXT,
  analysis_status TEXT DEFAULT 'pending'
    CHECK (analysis_status IN ('pending', 'processing', 'complete', 'failed')),
  analysis_result JSONB,
  total_score INTEGER,
  call_classification TEXT
    CHECK (call_classification IN (
      'enrolled', 'missed_opportunity', 'unclosable', 'correct_no_sale'
    )),
  root_cause TEXT CHECK (root_cause IN ('RC1', 'RC2', 'RC3', 'none')),
  failure_patterns TEXT[],
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Agent progress & gamification
CREATE TABLE agent_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  current_level_name TEXT DEFAULT 'Green Light',
  focus_categories TEXT[],                           -- agent-selected focus (max 2)
  last_analyzed_call_id UUID REFERENCES calls(id),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Category badges (6 categories — v4 scoring framework)
CREATE TABLE agent_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES users(id) NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'lead', 'signal_reading', 'math_breakdown',
    'objection_handling', 'call_outcome_quality', 'compliance'
  )),
  tier TEXT DEFAULT 'developing'
    CHECK (tier IN ('developing', 'proficient', 'sharp')),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (agent_id, category)
);

-- AI Coach
CREATE TABLE coach_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES users(id) NOT NULL,
  title TEXT,
  started_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE coach_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES coach_conversations(id) NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Knowledge base
CREATE TABLE knowledge_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN (
    'call_type', 'objection', 'pillar', 'pattern',
    'protocol', 'story', 'framework'
  )),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  body TEXT NOT NULL,
  summary TEXT,
  tags TEXT[],
  signal TEXT CHECK (signal IN ('GREEN', 'RED', 'YELLOW')),
  embedding VECTOR(1536),
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Pattern / event feed
CREATE TABLE pattern_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES users(id) NOT NULL,
  feed_type TEXT NOT NULL CHECK (feed_type IN (
    'pattern_flagged', 'pattern_cleared', 'level_up',
    'badge_earned', 'personal_best', 'surprise_insight'
  )),
  content TEXT NOT NULL,
  related_call_id UUID REFERENCES calls(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  is_read BOOLEAN DEFAULT false
);
```

**Access control (enforced at API level):**
- `calls`: agents read own only; managers read/write all
- `agent_progress`, `agent_badges`, `pattern_feed`: agents read own; managers read all
- `coach_conversations`, `coach_messages`: agents access own only; managers no access
- `knowledge_items`: all authenticated users read; server-side writes only
- `users`: agents read own; managers read all

---

## 12. API ROUTES

```
POST   /api/auth/[...nextauth]         Auth.js handler (login, logout, session)
POST   /api/auth/invite                Manager only — sends invite email

GET    /api/agents                     Manager: all agents with progress
GET    /api/agents/:id/profile         Own or manager
GET    /api/agents/:id/progress
GET    /api/agents/:id/badges
GET    /api/agents/:id/feed            Paginated pattern feed
PATCH  /api/agents/:id/feed/:feedId    Mark read

POST   /api/calls/upload               Manager only — triggers analysis
GET    /api/calls/:id                  Full call record + analysis_result
GET    /api/calls/status/:id           Lightweight poll — {status, score}
GET    /api/calls/history              Paginated, filterable

POST   /api/coach/message              Agent only — sends + returns AI response
GET    /api/coach/conversations
GET    /api/coach/conversations/:id
POST   /api/coach/conversations        New conversation

GET    /api/knowledge                  All items (summary fields only)
GET    /api/knowledge/search?q=        pgvector semantic search
GET    /api/knowledge/:slug            Full content

GET    /api/admin/agents               Manager: full roster
PATCH  /api/admin/agents/:id           Manager: deactivate/reactivate
GET    /api/admin/uploads              Manager: upload history
```

---

## 13. CALL ANALYSIS PROCESSING FLOW

```
1.  POST /api/calls/upload
    - Validate: agent exists, transcript non-empty, manager role confirmed
    - If file: parse server-side (pdf-parse or mammoth)
    - INSERT call record, status: 'pending'
    - Return call ID immediately

2.  Background job starts (Next.js background task or Vercel function)
    - UPDATE status → 'processing'

3.  Build LLM request:
    - System: full contents of certainty_system_qa_prompt_v4.md
    - User: "Analyze this Medicare Advantage sales call:\n\nAgent: [name]\n\n[transcript]"
    - Model: claude-sonnet-4-6
    - Max tokens: 8000
    - JSON mode

4.  Parse response JSON
    - On parse failure: retry once with JSON-only instruction
    - On second failure: status → 'failed', save error_message

5.  On success, UPDATE calls:
    - analysis_result = full JSON
    - total_score = scores.total
      (for Correct No-Sale: raw/90 × 100, rounded)
    - call_classification, root_cause, failure_patterns extracted
    - status → 'complete'

6.  UPDATE agent_progress:
    - total_xp += total_score
    - Recalculate level and level_name

7.  UPDATE agent_badges:
    - Fetch last 5 calls per category
    - Apply tier thresholds, update if changed

8.  INSERT pattern_feed entries:
    - Pattern repeated 3x → 'pattern_flagged'
    - Pattern absent after appearing → 'pattern_cleared'
    - Level changed → 'level_up'
    - Badge tier changed → 'badge_earned'
    - New personal best category score → 'personal_best'
    - Surprise insight: server evaluates whether to generate one (~20% probability,
      capped at 1 per week per agent) → if yes, generates 2–3 sentence LLM insight
      from agent's recent call patterns → INSERT as 'surprise_insight' feed entry

9.  Frontend polling /api/calls/status/:id every 5 seconds
    - On 'complete': trigger report reveal animation sequence
```

---

## 14. KNOWLEDGE BASE CONTENT INVENTORY

Seed into `knowledge_items` at launch.

| Count | Type | Source |
|---|---|---|
| 9 | `call_type` | `certainty_system_9_call_type_playbook_UPDATED.md` |
| 9 | `objection` | `Certainty_System_Objection_Handbook_UPDATED.md` |
| 4 | `pillar` | `the_certainty_system_UPDATED.md` + `certainty_system_agent_framework_UPDATED.md` |
| 9 | `pattern` | `the_certainty_system_UPDATED.md` |
| 1 | `protocol` | `certainty_system_close_confirmation_protocol.md` |
| 4 | `story` | `certainty_system_story_bank.md` |
| 2 | `framework` | Three Signals + Three Root Causes from `the_certainty_system_UPDATED.md` |

**Total: ~38 records**

After seeding text, run an embedding job: for each record, call the embedding API, store result in `knowledge_items.embedding`. Enables semantic search via pgvector cosine similarity.

---

## 15. ENVIRONMENT VARIABLES

```bash
# Auth.js
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Vercel Postgres (auto-injected when database is connected in Vercel dashboard)
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=

# Vercel Blob (auto-injected)
BLOB_READ_WRITE_TOKEN=

# LLM
LLM_API_KEY=                         # Anthropic API key
LLM_MODEL=claude-sonnet-4-6
LLM_MAX_TOKENS=8000

# Embeddings
EMBEDDING_API_KEY=
EMBEDDING_MODEL=text-embedding-3-small

# App
NEXT_PUBLIC_APP_URL=
```

---

## 16. BASE COMPONENTS — BUILD THESE FIRST

Before any page, build these. Used throughout the app.

```
<PageWrapper>         Page transition — not a default fade. Designed specifically.
<Sidebar>             Fixed left nav — role-aware
<Card>                Content container — surface depth, not just a white box
<Tile>                Clickable grid tile — hover is a designed moment
<Badge>               type: classification | level | signal | pattern | category-tier
<CategoryScoreBar>    Colored progress bar per scoring category
<ScoreRing>           Animated SVG ring — spring physics on mount
<PatternTag>          Pattern chip — warning treatment
<ClientGoldTag>       Client Gold chip — accent treatment
<FeedbackBlock>       Timestamped call moment card
<TabGroup>            Animated tab switcher — shared layout animation
<AIChat>              Full chat UI
<Toast>               Notification system
<Modal>               Centered overlay — spring scale on open
<SlideOver>           Right-side slide-over panel
<EmptyState>          Empty screen — illustration potential
<LoadingPulse>        Loading state — liquid quality
<Tooltip>             Hover tooltip
```

---

## 17. EMPTY STATES

| Screen | Message |
|---|---|
| Agent call history | "No analyzed calls yet. Your manager will upload your first call soon." |
| Pattern feed | "After your first call is analyzed, coaching insights will appear here." |
| AI Coach | "Ask me anything about The Certainty System or your recent performance." |
| Manager team table | "No agents yet. Invite your first agent to get started." |
| Knowledge search | Never empty — always show closest match labeled "Closest match" |

*Empty states are a design opportunity — light illustration or character treatment TBD.*

---

## 18. MOTION PRINCIPLES

*Exact implementation choreography TBD — these principles govern all animation decisions.*

- **Physics over easing** — spring-based motion throughout. Things have weight and momentum.
- **Choreography over simultaneity** — elements reveal in sequence, not all at once
- **Transitions tell stories** — pending → complete should feel like something was built for you
- **Gestures feel physical** — draggable elements respond to velocity, not just position
- **Level-up is a cinematic moment** — full-screen, then collapses back
- **Score reveal is earned** — the number counts up, the ring fills with intent
- **`prefers-reduced-motion` always respected**

---

## 19. NON-FUNCTIONAL REQUIREMENTS

- **Page load:** < 2 seconds for all main routes
- **Call analysis:** < 60 seconds end-to-end (target < 30 seconds)
- **Uptime:** 99.5%
- **Data isolation:** Access control enforced at API level — agents cannot query other agents' data
- **Transcript storage:** Private Vercel Blob — no public URLs
- **Session:** 7-day JWT via Auth.js, auto-refresh
- **Accessibility:** WCAG AA contrast. Keyboard navigable. `prefers-reduced-motion` respected.
- **Error handling:** Every API call has a defined error state. LLM failures → call status `failed` + retry button. Network errors → toast.

---

## 20. LAUNCH CHECKLIST

**Infrastructure:**
- [ ] Vercel project created and connected to GitHub
- [ ] Vercel Postgres provisioned and connected
- [ ] pgvector extension enabled
- [ ] Vercel Blob storage connected
- [ ] All environment variables set in Vercel dashboard

**Auth:**
- [ ] Auth.js configured with credential provider
- [ ] 2 manager accounts created
- [ ] Agent invite flow tested end-to-end
- [ ] Role-based route protection tested
- [ ] Access control verified: agent cannot query another agent's calls

**Content:**
- [ ] Schema deployed (Section 11)
- [ ] All ~38 knowledge items seeded
- [ ] Embeddings generated for all knowledge items
- [ ] Semantic search tested: "scared switcher" → correct result
- [ ] Semantic search tested: "what do I say when they say they're happy" → objection result

**Call Analysis:**
- [ ] LLM API key configured and tested
- [ ] Analysis tested against 3 real transcripts
- [ ] Report renders correctly for all 4 classifications
- [ ] Correct No-Sale rescaling verified (55/90 → 61/100)
- [ ] Closer's Edge appears immediately below report header (not section 9)
- [ ] Recovery Line appears on Missed Opportunity reports only
- [ ] XP / level calculation verified
- [ ] Badge tier calculation verified (6 categories)
- [ ] Pattern feed generation verified
- [ ] Personal best moment triggers on new best score
- [ ] Surprise insight generates at ~20% rate (test with forced trigger)

**Engagement:**
- [ ] Origin story shows on first agent login, never again
- [ ] Focus Mode pins categories and updates dashboard + coach context
- [ ] Team benchmark shows on score breakdown (anonymized)
- [ ] Knowledge Hub "Last studied" timestamps update on page visit

**UI:**
- [ ] Spring physics throughout — no default easing curves
- [ ] Level-up cinematic working
- [ ] Score reveal animation working
- [ ] All empty states present and styled
- [ ] All error states present
- [ ] `prefers-reduced-motion` respected
- [ ] Tested at 1280px, 1440px, 1920px

**Final:**
- [ ] Custom domain configured
- [ ] End-to-end test: manager uploads real call → report generated → agent logs in and views it → AI Coach responds with agent context injected

---

## 21. OPEN DESIGN DECISIONS

*Resolved through visual reference and iteration — not in this document.*

- Final color palette (light mode — warm, tonal, expressive)
- Typography selection
- Component shape language (radius, shadow, border approach)
- Animation choreography per section (report reveal, level-up, pending state)
- Icon set
- Empty state illustration approach
- Character or mascot element (possible for empty states / onboarding)

---

*The Certainty System — Web App PRD v4.0 | February 2026*
*Stack: Next.js + TypeScript + Tailwind + Framer Motion + Vercel Postgres + Auth.js + Vercel Blob*
*LLM: claude-sonnet-4-6 | Design: Light mode, expressive, liquid motion, MA-informed, Malewicz elevation principles*
*Behavioral framework: Octalysis CD1 (origin story), CD2 (personal best), CD4 (Focus Mode), CD5 (team benchmarks), CD7 (surprise insight)*
*For AI IDE build — Cursor / Windsurf / Claude Code*