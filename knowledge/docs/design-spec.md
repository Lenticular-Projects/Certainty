# The Certainty System — Knowledge Hub
## Design Specification
### v2.0 | March 2026

---

## 1. DESIGN PHILOSOPHY

**70% serious professional tool. 30% "this makes me feel something."**

Agents should feel proud to have this open on a second monitor. It should feel like a premium editorial reference — the kind of thing that signals the system they're part of is serious and well-built. But it cannot be dead. It has to breathe. There has to be life in it.

The reference point: what if a thoughtful designer built a textbook, but the textbook had a heartbeat?

**What this means in practice:**
- The background is alive — a slow ambient gradient that drifts between the system's three signal colors. On the home page hero, this gradient is the atmosphere. On interior pages, it is subtler but still present.
- Glass surfaces float above the gradient. Cards and panels are glassmorphic — `backdrop-filter: blur(20px)` with semi-transparent backgrounds and soft white borders.
- Shadows are soft, blurred, realistic. `box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.12)`. Never hard-edged.
- Everything that enters the viewport reveals with a spring. `cubic-bezier(0.16, 1, 0.3, 1)` is the easing for all enter animations — it overshoots slightly and then settles, making the UI feel physical.
- Hover states are meaningful, not decorative. Cards lift. Buttons translate up 1–2px. Glows pulse.

**IBM Carbon** still informs structural decisions: grid discipline, icon language, spacing units. The ambient + glass layer is what makes it alive.

---

## 2. THE AMBIENT GRADIENT SYSTEM

This is the most important design decision. The background is not static.

### The Gradient

```css
.ambient-bg {
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

### State Shifts (Signal-Aware Background)

On pages that are signal-specific, the background shifts toward that signal's color:

```css
/* Neutral / home */
.ambient-bg { background-position: 50% 50%; }

/* RED signal pages (/pillars/reframing, RED-heavy pattern pages) */
.ambient-bg.state-red { background-position: 0% 50%; }

/* YELLOW signal pages (/pillars/refocusing) */
.ambient-bg.state-yellow { background-position: 40% 50%; }

/* GREEN signal pages (/pillars/the-shift, /math-breakdown) */
.ambient-bg.state-green { background-position: 100% 50%; }
```

The gradient class goes on `<body>` or the root layout. Interior pages pass a `data-signal` attribute that applies the appropriate state class via JavaScript.

### Background Overlay for Content Readability

On interior content pages, add a cream overlay above the gradient so text remains readable:

```css
.page-overlay {
  position: fixed;
  inset: 0;
  background: rgba(251, 248, 243, 0.82);
  pointer-events: none;
  z-index: 0;
}
```

The home page hero has NO overlay — the full gradient shows through. Interior pages have the overlay. This creates visual separation between the immersive hero and the readable content pages.

---

## 3. GLASSMORPHISM SYSTEM

Cards and panels float above the ambient gradient using glass surfaces.

```css
/* Light glass — for cards on light/cream backgrounds */
.glass {
  background: rgba(251, 248, 243, 0.80);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.10),
              0 0 0 1px rgba(255, 255, 255, 0.3) inset;
}

