# The Certainty System — Knowledge Hub
## Design Specification
### v1.0 | March 2026

---

## 1. DESIGN PHILOSOPHY

This site should feel like a serious professional tool that agents are proud to use.
Not a documentation site. Not healthcare software. Not a corporate training portal.

The reference point: what if a thoughtful designer — someone who cares about typography,
whitespace, and the human using the tool — designed a textbook for this system?
Functional first. Editorial second. Generic never.

**IBM Carbon Design System** informs the structural decisions: grid discipline, icon
language, component behavior. The editorial layer (Playfair Display, generous spacing,
signal color logic) is what makes it specific to this product.

---

## 2. COLOR TOKENS

These are the CSS variables for globals.css. They align with the existing Certainty
design system so both apps feel like the same product.

```css
:root {
  /* Base surfaces */
  --cream:        #FBF8F3;   /* primary background */
  --cream-2:      #F0EBE1;   /* secondary surface, card backgrounds, hover states */

  /* Type */
  --ink:          #131110;   /* all body text, headings */
  --ink-60:       rgba(19, 17, 16, 0.60);  /* secondary text, labels */
  --ink-20:       rgba(19, 17, 16, 0.20);  /* borders, dividers, rules */
  --ink-10:       rgba(19, 17, 16, 0.10);  /* subtle tints */

  /* Signal: GREEN */
  --sage:         #8FAF94;   /* GREEN signal — filled badge bg */
  --sage-dark:    #6A8B6E;   /* GREEN signal — border, icon, text on light */
  --sage-tint:    #EEF3EF;   /* GREEN signal — tinted badge bg, callout bg */

  /* Signal: RED */
  --terracotta:   #E05C34;   /* RED signal — filled badge bg, accent */
  --tc-dark:      #B84420;   /* RED signal — border, icon, text on light */
  --tc-tint:      #FCEEE9;   /* RED signal — tinted badge bg, callout bg */
  --tc-text:      #1A0D08;   /* text on terracotta backgrounds */

  /* Signal: YELLOW */
  --mustard:      #E9B840;   /* YELLOW signal — filled badge bg, CTAs */
  --mustard-dark: #C49A20;   /* YELLOW signal — border, icon, text on light */
  --mustard-tint: #FDF6E3;   /* YELLOW signal — tinted badge bg, callout bg */

  /* Typography utility */
  --dark-text:    #FAF5EC;   /* text on dark (ink) backgrounds */

  /* Rules */
  --rule:         1.5px solid #131110;
  --rule-lt:      1px solid rgba(19, 17, 16, 0.12);
}
```

---

## 3. SIGNAL COLOR LOGIC

The three signal colors ARE the design system. Use them consistently.

| Context | GREEN | RED | YELLOW |
|---|---|---|---|
| Filled badge | sage bg + dark-text | terracotta bg + dark-text | mustard bg + ink |
| Tinted badge | sage-tint bg + sage-dark text/border | tc-tint bg + tc-dark text/border | mustard-tint bg + mustard-dark text/border |
| Callout block left border | sage-dark | tc-dark | mustard-dark |
| Callout block background | sage-tint | tc-tint | mustard-tint |
| QuickRefCard left border | sage-dark | tc-dark | mustard-dark |

**Rules:**
- Never use signal colors as general accent colors for decorative purposes
- Never mix signal colors on the same component
- Signal colors only appear when specifically referencing GREEN / RED / YELLOW signal context
- Neutral callout blocks use: ink-10 background + ink left border

---

## 4. TYPOGRAPHY

### Fonts

