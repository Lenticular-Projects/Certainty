# The Certainty System — Knowledge Hub
## Product Requirements Document
### Version 2.0 | March 2026 | FINAL

---

## SECTION 1: WHAT WE ARE BUILDING

A knowledge reference website for The Certainty System — a Medicare Advantage sales coaching framework. Think of it as a premium editorial reference tool that agents use during and after calls. It is not a documentation site. Not a training portal. Not a corporate wiki.

**Phase 1 only.** No logins. No accounts. No call analysis. Static reference content.

**The site has one job:** when an agent gets a call report linking to `/pillars/reframing`, they land somewhere that feels serious, premium, and immediately useful — and the room they land in *knows* they're on a RED signal page.

---

## SECTION 2: THE FEELING — NON-NEGOTIABLE

**70% serious professional tool. 30% "this makes me feel something."**

This is not a ratio to approximate. Every design decision is held against this test. The 30% is not decoration — it is the ambient gradient breathing, the glass cards floating, the room shifting color when you hover a signal element, the hero having a ghostly watermark behind it.

**What makes it feel different from everything else:**
- The background is always moving — a slow gradient cycling through the system's signal colors
- The background responds to cursor position — hover a RED card and the room bleeds warmer
- Glass surfaces float above the gradient — cards are transparent panes, not flat boxes
- Everything enters with spring physics — nothing pops in, everything arrives
- Shadows look like real light — diffuse, blurred, never hard
- The hero has depth — a large ghostly word sits behind the content

**The design direction:** editorial-meets-ambient. Premium publication aesthetics. Playfair Display italic for the big moments. Geist for everything functional. Signal colors (terracotta, mustard, sage) are the only accent palette — they are the design system.

---

## SECTION 3: DEPLOYMENT

```
Framework:    Next.js 14+ App Router
Language:     TypeScript (.tsx / .ts)
Styling:      CSS Modules — NO Tailwind
Fonts:        Geist (local) + Playfair Display (Google Fonts)
Content:      MDX files in content/ — static, no database
Search:       Fuse.js — client-side, /objections only
Icons:        IBM Carbon Icons (@carbon/icons-react)
Motion:       Framer Motion — required
Diagrams:     D3.js + Framer Motion SVG
Hosting:      Vercel
Vercel name:  certainty-system → certainty-system.vercel.app
Repo:         /knowledge/ folder inside Certainty monorepo
Auth:         None in Phase 1
```

Full install:
```bash
npm install next react react-dom typescript @types/react @types/node
npm install @next/mdx next-mdx-remote gray-matter
npm install fuse.js @carbon/icons-react
npm install framer-motion
npm install d3 @types/d3
```

---

## SECTION 4: FOLDER STRUCTURE

```
knowledge/
  docs/
    prd.md                          ← this file
    design-spec.md                  ← visual and motion spec
    CLAUDE_CODE_START_HERE.md       ← handoff prompt
    image-prompts.md
  content/                          ← ALL CONTENT — authoritative, do not invent
    index.mdx
    signals/index.mdx
    math-breakdown/index.mdx
    storytelling/index.mdx
    close-confirmation/index.mdx
    how-calls-are-graded/index.mdx
    pillars/index.mdx + persuasion.mdx + reframing.mdx + the-shift.mdx + refocusing.mdx
    patterns/index.mdx + 9 pattern files
    call-types/index.mdx + 9 call type files
    objections/index.mdx
  public/
    images/
      system-map.png
      signals-visual.png
      pillars-diagram.png
      math-breakdown-flow.png
      call-type-tree.png
      pattern-wheel.png
    hero-bg.mp4                     ← optional video texture (add when available)
  src/
    app/
      layout.tsx
      page.tsx
      globals.css
      [all route folders matching URL structure]
    components/
      layout/    Nav.tsx, Footer.tsx
      ui/        SignalBadge.tsx, QuickRefCard.tsx, CalloutBlock.tsx,
                 ExpandCollapse.tsx, CrossLinks.tsx, Tooltip.tsx
      search/    ObjectionSearch.tsx
      diagrams/  SystemMap.tsx, SignalsVisual.tsx, PillarsVisual.tsx,
                 MathBreakdownFlow.tsx, CallTypeTree.tsx, PatternWheel.tsx
    context/
      AmbientContext.tsx             ← cursor-driven gradient state
    hooks/
      useSignalHover.ts              ← attach hover signal to any element
    lib/
      motion.ts                      ← shared Framer Motion configs
      mdx.ts
      search.ts
      types.ts
```

