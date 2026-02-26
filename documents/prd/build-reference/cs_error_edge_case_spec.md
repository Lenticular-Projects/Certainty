# The Certainty System — Error & Edge Case Spec
*Every failure scenario: what the user sees, what the system does, how they recover.*
*Written for builders. Every entry is a build requirement, not a QA checklist.*

---

## HOW TO READ THIS

Each entry follows this format:
- **Scenario** — what went wrong or what unusual state was reached
- **User sees** — exact screen behavior and message (use Copy & Tone Guide for exact strings)
- **System behavior** — what happens technically
- **Recovery path** — how the user gets back to a functional state

Entries are grouped by feature area.

---

## AUTHENTICATION

---

**AUTH-01 — Invalid credentials on login**
- User sees: Inline error below the form fields. "Incorrect email or password." Submit button re-enables.
- System: No redirect. Session not created. Do not specify which field failed (security).
- Recovery: User corrects credentials and resubmits.

---

**AUTH-02 — Session expired mid-session**
- User sees: Next API call returns 401. Page redirects to `/` login screen. Toast (if possible before redirect): "Your session expired. Sign in again."
- System: Auth.js middleware detects expired JWT. Clears session. Redirects.
- Recovery: User signs in. Redirected to the page they were on (store intended path in query param before redirect if feasible, otherwise redirect to `/dashboard`).

---

**AUTH-03 — Agent tries to access manager-only route**
- User sees: Immediate redirect to `/dashboard`. Toast: "That page is manager-only."
- System: Middleware checks role. Redirects before page renders.
- Recovery: Automatic.

---

**AUTH-04 — Invite link already used**
- User sees: Full-page message. "This invite link has already been used. Contact your manager if you need access."
- System: Invite token marked `used = true` after first activation. Second visit detects this.
- Recovery: Manager creates a new invite.

---

**AUTH-05 — Invite link expired (>72 hours)**
- User sees: Full-page message. "This invite link has expired. Ask your manager to send a new one."
- System: Token has `expires_at` — checked on visit.
- Recovery: Manager re-invites.

---

**AUTH-06 — Password reset link expired**
- User sees: Full-page message. "This reset link has expired. Request a new one." Link to `/forgot-password`.
- System: Reset token TTL exceeded.
- Recovery: User requests new reset.

---

**AUTH-07 — Account deactivated**
- User sees: Login attempt returns specific state. Message: "This account has been deactivated. Contact your manager."
- System: `is_active = false` check on login — return specific error (not generic "invalid credentials").
- Recovery: Manager reactivates account in admin panel.

---

## CALL UPLOAD

---

**UPLOAD-01 — Wrong file type**
- User sees: Inline error below file input. "That file type isn't supported. Upload a TXT, PDF, or DOCX file." Upload button stays disabled.
- System: Client-side validation before any network request. Check file extension and MIME type.
- Recovery: User selects a different file.

---

**UPLOAD-02 — File too large (>10MB)**
- User sees: Inline error. "File too large. Maximum size is 10MB."
- System: Client-side check before upload begins.
- Recovery: User compresses or uses a shorter transcript.

---

**UPLOAD-03 — No agent selected**
- User sees: Submit button disabled until agent is selected. If somehow submitted without agent: inline field validation. "Select an agent."
- System: Client validation. Server also validates `agentId` presence and returns 400 if missing.
- Recovery: User selects agent.

---

**UPLOAD-04 — File upload network failure (during transfer)**
- User sees: Error below upload button. "Upload failed. Check your connection and try again." Retry button.
- System: POST to `/api/calls/upload` fails before server receives file. No `calls` record created.
- Recovery: User retries upload.

---

**UPLOAD-05 — File upload succeeds but analysis job fails to queue**
- User sees: Redirect to pending screen. After first poll returns `status: 'failed'`: "Analysis failed. Try uploading again, or contact your manager if this continues." Retry button returns to `/calls/upload`.
- System: Call record created with `status: 'failed'`. Polling detects this on first or subsequent poll.
- Recovery: Manager re-uploads the same transcript.

---

**UPLOAD-06 — PDF/DOCX cannot be parsed (corrupted or scanned image PDF)**
- User sees: Pending screen → after poll detects failure: "The transcript couldn't be read. Try a TXT file or a text-based PDF."
- System: `pdf-parse` or `mammoth` throws during extraction. Job marked `failed` with reason stored. Polling returns `status: 'failed'`.
- Recovery: Manager exports transcript as plain TXT and re-uploads.

---

**UPLOAD-07 — Transcript too short to analyze (<500 words / <3 minutes estimated)**
- User sees: Pending screen → failure state: "Transcript too short to analyze. Upload a full call — at least 3 minutes of conversation."
- System: Word count checked after extraction, before LLM submission. If below threshold, mark `failed` with reason.
- Recovery: Manager uploads correct transcript.

