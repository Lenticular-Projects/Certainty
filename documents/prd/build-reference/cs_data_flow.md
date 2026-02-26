# The Certainty System — Data Flow Document
*Screen-by-screen: what data each screen needs, where it comes from, when it fetches, what triggers a re-fetch.*
*This is not a list of API routes. This is how data moves through the product.*

---

## HOW TO READ THIS

Each screen entry answers four questions:
1. **What data is needed** to render this screen completely
2. **When it fetches** (on mount, on interaction, on interval)
3. **Fetch strategy** (parallel, sequential, cached, streamed)
4. **Re-fetch triggers** (what user action or system event causes fresh data)

Auth context (session, role, agentId) is available on every authenticated screen via Auth.js session hook. It is not listed as a separate fetch on each screen.

---

## SCREEN: `/welcome` — Origin Story

**Data needed:** `user.has_seen_welcome` (boolean)

**When:** Checked server-side in middleware before rendering. If `true`, redirect to `/dashboard` immediately — this screen never renders.

**On CTA click:**
```
PATCH /api/agents/:id/profile  →  { has_seen_welcome: true }
```
Then redirect to `/dashboard`.

**Re-fetch triggers:** None. One-time write, no re-fetch needed.

---

## SCREEN: `/` — Login

**Data needed:** None (unauthenticated)

**On submit:**
```
POST /api/auth/[...nextauth]  →  session JWT
```
On success: redirect to `/welcome` (if `has_seen_welcome === false`) or `/dashboard`.

**Error states:** Credentials invalid → inline error, no redirect.

---

## SCREEN: `/dashboard` — Agent

**Data needed (5 parallel fetches on mount):**

```
1. GET /api/agents/:id/progress
   Returns: { total_xp, current_level, current_level_name, avg_score_last5,
              score_trend, focus_categories, next_level_xp, next_level_name }

2. GET /api/calls/history?agentId=:id&limit=3&sort=desc
   Returns: [ { id, call_date, call_type, classification, score } × 3 ]

3. GET /api/agents/:id/badges
   Returns: [ { category, tier, score, max_score, team_avg } × 6 ]
   Note: team_avg per category included here for benchmark display

4. GET /api/agents/:id/feed?limit=20
   Returns: [ { id, type, content, timestamp, is_read, related_href,
                expanded_content? } ]

5. GET /api/agents/:id/profile
   Returns: { name, top_pattern, pattern_count_last5, has_pattern_alert }
```

**Fetch strategy:** All 5 fire in parallel on mount. Page renders with skeleton states until each resolves. Sections populate independently as data arrives — not a single loading gate for the whole page.

**Score Block** waits for fetch #1.
**Recent Calls Strip** waits for fetch #2.
**Category Badges + Team Benchmark** wait for fetch #3.
**Pattern Feed** waits for fetch #4.
**Pattern Alert** waits for fetch #5.

**Re-fetch triggers:**
- User returns to tab after >5 minutes: re-fetch #1, #2, #4
- After a call analysis completes (manager uploads a call for this agent): server-sent event or poll triggers full re-fetch
- Focus Mode change (user pins/unpins categories): re-fetch #3 to update highlight state — or update client-side only and persist via PATCH

**Polling:** None on this screen by default. The pending call screen (`/calls/pending/:id`) is the only screen that polls.

**Surprise Insight logic:** Evaluated server-side during fetch #4. Server decides whether to include a `surprise_insight` entry in the feed based on probability + recency cap. No separate fetch.

---

## SCREEN: `/dashboard` — Manager

**Data needed (3 parallel fetches on mount):**

```
1. GET /api/agents
   Returns: [ { id, name, level_name, last_analyzed_date,
                avg_score, top_pattern, is_active } ]
   All active agents.

2. GET /api/calls/history?limit=5&sort=desc
   Returns: 5 most recently analyzed calls across all agents
   (for manager's "Recent Activity" strip)

3. GET /api/analytics/team-patterns
   Returns: { top_patterns: [ { name, agent_count, trend } × 3 ],
              team_avg_score, team_score_trend }
```

