# Design Research Findings — The Certainty System
*Compiled February 2026*

A web-based sales performance coaching platform. Two sides: Knowledge Hub (educational library) and Performance Engine (call analysis, scoring, AI coaching, XP/levels/badges). Light mode only. Feels like a journey, not a compliance tool.

**Design direction:** Warm cream backgrounds, expressive but premium, Japanese MA (negative space), spring physics, glassmorphism used surgically on achievement moments only, bold typographic hierarchy.

---

## 1. Dashboard Design — Warm, Expressive, Light Mode

### Copilot Money (Apple iOS)
**URL:** https://apps.apple.com/us/app/copilot-track-budget-money/id1447330651
**What to steal:** Apple Design Award Finalist. Uses color functionally — saturated enough to distinguish categories, desaturated enough to not overwhelm — on a light background. They rebuilt a complete component system (30+ components, 50+ icons) before shipping any major feature. That discipline is why everything reads as consistent rather than assembled. Native Swift means transitions feel genuinely physical, not tween-based.
**Caveat:** Finance category. Study the light mode palette specifically.

### Oura Ring App — Score as Narrative
**URL:** https://ouraring.com/blog/new-oura-app-experience/
**What to steal:** Three primary scores shown as small circles at the top of the Today view — number inside a ring, not a bar, not a percentage. Hierarchy formula: number is primary (large, bold), ring is secondary (communicates relative position), label is tertiary (subdued, below ring). The "Today" view surfaces 2–3 insights only — not a grid of every possible metric. Condensed five tabs into three.
**Caveat:** Dark-first on mobile. Data hierarchy principle is color-independent.

### WHOOP — Authoritative Simplicity
**URL:** https://aruliden.com/project/whoop
**What to steal:** "Authoritative simplicity" — a single Readiness score (0–100), backed by a ring, backed by a single description sentence. Not five simultaneous scores, not a radar chart. Clinical systems show all the data. Meaningful systems interpret it. The discipline of the single-number score is what makes it land. Apply to Certainty: a single coaching readiness score per rep. Drill-down shows contributing factors. The score is the destination; the factors are the journey.

**The warm dashboard separation principle:**
Generic warm dashboards use multiple warm tones fighting each other. Best ones: single warm neutral for background (`#FBF8F4` to `#F5F0E8`), near-white for card surfaces (`#FDFCFA`), one accent reserved for a single semantic purpose. Background does the warmth; content stays neutral enough to read.

---

## 2. Gamification Done Tastefully

### Duolingo Streak System
**URL:** https://blog.duolingo.com/achievement-badges/
**What to steal:** The milestone animation was redesigned until it "increased the likelihood a brand new learner was still using Duolingo 7 days later by +1.7%." Principle: **the animation must match the emotional weight of the milestone**. A 7-day streak gets a modest flame; a 365-day streak gets a phoenix transformation. Proportionality is what separates this from a kindergarten reward chart. Same visual language, scaled emotional register. Also: the "Earn Back" mechanic means users can't buy their way into achievements — never let reps buy into coaching badges.
**Caveat:** Palette is bright/playful; the proportionality principle applies, not the execution.

### Apple Activity Rings (iOS)
**URL:** https://developer.apple.com/design/human-interface-guidelines/
**What to steal:** Three rings, each permanently owned by a specific saturated hue. The rings close visually as the goal approaches — most satisfying UI completion gesture in mainstream software. What makes it feel earned rather than corny: (1) colors are consistent and owned by each metric — you always know which ring is which, (2) animation is driven by real behavior, not arbitrary points, (3) completion plays a subtle animation — not a confetti explosion. The celebration is calibrated.

### Linear Triage Intelligence — AI as Earned Trust
**URL:** https://linear.app/now/how-we-built-triage-intelligence
**What to steal:** Built around trust, transparency, and nativeness. When suggestions appear, hovering reveals the exact reasoning in plain language. Visual treatment uses the same design tokens as the rest of Linear — no alien AI overlay. The "thinking state" shows a timer. This is the UI version of "showing your work" — users feel the suggestion was earned by the system, which makes acting on it feel earned by the user.

**The core test:** Does the reward mean anything if there's no behavior behind it? Cheap gamification is easy to game. Earned progression requires something real: closed 5 deals, improved listen ratio by 15%, three consecutive prepared calls.

---

## 3. Japanese-Influenced Product Design

