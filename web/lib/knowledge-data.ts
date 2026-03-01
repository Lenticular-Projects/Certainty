/**
 * Knowledge Hub static content — ported from claude-prototypes/knowledge-hub.html
 * All topics, tiles, caller type detail data, and overview cards.
 */

export interface TileData {
  signal: "green" | "yellow" | "red";
  title: string;
  summary: string;
  studied: string;
}

export interface TopicData {
  subtitle: string;
  tiles: TileData[];
}

export interface CallTypeDetail {
  signal: string;
  signalLabel: string;
  definition: string;
  recognition: string[];
  primaryMove: string;
  avoid: string;
}

export interface OverviewCard {
  topic: string;
  title: string;
  count: string;
  desc: string;
}

export const CALL_TYPE_DATA: Record<string, CallTypeDetail> = {
  "Money Caller": {
    signal: "green",
    signalLabel: "Green Signal",
    definition:
      "They called because of a specific benefit — the grocery card, the OTC allowance, the Part B giveback, or something they saw on TV. They are the most motivated caller you will get. Not resistant. Ready — as long as you do the math completely and connect it to their life.",
    recognition: [
      '"I\'m calling about the card I saw on TV."',
      '"Someone told me I could get money for groceries."',
      '"I heard I could get money put back on my Social Security."',
    ],
    primaryMove:
      "Full 3-step Math Breakdown. Step 1: State the comparison — current benefit vs. available benefit, side by side. Step 2: Annualize it — $35/month sounds minor, $420/year lands. Step 3: Humanize it — connect the annual number to something they told you. This is the close.",
    avoid:
      "Stopping at Step 2. The number doesn't speak for itself. Step 3 — connecting the annual amount to something real the client told you — is the close. Enrollments are lost here.",
  },
  "Scared Switcher": {
    signal: "red",
    signalLabel: "Red Signal",
    definition:
      "Interested but afraid of losing something. Their doctor, their plan, their carrier, their \"insurance lady.\" Fear is the objection — not the words they say. The words are a cover for fear of change, fear of loss, fear of making a mistake that hurts their health or routine.",
    recognition: [
      '"I\'m happy with what I have."',
      '"I\'ve had this plan for years and it works for me."',
      '"The devil you know is better than the devil you don\'t."',
    ],
    primaryMove:
      "Name the fear before presenting anything. Do not lead with logic, math, or product information. The emotion has to be addressed first — or nothing else lands.",
    avoid:
      "Responding with logic when the prospect needs validation. Explaining why the new plan is better before acknowledging what they're afraid of losing.",
  },
  "Misinformed": {
    signal: "red",
    signalLabel: "Red Signal",
    definition:
      "Operating on false information from someone they trusted — a doctor's receptionist, family member, or TV commercial. The false belief is the wall. No selling works until it comes down — and it has to come down without making them feel stupid for believing it.",
    recognition: [
      '"My doctor said I can\'t change my plan."',
      '"I heard if I switch I lose my doctor."',
      '"The other agent told me I can\'t do better than what I have."',
    ],
    primaryMove:
      'Live verification using your system access as the authority. "Let me check that right now while we\'re on the phone." You are not arguing with them — you are showing them. The screen is the authority, not you vs. them.',
    avoid:
      'Directly contradicting the false belief. "No ma\'am, that\'s not true" triggers defensiveness and ends the call. Never build on an unverified foundation.',
  },
  "Third Party Controlled": {
    signal: "green",
    signalLabel: "Green + Gatekeeper",
    definition:
      "The person on the phone is not the one making the decision. A spouse, adult child, caregiver, or POA holds the real authority. The client will say yes — and then check with that person after you hang up. That conversation, without you in it, is where the sale dies.",
    recognition: [
      '"I need to talk to my daughter first."',
      '"My husband handles all of this."',
      "You hear another voice in the background giving instructions or commentary.",
    ],
    primaryMove:
      "Identify the real decision maker early. Get them on the call — or sell to both simultaneously right now. Before you hang up, the third party has heard the case directly from you.",
    avoid:
      '"OK, I\'ll call you back." That call and that client are gone. Continuing to sell as if the third party doesn\'t exist means you\'re closing someone who can\'t say yes alone.',
  },
  "Detail Staller": {
    signal: "yellow",
    signalLabel: "Yellow Signal",
    definition:
      'Intellectually engaged but emotionally exiting. "I want to think about it," "send me something," and "I want to look it up" sound like requests for information. They are not. They are polite goodbyes. An agent who treats the stall as a real request validates the exit.',
    recognition: [
      '"Can you send me something in writing?"',
      '"I want to look this up online first."',
      '"I\'m not ready to make a decision today."',
    ],
    primaryMove:
      "Make inaction expensive in specific dollars. Make enrollment the safe, low-risk move. Do not give them a plan ID, a website, or a reason to leave. The enrollment is the documentation.",
    avoid:
      '"No problem, take your time." Providing a plan ID or website to research. These validate the exit and remove you from the equation entirely.',
  },
  "Time Bomb": {
    signal: "green",
    signalLabel: "Green + Countdown",
    definition:
      "Willing and interested — but operating under a constraint that will end the call before enrollment if the agent doesn't move with urgency. A ride arriving, exhaustion, physical pain, or another appointment. The window is real and it is closing.",
    recognition: [
      '"I don\'t have long — I have an appointment at 2."',
      '"My ride\'s going to be here soon."',
      '"Can we make this quick?"',
    ],
    primaryMove:
      "Identify the constraint early. Name it. Accelerate. Move straight to what matters. Get one doctor name, run the network check, state the benefit, annualize it, close. The entire sequence should take 4 minutes or less.",
    avoid:
      "Spending time building rapport. Rapport happens after the enrollment, not before. If you don't have the enrollment by the time their constraint hits, you don't have the enrollment.",
  },
  "Commercial Myth Caller": {
    signal: "red",
    signalLabel: "Red Signal",
    definition:
      "Their expectations were set by television advertising promising $6,000, $900, or numbers that don't match reality for their zip code. They're not resistant — they're confused and feel deceived. The wrong response makes the agent part of the betrayal.",
    recognition: [
      '"The commercial said I could get $900 a month."',
      '"I saw on TV that Medicare pays you money."',
      '"Why is what you\'re offering so much less than the commercial showed?"',
    ],
    primaryMove:
      "Join their frustration before presenting anything. Become the ally against the misleading commercial — not the defender of the system. Then redirect toward what's real and available right now in their area.",
    avoid:
      '"I don\'t control the commercial." Defending the system in any way. This makes you part of what betrayed them. Correcting them before joining their frustration ends the call.',
  },
  Veteran: {
    signal: "red",
    signalLabel: "Red Signal",
    definition:
      "They use VA benefits and see Medicare Advantage as a threat to what they've earned. They believe enrolling means replacing their VA care or losing VA benefits. None of that is true — but they don't know it yet. Jumping straight to plan mechanics ends the call.",
    recognition: [
      '"I get my care through the VA — I don\'t need this."',
      '"I\'m a veteran. VA covers everything."',
      "Client shuts down the moment PCP selection comes up.",
    ],
    primaryMove:
      "Neutralize the displacement fear before presenting anything. VA and Medicare Advantage are additive, not competing. Establish this as the first thing they hear. Do not move to plan details until this is understood and accepted.",
    avoid:
      'Jumping to PCP selection. The moment a veteran hears "pick a primary care doctor," they hear "replace your VA doctor." Plan mechanics before fear neutralization ends the call immediately.',
  },
  "Timing Objector": {
    signal: "red",
    signalLabel: "Red Signal",
    definition:
      "Willing and interested — but fixated on a timing issue that feels logical and is almost always a stall. Effective date too far away, moving soon, wants to wait for Medicaid, or planning to wait for open enrollment. The stall sounds reasonable. The cost of waiting is real.",
    recognition: [
      '"I have a procedure next week — I don\'t want to mess up my coverage."',
      '"I\'m moving in a few months. Let me wait until I\'m settled."',
      '"I\'ll do this next year during open enrollment."',
    ],
    primaryMove:
      "Make the wait feel expensive in specific dollars. Every month of waiting is a number — say it out loud. Then make enrollment the low-risk option so there's no legitimate reason to wait.",
    avoid:
      '"OK, I\'ll call you back in the fall." This call and this client are gone. Accepting the stall as a legitimate reason to end the conversation.',
  },
};