---

## SECTION 5: URL STRUCTURE — PERMANENT

These URLs will be linked from call reports in Phase 2. Never restructure, rename, or redirect them.

```
/
/objections
/call-types
/call-types/money-caller
/call-types/scared-switcher
/call-types/misinformed
/call-types/third-party-controlled
/call-types/detail-staller
/call-types/time-bomb
/call-types/commercial-myth-caller
/call-types/veteran
/call-types/timing-objector
/signals
/pillars
/pillars/persuasion
/pillars/reframing
/pillars/the-shift
/pillars/refocusing
/patterns
/patterns/client-gold-ignored
/patterns/incomplete-math-breakdown
/patterns/logic-responses
/patterns/permission-seeking-language
/patterns/system-navigation-dead-air
/patterns/rapport-without-off-switch
/patterns/third-party-blind-spot
/patterns/accepting-misinformation
/patterns/hollow-yes
/math-breakdown
/storytelling
/close-confirmation
/how-calls-are-graded
```

---

## SECTION 6: THE AMBIENT GRADIENT SYSTEM

This is the most important architectural decision in the project. Read it completely.

### How it works

The `<body>` element has a living background gradient built from the three signal colors and cream:

```css
body {
  background: linear-gradient(-45deg, #E05C34, #E9B840, #FBF8F3, #8FAF94);
  background-size: 400% 400%;
  animation: gradientDrift 20s ease infinite;
  transition: background-position 2.5s ease-in-out;
}

@keyframes gradientDrift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

The gradient is always slowly drifting. The `transition` on `background-position` means that when the signal state changes, it shifts over 2.5 seconds — always a drift, never a snap.

### Signal state via data attribute

```css
body[data-signal="red"]    { background-position: 0% 50%; }
body[data-signal="yellow"] { background-position: 40% 50%; }
body[data-signal="green"]  { background-position: 100% 50%; }
body[data-signal="neutral"]{ background-position: 50% 50%; }
```

### Page-level defaults (set on mount via useEffect)

Every page sets its default signal on mount. The `AmbientProvider` handles cursor overrides on top of this:

```
/                           neutral
/signals                    neutral
/pillars                    neutral
/pillars/persuasion         neutral
/pillars/reframing          red
/pillars/the-shift          green
/pillars/refocusing         yellow
/math-breakdown             green
/patterns                   neutral
/call-types                 neutral
/objections                 neutral
/close-confirmation         neutral
/storytelling               neutral
/how-calls-are-graded       neutral
```

### Cursor-driven overrides (the alive part)

The `AmbientContext` and `useSignalHover` hook allow any element to temporarily shift the gradient when the cursor is over it. This works across all pages because `AmbientProvider` wraps the root layout and persists across navigation.

**AmbientContext.tsx:**
```typescript
'use client'
import { createContext, useContext, useCallback, useRef } from 'react'

type Signal = 'neutral' | 'red' | 'yellow' | 'green'

const AmbientContext = createContext<{
  setSignal: (s: Signal) => void
  clearSignal: () => void
}>({ setSignal: () => {}, clearSignal: () => {} })

