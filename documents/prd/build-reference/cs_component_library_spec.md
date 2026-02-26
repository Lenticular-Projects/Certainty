# The Certainty System — Component Library Spec
*Build these before any page. Every component defined: structure, props, states, composition rules.*
*Light mode primary. No color values locked — those come from the design system once finalized.*

---

## HOW TO READ THIS

Each component entry includes:
- **Purpose** — what it does and why it exists
- **Props** — every accepted input with type and default
- **States** — every visual state the component can be in
- **Composition** — what it's made of / what uses it
- **Do not** — what this component is explicitly not responsible for

Components are listed in build order — primitives first, composites after.

---

## PRIMITIVES (build first — everything else depends on these)

---

### `<Badge>`
**Purpose:** Communicates category, status, or tier at a glance. Used in reports, tiles, feed, dashboard, and nav. One of the most-used components in the app.

**Props:**
```ts
type BadgeVariant =
  | 'classification'   // ENROLLED | MISSED OPPORTUNITY | UNCLOSABLE | CORRECT NO-SALE
  | 'signal'           // GREEN | YELLOW | RED
  | 'level'            // level name string
  | 'pattern'          // pattern number + name
  | 'root-cause'       // RC1 | RC2 | RC3
  | 'category-tier'    // Developing | Proficient | Sharp
  | 'feed-type'        // pattern_flagged | level_up | badge_earned | personal_best | surprise_insight

interface BadgeProps {
  variant: BadgeVariant
  label: string
  size?: 'sm' | 'md' | 'lg'   // default: 'md'
  animate?: boolean             // spring scale-in on mount — default: false
}
```

**States:**
- Default — colored background, label text
- `classification: ENROLLED` — success color treatment
- `classification: MISSED OPPORTUNITY` — warning color treatment
- `classification: UNCLOSABLE` — neutral/slate treatment
- `classification: CORRECT NO-SALE` — info color treatment
- `signal: GREEN` — green treatment
- `signal: YELLOW` — amber treatment
- `signal: RED` — red/warning treatment
- `category-tier: Developing` — neutral, no glow
- `category-tier: Proficient` — elevated, distinct border
- `category-tier: Sharp` — premium, glass surface treatment

**Composition:** Used by `<Tile>`, `<FeedEntry>`, `<ReportHeader>`, `<CallRow>`, `<TeamTable>`

**Do not:** Handle click events. Navigate anywhere. Show tooltips internally (use `<Tooltip>` wrapping it).

---

### `<Tooltip>`
**Purpose:** Reveals contextual information on hover. Used for threshold info on badges, benchmark explanations, score definitions.

**Props:**
```ts
interface TooltipProps {
  content: string | ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'  // default: 'top'
  delay?: number   // ms before showing — default: 400
  children: ReactNode
}
```

**States:**
- Hidden (default)
- Visible — spring fade + subtle translate in from position direction
- Pointer-over child triggers visible state

**Do not:** Show on mobile tap (use a different disclosure pattern). Contain interactive elements.

---

### `<Toast>`
**Purpose:** Non-blocking notification for system events. Appears top-right, auto-dismisses.

**Props:**
```ts
type ToastType = 'info' | 'success' | 'warning' | 'error'

interface ToastProps {
  type: ToastType
  message: string
  action?: { label: string; onClick: () => void }  // optional inline action
  duration?: number   // ms — default: 4000. 0 = persist until dismissed.
}
```

**States:**
- Entering — spring slide in from right
- Visible — stable
- Exiting — fade + slide out right
- Multiple toasts stack vertically with stagger

**Do not:** Replace level-up cinematic or personal best moment. Block the UI. Be used for critical errors that require user action (use `<Modal>` for those).

---

### `<EmptyState>`
**Purpose:** Fills screens and sections when no data exists. Never leaves a screen feeling broken.

