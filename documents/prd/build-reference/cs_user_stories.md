# The Certainty System — User Stories & Acceptance Criteria
*One story per meaningful user goal. Each acceptance criterion is a pass/fail test.*
*Grouped by role and feature area. Use this to determine when a feature is actually done.*

---

## HOW TO READ THIS

**Format:**
> As a [role], when I [situation], I want to [goal] so that [outcome].

**Acceptance criteria** are binary — either the behavior is present or it isn't.
✅ = must pass for feature to be considered complete.

---

## AUTHENTICATION

---

**US-AUTH-01 — First Login (Agent)**
As a new agent, when I follow my invite link and set my password, I want to land on the origin story screen before seeing my dashboard so that I understand what The Certainty System is before I see my own data.

Acceptance criteria:
- ✅ After password set and account activated, agent is redirected to `/welcome`
- ✅ `/welcome` shows narrative beats — cannot be skipped for first 8 seconds
- ✅ After CTA is clicked, agent lands on `/dashboard`
- ✅ `has_seen_welcome` is set to `true` in database after CTA click
- ✅ If agent navigates away before clicking CTA, `/welcome` is shown again on next login
- ✅ `/welcome` is never shown after `has_seen_welcome = true`
- ✅ Managers skip `/welcome` entirely — land directly on `/dashboard`

---

**US-AUTH-02 — Sign In**
As any user, when I enter my email and password, I want to be authenticated and taken to my dashboard so that I can use the platform.

Acceptance criteria:
- ✅ Valid credentials redirect to `/dashboard` (or `/welcome` if first login)
- ✅ Invalid credentials show inline error — "Incorrect email or password." — no redirect
- ✅ Error does not specify which field was wrong
- ✅ Deactivated account shows specific message — "This account has been deactivated. Contact your manager."
- ✅ Submit button re-enables after error (user can retry)

---

**US-AUTH-03 — Session Persistence**
As any user, when I close my browser and return within 7 days, I want to still be signed in so that I don't have to log in constantly.

Acceptance criteria:
- ✅ Session persists for 7 days
- ✅ Activity during session refreshes the 7-day window
- ✅ After 7 days of inactivity, session expires and user is redirected to `/` on next visit

---

**US-AUTH-04 — Role-Based Access**
As an agent, when I try to access a manager-only page, I want to be redirected to my dashboard so that I am not exposed to unauthorized data.

Acceptance criteria:
- ✅ `/calls/upload`, `/admin`, and team analytics routes redirect agents to `/dashboard` with toast
- ✅ Redirect happens before page renders — no flash of unauthorized content
- ✅ API routes also enforce role — `403` returned if agent calls manager-only endpoint directly

---

## KNOWLEDGE HUB

---

**US-KB-01 — Browse Call Types**
As an agent, when I open the Knowledge Hub and select Browse by Topic, I want to see all 9 call types in a grid so that I can quickly find the type I'm looking for.

Acceptance criteria:
- ✅ 3×3 grid renders all 9 call types with name, summary, and signal pill
- ✅ Each tile shows "Last studied: X days ago" or "Not yet studied"
- ✅ Clicking a tile navigates to `/knowledge/[slug]`
- ✅ Hover state is visually distinct with spring-physics lift

---

**US-KB-02 — Browse Objections**
As an agent, when I switch to the Objections sub-nav in the Knowledge Hub, I want to see all 9 objection categories so that I can look up a specific objection.

Acceptance criteria:
- ✅ Switching to Objections tab shows 3×3 grid of objection tiles
- ✅ Tiles show client phrase in quotes, signal pill, emotional subtext
- ✅ Last studied tracking works the same as call type tiles
- ✅ Tab switch is animated — shared layout animation (not a page reload)

---

**US-KB-03 — Quick Reference**
As an agent, when I need to quickly look up a framework concept, I want to tap a chip below the grid and go directly to that page so that I don't have to navigate through tiles.