export function AmbientProvider({ children }: { children: React.ReactNode }) {
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  const returnRef = useRef<ReturnType<typeof setTimeout>>()

  const setSignal = useCallback((signal: Signal) => {
    clearTimeout(returnRef.current)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      document.body.setAttribute('data-signal', signal)
    }, 300)  // 300ms debounce — cursor must pause, not just pass
  }, [])

  const clearSignal = useCallback(() => {
    clearTimeout(debounceRef.current)
    returnRef.current = setTimeout(() => {
      // Return to the page's default signal, not always neutral
      const pageSignal = document.body.getAttribute('data-page-signal') || 'neutral'
      document.body.setAttribute('data-signal', pageSignal)
    }, 600)  // 600ms linger before returning
  }, [])

  return (
    <AmbientContext.Provider value={{ setSignal, clearSignal }}>
      {children}
    </AmbientContext.Provider>
  )
}

export const useAmbient = () => useContext(AmbientContext)
```

Note: pages set both `data-signal` AND `data-page-signal` on mount. That way when the cursor leaves a hovered element, it returns to the page's signal rather than always neutral.

**useSignalHover.ts:**
```typescript
import { useAmbient } from '@/context/AmbientContext'

export function useSignalHover(signal: 'red' | 'yellow' | 'green' | 'neutral') {
  const { setSignal, clearSignal } = useAmbient()

  // Disable on touch devices — hover doesn't apply
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return {}
  }

  return {
    onMouseEnter: () => setSignal(signal),
    onMouseLeave: () => clearSignal(),
  }
}
```

**Usage on any card:**
```tsx
const hover = useSignalHover('red')

<motion.div
  className={styles.card}
  whileHover={{ y: -4, scale: 1.01 }}
  transition={SPRING_FAST}
  {...hover}
>
```

### What gets useSignalHover

Apply to these elements sitewide:

| Element | Signal |
|---|---|
| Reframing pillar card | red |
| Refocusing pillar card | yellow |
| The Shift pillar card | green |
| Persuasion pillar card | neutral |
| Pattern 1 (Client Gold Ignored) | red |
| Pattern 2 (Incomplete Math Breakdown) | green |
| Pattern 3 (Logic Responses) | red |
| Pattern 4 (Permission-Seeking Language) | red |
| Pattern 5 (System Navigation Dead Air) | yellow |
| Pattern 6 (Rapport Without Off-Switch) | red |
| Pattern 7 (Third Party Blind Spot) | yellow |
| Pattern 8 (Accepting Misinformation) | red |
| Pattern 9 (Hollow Yes) | yellow |
| Call type: Scared Switcher | red |
| Call type: Third Party Controlled | red |
| Call type: Commercial Myth Caller | red |
| Call type: Detail Staller | yellow |
| Call type: Timing Objector | yellow |
| Call type: Time Bomb | yellow |
| Call type: Money Caller | green |
| Call type: Misinformed Caller | green |
| Call type: Veteran | green |
| Objection cards | read signal from MDX frontmatter |
| Math Breakdown section blocks | green |
| SignalBadge (optional, subtle) | per signal |

### Content readability overlay

The home page hero has NO overlay — full raw gradient. All interior pages add a fixed cream overlay beneath the content layer:

```css
/* Fixed overlay div — sits between body gradient and page content */
.pageOverlay {
  position: fixed;
  inset: 0;
  background: rgba(251, 248, 243, 0.83);
  pointer-events: none;
  z-index: 0;
}
/* All page content: z-index: 1 */
/* Nav: z-index: 100 */
```

---

## SECTION 7: THE HERO SECTION — HOME PAGE ONLY

The hero is the most immersive section on the site. Full viewport height. No overlay. The ambient gradient shows at full intensity.

**Layer stack (bottom to top):**
1. Body gradient (always animating)
2. Video texture layer — `<video src="/hero-bg.mp4" />` at `opacity: 0.05`, `mix-blend-mode: overlay`. Build this slot whether or not the file exists. If the video file is missing, the `onError` handler hides the element silently. When the file is added later, it works automatically.
3. Ghostly watermark — the word `CERTAINTY` in enormous Playfair Display, centered, `opacity: 0.06`, `color: white`, `mix-blend-mode: overlay`, `pointer-events: none`, `user-select: none`, `font-size: clamp(8rem, 20vw, 18rem)`. This is a depth element, not readable content.
4. Content — headline, subheadline, CTAs

```css
.heroVideo {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.05;
  mix-blend-mode: overlay;
  pointer-events: none;
}

