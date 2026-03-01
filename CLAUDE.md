# Certainty System — Claude Code Instructions

## Project Overview
Sales coaching platform for Medicare Advantage agents. AI analyzes call recordings and gives agents structured performance feedback via a scoring system.

## Repository Layout
```
Certainty/                     ← repo root (git lives here)
├── claude-prototypes/         ← HTML reference specs (pixel-accurate design spec — do not modify)
├── gemini-prototypes/         ← do not modify
├── documents/                 ← PRD, API contract, screen specs, journal
│   └── prd/build-reference/   ← cs_api_contract.md, cs_component_library_spec.md, cs_data_flow.md, cs_copy_tone_guide.md, cs_user_stories.md
└── web/                       ← Next.js app (where all code lives)
```

## Dev Server
```bash
cd web && npm run dev
# or from repo root:
npm run dev
```
App runs at http://localhost:3000.

## Tech Stack
- **Next.js 14** (App Router) — no Pages Router
- **TypeScript** — all files `.tsx` / `.ts`
- **CSS Modules** — `[Component].module.css` per component. NO Tailwind.
- **Geist** via `next/font/local`, **Playfair Display** via `next/font/google`
- **No animation libraries** — pure CSS transitions and SVG animations

## Design System (v6 Color Block) — CSS variables (verbatim, never change)
```css
--sage:        #8FAF94;
--sage-dark:   #6A8B6E;
--ink:         #131110;
--terracotta:  #E05C34;
--mustard:     #E9B840;
--cream:       #FBF8F3;
--cream-2:     #F0EBE1;
--dark-text:   #FAF5EC;
--tc-text:     #1A0D08;
--rule:        1.5px solid #131110;
--rule-lt:     1px solid rgba(19,17,16,0.12);
```

**Color logic:**
- Sage col = icon nav background
- Ink col = context panel, selection states, deliberate context
- Terracotta = hero panel, live performance, act-on-this
- Mustard = marquee bar, XP bar, CTAs, focus selection borders
- Cream = main content area, reading mode, historical data
- Cream-2 = table rows, hover states, secondary surfaces

**Shell grid:** `grid-template-columns: 72px 210px 1fr`

**Responsive:**
- `< 1100px`: ink panel (col 2) hidden → `72px 0 1fr`
- `< 768px`: nav narrows to 48px, labels hidden

## Page → File Map
| Page | Route | HTML Reference |
|---|---|---|
| Agent Dashboard | `app/dashboard/page.tsx` | `claude-prototypes/agent-dashboard.html` |
| Manager Dashboard | `app/manager/page.tsx` | `claude-prototypes/manager-dashboard.html` |
| Knowledge Hub | `app/hub/page.tsx` | `claude-prototypes/knowledge-hub.html` |
| Call Report | `app/report/[id]/page.tsx` | `claude-prototypes/call-report.html` |

## Key Terminology (exact — do not vary)
- **Enrolled** = successful sale (not "Completed")
- **Dashboard** = screen name (not "Your Dashboard")
- **The Closer's Edge** = AI coaching insight card (always appears first in report)
- **Focus Mode** = category pinning mechanic (max 2 categories, FIFO)
- **Nine Patterns** = recurring failure modes (e.g. Value Drop, Logic Response, Dead Air)
- **Agent levels:** Green Light (L1) → Listener (L2) → Reader (L3) → Builder (L4) → Shifter (L5) → Closer (L6) → Architect (L7) → Master Certified (L8)
- **Marquee:** present on agent-dashboard and manager-dashboard only. Never on knowledge-hub or call-report.

## Key Interactions to Port
- **Focus queue** (agent dashboard): max 2 pinned categories, FIFO on 3rd selection
- **Score ring**: SVG with `easeOutBack` animation on mount
- **Slideover** (manager): fixed right panel for upload flow
- **Transcript toggle**: expand/collapse with text swap
- **Scroll nav** (call report): scroll observer updates active nav link
- **Pattern radar bars** (manager): animate width via CSS transition on mount

## Before Building Any Screen
Read the relevant PRD docs first:
- `documents/prd/build-reference/cs_api_contract.md` — endpoint shapes + LLM analysis JSON schema
- `documents/prd/build-reference/cs_component_library_spec.md` — component props and states
- `documents/prd/build-reference/cs_data_flow.md` — what each screen fetches and when
- `documents/prd/build-reference/cs_copy_tone_guide.md` — exact copy and terminology rules
- `documents/prd/screens/` — screen-level specs

## TypeScript Types Location
`web/lib/types.ts` — `CallAnalysis`, `PillarScores`, etc. Built against `cs_api_contract.md`.

## Shared Components
All in `web/components/`. Build in this order (primitives first):
1. `Shell.tsx` + `Shell.module.css` — 3-col grid, responsive rules
2. `NavBar.tsx` — sage col-1, icon links, active state, avatar, help button
3. `ScoreRing.tsx` — SVG ring with easeOutBack animation
4. `Marquee.tsx` — mustard ticker (agent + manager only)
5. `PatternBlock.tsx` — failure pattern card
6. `ClosersEdge.tsx` — glassmorphism coaching card (always first in report)

## Do Not
- Do not use Tailwind
- Do not modify files in `claude-prototypes/`, `gemini-prototypes/`, or `documents/`
- Do not auto-commit — always ask before committing
- Do not create documentation files unless explicitly requested
