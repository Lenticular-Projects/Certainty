# The Certainty System — Copy & Tone Guide
*Every word in this product sounds like it was written by one person. This document is that person.*

---

## THE FUNDAMENTAL PRINCIPLE

The agents using this platform are professionals. They are not students. They are not gamers. They are experienced sales people who take their craft seriously and want to get better at it. Every word in this product must honor that.

**The product should feel like a sharp coach who respects your time** — not a teacher, not a cheerleader, not a notification machine. A coach who tells you the truth fast, celebrates real wins without embarrassing you, and always points forward.

---

## THREE VOICES

This product has three distinct voices. Each appears in specific contexts and never bleeds into the others.

---

### VOICE 1 — THE SYSTEM VOICE

Used for: UI labels, navigation, section headers, empty states, status messages, button text, feature names.

**Character:** Precise. Unadorned. Confident without being cold. The system knows what it is and doesn't need to explain itself.

**Principles:**
- Short. If it can be two words, it's two words.
- No -ing verbs on buttons. "Analyze Call" not "Analyzing Call."
- No please, no thank you, no sorry. Those are human words — use them in the Coach Voice only.
- No exclamation marks. Ever.
- No filler. "Your call is being processed" → "Analyzing call."
- Capitalize feature names consistently: Knowledge Hub, AI Coach, Pattern Feed, The Closer's Edge, Focus Mode.

**Wrong / Right:**

| Wrong | Right |
|---|---|
| "Great job uploading your call! We're processing it now." | "Analyzing call." |
| "Please enter your email address to continue." | "Email" (label only) |
| "Oops! Something went wrong. Please try again." | "Something went wrong. Try again." |
| "You currently don't have any calls analyzed yet." | "No calls analyzed yet." |
| "Would you like to pin a focus category?" | "Pin a focus category." |
| "Calls History" | "Call History" |
| "View All Of Your Calls" | "View all calls" |
| "Your Score Ring" | "Certainty Score" |

---

### VOICE 2 — THE COACH VOICE

Used for: AI Coach responses, pattern feed entries, pattern alert cards, the Closer's Edge, recovery lines, surprise insights, empty state subtext on the dashboard.

**Character:** Direct. Tactical. Personal without being sentimental. The coach has read your transcripts and tells you exactly what they see — no hedging, no softening that dilutes the message, but always pointing toward what's possible next.

**Principles:**
- Uses "you" and "your" freely — this is personal coaching, not a system report.
- Past tense for what happened: "You held the Math Breakdown through Step 3."
- Present tense for what's possible: "The next call is where this changes."
- Never says "however," "unfortunately," or "please note." Those are report words.
- Recovery language is forward-only: never "you failed to" — always "here's what changes next call."
- Pattern flags are observations, not judgments: "This pattern appeared in 3 of your last 5 calls" not "You keep making this mistake."
- Surprise insights are conversational: "I noticed something about your last 4 calls."

**Wrong / Right:**

| Wrong | Right |
|---|---|
| "Unfortunately, you failed to complete the Math Breakdown on this call." | "The Math Breakdown dropped at Step 3. Here's the exact language that closes it." |
| "Please note that the Detail Stall pattern was detected." | "Detail Stall showed up again — 3 of your last 5 calls. It's the pattern costing you most right now." |
| "You did a great job identifying the GREEN signal today!" | "You read the GREEN signal early and held it. That's the move." |
| "The one thing that would have changed this call is..." | "The one move that changes this call:" |
| "However, there were some areas for improvement." | (Never use this construction — go straight to what the improvement is.) |
| "I noticed that you have been struggling with the third pillar." | "Pillar 3 has been the drop-off point in your last 3 calls. Here's what it looks like when it works." |

**Pattern feed entries follow a consistent format:**

```
[Pattern flagged]
"Detail Stall — 3 of your last 5 calls. → Study this pattern"

[Pattern cleared]
"Detail Stall cleared — not detected in your last 3 calls."

[Level up]
"Level 5 — The Shifter. You've earned it."

[Badge earned]
"Math Breakdown: Sharp. Your last 3 calls averaged 18/20."

[Personal best]
"New personal best — Signal Reading: 19/20."

[Surprise insight]
"I noticed something about your last 4 calls. →"
```

---

### VOICE 3 — THE ERROR VOICE

Used for: Error messages, validation failures, permission denials, upload failures, analysis failures.

**Character:** Plain. Calm. Never apologetic in a way that wastes time. Tells the user exactly what happened in one sentence and what to do about it in another.

**Principles:**
- Two sentences maximum: what happened, what to do.
- Never blame the user. Passive constructions where appropriate: "The file couldn't be read" not "You uploaded an invalid file."
- Never use "error" as the only content — always explain what error.
- If the user can fix it: tell them how. If they can't: tell them who to contact.
- No apology language for system errors the user didn't cause. Reserve "Sorry" for situations where the system genuinely failed something the user did correctly.

**Wrong / Right:**

| Wrong | Right |
|---|---|
| "Error 500 — Internal Server Error" | "Analysis failed. Try uploading again, or contact your manager if this continues." |
| "Invalid file type. Please upload a valid file." | "That file type isn't supported. Upload a TXT, PDF, or DOCX file." |
| "You do not have permission to access this page." | "That page is manager-only. Head back to your dashboard." |
| "Sorry, we couldn't process your request at this time. Please try again later." | "Something went wrong on our end. Try again in a moment." |
| "Your session has expired. Please log in again to continue." | "Your session expired. Sign in again." |
| "The transcript appears to be too short to analyze properly." | "Transcript too short to analyze. Upload a full call — at least 3 minutes of conversation." |

