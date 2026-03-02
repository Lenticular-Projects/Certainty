'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import PageShell from '@/components/layout/PageShell'
import QuickRefCard from '@/components/ui/QuickRefCard'
import SignalBadge from '@/components/ui/SignalBadge'
import CrossLinks from '@/components/ui/CrossLinks'
import { SPRING } from '@/lib/motion'
import { useSignalHover } from '@/hooks/useSignalHover'
import styles from './page.module.css'

/* ─── Types ─── */
type Signal = 'green' | 'red' | 'yellow'

interface Objection {
  title: string
  signal: Signal
  signalLabel: string
  underneath: string
  doNot?: string[]
  options: Array<{ label: string; text: string }>
}

interface SubType {
  title: string
  description: string
  quote?: string
  note?: string
}

interface CallTypeData {
  title: string
  description: string
  signal: Signal
  pageSignal: 'green' | 'red' | 'yellow' | 'neutral'
  callNumber: number
  quickRef: {
    whoThisIs: string
    firstSignal: string
    primaryPillar: string
    biggestMistake: string
    signal: Signal
  }
  whoThisIs: string[]
  identificationPhrases: string[]
  watchFor?: string
  primaryMove: string[]
  subTypes?: SubType[]
  objections: Objection[]
  fromTheCalls: string
  fromTheCallsBold: string
  crossLinks: Array<{ label: string; href: string }>
}

