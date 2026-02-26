# The Certainty System — API Contract
*Request and response shapes for every endpoint. The LLM analysis response schema is defined here — the report renderer is built against it.*
*All authenticated routes require a valid Auth.js JWT session. Role enforcement noted per endpoint.*

---

## CONVENTIONS

**Base URL:** `/api`

**Authentication:** All routes except auth endpoints require a valid session. Pass via cookie (Auth.js default — no manual header needed from Next.js client). Direct API access (e.g. Postman) requires `Cookie: next-auth.session-token=...`.

**Role enforcement:** `[agent]` = accessible to agents and managers. `[manager]` = managers only.

**Error response shape (all endpoints):**
```json
{
  "error": "Human-readable message",
  "code": "MACHINE_READABLE_CODE"
}
```

**Common error codes:**
| Code | HTTP | Meaning |
|---|---|---|
| `UNAUTHORIZED` | 401 | No valid session |
| `FORBIDDEN` | 403 | Session valid but wrong role or wrong agent |
| `NOT_FOUND` | 404 | Resource doesn't exist |
| `VALIDATION_ERROR` | 400 | Request shape invalid |
| `ANALYSIS_FAILED` | 500 | LLM analysis failed |
| `INTERNAL_ERROR` | 500 | Unspecified server error |

---

## AUTH ENDPOINTS

---

### `POST /api/auth/[...nextauth]`
Auth.js handler. Handles login, logout, session refresh. Not documented here — see Auth.js v5 docs.

---

### `POST /api/auth/invite`
**Role:** `[manager]`

Create a new user and send invite email.

**Request:**
```json
{
  "full_name": "Jane Smith",
  "email": "jane@example.com",
  "role": "agent"
}
```

**Success `201`:**
```json
{
  "success": true,
  "message": "Invite sent to jane@example.com"
}
```

**Errors:**
- `400 VALIDATION_ERROR` — missing fields or invalid email format
- `409 CONFLICT` — email already exists in system
- `500 EMAIL_FAILED` — email send failed, user NOT created

---

## AGENT ENDPOINTS

---

### `GET /api/agents`
**Role:** `[manager]`

All agents (active + inactive if query param set).

**Query params:**
- `include_inactive=true` — include deactivated accounts (default: false)

**Success `200`:**
```json
[
  {
    "id": "uuid",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "agent",
    "is_active": true,
    "level_name": "The Closer",
    "avg_score": 71,
    "score_trend": "up",
    "last_analyzed_date": "2026-02-20T00:00:00Z",
    "last_call_classification": "enrolled",
    "top_pattern": "Detail Stall",
    "total_calls_analyzed": 24
  }
]
```
Empty array `[]` if no agents.

---

### `GET /api/agents/:id/profile`
**Role:** `[agent]` — own profile only. `[manager]` — any agent.

**Success `200`:**
```json
{
  "id": "uuid",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "agent",
  "is_active": true,
  "joined_date": "2026-01-10T00:00:00Z",
  "has_seen_welcome": true,
  "top_pattern": "Detail Stall",
  "pattern_count_last5": 3,
  "has_pattern_alert": true
}
```

---

### `PATCH /api/agents/:id/profile`
**Role:** `[agent]` — own profile only (limited fields). `[manager]` — any agent (all fields).

**Request (agent — can only update focus and welcome flag):**
```json
{
  "has_seen_welcome": true
}
```

**Request (manager — can update active status):**
```json
{
  "is_active": false
}
```

**Success `200`:**
```json
{ "success": true }
```

**Errors:**
- `403 FORBIDDEN` — agent attempting to modify another agent's profile or manager-only fields
- `400 VALIDATION_ERROR` — invalid field values

---

### `GET /api/agents/:id/progress`
**Role:** `[agent]` — own only. `[manager]` — any agent.

**Success `200`:**
```json
{
  "agent_id": "uuid",
  "total_xp": 1240,
  "current_level": 4,
  "current_level_name": "The Builder",
  "next_level": 5,
  "next_level_name": "The Shifter",
  "xp_to_next_level": 260,
  "avg_score_last5": 68,
  "score_trend": "up",
  "focus_categories": ["Math Breakdown", "Signal Reading"],
  "last_analyzed_call_id": "uuid"
}
```

