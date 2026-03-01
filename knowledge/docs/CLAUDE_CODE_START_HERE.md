# THE CERTAINTY SYSTEM — KNOWLEDGE HUB
## Claude Code Handoff: Start Here v3

**Open this folder in Claude Code:** `Certainty/knowledge/`

---

## STEP 0: UNDERSTAND THE FEELING BEFORE TOUCHING CODE

This site should feel like nothing else the agents have used. Not a documentation site. Not a healthcare portal. Not a corporate training wiki.

The reference feeling: a serious editorial tool that is also somehow alive. Like if a premium publication built a textbook, and the textbook had a heartbeat.

**70% serious, 30% "this makes me feel something."**

The 30% is not decoration. It is not random motion. It is specific things:
- The background is always slowly moving — a gradient drifting through the system's own signal colors
- When you navigate to a RED signal page, the whole room subtly shifts warmer
- When you navigate to a GREEN signal page, the room calms and goes sage
- Glass cards float above the gradient like panels in the air
- Things don't just appear — they arrive, with spring physics
- Shadows look like real light — diffuse, blurred, never hard
- The hero has a large, ghostly watermark behind everything

Read this entire handoff. Then read `docs/prd.md`. Then read `docs/design-spec.md`. Do not write a single line of code until you've confirmed your understanding.

---

## STEP 1: CLEAN UP FIRST

Delete these stale duplicate files from `content/` root (the correct versions are inside the subfolders):

```
content/close-confirmation.mdx   ← DELETE
content/how-calls-are-graded.mdx ← DELETE
content/math-breakdown.mdx       ← DELETE
content/signals.mdx              ← DELETE
content/storytelling.mdx         ← DELETE
content/index.mdx                ← KEEP (this is the home page content)
```

---

## STEP 2: RENAME THE IMAGES

Images in `public/images/` have long auto-generated names. Rename them to these exact names:

| Current name starts with... | Rename to |
|---|---|
| `Create_a_clean_editorial_diagram_titled_the_certai...` | `system-map.png` |
| `Create_a_clean_editorial_diagram_titled_the_three_...` | `signals-visual.png` |
| `Create_a_clean_editorial_diagram_titled_the_four_p...` | `pillars-diagram.png` |
| `Create_a_clean_editorial_flow_diagram_titled_the_m...` | `math-breakdown-flow.png` |
| `Create_a_clean_editorial_decision_tree_diagram_tit...` | `call-type-tree.png` |
| `Create_a_clean_editorial_circular_diagram_titled_t...` | `pattern-wheel.png` |

---

## STEP 3: TECH STACK

```
Framework:    Next.js 14+ App Router
Language:     TypeScript (.tsx / .ts)
Styling:      CSS Modules — NO Tailwind
Fonts:        Geist (local) + Playfair Display (Google Fonts)
Content:      MDX files in content/ — static, no database
Search:       Fuse.js — client-side fuzzy search on /objections only
Icons:        IBM Carbon Icons (@carbon/icons-react)
Motion:       Framer Motion — required, not optional
Diagrams:     D3.js + Framer Motion SVG (see diagram section below)
Hosting:      Vercel
```

Full install:
```bash
npm install next react react-dom typescript @types/react @types/node
npm install @next/mdx next-mdx-remote gray-matter
npm install fuse.js
npm install @carbon/icons-react
npm install framer-motion
npm install d3 @types/d3
```

---

## STEP 4: THE AMBIENT GRADIENT — THIS IS THE SITE'S IDENTITY

The background of the entire site is a living gradient. It uses the system's three signal colors — terracotta (RED), mustard (YELLOW), sage (GREEN) — cycling slowly through cream.

