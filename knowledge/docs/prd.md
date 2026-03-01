# The Certainty System — Knowledge Hub
## Product Requirements Document (PRD)
### Phase 1: Reference Site

*Version 1.1 | March 2026*

---

## 1. WHAT WE ARE BUILDING

A standalone knowledge reference website for The Certainty System — a Medicare Advantage sales coaching framework. This is the brain of the system. Agents visit this site to understand how the system works, study its components, look up objections in real time, and reference material after receiving call feedback.

**This is Phase 1 only.** No logins. No accounts. No call analysis. No scoring. Static reference content, organized and easy to navigate.

**The site answers one question for every agent who lands on it:** *What does the Certainty System say I should do in this situation?*

---

## 2. DEPLOYMENT

- **Framework:** Next.js 14+ App Router
- **Language:** TypeScript (.tsx / .ts)
- **Styling:** CSS Modules — no Tailwind
- **Fonts:** Geist (via `next/font/local`) + Playfair Display (via `next/font/google`)
- **Content:** MDX files — all content is static, no database
- **Search:** Fuse.js — client-side fuzzy search on /objections
- **Icons:** IBM Carbon Icons (`@carbon/icons-react`)
- **Hosting:** Vercel
- **Vercel project name:** `certainty-system` → deploys to `certainty-system.vercel.app`
- **Repo location:** `/knowledge/` folder inside the Certainty monorepo
- **No authentication for Phase 1**

---

## 3. FOLDER STRUCTURE

```
Certainty/
  knowledge/                        ← this app (standalone Next.js)
    docs/                           ← planning docs (PRD, design spec, image prompts)
      prd.md                        ← this file
      design-spec.md
      image-prompts.md
    CLAUDE.md                       ← Claude Code instructions for this app
    package.json
    next.config.ts
    tsconfig.json
    content/                        ← all MDX content files (pre-written, authoritative)
      index.mdx                     ← home page content
      signals/
        index.mdx
      math-breakdown/
        index.mdx
      storytelling/
        index.mdx
      close-confirmation/
        index.mdx
      how-calls-are-graded/
        index.mdx
      pillars/
        index.mdx
        persuasion.mdx
        reframing.mdx
        the-shift.mdx
        refocusing.mdx
      patterns/
        index.mdx
        client-gold-ignored.mdx
        incomplete-math-breakdown.mdx
        logic-responses.mdx
        permission-seeking-language.mdx
        system-navigation-dead-air.mdx
        rapport-without-off-switch.mdx
        third-party-blind-spot.mdx
        accepting-misinformation.mdx
        hollow-yes.mdx
      call-types/
        index.mdx
        money-caller.mdx
        scared-switcher.mdx
        misinformed.mdx
        third-party-controlled.mdx
        detail-staller.mdx
        time-bomb.mdx
        commercial-myth-caller.mdx
        veteran.mdx
        timing-objector.mdx
      objections/
        index.mdx                   ← single file, all objections (used by Fuse.js search)
    src/
      app/                          ← Next.js App Router pages
        layout.tsx
        page.tsx                    ← home
        globals.css
        objections/
          page.tsx
        call-types/
          page.tsx
          [slug]/
            page.tsx
        signals/
          page.tsx
        pillars/
          page.tsx
          [slug]/
            page.tsx
        patterns/
          page.tsx
          [slug]/
            page.tsx
        math-breakdown/
          page.tsx
        storytelling/
          page.tsx
        close-confirmation/
          page.tsx
        how-calls-are-graded/
          page.tsx
      components/
        layout/
          Nav.tsx + Nav.module.css
          Footer.tsx + Footer.module.css
        ui/
          SignalBadge.tsx + SignalBadge.module.css
          QuickRefCard.tsx + QuickRefCard.module.css
          CalloutBlock.tsx + CalloutBlock.module.css
          ExpandCollapse.tsx + ExpandCollapse.module.css
          CrossLinks.tsx + CrossLinks.module.css
          Tooltip.tsx + Tooltip.module.css
        search/
          ObjectionSearch.tsx + ObjectionSearch.module.css
        diagrams/
          SystemMap.tsx
          SignalsVisual.tsx
          PillarsVisual.tsx
          MathBreakdownFlow.tsx
          CallTypeTree.tsx
          PatternWheel.tsx
      lib/
        mdx.ts
        search.ts
        types.ts
    public/
      images/
        system-map.png
        signals-visual.png
        pillars-diagram.png
        math-breakdown-flow.png
        call-type-tree.png
        pattern-wheel.png
```

---

## 4. CONTENT SOURCE MAP

**The MDX files in `Certainty/knowledge/content/` are the authoritative source of truth for all content.**
Do not look for content elsewhere. Do not reference project knowledge. Read the MDX files directly.

All content files are pre-written. When building pages, read the corresponding MDX file first, then use its content and frontmatter to populate the page. Do not rewrite or summarize — render the MDX as written. If a file is missing, flag it rather than generating content from memory.