/* Dark glass — for sections that need contrast */
.glass-dark {
  background: rgba(19, 17, 16, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  color: #FAF5EC;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.20);
}

/* Subtle glass — for inline elements, search bar, input fields */
.glass-subtle {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}
```

### Glass Glow Accents

Each card has a soft ambient glow in the corner using its signal color — adds warmth without visual weight:

```css
.card-glow::before {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.12;
  pointer-events: none;
  transition: opacity 0.8s ease, background 0.8s ease;
}
.card-glow--red::before    { background: #E05C34; top: -40px; right: -40px; }
.card-glow--yellow::before { background: #E9B840; bottom: -40px; left: -40px; }
.card-glow--green::before  { background: #8FAF94; top: -40px; left: -40px; }
.card-glow:hover::before { opacity: 0.22; }
```

---

## 4. COLOR TOKENS

```css
:root {
  /* Base surfaces */
  --cream:        #FBF8F3;
  --cream-2:      #F0EBE1;

  /* Type */
  --ink:          #131110;
  --ink-60:       rgba(19, 17, 16, 0.60);
  --ink-20:       rgba(19, 17, 16, 0.20);
  --ink-10:       rgba(19, 17, 16, 0.10);

  /* Signal: GREEN */
  --sage:         #8FAF94;
  --sage-dark:    #6A8B6E;
  --sage-tint:    #EEF3EF;

  /* Signal: RED */
  --terracotta:   #E05C34;
  --tc-dark:      #B84420;
  --tc-tint:      #FCEEE9;
  --tc-text:      #1A0D08;

  /* Signal: YELLOW */
  --mustard:      #E9B840;
  --mustard-dark: #C49A20;
  --mustard-tint: #FDF6E3;

  /* Typography utility */
  --dark-text:    #FAF5EC;

  /* Shadows — always blurred, never hard */
  --shadow-sm:  0 4px 12px rgba(19, 17, 16, 0.06);
  --shadow-md:  0 12px 32px rgba(19, 17, 16, 0.10);
  --shadow-lg:  0 25px 50px -12px rgba(19, 17, 16, 0.12);
  --shadow-xl:  0 32px 64px -16px rgba(19, 17, 16, 0.16);

  /* Rules */
  --rule:         1.5px solid #131110;
  --rule-lt:      1px solid rgba(19, 17, 16, 0.12);
}
```

---

## 5. MOTION SYSTEM

**Install:** `npm install framer-motion`

Framer Motion is the motion library. Use it for scroll reveals, page transitions, and interactive component states. The site must feel alive — motion is required, not optional.

### Spring Config

```typescript
// Entrance spring — used for everything entering the viewport
export const SPRING = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 0.8,
}

// Micro-interaction spring — for hover/tap states
export const SPRING_FAST = {
  type: "spring" as const,
  stiffness: 200,
  damping: 25,
}
```

### Scroll Reveal

```typescript
import { motion } from 'framer-motion'

export const RevealBlock = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ ...SPRING, delay }}
  >
    {children}
  </motion.div>
)
```

### Card Hover Lift

```typescript
<motion.div
  whileHover={{ y: -4, scale: 1.01 }}
  whileTap={{ scale: 0.99 }}
  transition={SPRING_FAST}
  style={{ cursor: 'pointer' }}
>
```

### Page Enter Transition

```typescript
<motion.main
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ ...SPRING, duration: 0.5 }}
>
```

### Stagger Grid Animation

```typescript
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: SPRING },
}

// Usage:
<motion.div variants={containerVariants} initial="hidden" animate="show">
  {cards.map(card => (
    <motion.div key={card.id} variants={cardVariants}>...</motion.div>
  ))}
</motion.div>
```

### Expand/Collapse (Objection Cards)

```typescript
import { AnimatePresence, motion } from 'framer-motion'

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  )}
</AnimatePresence>
```

### Motion Rules

- All scroll reveals: `whileInView` with `once: true` — animate in once and stay
- No looping animations on content (only the background gradient loops)
- Max hover lift: `y: -4px`, max scale: `1.02`
- Never animate color changes on text
- Glow transitions: `0.8s ease` — slow, atmospheric
- Respect `prefers-reduced-motion` — wrap all Framer Motion with a check

---

## 6. TYPOGRAPHY

### Fonts

```typescript
import { Playfair_Display } from 'next/font/google'
import localFont from 'next/font/local'