```css
/* globals.css */
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

### Signal-Aware State Shifts

On signal-specific pages, the body gets a data attribute that shifts the gradient toward that signal's dominant color. This happens automatically on page load via a `useEffect` that reads the page's `data-signal` prop.

```css
body[data-signal="red"]    { background-position: 0% 50%;   transition: background-position 2.5s ease; }
body[data-signal="yellow"] { background-position: 40% 50%;  transition: background-position 2.5s ease; }
body[data-signal="green"]  { background-position: 100% 50%; transition: background-position 2.5s ease; }
body[data-signal="neutral"]{ background-position: 50% 50%;  transition: background-position 2.5s ease; }
```

Page signal mapping:
- `/` → neutral
- `/signals` → neutral (shows all three)
- `/pillars/persuasion` → neutral
- `/pillars/reframing` → red
- `/pillars/the-shift` → green
- `/pillars/refocusing` → yellow
- `/math-breakdown` → green
- `/patterns` → neutral
- `/call-types` → neutral
- `/objections` → neutral

### Content Readability Overlay

The home page hero shows the full raw gradient. All other pages add a cream overlay so text is readable:

```css
/* Applied to a fixed div that sits above the gradient but below content */
.page-overlay {
  position: fixed;
  inset: 0;
  background: rgba(251, 248, 243, 0.83);
  pointer-events: none;
  z-index: 0;
}
/* z-index: 1 on all content, z-index: 0 on overlay, gradient is on body */
```

---

## STEP 5: HERO SECTION — THE MOST IMPORTANT SECTION

The home page `/` hero must be the most immersive section on the site. Full viewport height. No overlay — the gradient shows at full intensity.

**Hero structure:**
1. **Background layer:** The gradient (always animating)
2. **Video layer (optional):** If `public/hero-bg.mp4` exists, render it as an absolutely-positioned video at `opacity: 0.05`, `mix-blend-mode: overlay`. This adds subtle texture/movement over the gradient. If the file doesn't exist, skip this layer — the gradient is sufficient. Build the slot for it anyway.
3. **Watermark layer:** A large ghostly text element — the word "CERTAINTY" — positioned centered, `font-size: clamp(8rem, 20vw, 18rem)`, `opacity: 0.06`, `color: white`, `mix-blend-mode: overlay`, `pointer-events: none`, `user-select: none`. This is a visual depth element, not readable text.
4. **Content layer:** Hero headline + subhead + CTAs

**Hero video slot code (build this even if no video exists yet):**
```tsx
{/* In hero section */}
<div className={styles.heroBackground}>
  {/* Gradient is on body — no extra div needed */}
  
  {/* Video texture — only renders if file exists */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className={styles.heroVideo}
    src="/hero-bg.mp4"
    onError={(e) => { (e.target as HTMLVideoElement).style.display = 'none' }}
  />
  
  {/* Ghostly watermark */}
  <div className={styles.heroWatermark} aria-hidden="true">CERTAINTY</div>
</div>
```

```css
/* CSS Module */
.heroVideo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.05;
  mix-blend-mode: overlay;
  pointer-events: none;
}