export const TOPICS: Record<string, TopicData> = {
  calltypes: {
    subtitle: "The Nine Caller Types \u00B7 9",
    tiles: [
      { signal: "green", title: "Money Caller", summary: "Motivated. Called about a specific benefit they want to understand fully.", studied: "Not yet studied" },
      { signal: "red", title: "Scared Switcher", summary: "Afraid of losing something they already have. Name the fear first.", studied: "Not yet studied" },
      { signal: "red", title: "Misinformed", summary: "Operating on false information. Use live verification before moving forward.", studied: "Not yet studied" },
      { signal: "green", title: "Third Party Controlled", summary: "The real decision maker isn't on the call. Identify and involve them.", studied: "Not yet studied" },
      { signal: "yellow", title: "Detail Staller", summary: "Polite exit strategy disguised as curiosity. Quantify the cost of waiting.", studied: "Not yet studied" },
      { signal: "green", title: "Time Bomb", summary: "Willing but operating under a time constraint. Accelerate the process.", studied: "Not yet studied" },
      { signal: "red", title: "Commercial Myth Caller", summary: "Saw a misleading commercial. Don't correct them \u2014 become their ally.", studied: "Not yet studied" },
      { signal: "red", title: "Veteran", summary: "Fears Medicare Advantage replaces VA benefits. Correct this myth first.", studied: "Not yet studied" },
      { signal: "red", title: "Timing Objector", summary: "Stalling with a timing excuse. Quantify what delay costs them.", studied: "Not yet studied" },
    ],
  },
  objections: {
    subtitle: "Objection Handbook \u00B7 13",
    tiles: [
      { signal: "red", title: "Fear of Change & Switching", summary: "The most common objection. Fear of the unknown, inertia, attachment to the status quo. Redirect from \"changing\" to \"verifying.\"", studied: "Not yet studied" },
      { signal: "red", title: "Commercial & Benefit Objections", summary: "Expectations set by TV advertising that don't match what's available. Join their frustration \u2014 become the ally.", studied: "Not yet studied" },
      { signal: "yellow", title: "Stall Objections", summary: "\"Send me something.\" \"I want to think about it.\" These are polite exits, not genuine requests. Quantify the cost of waiting.", studied: "Not yet studied" },
      { signal: "red", title: "Third-Party Objections", summary: "Someone else holds the decision or will question it after you hang up. Get them on the call \u2014 or arm the client with exact language.", studied: "Not yet studied" },
      { signal: "red", title: "Loyalty Objections", summary: "Attachment to a carrier, a plan, or a person. Don't argue with loyalty \u2014 name it, validate it, and redirect it.", studied: "Not yet studied" },
      { signal: "red", title: "Timing Objections", summary: "Fixated on why now isn't the right time. Every month of waiting is a specific dollar amount unclaimed. Say it.", studied: "Not yet studied" },
      { signal: "yellow", title: "Benefit & Plan Comparison", summary: "Comparing this plan against the wrong baseline. Reset the comparison. Make them compare action against inaction.", studied: "Not yet studied" },
      { signal: "red", title: "Trust & Credibility Objections", summary: "They've been burned before or don't trust agents. Radical transparency is the tool. Don't explain \u2014 show.", studied: "Not yet studied" },
      { signal: "red", title: "Fear of Losing Existing Benefits", summary: "Afraid of losing VA coverage, Medicaid, their doctor, or their carrier. Name the fear. Show what's additive, not replacing.", studied: "Not yet studied" },
      { signal: "yellow", title: "Financial Objections", summary: "Concerns about costs, premiums, what changes. Connect the available benefit to what they're currently giving away.", studied: "Not yet studied" },
      { signal: "red", title: "Resistance at Close", summary: "Last-minute objections when the sale is nearly done. Identify the specific fear. Don't stop \u2014 one more reframe.", studied: "Not yet studied" },
      { signal: "yellow", title: "Momentum Killers", summary: "Agent-created dead spots: dead air during navigation, rapport without an off-switch, permission-seeking language.", studied: "Not yet studied" },
      { signal: "green", title: "Universal Responses", summary: "Core language that works across call types and objections. Every agent should have these memorized before any call.", studied: "Not yet studied" },
    ],
  },
  signals: {
    subtitle: "Three Client Signals \u00B7 3",
    tiles: [
      { signal: "green", title: "GREEN \u2014 Open", summary: "Client is engaged, asking questions, leaning in. The move is to present, build the math, and advance toward the close. Do not stall here \u2014 move.", studied: "Not yet studied" },
      { signal: "yellow", title: "YELLOW \u2014 Drifting", summary: "Client is on a tangent, gone social, or dead air has set in. Validate in one sentence and bridge back with a forward-moving statement \u2014 not a question.", studied: "Not yet studied" },
      { signal: "red", title: "RED \u2014 Resistant", summary: "Client is pushing back or going quiet. Underneath every RED is an emotion \u2014 fear, distrust, past experience. Name the emotion first. Logic does not work here.", studied: "Not yet studied" },
    ],
  },
  pillars: {
    subtitle: "Four Pillars \u00B7 4",
    tiles: [
      { signal: "green", title: "Pillar 1 \u2014 Persuasion", summary: "The macro mindset. Lead with authority and conviction at all times. Never ask permission to advance the sale. Assumptive frame, every call.", studied: "Not yet studied" },
      { signal: "red", title: "Pillar 2 \u2014 Reframing", summary: "The tool for RED signals. Name the fear underneath the words, then redirect the meaning without dismissing it. Never logic first. Validate, then reframe.", studied: "Not yet studied" },
      { signal: "green", title: "Pillar 3 \u2014 The Shift", summary: "The tool for any objection where the client compares against the wrong thing. Deploy the Three-Step Math Breakdown: State, Annualize, Humanize. Step 3 is the close.", studied: "Not yet studied" },
      { signal: "yellow", title: "Pillar 4 \u2014 Refocusing", summary: "The tool for YELLOW signals. Validate in one sentence. Bridge back with a forward-moving statement. Narrate system navigation \u2014 dead air is yours to prevent.", studied: "Not yet studied" },
    ],
  },
  math: {
    subtitle: "Math Breakdown \u00B7 3 Steps",
    tiles: [
      { signal: "green", title: "Step 1 \u2014 State the Comparison", summary: "Side by side. Current benefit vs. available benefit. Specific numbers for their zip code, their plan, their situation. No approximations. No ranges.", studied: "Not yet studied" },
      { signal: "green", title: "Step 2 \u2014 Annualize It", summary: "Monthly numbers feel trivial. Annual numbers land. $35/month is easy to dismiss. $420/year is harder. Always multiply by 12 and say the annual figure out loud.", studied: "Not yet studied" },
      { signal: "green", title: "Step 3 \u2014 Humanize the Cost", summary: "Connect the annual number to something real this specific client told you. Their grocery bill. The dental appointment they've been putting off. This step is the close.", studied: "Not yet studied" },
    ],
  },
  close: {
    subtitle: "Close Confirmation \u00B7 3 Components",
    tiles: [
      { signal: "green", title: "Component 1 \u2014 The Anchor Statement", summary: "Remind the client of the specific reason they said yes \u2014 using their own situation. Not \"great choice.\" The benefit they mentioned.", studied: "Not yet studied" },
      { signal: "green", title: "Component 2 \u2014 The Confidence Statement", summary: "Give the client language they can use when someone questions their decision \u2014 because someone will. Tailored to the call type.", studied: "Not yet studied" },
      { signal: "green", title: "Component 3 \u2014 The Forward Close", summary: "End the call with the client looking forward, not back. Give them something to anticipate. The last thing they hear should be about what's coming.", studied: "Not yet studied" },
    ],
  },
  patterns: {
    subtitle: "Nine Patterns \u00B7 9",
    tiles: [
      { signal: "red", title: "1 \u2014 Client Gold Ignored", summary: "Agents walk past emotionally significant things clients say \u2014 financial distress, health fears, family pressure. Those moments are the actual close.", studied: "Not yet studied" },
      { signal: "red", title: "2 \u2014 Incomplete Math Breakdown", summary: "Agents present the benefit and stop. They state the monthly number but never annualize it and never connect it to something real. Step 3 is the close.", studied: "Not yet studied" },
      { signal: "red", title: "3 \u2014 Logic to Emotional Objections", summary: "When a client pushes back, agents explain. But client resistance is almost never intellectual \u2014 it is emotional. Address the emotion first.", studied: "Not yet studied" },
      { signal: "red", title: "4 \u2014 Permission-Seeking Language", summary: "\"I'm not here to strong-arm you.\" \"Would it be okay if...\" These phrases signal that the agent lacks conviction. They hand control away.", studied: "Not yet studied" },
      { signal: "red", title: "5 \u2014 System Navigation Dead Air", summary: "When agents search their systems, they go silent. Thirty to ninety seconds. In that silence, clients talk themselves out of the enrollment.", studied: "Not yet studied" },
      { signal: "yellow", title: "6 \u2014 Rapport Without an Off-Switch", summary: "Agents build genuine connection and then cannot transition into the close. The client likes them. The call ends warmly. No enrollment.", studied: "Not yet studied" },
      { signal: "red", title: "7 \u2014 The Third Party Blind Spot", summary: "A family member, spouse, or caregiver is present. The agent keeps selling to the primary caller. The real decision maker is never addressed.", studied: "Not yet studied" },
      { signal: "red", title: "8 \u2014 Accepting Misinformation", summary: "Clients come in with false information. Agents accept it and build the sale on it. The false belief becomes the foundation \u2014 and it collapses.", studied: "Not yet studied" },
      { signal: "red", title: "9 \u2014 The Hollow Yes", summary: "The agent gets the enrollment. The client hangs up uncertain. That is not a win \u2014 it is a disenrollment in slow motion.", studied: "Not yet studied" },
    ],
  },
  storybank: {
    subtitle: "Story Bank \u00B7 Coming Soon",
    tiles: [],
  },
};