---

## CALL ANALYSIS (LLM)

---

**ANALYSIS-01 — Claude API timeout (>120 seconds)**
- User sees: Pending screen continues showing for up to 120s of polling, then: "Analysis is taking longer than expected. Try again, or check back in a few minutes." Retry button.
- System: LLM request times out. Job marked `failed`. Polling detects.
- Recovery: Manager retries. If persistent, check API status.

---

**ANALYSIS-02 — Claude API returns malformed JSON**
- User sees: Same as ANALYSIS-01 from user perspective.
- System: JSON parse of LLM response fails. Retry once automatically with same prompt. If second attempt also fails, mark job `failed`. Log full LLM response for debugging.
- Recovery: Manager retries. Developer investigates logs.

---

**ANALYSIS-03 — Claude API returns valid JSON but missing required fields**
- User sees: Same as ANALYSIS-01 — "Analysis failed."
- System: Validate response schema after parse. Required fields: `classification`, `total_score`, `root_cause`, `closers_edge`, `categories` (all 6), `executive_summary`. If any missing, mark `failed`. Log response.
- Recovery: Same as above.

---

**ANALYSIS-04 — Claude API rate limit hit**
- User sees: Pending screen — analysis appears to still be running (no immediate failure shown to user while rate limit is being resolved).
- System: Implement exponential backoff: wait 5s, retry. Wait 15s, retry. Wait 60s, retry. After 3 retries, mark `failed`.
- Recovery: Automatic in most cases. If persistent, developer adjusts request frequency.

---

**ANALYSIS-05 — Correct No-Sale not rescaled properly**
- This is not an error — it's a critical correctness requirement: when `classification === 'correct_no_sale'`, `total_score` must be rescaled from 90-point max to 100. Formula: `(raw_score / 90) * 100`, rounded to integer. Store both `raw_score` and `display_score` in the database. The report always shows `display_score`.
- If this rescaling is not applied: the agent sees a misleadingly low score, which undermines the system's integrity.

---

## CALL REPORT

---

**REPORT-01 — Call report accessed by wrong agent**
- User sees: Redirect to `/dashboard`. Toast: "That call isn't in your history."
- System: Server-side check: `call.agent_id === session.user.id` OR `session.user.role === 'manager'`. Otherwise 403.
- Recovery: Automatic.

---

**REPORT-02 — Call report for a deleted/deactivated agent (manager view)**
- User sees: Report renders normally. Agent name shown with "(Inactive)" indicator.
- System: Report is immutable — it always exists regardless of agent status.
- Recovery: N/A — not an error, just a state.

---

**REPORT-03 — Annotated transcript section is empty**
- User sees: Annotated transcript section shows "Transcript not available for this call." Section still renders (not hidden).
- System: `analysis_result.transcript` is null or empty string.
- Recovery: N/A — edge case for very old or manually-entered calls.

---

## KNOWLEDGE HUB

---

**KNOWLEDGE-01 — Semantic search returns no results**
- User sees: "No results for '[query].' Try different keywords, or browse by topic." Browse link shown below.
- System: pgvector similarity search returns 0 results above threshold. Normal — not an error.
- Recovery: User tries different query or browses manually.

---

**KNOWLEDGE-02 — Semantic search API fails**
- User sees: "Search unavailable right now. Browse by topic instead." Browse link.
- System: `/api/knowledge/search` returns 500. Catch error, show message.
- Recovery: User browses manually.

---

**KNOWLEDGE-03 — Knowledge page slug not found**
- User sees: Full-page "Page not found" with link back to Knowledge Hub index.
- System: Next.js 404 — slug doesn't exist in database. Custom 404 page for `/knowledge/*` routes.
- Recovery: User returns to hub.

---

## DASHBOARD

---

**DASHBOARD-01 — One or more dashboard fetches fail**
- User sees: The section that failed shows an inline error state with a "Retry" button — not a full-page error. Other sections load normally. Example: Pattern Feed fails → feed section shows "Couldn't load coaching feed. Retry."
- System: Each fetch is independent. Failure in one does not block others. Each section has its own error boundary.
- Recovery: User clicks Retry on the failed section.

---

**DASHBOARD-02 — Agent has zero analyzed calls**
- User sees: Fully functioning dashboard — Score Block shows "—" with empty state message, Recent Calls shows empty state, Pattern Alert hidden, Badges all show Developing, Feed shows empty state. Nothing is broken.
- System: API calls return empty arrays / null values. All components handle empty state gracefully.
- Recovery: N/A — this is the expected state for a new agent.

---

