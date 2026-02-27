# The Certainty System — Visual Design Brief
*Hand this document to your AI design tool alongside 3–5 reference images.*
*This brief contains everything the designer needs. Nothing more should be required.*

---

## WHAT WE ARE DESIGNING

A web-based performance coaching platform for Medicare Advantage sales agents. It has two functions: a Knowledge Hub (educational reference library) and an Agent Performance Engine (call analysis, scoring, coaching). Agents use it during their working day to study the system and see how they're applying it on real calls.

**Primary screens to design first, in this order:**
1. Agent Dashboard (`/dashboard`)
2. Call Report
3. Knowledge Hub Index (`/knowledge`)
4. Manager Dashboard

---

## THE CORE FEELING

**Expressive without being loud.**

This platform should feel like something agents *want* to come back to — not a compliance tool they are required to open. It should feel like a journey. Every session should feel like progress.

The agent using this is a 45–60 year old sales professional. They take their craft seriously. The design must honor that — it should feel premium and purposeful, not gamey, not corporate, not healthcare software.

---

## LIGHT MODE — NON-NEGOTIABLE

Light mode is the correct and only choice. Do not design dark variants in the first pass.

Light mode here is not a default white page with thin borders. It should feel **warm, clean, and alive** — achieved through:
- Tonal surface variation (not everything the same white)
- Strategic use of color as signal, not decoration
- Warmth in the background tones (cream, warm white, soft sand — not pure #FFFFFF)
- Depth without darkness

---

## DESIGN INFLUENCES — USE THESE AS LENSES, NOT TEMPLATES

**Japanese aesthetic (MA principle)**
- Intentional negative space — elements breathe, nothing is crammed
- Information density without visual noise
- Natural color sensibility — soft, chosen palettes, not generated ones
- Emotional connection through small details

**Material 3 Expressive (philosophy only, not components)**
- Shape as personality — rounded geometry that feels considered
- Color that communicates meaning and emotional state
- Motion that feels physical (spring physics, not easing curves)

**Malewicz depth and layering**
- Glass/frosted surface treatment used surgically — only on achievement moments (badge surfaces, score ring container, The Closer's Edge card, personal best card)
- Flat tonal surfaces for all content-dense areas (transcripts, tables, body text)
- Elevation communicates meaning, not decoration

**Design confidence (not neubrutalism)**
- Bold typographic hierarchy
- Decisive use of color as signal
- Components that feel built for a purpose, not assembled from a library

---

## COLOR DIRECTION

Final palette is not locked — this is directional:
- **Background:** Warm white / soft cream — not pure white, not gray
- **Primary accent:** Warm amber, gold, or deep teal — premium without screaming "gaming"
- **Success:** Warm green (not neon, not hospital green)
- **Warning:** Amber/orange
- **Error/Pattern:** Muted red/rose
- **Surface depth:** 2–3 tonal steps from background — light, not dark

**What to avoid:**
- Dark navy with gold accents
- Neon anything
- Pure white backgrounds
- Corporate blue
- Healthcare green/teal defaults

---

## TYPOGRAPHY DIRECTION

- **Display/headers:** Something with personality — not Inter, not Roboto, not the default. Consider: Plus Jakarta Sans, DM Sans, Sora, or a variable font with expressive weight range.
- **Body:** Clean, readable, generous line height. Agents read dense coaching content.
- **Mono:** Used for exact language in call reports (scripts, exact phrases). One mono face, subtle.
- **Scale:** Dramatic hierarchy — dashboard score numbers should feel large and significant.

---

## MOTION PRINCIPLES (for prototype/animation reference)

- Spring physics throughout — elements have mass and momentum
- No default fade/slide — every transition specific to the content
- Stagger sequences — multiple elements reveal in choreographed order
- Score ring: fills from 0 with spring physics on mount
- Level-up: full-screen cinematic moment, not a toast
- Page transitions: directional (not a global fade)

---

## THE GAMIFICATION SYSTEM — HOW IT SHOULD FEEL VISUALLY

**Levels (8 total):** Green Light → The Listener → The Reader → The Builder → The Shifter → The Closer → The Architect → Master Certified

Level names should feel earned. The visual treatment of levels should feel categorically different as you progress — not just a number change.

**Badges (6 categories, 3 tiers):**
- Developing — neutral, quiet
- Proficient — elevated, distinct
- Sharp — premium, glass surface, feels materially different from Developing

**Score Ring:** The central visual element of the agent dashboard. Animated SVG. Large. The number inside matters — it's the agent's coaching score out of 100. It should feel significant without being alarming at lower scores.

**XP Bar:** Subtle, not dominant. Below the score ring. Always shows level preview text.

---

## KEY SCREENS — WHAT EACH ONE IS

**Agent Dashboard** — Home base. Score ring dominates the left. Recent calls on the right. Pattern alert (when active). AI Coach card. Category badges row. Pattern feed below.

**Call Report** — The most content-dense screen. Starts with The Closer's Edge (the single most actionable insight — glass card, immediately visible). Then score breakdown, then forensic sections, then annotated transcript. The report tells a story — lead with the answer, then the analysis.

**Knowledge Hub** — Educational library. 3×3 grid of call type tiles. 3×3 grid of objection tiles. Semantic search. Quick reference chips. Exhaustive content organized for fast access.

**Manager Dashboard** — Team oversight. Team score summary. Pattern radar (which failure patterns are spreading). Team table (all agents, sortable). Recent activity strip. No individual agent rankings visible to other agents — manager-only view.

---

## WHAT THIS IS NOT

- Dark mode (we are not designing dark mode right now)
- Neubrutalism — thick black borders, clashing colors
- Generic SaaS — white cards, thin borders, generic sans serif
- Healthcare software — clinical, cold, form-heavy
- Corny gamification — big shiny badges that look like a school reward app
- Over-animated — motion should serve clarity, not perform
- Leaderboard — agents are never ranked against each other by name

---

## REFERENCE IMAGES TO UPLOAD ALONGSIDE THIS BRIEF

Upload 3–5 images that capture the visual direction you want. Suggested categories:
1. A dashboard or app UI you find premium and warm (not dark mode)
2. A Japanese app or product design that demonstrates the MA principle
3. A typography example showing the scale/hierarchy you want
4. An example of glass/depth treatment done tastefully (not overused)
5. A color palette reference — warm, light, expressive

The AI designer should synthesize these references with the principles above — not copy any single reference directly.

---

*The Certainty System — Visual Design Brief v1.0 | February 2026*
*Companion to: prd-v4.md, certainty_system_agent_dashboard.md, cs_manager_dashboard.md*
*Light mode. Warm. Expressive. Premium. Built for professionals, not gamers.*
