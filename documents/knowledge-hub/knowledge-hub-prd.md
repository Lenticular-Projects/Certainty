# The Certainty System — Knowledge Hub
## Product Requirements Document (PRD)
### Phase 1: Reference Site

*Version 1.0 | March 2026*

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
    CLAUDE.md                       ← Claude Code instructions for this app
    package.json
    next.config.ts
    tsconfig.json
    content/                        ← all MDX content files
      home.mdx
      signals.mdx
      math-breakdown.mdx
      storytelling.mdx
      close-confirmation.mdx
      how-calls-are-graded.mdx
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

All content files are pre-written and located at:

```
Certainty/knowledge/content/
  signals.mdx
  math-breakdown.mdx
  storytelling.mdx
  close-confirmation.mdx
  how-calls-are-graded.mdx
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
    index.mdx
```

**Claude Code workflow for content:** When building pages, read the corresponding MDX file first, then use its content and frontmatter to populate the page. Do not rewrite or summarize — render the MDX as written. If a file is missing, flag it rather than generating content from memory.

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

---

### 7.1 Home `/`

**Purpose:** Explain the system. Direct agents to every section.

**Layout:**
- Hero: full width. Playfair Display headline (the core premise). Geist subhead. Two CTAs: "Objection Handbook" (primary) and "Explore the System" (secondary).
- System Map diagram (interactive SVG / static PNG fallback)
- Section cards grid: one card per major section. Name, one-line description, arrow link.
- No sidebar. Full-width layout.

**Content source:** `the_certainty_system_UPDATED.md` — core philosophy, foundational truth

---

### 7.2 Objections `/objections`

**Purpose:** Real-time lookup. Type what the client said, get the response.

**Layout:**
- ObjectionSearch: full width, above the fold, always visible
- Category filter tabs below search (9 categories)
- ExpandCollapse cards grouped by active category
- Mobile: search + filters stack, cards full width

**Search:** Fuse.js, threshold 0.4, searches clientPhrase field with fuzzy matching

**Content source:** `Certainty_System_Objection_Handbook_UPDATED.md`

---

### 7.3 Signals `/signals`

**Layout:**
- Playfair Display section heading
- Signals Visual diagram
- Three signal blocks, stacked full width. Each: large SignalBadge, name, description, real call phrases
- Rule block: "Always handle RED before YELLOW" — CalloutBlock (neutral)
- CrossLinks: → Pillar 2 Reframing / → Pillar 4 Refocusing

**Content source:** `the_certainty_system_UPDATED.md`, `certainty_system_agent_framework_UPDATED.md`

---

### 7.4 Pillars Overview `/pillars`

**Layout:**
- Heading + Pillars diagram image
- Four pillar cards 2×2 grid. Each: number, name (Playfair Display), one-liner, signal badge(s), link
- CrossLinks: → Signals / → Patterns

**Content source:** `the_certainty_system_UPDATED.md`

---

### 7.5 Pillar Pages `/pillars/[slug]`

Four pages: persuasion / reframing / the-shift / refocusing

**Layout:**
- QuickRefCard at top: what it does, which signal(s), when to deploy, what breaks without it
- Body: Playfair Display section headings, Geist body, real call examples, CalloutBlocks for key phrases
- CrossLinks: related signal, related patterns, related call types

**Signal mapping:**
- Persuasion (P1): macro mindset, not signal-specific
- Reframing (P2): RED signal
- The Shift (P3): GREEN signal
- Refocusing (P4): YELLOW signal

**Content source:** `the_certainty_system_UPDATED.md` — Four Pillars section

---

### 7.6 Patterns Overview `/patterns`

**Layout:**
- Heading + Pattern Wheel diagram
- Nine cards 3×3 grid. Each: number, name, one-line cost description, link
- Grouped by root cause with subtle dividers:
  - Loss of Lead: Patterns 1, 4, 6
  - Wrong Response to Signal: Patterns 2, 3, 7, 8
  - Momentum Killers: Patterns 5, 9

**Content source:** `the_certainty_system_UPDATED.md`

---

### 7.7 Pattern Pages `/patterns/[slug]`

Nine pages.

**Layout:**
- CalloutBlock at top: pattern name in plain language + what it costs in one sentence
- Body sections: What It Is / What It Sounds Like on a Real Call / What It Costs / How to Fix It
- Real call examples
- CrossLinks: the pillar that fixes it, the signal, relevant call types

**Pattern → Fix mapping:**
- Client Gold Ignored → Pillar 1 (Persuasion)
- Incomplete Math Breakdown → Pillar 3 (The Shift) + /math-breakdown
- Logic Responses → Pillar 2 (Reframing)
- Permission-Seeking Language → Pillar 1 (Persuasion)
- System Navigation Dead Air → Pillar 4 (Refocusing)
- Rapport Without Off-Switch → Pillar 1 (Persuasion)
- Third Party Blind Spot → /call-types/third-party-controlled
- Accepting Misinformation → /call-types/misinformed
- Hollow Yes → /close-confirmation