### Pedro Duarte's Portfolio
**URL:** https://ped.ro
**What to steal:** MA in practice — content blocks separated by deliberate voids, nothing filling the screen. Uses a **subtle SVG fractal noise texture** at very low opacity — invisible at a glance but palpable when the screen is flat. Direct digital translation of wabi-sabi: the imperfect surface beneath the clean form.
**Specific technique:** Apply `opacity: 0.03–0.05` noise texture to the cream background. It prevents the background from feeling sterile/digital and gives it the quality of paper.
**Caveat:** Dark mode preferred. Study the layout and spacing philosophy, not the palette.

### MUJI Digital Product Language
**URL:** https://www.muji.com
**What to steal:** Body text at 1.8–2.0 line height. Sections separated by 80–120px of vertical air. Palette is always warm off-white (`#F7F5F0`), never pure white. In Japanese design, **size and space do the work of weight** — dividers are a crutch; space is the answer.

### Wabi-Sabi Applied to Digital UI (principle)
**URL:** https://uxplanet.org/embracing-imperfection-wabi-sabi-in-ux-ui-design-735c1e74cb1c
**What to steal:** Asymmetrical layouts — 60/40 or 70/30 splits rather than 50/50 — create intentional composition rather than template-built grids. **Allow one element to deliberately break the grid** — a score ring that extends slightly beyond its container, a pullquote at 105% width. Signals that a human designed this, not a template.

**MA applied to Certainty specifically:**
Show three things on the main view, not twelve. Let the cream space between score cards be wider than feels comfortable. Let a coaching message sit alone with 64px of padding on all sides. The emptiness communicates "this is important enough to stand alone."

---

## 4. Typography Hierarchies That Feel Confident

### Linear — Inter Display
**URL:** https://linear.app | https://linear.app/now/how-we-redesigned-the-linear-ui
**What to steal:** Linear uses Inter Display for headings — the optical variant designed to look right at large sizes where regular Inter looks cramped. The switch happens at ~24px. Also migrated from HSL to LCH color space — ensures a dark gray and a dark amber appear perceptually equally dark, preventing hierarchy from getting muddy when mixing warm and neutral tones.
**Technique:** Use Inter Display at 24px and above. Set heading weights to 600 for H2/H3, 700–800 for H1.
**Caveat:** Dark mode. Study the type scale and weight system, not the palette.

### Vercel — Geist Font System
**URL:** https://vercel.com/geist/typography | https://github.com/vercel/geist-font *(free, open source)*
**What to steal:** Wide letter spacing at small sizes, tighter tracking at display sizes — the opposite of naive CSS. This mimics how professional typesetters tracked metal type. Result: the type scale feels intentional at every size.
**Specific technique:** `-0.02em` tracking at 32px+, `-0.01em` at 20–28px, `0` for body, `+0.02–0.04em` for labels and captions. This alone makes a type scale feel like it was set by a typographer.

### Superhuman — The Five-Gray System
**URL:** https://blog.superhuman.com/how-to-design-delightful-dark-themes/
**What to steal:** Adjusts contrast by considering text size, font weight, and line width — not a single gray for all secondary text. A 16px regular weight label needs more contrast than an 11px semibold label to read at the same perceived weight.
**Warm equivalent for Certainty:**
- `text-primary`: `#1A1714` (warm-black)
- `text-secondary`: `#4A4540`
- `text-tertiary`: `#8A837C`
- `text-placeholder`: `#B8B0A8`
- `text-disabled`: `#D4CEC8`

Each carries a slight amber/brown undertone — prevents the cold/blue tint that pure grays create on warm backgrounds.

---

## 5. Score / Progress Visualization

### Apple Activity Rings
**URL:** https://developer.apple.com/design/human-interface-guidelines/
**What to steal:** `stroke-linecap: round` on all progress rings. This single SVG/CSS property is what separates a premium ring from a clinical one. Square caps look like a loading bar wrapped in a circle. Round caps suggest completion, motion, organic progress. Fill direction starts from 12 o'clock (top).
**For warm light mode:** Muted warm ring track (`#EDE8E0`), filled portion in brand accent. Contrast between track and fill: approximately 3:1.

### Oura Ring App — Score Display Formula
*(See Category 1)*
Score display formula: number primary (large, bold, warm-black), ring secondary (relative position), label tertiary (small, subdued, below). Resist adding a fourth ring.

### WHOOP — The Readiness Score
**URL:** https://aruliden.com/project/whoop
**The principle:** Never show contributing factors first. The score is the destination; the factors are the journey. Clinical = all data shown simultaneously. Meaningful = interpret first, detail on drill-down.