```typescript
// In layout.tsx
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
/* Display — Playfair Display italic. Major page headings only. */
.display-xl {
  font-family: var(--font-playfair);
  font-style: italic;
  font-weight: 700;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--ink);
}

/* Section headings — Playfair Display, not italic */
.display-lg {
  font-family: var(--font-playfair);
  font-style: normal;
  font-weight: 700;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.2;
  color: var(--ink);
}

/* Subsection headings — Geist bold */
.heading-md {
  font-family: var(--font-geist);
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.4;
  color: var(--ink);
}

/* Body — Geist regular */
.body-lg {
  font-family: var(--font-geist);
  font-weight: 400;
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--ink);
}

.body-md {
  font-family: var(--font-geist);
  font-weight: 400;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--ink);
}

/* Labels — Geist, uppercase, tracked */
.label {
  font-family: var(--font-geist);
  font-weight: 700;
  font-size: 0.6875rem;
  line-height: 1;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-60);
}

/* Mono — Geist for quoted client phrases, code-style content */
.mono {
  font-family: var(--font-geist);
  font-weight: 400;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--ink);
  background: var(--cream-2);
  padding: 0.2em 0.4em;
}
```

### Typography Rules

- Playfair Display italic is reserved for: hero headlines, major page headings (H1), call type names on overview cards, section names on home page cards
- Playfair Display non-italic is reserved for: H2 subsection headings within long-form content
- Everything else is Geist
- Never use Geist Mono — use Geist for all mono-style needs with appropriate styling
- Client phrases in objection cards and call type identification blocks use Geist in a styled mono block (cream-2 background, slight left indent)

---

## 5. SPACING SYSTEM

Based on 8px base unit. IBM Carbon uses the same base.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
--space-9: 96px;
--space-10: 128px;
```

**Page layout:**
- Max content width: 1200px
- Page horizontal padding: 24px mobile / 48px tablet / 80px desktop
- Section vertical spacing: 96px between major sections
- Component internal padding: 24px–32px

---

## 6. COMPONENT SPECIFICATIONS

---

### SignalBadge

```css
/* Base badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-geist);
  font-weight: 700;
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: 2px;
  padding: 4px 8px;
}

/* Size: large */
.badge--lg {
  font-size: 0.8125rem;
  padding: 6px 12px;
}

/* Variant: filled */
.badge--green-filled  { background: var(--sage);        color: var(--dark-text); }
.badge--red-filled    { background: var(--terracotta);   color: var(--dark-text); }
.badge--yellow-filled { background: var(--mustard);      color: var(--ink); }

/* Variant: tinted */
.badge--green-tinted  { background: var(--sage-tint);    color: var(--sage-dark);    border: 1px solid var(--sage-dark); }
.badge--red-tinted    { background: var(--tc-tint);      color: var(--tc-dark);      border: 1px solid var(--tc-dark); }
.badge--yellow-tinted { background: var(--mustard-tint); color: var(--mustard-dark); border: 1px solid var(--mustard-dark); }
```

---

### ExpandCollapse (Objection Card)

```css
.card {
  border: var(--rule-lt);
  background: var(--cream);
  border-radius: 2px;
  overflow: hidden;
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
  gap: 16px;
}

.card__phrase {
  font-family: var(--font-geist);
  font-weight: 600;
  font-size: 1rem;
  color: var(--ink);
  flex: 1;
}

.card__icon {
  color: var(--ink-60);
  transition: transform 200ms ease;
  flex-shrink: 0;
}

.card--open .card__icon {
  transform: rotate(180deg);
}

.card__body {
  border-top: var(--rule-lt);
  padding: 24px;
  display: grid;
  gap: 20px;
}

.card__field-label {
  /* use .label styles */
  margin-bottom: 6px;
}

.card__field-value {
  /* use .body-md styles */
}

.card__do-not {
  background: var(--tc-tint);
  border-left: 3px solid var(--tc-dark);
  padding: 12px 16px;
  border-radius: 0 2px 2px 0;
}

.card__response {
  background: var(--sage-tint);
  border-left: 3px solid var(--sage-dark);
  padding: 12px 16px;
  border-radius: 0 2px 2px 0;
}