.heroWatermark {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-playfair);
  font-weight: 700;
  font-size: clamp(8rem, 20vw, 18rem);
  line-height: 1;
  letter-spacing: -0.04em;
  color: white;
  opacity: 0.06;
  mix-blend-mode: overlay;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}
```

**Hero text shield** — a gradient fade from transparent to cream, covering the bottom 40% of the hero so text on the gradient remains readable. Not a flat overlay — a fade:
```css
.heroShield {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(251,248,243,0) 30%, rgba(251,248,243,0.75) 100%);
  pointer-events: none;
}
```

**Hero headline:** Playfair Display italic, `clamp(2.5rem, 5vw, 4.5rem)`, ink color, `opacity: 0.92`. Use the headline from `content/index.mdx`.

**Hero CTAs:**
- Primary: dark glass pill — `background: rgba(19,17,16,0.85)`, `backdrop-filter: blur(16px)`, `color: #FAF5EC`, `border-radius: 999px`, `padding: 16px 32px`, `font-size: 0.8125rem`, uppercase, tracked
- Secondary: plain text link, `color: var(--ink-60)`, hover goes full ink

**Hero motion (Framer):**
- Headline: `initial: { opacity: 0, y: 32 }` → mount animate, SPRING, delay 0.1s
- Subheadline: same, delay 0.2s
- CTAs: same, delay 0.35s
- Diagram image below hero: `initial: { opacity: 0, scale: 0.97 }` → `whileInView`, once: true, SPRING

---

## SECTION 8: GLASSMORPHISM SYSTEM

Every card, panel, and floating surface uses glass. These are the exact values — do not deviate.

```css
/* Primary card glass */
.glass {
  background: rgba(251, 248, 243, 0.78);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.10),
              inset 0 1px 0 rgba(255,255,255,0.4);
}

/* Dark contrast glass — for sections needing dark background */
.glassDark {
  background: rgba(19, 17, 16, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  color: #FAF5EC;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.20);
}

/* Subtle glass — nav bar, search input, small chips */
.glassSubtle {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.45);
}
```

**Card glow accents** — soft light in the corner of signal-associated cards. Slow, atmospheric, intensifies on hover:

```css
.cardGlow { position: relative; overflow: hidden; }
.cardGlow::before {
  content: ''; position: absolute;
  width: 180px; height: 180px; border-radius: 50%;
  filter: blur(60px); opacity: 0.10; pointer-events: none;
  transition: opacity 0.8s ease;
}
.cardGlow:hover::before { opacity: 0.20; }
.cardGlow--red::before    { background: #E05C34; top: -40px; right: -40px; }
.cardGlow--yellow::before { background: #E9B840; bottom: -40px; left: -40px; }
.cardGlow--green::before  { background: #8FAF94; top: -40px; left: -40px; }
```

Apply `.cardGlow` and the signal variant to: pillar cards, call type cards, pattern cards, objection cards. Persuasion and neutral pages get no glow.

---

## SECTION 9: MOTION SYSTEM

Install: `npm install framer-motion`

**Motion is required. The site must feel alive. Do not omit it.**

### src/lib/motion.ts — shared configs

```typescript
export const SPRING = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 0.8,
}

export const SPRING_FAST = {
  type: "spring" as const,
  stiffness: 200,
  damping: 25,
}

export const EASE_SPRING = [0.16, 1, 0.3, 1]

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: SPRING },
}
```

### Element-by-element motion map

Apply Framer Motion to exactly these elements. Nothing more.