---

## 6. AI Coaching / Feedback Interfaces

### Linear Triage Intelligence — Inline AI Done Right
**URL:** https://linear.app/docs/triage-intelligence
**What to steal:** AI suggestions use the **same visual design tokens** as human-created metadata — same font size, same pill/tag design, same padding. Only distinction: a small AI indicator icon and a slightly different background tint. Hovering shows reasoning in plain English.
**Technique for Certainty:** Use the same card style as other content but add a thin 3px left border in warm amber. Never use a robot icon, chat bubble, or colored "AI" chip. Those patterns signal "bolted on." A quiet border says "native."
**Principle:** AI should be invisible until it's essential. The interface doesn't announce "AI is here" — it just surfaces useful things at the right moment.

### Notion AI — Contextual Anchor Pattern
**URL:** https://www.notion.com/help/notion-ai-faqs
**What to steal:** The **contextual anchor principle** — AI assistance appears where attention already is. Not in a sidebar, not at the bottom of the screen, but at the point of work. For Certainty: AI feedback should surface inline with the content it's annotating. A note about a call transcript appears as an inline annotation on the transcript itself, not in a separate panel.

### Superhuman — AI as Native Content
**URL:** https://openai.com/index/superhuman/
**What to steal:** Auto Summarize places a one-line summary above every email thread — same typography as the subject line, same font weight, slightly desaturated. Visually part of the list, not a callout box. 85%+ of users opted in. **AI-generated content should look like high-quality editorial content, not a generated widget.** No speech bubbles, no "AI says:" label. Just a well-formatted sentence in the same typeface.

---

## 7. Glassmorphism Done Right

### Apple iOS Materials — The Canonical Reference
**URL:** https://developer.apple.com/design/human-interface-guidelines/materials
**What to steal:** **Material thickness is a function of how long the user needs to focus on that layer.** Navigation bars are persistent — thick material. Context menus are transient — thin material. For Certainty: use glass only on achievement moments that are meant to be noticed and then dismissed. The warm background glows through the frosted surface; the user feels the depth of the moment, then closes it.
**Technical parameters (warm glass on light background):**
```
backdrop-filter: blur(20px)
background: rgba(255,252,248, 0.72)
border: 1px solid rgba(255,255,255, 0.5)
```

### AnyDistance Running App — Glass as Milestone Marker
**URL:** https://apps.apple.com/us/app/any-distance-running-tracker/id1545233932
**What to steal:** Glass used exclusively in the Collectibles area — achievement medals and milestone cards. Not on navigation, not on inputs, not on standard cards. **Glass signals "this is a moment," not "this is our design style."** Reserve glass for exactly three cases in Certainty: (1) rep unlocking a new level/achievement, (2) a coaching insight surfacing as a "featured moment," (3) the session summary screen at end of a coaching review. Everything else: solid warm-white cards.

### NN/G Glassmorphism Anti-Pattern Guide
**URL:** https://www.nngroup.com/articles/glassmorphism/
**What to steal (negative reference):** Most common failure: too much background visibility. Minimum blur radius for a complex background is 20px. If everything is glass, nothing is elevated. **Contrast check:** Text on glass must achieve 4.5:1 WCAG AA. Use `rgba(30,25,20,0.9)` for text over glass on warm backgrounds.

---

## Three Concrete Direction Recommendations

### Direction 1: "The Warm Studio" — Editorial, Journaled, Confident

**Color family:**
- Background: `#F7F4EF` (warm white, slight parchment)
- Card surface: `#FDFCFA`
- Text primary: `#1C1814` (warm-black)
- Accent: `#C4632A` (deep terracotta)
- Ring track: `#EDE8E0` / Ring fill: `#C4632A`

**Type choices:**
- Display/H1: Canela Text or Fraunces (free) — 400 weight, 48–72px
- H2/H3: Inter Display, 600 weight, -0.02em tracking
- Body: Inter, 400 weight, 1.75 line height
- Score number: Inter Display, 700 weight, 40px

**Design moves:**
1. `0.025` opacity SVG noise texture on background — paper quality, invisible at a glance
2. Score rings with round caps, 12 o'clock start, terracotta fill against `#EDE8E0` track
3. AI insight cards: 3px left border in terracotta, small italic `text-tertiary` label "Coaching note." Same card style otherwise.
4. Spring animation on ring fill: stiffness 80, damping 12
5. Achievement overlay: `backdrop-filter: blur(24px)`, `background: rgba(247,244,239,0.85)` — parchment glows through