---

## SPECIFIC COPY — EVERY STRING IN THE APP

### Navigation

```
Dashboard
Knowledge Hub
Call History
AI Coach
Upload Call
My Profile
Team
Admin
Sign Out
```

### Dashboard — Score Block

```
Certainty Score
Last 5 calls
↑ Up from last 5       (trend up)
↓ Down from last 5     (trend down)
— Same as last 5       (trend flat)

[XP] to [Level Name]   (level preview — e.g. "420 XP to The Shifter")
```

### Dashboard — Pattern Alert

```
[Pattern Name]
Appeared in [N] of your last 5 calls.

[Study this pattern]    (link → Knowledge Hub)
[See these calls]       (link → Call History filtered)
```

### Dashboard — Empty States

```
No calls analyzed yet.
Your first report will appear after your manager uploads a call.

(Coach card subtext — no focus set)
Ask me anything about The Certainty System.

(Coach card subtext — focus set)
Ask me about [Focus Category Name] — I can show you what to work on next.

(Feed — no entries yet)
Coaching insights appear here after your first analyzed call.
```

### Dashboard — Focus Mode

```
Your Focus          (label when active)
No focus set        (label when empty)
Pin a category      (CTA when empty)
Change focus        (link when active)

(Category selector prompt)
Pick up to 2 categories to focus on. Your dashboard and coach will highlight them.
```

### Knowledge Hub

```
Browse by Topic
Search the System
Quick Reference

Call Types
Objections

Last studied: [X] days ago    (tile metadata)
Last studied: today           (same day)
Not yet studied               (never visited)

(Search — empty state)
Search the full Certainty System. Try "Detail Stall" or "Math Breakdown."

(Search — no results)
No results for "[query]." Try different keywords, or browse by topic.
```

### Call Report

```
(Classification badges)
Enrolled
Missed Opportunity
Unclosable
Correct No-Sale

(Closer's Edge header)
The One Move That Changes This Call

(Recovery line — Missed Opportunity only)
Here's what your next call looks like when this changes.

(Correct No-Sale note)
Scored on execution — 90-point scale, rescaled to 100.

(Annotated transcript toggle)
Full Transcript
Hide Transcript
```

### Upload Call (Manager)

```
Upload Call
Select Agent
Call Date
Call Type (optional)
Upload Transcript
Supported formats: TXT, PDF, DOCX
Analyzing call for [Agent Name]...
(Pending screen subtext) This takes about 30–60 seconds.
```

### AI Coach

```
(New conversation)
New Conversation

(Empty right panel)
Ask anything about the System — call types, objections, framework pillars, or your own calls.

(Input placeholder)
Ask your coach...

(Conversation list — empty)
No conversations yet. Start one above.
```

### Level Names (exact, do not vary)

```
Level 1 — Green Light
Level 2 — The Listener
Level 3 — The Reader
Level 4 — The Builder
Level 5 — The Shifter
Level 6 — The Closer
Level 7 — The Architect
Level 8 — Master Certified
```

### Level-Up Cinematic

```
[New Level Name]
Level [N]
```
No other text. The name and number carry it.

### Personal Best Moment

```
New personal best
[Category Name]: [Score]/[Max]    (e.g. "Math Breakdown: 19/20")
Your best [Category Name] yet.
```

### Badges — Category Tier Labels

```
Developing
Proficient
Sharp
```

### Admin Panel

```
Active Agents
Inactive Agents
Invite Agent
Full Name
Email
Role
Agent
Manager
Send Invite
Deactivate
Reactivate

(Deactivate confirmation)
Deactivate [Name]?
They'll lose access immediately. Their call history and progress are preserved.
[Cancel]  [Deactivate]
```

### Authentication

```
Sign In
Email
Password
Forgot password?
Sign in

(Forgot password)
Reset Password
Enter your email and we'll send a reset link.
Send reset link
Check your email for a reset link.

(Invite accept)
Set Your Password
Welcome to The Certainty System.
Choose a password to activate your account.
Password
Confirm Password
Activate Account
```

---

## WHAT TO NEVER WRITE

These words and phrases are banned from this product:

| Banned | Because |
|---|---|
| "Amazing" | Hollow. |
| "Awesome" | Hollow. |
| "Exciting" | Never. |
| "Let's get started" | Filler. Cut it. |
| "Don't worry" | Condescending. |
| "Oops" | Infantilizing. |
| "Uh oh" | Same. |
| "Please note that" | Bureaucratic. |
| "At this time" | Corporate filler. |
| "In order to" | Use "to." |
| "Click here" | Use the actual action. |
| "Submit" | Use the specific action: "Analyze Call," "Send," "Save." |
| "Profile Page" | "Profile" |
| "Dashboard Page" | "Dashboard" |
| "You can..." | Just say what to do. |
| Any phrase ending in "!" | See above. |

---

## CAPITALIZATION RULES

**Always capitalize (these are proper nouns in this product):**
- The Certainty System
- Knowledge Hub
- AI Coach
- Pattern Feed
- The Closer's Edge
- Focus Mode
- Three Signals
- Four Pillars
- Math Breakdown
- The Shift
- Root Cause (RC1, RC2, RC3)
- Client Gold
- Each level name (The Closer, The Architect, etc.)
- Each pattern name (Detail Stall, Third Party Block, etc.)

**Never capitalize:**
- call report (it's a document, not a proper feature name)
- call history
- dashboard (when used generically)
- team benchmarks

---

*The Certainty System — Copy & Tone Guide v1.0 | February 2026*
*When in doubt: shorter, more direct, more forward-looking. The agent's time is the product.*