export const OVERVIEW_CARDS: OverviewCard[] = [
  { topic: "calltypes", title: "The Nine Caller Types", count: "9", desc: "The framework for understanding who you're talking to before the first objection is raised. Every call is one of nine types. Identify it in the first two minutes." },
  { topic: "objections", title: "Objection Handbook", count: "13", desc: "Every objection, organized by what the client said. Look up the words you just heard. Deploy the response. 13 sections covering every resistance pattern." },
  { topic: "signals", title: "Three Client Signals", count: "3", desc: "At every moment in a call, the client is in one of three states \u2014 Open, Drifting, or Resistant. Read the signal correctly and you always know the right move." },
  { topic: "pillars", title: "Four Pillars", count: "4", desc: "The four tools you deploy based on the signal you're reading. Every response in the system maps back to one of these: Persuasion, Reframing, The Shift, Refocusing." },
  { topic: "math", title: "Math Breakdown", count: "3 Steps", desc: "The three-step sequence that transforms a monthly benefit number into a felt, real, personal loss. Step 3 is the close. It is missing in the majority of lost calls." },
  { topic: "close", title: "Close Confirmation", count: "3 Components", desc: "The final step on every enrolled call. Three components, all required. A client who hangs up uncertain is a disenrollment in slow motion." },
  { topic: "patterns", title: "Nine Patterns", count: "9", desc: "The recurring failure modes identified across call data. Not theory \u2014 what is actually happening right now, on these calls, with these clients." },
  { topic: "storybank", title: "Story Bank", count: "\u2014", desc: "Memorized stories for the most common client types. The structure that makes every pillar survive contact with a real call. Coming soon." },
];

// Flattened search index
export const ALL_ITEMS = Object.entries(TOPICS)
  .filter(([topic]) => topic !== "storybank")
  .flatMap(([topic, data]) =>
    data.tiles.map((t) => ({ ...t, topic }))
  );