**Content source:** `the_certainty_system_UPDATED.md`, `certainty_system_agent_framework_UPDATED.md`

---

### 7.8 Call Types Overview `/call-types`

**Layout:**
- Heading + Call Type Tree diagram
- Nine cards 3×3. Each: name (Playfair Display), "who this is" descriptor, primary signal badge, link

**Content source:** `certainty_system_9_call_type_playbook_UPDATED.md`

---

### 7.9 Call Type Pages `/call-types/[slug]`

Nine pages.

**Layout:**
- QuickRefCard pinned at top: Who This Is / First Signal / Primary Pillar / Biggest Mistake
- Identification block: exact client phrases in styled mono block (first 2 minutes)
- Primary Move section
- Objections for this call type: list with links to /objections entries
- What breaks down without the right approach
- CrossLinks: relevant pillar, relevant patterns, related objections

**Content source:** `certainty_system_9_call_type_playbook_UPDATED.md`

---

### 7.10 Math Breakdown `/math-breakdown`

**Layout:**
- Full-width Playfair Display hero heading
- Math Breakdown Flow diagram
- Three step sections: step number, step name, description, real call example language
- CalloutBlock: the 3-question test
- CrossLinks: → Pillar 3 (The Shift) / → Pattern 2 (Incomplete Math Breakdown) / → Close Confirmation

**Content source:** `the_certainty_system_UPDATED.md` — Pillar 3 / Math Breakdown section

---

### 7.11 Storytelling `/storytelling`

**Layout:**
- Section heading
- 4-part story structure: each part numbered, named, with purpose and example language
- Examples for most common call types
- CrossLinks: → Pillar 1 / → Call Types

**Content source:** `the_certainty_system_UPDATED.md`, `certainty_system_story_bank.md`

---

### 7.12 Close Confirmation `/close-confirmation`

**Layout:**
- Section heading
- Three component sections: Anchor Statement / Confidence Statement / Forward Close
- CalloutBlock: the 3-question test (all three questions)
- CrossLinks: → Pattern 9 (Hollow Yes) / → Pillar 1

**Content source:** `certainty_system_close_confirmation_protocol.md`

---

### 7.13 How Calls Are Graded `/how-calls-are-graded`

**Purpose:** Plain language explanation of the call report. Not technical.

**Layout:**
- Heading: "How Your Calls Are Graded"
- Intro: what this is, why it exists, what it does not do
- Call Classifications: four blocks — Enrolled / Missed Opportunity / Correct No-Sale / Unclosable. Each: name, plain definition, what it means for the agent.
- Scoring Categories: six blocks — Signal Reading / Pillar Execution / Math Breakdown / Objection Handling / Close Confirmation / Client Gold. Each: what it measures, what high score looks like, what low score triggers.
- CrossLinks: each scoring category links to the relevant section of the site

**Content source:** `Analysis_Shawna_Gray_vs_Jacqueline_Tillman_Example_Output.md`

---

## 8. NAVIGATION

**Sticky top bar, full width.**

- Left: "The Certainty System" in Playfair Display italic
- Right: Objections / Call Types / Signals / Pillars / Patterns / More↓
- Hover any section link: dropdown panel with subsection links
- Mobile (< 768px): hamburger → full-screen overlay with all sections + subsections

---

## 9. CROSS-LINKING RULES

Every page must have a CrossLinks component at the bottom. Minimum 2, maximum 5 links.

- Every pattern page → the pillar that fixes it
- Every pillar page → the signal(s) it addresses + related patterns
- Every call type page → primary pillar + relevant objections
- /math-breakdown → Pattern 2 + Pillar 3
- /close-confirmation → Pattern 9
- /objections entries → their pillar (inline in expanded card)

---

## 10. INTERACTIVE DIAGRAMS

Six diagrams. Each has a static PNG (from Nano Banana Pro) used as initial render,
and a React SVG component built after content is complete.

| Diagram | Component | Pages | What it shows |
|---|---|---|---|
| System Map | SystemMap.tsx | / | Signals → Pillars → Patterns → Call Types loop |
| Signals Visual | SignalsVisual.tsx | /signals | GREEN / YELLOW / RED with descriptions |
| Pillars Diagram | PillarsVisual.tsx | /pillars | Four pillars + signals each addresses |
| Math Breakdown Flow | MathBreakdownFlow.tsx | /math-breakdown, /pillars/the-shift | 3-step flow with example language |
| Call Type Tree | CallTypeTree.tsx | /call-types | First 2 minutes → 9 call type branches |
| Pattern Wheel | PatternWheel.tsx | /patterns | 9 patterns grouped by root cause |

---

## 11. BUILD ORDER

1. Project setup: Next.js + CSS Modules + Geist + Playfair Display + Carbon Icons + Fuse.js + MDX
2. CLAUDE.md for /knowledge app
3. globals.css with all CSS variables
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

*The Certainty System — Knowledge Hub PRD | March 2026*
*Phase 1: Reference site. No accounts. No analysis. Just the knowledge, organized.*