**HOME PAGE — on mount animations (not whileInView — these are above fold)**
- Hero headline → `initial: { opacity: 0, y: 32 }` animate to visible, SPRING, delay 0.1s
- Hero subheadline → same, delay 0.2s
- Hero CTAs → same, delay 0.35s
- Section nav cards grid → `staggerContainer` on wrapper, `staggerChild` on each card
- Each nav card → `whileHover: { y: -4, scale: 1.01 }`, `whileTap: { scale: 0.99 }`, SPRING_FAST

**HOME PAGE — below fold (whileInView)**
- System map diagram → `initial: { opacity: 0, scale: 0.97 }` → visible, `once: true`, SPRING

**ALL INTERIOR PAGES**
- Page H1 → `initial: { opacity: 0, y: 24 }` → on mount, SPRING, delay 0
- Page intro paragraph → same, delay 0.1s
- Diagram image → `whileInView: { opacity: 0, scale: 0.97 }` → visible, `once: true`
- QuickRefCard → `whileInView` fadeUp, `once: true`
- CalloutBlocks → `whileInView` fadeUp, `once: true`, stagger if multiple on page
- Body section blocks (What It Is, How To Fix It, etc.) → `whileInView` fadeUp, `once: true`, 0.08s stagger between
- CrossLinks section → `whileInView` fadeUp, `once: true`

**NAV**
- Nav wrapper → `initial: { opacity: 0, y: -8 }` → mount animate, 0.3s duration
- Dropdown → `AnimatePresence`, `initial: { opacity: 0, y: -8, scale: 0.97 }` → visible
- Mobile menu → `AnimatePresence`, `initial: { opacity: 0, height: 0 }` → `{ opacity: 1, height: 'auto' }`

**OBJECTIONS PAGE**
- Search bar → `initial: { opacity: 0, y: 16 }` → mount animate, SPRING
- Filter tabs → stagger in on mount, 0.04s between each
- Objection cards → `whileHover: { y: -2 }`, SPRING_FAST
- Card body expand → `AnimatePresence`, `initial: { height: 0, opacity: 0 }` → `{ height: 'auto', opacity: 1 }`, exit reverses, `duration: 0.35`, ease EASE_SPRING
- Chevron icon → `animate: { rotate: isOpen ? 180 : 0 }`, SPRING_FAST
- Filter active indicator → `layoutId="activeTab"` on the underline — Framer slides it between tabs

**PATTERNS WHEEL (once built as interactive SVG)**
- Arc segments → `whileHover: { scale: 1.05 }` on SVG `<g>` wrapper
- Tooltip → `AnimatePresence`, `initial: { opacity: 0, scale: 0.9 }`

**CALL TYPE TREE (once built as interactive SVG)**
- Connecting lines → `pathLength` from 0 to 1 on mount, stagger
- Node hover → `whileHover: { scale: 1.08 }` on node group

**DO NOT add motion to:**
- Body text paragraphs
- Inline SignalBadge components
- Tables or data rows
- Footer
- The body gradient (CSS handles it)
- Any element already visible on page load that would animate redundantly

**Mobile:** Respect `prefers-reduced-motion`. When set, skip all Framer Motion enter animations. Keep hover states but remove the spring lift. The gradient still runs — it's a CSS animation with minimal impact.

---

## SECTION 10: COLOR TOKENS