Acceptance criteria:
- ✅ Chip row shows: Three Signals | Four Pillars | Math Breakdown | Close Confirmation | Nine Patterns
- ✅ Each chip navigates to the correct `/knowledge/[slug]` page
- ✅ Chips are always visible on the hub index

---

**US-KB-04 — Semantic Search**
As an agent, when I type a term in the search bar, I want to see relevant knowledge results so that I can find information using natural language.

Acceptance criteria:
- ✅ Search debounces 400ms — does not fire on every keystroke
- ✅ Results show title, excerpt, and relevance context
- ✅ Clicking a result navigates to that content page
- ✅ Zero results shows helpful message with browse link
- ✅ Search API failure shows fallback message — browse link remains accessible

---

**US-KB-05 — Last Studied Tracking**
As an agent, when I visit a knowledge page, I want my "last studied" timestamp to update so that I can see which areas I've neglected.

Acceptance criteria:
- ✅ Visiting any `/knowledge/[slug]` page fires a background POST to update `last_studied`
- ✅ The POST is fire-and-forget — it does not block page render
- ✅ Updated timestamp appears on the corresponding tile on next hub index visit
- ✅ "Last studied: today" shown for same-day visits

---

## AGENT DASHBOARD

---

**US-DASH-01 — Score Block**
As an agent, when I open my dashboard, I want to see my current Certainty Score, level, and XP so that I know where I stand at a glance.

Acceptance criteria:
- ✅ Score ring animates from 0 to score with spring physics on first render
- ✅ Score shown as rolling average of last 5 analyzed calls
- ✅ Trend indicator (↑/↓/—) compared to previous 5 calls
- ✅ Level name and badge visible
- ✅ XP bar shows progress to next level
- ✅ Level preview line always visible: "[X XP] to [Next Level Name]"
- ✅ If no calls: score shows "—", appropriate empty state message shown

---

**US-DASH-02 — Recent Calls Strip**
As an agent, when I open my dashboard, I want to see my 3 most recent analyzed calls so that I can quickly revisit recent reports.

Acceptance criteria:
- ✅ 3 most recent calls shown with date, call type, classification badge, score
- ✅ Each card links to its full report
- ✅ If fewer than 3 calls exist, only existing calls shown (no broken empty slots)
- ✅ "View all calls" link navigates to call history

---

**US-DASH-03 — Pattern Alert**
As an agent, when a failure pattern appears in 3 or more of my last 5 calls, I want to see a prominent alert so that I know what to work on.

Acceptance criteria:
- ✅ Alert appears only when pattern_count >= 3 in last 5 calls
- ✅ Shows pattern name and count
- ✅ "Study this pattern" links to the correct Knowledge Hub page
- ✅ "See these calls" links to call history filtered to that pattern
- ✅ Alert disappears when pattern drops below threshold
- ✅ Alert is hidden when no pattern qualifies (not an empty card)

---

**US-DASH-04 — Focus Mode**
As an agent, when I pin 1–2 categories in Focus Mode, I want those categories highlighted throughout my dashboard so that my coaching feels targeted to what I'm working on.

Acceptance criteria:
- ✅ Up to 2 categories can be pinned
- ✅ Pinned categories are visually elevated in the badge row
- ✅ AI Coach card subtext references the pinned category by name
- ✅ Focus categories are injected into AI Coach system prompt (server-side)
- ✅ "Change focus" allows re-selection at any time
- ✅ First-visit state shows "Pin a category" prompt — non-blocking
- ✅ Focus selection persists across sessions (stored in database)

---

**US-DASH-05 — Team Benchmark**
As an agent, when I review my category scores, I want to see the anonymized team average alongside my score so that I understand how I compare without being ranked.

Acceptance criteria:
- ✅ Each category shows "Team avg: X/Y · You: A/B"
- ✅ No agent names visible anywhere in benchmark data
- ✅ Benchmark is hidden when fewer than 3 agents have analyzed calls
- ✅ Benchmark data comes from all active agents' last 5 calls per category

