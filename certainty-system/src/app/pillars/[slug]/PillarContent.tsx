'use client'

import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import PageShell from '@/components/layout/PageShell'
import QuickRefCard from '@/components/ui/QuickRefCard'
import CalloutBlock from '@/components/ui/CalloutBlock'
import CrossLinks from '@/components/ui/CrossLinks'
import SignalBadge from '@/components/ui/SignalBadge'
import { SPRING } from '@/lib/motion'
import styles from './page.module.css'

/* ─── Pillar data ─── */
type Signal = 'neutral' | 'red' | 'green' | 'yellow'

interface PillarMeta {
  title: string
  description: string
  signal: Signal
  pillarNumber: number
  quickRef: {
    whoThisIs: string
    firstSignal: string
    primaryPillar: string
    biggestMistake: string
    signal: 'green' | 'red' | 'yellow'
  }
  crossLinks: Array<{ label: string; href: string }>
}

const pillarData: Record<string, PillarMeta> = {
  persuasion: {
    title: 'Pillar 1 — Persuasion',
    description: 'The macro mindset. Lead with authority from the first word. Never ask permission to advance the sale.',
    signal: 'neutral',
    pillarNumber: 1,
    quickRef: {
      whoThisIs: 'The baseline condition of every call',
      firstSignal: 'All calls — always active',
      primaryPillar: 'Persuasion (this pillar)',
      biggestMistake: 'Asking permission to advance the sale',
      signal: 'green',
    },
    crossLinks: [
      { label: 'Pattern 4 — Permission-Seeking Language', href: '/patterns/permission-seeking-language' },
      { label: 'Pattern 6 — Rapport Without an Off-Switch', href: '/patterns/rapport-without-off-switch' },
      { label: 'Three Client Signals', href: '/signals' },
    ],
  },
  reframing: {
    title: 'Pillar 2 — Reframing',
    description: 'The tool for RED signals. Name the emotion. Redirect the meaning. Never logic first.',
    signal: 'red',
    pillarNumber: 2,
    quickRef: {
      whoThisIs: 'The tool for emotional resistance',
      firstSignal: 'RED — Resistant',
      primaryPillar: 'Reframing (this pillar)',
      biggestMistake: 'Responding to emotion with logic',
      signal: 'red',
    },
    crossLinks: [
      { label: 'Pattern 3 — Logic Responses to Emotional Objections', href: '/patterns/logic-responses' },
      { label: 'Pattern 8 — Accepting Misinformation', href: '/patterns/accepting-misinformation' },
      { label: 'Three Client Signals', href: '/signals' },
    ],
  },
  'the-shift': {
    title: 'Pillar 3 — The Shift',
    description: 'Change what they\'re comparing against. Show them what they\'re losing, not what they\'d gain. Execute the Math Breakdown.',
    signal: 'green',
    pillarNumber: 3,
    quickRef: {
      whoThisIs: 'The tool for comparison objections',
      firstSignal: 'GREEN — Open',
      primaryPillar: 'The Shift (this pillar)',
      biggestMistake: 'Stopping at the numbers without humanizing',
      signal: 'green',
    },
    crossLinks: [
      { label: 'Pattern 2 — Incomplete Math Breakdown', href: '/patterns/incomplete-math-breakdown' },
      { label: 'Pattern 1 — Client Gold Ignored', href: '/patterns/client-gold-ignored' },
      { label: 'The Math Breakdown', href: '/math-breakdown' },
      { label: 'Three Client Signals', href: '/signals' },
    ],
  },
  refocusing: {
    title: 'Pillar 4 — Refocusing',
    description: 'Redirect the drifting call. Validate in one sentence, bridge back with a forward statement. Narrate dead air.',
    signal: 'yellow',
    pillarNumber: 4,
    quickRef: {
      whoThisIs: 'The tool for drifting calls and dead air',
      firstSignal: 'YELLOW — Drifting',
      primaryPillar: 'Refocusing (this pillar)',
      biggestMistake: 'Asking a question instead of making a statement',
      signal: 'yellow',
    },
    crossLinks: [
      { label: 'Pattern 5 — System Navigation Dead Air', href: '/patterns/system-navigation-dead-air' },
      { label: 'Pattern 6 — Rapport Without an Off-Switch', href: '/patterns/rapport-without-off-switch' },
      { label: 'Three Client Signals', href: '/signals' },
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

/* ─── Individual pillar content renderers ─── */

function PersuasionContent() {
  return (
    <>
      <Section className={styles.section}>
        <p className={styles.bodyLead}>
          Persuasion is not manipulation. It is leading with authority and conviction because you genuinely know your offer is better for this person. When that&rsquo;s true, leading is doing your client a service. Deferring is failing them.
        </p>
        <p className={styles.body}>
          Persuasion is not a single move. It is the baseline condition of the call. It is present in every other pillar. An agent who leads correctly will use Reframing, The Shift, and Refocusing — but all of it is delivered from a position of authority, not apology.
        </p>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Assumptive Frame</h2>
        <p className={styles.body}>
          Never ask permission to advance the sale. State and move.
        </p>

        <div className={styles.comparisonTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thBad}>Don&rsquo;t say</th>
                <th className={styles.thGood}>Say instead</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&ldquo;Would you like me to compare the two plans?&rdquo;</td>
                <td>&ldquo;Let me pull up your current plan and show you exactly what&rsquo;s available.&rdquo;</td>
              </tr>
              <tr>
                <td>&ldquo;How does that sound?&rdquo;</td>
                <td>&ldquo;I&rsquo;m going to walk you through the comparison right now.&rdquo;</td>
              </tr>
              <tr>
                <td>&ldquo;Would you like to move forward?&rdquo;</td>
                <td>&ldquo;Let me get your information pulled up.&rdquo;</td>
              </tr>
              <tr>
                <td>&ldquo;Is it okay if we...?&rdquo;</td>
                <td>Just do it. Bring them along.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className={styles.body}>
          The difference: one asks the client to decide whether you can proceed. The other proceeds and brings them along.
        </p>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>Phrases That Kill the Sale</h2>
        <p className={styles.body}>
          Every one of these came from a real recorded call. Every one handed control of the call to the client at the exact moment the agent needed to hold it. <strong>Remove them permanently.</strong>
        </p>

        <div className={styles.phraseBlock}>
          <h3 className={styles.phraseTitle}>&ldquo;I&rsquo;m not here to strong-arm you.&rdquo;</h3>
          <p className={styles.body}>
            The client was on the edge of enrolling, starting to show hesitation. The agent said this trying to ease the tension. The client walked. The moment you say &ldquo;strong-arm,&rdquo; you introduce the concept of pressure where there was none. You planted the doubt yourself.
          </p>
          <CalloutBlock type="neutral">
            <strong>What to say instead:</strong> Stay in the lead. Name the hesitation directly. <em>&ldquo;I hear you — and I want to make sure you&rsquo;re making this decision with the full picture. Here&rsquo;s what I want you to know...&rdquo;</em>
          </CalloutBlock>
        </div>

        <div className={styles.phraseBlock}>
          <h3 className={styles.phraseTitle}>&ldquo;I just want to make sure you&rsquo;re comfortable.&rdquo;</h3>
          <p className={styles.body}>
            The agent was trying to be empathetic. What they actually did was hand the client a checklist they hadn&rsquo;t been using: <em>Am I comfortable? Should I be? Maybe I&rsquo;m not.</em> Now the client is evaluating their comfort instead of their coverage.
          </p>
          <CalloutBlock type="neutral">
            <strong>What to say instead:</strong> Name the specific concern. <em>&ldquo;I hear you thinking about [X] — let me show you exactly what that looks like.&rdquo;</em>
          </CalloutBlock>
        </div>

        <div className={styles.phraseBlock}>
          <h3 className={styles.phraseTitle}>&ldquo;Would it be okay if I showed you something?&rdquo;</h3>
          <p className={styles.body}>
            This asks permission to do your job. You are a licensed professional with system access and real data. You don&rsquo;t need permission to show a client what they&rsquo;re leaving on the table.
          </p>
          <CalloutBlock type="neutral">
            <strong>What to say instead:</strong> <em>&ldquo;Let me show you something.&rdquo;</em> Then show it.
          </CalloutBlock>
        </div>

        <div className={styles.phraseBlock}>
          <h3 className={styles.phraseTitle}>&ldquo;Please say yes.&rdquo;</h3>
          <p className={styles.body}>
            Said in desperation or as a joke at the close. The client feels it either way. If you say this, the sale is already lost — this is just confirmation.
          </p>
          <CalloutBlock type="neutral">
            <strong>What to say instead:</strong> Go back to the math. <em>&ldquo;Mr. Williams, you told me your grocery bill is real. This is $420 a year back in your pocket. Your doctor is covered. Your medications are covered. Let&rsquo;s get you set up today.&rdquo;</em>
          </CalloutBlock>
        </div>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>When Persuasion Breaks Down</h2>
        <p className={styles.body}>
          This is <strong>Pattern 4 — Permission-Seeking Language.</strong> It shows up when agents are:
        </p>
        <ul className={styles.list}>
          <li>Unsure the plan is actually better for this client</li>
          <li>Conflict-averse and trying to soften resistance</li>
          <li>Trained to be &ldquo;nice&rdquo; instead of trained to lead</li>
        </ul>
        <p className={styles.body}>
          The fix is not more confidence — it&rsquo;s a genuine belief that what you&rsquo;re offering is better for this person, and the conviction to say so.
        </p>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>What Persuasion Is Not</h2>
        <p className={styles.body}>
          Persuasion is not telling the client what they want to hear. It is not being aggressive. It is not closing at all costs.
        </p>
        <CalloutBlock type="green">
          An agent who discovers the client is on the best available plan in their area tells them the truth and ends the call. That is Persuasion — leading from a position of integrity, not commission.
        </CalloutBlock>
      </Section>
    </>
  )
}

function ReframingContent() {
  return (
    <>
      <Section className={styles.section}>
        <p className={styles.bodyLead}>
          Most agents respond to resistance with information — more explanation, more features, more math. That is the wrong tool. Resistance is almost never intellectual. It is emotional. Fear of change. Fear of losing something. Fear of being wrong.
        </p>
        <CalloutBlock type="red">
          <strong>You cannot explain someone out of a fear.</strong>
        </CalloutBlock>
        <p className={styles.body}>
          A reframe works by doing the opposite: it names the fear, then redirects the meaning — without dismissing it, without arguing with it, and without logic.
        </p>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Structure</h2>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;I hear you — [name what they&rsquo;re actually feeling]. [Redirect the meaning toward what this actually means for them].&rdquo;</em>
        </blockquote>
        <p className={styles.body}>
          The words change depending on the client. The structure does not. Validate the feeling. Redirect the meaning. Never dismiss, never argue, never logic first.
        </p>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Examples</h2>

        <div className={styles.exampleBlock}>
          <h3 className={styles.exampleLabel}>When the client says: &ldquo;I don&rsquo;t want to change.&rdquo;</h3>
          <div className={styles.doRow}>
            <span className={styles.badLabel}>Wrong:</span>
            <span>Explaining why the new plan is better</span>
          </div>
          <div className={styles.doRow}>
            <span className={styles.goodLabel}>Right:</span>
            <span><em>&ldquo;I hear you — you&rsquo;ve had a plan that&rsquo;s worked and you don&rsquo;t want to risk losing what you have. What I&rsquo;m showing you doesn&rsquo;t take that away. It adds to it.&rdquo;</em></span>
          </div>
        </div>

        <div className={styles.exampleBlock}>
          <h3 className={styles.exampleLabel}>When the client says: &ldquo;I&rsquo;m happy with what I have.&rdquo;</h3>
          <div className={styles.doRow}>
            <span className={styles.badLabel}>Wrong:</span>
            <span><em>&ldquo;But your plan is costing you money.&rdquo;</em></span>
          </div>
          <div className={styles.doRow}>
            <span className={styles.goodLabel}>Right:</span>
            <span><em>&ldquo;I hear you — and when something&rsquo;s worked for you, the last thing you want to do is mess with it. I&rsquo;m not asking you to change anything. I&rsquo;m asking you to look at the numbers. Give me 60 seconds and I&rsquo;ll show you exactly what&rsquo;s sitting unclaimed in your area.&rdquo;</em></span>
          </div>
        </div>

        <div className={styles.exampleBlock}>
          <h3 className={styles.exampleLabel}>When the client says: &ldquo;I need to think about it.&rdquo;</h3>
          <div className={styles.doRow}>
            <span className={styles.badLabel}>Wrong:</span>
            <span>Accepting it and offering to call back</span>
          </div>
          <div className={styles.doRow}>
            <span className={styles.goodLabel}>Right:</span>
            <span><em>&ldquo;I completely understand — and I want to make sure you have everything you need to think clearly. What&rsquo;s the specific part you&rsquo;re still working through? Because if it&rsquo;s about [doctor / cost / coverage], I can resolve that right now while we&rsquo;re on the phone.&rdquo;</em></span>
          </div>
        </div>

        <div className={styles.exampleBlock}>
          <h3 className={styles.exampleLabel}>When the client says: &ldquo;I&rsquo;ll stick with what I got.&rdquo;</h3>
          <div className={styles.doRow}>
            <span className={styles.badLabel}>Wrong:</span>
            <span>Presenting more benefits</span>
          </div>
          <div className={styles.doRow}>
            <span className={styles.goodLabel}>Right:</span>
            <span><em>&ldquo;I respect that. Here&rsquo;s the one thing I want to make sure you know before you do: you told me [thing they mentioned — dental, groceries, the premium]. Staying where you are means leaving $[annual amount] on the table every year. Not gaining something new — giving away something that&rsquo;s already funded for you. That&rsquo;s worth knowing. Can I show you the side-by-side?&rdquo;</em></span>
          </div>
        </div>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Test Objection Technique</h2>
        <p className={styles.body}>
          Before accepting an objection as real, test it:
        </p>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;Absolutely — what questions would you be asking [whoever they want to consult] so I can make sure I&rsquo;m better prepared for when we speak again?&rdquo;</em>
        </blockquote>
        <p className={styles.body}>
          The client will either name a question — which you answer right there — or they can&rsquo;t, and the deflection dissolves.
        </p>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>What Reframing Is Not</h2>
        <ul className={styles.list}>
          <li>Dismissing what the client said (&ldquo;I understand but...&rdquo;)</li>
          <li>Arguing with the client&rsquo;s belief</li>
          <li>Agreeing with the objection and then presenting more information anyway</li>
          <li>Repeating yourself louder or more slowly</li>
        </ul>
        <CalloutBlock type="red">
          Reframing is agreement + redirection. You agree with the <em>feeling</em>. You redirect the <em>meaning</em>.
        </CalloutBlock>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>Patterns This Fixes</h2>
        <ul className={styles.list}>
          <li><strong>Pattern 3 — Logic Responses to Emotional Objections</strong> — the direct cause of this pillar existing</li>
          <li><strong>Pattern 8 — Accepting Misinformation as Truth</strong> — live verification is a form of reframing</li>
          <li><strong>Pattern 7 — The Third Party Blind Spot</strong> — bringing in the third party is a reframe of who the audience is</li>
        </ul>
      </Section>
    </>
  )
}

function TheShiftContent() {
  return (
    <>
      <Section className={styles.section}>
        <p className={styles.bodyLead}>
          The client&rsquo;s default frame is: <em>&ldquo;My plan works. Why change?&rdquo;</em> That comparison — old plan vs. new plan — is one the agent cannot win, because the client has history, familiarity, and attachment to the old plan.
        </p>
        <CalloutBlock type="green">
          <strong>The Shift changes the comparison entirely.</strong> New frame: <em>&ldquo;You&rsquo;ve seen what&rsquo;s available. Staying where you are is now a choice — and that choice costs you $[specific amount] this year.&rdquo;</em>
        </CalloutBlock>
        <p className={styles.body}>
          The primary execution tool under this pillar is the <strong>Three-Step Math Breakdown.</strong>
        </p>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Math Breakdown — Three Steps</h2>
        <p className={styles.body}>
          <strong>Every agent must know all three steps before getting on a call. Step 3 is where most calls are lost.</strong>
        </p>
      </Section>

      <Section className={styles.section}>
        <h3 className={styles.stepTitle}>
          <span className={styles.stepNumber}>Step 1</span>
          State the Comparison
        </h3>
        <p className={styles.body}>
          Side by side. Current benefit vs. available benefit. Specific numbers. Not ranges, not approximations — the actual number for their zip code, their plan, their situation.
        </p>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;Right now you have $200 back on your Part B. This plan gives you $250.&rdquo;</em>
        </blockquote>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;Your current plan has a $615 drug deductible. This plan has $0.&rdquo;</em>
        </blockquote>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;You&rsquo;re getting $75 a month on the OTC card. There&rsquo;s a plan in your area paying $175.&rdquo;</em>
        </blockquote>
        <p className={styles.body}>
          The number has to be real and specific. &ldquo;You could get more&rdquo; is not a number. Give them the number.
        </p>
      </Section>

      <Section className={styles.section}>
        <h3 className={styles.stepTitle}>
          <span className={styles.stepNumber}>Step 2</span>
          Annualize It
        </h3>
        <p className={styles.body}>
          Monthly numbers feel small. Annual numbers land. $35/month is easy to dismiss. $420/year is harder. <strong>Always multiply by 12. Always state the annual figure explicitly — do not expect the client to do that math themselves.</strong>
        </p>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;That&rsquo;s $600 a year you&rsquo;re leaving on the table.&rdquo;</em>
        </blockquote>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;Over the course of the year, that difference is $1,200.&rdquo;</em>
        </blockquote>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;That&rsquo;s $420 a year sitting unclaimed.&rdquo;</em>
        </blockquote>
        <p className={styles.body}>
          Say the annual number out loud. Then stop. Let it sit for a beat.
        </p>
      </Section>

      <Section className={styles.section}>
        <h3 className={styles.stepTitle}>
          <span className={styles.stepNumber}>Step 3</span>
          Humanize the Cost of Inaction
        </h3>
        <p className={styles.body}>
          Connect the annual number to something real this specific client said during the call. Their grocery bill. Their dental appointment they&rsquo;ve been putting off. The medication they&rsquo;re rationing. The grandkids they want to visit.
        </p>
        <CalloutBlock type="green">
          <strong>This is not generic. It is specific to what this person told you. This step is the close. It is missing in the majority of lost calls.</strong>
        </CalloutBlock>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;That&rsquo;s your grocery bill for two months. You told me groceries are tight — that&rsquo;s real money going back to you.&rdquo;</em>
        </blockquote>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;You mentioned you&rsquo;ve been putting off the dental work. This plan has a $2,000 dental benefit. That work happens this year.&rdquo;</em>
        </blockquote>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;That&rsquo;s the prescription you said you&rsquo;ve been cutting in half. That stops.&rdquo;</em>
        </blockquote>
        <p className={styles.body}>
          If you cannot connect Step 3 to something specific the client said, you missed something in discovery. Ask one more question before executing the breakdown.
        </p>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Loss Aversion Principle</h2>
        <p className={styles.body}>
          People feel losses twice as powerfully as gains. Every reframe under this pillar must be about what they&rsquo;re currently <strong>giving away</strong> — not what they would gain.
        </p>
        <div className={styles.doRow}>
          <span className={styles.badLabel}>Gain frame:</span>
          <span><em>&ldquo;You&rsquo;d get an extra $100 a month.&rdquo;</em> — easy to dismiss</span>
        </div>
        <div className={styles.doRow}>
          <span className={styles.goodLabel}>Loss frame:</span>
          <span><em>&ldquo;You&rsquo;re leaving $1,200 a year on the table.&rdquo;</em> — harder to dismiss</span>
        </div>
        <p className={styles.body}>
          The moment a client understands that inaction has a specific dollar cost — not a missed opportunity, but an active loss — staying is no longer the safe choice.
        </p>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>The 3-Question Test</h2>
        <p className={styles.body}>
          Before you hang up, every enrolled client should be able to answer these three questions without prompting:
        </p>
        <ol className={styles.orderedList}>
          <li>What plan did I just enroll in and when does it start?</li>
          <li>Why did I switch?</li>
          <li>What is the one thing I&rsquo;m most looking forward to?</li>
        </ol>
        <p className={styles.body}>
          Question 2 is answered by the Math Breakdown. If they can&rsquo;t explain why they switched in their own words, Step 3 didn&rsquo;t land.
        </p>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>Patterns This Fixes</h2>
        <ul className={styles.list}>
          <li><strong>Pattern 2 — Incomplete Math Breakdown</strong> — the direct cause of this pillar existing</li>
          <li><strong>Pattern 1 — Client Gold Ignored</strong> — Step 3 requires you to use what the client told you</li>
        </ul>
      </Section>
    </>
  )
}

function RefocusingContent() {
  return (
    <>
      <Section className={styles.section}>
        <p className={styles.bodyLead}>
          <SignalBadge signal="yellow" size="lg" /> doesn&rsquo;t fix itself. It requires leadership. And here&rsquo;s what most agents don&rsquo;t realize: you think you&rsquo;re building rapport, but you&rsquo;re actually burning your client&rsquo;s decision-making bandwidth.
        </p>
        <p className={styles.body}>
          The longer a call meanders, the harder it becomes for the client to re-engage. Think of an athlete who stops moving mid-game — it&rsquo;s harder to get back to speed than to stay in motion. For a 70 or 80-year-old on the phone, mental fatigue is real. You have to keep the energy moving.
        </p>
        <CalloutBlock type="yellow">
          When a call goes YELLOW and stays there long enough, it doesn&rsquo;t end in a no — <strong>it ends in &ldquo;I need to think about it.&rdquo;</strong> That&rsquo;s not the client&rsquo;s decision. That&rsquo;s your decision to let the call drift.
        </CalloutBlock>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Formula</h2>
        <ol className={styles.orderedList}>
          <li><strong>Acknowledge what they said in one sentence</strong> — they need to feel heard</li>
          <li><strong>Bridge back with a forward statement</strong> toward their benefits and the enrollment — never a question, and always back toward the plan</li>
        </ol>
        <CalloutBlock type="yellow">
          Questions invite more drift. Statements redirect.
        </CalloutBlock>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>Bridge Phrases</h2>
        <p className={styles.body}>Use these to pivot without breaking rapport:</p>
        <ul className={styles.quoteList}>
          <li><em>&ldquo;I love that — and that&rsquo;s actually exactly why this matters for you...&rdquo;</em></li>
          <li><em>&ldquo;Real quick — based on what you just told me, let me show you something...&rdquo;</em></li>
          <li><em>&ldquo;That connects perfectly to what I need to show you about your plan...&rdquo;</em></li>
          <li><em>&ldquo;I hear you — and what I want to make sure before we wrap up is that you&rsquo;ve seen [the number / the comparison / the benefit]...&rdquo;</em></li>
        </ul>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>System Navigation Dead Air</h2>
        <CalloutBlock type="yellow">
          <strong>You are creating YELLOW yourself every time you go silent during a search.</strong>
        </CalloutBlock>
        <p className={styles.body}>From real calls:</p>
        <ul className={styles.list}>
          <li>Five full minutes of silence during a system search — the resistance that ended that call was created in that silence</li>
          <li>Nearly two minutes of dead air on another call — same result</li>
          <li>Sixty seconds of silence — same result</li>
        </ul>
        <p className={styles.body}>
          Every gap creates the resistance that ends the call. <strong>Narrate. Ask a discovery question. Keep the client talking.</strong>
        </p>

        <h3 className={styles.subsectionTitle}>Scripts for Dead Air</h3>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;While I verify this for you — tell me, have you been using your OTC benefit on your current plan? Because a lot of people I talk to don&rsquo;t realize it doesn&rsquo;t roll over at year-end.&rdquo;</em>
        </blockquote>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;Give me just a second to pull this up — quick question while I do: who&rsquo;s your primary doctor? I want to make sure I&rsquo;ve got them confirmed in-network before we go any further.&rdquo;</em>
        </blockquote>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;I&rsquo;m pulling that up right now — while I&rsquo;ve got you, tell me about the dental. Have you been able to use a dentist this year?&rdquo;</em>
        </blockquote>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>Social Mode vs. Sales Mode</h2>
        <p className={styles.body}>
          These are different gears, and agents are not being trained to shift between them.
        </p>
        <p className={styles.body}>
          Rapport builds trust. That&rsquo;s good. But rapport without a transition into the close is <strong>Pattern 6 — Rapport Without an Off-Switch.</strong> The client likes you. The call ends warmly. No enrollment.
        </p>

        <h3 className={styles.subsectionTitle}>The Transition Phrase</h3>
        <blockquote className={styles.blockquote}>
          <em>&ldquo;[Acknowledge the personal thing they shared] — I love that. Real quick before I let you go, I need to make sure you&rsquo;ve seen this number, because this is the part that actually matters for you...&rdquo;</em>
        </blockquote>
      </Section>

      <Section className={styles.section}>
        <h2 className={styles.sectionTitle}>Patterns This Fixes</h2>
        <ul className={styles.list}>
          <li><strong>Pattern 5 — System Navigation Dead Air</strong> — directly caused by unnarrated silences</li>
          <li><strong>Pattern 6 — Rapport Without an Off-Switch</strong> — the gear-shift problem</li>
        </ul>
      </Section>
    </>
  )
}

/* ─── Client component ─── */
export default function PillarContent({ slug }: { slug: string }) {
  const meta = pillarData[slug]

  if (!meta) {
    notFound()
  }

  const contentMap: Record<string, () => JSX.Element> = {
    persuasion: PersuasionContent,
    reframing: ReframingContent,
    'the-shift': TheShiftContent,
    refocusing: RefocusingContent,
  }

  const Content = contentMap[slug]

  return (
    <PageShell signal={meta.signal}>
      {/* Page header */}
      <header className={styles.header}>
        <motion.div
          className={styles.signalRow}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.05 }}
        >
          {meta.signal === 'neutral' ? (
            <span className={styles.signalLabel}>All Signals</span>
          ) : (
            <SignalBadge signal={meta.signal as 'green' | 'red' | 'yellow'} variant="filled" size="lg" />
          )}
        </motion.div>

        <motion.h1
          className={`${styles.headline} display-xl`}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.1 }}
        >
          {meta.title}
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.2 }}
        >
          {meta.description}
        </motion.p>
      </header>

      {/* Quick ref card */}
      {meta.quickRef.signal && (
        <QuickRefCard
          whoThisIs={meta.quickRef.whoThisIs}
          firstSignal={meta.quickRef.firstSignal}
          primaryPillar={meta.quickRef.primaryPillar}
          biggestMistake={meta.quickRef.biggestMistake}
          signal={meta.quickRef.signal}
        />
      )}

      {/* Body content */}
      {Content && <Content />}

      {/* Cross links */}
      <CrossLinks links={meta.crossLinks} />
    </PageShell>
  )
}