/* ─── Call type data ─── */
const callTypeData: Record<string, CallTypeData> = {
  'money-caller': {
    title: 'Type 1 \u2014 The Money Caller',
    description: 'They called about a specific benefit. They are the most motivated caller you will get. The danger is not resistance \u2014 it is stopping at Step 2 of the Math Breakdown and assuming the number speaks for itself.',
    signal: 'green',
    pageSignal: 'green',
    callNumber: 1,
    quickRef: {
      whoThisIs: 'Called about a specific benefit (grocery card, OTC, Part B giveback)',
      firstSignal: 'GREEN',
      primaryPillar: 'The Shift (Math Breakdown)',
      biggestMistake: 'Stopping at the monthly number',
      signal: 'green',
    },
    whoThisIs: [
      'They called because of a specific benefit \u2014 the grocery card, the OTC allowance, the Part B giveback, or something they saw on TV. They are the most motivated caller you will get. They are not resistant. They are ready \u2014 as long as you do the math completely and connect it to their life.',
      'The danger with this call type is not resistance. It is the agent stopping at Step 2 of the Math Breakdown and assuming the number speaks for itself. It does not. Step 3 is the close.',
    ],
    identificationPhrases: [
      'I\u2019m calling about the card I saw on TV.',
      'Someone told me I could get money for groceries.',
      'I heard I could get money put back on my Social Security.',
      'I want to see if I qualify for the food card.',
      'I\u2019m calling about the $1,200 a month I saw advertised.',
      'Does Medicare pay you money? I heard it can.',
    ],
    watchFor: 'A Money Caller who has already heard a large number from a commercial \u2014 and is expecting it \u2014 is no longer a pure Type 1. They are now a Type 7 (Commercial Myth Caller) before you\u2019ve said a word. If you hear any version of \u201cthe commercial said...\u201d in the first 30 seconds, defuse the expectation gap first before executing the Math Breakdown.',
    primaryMove: [
      'Full 3-step Math Breakdown. Do not stop at Step 2. Step 3 \u2014 connecting the annual number to something real this specific person told you about their life \u2014 is the close.',
      'Step 1: State the comparison. Current benefit vs. available benefit. Side by side, clear numbers.',
      'Step 2: Annualize it. $35/month sounds minor. $420/year lands. Always multiply by 12.',
      'Step 3: Humanize it. Connect the annual number to something they told you. \u201cYou mentioned your grocery bill. That\u2019s $420 a year going back into that.\u201d This is the close.',
    ],
    objections: [
      {
        title: '\u201cI want the $3,000 card I saw on TV. Yours only has $200.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 expectation mismatch',
        underneath: 'The commercial set an expectation. The reality feels like a downgrade. They\u2019re not being difficult \u2014 they\u2019re disappointed.',
        doNot: [
          '\u201cI don\u2019t control the commercial.\u201d \u2014 surrenders all authority',
          '\u201cThat number isn\u2019t real.\u201d \u2014 shames them for believing it',
          '\u201cWell, $200 is still good.\u201d \u2014 validates their disappointment',
        ],
        options: [
          {
            label: 'Option A \u2014 when the real benefit is solid',
            text: '\u201cYou\u2019re right to call that out \u2014 those commercials show the national maximum, wherever in the country the benefit is highest. Your actual benefit is based on your specific zip code and what plans are available there. What I\u2019m looking at for your area right now is $[amount] \u2014 and that\u2019s real. That hits your card every month starting [date]. The commercial showed the ceiling. I\u2019m showing you your floor \u2014 and it\u2019s real money you can use.\u201d',
          },
          {
            label: 'Option B \u2014 pivot to total value',
            text: '\u201cThat makes sense \u2014 and here\u2019s what those commercials don\u2019t show you. The total value isn\u2019t just one benefit. Let me show you what the full picture looks like for your area.\u201d',
          },
        ],
      },
      {
        title: '\u201cWhat if the benefit isn\u2019t available in my area?\u201d',
        signal: 'green',
        signalLabel: 'GREEN \u2014 qualifying question, not resistance',
        underneath: 'They want to know if this is real for them specifically. This is a motivated buyer, not a skeptic.',
        options: [
          {
            label: 'Correct Response',
            text: '\u201cThat\u2019s exactly why I want to run this for your zip code specifically \u2014 not quote you a national number. Give me 60 seconds and I\u2019ll show you what\u2019s actually available where you are. The commercial showed the ceiling. What I\u2019m about to show you is the floor \u2014 real money, real date, your area.\u201d',
          },
        ],
      },
      {
        title: '\u201cI heard the card pays for rent and utilities. Does this one do that?\u201d',
        signal: 'green',
        signalLabel: 'GREEN with expectation gap',
        underneath: 'They want to know if the card is flexible. This is not resistance \u2014 this is a motivated buyer asking a qualifying question.',
        options: [
          {
            label: 'Correct Response',
            text: '\u201cGreat question \u2014 and the answer depends on the specific plan. Some flex cards in your area cover groceries, OTC health items, utilities, and in some cases rent or transportation. Let me check exactly what\u2019s included for your zip code right now \u2014 that way you know exactly what you\u2019re getting before we do anything.\u201d',
          },
        ],
      },
    ],
    fromTheCalls: 'Agents who found the benefit the client called about, presented the monthly number, and stopped \u2014 only to watch the client stall or walk. And agents who gave up the moment the specific benefit wasn\u2019t available, without pivoting to the real financial value still on the table.',
    fromTheCallsBold: 'The monthly number is not the close. Step 3 is the close.',
    crossLinks: [
      { label: 'The Math Breakdown', href: '/math-breakdown' },
      { label: 'The Shift (Pillar 3)', href: '/pillars/the-shift' },
      { label: 'Type 7 \u2014 Commercial Myth Caller', href: '/call-types/commercial-myth-caller' },
      { label: 'Pattern 2 \u2014 Incomplete Math Breakdown', href: '/patterns/incomplete-math-breakdown' },
    ],
  },

  'scared-switcher': {
    title: 'Type 2 \u2014 The Scared Switcher',
    description: 'Interested but afraid of losing something. Fear is the objection \u2014 not the words they say. The words are a cover. Name the fear before presenting anything.',
    signal: 'red',
    pageSignal: 'red',
    callNumber: 2,
    quickRef: {
      whoThisIs: 'Interested but afraid of losing their doctor, plan, or carrier',
      firstSignal: 'RED from the start',
      primaryPillar: 'Reframing',
      biggestMistake: 'Logic response to an emotional objection',
      signal: 'red',
    },
    whoThisIs: [
      'Interested but afraid of losing something. Their doctor. Their plan. Their carrier. Their \u201cinsurance lady.\u201d Fear is the objection \u2014 not the words they say. The words are a cover. Fear of change, fear of loss, fear of making a mistake that hurts their health or their routine.',
      'The three variations under this type share the same first move: name the fear before you present anything. An agent who leads with math on a Scared Switcher will lose the call. The emotion has to be addressed first, or nothing else lands.',
    ],
    identificationPhrases: [
      'I\u2019m happy with what I have.',
      'I\u2019ve had this plan for years and it works for me.',
      'I don\u2019t want to change.',
      'The devil you know is better than the devil you don\u2019t.',
      'I love [carrier] \u2014 they\u2019ve taken care of me.',
      'I need to talk to my insurance lady first.',
      'My daughter set this up for me and I don\u2019t want to mess with it.',
    ],
    primaryMove: [
      'Name the fear before presenting anything. Do not lead with logic, math, or product information.',
      '\u201cI hear you \u2014 you\u2019ve had something that\u2019s worked and you don\u2019t want to risk it. What I\u2019m showing you doesn\u2019t take that away. It adds to it.\u201d',
    ],
    subTypes: [
      {
        title: 'Core Scared Switcher \u2014 afraid of change in general',
        description: 'First move: validate the instinct, then reframe what change means.',
        quote: '\u201cI hear you \u2014 you\u2019ve had something that\u2019s worked and you don\u2019t want to risk it. What I\u2019m showing you doesn\u2019t take that away. It adds to it.\u201d',
      },
      {
        title: 'Brand Loyalist \u2014 attached to a specific carrier',
        description: 'Never attack the brand. Upgrade within it.',
        quote: '\u201cMy job is to make sure you\u2019re on the right Humana plan for this year \u2014 they have several in your area and some pay significantly more than others.\u201d',
        note: 'Never call their current plan \u201cinferior.\u201d One agent did exactly that. The client said \u201cOK\u201d and hung up within seconds. When you insult a client\u2019s plan, they defend it \u2014 because defending the plan means defending their own past decision.',
      },
      {
        title: 'Relationship Loyalist \u2014 loyal to a person',
        description: 'Reframe the person\u2019s limitations without attacking them.',
        quote: '\u201cYour current agent either didn\u2019t have access to all the carriers or didn\u2019t know this was available. I do.\u201d',
        note: 'Never tell them to go talk to that person \u2014 that hands the sale to a competitor. From real calls: an agent agreed the client should \u201cgo talk to her insurance lady.\u201d That was the sale, handed directly to a competitor.',
      },
    ],
    objections: [
      {
        title: '\u201cI don\u2019t want to change. My plan works.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 fear of change',
        underneath: 'They have connected their current plan to their health and their safety. \u201cMy plan works\u201d means \u201cI\u2019m afraid something will stop working if I change.\u201d',
        doNot: [
          'Explaining why the new plan is better \u2014 logic against fear does not work',
          '\u201cBut your plan is costing you money.\u201d \u2014 sounds like an attack; they defend it',
          '\u201cYou\u2019re missing out on a lot of benefits.\u201d \u2014 they hear criticism, not opportunity',
        ],
        options: [
          {
            label: 'Option A \u2014 reframe what switching means',
            text: '\u201cI completely hear you \u2014 and I\u2019m not asking you to risk anything that\u2019s working. What I want to do is take 90 seconds and show you what you currently have compared to what\u2019s available. If it\u2019s not better, I\u2019ll tell you. But I\u2019d rather you know the number than not know it. Fair?\u201d',
          },
          {
            label: 'Option B \u2014 for long-term plan holders',
            text: '\u201cThree years on the same plan tells me you\u2019re not someone who makes changes for no reason \u2014 and I\u2019m not going to ask you to. What I am going to do is show you what that plan has cost you over those three years compared to what was available. If the numbers don\u2019t make sense, we close the call and you keep what you have.\u201d',
          },
        ],
      },
      {
        title: 'Brand Loyalist: \u201cI love [Carrier]. I\u2019m not switching.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 brand loyalty',
        underneath: 'Their identity is partly tied to their carrier. Attacking the carrier attacks them.',
        options: [
          {
            label: 'Option A \u2014 upgrade within the same carrier',
            text: '\u201cI completely respect that \u2014 and I\u2019m not asking you to leave [carrier]. I\u2019m calling to make sure you\u2019re on the right [carrier] plan for this year. They have multiple plans in your area and some pay significantly more than others. Can I take 2 minutes to show you what else [carrier] has available?\u201d',
          },
          {
            label: 'Option B \u2014 introducing a different carrier',
            text: '\u201cI completely respect that. Before you go \u2014 I\u2019m looking at your current plan and I\u2019m seeing $[amount] a year you\u2019re not getting. If I can show you a plan where your exact doctors are covered and the number is better, would you at least want to see the comparison? You make the call. I just want you to have the full picture.\u201d',
          },
        ],
      },
      {
        title: 'Relationship Loyalist: \u201cI have an insurance lady who handles this.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 person loyalty',
        underneath: 'Their loyalty is to a person, not a plan. Do not attack that person \u2014 you will lose.',
        doNot: [
          '\u201cYou should go talk to them.\u201d \u2014 handing the sale directly to a competitor',
          'Criticizing the other agent openly \u2014 they will defend the person they trust',
        ],
        options: [
          {
            label: 'Option A \u2014 when a specific gap exists',
            text: '\u201cI completely respect that loyalty \u2014 and I\u2019m not here to replace anyone. Here\u2019s what I want you to know: your current plan doesn\u2019t cover [specific thing]. Your current agent either didn\u2019t know or didn\u2019t have access to a plan that fixes this. I\u2019m not criticizing them \u2014 I just want you to have coverage that actually works. Can we fix this today?\u201d',
          },
          {
            label: 'Option B \u2014 no specific gap yet identified',
            text: '\u201cYour current agent clearly cares about you \u2014 and so do I. The difference is I\u2019m looking at what\u2019s available right now, and I see $[amount] a month you\u2019re leaving on the table. A good agent would want you to have that. Let\u2019s take 2 minutes and look at the numbers.\u201d',
          },
        ],
      },
    ],
    fromTheCalls: 'An agent told a Brand Loyalist their plan was \u201cinferior.\u201d The client said \u201cOK\u201d and hung up in seconds. Another agent agreed a client should talk to their \u201cinsurance lady\u201d and set a callback \u2014 handing the sale directly to a competitor who was already in the door.',
    fromTheCallsBold: 'The first move on a Scared Switcher is always the same: name the fear before you present anything.',
    crossLinks: [
      { label: 'Reframing (Pillar 2)', href: '/pillars/reframing' },
      { label: 'Pattern 3 \u2014 Logic Responses', href: '/patterns/logic-responses' },
      { label: 'Type 4 \u2014 Third Party Controlled', href: '/call-types/third-party-controlled' },
      { label: 'Three Client Signals', href: '/signals' },
    ],
  },

  'misinformed': {
    title: 'Type 3 \u2014 The Misinformed Caller',
    description: 'Operating on false information from someone they trusted. The false belief is the wall. Nothing works until it comes down \u2014 and it has to come down without making them feel stupid for believing it.',
    signal: 'green',
    pageSignal: 'red',
    callNumber: 3,
    quickRef: {
      whoThisIs: 'Operating on false information from a trusted source',
      firstSignal: 'RED',
      primaryPillar: 'Reframing + Persuasion',
      biggestMistake: 'Building the sale on a false foundation',
      signal: 'red',
    },
    whoThisIs: [
      'Operating on false information from someone they trusted \u2014 a doctor\u2019s office receptionist, a family member, a previous agent, a TV commercial. The false belief is the wall. No selling works until it comes down. And it has to come down without making them feel stupid for believing it.',
      'The tool is live verification. \u201cLet me check that right now while we\u2019re on the phone.\u201d The screen is the authority \u2014 not the agent\u2019s word against theirs.',
    ],
    identificationPhrases: [
      'My doctor said I can\u2019t change my plan.',
      'I heard if I switch I lose my doctor.',
      'My daughter told me this plan is the best one.',
      'A and B is all I need \u2014 they said so on TV.',
      'The other agent told me I can\u2019t do better than what I have.',
    ],
    primaryMove: [
      'Live verification using your system access as the authority. \u201cLet me check that right now while we\u2019re on the phone.\u201d You are not arguing with them \u2014 you are showing them. The screen is the authority, not you vs. them.',
    ],
    objections: [
      {
        title: '\u201cMy doctor said I have to stay on my current plan.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 authority-based false belief',
        underneath: 'A trusted authority (their doctor, or more often a receptionist) told them something incorrect. Their loyalty to that source is higher than their skepticism of the claim.',
        doNot: [
          '\u201cNo, ma\u2019am, that\u2019s not true.\u201d \u2014 confrontational; triggers defensiveness',
          '\u201cYour doctor is wrong.\u201d \u2014 attacking a trusted relationship; call ends',
          'Accepting it and trying to work around it \u2014 you are building on sand',
        ],
        options: [
          {
            label: 'Option A',
            text: '\u201cI hear you \u2014 and your doctor\u2019s office knows your health better than anyone. What they may not have meant is that you\u2019re locked out of better coverage. Doctors\u2019 offices sometimes say that to mean \u2018we work with your current plan\u2019 \u2014 not that other plans don\u2019t cover you. Let me check your doctor\u2019s network status right now, live, so we\u2019re both looking at the same thing. This takes 60 seconds.\u201d',
          },
          {
            label: 'Option B \u2014 when verification confirms the doctor is covered',
            text: '\u201cI\u2019ve got Dr. [name] right here \u2014 they\u2019re in-network with this plan. Same doctor, same care. What changes is that you also get [benefit]. The concern your doctor\u2019s office had? It\u2019s resolved. Do you want to take a look at the plan?\u201d',
          },
        ],
      },
      {
        title: '\u201cI was told if I switch I lose my doctor.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 network fear',
        underneath: 'Fear of disrupting medical care. This is real. Respect it \u2014 then resolve it live.',
        options: [
          {
            label: 'Correct Response',
            text: '\u201cThat\u2019s exactly what I want to verify before we do anything. Tell me who you see regularly and I\u2019ll check them right now while we\u2019re on the phone. If your doctor isn\u2019t covered, I\u2019ll tell you and we stop there. If they are \u2014 and I\u2019m expecting they will be \u2014 then that concern is resolved and we can look at what\u2019s available.\u201d',
          },
        ],
      },
      {
        title: '\u201cA and B is all I need \u2014 they said so on TV.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 deceived by advertising',
        underneath: 'They called based on a TV ad. They feel misled now that the reality is more complex. If this is the primary reason they called, you are likely in a Type 7 (Commercial Myth Caller) call.',
        options: [
          {
            label: 'Correct Response',
            text: '\u201cYou\u2019re right that Parts A and B are the foundation \u2014 and for some people, that\u2019s fine. What I want to show you is what A and B don\u2019t cover, because that\u2019s where people get hit with unexpected costs. Your out-of-pocket on A and B alone can be over $9,000 in a bad year. Medicare Advantage puts a cap on that. Let me show you the side-by-side in your zip code.\u201d',
          },
        ],
      },
      {
        title: '\u201cMy family member / previous agent told me this wasn\u2019t worth it.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 second-hand misinformation',
        underneath: 'Someone they trust told them something that may have been true for a different zip code, a different year, or a different plan \u2014 or may simply have been wrong.',
        options: [
          {
            label: 'Correct Response',
            text: '\u201cI completely understand why you\u2019d rely on someone you trust \u2014 and I\u2019m not here to criticize them. What I\u2019d ask is this: let me run your specific information right now, for your zip code and your doctors, and show you what\u2019s actually available today. If they were right, I\u2019ll tell you. If there\u2019s something they missed, I\u2019ll show you. 60 seconds.\u201d',
          },
        ],
      },
    ],
    fromTheCalls: 'A client believed their doctor had \u201cmandated\u201d they stay on their current plan \u2014 false information from a receptionist. The receptionist meant \u201cwe work with your current plan,\u201d not \u201cyou cannot switch.\u201d The agent who ran the live check while the client was on the phone resolved the objection in under 90 seconds. The agent who accepted it and tried to work around it lost the call.',
    fromTheCallsBold: 'Do not build on a false foundation. Verify live and let the screen resolve it.',
    crossLinks: [
      { label: 'Reframing (Pillar 2)', href: '/pillars/reframing' },
      { label: 'Persuasion (Pillar 1)', href: '/pillars/persuasion' },
      { label: 'Pattern 8 \u2014 Accepting Misinformation', href: '/patterns/accepting-misinformation' },
      { label: 'Type 7 \u2014 Commercial Myth Caller', href: '/call-types/commercial-myth-caller' },
    ],
  },

  'third-party-controlled': {
    title: 'Type 4 \u2014 Third Party Controlled',
    description: 'The person on the phone is not the one making the decision. The goal is to get the real decision maker into this conversation before you hang up \u2014 or arm the caller with the exact language they need.',
    signal: 'red',
    pageSignal: 'green',
    callNumber: 4,
    quickRef: {
      whoThisIs: 'The person on the phone is not the decision maker',
      firstSignal: 'GREEN + gatekeeper',
      primaryPillar: 'Persuasion',
      biggestMistake: 'Selling to the wrong person',
      signal: 'green',
    },
    whoThisIs: [
      'The person on the phone is not the one making the decision. A spouse, adult child, sibling, or caregiver holds the real authority. The client will say yes \u2014 and then check with that person after the agent hangs up. That conversation, without the agent in it, is where the sale dies.',
      'The goal: before hanging up, the third party has heard the case directly from the agent. Either get them on the call now, or arm the primary caller with the exact language they need for that conversation.',
    ],
    identificationPhrases: [
      'I need to talk to my daughter first.',
      'My son handles all my financial stuff.',
      'I want to check with my husband.',
      'Let me have my son call you back.',
      'I don\u2019t make any decisions without my sister.',
      'My caregiver helps me with this kind of thing.',
    ],
    primaryMove: [
      'Identify the real decision maker early. Get them on the call \u2014 or sell to both simultaneously.',
      '\u201cI completely understand. Is [daughter/son/spouse] available right now? It would take less than 10 minutes and it\u2019s easier than playing phone tag \u2014 that way they can hear everything directly and ask me any questions.\u201d',
      'If they cannot get on the call now, arm the primary caller:',
      '\u201cWhen you talk to [them], here\u2019s exactly what to say: \u2018A licensed agent ran the side-by-side comparison with me. My doctor is confirmed in-network. My medications are covered. The benefit comes to $[amount] a year. They can call the agent directly if they want to go through it.\u2019\u201d',
    ],
    objections: [
      {
        title: '\u201cI need to talk to my daughter / son first.\u201d',
        signal: 'green',
        signalLabel: 'GREEN with gatekeeper',
        underneath: 'They are interested. They just have deferred the final say to someone else. This is often protective instinct \u2014 they do not want to make a mistake that the family member will question.',
        doNot: [
          '\u201cOf course \u2014 have them give me a call.\u201d \u2014 the agent is now out of the conversation',
          'Scheduling a callback without arming the caller \u2014 they will have a conversation you are not in',
          'Agreeing to send information \u201cto look over\u201d \u2014 the sale dies in the mailbox',
        ],
        options: [
          {
            label: 'Option A \u2014 get the third party on now',
            text: '\u201cI completely understand \u2014 and I actually think that\u2019s the right call. Is [name] available right now? It would take less than 10 minutes and it\u2019s much easier than playing phone tag. That way they can hear everything directly from me and ask any questions they have.\u201d',
          },
          {
            label: 'Option B \u2014 arm the caller if the third party isn\u2019t available',
            text: '\u201cAbsolutely. When you talk to [name], here\u2019s what I want you to be able to tell them: \u2018I verified my doctor is in-network. My medications are covered. The plan pays $[amount] a year more than what I have now.\u2019 Write that down \u2014 those are the three things they\u2019ll want to know. And here\u2019s my direct number if they want to call me.\u201d',
          },
        ],
      },
      {
        title: 'Third party joins and is skeptical.',
        signal: 'red',
        signalLabel: 'RED from the third party',
        underneath: 'They\u2019re protecting their family member. They didn\u2019t hear the full call. They\u2019re starting from zero \u2014 and they may have heard previous scam calls.',
        doNot: [
          'Being defensive or dismissive of their skepticism',
          'Trying to rush through the case because the call is already long',
          'Addressing the primary caller while the third party is on \u2014 talk to the room',
        ],
        options: [
          {
            label: 'Correct Response',
            text: '\u201c[Name], I\u2019m glad you could join \u2014 your [mother/father] made a great call to include you. Let me take 90 seconds and run through exactly what we found, because I\u2019d rather you hear it directly than second-hand. [Primary caller\u2019s] doctor [name] is confirmed in-network. Their medications are covered. The plan we\u2019re looking at pays $[amount] more per year than what they currently have. Does that math make sense to you, or do you want me to walk through any part of it?\u201d',
          },
        ],
      },
      {
        title: '\u201cMy spouse handles the finances. They\u2019re not home right now.\u201d',
        signal: 'green',
        signalLabel: 'GREEN with timing constraint',
        underneath: 'They want to include someone who handles financial decisions. The window of availability is the constraint.',
        options: [
          {
            label: 'Correct Response',
            text: '\u201cGot it \u2014 when is [spouse] usually home? I\u2019d love to get them on a quick call together so I can walk you both through it at the same time. It takes less than 10 minutes and I can answer their questions directly. What time works?\u201d',
          },
        ],
      },
    ],
    fromTheCalls: 'A client who was interested, said yes, then mentioned she\u2019d need to \u201crun it by her son.\u201d The agent said \u201cno problem, have him call.\u201d The son never called \u2014 and the client disenrolled two weeks later because the son had concerns nobody had addressed. The enrollment was real. The close confirmation was not complete.',
    fromTheCallsBold: 'Getting the third party on the call is not optional. It is the difference between an enrollment and a disenrollment.',
    crossLinks: [
      { label: 'Persuasion (Pillar 1)', href: '/pillars/persuasion' },
      { label: 'Pattern 7 \u2014 Third Party Blind Spot', href: '/patterns/third-party-blind-spot' },
      { label: 'Close Confirmation', href: '/close-confirmation' },
      { label: 'Type 2 \u2014 Scared Switcher', href: '/call-types/scared-switcher' },
    ],
  },

  'detail-staller': {
    title: 'Type 5 \u2014 The Detail Staller',
    description: 'They want more information before deciding. The problem is that giving them more information is the wrong move. Make inaction expensive in specific dollars \u2014 then close.',
    signal: 'yellow',
    pageSignal: 'yellow',
    callNumber: 5,
    quickRef: {
      whoThisIs: 'Wants more information before deciding \u2014 deferring, not deciding',
      firstSignal: 'GREEN / RED mix',
      primaryPillar: 'The Shift',
      biggestMistake: 'Giving them something to research',
      signal: 'yellow',
    },
    whoThisIs: [
      'They want more information before deciding. They are not resistant \u2014 they are deferring. The words sound like curiosity but the behavior is avoidance. They will request plan documents, a website, a plan ID number, or a callback when they\u2019ve \u201chad time to look it over.\u201d',
      'The problem: every one of those requests removes the agent from the conversation and puts the client alone with their doubts and whoever else they happen to talk to. Giving a staller more information does not help them decide. It gives them more things to question.',
    ],
    identificationPhrases: [
      'Can you send me something to look over?',
      'I want to think about it.',
      'What\u2019s the plan ID so I can look it up?',
      'I\u2019d like to read the materials before I do anything.',
      'Let me do a little research and call you back.',
      'I just want to make sure I\u2019m making the right decision.',
    ],
    primaryMove: [
      'Make inaction expensive in specific dollars. Then close.',
      'Do not provide the plan ID. Do not agree to mail documents. Do not schedule a callback without a specific number on the table that makes waiting cost something.',
      '\u201cI completely understand wanting to be sure \u2014 and I want to make sure you\u2019re making the right call too. Here\u2019s what I want you to know before we hang up: every month we wait on this, that\u2019s $[monthly benefit] that doesn\u2019t come back. $[annual] this year that you don\u2019t get. I\u2019m not asking you to make a permanent decision \u2014 I\u2019m asking you to not leave $[amount] on the table. Let\u2019s take 3 more minutes and make sure the numbers work. If they don\u2019t, I\u2019ll tell you.\u201d',
    ],
    objections: [
      {
        title: '\u201cI want to think about it.\u201d',
        signal: 'yellow',
        signalLabel: 'GREEN / RED mix \u2014 classic stall',
        underneath: 'They don\u2019t have a specific objection. They have ambient discomfort with committing. This often means the agent has not yet made inaction expensive enough.',
        doNot: [
          '\u201cOf course \u2014 take your time.\u201d \u2014 you are agreeing with the stall',
          '\u201cI\u2019ll call you back next week.\u201d \u2014 you lose control of timing and follow-through',
          'Asking what they need to think about without giving them a number first \u2014 opens an unlimited objection window',
        ],
        options: [
          {
            label: 'Correct Response',
            text: '\u201cI completely hear you \u2014 and the reason I want to keep going for 2 more minutes isn\u2019t to pressure you. It\u2019s because I want you to know what you\u2019re thinking about. Right now, you have $[amount] available that you\u2019re not getting. Every month you think about it, that\u2019s $[monthly]. That\u2019s real money. If the answer after 2 more minutes is still no, I respect that \u2014 but at least you\u2019ll know what the no costs you.\u201d',
          },
        ],
      },
      {
        title: '\u201cCan you send me the plan documents to look over?\u201d',
        signal: 'yellow',
        signalLabel: 'GREEN / RED \u2014 exit request disguised as interest',
        underneath: 'They want to exit the call without saying no. Sending documents is a polite way to defer.',
        doNot: [
          '\u201cSure, what\u2019s your email?\u201d \u2014 you are handing them the exit',
          '\u201cI\u2019ll put something in the mail.\u201d \u2014 the sale dies in their mailbox',
        ],
        options: [
          {
            label: 'Correct Response',
            text: '\u201cI can absolutely get you the plan documents \u2014 and I want to make sure they\u2019re meaningful when you read them. The one thing those documents can\u2019t tell you is the comparison to what you have now. That\u2019s what I\u2019m here for. Give me 3 more minutes and I\u2019ll walk you through the side-by-side so when you read the documents, you know exactly what you\u2019re looking at.\u201d',
          },
        ],
      },
      {
        title: '\u201cGive me the plan ID so I can look it up.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 exit with a task',
        underneath: 'They want a callback mechanism that never happens. Most clients who request a plan ID to \u201clook it up\u201d do not look it up.',
        doNot: [
          'Just giving the plan ID and ending the call \u2014 you are done',
          'Giving the website and saying \u201ceverything is on there\u201d \u2014 same result',
        ],
        options: [
          {
            label: 'Correct Response',
            text: '\u201cI\u2019ll get you everything you need before we hang up \u2014 and I want to make sure it\u2019s useful when you have it. The challenge with looking it up on your own is that the plan page doesn\u2019t show you the comparison to your current plan, and it doesn\u2019t run your specific doctors or medications. That\u2019s what I can show you right now. Give me 3 minutes on that first \u2014 then I\u2019ll give you everything.\u201d',
          },
        ],
      },
    ],
    fromTheCalls: 'Every agent who has agreed to \u201csend something\u201d and scheduled a callback has experienced the same thing: the client does not call back. The information arrives. It sits. The opportunity closes. The one thing that was working was the agent on the phone with the client making the numbers real. That ends the moment you agree to a callback without making inaction expensive first.',
    fromTheCallsBold: 'Make inaction expensive in specific dollars. Then close.',
    crossLinks: [
      { label: 'The Shift (Pillar 3)', href: '/pillars/the-shift' },
      { label: 'Pattern 9 \u2014 The Hollow Yes', href: '/patterns/hollow-yes' },
      { label: 'Close Confirmation', href: '/close-confirmation' },
      { label: 'Type 9 \u2014 Timing Objector', href: '/call-types/timing-objector' },
    ],
  },

  'time-bomb': {
    title: 'Type 6 \u2014 The Time Bomb',
    description: 'They\u2019re open and motivated \u2014 but they have a hard constraint. A deadline, an upcoming procedure, a ride coming in 10 minutes. Do not spend time on rapport. Identify the constraint and accelerate.',
    signal: 'yellow',
    pageSignal: 'yellow',
    callNumber: 6,
    quickRef: {
      whoThisIs: 'Open and motivated but with a hard time constraint',
      firstSignal: 'GREEN + countdown',
      primaryPillar: 'Refocusing',
      biggestMistake: 'Spending time on rapport when the clock is running',
      signal: 'yellow',
    },
    whoThisIs: [
      'They\u2019re open and motivated \u2014 but they have a hard constraint. A deadline, an upcoming medical procedure, a caregiver arriving, a ride coming in 10 minutes. The urgency is real and it can work for you or against you. The mistake is not recognizing it and treating this call like a standard enrollment.',
    ],
    identificationPhrases: [
      'I only have a few minutes \u2014 my ride is coming.',
      'I have a doctor\u2019s appointment this afternoon.',
      'I don\u2019t have a lot of time today.',
      'I have a procedure scheduled next month.',
      'My enrollment deadline is coming up.',
      'I\u2019m not feeling well \u2014 can we make this quick?',
    ],
    primaryMove: [
      'Identify the constraint immediately. Acknowledge it. Then use it as the reason to accelerate \u2014 not the reason to reschedule.',
      '\u201cI hear you \u2014 we don\u2019t have much time. Here\u2019s what I want to do: I\u2019ll skip everything that\u2019s not essential and take you straight to the number. Tell me the one benefit you care most about and I\u2019ll show you if it\u2019s available for your zip code. That takes 4 minutes. If it works, we can get you set up before your ride comes.\u201d',
    ],
    objections: [
      {
        title: '\u201cI only have a few minutes / my ride is coming.\u201d',
        signal: 'green',
        signalLabel: 'GREEN with time constraint',
        underneath: 'They called because they wanted to call. The time constraint is real \u2014 use it as urgency, not as a reason to end the call.',
        doNot: [
          '\u201cNo problem \u2014 should I call you back?\u201d \u2014 you lose the momentum that got them to call',
          'Spending any time on rapport or discovery that doesn\u2019t accelerate toward the close',
          'Ignoring the constraint and running a full-length call \u2014 they will have to hang up on you',
        ],
        options: [
          {
            label: 'Correct Response',
            text: '\u201cPerfect \u2014 I\u2019ll make this fast. Tell me the one thing you most want out of a new plan and I\u2019ll go straight there. We can get this done before your ride comes.\u201d Then move directly to the most relevant benefit, run the minimum viable Math Breakdown (Steps 1 and 2 at minimum), and go for the close.',
          },
        ],
      },
      {
        title: '\u201cI\u2019m not feeling well / I\u2019m tired.\u201d',
        signal: 'yellow',
        signalLabel: 'YELLOW \u2014 energy constraint',
        underneath: 'They called in a window of motivation. That window is closing. This is not the moment for rapport.',
        doNot: [
          '\u201cOh no, I hope you feel better! Let\u2019s reschedule.\u201d \u2014 losing the window',
          'A long call that exhausts them further',
        ],
        options: [
          {
            label: 'Correct Response',
            text: '\u201cI completely understand \u2014 and I don\u2019t want to make this harder on you. Here\u2019s where we are: I\u2019ve already confirmed your doctor is covered and the benefit comes out to $[amount] a year. When you\u2019re feeling better, we can finish this in under 5 minutes because the work is already done. What time tomorrow would be best?\u201d',
          },
        ],
      },
      {
        title: '\u201cI have a procedure coming up \u2014 I don\u2019t want to change anything right now.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 timing fear',
        underneath: 'They\u2019re worried switching will disrupt their upcoming medical care. This is legitimate \u2014 but often unfounded. The coverage date is what matters, not the call date.',
        options: [
          {
            label: 'Correct Response',
            text: '\u201cThat\u2019s exactly the right concern to have \u2014 and I want to check something with you. Have you verified your surgeon is covered under your current plan? Because that\u2019s the one thing that actually matters for your procedure.\u201d If you run the check and the surgeon is covered on the new plan: \u201cYour surgeon is in-network on both plans. What changes is that you\u2019re also picking up [benefit]. The procedure is covered. The worry is resolved. We can get this done in 5 minutes.\u201d',
          },
        ],
      },
    ],
    fromTheCalls: 'A client called with 10 minutes before her ride arrived. She was motivated. The agent spent the first 5 minutes on rapport and discovery. When the ride arrived, the client had to hang up. There was no follow-up. The call \u2014 and the enrollment \u2014 was lost to a time constraint the agent created by not accelerating.',
    fromTheCallsBold: 'The Time Bomb calls you about a benefit. The clock is an ally if you use it. It becomes the enemy if you ignore it.',
    crossLinks: [
      { label: 'Refocusing (Pillar 4)', href: '/pillars/refocusing' },
      { label: 'Math Breakdown', href: '/math-breakdown' },
      { label: 'Pattern 5 \u2014 System Navigation Dead Air', href: '/patterns/system-navigation-dead-air' },
      { label: 'Close Confirmation', href: '/close-confirmation' },
    ],
  },

  'commercial-myth-caller': {
    title: 'Type 7 \u2014 Commercial Myth Caller',
    description: 'Their expectations were set by television. They called because a commercial promised a number that doesn\u2019t match reality. Join the frustration. Become the ally. Then redirect to what\u2019s real.',
    signal: 'red',
    pageSignal: 'red',
    callNumber: 7,
    quickRef: {
      whoThisIs: 'Called based on a TV commercial that set unrealistic expectations',
      firstSignal: 'RED (betrayal)',
      primaryPillar: 'Reframing',
      biggestMistake: 'Defending the system or correcting them directly',
      signal: 'red',
    },
    whoThisIs: [
      'Their expectations were set by television advertising. They called because a commercial promised $6,000, $900, or some other number that doesn\u2019t match reality for their zip code or plan options. They are not resistant \u2014 they are confused and feel deceived. The wrong response makes the agent part of the betrayal.',
      'Type 7 is often a Type 1 that got burned first. Type 7 is not a different kind of person from the Money Caller \u2014 it\u2019s what happens to a Type 1 after the commercial set an expectation reality can\u2019t keep. The caller is the same motivated person. Once you defuse the frustration and anchor them on what\u2019s real, you run the same playbook as Type 1 \u2014 full Math Breakdown.',
    ],
    identificationPhrases: [
      'The commercial said I could get $900 a month.',
      'I saw on TV that Medicare pays you money.',
      'They advertised a $6,000 benefit \u2014 where is that?',
      'The man on TV said to call this number for the $1,200 check.',
      'Why is what you\u2019re offering so much less than what the commercial showed?',
    ],
    primaryMove: [
      'Join their frustration before presenting anything. Become the ally against the misleading commercial \u2014 not the defender of the system. Then redirect toward what\u2019s real and available right now in their area.',
      '\u201cYou\u2019re right to be frustrated \u2014 and I want to be straight with you. Those commercials show the national maximum, which is the highest benefit available anywhere in the country. Your actual benefit is based on your zip code and what plans are available there. What I\u2019m going to show you is the real number \u2014 what\u2019s actually available for you right now. That\u2019s a different conversation than what those commercials are having.\u201d',
    ],
    objections: [
      {
        title: '\u201cThe commercial showed $6,000 / $900 / $1,200. Why is yours less?\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 expectation mismatch and betrayal',
        underneath: 'They feel lied to. They need someone to validate that feeling \u2014 and then give them something real.',
        doNot: [
          '\u201cI don\u2019t control the commercial.\u201d \u2014 abandons all authority; you are now nobody on this call',
          '\u201cThat\u2019s not how it works.\u201d \u2014 shames them for believing it; call ends',
          'Defending the system in any way \u2014 you are now part of what betrayed them',
        ],
        options: [
          {
            label: 'Option A',
            text: '\u201cYou\u2019re right to be frustrated \u2014 and I want to be straight with you. Those commercials show the national maximum, which is the highest benefit available anywhere in the country. Your actual benefit is based on your specific zip code and the plans available there. What I\u2019m looking at for your area right now is $[amount] \u2014 and that\u2019s real. That hits your card every month starting [date]. The commercial showed the ceiling. I\u2019m showing you your floor \u2014 and it\u2019s real money you can use.\u201d',
          },
          {
            label: 'Option B \u2014 when the real benefit is genuinely good',
            text: '\u201cHere\u2019s what those commercials don\u2019t show you. The total value isn\u2019t just one benefit. By the time we add up the Part B giveback, the grocery card, the dental, and the OTC allowance \u2014 the number in your area is actually [amount] a year. That\u2019s not what they advertised. It\u2019s what\u2019s actually available for you.\u201d',
          },
        ],
      },
      {
        title: '\u201cYou\u2019re just like the others. This sounds like a scam.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 trust collapse',
        underneath: 'They\u2019ve been burned before, possibly multiple times. They grouped you with the commercials before you said a word.',
        doNot: [
          'Defending yourself \u2014 \u201cNo, I\u2019m legitimate\u201d \u2014 anyone running a scam says this too',
          'Getting defensive \u2014 it confirms their suspicion',
          'Moving past the distrust to the pitch \u2014 they are not ready',
        ],
        options: [
          {
            label: 'Correct Response',
            text: '\u201cI completely understand why you\u2019d feel that way \u2014 and I\u2019m not going to ask you to take my word for it. What I want to do is verify one thing for you, live on the phone right now. Tell me your primary care doctor\u2019s name. I\u2019ll look them up in our system and show you exactly whether they\u2019re in-network. No pitch. Just the check. If they\u2019re not there, we stop. If they are, then at least you know what\u2019s actually in front of you.\u201d',
          },
        ],
      },
      {
        title: '\u201cThe commercial said anyone on Medicare qualifies. Does everyone get the same amount?\u201d',
        signal: 'green',
        signalLabel: 'GREEN \u2014 curious, not hostile',
        underneath: 'They want to understand why the benefit varies. This is an opportunity to educate and establish authority.',
        options: [
          {
            label: 'Correct Response',
            text: '\u201cGreat question \u2014 and that\u2019s exactly where the commercials mislead people. The benefit is tied to your specific zip code and the plans available in your area. Someone in Florida might see $250 a month. Someone in Ohio might see $150. Medicare Advantage plans are local. So the question isn\u2019t what does Medicare pay \u2014 it\u2019s what does Medicare pay you, at your address, with your doctors. Let me show you that number right now.\u201d',
          },
        ],
      },
    ],
    fromTheCalls: 'An agent heard \u201cthe commercial said $6,000\u201d and tried to explain that $200 was still good. The client said \u201cthat\u2019s not even close\u201d and hung up. Another agent joined the frustration \u2014 \u201cYou\u2019re right, those commercials are misleading, let me show you what\u2019s actually real\u201d \u2014 and ran the Math Breakdown on the real number. The client enrolled.',
    fromTheCallsBold: 'Join the frustration. Then redirect. Never defend the commercial or apologize for the gap.',
    crossLinks: [
      { label: 'Reframing (Pillar 2)', href: '/pillars/reframing' },
      { label: 'Type 1 \u2014 Money Caller', href: '/call-types/money-caller' },
      { label: 'Math Breakdown', href: '/math-breakdown' },
      { label: 'Pattern 8 \u2014 Accepting Misinformation', href: '/patterns/accepting-misinformation' },
    ],
  },

  'veteran': {
    title: 'Type 8 \u2014 The Veteran',
    description: 'They use VA benefits and see Medicare Advantage as a threat to what they\u2019ve earned. VA and Medicare Advantage are additive, not competing. Neutralize the displacement fear first \u2014 everything else comes after.',
    signal: 'green',
    pageSignal: 'red',
    callNumber: 8,
    quickRef: {
      whoThisIs: 'Uses VA benefits and fears Medicare replaces VA care',
      firstSignal: 'RED (fear of displacement)',
      primaryPillar: 'The Shift',
      biggestMistake: 'PCP selection before neutralizing VA fear',
      signal: 'red',
    },
    whoThisIs: [
      'They use VA benefits and see Medicare Advantage as a threat to what they\u2019ve earned. They believe enrolling in a Medicare plan means replacing their VA care, losing their VA benefits, or making a choice that dishonors their service. None of that is true \u2014 but they don\u2019t know it yet.',
      'If the agent jumps straight to plan mechanics or PCP selection before addressing this fear, the call ends. The moment a veteran hears \u201cpick a primary care doctor,\u201d they hear \u201creplace your VA doctor.\u201d Neutralize the displacement fear first. Everything else comes after.',
    ],
    identificationPhrases: [
      'I get my care through the VA \u2014 I don\u2019t need this.',
      'I\u2019m a veteran. VA covers everything.',
      'I already have VA benefits. Why would I need Medicare?',
      'I\u2019m not picking a different doctor. My VA doctor is my doctor.',
    ],
    primaryMove: [
      'Neutralize the displacement fear before presenting anything. VA and Medicare Advantage are additive, not competing. Establish this as the first thing they hear.',
      '\u201cYour VA covers everything at the VA. This covers everything outside the VA. They work together \u2014 this is additive, not a replacement. You\u2019re not choosing one over the other.\u201d',
      'Do not move to PCP selection, plan details, or math until this is understood and accepted.',
    ],
    objections: [
      {
        title: '\u201cI get my care at the VA. I don\u2019t need Medicare.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 displacement fear',
        underneath: 'They believe enrolling replaces or threatens VA coverage. This is the wall. Everything else waits.',
        doNot: [
          'Jumping to PCP selection \u2014 the moment a veteran hears \u201cpick a primary care doctor,\u201d they hear \u201creplace your VA doctor\u201d',
          'Explaining plan mechanics before addressing the fear \u2014 they stop listening the moment the fear isn\u2019t acknowledged',
        ],
        options: [
          {
            label: 'Option A',
            text: '\u201cYour VA care stays exactly as it is \u2014 nothing about this changes that. What Medicare Advantage covers is everything outside the VA: urgent care when you\u2019re traveling, specialists in the community, dental, OTC benefits, and emergency situations where getting to the VA isn\u2019t realistic. Think of it as a second layer that works alongside your VA coverage \u2014 not instead of it.\u201d',
          },
          {
            label: 'Option B \u2014 connecting to real cost',
            text: '\u201cHere\u2019s the gap I want to show you: your VA covers you at VA facilities. Outside of that, you\u2019re exposed. An ER visit, a specialist your VA can\u2019t get you into fast enough, a procedure that requires a community provider \u2014 those costs land on you right now. This plan covers that gap at $0 premium. Your VA doesn\u2019t change. You just stop being exposed.\u201d',
          },
        ],
      },
      {
        title: '\u201cI\u2019m not picking a primary care doctor. My VA doctor is mine.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 PCP resistance',
        underneath: 'The PCP requirement feels like being forced to abandon their VA provider. It is an administrative requirement, not a clinical replacement.',
        options: [
          {
            label: 'Correct Response',
            text: '\u201cI hear you \u2014 and your VA doctor stays your VA doctor. The PCP field in the enrollment is an administrative requirement for the system. It doesn\u2019t mean you\u2019re changing who you see. Your VA care is completely separate from this plan. Think of the PCP as a placeholder for the plan\u2019s records \u2014 it doesn\u2019t replace Dr. [VA doctor]. Would it help to pick someone close to you as a backup for non-VA situations?\u201d',
          },
        ],
      },
      {
        title: '\u201cI had a bad experience with Medicare before.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 trust collapse from prior experience',
        underneath: 'A previous plan caused problems \u2014 billing issues, coverage gaps, VA disruption. They\u2019ve grouped all Medicare Advantage into the same category.',
        options: [
          {
            label: 'Correct Response',
            text: '\u201cI hear you \u2014 and if something went wrong before, that\u2019s on whoever handled your enrollment. Can I ask you something? Did they check whether your VA care would be affected by the enrollment, or just whether the doctor was listed? Most agents skip that check. What I\u2019m going to do right now is go through your VA coverage with you line by line to show you exactly what this plan touches \u2014 and what it doesn\u2019t.\u201d',
          },
        ],
      },
    ],
    fromTheCalls: 'An agent jumped straight to PCP selection on a VA client before addressing the displacement fear. The client shut down completely. The enrollment was over. Another agent used the additive framing \u2014 \u201cYour VA covers the VA. This covers everything else. They stack.\u201d \u2014 and the veteran said \u201cWhy has no one ever explained it that way?\u201d He enrolled that day.',
    fromTheCallsBold: 'The moment you mention PCP before neutralizing the VA fear, the call is over.',
    crossLinks: [
      { label: 'The Shift (Pillar 3)', href: '/pillars/the-shift' },
      { label: 'Reframing (Pillar 2)', href: '/pillars/reframing' },
      { label: 'Pattern 3 \u2014 Logic Responses', href: '/patterns/logic-responses' },
      { label: 'Close Confirmation', href: '/close-confirmation' },
    ],
  },

  'timing-objector': {
    title: 'Type 9 \u2014 The Timing Objector',
    description: 'Willing and interested \u2014 but fixated on a timing issue that sounds logical and is almost always a stall. Make the wait expensive in specific dollars. Then close.',
    signal: 'yellow',
    pageSignal: 'red',
    callNumber: 9,
    quickRef: {
      whoThisIs: 'Interested but fixated on a timing issue that is almost always a stall',
      firstSignal: 'RED (stall)',
      primaryPillar: 'The Shift',
      biggestMistake: 'Accepting the timing objection and offering a callback',
      signal: 'red',
    },
    whoThisIs: [
      'Willing and interested \u2014 but fixated on a timing issue that feels logical and is almost always a stall. Effective date is too far away. They have an appointment this week. They\u2019re moving in six months. They want to wait for Medicaid. They want to talk it over at the holidays.',
      'The stall sounds reasonable. The cost of waiting is real \u2014 and they don\u2019t know it yet. Every month of waiting is a specific dollar amount in unclaimed benefits. Say it.',
    ],
    identificationPhrases: [
      'Can this start sooner? I have a procedure next week.',
      'I\u2019m moving in a few months \u2014 let me wait until I get settled.',
      'I want to wait and see if I get Medicaid.',
      'Let me get through the holidays first.',
      'I\u2019ll do this next year during open enrollment.',
      'I don\u2019t want to do anything right before my appointment.',
    ],
    primaryMove: [
      'Make the wait feel expensive in specific dollars. Every month of waiting is a number. Say it. Then make enrollment the low-risk option \u2014 Special Enrollment Periods protect moves, coverage doesn\u2019t gap, there is no reason to wait.',
      '\u201cI completely understand wanting to wait \u2014 and I want to show you what waiting costs. Every month we don\u2019t do this is $[monthly benefit] you don\u2019t get. That\u2019s $[annual] this year. Most timing concerns I hear don\u2019t change the outcome of this plan \u2014 they just delay the money. What\u2019s the specific concern? Let\u2019s see if it\u2019s actually a barrier or just a reason to pause.\u201d',
    ],
    objections: [
      {
        title: '\u201cI have an appointment next week. I don\u2019t want to mess up my coverage.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 fear of a coverage gap',
        underneath: 'Fear that switching will leave them without coverage at a critical moment. This is legitimate. Resolve it directly.',
        options: [
          {
            label: 'Option A',
            text: '\u201cCompletely valid concern \u2014 and here\u2019s the important thing: your current coverage stays active until the new plan\u2019s effective date. There is no gap. Your appointment next week is fully covered under your current plan. Once the new plan starts, [benefit] starts too. You\u2019re protected the whole way through.\u201d',
          },
          {
            label: 'Option B \u2014 when effective date is the concern',
            text: '\u201cLet\u2019s look at what date we can make this effective. If we enroll today, the soonest start date would be [date]. That\u2019s after your appointment. You have full coverage for that visit, and then the new plan \u2014 with [benefit] \u2014 kicks in right after.\u201d',
          },
        ],
      },
      {
        title: '\u201cI\u2019m moving soon. Let me wait until I\u2019m settled.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 timing stall',
        underneath: 'The move feels like a reason to pause everything. In most cases it is not. Plans are available in most areas and a Special Enrollment Period protects a move.',
        options: [
          {
            label: 'Correct Response',
            text: '\u201cThat makes sense \u2014 and here\u2019s what I want you to know about how this works. When you move, you have a Special Enrollment Period that lets you change plans to match your new location. You don\u2019t have to figure it all out now. What you lose by waiting is the benefit between now and when you move \u2014 and that\u2019s [monthly amount] every month between now and then. We can lock in the benefit now and adjust the plan when you move. You get the money in the meantime.\u201d',
          },
        ],
      },
      {
        title: '\u201cI\u2019m waiting to see if I qualify for Medicaid.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 stall anchored to an outcome',
        underneath: 'They are waiting for a resolution to act. Sometimes the resolution has already happened and they don\u2019t know it.',
        options: [
          {
            label: 'Correct Response \u2014 if Medicaid has already said no',
            text: '\u201cSo you\u2019re waiting for something that\u2019s already given you an answer. Every month we wait from here is $[monthly benefit] and a $0 premium plan you\u2019re paying $[current premium] for instead. I want to show you what that number looks like. You can always revisit Medicaid if your situation changes.\u201d',
          },
          {
            label: 'If still pending',
            text: '\u201cCompletely understand \u2014 and I want to show you one thing. If Medicaid comes through, we can adjust your plan. If it doesn\u2019t, you\u2019re already covered. Either way, the benefit you\u2019re eligible for right now starts [date]. Every month we wait on the Medicaid answer, that\u2019s $[monthly] sitting on the table.\u201d',
          },
        ],
      },
      {
        title: '\u201cLet me get through the holidays / wait until next year.\u201d',
        signal: 'red',
        signalLabel: 'RED \u2014 vague timing stall',
        underneath: 'The holiday or the new year feels like a natural decision point. It is not. It is a way to exit the call without saying no.',
        options: [
          {
            label: 'Correct Response',
            text: '\u201cThat\u2019s a completely reasonable instinct \u2014 and I want to show you what waiting until [month] costs. Between now and then is [X months] x $[monthly benefit] = $[total]. That\u2019s the cost of the wait. After the holidays, your plan options may also be different \u2014 open enrollment windows are specific. I want to make sure you\u2019re not locked out of what\u2019s available right now.\u201d',
          },
        ],
      },
    ],
    fromTheCalls: 'A client said she was waiting for Medicaid to come through before making any changes. The agent asked when she\u2019d applied. Four months ago. What Medicaid had told her: she didn\u2019t qualify. She was waiting for something that had already said no. Every month of that wait was $210 in grocery benefit and a $0 premium plan she was paying $23 for instead. The agent walked through that number. She said, \u201cI didn\u2019t realize I was paying for waiting.\u201d She enrolled before the call ended.',
    fromTheCallsBold: 'The timing objection almost always sounds more legitimate than it is. Make it expensive. Then close.',
    crossLinks: [
      { label: 'The Shift (Pillar 3)', href: '/pillars/the-shift' },
      { label: 'Type 5 \u2014 Detail Staller', href: '/call-types/detail-staller' },
      { label: 'Type 6 \u2014 Time Bomb', href: '/call-types/time-bomb' },
      { label: 'Pattern 9 \u2014 The Hollow Yes', href: '/patterns/hollow-yes' },
    ],
  },
}