**DASHBOARD-03 — Team benchmark not enough data (fewer than 3 agents with calls)**
- User sees: Team benchmark lines on category scores are hidden entirely. No empty state needed — just absent.
- System: `/api/agents/:id/badges` response includes `team_avg: null` when insufficient data. Components check for null before rendering benchmark line.
- Recovery: N/A — resolves automatically as more agents get analyzed calls.

---

**DASHBOARD-04 — Focus Mode — no categories in database yet**
- User sees: Focus Mode section shows prompt: "Pin a category to focus your coaching."
- System: `agent_progress.focus_categories` is null or empty array. Expected state.
- Recovery: Agent pins categories.

---

## AI COACH

---

**COACH-01 — Coach message fails to send**
- User sees: Message appears in chat with an error indicator. "Message failed to send. Try again." Retry button inline.
- System: POST to `/api/coach/message` fails. Message not persisted. UI shows optimistic message with error state.
- Recovery: User clicks Retry.

---

**COACH-02 — Stream disconnects mid-response**
- User sees: Partially streamed response appears with error indicator below it. "Response interrupted. Try sending again."
- System: SSE or stream connection drops. Partial response is not persisted. Error state shown.
- Recovery: User resends the message.

---

**COACH-03 — Claude API unavailable**
- User sees: After send attempt, within 5s: "AI Coach is temporarily unavailable. Try again in a moment."
- System: API call fails with 5xx or network error.
- Recovery: User waits and retries.

---

## ADMIN PANEL

---

**ADMIN-01 — Invite email fails to send**
- User sees: Modal stays open. Error message inside modal: "Invite email couldn't be sent. Check the email address and try again."
- System: Email send fails. Agent record NOT created — do not create users without a successful invite.
- Recovery: Manager corrects email and retries.

---

**ADMIN-02 — Deactivating an agent with in-progress call analysis**
- User sees: Deactivation completes normally. No warning needed for in-progress analysis.
- System: Deactivation sets `is_active = false`. In-progress analysis job completes regardless — the call record is saved under the agent's ID. History is preserved.
- Recovery: N/A.

---

**ADMIN-03 — Manager tries to deactivate themselves**
- User sees: Deactivate button is disabled on the manager's own row. No tooltip needed — just disabled.
- System: Client-side check: if `agent.id === session.user.id`, disable deactivate button. Server also rejects this with 403 as a safety net.
- Recovery: N/A.

---

## GLOBAL / NETWORK

---

**GLOBAL-01 — Complete network loss**
- User sees: Their current screen remains visible. On next interaction that requires data: inline error on the relevant section. Toast: "No connection. Check your internet."
- System: Fetch failures are caught by individual error boundaries. No full-page crash.
- Recovery: Connection restored → sections re-fetch automatically on next user interaction or page focus.

---

**GLOBAL-02 — Server maintenance / all API routes down**
- User sees: A full-page maintenance state. "The Certainty System is undergoing maintenance. Check back shortly."
- System: Deploy a static maintenance page or use Vercel's maintenance mode. Middleware redirects all authenticated routes to this page.
- Recovery: Maintenance ends, middleware restored.

---

**GLOBAL-03 — JavaScript error / unhandled exception**
- User sees: Error boundary catches. Page-level error boundary shows: "Something went wrong. Refresh the page." Refresh button.
- System: Next.js top-level error boundary. Error logged. User data not at risk.
- Recovery: User refreshes.

---

## EDGE CASES — SCORING AND DATA INTEGRITY

---

**DATA-01 — Agent has exactly 1 analyzed call (score ring shows single-call avg)**
- User sees: Score ring shows that single call's score. No trend indicator (needs 2+ calls for trend).
- System: `score_trend` returns null. Dashboard hides trend indicator. No error.

---

**DATA-02 — All 5 recent calls are Correct No-Sale**
- User sees: Average score shown reflects rescaled scores. All 5 recent calls correctly display classification badges.
- System: Scoring pipeline always uses `display_score` (rescaled) for averages, never `raw_score`.

---

**DATA-03 — Pattern appears in exactly 3 calls simultaneously at first detection**
- User sees: Pattern Alert appears on dashboard.
- System: Alert threshold is 3+ appearances in last 5 calls. First time threshold is crossed triggers feed entry `pattern_flagged`. Works correctly.

---

**DATA-04 — Agent's level XP is manually adjusted by developer (edge case)**
- User sees: Dashboard reflects corrected level and XP normally.
- System: Level and level name are derived from `total_xp` at read time, not stored separately as authoritative. Recalculate on every progress fetch.
- Note: Level thresholds are defined in a constants file — single source of truth.

---

*The Certainty System — Error & Edge Case Spec v1.0 | February 2026*
*Every entry is a build requirement. If a scenario is listed here, the described behavior must be implemented.*
*For exact copy strings, cross-reference Copy & Tone Guide.*