.card__footer {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
  border-top: var(--rule-lt);
}
```

---

### QuickRefCard

```css
.qrc {
  background: var(--cream-2);
  border-radius: 2px;
  border-left: 3px solid;  /* color set by signal prop */
  padding: 24px 28px;
  display: grid;
  gap: 0;
  margin-bottom: 48px;
}

.qrc--green  { border-left-color: var(--sage-dark); }
.qrc--red    { border-left-color: var(--tc-dark); }
.qrc--yellow { border-left-color: var(--mustard-dark); }

.qrc__row {
  display: grid;
  grid-template-columns: 160px 1fr;
  padding: 12px 0;
  border-bottom: var(--rule-lt);
  gap: 16px;
  align-items: baseline;
}

.qrc__row:last-child {
  border-bottom: none;
}

.qrc__label {
  /* use .label styles */
}

.qrc__value {
  font-family: var(--font-geist);
  font-weight: 500;
  font-size: 0.9375rem;
  color: var(--ink);
}
```

---

### CalloutBlock

```css
.callout {
  border-radius: 0 2px 2px 0;
  border-left: 3px solid;
  padding: 16px 20px;
  margin: 24px 0;
}

.callout--neutral { background: var(--cream-2);      border-left-color: var(--ink); }
.callout--green   { background: var(--sage-tint);    border-left-color: var(--sage-dark); }
.callout--red     { background: var(--tc-tint);      border-left-color: var(--tc-dark); }
.callout--yellow  { background: var(--mustard-tint); border-left-color: var(--mustard-dark); }

.callout p {
  margin: 0;
  font-family: var(--font-geist);
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--ink);
}

.callout strong {
  font-weight: 700;
}
```

---

### CrossLinks

```css
.crosslinks {
  border-top: var(--rule-lt);
  padding-top: 32px;
  margin-top: 64px;
}

.crosslinks__label {
  /* use .label styles */
  margin-bottom: 16px;
}

.crosslinks__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.crosslinks__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-geist);
  font-weight: 600;
  font-size: 0.8125rem;
  color: var(--ink);
  text-decoration: none;
  border: var(--rule-lt);
  padding: 8px 14px;
  border-radius: 2px;
  background: var(--cream);
  transition: background 150ms ease, border-color 150ms ease;
}

.crosslinks__link:hover {
  background: var(--cream-2);
  border-color: var(--ink-60);
}
```

---

### Nav

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--cream);
  border-bottom: var(--rule-lt);
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 48px;
}

.nav__wordmark {
  font-family: var(--font-playfair);
  font-style: italic;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--ink);
  text-decoration: none;
  white-space: nowrap;
  margin-right: auto;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 0;
}

.nav__link {
  font-family: var(--font-geist);
  font-weight: 600;
  font-size: 0.8125rem;
  color: var(--ink-60);
  text-decoration: none;
  padding: 8px 16px;
  position: relative;
  transition: color 150ms ease;
}

.nav__link:hover,
.nav__link--active {
  color: var(--ink);
}

/* Dropdown panel */
.nav__dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--cream);
  border: var(--rule-lt);
  box-shadow: 0 8px 24px rgba(19, 17, 16, 0.08);
  padding: 8px 0;
  min-width: 200px;
  border-radius: 0 0 2px 2px;
}

.nav__dropdown-link {
  display: block;
  padding: 10px 20px;
  font-family: var(--font-geist);
  font-size: 0.875rem;
  color: var(--ink);
  text-decoration: none;
}

.nav__dropdown-link:hover {
  background: var(--cream-2);
}
```

---

### ObjectionSearch

```css
.search {
  position: relative;
  width: 100%;
  margin-bottom: 32px;
}

.search__input {
  width: 100%;
  height: 56px;
  padding: 0 48px;
  font-family: var(--font-geist);
  font-size: 1rem;
  color: var(--ink);
  background: var(--cream);
  border: var(--rule);
  border-radius: 2px;
  outline: none;
  transition: border-color 150ms ease;
}

.search__input::placeholder {
  color: var(--ink-60);
}

.search__input:focus {
  border-color: var(--ink);
}

.search__icon-left {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--ink-60);
  pointer-events: none;
}

.search__clear {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--ink-60);
  display: flex;
  align-items: center;
}
```