| Page | MDX File |
|---|---|
| Home | `content/index.mdx` |
| Signals | `content/signals/index.mdx` |
| Math Breakdown | `content/math-breakdown/index.mdx` |
| Storytelling | `content/storytelling/index.mdx` |
| Close Confirmation | `content/close-confirmation/index.mdx` |
| How Calls Are Graded | `content/how-calls-are-graded/index.mdx` |
| Pillars overview | `content/pillars/index.mdx` |
| Each pillar | `content/pillars/[slug].mdx` |
| Patterns overview | `content/patterns/index.mdx` |
| Each pattern | `content/patterns/[slug].mdx` |
| Call Types overview | `content/call-types/index.mdx` |
| Each call type | `content/call-types/[slug].mdx` |
| Objections | `content/objections/index.mdx` |

---

## 5. URL STRUCTURE (PERMANENT — DO NOT CHANGE)

These URLs will be linked from call reports in Phase 2. Treat them as permanent.

```
/                                   Home
/objections                         Objection Handbook (searchable)
/call-types                         9 Call Types overview
/call-types/money-caller
/call-types/scared-switcher
/call-types/misinformed
/call-types/third-party-controlled
/call-types/detail-staller
/call-types/time-bomb
/call-types/commercial-myth-caller
/call-types/veteran
/call-types/timing-objector
/signals                            Three Client Signals
/pillars                            Four Pillars overview
/pillars/persuasion
/pillars/reframing
/pillars/the-shift
/pillars/refocusing
/patterns                           Nine Failure Patterns overview
/patterns/client-gold-ignored
/patterns/incomplete-math-breakdown
/patterns/logic-responses
/patterns/permission-seeking-language
/patterns/system-navigation-dead-air
/patterns/rapport-without-off-switch
/patterns/third-party-blind-spot
/patterns/accepting-misinformation
/patterns/hollow-yes
/math-breakdown                     The Math Breakdown (standalone)
/storytelling                       The Storytelling Mechanism
/close-confirmation                 The Close Confirmation Protocol
/how-calls-are-graded               Call grading explained
```

---

## 6. COMPONENT INVENTORY

### SignalBadge
Used everywhere a signal color is referenced. Three variants: green, red, yellow.
Two sizes: default and large. Two styles: filled and tinted.

**Props:** `signal: 'green' | 'red' | 'yellow'`, `size?: 'sm' | 'lg'`, `variant?: 'filled' | 'tinted'`

### ExpandCollapse (Objection Card)
Core component for the Objection Handbook. Client phrase always visible as card header.
Carbon ChevronDown icon on right. Click/tap reveals: Underneath It / What NOT to Say / The Response / Pillar + Signal badge.

**Props:** `clientPhrase: string`, `underneath: string`, `doNotSay: string`, `response: string`, `pillar: string`, `signal: 'green' | 'red' | 'yellow'`

### QuickRefCard
Pinned at top of every Call Type page. Four-row data card.
Left border in the call type's primary signal color. Background: cream-2.

**Props:** `whoThisIs: string`, `firstSignal: string`, `primaryPillar: string`, `biggestMistake: string`, `signal: 'green' | 'red' | 'yellow'`

### CalloutBlock
Used at top of Pattern pages and inline for key rules.
Left border in signal color or neutral ink. Slightly tinted background.

**Props:** `type: 'red' | 'yellow' | 'green' | 'neutral'`, `children: ReactNode`

### CrossLinks
Bottom of every page. Related page links with Carbon ArrowRight icon.

**Props:** `links: Array<{ label: string, href: string }>`

### Tooltip
Carbon-style info icon. Hover/tap reveals one-line definition popup.
Used on first occurrence of framework vocabulary per page.

**Props:** `term: string`, `definition: string`

### ObjectionSearch
Full-width search input. Fuse.js powered. Carbon Search icon left, clear button right.
Searches clientPhrase, category, pillar. Filters objection list live.

### Nav
Sticky top bar. Wordmark left. Section links right.
Hover dropdown shows subsection links. Mobile hamburger with overlay.

---

## 7. PAGE SPECIFICATIONS

### 7.1 Home `/`

**Layout:** Hero (Playfair Display headline + two CTAs) → System Map diagram → Section cards grid

### 7.2 Objections `/objections`

**Layout:** ObjectionSearch (full width, above fold) → Category filter tabs → ExpandCollapse cards grouped by category

**Search:** Fuse.js, threshold 0.4, fuzzy match on clientPhrase field

### 7.3 Signals `/signals`

**Layout:** Heading → Signals Visual diagram → Three signal blocks (GREEN/RED/YELLOW) → "Always handle RED before YELLOW" CalloutBlock → CrossLinks

### 7.4 Pillars Overview `/pillars`

**Layout:** Heading → Pillars diagram → Four pillar cards 2×2 → CrossLinks

### 7.5 Pillar Pages `/pillars/[slug]`

**Layout:** QuickRefCard → body with Playfair Display headings + real call examples + CalloutBlocks → CrossLinks

Signal mapping: Persuasion (P1) = all calls | Reframing (P2) = RED | The Shift (P3) = GREEN | Refocusing (P4) = YELLOW

### 7.6 Patterns Overview `/patterns`