`focus_categories` is an empty array `[]` if not set.

---

### `GET /api/agents/:id/badges`
**Role:** `[agent]` — own only. `[manager]` — any agent.

**Success `200`:**
```json
[
  {
    "category": "Signal Reading",
    "tier": "Proficient",
    "score": 14,
    "max_score": 20,
    "team_avg": 12,
    "last_updated": "2026-02-20T00:00:00Z"
  },
  {
    "category": "Math Breakdown",
    "tier": "Sharp",
    "score": 18,
    "max_score": 20,
    "team_avg": 13,
    "last_updated": "2026-02-18T00:00:00Z"
  }
]
```

6 items always returned (one per scoring category). `team_avg` is `null` if fewer than 3 agents have data.

---

### `GET /api/agents/:id/feed`
**Role:** `[agent]` — own only. `[manager]` — any agent.

**Query params:**
- `limit` — default 20, max 50
- `offset` — default 0 (pagination)

**Success `200`:**
```json
{
  "feed": [
    {
      "id": "uuid",
      "type": "pattern_flagged",
      "content": "Detail Stall — 3 of your last 5 calls.",
      "related_href": "/knowledge/detail-stall",
      "is_read": false,
      "created_at": "2026-02-22T14:30:00Z",
      "expanded_content": null
    },
    {
      "id": "uuid",
      "type": "surprise_insight",
      "content": "I noticed something about your last 4 calls. →",
      "related_href": "/knowledge/math-breakdown",
      "is_read": false,
      "created_at": "2026-02-21T09:00:00Z",
      "expanded_content": "Your Math Breakdown completion has improved significantly over the last month. One pattern: Step 3 (Annual Net Impact) is still the most common drop-off point. Here's the exact language that closes it."
    }
  ],
  "total": 47,
  "has_more": true
}
```

---

### `PATCH /api/agents/:id/progress`
**Role:** `[agent]` — own focus_categories only.

Update Focus Mode selection.

**Request:**
```json
{
  "focus_categories": ["Math Breakdown", "Pillar 3 — Trust"]
}
```

**Success `200`:**
```json
{ "success": true }
```

**Errors:**
- `400 VALIDATION_ERROR` — more than 2 categories, or invalid category name

---

## CALL ENDPOINTS

---

### `POST /api/calls/upload`
**Role:** `[manager]`

Upload transcript and trigger analysis. Multipart form data.

**Request (multipart/form-data):**
```
agent_id: uuid (required)
call_date: ISO date string (required)
call_type: string (optional — one of 9 call type names)
file: File (required — TXT, PDF, or DOCX, max 10MB)
```

**Success `202` (accepted, analysis is async):**
```json
{
  "call_id": "uuid",
  "status": "pending"
}
```

**Errors:**
- `400 VALIDATION_ERROR` — missing required fields, invalid file type, file too large
- `400 TRANSCRIPT_TOO_SHORT` — extracted text below minimum length
- `400 PARSE_FAILED` — file could not be read

---

### `GET /api/calls/status/:id`
**Role:** `[agent]` — own calls only. `[manager]` — any call.

Lightweight poll endpoint. Does not return full analysis.

**Success `200`:**
```json
{
  "call_id": "uuid",
  "status": "pending | complete | failed",
  "score": 74,
  "classification": "enrolled",
  "failure_reason": null
}
```

`score` and `classification` are `null` while `status === 'pending'`.
`failure_reason` is a string (internal, not user-facing) when `status === 'failed'`.

---

### `GET /api/calls/:id`
**Role:** `[agent]` — own calls only. `[manager]` — any call.

Full call record including complete analysis result.

**Success `200`:**
```json
{
  "id": "uuid",
  "agent_id": "uuid",
  "agent_name": "Jane Smith",
  "call_date": "2026-02-20",
  "call_type": "Scared Switcher",
  "status": "complete",
  "created_at": "2026-02-20T14:00:00Z",
  "analysis_result": { ... }
}
```

