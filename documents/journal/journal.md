# Certainty System — Project Journal

---

## February 2025 — Initial Build

### What Was Built

Four HTML prototypes were designed and built to represent the core views of the Certainty System platform — a sales coaching tool for Medicare Advantage agents that uses AI to analyze call recordings and give agents structured performance feedback.

**Files:**
- `claude-prototypes/agent-dashboard.html` — Agent-facing performance view
- `claude-prototypes/knowledge-hub.html` — Learning and reference hub
- `claude-prototypes/manager-dashboard.html` — Manager team view
- `claude-prototypes/call-report.html` — Full call analysis report

### Design Direction

The v6 color block system was established and locked. Color variables and their usage rules:

- **Sage (#8FAF94):** Navigation column, reading mode accents. Positive performance indicators.
- **Ink (#131110):** Left panel column, selection states, navigation. Deliberate context-setting.
- **Terracotta (#E05C34):** Hero panel on agent and manager dashboards. Live performance indicators, urgency, failure patterns.
- **Mustard (#E9B840):** Marquee bar, XP progress, CTAs, focus selection borders.
- **Cream (#FBF8F3):** Main content area. Reading mode. Historical data and tables.
- **Cream-2 (#F0EBE1):** Table rows, hover states, secondary surfaces.

Shell grid: `grid-template-columns: 72px 210px 1fr` (three columns: sage icon nav, ink context panel, cream/terracotta main).

Fonts loaded from CDN: Geist Sans, Geist Mono, Playfair Display.

### Key Interactions Built

- **Focus queue (agent dashboard):** Click a category item in the left panel to add it to focus. Max 2 active at once. FIFO — clicking a third dequeues the oldest. Focused items show mustard border in the category badges row.
- **Score ring animation:** SVG circle using `easeOutBack` easing on load. Score number counts up using `easeOutCubic`.
- **Knowledge hub topic switching:** Clicking a topic in the left panel re-renders the tile grid via JS. Data lives in a `TOPICS` constant.
- **Knowledge hub search:** Debounced search (200ms) across all tile data. Shows search results list, hides tile grid.
- **Upload slideover (manager):** Fixed right panel with cream background. Opens by default in the prototype to demonstrate the interaction. Overlay dims the page behind it.
- **Transcript toggle (call report):** Button shows/hides the full transcript section. Text swaps between "Show" and "Hide."
- **Score row expand/collapse (call report):** Each category row has an expand button that shows/hides the detailed feedback paragraph.
- **Pattern radar bars (manager):** Animate width on load via CSS transition. Width target stored in `data-w` attribute on each bar element.
- **Active section tracking (call report):** Scroll event listener updates the active state of report nav links based on scroll position.
- **Entrance animations:** Most elements fade in and translate up/in with staggered delays using `opacity + transform` transitions triggered by `.visible` class additions.

### Responsive Behavior

- `< 1100px`: Ink panel (col 2) hidden, grid collapses to `72px 0 1fr`.
- `< 768px`: Icon nav narrows to `48px`, nav labels hidden, tile grid goes to single column.

### Source Files Referenced

- `certainty_system_9_call_type_playbook_UPDATED.md` — Full definitions, recognition cues, primary moves, and objection scripts for all 9 call types
- Visual direction reference: `documents/prd/design-research/prototypes/v6-color-block-evolved.html`

---

## February 27, 2026 — PRD Review, Gap Analysis, Clarity Pass

### Context

After building the 4 prototypes, a review session identified a core clarity problem across all files:

> "I don't know what I'm looking at. Someone who has no idea about the Certainty System should be able to go on here and understand what's going on."

The visual direction was confirmed as correct. The problem was **information clarity** — unfamiliar terms used without context, interactions that didn't signal their purpose, and sections missing from the call report that appear in every real analysis output.

### Decisions Made

**Scope:** Keep all existing structure. Add clarity copy and fix information gaps. Not a redesign.

**Visual note logged for future:** User prefers the bolder editorial direction of `02_color_block_dashboard.html` (large watermark score number, full-bleed terracotta) over the current more generic SaaS-leaning version. Not addressed this session.

**Level name correction:** "The Reframer" → "The Builder" for L4 across all files. This matches the correct level name from the copy/tone guide.

**Standing rule established:** `journal.md` is updated at the end of every future session.

### Gaps Found in Call Report

The existing call report was missing 5 of the 11 sections that appear in every real analysis output. The `robert-pegley-vs-massey.md` analysis example was used as the canonical structure reference. Missing sections:

1. **Call Snapshot** — key/value metadata table (agent, client, classification, call type, duration, outcome, plans, score)
2. **What Agent Did Right** — positive findings with sage left border (previously absent entirely)
3. **Math Breakdown** — comparison table (Feature | Current Plan | Available Plan | Difference)
4. **Objection Handling Log** — per-signal blocks with quote, signal, agent response, assessment, correct language
5. **Close Confirmation Audit** — 2-question block: was close attempted? + last viable recovery window

Client Gold Audit was upgraded from a 3-badge display to a full 5-column table (Timestamp | What client said | Recognized? | Deployed? | What should have happened).

The annotated transcript was upgraded from a prose block with inline tags to a full timestamped table (Time | Speaker | Text | Signal | Coaching Note).

### What Was Changed This Session

**`agent-dashboard.html`**
- Added "CERTAINTY SCORE" label + descriptor ("How effectively you turn conversations into enrollments") below the score ring
- Added subtitle to YOUR FOCUS panel: "Select up to 2 categories to prioritize this week"
- Added short descriptor lines under each category badge chip (e.g., "Comparing plans in live numbers")
- Added "AI COACHING NOTE — from your last call" label above The Closer's Edge card
- Fixed L4 level name: "The Reframer" → "The Builder"
- Renamed "Objections" → "Objection Handling" in badge cell and focus panel
- Renamed "Lead Quality" → "Client Gold", "Compliance" → "Communication", "Call Outcome" → "Close Confirmation" in the badge row to match canonical category names

**`knowledge-hub.html`**
- Added click behavior to all tiles: click → right panel slides in
- Call Type tiles show full playbook content: definition, recognition cues, primary move (ink-bg block), what to avoid
- All other topic tiles show "Content coming soon" placeholder with topic name — keeps interaction consistent
- Added intro text above tile grid: "Select a topic from the left to browse coaching materials. Click any card to open the full guide."
- Fixed L4 level name: "The Reframer" → "The Builder"

**`call-report.html`**
- Full rebuild. All 11 sections present in correct order.
- Section order: Closer's Edge → Call Snapshot → Executive Summary → Score Breakdown → What Agent Did Right → Failure Patterns → Math Breakdown → Client Gold Audit → Objection Handling Log → Close Confirmation Audit → Full Transcript
- Data sourced from `robert-pegley-vs-massey.md` (Missed Opportunity, score 28/100)
- Report nav updated with all 11 jump links, conditional dots (sage = positive, terracotta = failure/missing, none = neutral)
- Score color logic: ≥85% sage, 60–84% mustard, <60% terracotta
- Kept: v6 color system, 260px ink report nav, entrance animations, scroll-observer active section tracking
- "Closer's Edge" remains first above fold (deliberate UX decision — most actionable coaching first)

**`manager-dashboard.html`**
- Added subtitle under Pattern Radar header: "Frequency of failure patterns across team this month"
- Added status legend row in team table: green = Active, amber = Needs attention, grey = Dormant, outline = New agent
- Fixed L4 level name: "The Reframer" → "The Builder" (affects Alex J. and Jordan M. rows, plus recent activity card)

### What's Still Open

- Call report uses Robert Pegler vs. Massey as placeholder data. Real agent-specific data population not yet addressed.
- Knowledge Hub non-call-type topics (Objections, Three Signals, Four Pillars, Math Breakdown, Close Confirmation, Nine Patterns) show "Content coming soon." Full content hardcoding for these 6 topics is future work.
- Bold editorial direction (`02_color_block_dashboard.html` style — large watermark score, full-bleed terracotta) is a future iteration of the agent dashboard hero.
- No backend or data layer exists yet. All prototypes use hardcoded data.

---

## February 27, 2026 — Typography Audit, Knowledge Hub Rebuild, Help Overlays

### Context

After reviewing all four prototypes, two categories of feedback emerged:

1. **Call report typography:** The "exact language" blocks used `var(--ink)` black backgrounds with `Geist Mono`, which read as a terminal/code UI rather than coaching content. The executive summary block (cream-2 bg, ink left border) was called out as "super good" and became the reference for all content blocks going forward.

2. **Knowledge Hub structure:** The hub had no landing state and the topic content didn't reflect the actual source documents. User confirmed: rename "Call Types" → "Caller Types," add a true overview landing page, fill in real content for all topics, and expand Objections to all 13 handbook sections.

3. **Help overlay:** A ? icon was requested in the bottom-left of the icon nav on every page — opens a modal explaining what the page does and how to use it.

### Source Documents Used

- `the_certainty_system_UPDATED.md` — Three Signals, Four Pillars, Nine Patterns, Close Confirmation Protocol, Math Breakdown, Caller Type Framework content
- `Certainty_System_Objection_Handbook_UPDATED.md` — All 13 objection sections

### What Was Changed

**`call-report.html`**
- Removed Geist Mono + black bg from all "exact language" blocks → now cream-2 bg + 3px ink left border + Geist Sans
- Same treatment applied to: Closer's Edge recovery text, Close Confirmation window, Score Breakdown "Improve this" blocks
- Math verdict changed from Geist Mono to Geist Sans (keeps terracotta bg)
- `.section-eyebrow` upgraded: now Geist Sans 800 weight with bottom rule — actual section headings that land
- Client Gold "what client said" column text enlarged (14px Playfair italic)

**`knowledge-hub.html`**
- "Call Types" → "Caller Types" throughout; topic name updated to "The Nine Caller Types"
- Added "Overview" as the default landing view — intro paragraph + 8 topic cards in a 2-col grid (clicking a card navigates to that topic)
- Story Bank added as a topic (coming soon state)
- Objections expanded from 9 generic tiles to 13 tiles matching the actual handbook sections (Fear of Change, Commercial, Stalls, Third-Party, Loyalty, Timing, Benefit Comparison, Trust, Fear of Losing Benefits, Financial, Resistance at Close, Momentum Killers, Universal Responses)
- Three Signals, Four Pillars, Math Breakdown (3 steps), Close Confirmation (3 components), Nine Patterns: all replaced with real content from source documents
- `dp-primary-move` block: same fix as call report — no longer dark/terminal; now cream-2 + ink border

**All 4 prototypes**
- Added ? help button in bottom of sage icon nav (above avatar)
- Clicking opens a full-screen overlay modal with page-specific content explaining what the page does, what each element means, and how to use it

### What's Still Open

- Story Bank content — no source file exists yet for this topic
- Call report: real agent-specific data population (still using Robert Pegler vs. Massey placeholder)
- Bold editorial direction for agent dashboard hero (large watermark score, full-bleed terracotta) — logged twice now, still future
- No backend or data layer exists yet. All prototypes use hardcoded data.
- Agent-level calls list view — user noted agents should be able to see individual calls from the dashboard. Future feature.
- Manager team drill-down — clicking active agents should surface a sub-view of those agents. Future feature.

---

## February 27, 2026 — Migration to Next.js

### Context

The four HTML prototypes have completed their job. They validated the v6 color block design system, confirmed all interaction patterns (focus queue, score ring, slideover, scroll nav, transcript toggle), and proved the PDF → text → JSON → render flow. At 6,167 lines across 4 files with ~1,400 lines of embedded JS and heavy duplication of CSS variables, fonts, and shell structure, they have hit their natural ceiling as a build medium.

The PRD API contract already specifies Next.js + Auth.js v5 as the target stack. The decision was made to move forward.

### Decision: Migrate to Next.js + TypeScript + CSS Modules

**What stays the same:**
- Every visual design decision — colors, grid, typography, spacing
- The CSS variable system — ported verbatim into `globals.css`
- All interaction patterns (focus queue, slideover, score animation, scroll nav)
- The JSON schema for call analysis

**What improves:**
- Shared components replace 4× duplication of shell, nav, and badges
- TypeScript interfaces formalize the analysis JSON schema
- File-based routing replaces `window.location.href` hacks
- `next/font` handles Geist + Playfair once, globally
- Foundation is correct for Auth.js, API routes, and real data

**No Tailwind** — pure CSS Modules, consistent with project preference.

### Tech Stack

- Next.js 14 (App Router) — routing, layout, server components
- TypeScript — JSON schema types, component props
- CSS Modules — scoped styles per component
- Geist font via `next/font/local`, Playfair Display via `next/font/google`

### Repository Layout

The Next.js app lives at `Certainty/web/`. Nothing existing moves. Prototypes and docs remain untouched — they are now the design spec and pixel-accurate reference for the Next.js components.

```
Certainty/
├── claude-prototypes/   ← HTML reference specs (finished, untouched)
├── gemini-prototypes/   ← untouched
├── documents/           ← PRD, API contract, etc. (untouched)
└── web/                 ← Next.js app (new)
```

### HTML Prototypes Status

Finished. They are:
- The design spec — Next.js components are built to match them pixel-for-pixel
- The reference for all CSS values — every number, color, and spacing decision lives there
- Testable without a dev server — useful for quick design checks

They will not receive further development. The Next.js app takes over.

### What's Open

- Phase 1 (foundation) underway: `globals.css`, fonts, `Shell`, `NavBar`
- Phase 2: port each page against its HTML prototype
- Phase 3: data layer — TypeScript interfaces, React state, real API calls

---

*Standing rule: update this file at the end of every working session.*