---

## 7. ICONS

Using IBM Carbon Icons (`@carbon/icons-react`).

```bash
npm install @carbon/icons-react
```

Key icons used in this project:

| Usage | Carbon Icon |
|---|---|
| Expand/collapse toggle | `ChevronDown` |
| Cross-link arrows | `ArrowRight` |
| Search bar | `Search` |
| Clear search | `Close` |
| Tooltip trigger | `Information` |
| Nav more dropdown | `ChevronDown` |
| Mobile hamburger | `Menu` |
| Mobile close | `Close` |

Import pattern:
```typescript
import { ChevronDown, ArrowRight, Search } from '@carbon/icons-react'
// Use size prop: <ChevronDown size={16} />
```

---

## 8. MOTION & ANIMATION

Subtle. Functional. No animation libraries.

```css
/* Standard transition */
--transition: 150ms ease;
--transition-med: 250ms ease;

/* Expand/collapse */
.expand-enter { max-height: 0; overflow: hidden; }
.expand-open  { max-height: 2000px; transition: max-height 300ms ease; }

/* Page element reveal (optional) */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal {
  animation: fadeUp 400ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

**Rules:**
- No animation on scroll (no intersection observer for Phase 1)
- Expand/collapse: height transition only, no fade
- Hover states: 150ms ease
- Dropdown panels: 200ms ease-out
- No bounce, no spring, no elastic — everything uses ease or ease-out

---

## 9. LAYOUT GRID

```css
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-7);  /* 48px sides */
}

/* Two-column layout (used on overview pages with sidebar-like aside) */
.layout-2col {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 64px;
  align-items: start;
}

/* Card grid (3-up) */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Card grid (2-up) */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

/* Responsive */
@media (max-width: 1024px) {
  .layout-2col { grid-template-columns: 1fr; }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .page { padding: 0 var(--space-5); }  /* 24px sides */
  .grid-3, .grid-2 { grid-template-columns: 1fr; }
}
```

---

## 10. MOBILE RULES

- Nav collapses to hamburger at 768px
- Objection search bar is full width, min-height 52px (easy to tap)
- ExpandCollapse cards: full width, header padding increases to 20px
- QuickRefCard: grid-template-columns changes to 1fr on mobile (label above value)
- CrossLinks: chips wrap naturally, no scrolling
- Minimum tap target: 44px height

---

## 11. DIAGRAM STYLE GUIDE

For both Nano Banana Pro static images and React SVG components.

**Style anchor (add to every Nano Banana prompt):**
```
Clean editorial diagram style. Background: off-white cream (#FBF8F3). 
All lines and labels: near-black ink (#131110). 
Accent colors restricted to three only: sage green (#8FAF94), terracotta red (#E05C34), 
mustard yellow (#E9B840). 
Typography: modern sans-serif (Geist or similar) for labels, serif italic for display text. 
No gradients. No shadows. No decorative elements. Flat, structured, high-contrast. 
Generous whitespace. IBM Carbon design system aesthetic. Grid-aligned. 
8px spacing unit. Clean node shapes with thin borders.
```

---

## 12. DO NOT

- Do not use Tailwind
- Do not use Geist Mono
- Do not use signal colors for decorative purposes
- Do not add motion libraries (Framer Motion, GSAP, etc.) in Phase 1
- Do not use modals — use expand/collapse and page navigation
- Do not use box shadows heavier than `0 8px 24px rgba(19,17,16,0.08)`
- Do not use border-radius > 4px
- Do not use gradients on backgrounds
- Do not auto-commit — always ask before committing

---

*The Certainty System — Knowledge Hub Design Spec | March 2026*