**Fetch strategy:** All 3 parallel. Team table (#1) renders first — it's the primary content. Recent activity (#2) and pattern summary (#3) populate below.

**Re-fetch triggers:**
- After upload flow completes: re-fetch #1 (agent's `last_analyzed_date` updates)
- Manager clicks "Refresh" (optional manual trigger)

---

## SCREEN: `/knowledge` — Hub Index

**Data needed:**

```
GET /api/knowledge/last-studied?agentId=:id
Returns: { [slug]: last_studied_date } — map of all content slugs to last studied date
```

**When:** On mount, agent only. Managers see no last-studied data.

**Fetch strategy:** Single fetch. Page renders immediately (static content doesn't wait). Last-studied timestamps populate on tiles after fetch resolves — no skeleton needed, tiles just show "Not yet studied" until data arrives.

**Re-fetch triggers:** None during session. Updates server-side when agent visits a content page.

---

## SCREEN: `/knowledge/[slug]` — Individual Content Page

**Data needed:**

```
GET /api/knowledge/:slug
Returns: { title, type, content_blocks, related_slugs }
```

Content is seeded from source documents at build time. This fetch may be cached at the edge (Vercel Edge Cache) — content does not change unless manually re-seeded.

**On page visit (agent only):**
```
POST /api/knowledge/last-studied
Body: { slug, agentId }
```
Fire-and-forget. Does not block render. Updates the `last_studied` record.

**Re-fetch triggers:** None. Static content.

---

## SCREEN: `/knowledge/search` — Semantic Search

**Data needed:** None on mount (empty state shown).

**On search input (debounced 400ms after last keystroke):**
```
POST /api/knowledge/search
Body: { query: string }
Returns: [ { slug, title, excerpt, relevance_score } × up to 8 ]
```

**Fetch strategy:** Each debounced query fires a new request. Previous request cancelled if new query arrives before response. Results replace previous results on each response.

**Re-fetch triggers:** Every distinct query string after debounce.

---

## SCREEN: `/calls/upload` — Manager Only

**Data needed:**
```
GET /api/agents   →   agent list for the "Select Agent" dropdown
Returns: [ { id, name } ] — active agents only
```

**On form submit:**
```
1. POST /api/calls/upload (multipart form: file + agentId + callDate + callType?)
   Returns: { callId, status: 'pending' }

2. Redirect to /calls/pending/:callId
```

**Re-fetch triggers:** None on this screen. After submit, navigation happens.

---

## SCREEN: `/calls/pending/:id` — Analysis In Progress

**Data needed (polling):**
```
GET /api/calls/status/:id
Returns: { status: 'pending' | 'complete' | 'failed', score? }
```

**Polling strategy:** Every 5 seconds. Starts on mount. Stops when status is `complete` or `failed`.

On `complete`: redirect to `/calls/:id` (full report).
On `failed`: stop polling, show error state with retry option.

**Do not** fetch full call data here — only status. Full data fetched on report screen.

---

## SCREEN: `/calls/:id` — Call Report

**Data needed (2 sequential fetches):**

```
1. GET /api/calls/:id
   Returns: full call record including analysis_result JSON
   (see API Contract for full shape of analysis_result)

2. GET /api/agents/:agentId/progress
   Returns: current level, XP — to detect if this call triggered a level-up
   or personal best (compared to previous known values in session storage)
```

**Fetch strategy:** Sequential — fetch #2 depends on `agentId` from fetch #1's response.

**Cinematic triggers (client-side logic after both fetches):**
- Compare new `total_xp` / `current_level` against value stored in `sessionStorage` before this call was uploaded
- If level changed: trigger `<LevelUpCinematic>`
- If score is a new personal best (stored in `sessionStorage`): trigger `<PersonalBestMoment>`
- Clear `sessionStorage` values after evaluation

**Re-fetch triggers:** None. Report is immutable once generated.

---

## SCREEN: `/calls/history` — Call History

**Data needed:**
```
GET /api/calls/history?agentId=:id&page=1&limit=20&sort=desc
Returns: { calls: [...], total, page, hasMore }
```

Manager sees all agents' calls. Agent sees own calls only (enforced server-side).

**Filters (each change re-fetches):**
- Date range → appends `&startDate=&endDate=`
- Classification → appends `&classification=`
- Call type → appends `&callType=`
- Agent (manager only) → appends `&agentId=`

**Pagination:** "Load more" appends next page to existing list (not replace). Infinite scroll optional.

**Re-fetch triggers:** Any filter change, pagination, or manual refresh.

---

## SCREEN: `/coach` — AI Coach

**Data needed (2 parallel fetches on mount):**
```
1. GET /api/coach/conversations
   Returns: [ { id, title, started_at, last_message_preview } ]

2. GET /api/agents/:id/progress  (for system prompt context injection)
   Returns: { focus_categories, top_pattern, current_level, avg_score }
```

**On conversation select:**
```
GET /api/coach/conversations/:id
Returns: { messages: [ { role, content, created_at } ] }
```

**On send message:**
```
POST /api/coach/message
Body: { conversationId, content }
Returns: streamed response (Server-Sent Events or Response streaming)
```

**Streaming strategy:** Response streams token by token. `isStreaming` prop on `<AIChat>` set to `true` while stream is open. Typing indicator shows. Message builds character by character in the assistant turn.

**System prompt injection (server-side, not client):**
Agent context injected into every API call to Claude: `focus_categories`, `top_pattern`, `current_level`, `avg_score_last5`, and the last 3 call summaries. Agent never sees this. It is assembled server-side before the Claude API call.

**Re-fetch triggers:** New message sent, new conversation started.

---

## SCREEN: `/profile` — Agent Own Profile

**Data needed (3 parallel fetches):**
```
1. GET /api/agents/:id/profile
   Returns: { name, email, joined_date, is_active }

2. GET /api/agents/:id/progress
   Returns: full progress object

3. GET /api/agents/:id/badges
   Returns: all 6 category badges with tier + history
```

**Re-fetch triggers:** None on this screen unless profile is edited (not a feature at launch).

---

## SCREEN: `/profile/:agentId` — Manager Viewing Agent Profile

**Same 3 fetches as agent own profile** but with the target agent's ID.

Additional fetch:
```
4. GET /api/calls/history?agentId=:agentId&limit=5
   Returns: last 5 calls for this agent — shown in profile call strip
```

**Re-fetch triggers:** None unless manager takes an action (deactivate, reset password) — those trigger re-fetch of #1.

---

## SCREEN: `/admin` — Manager Only

**Data needed:**
```
GET /api/agents?include=inactive=true
Returns: all agents including inactive, with { id, name, email, role,
         created_at, is_active, last_login }
```

**On invite submit:**
```
POST /api/auth/invite
Body: { email, full_name, role }
Returns: { success, message }
```
Re-fetches agent list on success.

**On deactivate confirm:**
```
PATCH /api/agents/:id/profile
Body: { is_active: false }
```
Re-fetches agent list on success.

---

## GLOBAL DATA PATTERNS

**Authentication check:** Middleware runs on every request to authenticated routes. Redirects to `/` if no valid session. No API call — handled by Auth.js middleware.

**Error boundary:** Every screen has a top-level error boundary. On unhandled fetch failure, renders a full-page error state with "Refresh" CTA rather than a broken partial screen.

**Optimistic updates:** Used for marking feed entries as read, Focus Mode changes. Write to server in background, update UI immediately. Rollback on server error.

**Cache strategy:**
- Knowledge content: edge-cached (long TTL, invalidated on re-seed)
- Agent progress + badges: no cache (always fresh — score accuracy matters)
- Feed: no cache
- Call report: edge-cached per callId (immutable once generated)

**sessionStorage (client-side only):**
- Pre-call XP and level values: stored before upload, read after report loads to detect level-up / personal best
- Cleared immediately after cinematic triggers

---

*The Certainty System — Data Flow Document v1.0 | February 2026*
*Screen-centric. For endpoint shapes, see API Contract. For component behavior, see Component Library Spec.*