**`analysis_result` schema — defined in full below.**

---

### `GET /api/calls/history`
**Role:** `[agent]` — own calls only. `[manager]` — all calls (filterable by agentId).

**Query params:**
- `agent_id` — filter by agent (manager only)
- `limit` — default 20
- `offset` — default 0
- `sort` — `desc` (default) or `asc` by call_date
- `classification` — filter: `enrolled | missed_opportunity | unclosable | correct_no_sale`
- `call_type` — filter by call type name
- `pattern` — filter by pattern name (returns calls where this pattern was flagged)
- `start_date` / `end_date` — ISO date strings

**Success `200`:**
```json
{
  "calls": [
    {
      "id": "uuid",
      "agent_id": "uuid",
      "agent_name": "Jane Smith",
      "call_date": "2026-02-20",
      "call_type": "Scared Switcher",
      "classification": "enrolled",
      "score": 74,
      "status": "complete"
    }
  ],
  "total": 87,
  "has_more": true
}
```

---

## KNOWLEDGE ENDPOINTS

---

### `POST /api/knowledge/search`
**Role:** `[agent]` and `[manager]`

Semantic search against the knowledge base using pgvector.

**Request:**
```json
{
  "query": "what to say when client wants to think about it"
}
```

**Success `200`:**
```json
{
  "results": [
    {
      "slug": "detail-stall",
      "title": "Detail Stall",
      "excerpt": "The client says 'I want to think about it.' This is rarely a request for information...",
      "relevance_score": 0.87,
      "type": "call_type"
    }
  ]
}
```

Empty `results` array if no matches above threshold.

---

### `POST /api/knowledge/last-studied`
**Role:** `[agent]` only.

Fire-and-forget. Records that agent visited a knowledge page.

**Request:**
```json
{
  "slug": "detail-stall"
}
```

**Success `200`:**
```json
{ "success": true }
```