```css
:root {
  --cream:        #FBF8F3;
  --cream-2:      #F0EBE1;
  --ink:          #131110;
  --ink-60:       rgba(19, 17, 16, 0.60);
  --ink-20:       rgba(19, 17, 16, 0.20);
  --ink-10:       rgba(19, 17, 16, 0.10);
  --sage:         #8FAF94;
  --sage-dark:    #6A8B6E;
  --sage-tint:    #EEF3EF;
  --terracotta:   #E05C34;
  --tc-dark:      #B84420;
  --tc-tint:      #FCEEE9;
  --tc-text:      #1A0D08;
  --mustard:      #E9B840;
  --mustard-dark: #C49A20;
  --mustard-tint: #FDF6E3;
  --dark-text:    #FAF5EC;
  --shadow-sm:    0 4px 12px rgba(19,17,16,0.06);
  --shadow-md:    0 12px 32px rgba(19,17,16,0.10);
  --shadow-lg:    0 25px 50px -12px rgba(19,17,16,0.12);
  --shadow-xl:    0 32px 64px -16px rgba(19,17,16,0.16);
  --rule:         1.5px solid #131110;
  --rule-lt:      1px solid rgba(19,17,16,0.12);
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-5:24px; --space-6:32px; --space-7:48px; --space-8:64px;
  --space-9:96px; --space-10:128px;
}
```

---

## SECTION 11: TYPOGRAPHY

Fonts:
- **Playfair Display** (Google Fonts) — italic for hero headlines and H1s, non-italic for H2s in long-form
- **Geist** (local variable font) — everything else. Never Geist Mono.

Signal colors are the only accent palette. Never use them decoratively. Never mix signals on one component.

Type scale in `globals.css`:
```css
.display-xl { font-family: var(--font-playfair); font-style: italic; font-weight: 700; font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; letter-spacing: -0.02em; }
.display-lg { font-family: var(--font-playfair); font-weight: 700; font-size: clamp(1.75rem, 3vw, 2.5rem); line-height: 1.2; }
.heading-md { font-family: var(--font-geist); font-weight: 700; font-size: 1.125rem; line-height: 1.4; }
.body-lg    { font-family: var(--font-geist); font-size: 1.0625rem; line-height: 1.7; }
.body-md    { font-family: var(--font-geist); font-size: 0.9375rem; line-height: 1.65; }
.label      { font-family: var(--font-geist); font-weight: 700; font-size: 0.6875rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-60); }
.mono-block { font-family: var(--font-geist); font-size: 0.9375rem; background: var(--cream-2); padding: 0.2em 0.5em; border-radius: 4px; }
```

---

## SECTION 12: COMPONENT SPECIFICATIONS

### Nav
Glassmorphic sticky bar. `background: rgba(251,248,243,0.85)`, `backdrop-filter: blur(20px)`, `border-bottom: 1px solid rgba(255,255,255,0.4)`, height 64px.
- Wordmark left: Playfair Display italic
- Links right: Objections / Call Types / Signals / Pillars / Patterns / More↓
- Hover → dropdown with glassmorphic panel (`border-radius: 12px`, `box-shadow: var(--shadow-xl)`)
- Mobile < 768px → hamburger → glass overlay menu with Framer AnimatePresence slide-down

### SignalBadge
Props: `signal: 'green' | 'red' | 'yellow'`, `variant?: 'filled' | 'tinted'`, `size?: 'sm' | 'lg'`
Pill shape (`border-radius: 999px`). 0.6875rem, uppercase, tracked. See design-spec for exact CSS per variant.

### ExpandCollapse (Objection Card)
Props: `clientPhrase`, `underneath`, `doNotSay`, `response`, `pillar`, `signal`
- Glass card (`.glass` class + `.cardGlow--[signal]`)
- Header: client phrase left, Carbon ChevronDown right
- Chevron animates 180° rotation on open (Framer)
- Body: AnimatePresence height animation
  - "Underneath It" section
  - "What NOT to Say" — terracotta tint block with left border
  - "The Response" — sage tint block with left border
  - Footer row: pillar name + SignalBadge
- useSignalHover applied with card's signal

### QuickRefCard
Props: `whoThisIs`, `firstSignal`, `primaryPillar`, `biggestMistake`, `signal`
Glass card with signal-colored left border. Four labeled rows.

### CalloutBlock
Props: `type: 'red' | 'yellow' | 'green' | 'neutral'`, `children`
Left border + tinted background. Signal-specific colors. `border-radius: 0 12px 12px 0`.