---

### Direction 2: "Minimal Craft" — Japanese MA, Typographic Authority

**Color family:**
- Background: `#F4F1EC` (warmer, closer to cream)
- Text primary: `#18150F`
- Accent: `#8B6914` (warm amber-gold — earned feeling, not startup orange)
- Growth indicator: `#3D6B59` (deep sage — only on positive trends)

**Type choices:**
- Display/H1: DM Serif Display, 400 weight, 60–80px — editorial serif makes the score feel like a headline
- H2–H4: DM Sans, 600 weight
- Body: DM Sans, 400 weight, 1.8 line height
- Tracking: `-0.03em` on DM Serif headings, `-0.015em` on DM Sans subheadings

**Layout approach:** Asymmetric 60/40. Score ring at 60% viewport width, left-aligned. Right 40%: quiet annotation panel. Wabi-sabi layout — not centered, not symmetric, but composed.

**Design moves:**
1. 96–120px between major dashboard sections — let the cream breathe
2. No card borders — `box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)` only
3. Ring fill animation: stiffness 60, damping 10 — slower, more deliberate. Feels like completing a journey.
4. AI insights as inline italic text annotations — not cards. DM Serif italic, 16px, amber color. Looks like handwritten margin notes.
5. Achievement moment: radial gradient pulse on ring + number scales to 105% on spring (stiffness 200, damping 8).

---

### Direction 3: "Warm System" — SaaS-Grade, Premium

**Color family:**
- Background: `#FAF8F5`
- Card: `#FFFFFF` with `1px solid #EDE8E0` border
- Text primary: `#1A1714`
- Primary accent: `#D97243` (warm terracotta-orange)
- Growth indicator: `#6B8F71` (muted sage green — positive trends only)
- Regression: `#C45B5B` (warm red)

**Type choices:** Geist Sans throughout (free, open source from Vercel — variable font)
- H1: 36–48px, weight 700, tracking `-0.025em`
- Score number: 52px, weight 800, tracking `-0.04em` — treated as a headline
- Labels: 11–12px, weight 500, tracking `+0.06em`, uppercase

**Design moves:**
1. LCH color space for grays — add warm hue: `hsl(30, 6%, 20%)` not `hsl(0, 0%, 20%)`
2. Score cards: no glassmorphism, no shadows — `1px solid #EDE8E0` border only. Confident; doesn't need a shadow to feel present.
3. Spring physics: ring fill (stiffness 80, damping 15), card hover `scale(1.01)`, modal entrance (stiffness 300, damping 28 — fast, snappy)
4. Glassmorphism once: achievement unlock overlay only — `background: rgba(250,248,245,0.88)`, `backdrop-filter: blur(32px)`, `border: 1px solid rgba(255,255,255,0.7)`, `border-radius: 20px`
5. AI feedback: warm amber 4px left border, `#FFF8F2` card background, normal weight body text. No AI icon, no badge.

---

## Cross-Cutting Principles

**On MA and dashboard restraint:** Choose the three metrics that drive behavior change and give each room. Three scores with 120px between them and nothing else will feel more premium than twelve scores in a grid — even if the competitor has more data.

**On spring physics tiers:**
- Bouncy (high stiffness, low damping): achievement moments only
- Gentle: data transitions
- Quick: UI feedback (button press, panel open)
The emotional register of each preset maps to whether something should feel like a *moment* versus a *response*.

**On glass as a Pavlovian signal:** Because glass is used only at achievement moments, it becomes a learned signal. After a few uses, the frosted surface subconsciously means "I accomplished something real." Glass appears when the user has earned it.

**On AI that feels like coaching, not chatbot:** Inline, anchored to content, using the product's own visual language, with reasoning visible but not prominent. The chatbot metaphor is wrong for coaching because coaching is about the rep's real work. AI feedback should annotate that work — not exist in its own interface layer.

---

## Image Inspiration Analysis

*(See `/documents/prd/design-research/images/` for reference images)*

### Fukuban Japanese Furniture E-Commerce
**Key observations:**
- Palette: Warm parchment `~#F5EEE4` background, dark warm brown text `~#2A1E14`, natural wood tones in photography
- The hero image uses a warm gradient **fade from background into product photo** — seamless integration, no hard edge between UI and content
- Vertical kanji used as a structural graphic element in the right column — not decorative wallpaper, but a compositional anchor
- Category list uses numbered items (`01 / 02 / 03`) with arrow CTAs — the numbering is the hierarchy, not size
- CTA button is a dark warm brown pill — **not black, not a brand color** — same value as the text but in pill form
**What to steal for Certainty:** The gradient-fade technique for call recordings or score cards (the card fades into the background rather than having a hard border). Numbered section labels instead of headers. The "pill button in warm dark brown" approach for primary actions.