**Props:**
```ts
interface EmptyStateProps {
  message: string
  subtext?: string
  action?: { label: string; href?: string; onClick?: () => void }
  size?: 'full' | 'inline'  // full = takes full parent height, inline = compact
}
```

**States:**
- Default — message + optional subtext + optional CTA
- No error treatment — empty is expected, not broken

**Do not:** Show spinners. Show error language. Use red or warning colors.

---

### `<LoadingPulse>`
**Purpose:** Loading indicator with liquid quality — not a spinner. Used during data fetches and the call analysis pending state.

**Props:**
```ts
interface LoadingPulseProps {
  size?: 'sm' | 'md' | 'lg' | 'full-page'
  label?: string   // optional text below pulse
}
```

**States:**
- `sm/md/lg` — inline pulse, scales to container
- `full-page` — centered in viewport, used for call analysis pending screen

**Do not:** Use as a page skeleton (build a proper skeleton if needed). Show percentage progress (it's indeterminate by design).

---

### `<Modal>`
**Purpose:** Centered overlay for confirmations, detail views, and focused interactions.

**Props:**
```ts
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg'   // default: 'md'
  children: ReactNode
  closeOnBackdropClick?: boolean  // default: true
}
```

**States:**
- Closed — not in DOM
- Opening — spring scale from 0.95 to 1.0, backdrop fades in
- Open — stable
- Closing — reverse spring, backdrop fades out

**Composition:** Used by Level Detail modal, Invite Agent modal, Deactivate Confirm modal, Password Reset modal, File Preview modal.

**Do not:** Contain navigation. Have more than one primary action. Be used for non-critical toasts.

---

## LAYOUT COMPONENTS

---

### `<PageWrapper>`
**Purpose:** Wraps every authenticated page. Handles page-level enter/exit transitions. Not a default fade — transition is choreographed per route group.

**Props:**
```ts
interface PageWrapperProps {
  children: ReactNode
  variant?: 'default' | 'full-screen'   // full-screen removes sidebar padding (used for /welcome, pending state)
}
```

**Transition behavior:**
- Dashboard ↔ Knowledge Hub: horizontal slide (left/right based on nav direction)
- Dashboard ↔ Calls: vertical slide (calls "under" dashboard)
- Any → Report: report slides up from bottom
- `/welcome` → `/dashboard`: fade + scale (one-time, first login)

**Do not:** Handle auth redirects. Manage scroll position (Next.js handles this).

---

### `<Sidebar>`
**Purpose:** Fixed left navigation. Role-aware — shows different items for agent vs manager.

**Props:**
```ts
interface SidebarProps {
  role: 'agent' | 'manager'
  currentPath: string
}
```

**Nav items by role:**

| Item | Path | Agent | Manager |
|---|---|---|---|
| Dashboard | `/dashboard` | ✅ | ✅ |
| Knowledge Hub | `/knowledge` | ✅ | ✅ |
| My Calls | `/calls/history` | ✅ | ✅ |
| AI Coach | `/coach` | ✅ | ❌ |
| Upload Call | `/calls/upload` | ❌ | ✅ |
| My Profile | `/profile` | ✅ | ✅ |
| Admin | `/admin` | ❌ | ✅ |
| Sign Out | — | ✅ | ✅ |

**States:**
- Default — all items visible, active item highlighted
- Active item — distinct treatment (not just bold — a designed active state)
- Hover — subtle, spring-physics background fill
- Collapsed (mobile) — hamburger trigger, slides in as overlay

**Do not:** Show notification badges on nav items (feed handles notifications). Animate between routes internally.

---

### `<Card>`
**Purpose:** The primary content container. Not a white box with a border — a surface with depth, tonal warmth, appropriate elevation.

**Props:**
```ts
type CardVariant = 'default' | 'accent' | 'warning' | 'glass' | 'flat'

interface CardProps {
  variant?: CardVariant   // default: 'default'
  padding?: 'sm' | 'md' | 'lg'  // default: 'md'
  onClick?: () => void    // makes card interactive — adds hover state
  children: ReactNode
}
```

**Variants:**
- `default` — standard surface, subtle elevation
- `accent` — used for Closer's Edge, personal best, premium moments
- `warning` — used for pattern alerts, failure sections in reports
- `glass` — frosted surface treatment, used for achievement surfaces only
- `flat` — no elevation, flush with background — used inside other cards

**States:**
- Default — stable
- Interactive (when `onClick` provided) — hover lifts, cursor pointer
- Focus (keyboard) — visible focus ring

**Do not:** Handle routing directly (wrap in Next.js `<Link>` if navigable). Nest `glass` inside `glass`.

---

## DATA DISPLAY COMPONENTS

---

### `<ScoreRing>`
**Purpose:** Animated SVG ring showing a score as a percentage fill. The most visually significant component in the app — used on dashboard, profile, and call report.

**Props:**
```ts
interface ScoreRingProps {
  score: number          // 0–100
  maxScore?: number      // default: 100
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animateOnMount?: boolean   // default: true — spring fill from 0 on first render
  colorThreshold?: {
    high: number    // default: 75 — success color above this
    mid: number     // default: 50 — warning color above this, below high
    // below mid = needs-work color
  }
  centerLabel?: ReactNode   // content inside ring — usually the score number
}
```

**States:**
- Mounting — ring fills from 0 to `score` with spring physics (`type: "spring"`, custom stiffness/damping)
- Stable — filled to score
- Updating (score changes) — spring transition from old value to new value

**Sizes:**
- `sm` — used in Recent Calls strip cards
- `md` — used in category score cards on report
- `lg` — used on agent dashboard, profile
- `xl` — primary score display on dashboard Score Block

**Do not:** Show percentage text inside the ring by default (use `centerLabel` prop). Animate on every re-render (only on mount or explicit `score` prop change).

---

### `<CategoryScoreBar>`
**Purpose:** Horizontal progress bar for a single scoring category. Used in call reports and agent profile.

**Props:**
```ts
interface CategoryScoreBarProps {
  category: string
  score: number
  maxScore: number
  verdict?: string        // one-line verdict text below bar
  benchmark?: number      // team average — renders benchmark marker on bar if provided
  isFocused?: boolean     // Focus Mode — slightly elevated treatment
  animateOnMount?: boolean  // default: true
}
```

**States:**
- Default — bar fills to score/maxScore ratio
- With benchmark — team avg marker shown on bar (vertical tick)
- Focused — subtle accent treatment indicating this is a pinned category
- High score (≥ threshold) — success color
- Mid score — warning color
- Low score — needs-work color

**Do not:** Show raw numbers without context (always show `/maxScore`). Be used for non-scoring progress (use a plain progress bar).

---

### `<Tile>`
**Purpose:** Clickable card in 3×3 knowledge grids. Used for call types and objections.

**Props:**
```ts
interface TileProps {
  title: string
  summary: string
  signal?: 'GREEN' | 'YELLOW' | 'RED'
  lastStudied?: string   // ISO date string — renders "Last studied: X days ago"
  href: string           // navigation target
}
```

**States:**
- Default — stable, title + summary + signal pill visible
- Hover — card lifts with spring physics, signal pill brightens, subtle border treatment
- Active (current page) — distinct treatment if used in a nav context
- `lastStudied` null — renders "Not yet studied" in secondary text

**Do not:** Contain interactive sub-elements (the whole tile is the click target). Handle its own navigation (uses Next.js `<Link>`).

---

### `<FeedEntry>`
**Purpose:** Single event in the pattern feed / coaching timeline. Handles all feed types.

**Props:**
```ts
interface FeedEntryProps {
  type: 'pattern_flagged' | 'pattern_cleared' | 'level_up' | 'badge_earned' | 'personal_best' | 'surprise_insight'
  content: string
  timestamp: string       // ISO — rendered as relative ("2 days ago")
  isRead: boolean
  relatedHref?: string    // link to call or knowledge page
  expandable?: boolean    // for surprise_insight — reveals full text on click
  expandedContent?: string
}
```

**States:**
- Unread — subtle left border or dot indicator
- Read — standard treatment
- Hover — light background shift
- `surprise_insight` type — elevated card treatment, distinct icon, expandable
- Expanded (`surprise_insight`) — full content revealed with spring height animation

**Do not:** Render differently based on isRead in a way that causes layout shift. Auto-mark as read on render (mark read on click or after 2s visible in viewport).

---

### `<CallRow>`
**Purpose:** Single row in call history tables and recent-calls strips.

**Props:**
```ts
interface CallRowProps {
  callDate: string
  callType?: string          // may be null if not classified
  classification: 'enrolled' | 'missed_opportunity' | 'unclosable' | 'correct_no_sale'
  score: number
  agentName?: string         // only shown in manager views
  href: string
  compact?: boolean          // default: false — compact removes some fields for strip use
}
```

**States:**
- Default — all fields visible
- Compact — date + classification badge + score only
- Hover — row highlights, cursor pointer

**Do not:** Handle sorting (parent table handles sorting). Show score ring (use `<Badge>` + score number only in row context).

---

### `<TeamTable>`
**Purpose:** Manager-only. Displays all agents with key performance data.

**Props:**
```ts
interface TeamTableProps {
  agents: Array<{
    id: string
    name: string
    levelName: string
    lastAnalyzedDate?: string
    avgScore?: number
    topPattern?: string
  }>
  onRowClick: (agentId: string) => void
}
```

**States:**
- Default — all columns visible
- Empty — `<EmptyState>` rendered inside table bounds
- Loading — skeleton rows (3 placeholder rows with pulse animation)
- Row hover — highlight + cursor pointer

**Do not:** Handle pagination internally (parent handles pagination). Show individual call data.

---

## FEEDBACK & REPORT COMPONENTS

---

### `<FeedbackBlock>`
**Purpose:** Timestamped coaching moment from a call report. Used for failure patterns, strengths, signal reading entries, objection handling entries.

**Props:**
```ts
type FeedbackBlockVariant = 'pattern' | 'strength' | 'signal-correct' | 'signal-incorrect' | 'objection'

interface FeedbackBlockProps {
  variant: FeedbackBlockVariant
  timestamp?: string
  title: string
  whatHappened: string
  whatShouldHappen?: string    // shown for pattern and signal-incorrect
  exactLanguage?: string       // shown in accent-tinted mono block
  badge?: React.ReactNode      // optional badge (signal pill, pattern number)
}
```

**States:**
- Default — all provided fields rendered
- `pattern` — warning-tinted header, exactLanguage in accent block
- `strength` — success-tinted header, no exactLanguage
- `signal-correct` — green ✅ indicator
- `signal-incorrect` — red ❌ indicator + whatShouldHappen + exactLanguage

**Do not:** Handle expand/collapse (all content visible by default). Render markdown in exactLanguage (plain text only, mono font).

---

### `<PatternTag>` / `<ClientGoldTag>`
**Purpose:** Inline chips used in annotated transcripts and audit sections.

**`<PatternTag>` Props:**
```ts
interface PatternTagProps {
  patternNumber: number
  patternName: string
  href?: string   // links to knowledge hub page
}
```

**`<ClientGoldTag>` Props:**
```ts
interface ClientGoldTagProps {
  status: 'weaponized' | 'partially_used' | 'missed'
  timestamp?: string
}
```

**Do not:** Be used outside of report/transcript contexts. Contain body text.

---

### `<TabGroup>`
**Purpose:** Animated tab switcher. Used for call type response options, objection response options, and transcript input (paste vs upload).

**Props:**
```ts
interface TabGroupProps {
  tabs: Array<{ id: string; label: string }>
  activeTab: string
  onChange: (tabId: string) => void
  children: ReactNode   // content per tab managed by parent
}
```

**States:**
- Default — tabs visible, active tab indicated
- Tab switching — Framer Motion `layoutId` shared animation on active indicator — it slides, not jumps

**Do not:** Handle the content panel itself (parent renders correct content based on `activeTab`). Stack tabs vertically.

---

## CHAT COMPONENT

---

### `<AIChat>`
**Purpose:** Full AI Coach chat interface. Left panel (conversation list) + right panel (active chat).

**Props:**
```ts
interface AIChatProps {
  conversations: Array<{ id: string; title: string; startedAt: string }>
  activeConversationId?: string
  messages: Array<{ role: 'user' | 'assistant'; content: string; createdAt: string }>
  onSendMessage: (content: string) => void
  onNewConversation: () => void
  onSelectConversation: (id: string) => void
  isStreaming: boolean   // shows typing indicator when true
}
```

**States:**
- Default — conversation list + active chat
- Empty (no conversations) — right panel shows empty state with example prompt
- Streaming — typing indicator (three pulsing dots) in assistant message position
- New conversation selected — right panel clears, focus moves to input

**Do not:** Manage its own API calls (parent handles fetch/send). Store message history internally (all from props). Auto-scroll unless user is at bottom (don't hijack scroll position if user has scrolled up).

---

## CINEMATIC COMPONENTS
*These are full-screen or viewport-dominant moments. Not modals. Experiences.*

---

### `<LevelUpCinematic>`
**Purpose:** Full-viewport level-up celebration. Triggered once after XP crosses a level threshold.

**Props:**
```ts
interface LevelUpCinematicProps {
  newLevel: number
  newLevelName: string
  onComplete: () => void   // called after auto-dismiss or user interaction
}
```

**Sequence:**
1. Backdrop fades in over dashboard
2. Previous level name fades out (if shown)
3. New level name springs in — large, centered
4. Score ring (lg) pulses 3 times with spring
5. Particle/confetti effect — tasteful, brief (design TBD)
6. Auto-dismisses after 3s or on any user interaction
7. `onComplete` fires → dashboard resumes

**Do not:** Block interaction indefinitely. Show more than one level-up per session (if multiple levels crossed, show the final level only).

---

### `<PersonalBestMoment>`
**Purpose:** Elevated but not full-screen celebration for a new personal best score.

**Props:**
```ts
interface PersonalBestMomentProps {
  category: string | 'overall'
  newBest: number
  maxScore: number
  onComplete: () => void
}
```

**Sequence:**
1. Centered card springs in from scale 0.9 (glass surface treatment)
2. Category name + "Your best [Category] yet."
3. Score displayed large
4. Auto-dismisses after 3s or on tap
5. `onComplete` fires

**Do not:** Use full-screen overlay. Appear simultaneously with `<LevelUpCinematic>` (level-up takes priority).

---

## COMPONENT DEPENDENCY MAP

```
<PageWrapper>
  └── <Sidebar>

<ScoreRing>
  └── (standalone primitive)

<CategoryScoreBar>
  └── (standalone primitive)

<Badge>
  └── (standalone primitive)

<Tile>
  ├── <Badge> (signal pill)
  └── <Tooltip> (last studied)

<FeedEntry>
  └── <Badge> (feed type icon treatment)

<CallRow>
  └── <Badge> (classification)

<TeamTable>
  └── <CallRow> (compact)

<FeedbackBlock>
  └── <Badge> (variant-specific)

<Card>
  └── (wraps most content)

<Modal>
  └── <Card> (flat variant inside)

<AIChat>
  └── (standalone composite)

<LevelUpCinematic>
  └── <ScoreRing> (lg, animated)

<PersonalBestMoment>
  └── <Card> (glass variant)
```

---

*The Certainty System — Component Library Spec v1.0 | February 2026*
*Light mode primary. All color treatments reference design system tokens once finalized.*
*Build in listed order: primitives → layout → data display → feedback/report → chat → cinematics*