### CrossLinks
Props: `links: Array<{ label: string, href: string }>`
Pill-shaped chips. Glass-subtle background. Carbon ArrowRight icon.
`whileHover: { y: -1 }` on each chip.

### Tooltip
Props: `term`, `definition`
Carbon Information icon. Framer AnimatePresence popup on hover/tap.

### ObjectionSearch
Fuse.js, threshold 0.4, searches `clientPhrase`. Carbon Search icon left. Carbon Close icon right (clear). Glass-subtle input. Full width above fold on `/objections`.

---

## SECTION 13: PAGE SPECIFICATIONS

### Home `/`
1. Hero: full-viewport, no overlay, gradient + video slot + watermark + headline + CTAs
2. System map PNG (`system-map.png`) — centered, max-width 900px, glass card wrapper, whileInView reveal
3. Section nav grid — 6 cards (Signals, Pillars, Patterns, Call Types, Objections, Math Breakdown), 3×2, stagger animation, each card: glass + signal glow + useSignalHover + whileHover lift

### Objections `/objections`
Page signal: neutral. See Section 6 for full Fuse.js search implementation.

### Signals `/signals`
Page signal: neutral. Signals visual PNG → three signal blocks (GREEN / RED / YELLOW) → "Handle RED before YELLOW" callout → CrossLinks.

### Pillars `/pillars`
Page signal: neutral. Pillars PNG → four pillar cards 2×2 → each card has signal glow and useSignalHover.

### Pillar pages `/pillars/[slug]`
Each page sets its signal on mount (see Section 6 mapping).
Layout: QuickRefCard → body content from MDX → CrossLinks.

### Patterns `/patterns`
Page signal: neutral. Pattern Wheel PNG → nine pattern cards grouped by root cause (3 groups) → stagger animation per group.

### Pattern pages `/patterns/[slug]`
Each pattern card page: CalloutBlock (one-sentence cost) → What It Is → What It Sounds Like → What It Costs → How to Fix It → CrossLinks.

### Call Types `/call-types`
Page signal: neutral. Call Type Tree PNG → nine cards 3×3 → signal badge on each → stagger animation.

### Call Type pages `/call-types/[slug]`
QuickRefCard → Identification phrases mono block → Primary Move section → Common objections list → CrossLinks.

### Math Breakdown `/math-breakdown`
Page signal: green. Hero heading → Math Breakdown Flow PNG → Three step sections (Monthly Number / Make It Annual / Humanize It) → 3-question test CalloutBlock (green) → CrossLinks.

### Storytelling `/storytelling`
Page signal: neutral. Heading → 4-part story structure → examples by call type → CrossLinks.

### Close Confirmation `/close-confirmation`
Page signal: neutral. Heading → Three component sections (Anchor / Confidence / Forward Close) → 3-question test CalloutBlock → CrossLinks.

### How Calls Are Graded `/how-calls-are-graded`
Page signal: neutral. Plain language scoring explanation. Intro → 4 call classifications → Certainty Score overview → 6 scoring categories → CrossLinks.

---

## SECTION 14: INTERACTIVE DIAGRAMS

Six static PNGs in `public/images/`. Use as `<Image>` components first. After site is built and working, replace with interactive React components. The PNG is the design blueprint — rebuild it in code, matching it exactly, then add hover interactions.

| Diagram | File → Component | Library | Page |
|---|---|---|---|
| System Map | system-map.png → SystemMap.tsx | Framer Motion SVG | `/` |
| Signals Visual | signals-visual.png → SignalsVisual.tsx | Framer Motion SVG | `/signals` |
| Pillars Diagram | pillars-diagram.png → PillarsVisual.tsx | Framer Motion SVG | `/pillars` |
| Math Breakdown Flow | math-breakdown-flow.png → MathBreakdownFlow.tsx | Framer Motion SVG | `/math-breakdown`, `/pillars/the-shift` |
| Call Type Tree | call-type-tree.png → CallTypeTree.tsx | D3 tree layout | `/call-types` |
| Pattern Wheel | pattern-wheel.png → PatternWheel.tsx | D3 arc layout | `/patterns` |