### Honda S2000 Concept — Editorial Performance
**Key observations:**
- Layout: **Overlapping containers** — the car photograph breaks out of its bounding box, overlapping with white panels behind it and in front of it. Layered depth without glassmorphism.
- Typography: Massive condensed rounded display numerals ("S2000") at the bottom — the model number is treated as a logotype, not a label
- Japanese text used two ways: (1) large outlined/stroke-only vertical kanji as texture on the right, (2) small body copy at bottom. The outlined kanji are not filled — they are ghost text.
- Color discipline: Pure white/light gray background, dark charcoal, **one** crimson accent used in three places only — the brand badge, a small square block, and a larger block. Never bleeds into the typography.
- Thin structural rules (`1px` lines) used to demarcate sections
**What to steal for Certainty:** The **overlapping container technique** for the score ring on the dashboard — ring extends slightly above its card container, appearing to float. The ghost/outlined text approach for secondary information or watermark labels. The "one accent color, maximum three uses" discipline.

### Pantechnicon Nordic-Japanese
**Key observations:**
- Palette: Off-white/cream, near-black text, warm rust/terracotta only from photography (not applied to UI chrome)
- Layout: **Editorial newspaper grid** — mixed column widths, thin horizontal rules as section dividers. No card containers for most content — content sits directly on the background.
- Geometric shapes as content containers: An oval/circle contains the "Japan / Nordic" label — pure line weight, not filled. Also the Venn diagram circles are drawn as content graphics, not decorative flourishes.
- The "marquee" text band — a horizontally scrolling text strip — used as a section divider instead of a rule or gap
- Photography is content, not chrome — images sit within the grid as equal-weight cells alongside text
**What to steal for Certainty:** No-card layout for the knowledge hub — articles/modules sit directly on the background in a newspaper grid, not in white cards. The **thin rule dividers** instead of section gaps. Circle/oval geometric shapes for empty state illustrations or onboarding.

### Artworld — Extreme Typographic Scale
**Key observations:**
- **The entire design is one typographic contrast:** delicate light/italic serif names at ~18–22px (mixed roman and italic, same setting) vs a massive compressed black slab "ARTWORLD" at ~120px+. Nothing else exists in the design.
- Names use superscript role labels `(P,D)` — a convention borrowed from editorial publishing, not app design. The metadata is there but invisible until you look for it.
- The roman/italic mixing within the same text block (not styled for emphasis, just for variety) — this is an editorial serif technique, not a UI one
- The ratio of small-to-large is approximately 1:6 or 1:8. That is an extreme jump — not a 16px / 32px scale, but 18px / 120px+.
**What to steal for Certainty:** Apply the extreme scale contrast to score numbers — the "79" inside a ring should be treated at the same authority level as "ARTWORLD." The surrounding labels and metadata should drop to near-caption size to amplify the number's weight. Also: the roman/italic mixing for AI coaching notes — italic for the insight, roman for the label — within the same typographic setting.

### Synthesis Across All Four Images
These four references together point to a specific design personality that's distinct from any single direction in the research brief:

1. **Typography does the structural work** — not card containers, not shadows, not color blocks. Type size, weight, and spacing are the architecture.
2. **Warmth is in the background; structure is in the rules** — Fukuban and Pantechnicon share cream backgrounds but use thin rules and tight grids to organize information without needing card chrome.
3. **Japanese elements as compositional tools** — kanji as vertical anchors, numbered lists as hierarchy, asymmetric layouts as composition. Not cultural pastiche.
4. **One accent color, used three times maximum** — Honda's red discipline is a principle, not a Honda thing. Whatever Certainty's accent is (terracotta, amber), it should appear no more than three places in any single view.
5. **Scale is authority** — Artworld's lesson: the score number should be the "ARTWORLD" of the Certainty dashboard. Everything else should get quieter to let it breathe.

**Revised primary direction based on these images:** Direction 1 ("Warm Studio") with the typographic spine of Artworld, the layout grammar of Pantechnicon, and the accent discipline of the S2000. Warm parchment background. No card borders on the knowledge hub. Editorial grid. Score number treated as a display headline at extreme scale. One accent color (terracotta or amber) used exactly three times per view.