**Layout:** Heading → Pattern Wheel diagram → Nine cards grouped by root cause (Loss of Lead: 1,4,6 | Wrong Response to Signal: 2,3,7,8 | Momentum Killers: 5,9)

### 7.7 Pattern Pages `/patterns/[slug]`

**Layout:** CalloutBlock (pattern cost in one sentence) → What It Is → What It Sounds Like → What It Costs → How to Fix It → CrossLinks

Pattern → Pillar fix: 1→P1 | 2→P3+/math-breakdown | 3→P2 | 4→P1 | 5→P4 | 6→P1 | 7→/call-types/third-party-controlled | 8→/call-types/misinformed | 9→/close-confirmation

### 7.8 Call Types Overview `/call-types`

**Layout:** Heading → Call Type Tree diagram → Nine cards 3×3 with signal badge → CrossLinks

### 7.9 Call Type Pages `/call-types/[slug]`

**Layout:** QuickRefCard (Who This Is / First Signal / Primary Pillar / Biggest Mistake) → Identification phrases block → Primary Move → Common objections on this call → CrossLinks

### 7.10 Math Breakdown `/math-breakdown`

**Layout:** Hero heading → Math Breakdown Flow diagram → Three step sections → "3-question test" CalloutBlock → CrossLinks: → P3 / → Pattern 2 / → Close Confirmation

### 7.11 Storytelling `/storytelling`

**Layout:** Heading → 4-part story structure (numbered) → Examples by call type → CrossLinks

### 7.12 Close Confirmation `/close-confirmation`

**Layout:** Heading → Three component sections (Anchor / Confidence / Forward Close) → "3-question test" CalloutBlock → CrossLinks: → Pattern 9 / → P1

### 7.13 How Calls Are Graded `/how-calls-are-graded`

**Purpose:** Plain language explanation of the scoring system for agents. Not technical documentation.

**Layout:**
- Intro: what this is, why it exists
- Call Classifications: four blocks — Enrolled / Missed Opportunity / Correct No-Sale / Unclosable
- The Certainty Score: what it measures, how points are earned (not deducted)
- Six scoring categories with max points: Lead (20) / Signal Reading (20) / Math Breakdown (20) / Objection Handling (15) / Call Outcome Quality (10) / Compliance & Professionalism (15)
- Each category: what high score looks like, what low score means for coaching
- CrossLinks to relevant framework sections

---

## 8. NAVIGATION

**Sticky top bar, full width.**

- Left: "The Certainty System" in Playfair Display italic
- Right: Objections / Call Types / Signals / Pillars / Patterns / More↓
- Hover any section link: dropdown panel with subsection links
- Mobile (< 768px): hamburger → full-screen overlay

---

## 9. CROSS-LINKING RULES

Every page must have a CrossLinks component at the bottom (min 2, max 5 links).

- Every pattern page → the pillar that fixes it
- Every pillar page → the signal(s) it addresses + related patterns
- Every call type page → primary pillar + relevant objections
- /math-breakdown → Pattern 2 + Pillar 3
- /close-confirmation → Pattern 9
- /objections entries → their pillar (inline in expanded card)

---

## 10. INTERACTIVE DIAGRAMS

Six diagrams. Each has a static PNG (from Nano Banana Pro, saved in `public/images/`) used as initial render, and a React SVG component built after content is complete.

| Diagram | Component | Used on |
|---|---|---|
| System Map | SystemMap.tsx | / |
| Signals Visual | SignalsVisual.tsx | /signals |
| Pillars Diagram | PillarsVisual.tsx | /pillars |
| Math Breakdown Flow | MathBreakdownFlow.tsx | /math-breakdown, /pillars/the-shift |
| Call Type Tree | CallTypeTree.tsx | /call-types |
| Pattern Wheel | PatternWheel.tsx | /patterns |

---

## 11. BUILD ORDER

1. Project setup: Next.js + CSS Modules + Geist + Playfair Display + Carbon Icons + Fuse.js + MDX
2. CLAUDE.md for /knowledge app
3. globals.css with all CSS variables (see design-spec.md)
4. Base components: SignalBadge, CalloutBlock, CrossLinks, Tooltip
5. Nav component
6. Home page (static PNG placeholder for system map)
7. /signals
8. /pillars overview + 4 pillar pages
9. /patterns overview + 9 pattern pages
10. /math-breakdown
11. /close-confirmation
12. /storytelling
13. /how-calls-are-graded
14. /call-types overview + 9 call type pages
15. /objections with ExpandCollapse + Fuse.js search
16. Cross-linking pass
17. Mobile responsive pass
18. Diagram components (interactive SVG)
19. Design polish pass

---

## 12. PHASE 2 NOTES (do not build — architect for)

- URLs in Section 5 are permanent. Never restructure them.
- Agents will have accounts. Call reports will deep-link into these pages.
- `/how-calls-are-graded` expands with live scoring engine.
- Consider shared design tokens folder at root level for visual consistency with `web/` app.

---

*The Certainty System — Knowledge Hub PRD v1.1 | March 2026*