All interactive diagrams: on hover → node lifts, soft glow appears, label goes full opacity, tooltip shows one-line description.

---

## SECTION 15: CROSS-LINKING RULES

Every page has a CrossLinks component (min 2, max 5 links).

- Pattern pages → the pillar that fixes it (see fix map in Section 7.7 of original PRD)
- Pillar pages → the signal(s) it addresses + related patterns
- Call type pages → primary pillar + relevant objections page
- `/math-breakdown` → Pattern 2 + `/pillars/the-shift`
- `/close-confirmation` → Pattern 9 (Hollow Yes)
- Objection cards → their pillar (inline, in expanded card footer)

---

## SECTION 16: NAVIGATION

Sticky top bar, full width.
- Wordmark left: "The Certainty System" Playfair italic
- Right: Objections / Call Types / Signals / Pillars / Patterns / More↓
- Hover → dropdown panel (glassmorphic, border-radius 12px, shadow-xl)
- Mobile: hamburger → Framer AnimatePresence full-width overlay

---

## SECTION 17: SHADOW RULES

All shadows are blurred. No hard edges. Ever.

- Small elements (badges, chips): `--shadow-sm`
- Cards at rest: `--shadow-md`
- Cards on hover: `--shadow-lg`
- Dropdowns, elevated panels: `--shadow-xl`

---

## SECTION 18: BUILD ORDER

Do not skip steps. Do not build step 10 before step 6 is done.

1. package.json + all dependencies
2. next.config.ts
3. tsconfig.json
4. globals.css — ambient gradient on body, all CSS custom properties, glass utility classes, type scale
5. src/lib/motion.ts — SPRING configs, stagger variants
6. src/context/AmbientContext.tsx + src/hooks/useSignalHover.ts
7. Base UI components: SignalBadge, CalloutBlock, CrossLinks, Tooltip
8. Nav — glassmorphic, Framer dropdowns, mobile menu
9. Home page — hero (gradient, watermark, video slot, CTAs), section cards grid
10. /signals
11. /pillars overview + 4 pillar pages
12. /patterns overview + 9 pattern pages
13. /math-breakdown
14. /close-confirmation
15. /storytelling
16. /how-calls-are-graded
17. /call-types overview + 9 call type pages
18. /objections — search + filter tabs + ExpandCollapse + Fuse.js
19. Apply useSignalHover to all elements in the signal map (Section 6)
20. Cross-linking pass
21. Mobile responsive pass + prefers-reduced-motion
22. Full Framer Motion pass — apply element-by-element motion map (Section 9)
23. Interactive diagram components (replace PNGs)
24. Final polish — every page: gradient state, glass, shadows, glow accents, motion

---

## SECTION 19: CONTENT SOURCE

**The MDX files in `content/` are the authoritative source for all copy.**
Do not invent content. Do not use memory or project knowledge. Read the files.
If a content file is missing, stop and flag it — do not fill it in.

---

## SECTION 20: PHASE 2 NOTES (do not build — just architect for)

- All URLs in Section 5 are permanent
- Agents will have accounts; call reports will deep-link to these pages
- `/how-calls-are-graded` will expand with live scoring
- Video background (`public/hero-bg.mp4`) will be added — build the slot now

---

## SECTION 21: DO NOT

- Do not use Tailwind CSS
- Do not use Geist Mono
- Do not use hard-edged shadows
- Do not add Framer Motion to body text, inline badges, or the body gradient
- Do not use signal colors decoratively
- Do not invent missing content — flag it
- Do not auto-commit — always ask first

---

*The Certainty System — Knowledge Hub PRD v2.0 | March 2026 | FINAL*