const geist = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  weight: ['400', '700'],
})
```

### Type Scale

```css
.display-xl { font-family: var(--font-playfair); font-style: italic; font-weight: 700; font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; letter-spacing: -0.02em; }
.display-lg { font-family: var(--font-playfair); font-style: normal; font-weight: 700; font-size: clamp(1.75rem, 3vw, 2.5rem); line-height: 1.2; }
.heading-md { font-family: var(--font-geist); font-weight: 700; font-size: 1.125rem; line-height: 1.4; }
.body-lg    { font-family: var(--font-geist); font-weight: 400; font-size: 1.0625rem; line-height: 1.7; }
.body-md    { font-family: var(--font-geist); font-weight: 400; font-size: 0.9375rem; line-height: 1.65; }
.label      { font-family: var(--font-geist); font-weight: 700; font-size: 0.6875rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-60); }
.mono       { font-family: var(--font-geist); font-size: 0.9375rem; background: var(--cream-2); padding: 0.2em 0.4em; border-radius: 4px; }
```

### Typography Rules
- Playfair Display italic: hero headlines, H1 page headings, card titles on overview pages
- Playfair Display non-italic: H2 subsection headings in long-form content
- Everything else: Geist
- Never use Geist Mono
- Client phrases use Geist in styled mono block (cream-2 background)

---

## 7. SPACING SYSTEM

```css
--space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
--space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;
--space-9: 96px; --space-10: 128px;
```

- Max content width: 1200px
- Page horizontal padding: 24px mobile / 48px tablet / 80px desktop
- Section vertical spacing: 96px between major sections
- Component internal padding: 24px–32px

---

## 8. COMPONENT SPECIFICATIONS

### Nav — Glassmorphic Sticky Bar

```css
.nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(251, 248, 243, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  height: 64px; display: flex; align-items: center; padding: 0 48px;
}
.nav__wordmark { font-family: var(--font-playfair); font-style: italic; font-weight: 700; font-size: 1.125rem; margin-right: auto; }
.nav__link { font-weight: 600; font-size: 0.8125rem; color: var(--ink-60); padding: 8px 16px; transition: color 150ms ease; }
.nav__link:hover { color: var(--ink); }
.nav__dropdown { background: rgba(251, 248, 243, 0.92); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.5); box-shadow: var(--shadow-md); padding: 8px 0; min-width: 200px; border-radius: 12px; }
```

### SignalBadge

```css
.badge { display: inline-flex; align-items: center; gap: 6px; font-weight: 700; font-size: 0.6875rem; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 999px; padding: 4px 10px; }
.badge--green-filled  { background: var(--sage);        color: var(--dark-text); }
.badge--red-filled    { background: var(--terracotta);   color: var(--dark-text); }
.badge--yellow-filled { background: var(--mustard);      color: var(--ink); }
.badge--green-tinted  { background: var(--sage-tint);    color: var(--sage-dark);    border: 1px solid var(--sage-dark); }
.badge--red-tinted    { background: var(--tc-tint);      color: var(--tc-dark);      border: 1px solid var(--tc-dark); }
.badge--yellow-tinted { background: var(--mustard-tint); color: var(--mustard-dark); border: 1px solid var(--mustard-dark); }
```

### ExpandCollapse Card — Glass Version

```css
.card { background: rgba(251,248,243,0.75); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.5); border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-sm); }
.card:hover { box-shadow: var(--shadow-md); }
.card__header { padding: 20px 24px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
.card__icon { transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1); }
.card--open .card__icon { transform: rotate(180deg); }
.card__do-not { background: var(--tc-tint); border-left: 3px solid var(--tc-dark); padding: 12px 16px; border-radius: 0 8px 8px 0; }
.card__response { background: var(--sage-tint); border-left: 3px solid var(--sage-dark); padding: 12px 16px; border-radius: 0 8px 8px 0; }
```

### QuickRefCard

```css
.qrc { background: rgba(240,235,225,0.70); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.5); border-left: 3px solid; border-radius: 12px; padding: 24px 28px; box-shadow: var(--shadow-sm); margin-bottom: 48px; }
.qrc--green { border-left-color: var(--sage-dark); }
.qrc--red   { border-left-color: var(--tc-dark); }
.qrc--yellow { border-left-color: var(--mustard-dark); }
```

### CalloutBlock

```css
.callout { border-radius: 0 12px 12px 0; border-left: 3px solid; padding: 16px 20px; margin: 24px 0; }
.callout--neutral { background: rgba(240,235,225,0.70); border-left-color: var(--ink); }
.callout--green   { background: var(--sage-tint);    border-left-color: var(--sage-dark); }
.callout--red     { background: var(--tc-tint);      border-left-color: var(--tc-dark); }
.callout--yellow  { background: var(--mustard-tint); border-left-color: var(--mustard-dark); }
```

### CrossLinks

```css
.crosslinks__link { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 0.8125rem; border: 1px solid rgba(19,17,16,0.15); padding: 8px 14px; border-radius: 999px; background: rgba(255,255,255,0.5); backdrop-filter: blur(8px); transition: background 150ms ease, transform 150ms ease, box-shadow 150ms ease; }
.crosslinks__link:hover { background: rgba(255,255,255,0.8); transform: translateY(-1px); box-shadow: var(--shadow-sm); }
```

### ObjectionSearch

```css
.search__input { width: 100%; height: 56px; padding: 0 48px; font-size: 1rem; background: rgba(255,255,255,0.5); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.5); border-radius: 12px; outline: none; transition: border-color 150ms ease, box-shadow 150ms ease; }
.search__input:focus { border-color: var(--ink); box-shadow: var(--shadow-sm); }
```

---

## 9. HOME PAGE HERO

The hero is the most immersive section. No overlay — full gradient visible.

- Full viewport height
- Ambient gradient is the background (no overlay)
- Large Playfair italic headline, `--ink` color
- Two CTAs: primary (dark glass pill) + secondary (text link)
- System map diagram appears below fold with scroll reveal animation
- Optional MP4 video layer at 3–5% opacity overlay for subtle texture

**Text readability shield (gradient fade, not flat overlay):**
```css
.hero-text-shield {
  background: linear-gradient(to bottom, rgba(251,248,243,0) 0%, rgba(251,248,243,0.7) 100%);
}
```

---

## 10. VIDEO BACKGROUND (Optional — Phase 1 Ready)

If a Veo 3 MP4 is available, use it as a hero texture layer:

```tsx
<video autoPlay muted loop playsInline src="/hero-bg.mp4" className="hero-video" />
```

```css
.hero-video {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.05;
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

Disable on mobile. The gradient alone is sufficient without the video.

---

## 11. INTERACTIVE DIAGRAMS

Six diagrams. Static PNG placeholder first, then replaced with interactive React components.

**D3.js** for tree layouts and arc/wheel diagrams. **Framer Motion SVG** for simpler flow diagrams.

| Diagram | Component | Tech |
|---|---|---|
| System Map | `SystemMap.tsx` | D3 or pure SVG |
| Three Signals | `SignalsVisual.tsx` | Framer Motion SVG |
| Four Pillars | `PillarsVisual.tsx` | Framer Motion SVG |
| Math Breakdown Flow | `MathBreakdownFlow.tsx` | Framer Motion SVG |
| Call Type Tree | `CallTypeTree.tsx` | D3 tree layout |
| Pattern Wheel | `PatternWheel.tsx` | D3 arc layout |

On hover: node lifts, glow appears, label goes full opacity, tooltip shows one-line description.

Install: `npm install d3 @types/d3`

---

## 12. ICONS

IBM Carbon Icons (`@carbon/icons-react`)

| Usage | Icon |
|---|---|
| Expand/collapse | `ChevronDown` |
| Cross-links | `ArrowRight` |
| Search | `Search` |
| Clear | `Close` |
| Tooltip | `Information` |
| Nav dropdown | `ChevronDown` |
| Mobile menu | `Menu` |

---

## 13. LAYOUT GRID

```css
.page { max-width: 1200px; margin: 0 auto; padding: 0 var(--space-7); position: relative; z-index: 1; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
@media (max-width: 1024px) { .grid-3 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .page { padding: 0 var(--space-5); } .grid-3, .grid-2 { grid-template-columns: 1fr; } }
```

---

## 14. MOBILE RULES

- Nav collapses to hamburger at 768px
- Cards stack full width
- Objection search bar full width, min-height 52px
- Minimum tap target: 44px
- Hero video disabled on mobile — gradient only
- Reduce motion if `prefers-reduced-motion` is set

---

## 15. DO NOT

- Do not use Tailwind CSS
- Do not use hard-edged shadows — all shadows must have blur
- Do not use signal colors decoratively (only for their signal context)
- Do not loop animations on content elements
- Do not auto-commit — always ask before committing

---

*The Certainty System — Knowledge Hub Design Spec v2.0 | March 2026*