.heroWatermark {
  position: absolute;
  top: 50%;
  left: 50%;
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

**Hero headline:** Playfair Display italic, large, `--ink` color. Example: *"The system that turns a conversation into a commitment."*

**Hero CTAs:** Primary button (dark glass pill: `background: rgba(19,17,16,0.85)`, `backdrop-filter: blur(16px)`, `color: #FAF5EC`, `border-radius: 999px`, `padding: 16px 32px`) + secondary text link.

---

## STEP 6: GLASSMORPHISM — THE CARD SYSTEM

Every card, panel, and surface floats above the gradient using glass:

```css
/* Light glass — primary card style */
.glass {
  background: rgba(251, 248, 243, 0.78);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.10),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

/* Dark glass — for contrast sections */
.glassDark {
  background: rgba(19, 17, 16, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  color: #FAF5EC;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.20);
}

/* Subtle glass — for nav, search bar, small elements */
.glassSubtle {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.45);
}
```

### Card Glow Accents

Signal-specific pages add a soft corner glow inside cards matching the signal:

```css
.cardGlowRed::before {
  content: '';
  position: absolute;
  top: -40px; right: -40px;
  width: 180px; height: 180px;
  border-radius: 50%;
  background: #E05C34;
  filter: blur(60px);
  opacity: 0.10;
  pointer-events: none;
  transition: opacity 0.8s ease;
}
.cardGlowRed:hover::before { opacity: 0.20; }

/* Same pattern for .cardGlowYellow (mustard, bottom-left) and .cardGlowGreen (sage, top-left) */
```

---

## STEP 7: MOTION MAP — EXACTLY WHERE AND HOW TO USE FRAMER MOTION

Install: `npm install framer-motion`

Create `src/lib/motion.ts` with shared configs:

```typescript
export const SPRING = { type: "spring" as const, stiffness: 100, damping: 20, mass: 0.8 }
export const SPRING_FAST = { type: "spring" as const, stiffness: 200, damping: 25 }
export const EASE_OUT = [0.16, 1, 0.3, 1] // cubic-bezier — the spring easing

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: SPRING,
}

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: SPRING },
}
```

### Element-by-Element Motion Map

Apply Framer Motion to exactly these elements, in exactly these ways. Nothing else unless it feels obviously right.

**HOME PAGE `/`**
- Hero headline → `initial: { opacity: 0, y: 32 }` animate to `{ opacity: 1, y: 0 }` on mount, delay 0.1s, SPRING
- Hero subheadline → same, delay 0.2s
- Hero CTAs → same, delay 0.35s
- Hero diagram image → `initial: { opacity: 0, scale: 0.97 }` → `{ opacity: 1, scale: 1 }`, delay 0.5s, SPRING
- Section nav cards grid → `staggerContainer` on the grid wrapper, `staggerChild` on each card
- Each section card → `whileHover: { y: -4, scale: 1.01 }`, `whileTap: { scale: 0.99 }`, transition SPRING_FAST

**INTERIOR PAGES (all of them)**
- Page title (H1) → `whileInView` fadeUp, `once: true`, delay 0
- Page intro paragraph → `whileInView` fadeUp, `once: true`, delay 0.1s
- Diagram image → `whileInView: { opacity: 0, scale: 0.97 }` → `{ opacity: 1, scale: 1 }`, `once: true`
- QuickRefCard → `whileInView` fadeUp, `once: true`, stagger if multiple
- CalloutBlocks → `whileInView` fadeUp, `once: true`
- CrossLinks section → `whileInView` fadeUp, `once: true`

**NAV**
- Nav wrapper → `initial: { opacity: 0, y: -8 }` → `{ opacity: 1, y: 0 }` on mount, fast (0.3s)
- Dropdown menu → `AnimatePresence`, `initial: { opacity: 0, y: -8, scale: 0.97 }` → visible, exit reverses
- Mobile menu → `AnimatePresence`, slide in from top, `initial: { opacity: 0, height: 0 }` → `{ opacity: 1, height: 'auto' }`

**OBJECTIONS PAGE `/objections`**
- Search bar → `initial: { opacity: 0, y: 16 }` animate on mount
- Filter tabs → stagger in on mount, 0.04s between each
- Each objection card → `whileHover: { y: -2 }`, transition SPRING_FAST
- Card expand/collapse → **AnimatePresence** + `initial: { height: 0, opacity: 0 }` → `{ height: 'auto', opacity: 1 }`, exit reverses, duration 0.35s, ease EASE_OUT
- Chevron icon → `animate: { rotate: isOpen ? 180 : 0 }`, transition SPRING_FAST
- Filter tab active state → `layoutId="activeTab"` for the underline/indicator — Framer handles smooth movement between tabs

**PATTERN WHEEL (once built as SVG/D3)**
- Each arc segment → `whileHover: { scale: 1.05 }` on the SVG `<g>` wrapper
- Tooltip → `AnimatePresence`, `initial: { opacity: 0, scale: 0.9 }` → visible

**CALL TYPE TREE (once built as SVG/D3)**
- Nodes draw in with a path animation using `pathLength` from 0 to 1 on mount
- Node hover → `whileHover: { scale: 1.08 }` on the node circle

### What NOT to Add Motion To

- Body text paragraphs — do not animate individual sentences or words
- Inline badges (SignalBadge) — static
- Tables — static
- Footer — static
- The gradient itself is already animated via CSS — don't add Framer on top of it
- Don't add `whileInView` to elements that are already above the fold on load — use mount animation instead

---

## STEP 8: SHADOW RULES

All shadows must feel like real light — diffuse, blurred, natural. Zero hard edges.

```css
--shadow-sm:  0 4px 12px rgba(19, 17, 16, 0.06);
--shadow-md:  0 12px 32px rgba(19, 17, 16, 0.10);
--shadow-lg:  0 25px 50px -12px rgba(19, 17, 16, 0.12);
--shadow-xl:  0 32px 64px -16px rgba(19, 17, 16, 0.16);
```

Use `--shadow-sm` on small components (badges, chips, inline elements).
Use `--shadow-md` on cards at rest.
Use `--shadow-lg` on cards on hover / elevated states.
Use `--shadow-xl` on modals (if any) and the nav dropdown.

Never use a shadow without a blur value. Never use `box-shadow: 0 2px 4px #000`.

---

## STEP 9: BUILD ORDER

Do not skip steps. Do not build step 8 before step 5 is done.

1. `package.json` — all dependencies
2. `next.config.ts`
3. `tsconfig.json`
4. `src/app/globals.css` — ambient gradient on body, all CSS custom properties (colors, spacing, shadows, type scale, glass utility classes)
5. `src/lib/motion.ts` — SPRING configs, stagger variants, RevealBlock component
6. Base components: `SignalBadge.tsx`, `CalloutBlock.tsx`, `CrossLinks.tsx`, `Tooltip.tsx`
7. `Nav.tsx` — glassmorphic sticky bar with Framer dropdown + mobile menu
8. Home page `/` — hero (gradient, watermark, video slot, headline, CTAs), section cards grid
9. `/signals` — signals-visual.png, three signal blocks, state-neutral
10. `/pillars` overview + 4 pillar subpages (each with correct data-signal)
11. `/patterns` overview + 9 pattern subpages
12. `/math-breakdown` — state-green
13. `/close-confirmation`
14. `/storytelling`
15. `/how-calls-are-graded`
16. `/call-types` overview + 9 call type subpages
17. `/objections` — search + filter tabs + ExpandCollapse cards + Fuse.js
18. Cross-linking pass
19. Mobile responsive pass
20. Full Framer Motion pass — apply the element-by-element motion map from Step 7
21. Diagram components — replace PNGs with interactive SVG/D3 components
22. Final polish — verify every page: gradient state, glass surfaces, shadows, glow accents, motion

---

## STEP 10: DIAGRAMS — HOW THEY WORK

Six static PNG images are in `public/images/`. Use them as `<Image>` components first.

After the site is built and working, replace each with an interactive React component. The PNG is the design blueprint — look at the PNG, then rebuild it in code so it matches exactly, with hover interactions added.

**D3.js** is for diagrams with complex layouts that D3 can calculate: `CallTypeTree.tsx` (D3 tree layout) and `PatternWheel.tsx` (D3 arc layout). Install: `npm install d3 @types/d3`.

**Framer Motion SVG** is for the simpler diagrams where the shapes are fixed: `SignalsVisual.tsx`, `PillarsVisual.tsx`, `MathBreakdownFlow.tsx`, `SystemMap.tsx`.

On hover for all diagrams: the hovered element lifts slightly, gets a soft glow, its label goes full opacity, and a small tooltip appears showing a one-line description. Use Framer `whileHover` on SVG `<g>` elements.

---

## STEP 11: CONTENT — DO NOT INVENT

The MDX files in `content/` are the only content source. Read them and render them.

If a file is missing or incomplete, stop and flag it. Do not fill in from memory, from context, or from what seems logical. The content is the source of truth.

---

## STEP 12: URL STRUCTURE — PERMANENT

These URLs will be linked from call reports. Never restructure them.

```
/                           Home
/objections                 Objection Handbook
/call-types                 9 Call Types overview
/call-types/[slug]          Individual call type pages
/signals                    Three Client Signals
/pillars                    Four Pillars overview
/pillars/[slug]             Individual pillar pages
/patterns                   Nine Failure Patterns overview
/patterns/[slug]            Individual pattern pages
/math-breakdown             The Math Breakdown
/storytelling               The Storytelling Mechanism
/close-confirmation         The Close Confirmation Protocol
/how-calls-are-graded       Call grading explained
```

Full slug list in `docs/prd.md` Section 5.

---

## STEP 13: OBJECTIONS PAGE — MOST COMPLEX, MOST IMPORTANT

Read `docs/prd.md` Section 7.2 completely before building this page.

- Content: single MDX file `content/objections/index.mdx`
- Full-width Fuse.js search bar at top — threshold 0.4, searches `clientPhrase` field
- Category filter tabs below search — Framer `layoutId` for smooth active indicator
- All cards collapsed by default — only the client phrase is visible
- On expand: reveal Underneath It / What NOT to Say (terracotta tint block) / The Response (sage tint block) / Pillar + Signal badge at footer
- Expand/collapse uses Framer Motion AnimatePresence for smooth height animation
- Chevron icon rotates 180° when open

---

## STEP 14: CURSOR-DRIVEN AMBIENT STATE SHIFTS

The ambient gradient responds to where the cursor is on the page — not just which page you're on.

This is the most alive-feeling feature on the site. When a cursor drifts over anything with a signal association, the background slowly bleeds toward that signal's color. When the cursor leaves, it drifts back to neutral. It should feel like the page is aware of where you are, not like it's reacting to you.

### The Context System

Create `src/context/AmbientContext.tsx`:

```typescript
import { createContext, useContext, useCallback, useRef, useState } from 'react'

type Signal = 'neutral' | 'red' | 'yellow' | 'green'

const AmbientContext = createContext<{
  setSignal: (s: Signal) => void
  clearSignal: () => void
}>({
  setSignal: () => {},
  clearSignal: () => {},
})

export function AmbientProvider({ children }: { children: React.ReactNode }) {
  const debounceRef = useRef<NodeJS.Timeout>()
  const returnRef = useRef<NodeJS.Timeout>()

  const setSignal = useCallback((signal: Signal) => {
    // Clear any pending return-to-neutral
    clearTimeout(returnRef.current)
    // Debounce 300ms so micro-movements don't fire constantly
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      document.body.setAttribute('data-signal', signal)
    }, 300)
  }, [])

  const clearSignal = useCallback(() => {
    clearTimeout(debounceRef.current)
    // Return to neutral after 600ms — gives it time to linger
    returnRef.current = setTimeout(() => {
      document.body.setAttribute('data-signal', 'neutral')
    }, 600)
  }, [])

  return (
    <AmbientContext.Provider value={{ setSignal, clearSignal }}>
      {children}
    </AmbientContext.Provider>
  )
}

export const useAmbient = () => useContext(AmbientContext)
```

Wrap the root layout with `<AmbientProvider>`.

### The Hook — Attach to Any Element

Create `src/hooks/useSignalHover.ts`:

```typescript
import { useAmbient } from '@/context/AmbientContext'

export function useSignalHover(signal: 'red' | 'yellow' | 'green' | 'neutral') {
  const { setSignal, clearSignal } = useAmbient()
  return {
    onMouseEnter: () => setSignal(signal),
    onMouseLeave: () => clearSignal(),
  }
}
```

Usage — attach to any card, section, or element with a signal association:

```tsx
// On a Reframing pillar card
const signalHover = useSignalHover('red')

<motion.div
  className={styles.pillарCard}
  whileHover={{ y: -4, scale: 1.01 }}
  {...signalHover}  // spreads onMouseEnter + onMouseLeave
>
```

### CSS — The Gradient Responds

Already defined via the body `data-signal` attribute transitions in Step 4. The 2.5s transition means every shift is a slow drift, never a snap.

### What Gets Signal Hover Attached

Apply `useSignalHover` to these elements across the site:

| Element | Signal |
|---|---|
| Reframing pillar card (all instances) | red |
| Refocusing pillar card | yellow |
| The Shift pillar card | green |
| Persuasion pillar card | neutral |
| Pattern cards — Root Cause 1 patterns (1, 4, 6) | red |
| Pattern cards — Root Cause 2 patterns (2, 3, 8) | red |
| Pattern cards — Root Cause 3 patterns (5, 7, 9) | yellow |
| Call type cards — Red signal types (Scared Switcher, Third Party Controlled, Commercial Myth) | red |
| Call type cards — Yellow signal types (Detail Staller, Timing Objector, Time Bomb) | yellow |
| Call type cards — Green signal types (Money Caller, Misinformed Caller, Veteran) | green |
| Objection cards — attach signal from card frontmatter | per card |
| Math Breakdown section | green |
| SignalBadge components (optional — subtle) | per signal |

### Subtlety Rules

- The 300ms debounce prevents it from firing on cursor passes — you have to actually pause on something
- The 600ms return delay means the shift lingers briefly after you leave — it doesn't snap back immediately
- The 2.5s CSS transition means you never see a hard change — only drifts
- Do NOT add this to nav links, body text, or the search bar — only to signal-associated content cards and sections
- On mobile: disable entirely. Touch events don't have hover, and simulating it would feel wrong

```typescript
// In useSignalHover.ts — add this guard
const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
if (isTouchDevice) return { onMouseEnter: undefined, onMouseLeave: undefined }
```

---

## STEP 15: DO NOT

- Do not use Tailwind CSS
- Do not use Geist Mono
- Do not use hard-edged shadows
- Do not add motion to body text paragraphs, inline badges, or the gradient (it's already animated)
- Do not invent content — flag missing MDX files instead
- Do not auto-commit — always ask before committing

---

## WHEN YOU ARE READY TO START

Read this file. Read `docs/prd.md`. Read `docs/design-spec.md`.

Then respond with: "I've read all three files. Here's my understanding of the project and here are my questions before I write any code."

Do not write code first.

---

*The Certainty System — Knowledge Hub | Claude Code Handoff v3 | March 2026*