---

**US-DASH-06 — Surprise Insight**
As an agent, when the system detects a notable pattern in my recent calls, I want to occasionally see an unprompted coaching observation in my feed so that I notice things I might have missed.

Acceptance criteria:
- ✅ Surprise insight appears in feed approximately 1 in 5 sessions
- ✅ Never appears more than once in a 7-day period for the same agent
- ✅ Has visually distinct treatment from standard feed entries
- ✅ Header: "I noticed something about your last N calls. →"
- ✅ Expanding reveals 2–3 sentences of coaching content
- ✅ Content is LLM-generated from real call pattern data — not generic

---

## CALL ANALYSIS

---

**US-CALL-01 — Upload a Call (Manager)**
As a manager, when I upload a transcript for an agent, I want the analysis to run automatically and notify me when it's complete so that I don't have to manually trigger anything.

Acceptance criteria:
- ✅ Upload form accepts TXT, PDF, DOCX — rejects all other types with inline error
- ✅ File size limit enforced (10MB) with clear error
- ✅ Agent selection is required — submit disabled without it
- ✅ After submit: redirect to pending screen (or inline pending state if from Manager Dashboard)
- ✅ Pending screen polls `/api/calls/status/:id` every 5s
- ✅ On complete: redirects to (or loads) the full call report
- ✅ On failure: shows clear error with retry option

---

**US-CALL-02 — Call Report — Closer's Edge First**
As an agent, when I open a call report, I want to see the single most actionable insight immediately — before any scores or sections — so that I know what to change on my next call.

Acceptance criteria:
- ✅ Closer's Edge card appears immediately below the report header — before Executive Summary
- ✅ Closer's Edge is always visible above the fold on desktop
- ✅ Cannot be hidden, collapsed, or scrolled past on report load
- ✅ Glass surface treatment applied to this card
- ✅ On Missed Opportunity reports: Recovery Line appears directly below Closer's Edge

---

**US-CALL-03 — Full Report Sections**
As an agent, when I read my call report, I want to see the complete forensic breakdown so that I understand exactly what happened on this call.

Acceptance criteria:
- ✅ All sections present: Closer's Edge, Executive Summary, Score Breakdown (6 categories), Signal Audit, Pillar Performance, Math Breakdown, Objection Analysis, Failure Patterns, Client Gold, Annotated Transcript
- ✅ Score breakdown shows score, max, verdict, and feedback for all 6 categories
- ✅ Failure patterns include exact alternative language
- ✅ Annotated transcript has inline tags for patterns, Client Gold, signals
- ✅ Correct No-Sale reports show rescaled score with explanatory note

---

**US-CALL-04 — Level-Up Moment**
As an agent, when I view a report that pushed me to a new level, I want to see the level-up cinematic before the report loads so that the achievement feels significant.

Acceptance criteria:
- ✅ Level-up cinematic triggers when report page detects level change vs pre-upload session value
- ✅ Cinematic is full-viewport — not a modal
- ✅ Shows new level name and number only — no other copy
- ✅ Score ring (lg) pulses 3 times with spring animation
- ✅ Auto-dismisses after 3s, also dismissable on any interaction
- ✅ Dashboard level badge updated after cinematic completes
- ✅ Feed entry for level-up added to Pattern Feed

---

**US-CALL-05 — Personal Best Moment**
As an agent, when I set a new personal best score on any category, I want to see a designed moment acknowledging it so that the improvement is recognized.

Acceptance criteria:
- ✅ Personal best moment triggers for new best overall score OR new best on any individual category
- ✅ Appears as centered overlay card (not full-screen)
- ✅ Shows category name + score + "Your best [Category] yet."
- ✅ Glass surface treatment applied
- ✅ Auto-dismisses after 3s, dismissable on tap
- ✅ Does not appear simultaneously with level-up cinematic (level-up takes priority)
- ✅ Feed entry added for personal best