/* ─── Fade-up section wrapper ─── */
function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={SPRING}
    >
      {children}
    </motion.section>
  )
}

function ObjectionBlock({ obj, children }: { obj: Objection; children: React.ReactNode }) {
  const hover = useSignalHover(obj.signal)
  return (
    <div className={styles.objectionBlock} {...hover}>
      {children}
    </div>
  )
}

/* ─── Client component ─── */
export default function CallTypeContent({ slug }: { slug: string }) {
  const data = callTypeData[slug]

  if (!data) {
    notFound()
  }

  return (
    <PageShell signal={data.pageSignal}>
      {/* Hero */}
      <header className={styles.hero}>
        <motion.nav
          className={styles.breadcrumb}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.05 }}
        >
          <Link href="/call-types" className={styles.breadcrumbLink}>
            Call Types
          </Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>Type {data.callNumber}</span>
        </motion.nav>

        <motion.div
          className={styles.meta}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.1 }}
        >
          <SignalBadge signal={data.quickRef.signal} variant="filled" size="lg" />
          <span className={styles.metaTag}>{data.quickRef.primaryPillar}</span>
        </motion.div>

        <motion.h1
          className={`${styles.headline} display-xl`}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.15 }}
        >
          {data.title}
        </motion.h1>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.25 }}
        >
          {data.description}
        </motion.p>
      </header>

      {/* Quick Ref Card */}
      <QuickRefCard
        whoThisIs={data.quickRef.whoThisIs}
        firstSignal={data.quickRef.firstSignal}
        primaryPillar={data.quickRef.primaryPillar}
        biggestMistake={data.quickRef.biggestMistake}
        signal={data.quickRef.signal}
      />

      {/* Body content */}
      <div className={styles.content}>
        {/* Who This Is */}
        <Section className={styles.section}>
          <h2 className={styles.sectionTitle}>Who This Is</h2>
          {data.whoThisIs.map((p, i) => (
            <p key={i} className={styles.body}>{p}</p>
          ))}
        </Section>

        {/* How to Identify */}
        <Section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to Identify in the First 2 Minutes</h2>
          <ul className={styles.phraseList}>
            {data.identificationPhrases.map((phrase, i) => (
              <li key={i} className={styles.phraseItem}>{phrase}</li>
            ))}
          </ul>
        </Section>

        {/* Watch For (optional) */}
        {data.watchFor && (
          <Section className={styles.section}>
            <div className={styles.watchFor}>
              <strong>Watch For:</strong> {data.watchFor}
            </div>
          </Section>
        )}

        {/* Primary Move */}
        <Section className={styles.section}>
          <h2 className={styles.sectionTitle}>Primary Move</h2>
          {data.primaryMove.map((p, i) => {
            const isQuote = p.startsWith('\u201c')
            return isQuote ? (
              <blockquote key={i} className={styles.blockquote}>{p}</blockquote>
            ) : (
              <p key={i} className={styles.body}>{p}</p>
            )
          })}
        </Section>

        {/* Sub-types (optional) */}
        {data.subTypes && data.subTypes.length > 0 && (
          <Section className={styles.section}>
            <h2 className={styles.sectionTitle}>Sub-Types</h2>
            {data.subTypes.map((sub, i) => (
              <div key={i} className={styles.subTypeBlock}>
                <h3 className={styles.subTypeTitle}>{sub.title}</h3>
                <p className={styles.body}>{sub.description}</p>
                {sub.quote && (
                  <blockquote className={styles.blockquote}>{sub.quote}</blockquote>
                )}
                {sub.note && (
                  <div className={styles.watchFor}>{sub.note}</div>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Common Objections */}
        <Section className={styles.section}>
          <h2 className={styles.sectionTitle}>Common Objections on This Call</h2>
          {data.objections.map((obj, i) => (
            <ObjectionBlock key={i} obj={obj}>
              <h3 className={styles.objectionTitle}>{obj.title}</h3>
              <div className={styles.objectionSignal}>
                <SignalBadge signal={obj.signal} label={obj.signalLabel} />
              </div>
              <p className={styles.objectionUnderneath}>
                <strong>What&rsquo;s underneath:</strong> {obj.underneath}
              </p>

              {obj.doNot && obj.doNot.length > 0 && (
                <>
                  <span className={styles.doNotLabel}>What NOT to say</span>
                  <ul className={styles.doNotList}>
                    {obj.doNot.map((item, j) => (
                      <li key={j} className={styles.doNotItem}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              <span className={styles.doLabel}>What to say</span>
              {obj.options.map((opt, j) => (
                <div key={j}>
                  <h4 className={styles.subsectionTitle}>{opt.label}</h4>
                  <blockquote className={styles.blockquote}>{opt.text}</blockquote>
                </div>
              ))}
            </ObjectionBlock>
          ))}
        </Section>

        {/* From the Calls */}
        <Section className={styles.section}>
          <div className={styles.fromCalls}>
            <p className={styles.fromCallsLabel}>From the Calls</p>
            <div className={styles.fromCallsText}>
              <p>{data.fromTheCalls}</p>
              <p><strong>{data.fromTheCallsBold}</strong></p>
            </div>
          </div>
        </Section>
      </div>

      {/* Cross links */}
      <div className={styles.crossSection}>
        <CrossLinks links={data.crossLinks} />
      </div>
    </PageShell>
  )
}