No errors returned — this endpoint always responds 200 (fail silently, don't block UX).

---

## AI COACH ENDPOINTS

---

### `POST /api/coach/message`
**Role:** `[agent]` only.

Send a message and receive a streamed response.

**Request:**
```json
{
  "conversation_id": "uuid (null for new conversation)",
  "content": "Why do I keep losing calls at the Math Breakdown?"
}
```

**Success `200` — streamed (Server-Sent Events):**
```
data: {"delta": "The "}
data: {"delta": "Math "}
data: {"delta": "Breakdown "}
...
data: {"done": true, "conversation_id": "uuid", "message_id": "uuid"}
```

If `conversation_id` is null, a new conversation is created and its ID is returned in the `done` event.

**Errors:**
- `503 SERVICE_UNAVAILABLE` — Claude API unreachable

---

## ANALYTICS ENDPOINTS

---

### `GET /api/analytics/team-summary`
**Role:** `[manager]`

**Success `200`:**
```json
{
  "team_avg_score": 66,
  "team_score_trend": "up",
  "active_agent_count": 12,
  "calls_this_week": 18,
  "agents_without_recent_calls": 2
}
```

---

### `GET /api/analytics/team-patterns`
**Role:** `[manager]`

**Success `200`:**
```json
{
  "top_patterns": [
    { "name": "Detail Stall", "agent_count": 4, "call_count": 9 },
    { "name": "Third Party Block", "agent_count": 2, "call_count": 3 },
    { "name": "Math Drop", "agent_count": 1, "call_count": 2 }
  ]
}
```

Empty array if no patterns in last 7 days.

---

### `GET /api/analytics/team-activity`
**Role:** `[manager]`

**Query params:**
- `limit` — default 5, max 20

**Success `200`:**
```json
{
  "activity": [
    {
      "agent_id": "uuid",
      "agent_name": "Jane Smith",
      "event_type": "level_up",
      "event_content": "Reached The Closer",
      "created_at": "2026-02-22T16:00:00Z",
      "related_href": "/profile/uuid"
    }
  ]
}
```

---

## LLM ANALYSIS RESPONSE SCHEMA

This is the most critical contract in the system. The call report renderer is built entirely against this shape. The LLM prompt (`certainty_system_qa_prompt_v4.md`) instructs Claude to return exactly this JSON. Server-side validation checks every required field before storing.

```json
{
  "classification": "enrolled | missed_opportunity | unclosable | correct_no_sale",

  "root_cause": "RC1 | RC2 | RC3 | null",

  "raw_score": 74,
  "display_score": 74,

  "closers_edge": "String — the single most actionable insight. 1–3 sentences.",

  "recovery_line": "String — shown on Missed Opportunity reports only. 1 sentence. Null for other classifications.",

  "executive_summary": "String — prose paragraph, no bullets, 3–5 sentences.",

  "categories": [
    {
      "name": "Signal Reading",
      "score": 14,
      "max_score": 20,
      "verdict": "String — one sentence",
      "feedback": "String — 2–4 sentences of specific coaching"
    },
    {
      "name": "Math Breakdown",
      "score": 18,
      "max_score": 20,
      "verdict": "String",
      "feedback": "String"
    },
    {
      "name": "Pillar 1 — Acknowledgment",
      "score": 8,
      "max_score": 10,
      "verdict": "String",
      "feedback": "String"
    },
    {
      "name": "Pillar 2 — Breakdown",
      "score": 7,
      "max_score": 10,
      "verdict": "String",
      "feedback": "String"
    },
    {
      "name": "Pillar 3 — Trust",
      "score": 7,
      "max_score": 10,
      "verdict": "String",
      "feedback": "String"
    },
    {
      "name": "Pillar 4 — Close",
      "score": 8,
      "max_score": 10,
      "verdict": "String",
      "feedback": "String"
    }
  ],

  "signal_audit": {
    "signal_detected": "GREEN | YELLOW | RED",
    "signal_correct": true,
    "signal_reading_notes": "String — 2–3 sentences",
    "moments": [
      {
        "timestamp": "00:03:21",
        "type": "signal_correct | signal_incorrect",
        "what_happened": "String",
        "what_should_happen": "String or null"
      }
    ]
  },

  "math_breakdown": {
    "completed": true,
    "steps_completed": [1, 2, 3],
    "steps_missed": [4, 5],
    "notes": "String — 2–3 sentences"
  },

  "objections": [
    {
      "timestamp": "00:07:45",
      "objection_text": "String — what the client said",
      "category": "String — objection category name",
      "handled_correctly": true,
      "response_used": "String — what agent said",
      "recommended_response": "String or null — shown if not handled correctly",
      "verdict": "String — one sentence"
    }
  ],

  "failure_patterns": [
    {
      "pattern_name": "Detail Stall",
      "pattern_number": 3,
      "timestamp": "00:08:12",
      "description": "String — what happened",
      "exact_language": "String — the specific language the agent should have used",
      "knowledge_slug": "detail-stall"
    }
  ],

  "client_gold": [
    {
      "timestamp": "00:04:55",
      "client_statement": "String — what the client said",
      "status": "weaponized | partially_used | missed",
      "how_used": "String or null",
      "how_should_have_used": "String — shown for partially_used and missed"
    }
  ],

  "annotated_transcript": "String — full transcript text with inline markup tags"
}
```

**Scoring rules:**
- Max total score: 100 (4 pillars × 10 = 40, Signal Reading = 20, Math Breakdown = 20, Closer's Edge bonus tracked separately)
- `correct_no_sale` exception: `max_score` for analysis is 90 (Closer's Edge not scored). `raw_score` = points earned on 90-point scale. `display_score` = `Math.round((raw_score / 90) * 100)`. Both stored. Report always shows `display_score`.
- `categories` array always has exactly 6 items in the order listed above.

**Validation (server-side before storing):**
Required fields: `classification`, `raw_score`, `display_score`, `closers_edge`, `executive_summary`, `categories` (exactly 6 items with `name`, `score`, `max_score`).

If any required field missing: mark job `failed`, log full response, do not store partial analysis.

---

*The Certainty System — API Contract v1.0 | February 2026*
*This contract is the source of truth for all request/response shapes. Frontend and backend are built against this — not against each other.*
*The LLM analysis response schema is the most critical section. The report renderer depends on it entirely.*