---

## AI COACH

---

**US-COACH-01 — Chat with Coach**
As an agent, when I ask the AI Coach a question, I want a response that draws on the Certainty System framework and my own call history so that the answer is relevant to my actual situation.

Acceptance criteria:
- ✅ Response references Certainty System concepts accurately (call types, pillars, patterns, signals)
- ✅ Agent's `focus_categories`, `top_pattern`, `avg_score`, and recent call summaries are injected into system prompt server-side
- ✅ Agent never sees the system prompt context
- ✅ Response streams token by token — typing indicator shown during stream
- ✅ Failed send shows inline error with retry option

---

**US-COACH-02 — Conversation History**
As an agent, when I return to the AI Coach, I want to see my previous conversations so that I can continue where I left off.

Acceptance criteria:
- ✅ Conversation list shows all previous sessions with title and date
- ✅ Clicking a conversation loads its full message history
- ✅ "New Conversation" clears the right panel and starts fresh
- ✅ Conversations persist across sessions

---

## MANAGER DASHBOARD

---

**US-MGR-01 — Team Overview**
As a manager, when I open my dashboard, I want to see my team's overall performance, active patterns, and recent activity in one view so that I can make coaching decisions without opening each agent profile.

Acceptance criteria:
- ✅ Team Certainty Score (avg of all agents' rolling avg) visible above the fold
- ✅ Agents with no recent calls (14+ days) flagged with count in warning color
- ✅ Top 3 team-level patterns shown with agent count
- ✅ Team Table shows all agents with score, last call, top pattern
- ✅ Recent Activity Strip shows latest events across the team
- ✅ All sections load independently — one section failing doesn't break others

---

**US-MGR-02 — Upload Call from Dashboard**
As a manager, when I upload a call from the Team Table, I want to stay on the dashboard so that I can upload multiple calls without losing my context.

Acceptance criteria:
- ✅ "Upload Call" in table row opens SlideOver — no page navigation
- ✅ Agent is pre-populated in SlideOver
- ✅ After submission, SlideOver closes and row shows pending state
- ✅ Row updates to show new call data after analysis completes — no manual refresh needed
- ✅ Analysis failure shows "Analysis failed" + retry in the row itself

---

**US-MGR-03 — Filter Team Table**
As a manager, when I want to focus on agents needing attention, I want to filter the team table by status so that I see only the relevant rows.

Acceptance criteria:
- ✅ Filter chips: All Agents | Has Pattern | No Recent Calls | New Agents
- ✅ One filter active at a time
- ✅ Table updates immediately on filter change (no submit button)
- ✅ Row count updates to reflect filtered set
- ✅ Clicking "Agents with No Calls" count in Team Summary auto-applies "No Recent Calls" filter

---

## ADMIN

---

**US-ADMIN-01 — Invite Agent**
As a manager, when I invite a new agent, I want them to receive an email with an activation link so that they can set their password and join the platform.

Acceptance criteria:
- ✅ Invite form requires full name, email, and role
- ✅ Invite email sends to the specified address
- ✅ Invite link is valid for 72 hours
- ✅ Agent activates by setting a password — no separate signup
- ✅ Failed email send shows error inside modal — agent record is NOT created

---

**US-ADMIN-02 — Deactivate Agent**
As a manager, when I deactivate an agent, I want their access removed immediately while their history is preserved so that I don't lose their data.

Acceptance criteria:
- ✅ Deactivation requires confirmation modal — cannot be undone without reactivation
- ✅ Agent cannot log in after deactivation (returns specific error message)
- ✅ All call history, reports, and progress are preserved
- ✅ Deactivated agent does not appear in upload dropdowns or active counts
- ✅ Manager cannot deactivate their own account (button disabled on own row)

---

*The Certainty System — User Stories & Acceptance Criteria v1.0 | February 2026*
*A feature is done when every acceptance criterion for its story passes. Not before.*
