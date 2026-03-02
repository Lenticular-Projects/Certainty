export type Objection = {
  id: string
  section: string
  clientPhrase: string
  signal: 'red' | 'yellow' | 'green'
  underneath: string
  doNotSay?: string[]
  responses: Array<{ label?: string; text: string }>
  pillar: string
}

export const sections = [
  'All',
  'Fear & Resistance',
  'Commercial & Benefit',
  'Stall',
  'Network & Coverage',
  'Loyalty',
  'Timing',
  'Benefit & Plan Comparison',
  'Trust & Credibility',
  'Family & Third Party',
  'Closing & Resistance',
]

export const objections: Objection[] = [
  // SECTION 1: FEAR & RESISTANCE
  {
    id: 'happy-with-plan',
    section: 'Fear & Resistance',
    clientPhrase: '"I\'m happy with what I have." / "My plan works."',
    signal: 'red',
    underneath: 'They have connected their current plan to their health and their safety. "My plan works" means "I\'m afraid something will stop working if I change."',
    doNotSay: [
      'Explaining why the new plan is better — logic against fear does not work',
      '"But your plan is costing you money." — sounds like an attack; they defend it',
      '"You\'re missing out on a lot of benefits." — they hear criticism, not opportunity',
    ],
    responses: [
      { label: 'Reframe what switching means', text: '"I completely hear you — and I\'m not asking you to risk anything that\'s working. What I want to do is take 90 seconds and show you what you currently have compared to what\'s available. If it\'s not better, I\'ll tell you. But I\'d rather you know the number than not know it. Fair?"' },
      { label: 'For long-term plan holders', text: '"Three years on the same plan tells me you\'re not someone who makes changes for no reason — and I\'m not going to ask you to. What I am going to do is show you what that plan has cost you over those three years compared to what was available. If the numbers don\'t make sense, we close the call and you keep what you have."' },
    ],
    pillar: 'Reframing → The Shift',
  },
  {
    id: 'dont-want-change',
    section: 'Fear & Resistance',
    clientPhrase: '"I don\'t want to change."',
    signal: 'red',
    underneath: 'The same fear dressed more plainly. The words "I don\'t want to" are not a decision — they are discomfort with motion.',
    responses: [
      { text: '"I hear you — and I\'m not here to push you into anything. I want to show you one number. If the number doesn\'t make sense, we stop. If it does, at least you\'ll know what you\'re walking away from. Give me 90 seconds."' },
    ],
    pillar: 'Reframing',
  },
  {
    id: 'lose-doctor',
    section: 'Fear & Resistance',
    clientPhrase: '"I\'m afraid I\'ll lose my doctor."',
    signal: 'red',
    underneath: 'A real, legitimate concern. Respect it. Then resolve it live.',
    responses: [
      { text: '"That\'s the first thing I check — tell me your doctor\'s name and I\'ll look them up in the system right now, while we\'re on the phone. If they\'re not in-network, I\'ll tell you and we stop there. If they are, the concern is resolved and we can look at the rest."' },
    ],
    pillar: 'Persuasion',
  },
  {
    id: 'bad-experience',
    section: 'Fear & Resistance',
    clientPhrase: '"I had a bad experience with a plan before."',
    signal: 'red',
    underneath: 'Real experience that created a real barrier. You cannot argue with lived experience. Don\'t try.',
    responses: [
      { text: '"I hear you — and I\'m not going to dismiss what you went through. Can I ask what specifically went wrong? Because what I can tell you is that current year plans are structured differently from what you experienced. More importantly, I\'m going to verify your doctors and medications before we do anything — so you\'re not taking my word for it."' },
    ],
    pillar: 'Reframing',
  },

  // SECTION 2: COMMERCIAL & BENEFIT
  {
    id: 'commercial-amount',
    section: 'Commercial & Benefit',
    clientPhrase: '"The commercial said I could get $6,000 / $900 / $1,200. Yours is less."',
    signal: 'red',
    underneath: 'The commercial set an expectation. The reality feels like a downgrade. They need someone to validate that feeling — and then give them something real.',
    doNotSay: [
      '"I don\'t control the commercial." — abandons all authority',
      '"That\'s not how it works." — shames them for believing it; call ends',
      'Defending the system — you become part of what betrayed them',
    ],
    responses: [
      { label: 'Validate and anchor on real value', text: '"You\'re right to be frustrated — and I want to be straight with you. Those commercials show the national maximum, which is the highest benefit available anywhere in the country. Your actual benefit is based on your specific zip code and the plans available there. What I\'m looking at for your area right now is $[amount] — and that\'s real. The commercial showed the ceiling. I\'m showing you your floor — and it\'s real money."' },
      { label: 'Pivot to total value', text: '"Here\'s what those commercials don\'t show you. The total value isn\'t just one benefit. By the time we add up the grocery card, the Part B giveback, the dental, and the OTC allowance — the real total for your area is [annualized number]. That\'s the actual picture."' },
    ],
    pillar: 'Reframing',
  },
  {
    id: 'card-not-available',
    section: 'Commercial & Benefit',
    clientPhrase: '"I called about the card I saw on TV but it\'s not available in my area."',
    signal: 'red',
    underneath: 'They came in ready to buy. The specific benefit not being there is a detour, not a dead end.',
    responses: [
      { text: '"I completely understand why that\'s frustrating — you came in looking for something specific. Here\'s what I want to show you: even if that exact benefit isn\'t at the maximum in your area, the total value of what\'s available is often higher than what the commercial showed. Let me run the full picture for your zip code."' },
    ],
    pillar: 'The Shift',
  },
  {
    id: 'commercial-a-and-b',
    section: 'Commercial & Benefit',
    clientPhrase: '"The commercial said A and B is all I need to get the card."',
    signal: 'red',
    underneath: 'Deceived by advertising into thinking the benefit is automatic.',
    responses: [
      { text: '"Those commercials make it sound automatic — and I understand why. What they don\'t explain is that the government distributes those funds through specific plans. You\'ve already done the hard part by getting Parts A and B. My job is to make sure that money actually gets to you instead of sitting unclaimed. Can I check what you qualify for right now?"' },
    ],
    pillar: 'Reframing',
  },

  // SECTION 3: STALL
  {
    id: 'think-about-it',
    section: 'Stall',
    clientPhrase: '"I need to think about it." / "Call me back later."',
    signal: 'red',
    underneath: 'They don\'t have a specific objection. They have ambient discomfort with committing. "I need to think about it" is almost always a symptom — not the actual issue.',
    responses: [
      { label: 'Step 1: Find the real objection', text: '"Of course — before I let you go, can I ask: is there something specific you want to think through? Because if there\'s a concern, I\'d rather address it now while I have everything pulled up."' },
      { label: 'Step 2: Make the delay cost something', text: '"Here\'s what I want you to know before you go: every month we wait on this, that\'s $[monthly benefit] that doesn\'t come back. That\'s $[annual] this year. I\'m not asking you to make a permanent decision — I\'m asking you to not leave $[amount] on the table. Give me 3 more minutes."' },
    ],
    pillar: 'The Shift',
  },
  {
    id: 'send-something',
    section: 'Stall',
    clientPhrase: '"Can you send me something to look over?"',
    signal: 'red',
    underneath: 'They want to exit the call without saying no. Sending documents rarely leads to a callback.',
    doNotSay: ['"Sure, what\'s your email?" — you are handing them the exit'],
    responses: [
      { text: '"I can get you everything — and I want to make sure it\'s meaningful when you have it. The one thing those documents can\'t tell you is the comparison to what you have now. That\'s what I\'m here for. Give me 3 more minutes and I\'ll walk you through the side-by-side so when you have the documents, you know exactly what you\'re looking at."' },
    ],
    pillar: 'Persuasion',
  },
  {
    id: 'give-plan-id',
    section: 'Stall',
    clientPhrase: '"Give me the plan ID so I can look it up."',
    signal: 'red',
    underneath: 'Exit with a task — they want to leave the call with something to do instead of deciding now.',
    responses: [
      { text: '"I\'ll get you everything before we hang up — and I want to make sure it\'s useful when you have it. The challenge with looking it up on your own is that the plan page doesn\'t show you the comparison to your current plan, and it doesn\'t run your specific doctors or medications. That\'s what I can show you right now. Give me 3 minutes on that first."' },
    ],
    pillar: 'Persuasion',
  },

  // SECTION 4: NETWORK & COVERAGE
  {
    id: 'doctor-said-stay',
    section: 'Network & Coverage',
    clientPhrase: '"My doctor told me I have to stay on my current plan."',
    signal: 'red',
    underneath: 'Doctor\'s office staff almost never understand Medicare plan contracting. The "mandate" is almost certainly misinformation.',
    doNotSay: [
      'Arguing directly with what the doctor\'s office said',
      'Accepting it as true and trying to work around it',
    ],
    responses: [
      { text: '"I hear you — and I want to make sure you have the right information before you decide anything. Let me check Dr. [name]\'s status live right now, while we\'re on the phone. Doctors\' offices sometimes aren\'t up to date on which plans they\'re contracted with — those contracts change every year. Give me 60 seconds."' },
    ],
    pillar: 'Persuasion',
  },
  {
    id: 'lose-medicaid',
    section: 'Network & Coverage',
    clientPhrase: '"I was told I\'d lose my Medicaid if I switch."',
    signal: 'red',
    underneath: 'False fear with very high emotional stakes.',
    responses: [
      { text: '"I completely understand why that would stop you — and I want to make sure you have the right information. Medicaid and your Medicare Advantage plan are two separate programs. Switching your Medicare plan does not affect your Medicaid status. Your Medicaid is based on your income — not which Medicare plan you choose. I can verify your eligibility right now while we\'re on the phone."' },
    ],
    pillar: 'Reframing',
  },
  {
    id: 'denied-before',
    section: 'Network & Coverage',
    clientPhrase: '"I was denied before / I tried this before and it didn\'t work."',
    signal: 'red',
    underneath: 'Past failure experience creating a barrier.',
    responses: [
      { text: '"I hear you — and I want to find out what happened. Eligibility changes every year, and it depends on the specific plan. Just because one plan or one situation said no doesn\'t mean every option in your area says no. I can check eligibility right now for everything available in your zip code."' },
    ],
    pillar: 'Persuasion',
  },
  {
    id: 'no-hmo',
    section: 'Network & Coverage',
    clientPhrase: '"I don\'t want a HMO. I want to be able to see any doctor."',
    signal: 'red',
    underneath: 'Network structure resistance based on incomplete information about plan types.',
    responses: [
      { text: '"That makes sense — and I want to show you what\'s actually available in your area, because PPO and HMO-POS plans exist alongside HMOs and they work very differently. Some give you the flexibility to see any doctor in-network without a referral. Let me check what plan types are available in your zip code before we rule anything out."' },
    ],
    pillar: 'Persuasion',
  },

  // SECTION 5: LOYALTY
  {
    id: 'love-carrier',
    section: 'Loyalty',
    clientPhrase: '"I love [carrier] — they\'ve taken great care of me."',
    signal: 'red',
    underneath: 'This client has connected the brand to their health and safety. Logic will not touch this first. Go in through the loyalty, not against it.',
    doNotSay: [
      'Presenting a competing carrier\'s plan as the first move',
      'Saying their current plan is "inferior" — the call ends',
    ],
    responses: [
      { label: 'Same brand upgrade', text: '"I love that [carrier] has taken great care of you — that matters. My job today isn\'t to move you away from [carrier]. It\'s to make sure you\'re on the right [carrier] plan for this year, because they have multiple plans in your area and some of them pay significantly more. Can I take 2 minutes to show you what else [carrier] has available?"' },
      { label: 'Introducing a different carrier', text: '"I completely respect that. Before you go — on a scale of 1 to 10, how confident are you that your current [carrier] plan is the strongest one available in your area right now? If you\'re a 10, we\'re done. But if there\'s any doubt, let me verify in 60 seconds."' },
    ],
    pillar: 'Reframing',
  },
  {
    id: 'have-agent',
    section: 'Loyalty',
    clientPhrase: '"I have an insurance lady / agent who handles this."',
    signal: 'red',
    underneath: 'Their loyalty is to a person, not a plan. Do not attack that person — you will lose.',
    doNotSay: ['"You should go talk to them." — handing the sale directly to a competitor'],
    responses: [
      { label: 'When a specific gap exists', text: '"I completely respect that loyalty — and I\'m not here to replace anyone. Here\'s what I want you to know: your current plan doesn\'t cover [specific thing]. Your current agent either didn\'t know or didn\'t have access to a plan that fixes this. I\'m not criticizing them — I just want you to have coverage that actually works. Can we fix this today?"' },
      { label: 'No specific gap yet identified', text: '"Your current agent clearly cares about you — and so do I. The difference is I\'m looking at what\'s available right now, and I see $[amount] a month you\'re leaving on the table. A good agent would want you to have that. Let\'s take 2 minutes and look at the numbers."' },
    ],
    pillar: 'Reframing',
  },

  // SECTION 6: TIMING
  {
    id: 'already-signed-up',
    section: 'Timing',
    clientPhrase: '"I already signed up this year — I think I\'m good."',
    signal: 'red',
    underneath: 'The client renewed but may not have compared their options. Auto-renewal is not the same as choosing the best plan.',
    responses: [
      { text: '"That\'s actually good timing — because we\'re in the Open Enrollment Period right now, which means you can make one plan change that takes effect next month. Auto-renewal keeps you on the same plan regardless of what\'s changed. I can run a comparison right now and show you if anything has shifted in your area. If you\'re already on the best plan, I\'ll tell you and we\'re done in 2 minutes."' },
    ],
    pillar: 'Persuasion',
  },
  {
    id: 'next-enrollment',
    section: 'Timing',
    clientPhrase: '"I\'ll do this next open enrollment."',
    signal: 'red',
    underneath: 'Delay stall — they want to push the decision to a future date.',
    responses: [
      { text: '"I hear you — and I want to show you what that wait actually costs. The benefit we\'re talking about is $[monthly]. Between now and next open enrollment is [X] months. That\'s $[X × monthly] you won\'t get back. That money is already funded — it exists right now for people in your zip code. The only question is whether it goes to you or someone else."' },
    ],
    pillar: 'The Shift',
  },
  {
    id: 'procedure-coming',
    section: 'Timing',
    clientPhrase: '"I have a procedure / appointment coming up. I don\'t want to mess up my coverage."',
    signal: 'red',
    underneath: 'Fear of a coverage gap during a critical time.',
    responses: [
      { text: '"Completely valid concern — and here\'s the important thing: your current coverage stays active until the new plan\'s effective date. There is no gap. Your appointment is fully covered under your current plan. Once the new plan starts, [benefit] starts too. You\'re protected the whole way through."' },
    ],
    pillar: 'The Shift',
  },
  {
    id: 'moving-soon',
    section: 'Timing',
    clientPhrase: '"I\'m moving soon. Let me wait until I\'m settled."',
    signal: 'red',
    underneath: 'Timing stall anchored to a life event.',
    responses: [
      { text: '"Where are you moving? Let me check what plans are available there — that way you\'re making a decision based on where you\'re actually going, not a guess. And here\'s what I want you to know: when you move, there\'s a Special Enrollment Period that lets you change plans. So we can lock in your benefit now, you get the money in the meantime, and you adjust the plan when you move."' },
    ],
    pillar: 'The Shift',
  },
  {
    id: 'waiting-medicaid',
    section: 'Timing',
    clientPhrase: '"I\'m waiting to see if I qualify for Medicaid."',
    signal: 'red',
    underneath: 'Stall anchored to an outcome that may already have an answer.',
    responses: [
      { label: 'If Medicaid already said no', text: '"So you\'re waiting for something that\'s already given you an answer. Every month we wait from here is $[monthly benefit] you don\'t get. I want to show you what that number looks like."' },
      { label: 'If still pending', text: '"If Medicaid comes through, we can adjust your plan. If it doesn\'t, you\'re already covered. Either way, the benefit you\'re eligible for right now starts [date]. Every month we wait on the Medicaid answer, that\'s $[monthly] sitting on the table."' },
    ],
    pillar: 'The Shift',
  },

  // SECTION 7: BENEFIT & PLAN COMPARISON
  {
    id: 'want-giveback',
    section: 'Benefit & Plan Comparison',
    clientPhrase: '"I want the Part B Giveback."',
    signal: 'green',
    underneath: 'Motivated, specific — they know what they want.',
    responses: [
      { text: '"A Part B Giveback is real savings — and we\'re going to find you the best one available in your area. One thing I want to make sure of: plans with the highest giveback sometimes have higher copays when you actually use the plan. My job is to find you the plan that puts the most money back overall — not just the biggest number on the monthly summary. Let me pull up what\'s available in your zip code right now."' },
    ],
    pillar: 'The Shift',
  },
  {
    id: 'original-medicare',
    section: 'Benefit & Plan Comparison',
    clientPhrase: '"I want to stick with Original Medicare."',
    signal: 'red',
    underneath: 'Philosophical resistance to Medicare Advantage as a concept.',
    responses: [
      { text: '"I completely understand — a lot of people feel that way, and I want to make sure you\'re making that choice with the full picture. If there\'s a $0 premium plan that includes your doctors, covers your medications, and gives you [benefit], that\'s worth 2 minutes to look at. If it doesn\'t fit, we stay with what you have."' },
    ],
    pillar: 'Persuasion',
  },
  {
    id: 'medigap',
    section: 'Benefit & Plan Comparison',
    clientPhrase: '"I want to stick with my Medigap / Supplement plan."',
    signal: 'red',
    underneath: 'Comfort with the current plan structure and flexibility.',
    responses: [
      { text: '"Medigap does offer great flexibility — and I want to make sure the premium you\'re paying is worth what you\'re getting. Supplement premiums increase every year, and they don\'t cover dental, hearing, or prescriptions. Let me show you whether an Advantage plan in your area could give you those benefits and potentially put money back in your pocket."' },
    ],
    pillar: 'The Shift',
  },
  {
    id: 'no-prescriptions',
    section: 'Benefit & Plan Comparison',
    clientPhrase: '"I don\'t take prescriptions — I don\'t need a Part D plan."',
    signal: 'yellow',
    underneath: 'Logic-based objection, potentially uninformed about late enrollment penalties.',
    responses: [
      { text: '"That\'s great — staying healthy is the goal. Here\'s the thing worth knowing: if you go without Part D coverage for an extended period and need it later, Medicare adds a lifelong late enrollment penalty to your premium. Even a low-cost plan protects you from that — and most Advantage plans include Part D at no extra cost. It\'s about protection, not what you\'re using today."' },
    ],
    pillar: 'The Shift',
  },
  {
    id: 'healthy-dont-need',
    section: 'Benefit & Plan Comparison',
    clientPhrase: '"I\'m healthy — I don\'t need this."',
    signal: 'red',
    underneath: 'Low perceived need for additional coverage.',
    responses: [
      { text: '"I love hearing that — and the goal is to keep it that way. Here\'s what I want to make sure: even if you never need to use the medical side of this plan, there are benefits on it — grocery card, dental, OTC, giveback — that are funded and available to you regardless of your health. That money doesn\'t know whether you\'re healthy or not. It either goes to you every month or it stays unclaimed."' },
    ],
    pillar: 'The Shift',
  },

  // SECTION 8: TRUST & CREDIBILITY
  {
    id: 'is-this-scam',
    section: 'Trust & Credibility',
    clientPhrase: '"How do I know you\'re real? Is this a scam?"',
    signal: 'red',
    underneath: 'Real skepticism, probably justified. Proving legitimacy through action is more powerful than words.',
    doNotSay: ['Getting defensive or listing credentials before addressing the emotional concern'],
    responses: [
      { text: '"I completely understand — and I\'d be careful too. Here\'s what I\'d like to do: let me show you what I can already see in the system before you give me anything. If I can pull up your current plan details, you\'ll know I\'m working in the right place. Everything I do follows Medicare guidelines. Does that seem fair?"' },
    ],
    pillar: 'Persuasion',
  },
  {
    id: 'no-personal-info',
    section: 'Trust & Credibility',
    clientPhrase: '"I don\'t give out personal information over the phone."',
    signal: 'red',
    underneath: 'Trust barrier — they need proof before giving access.',
    responses: [
      { text: '"I completely understand — and I\'m going to show you exactly why you can trust this right now. Here\'s what I\'m going to do: verify your doctors in my system, show you the real numbers for your area, and walk you through what changes and what stays the same. At the end of that 2 minutes, you\'ll have everything you need to make a fully informed decision. Can I have 2 minutes?"' },
    ],
    pillar: 'Persuasion',
  },
  {
    id: 'no-phone-decisions',
    section: 'Trust & Credibility',
    clientPhrase: '"I don\'t like to make decisions over the phone."',
    signal: 'red',
    underneath: 'Almost always about trust, not channel.',
    doNotSay: ['"I\'m not going to push you to decide today if you\'re not ready." — permission-seeking language; kills the same-call close'],
    responses: [
      { text: '"I completely understand — and I\'m going to show you exactly why you can trust this right now. Let me verify your doctors, show you the real numbers, and walk you through what changes and what stays the same. At the end of 2 minutes you\'ll know whether I\'m legitimate because I\'ll have shown you. Can I have 2 minutes?"' },
    ],
    pillar: 'Persuasion',
  },

  // SECTION 9: FAMILY & THIRD PARTY
  {
    id: 'talk-to-family',
    section: 'Family & Third Party',
    clientPhrase: '"I need to talk to my son / daughter / husband first."',
    signal: 'green',
    underneath: 'They\'re interested. They have deferred the final say. The conversation without the agent is where the sale dies.',
    responses: [
      { label: 'Get the third party on now', text: '"I completely understand — and I actually think that\'s the right call. Is [name] available right now? It would take less than 10 minutes and it\'s much easier than playing phone tag. That way they can hear everything directly from me."' },
      { label: 'Arm the caller', text: '"Absolutely. When you talk to [name], here\'s what I want you to be able to tell them: \'I verified my doctor is in-network. My medications are covered. The plan pays $[amount] a year more than what I have now.\' Write that down — those are the three things they\'ll want to know."' },
    ],
    pillar: 'Persuasion',
  },
  {
    id: 'family-will-object',
    section: 'Family & Third Party',
    clientPhrase: '"My family is going to say I shouldn\'t have done this."',
    signal: 'red',
    underneath: 'They said yes but they don\'t have the language to defend it. This is Hollow Yes territory.',
    responses: [
      { text: '"If your family asks why you switched, you can tell them exactly this: \'A licensed agent ran the side-by-side with me. My doctor is confirmed in-network. My medications are covered. I was leaving $[amount] a year on the table — and now I\'m not.\'"' },
    ],
    pillar: 'Persuasion',
  },

  // SECTION 10: CLOSING & RESISTANCE
  {
    id: 'call-you-back',
    section: 'Closing & Resistance',
    clientPhrase: '"I need to call you back." / "Let me call my doctor first."',
    signal: 'red',
    underneath: 'Exit mechanism — they want off the call with a reason to leave.',
    responses: [
      { text: '"I understand — and here\'s what I\'d like to do before you go: let me check Dr. [name] right now while we\'re on the phone. This takes 60 seconds. If they\'re covered, that\'s one call you don\'t have to make. If they\'re not, at least you\'ll know before you call them."' },
    ],
    pillar: 'Persuasion',
  },
  {
    id: 'hard-no',
    section: 'Closing & Resistance',
    clientPhrase: 'Hard No at the end of a call — absolute final refusal',
    signal: 'red',
    underneath: 'True end. Do not argue. Do not push. Exit cleanly.',
    responses: [
      { text: '"I completely respect that — and before we hang up, I want to make sure you know: if your situation changes or your plan changes its benefits next year, you can always call back. My number is [number]. You deserve to have the right plan."' },
    ],
    pillar: 'Persuasion',
  },
]
