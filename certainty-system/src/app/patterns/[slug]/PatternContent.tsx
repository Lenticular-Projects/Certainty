'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PageShell from '@/components/layout/PageShell'
import CalloutBlock from '@/components/ui/CalloutBlock'
import CrossLinks from '@/components/ui/CrossLinks'
import SignalBadge from '@/components/ui/SignalBadge'
import { SPRING } from '@/lib/motion'
import styles from './page.module.css'

/* ------------------------------------------------------------------ */
/* Pattern data type                                                   */
/* ------------------------------------------------------------------ */

interface PatternSection {
  title: string
  content: React.ReactNode
}

interface PatternData {
  number: number
  title: string
  description: string
  signal: 'red' | 'yellow' | 'green'
  rootCause: string
  pillarFix: string
  calloutCost: string
  sections: PatternSection[]
  crossLinks: Array<{ label: string; href: string }>
}

/* ------------------------------------------------------------------ */
/* Section helper — animated whileInView                               */
/* ------------------------------------------------------------------ */

function AnimatedSection({ section, index }: { section: PatternSection; index: number }) {
  return (
    <motion.div
      className={styles.section}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...SPRING, delay: index * 0.05 }}
    >
      <h2 className={styles.sectionTitle}>{section.title}</h2>
      <div className={styles.sectionBody}>{section.content}</div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* All 9 patterns                                                      */
/* ------------------------------------------------------------------ */

const PATTERNS: Record<string, PatternData> = {
  /* -------------------------------------------------------------- */
  /* Pattern 1 — Client Gold Ignored                                 */
  /* -------------------------------------------------------------- */
  'client-gold-ignored': {
    number: 1,
    title: 'Client Gold Ignored',
    description: 'Your client told you something emotionally significant and you moved past it. Those moments are the actual close.',
    signal: 'red',
    rootCause: 'Loss of Lead',
    pillarFix: 'Persuasion / The Shift',
    calloutCost: 'The close was in the room. The agent walked past it.',
    sections: [
      {
        title: 'What This Is',
        content: (
          <>
            <p>
              Agents walk past the emotionally significant things clients say — financial distress,
              health fears, family pressure — and return to the script. Those moments are the actual
              close. The script keeps moving. The sale stays behind.
            </p>
            <p>
              &ldquo;Client Gold&rdquo; is any moment where the client voluntarily gives you
              something emotionally real. A worry. A financial pressure. A health concern. A thing
              they&rsquo;ve been putting off. Something they said that tells you exactly what the
              benefit means to them as a person — not as a plan subscriber.
            </p>
          </>
        ),
      },
      {
        title: 'What It Sounds Like',
        content: (
          <>
            <p>The client is handing you the close. Most agents don&rsquo;t hear it:</p>
            <ul className={styles.exampleList}>
              <li className={styles.exampleItem}>&ldquo;I&rsquo;ve been trying to afford the dentist for two years.&rdquo;</li>
              <li className={styles.exampleItem}>&ldquo;My daughter handles my finances now — money is really tight.&rdquo;</li>
              <li className={styles.exampleItem}>&ldquo;I&rsquo;ve been cutting my pills in half.&rdquo;</li>
              <li className={styles.exampleItem}>&ldquo;The grocery bill is killing me on a fixed income.&rdquo;</li>
              <li className={styles.exampleItem}>&ldquo;I just want to make sure I can stay with my same doctor.&rdquo;</li>
            </ul>
            <p>
              Each one of these is Step 3 of the Math Breakdown waiting to happen. Each one is a
              specific, personal anchor for the humanized cost of inaction. Each one is the close —
              if the agent stops and uses it.
            </p>
          </>
        ),
      },
      {
        title: 'What It Costs',
        content: (
          <>
            <p>
              The agent hears it, says something warm (<em>&ldquo;We&rsquo;ll definitely help you out&rdquo;</em>),
              and moves to the next discovery question.
            </p>
            <p>
              From real calls: An agent identified the specific benefit a client called about in the
              first 15 seconds — then spent the rest of the call asking medication questions without
              ever connecting them back to that benefit. The client shut down. Another agent heard a
              client mention dental problems and said <em>&ldquo;we&rsquo;ll definitely help you out&rdquo;</em> —
              then moved on without ever making it real.
            </p>
          </>
        ),
      },
      {
        title: 'How to Fix It',
        content: (
          <>
            <p>
              When the client says something emotionally significant, <strong>stop and use it immediately.</strong>
            </p>
            <div className={styles.blockquote}>
              &ldquo;[Repeat what they just said back to them in your own words]. That&rsquo;s
              exactly what I&rsquo;m talking about. [Connect it directly to the specific benefit or
              number]. That&rsquo;s [monthly] a month — that&rsquo;s [annual] a year. That [grocery
              bill / dental / prescription] — that&rsquo;s what we&rsquo;re talking about right
              now.&rdquo;
            </div>
            <p>
              Do not acknowledge and continue. Acknowledge and <strong>close</strong>.
            </p>
          </>
        ),
      },
    ],
    crossLinks: [
      { label: 'The Shift (Pillar 3)', href: '/pillars/the-shift' },
      { label: 'Pattern 2 — Incomplete Math Breakdown', href: '/patterns/incomplete-math-breakdown' },
      { label: 'Three Client Signals', href: '/signals' },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Pattern 2 — Incomplete Math Breakdown                           */
  /* -------------------------------------------------------------- */
  'incomplete-math-breakdown': {
    number: 2,
    title: 'Incomplete Math Breakdown',
    description: 'You stated the monthly number and stopped. Step 3 — connecting the annual figure to their real life — is the close.',
    signal: 'green',
    rootCause: 'Loss of Lead',
    pillarFix: 'The Shift (Pillar 3)',
    calloutCost: 'Without Step 3, you have presented information. You have not closed.',
    sections: [
      {
        title: 'What This Is',
        content: (
          <>
            <p>
              Agents present the benefit and stop. They state the monthly number but never annualize
              it, and they never connect it to something real in this client&rsquo;s specific life.
              That final step — the humanized cost of inaction — is the close. <strong>It is
              missing in the majority of calls.</strong>
            </p>
          </>
        ),
      },
      {
        title: 'The Three Steps — and Where It Breaks',
        content: (
          <>
            <ul className={styles.stepsList}>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>&#10003;</span>
                <span><strong>Step 1</strong> — State the comparison. Most agents do this.</span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>&#9888;</span>
                <span><strong>Step 2</strong> — Annualize it. Many agents skip this.</span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>&#10007;</span>
                <span><strong>Step 3</strong> — Humanize the cost of inaction. This is missing in the majority of lost calls.</span>
              </li>
            </ul>
            <p>
              From real calls: An agent presented a clear side-by-side comparison. The client said
              <em> &ldquo;OK forget it, bye.&rdquo;</em> The number was there. Step 3 never
              happened. The data was presented. The close was not.
            </p>
          </>
        ),
      },
      {
        title: 'What It Costs',
        content: (
          <>
            <p>The agent assumes the number speaks for itself — it doesn&rsquo;t.</p>
            <p>
              The agent didn&rsquo;t listen carefully during discovery, so they have nothing personal
              to connect it to. The agent moves too quickly from comparison to close without the
              humanizing bridge.
            </p>
          </>
        ),
      },
      {
        title: 'What It Sounds Like When Done Right',
        content: (
          <>
            <div className={styles.blockquote}>
              &ldquo;Right now you have $200 back on your Part B. This plan gives you $250.
              That&rsquo;s $50 more a month — that&rsquo;s $600 a year. You told me groceries are
              tight on a fixed income. That&rsquo;s two months of groceries you&rsquo;re leaving on
              the table right now.&rdquo;
            </div>
            <p>
              That last sentence is the close. The number alone is not.
            </p>
          </>
        ),
      },
      {
        title: 'How to Fix It',
        content: (
          <>
            <p>
              Before executing the Math Breakdown, identify what the client told you during discovery
              that matters most to them. That becomes Step 3.
            </p>
            <p>
              If you can&rsquo;t connect Step 3 to something specific the client said —{' '}
              <strong>ask one more discovery question first:</strong>
            </p>
            <div className={styles.blockquote}>
              &ldquo;Before I show you the numbers — tell me, what&rsquo;s been the hardest thing to
              manage on your current coverage?&rdquo;
            </div>
            <p>Then use their answer in Step 3.</p>
          </>
        ),
      },
    ],
    crossLinks: [
      { label: 'The Shift (Pillar 3)', href: '/pillars/the-shift' },
      { label: 'Pattern 1 — Client Gold Ignored', href: '/patterns/client-gold-ignored' },
      { label: 'The Math Breakdown', href: '/math-breakdown' },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Pattern 3 — Logic Responses to Emotional Objections             */
  /* -------------------------------------------------------------- */
  'logic-responses': {
    number: 3,
    title: 'Logic Responses to Emotional Objections',
    description: 'The client is in RED and you gave them information. You cannot explain someone out of a fear.',
    signal: 'red',
    rootCause: 'Wrong Response to Signal',
    pillarFix: 'Reframing (Pillar 2)',
    calloutCost: 'You cannot explain someone out of a fear. The emotion has to be addressed before any information lands.',
    sections: [
      {
        title: 'What This Is',
        content: (
          <>
            <p>
              When a client pushes back, agents explain. They present more information, more
              features, more math. That is the wrong tool. Client resistance is almost never
              intellectual — it is emotional. Fear of change. Fear of losing something. Fear of
              being wrong.
            </p>
            <p>
              <strong>You cannot explain someone out of a fear.</strong> The emotion has to be
              addressed before any information lands.
            </p>
          </>
        ),
      },
      {
        title: 'What It Sounds Like',
        content: (
          <>
            <p>
              The client says: <em>&ldquo;I don&rsquo;t want to change my plan.&rdquo;</em>
            </p>
            <p>
              The agent hears: an objection that needs to be overcome with better information.
            </p>
            <p>
              The agent responds: explains the benefits, walks through the comparison, makes the
              case. The client digs in harder. The call ends.
            </p>
            <p>
              From real calls: One agent responded to a brand loyalist by describing their current
              plan as &ldquo;inferior.&rdquo; The client immediately became more resistant and the
              call ended. The agent was factually correct. The client was emotionally walled off.
            </p>
          </>
        ),
      },
      {
        title: 'What It Costs',
        content: (
          <>
            <p>Every RED signal has an emotion underneath it. The words are a cover.</p>
            <ul className={styles.exampleList}>
              <li className={styles.exampleItem}>&ldquo;I&rsquo;m happy with what I have&rdquo; — fear of losing something that feels safe</li>
              <li className={styles.exampleItem}>&ldquo;I don&rsquo;t want to change&rdquo; — fear of making a mistake</li>
              <li className={styles.exampleItem}>&ldquo;I need to think about it&rdquo; — a polite exit from a call the agent stopped leading</li>
              <li className={styles.exampleItem}>&ldquo;My plan works for me&rdquo; — attachment + fear that &ldquo;working&rdquo; is fragile</li>
            </ul>
            <p>
              The moment you respond to those words with information, you are treating the cover as
              the objection. The real objection — the emotion — gets stronger because it was never
              addressed.
            </p>
          </>
        ),
      },
      {
        title: 'How to Fix It',
        content: (
          <>
            <p>
              Name the emotion first. Then redirect the meaning.
            </p>
            <p>
              <strong>Structure:</strong> <em>&ldquo;I hear you — [name what they&rsquo;re actually
              feeling]. [Redirect the meaning without dismissing the feeling].&rdquo;</em>
            </p>
            <p>
              <span className={styles.comparisonTable ? '' : ''}>
                <strong>Wrong:</strong> <em>&ldquo;But this plan has more dental coverage and a lower out-of-pocket max.&rdquo;</em>
              </span>
            </p>
            <p>
              <strong>Right:</strong> <em>&ldquo;I hear you — you&rsquo;ve had a plan that&rsquo;s
              worked and you don&rsquo;t want to risk losing what you have. What I&rsquo;m showing
              you doesn&rsquo;t take that away. It adds to it.&rdquo;</em>
            </p>
            <p>
              Before you present any information, ask yourself: <strong>Is this client in RED?</strong>{' '}
              If yes — reframe first. Information second. Every time.
            </p>
          </>
        ),
      },
    ],
    crossLinks: [
      { label: 'Reframing (Pillar 2)', href: '/pillars/reframing' },
      { label: 'Objection Handbook', href: '/objections' },
      { label: 'Three Client Signals', href: '/signals' },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Pattern 4 — Permission-Seeking Language                         */
  /* -------------------------------------------------------------- */
  'permission-seeking-language': {
    number: 4,
    title: 'Permission-Seeking Language',
    description: 'You handed control of the call to your client at the exact moment you needed to hold it.',
    signal: 'red',
    rootCause: 'Loss of Lead',
    pillarFix: 'Persuasion (Pillar 1)',
    calloutCost: 'Every permission-seeking phrase hands control of the call away at the exact moment the agent needs to hold it.',
    sections: [
      {
        title: 'What This Is',
        content: (
          <>
            <p>
              Phrases that ask the client&rsquo;s permission to continue — to present, to advance,
              to close. Every one of them hands control of the call away at the exact moment the
              agent needs to hold it.
            </p>
            <p>
              The client reads permission-seeking language as a signal that the agent doesn&rsquo;t
              fully believe in what they&rsquo;re offering. That signal arrives instantly. The client
              acts on it.
            </p>
          </>
        ),
      },
      {
        title: 'What It Sounds Like',
        content: (
          <>
            <p>Every one of these came from a real recorded call.</p>
            <ul className={styles.exampleList}>
              <li className={styles.exampleItem}><strong>&ldquo;I&rsquo;m not here to strong-arm you.&rdquo;</strong> — You introduced the concept of pressure where there was none.</li>
              <li className={styles.exampleItem}><strong>&ldquo;I just want to make sure you&rsquo;re comfortable.&rdquo;</strong> — You handed the client a checklist they hadn&rsquo;t been using.</li>
              <li className={styles.exampleItem}><strong>&ldquo;Would it be okay if I showed you something?&rdquo;</strong> — You asked permission to do your job.</li>
              <li className={styles.exampleItem}><strong>&ldquo;How does that sound?&rdquo;</strong> — You put the outcome of the call to a vote.</li>
              <li className={styles.exampleItem}><strong>&ldquo;Is that okay with you?&rdquo;</strong> — Same problem. Different words.</li>
              <li className={styles.exampleItem}><strong>&ldquo;Please say yes.&rdquo;</strong> — The client feels the desperation either way.</li>
              <li className={styles.exampleItem}><strong>&ldquo;I&rsquo;m not trying to pressure you.&rdquo;</strong> — You introduced the concept.</li>
            </ul>
          </>
        ),
      },
      {
        title: 'What It Costs',
        content: (
          <>
            <p>Agents do this because:</p>
            <p>
              They are conflict-averse and trying to soften resistance. They were trained to be
              &ldquo;nice&rdquo; instead of trained to lead. They are genuinely unsure the plan is
              better for this specific client. They learned it from someone else who was doing it
              wrong.
            </p>
            <p>
              The fix is not more confidence as a personality trait. It is genuine conviction that
              what you&rsquo;re offering is better for this person — and the clarity to say so
              without asking permission.
            </p>
          </>
        ),
      },
      {
        title: 'How to Fix It',
        content: (
          <>
            <p>
              Never ask the client if you can advance. <strong>State and move.</strong>
            </p>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th className={styles.wrong}>Permission</th>
                  <th className={styles.right}>Assumptive</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.wrong}>&ldquo;Would you like me to compare the plans?&rdquo;</td>
                  <td className={styles.right}>&ldquo;Let me pull up your current plan.&rdquo;</td>
                </tr>
                <tr>
                  <td className={styles.wrong}>&ldquo;Is it okay if I show you the numbers?&rdquo;</td>
                  <td className={styles.right}>&ldquo;Let me show you the numbers.&rdquo;</td>
                </tr>
                <tr>
                  <td className={styles.wrong}>&ldquo;Would you like to move forward?&rdquo;</td>
                  <td className={styles.right}>&ldquo;Let me get your information pulled up.&rdquo;</td>
                </tr>
                <tr>
                  <td className={styles.wrong}>&ldquo;How does that sound?&rdquo;</td>
                  <td className={styles.right}>[Just proceed to the next step]</td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
    ],
    crossLinks: [
      { label: 'Persuasion (Pillar 1)', href: '/pillars/persuasion' },
      { label: 'Pattern 6 — Rapport Without an Off-Switch', href: '/patterns/rapport-without-off-switch' },
      { label: 'Three Client Signals', href: '/signals' },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Pattern 5 — System Navigation Dead Air                          */
  /* -------------------------------------------------------------- */
  'system-navigation-dead-air': {
    number: 5,
    title: 'System Navigation Dead Air',
    description: 'When agents go silent during a system search, clients talk themselves out of the enrollment. Narrate. Ask questions. Keep them in it.',
    signal: 'yellow',
    rootCause: 'Momentum Killer',
    pillarFix: 'Refocusing (Pillar 4)',
    calloutCost: 'Every second of silence is an invitation for second-guessing. This pattern appears in nearly every agent\'s call data.',
    sections: [
      {
        title: 'What This Is',
        content: (
          <>
            <p>
              When agents search their systems, they go silent. Thirty seconds. Sixty seconds. Ninety
              seconds. In that silence, clients talk themselves out of the enrollment.{' '}
              <strong>This pattern appears in nearly every agent&rsquo;s call data.</strong>
            </p>
          </>
        ),
      },
      {
        title: 'What It Sounds Like',
        content: (
          <>
            <p>
              The client was moving toward yes. The agent went to verify a number or pull up a plan
              comparison. The silence began.
            </p>
            <p>
              In that silence, the client is alone with their doubts. The emotional momentum of the
              call dissipates. Every second of silence is an invitation for second-guessing. By the
              time the agent comes back, the client has traveled somewhere the agent can&rsquo;t
              see — and the call that was on track is now in trouble.
            </p>
            <p>
              From real calls: Five full minutes of silence during a system search. The resistance
              that ended that call was created entirely in that silence. Nearly two minutes on
              another call. Sixty seconds on a third. Every gap created the resistance that ended
              those calls.
            </p>
          </>
        ),
      },
      {
        title: 'What It Costs',
        content: (
          <>
            <p>
              This is not an objection from the client. This is a YELLOW signal the agent created
              themselves. The dead air generates resistance that did not exist before the silence
              began.
            </p>
          </>
        ),
      },
      {
        title: 'How to Fix It',
        content: (
          <>
            <p>
              While you are searching, <strong>keep the client engaged.</strong> Don&rsquo;t fill
              the silence with filler — keep it productive.
            </p>
            <p><strong>Discovery questions during navigation:</strong></p>
            <div className={styles.blockquote}>
              &ldquo;While I pull this up — tell me, have you been using your OTC benefit on your
              current plan? A lot of people I talk to don&rsquo;t realize it doesn&rsquo;t roll over
              at year-end.&rdquo;
            </div>
            <div className={styles.blockquote}>
              &ldquo;Give me just a second — quick question while I&rsquo;ve got you: who&rsquo;s
              your primary doctor? I want to confirm they&rsquo;re covered before we go any
              further.&rdquo;
            </div>
            <p><strong>Narrating the search itself:</strong></p>
            <div className={styles.blockquote}>
              &ldquo;I&rsquo;m looking at every plan available in your zip code right now...&rdquo;
            </div>
            <div className={styles.blockquote}>
              &ldquo;I&rsquo;ve got your current plan pulled up — going to put it side by side with
              what&rsquo;s available...&rdquo;
            </div>
            <p>
              <strong>The Rule: Never let more than 15 seconds pass without speaking.</strong> If you
              have nothing to ask, narrate what you&rsquo;re doing. If you have nothing to narrate,
              ask a discovery question.
            </p>
          </>
        ),
      },
    ],
    crossLinks: [
      { label: 'Refocusing (Pillar 4)', href: '/pillars/refocusing' },
      { label: 'Pattern 6 — Rapport Without an Off-Switch', href: '/patterns/rapport-without-off-switch' },
      { label: 'Three Client Signals', href: '/signals' },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Pattern 6 — Rapport Without an Off-Switch                       */
  /* -------------------------------------------------------------- */
  'rapport-without-off-switch': {
    number: 6,
    title: 'Rapport Without an Off-Switch',
    description: 'The client liked you. The call ended warmly. No enrollment. Social mode and sales mode are different gears.',
    signal: 'red',
    rootCause: 'Momentum Killer',
    pillarFix: 'Refocusing (Pillar 4)',
    calloutCost: 'Rapport without direction is not sales. It is conversation. And the longer the call stays in conversation mode, the harder it becomes to shift gears.',
    sections: [
      {
        title: 'What This Is',
        content: (
          <>
            <p>
              Agents build genuine connection with clients and then cannot transition into the close.
              The client likes them. The call ends warmly. No enrollment.
            </p>
            <p>
              Social mode and sales mode are different gears. Agents who build rapport effectively —
              but were never trained to shift out of it — generate warmth without enrollment. The
              call feels successful. It wasn&rsquo;t.
            </p>
          </>
        ),
      },
      {
        title: 'What It Sounds Like',
        content: (
          <>
            <p>
              The agent and client are bonding. The client is sharing. The call feels good. The agent
              is following every thread — health stories, family stories, past experiences — because
              they don&rsquo;t want to break the connection.
            </p>
            <p>
              The problem: rapport without direction is not sales. It is conversation. And the longer
              the call stays in conversation mode, the harder it becomes to shift gears.
            </p>
            <p>
              From real calls: An agent had everything needed to close by minute 25. The client was
              sharing personal stories. The agent kept building rapport — following every thread.
              The client&rsquo;s ride arrived at minute 52 and the window closed. The enrollment
              never happened.
            </p>
          </>
        ),
      },
      {
        title: 'What It Costs',
        content: (
          <>
            <p>
              Agents don&rsquo;t feel like they&rsquo;re making a mistake. The call feels good. The
              client feels heard. The warmth is genuine. The pattern only becomes visible in
              outcomes — calls that were going well, calls where the client was warm and engaged,
              calls that ended without an enrollment.
            </p>
            <p>
              If your calls are warm and your close rate is low, this is worth examining.
            </p>
          </>
        ),
      },
      {
        title: 'How to Fix It',
        content: (
          <>
            <p>
              There is a specific moment in every call where you need to stop following the
              client&rsquo;s tangent and redirect to the enrollment. That moment requires a phrase
              that validates the rapport while pivoting back to business.
            </p>
            <p><strong>The transition:</strong></p>
            <div className={styles.blockquote}>
              &ldquo;[Acknowledge the personal thing they shared] — I love that. Real quick before I
              let you go, I need to make sure you&rsquo;ve seen this number, because this is the
              part that actually matters for you...&rdquo;
            </div>
            <div className={styles.blockquote}>
              &ldquo;That&rsquo;s incredible — and honestly that&rsquo;s exactly why I want to make
              sure you have the right plan in place. Let me show you something real quick...&rdquo;
            </div>
            <div className={styles.blockquote}>
              &ldquo;I appreciate you sharing that with me. I want to make sure I&rsquo;m doing
              right by you before we hang up — let me pull up the comparison so you have the full
              picture.&rdquo;
            </div>
            <p>
              <strong>The key:</strong> validate in one sentence, then bridge to the enrollment with
              a forward statement — not a question. Questions invite the client back into
              conversation. Statements redirect.
            </p>
          </>
        ),
      },
    ],
    crossLinks: [
      { label: 'Refocusing (Pillar 4)', href: '/pillars/refocusing' },
      { label: 'Pattern 5 — System Navigation Dead Air', href: '/patterns/system-navigation-dead-air' },
      { label: 'Pattern 1 — Client Gold Ignored', href: '/patterns/client-gold-ignored' },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Pattern 7 — The Third Party Blind Spot                          */
  /* -------------------------------------------------------------- */
  'third-party-blind-spot': {
    number: 7,
    title: 'The Third Party Blind Spot',
    description: 'The real decision-maker was on the call and you never addressed them. The decision happened after you hung up.',
    signal: 'yellow',
    rootCause: 'Wrong Response to Signal',
    pillarFix: 'Persuasion (Pillar 1)',
    calloutCost: 'The sale wasn\'t lost because the math was wrong. It was lost because the conversation that decided it happened without the agent in the room.',
    sections: [
      {
        title: 'What This Is',
        content: (
          <>
            <p>
              A family member, spouse, or caregiver is present on the call or in the background. The
              agent keeps selling to the primary caller. The real decision maker is never addressed.
              The decision gets made after the agent hangs up — and it goes the wrong way.
            </p>
          </>
        ),
      },
      {
        title: 'What It Sounds Like',
        content: (
          <>
            <p>Recognize it early — <strong>identify this in the first two minutes:</strong></p>
            <ul className={styles.exampleList}>
              <li className={styles.exampleItem}>&ldquo;I need to talk to my daughter first.&rdquo;</li>
              <li className={styles.exampleItem}>&ldquo;My husband handles all of this.&rdquo;</li>
              <li className={styles.exampleItem}>&ldquo;Let me ask my son — he set up my last plan.&rdquo;</li>
              <li className={styles.exampleItem}>You can hear another voice in the background giving instructions or commentary</li>
              <li className={styles.exampleItem}>The client keeps pausing to relay what you&rsquo;re saying to someone else</li>
              <li className={styles.exampleItem}>&ldquo;I think that sounds good... let me just check with...&rdquo;</li>
            </ul>
          </>
        ),
      },
      {
        title: 'What It Costs',
        content: (
          <>
            <p>
              The sale wasn&rsquo;t lost because the math was wrong. It was lost because the
              conversation that decided it happened without the agent in the room. The longer you go
              without addressing the third party, the harder it becomes to get them on the call.
            </p>
          </>
        ),
      },
      {
        title: 'How to Fix It',
        content: (
          <>
            <p>
              <strong>The goal:</strong> before you hang up, the third party has heard the case
              directly from you.
            </p>
            <div className={styles.blockquote}>
              &ldquo;It sounds like [family member] is important to this decision — do you think
              they could jump on real quick? I&rsquo;d love to walk both of you through this at the
              same time so no one has to play telephone afterward.&rdquo;
            </div>
            <p>If the third party is already in the room, address them directly:</p>
            <div className={styles.blockquote}>
              &ldquo;[Name], I want to make sure you have the full picture too — because this
              affects your [mom/dad/spouse] every month. Can I walk you through what I&rsquo;m seeing
              real quick?&rdquo;
            </div>
            <p><strong>If you can&rsquo;t get them on the call:</strong></p>
            <p>
              Arm the primary caller with the specific language they need to explain the decision:
            </p>
            <div className={styles.blockquote}>
              &ldquo;When [daughter/son] asks about this — and they will — here&rsquo;s exactly what
              you can tell them: &lsquo;A licensed agent ran the side-by-side comparison with me. My
              doctor is confirmed in-network. My medications are still covered. And now I&rsquo;m
              getting money back instead of paying for nothing. They can call the agent directly if
              they want to go through it.&rsquo;&rdquo;
            </div>
            <p>
              If the client says <em>&ldquo;I want to talk to my daughter first&rdquo;</em> — test
              it before accepting it:
            </p>
            <div className={styles.blockquote}>
              &ldquo;Absolutely — what questions would you be asking her so I can make sure I&rsquo;m
              better prepared for when we speak again?&rdquo;
            </div>
          </>
        ),
      },
    ],
    crossLinks: [
      { label: 'Persuasion (Pillar 1)', href: '/pillars/persuasion' },
      { label: '9 Call Types', href: '/call-types' },
      { label: 'Three Client Signals', href: '/signals' },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Pattern 8 — Accepting Misinformation as Truth                   */
  /* -------------------------------------------------------------- */
  'accepting-misinformation': {
    number: 8,
    title: 'Accepting Misinformation as Truth',
    description: 'Your client said something false. You worked around it instead of dismantling it live. The false belief became the wall.',
    signal: 'red',
    rootCause: 'Wrong Response to Signal',
    pillarFix: 'Reframing (Pillar 2)',
    calloutCost: 'A false belief that\'s never directly addressed becomes the wall every argument runs into.',
    sections: [
      {
        title: 'What This Is',
        content: (
          <>
            <p>
              Clients come in with false information from doctors&rsquo; offices, family members,
              previous agents, or TV commercials. Agents accept it and try to work around it. The
              false belief becomes the foundation. The sale collapses on it.
            </p>
            <p>
              The false belief doesn&rsquo;t have to be directly related to the plan to sink the
              call. Any accepted misinformation gives the client a wall to hide behind.
            </p>
          </>
        ),
      },
      {
        title: 'What It Sounds Like',
        content: (
          <>
            <p><strong>Common sources of misinformation:</strong></p>
            <ul className={styles.exampleList}>
              <li className={styles.exampleItem}><strong>Doctor&rsquo;s office staff:</strong> &ldquo;My doctor said I can&rsquo;t change my plan.&rdquo;</li>
              <li className={styles.exampleItem}><strong>Family members:</strong> &ldquo;My daughter told me this plan is the best one.&rdquo;</li>
              <li className={styles.exampleItem}><strong>Previous agents:</strong> &ldquo;I was told I can&rsquo;t do better than what I have.&rdquo;</li>
              <li className={styles.exampleItem}><strong>TV commercials:</strong> &ldquo;A and B is all I need — they said so on TV.&rdquo;</li>
              <li className={styles.exampleItem}><strong>Other clients:</strong> &ldquo;My neighbor said Medicare Advantage plans are a scam.&rdquo;</li>
            </ul>
          </>
        ),
      },
      {
        title: 'What It Costs',
        content: (
          <>
            <p>
              The agent hears the false belief. They know it&rsquo;s wrong. But they don&rsquo;t
              want to make the client feel bad for believing it, or they&rsquo;re conflict-averse,
              so they try to work around it — acknowledging it as a concern, then presenting
              information anyway.
            </p>
            <p>
              The problem: a false belief that&rsquo;s never directly addressed becomes the wall
              every argument runs into. You can&rsquo;t out-logic a belief the client is emotionally
              invested in.
            </p>
          </>
        ),
      },
      {
        title: 'How to Fix It',
        content: (
          <>
            <p>
              <strong>Don&rsquo;t argue. Verify.</strong> Your system access is the authority — not
              you vs. the client.
            </p>
            <p><strong>&ldquo;My doctor said I can&rsquo;t change my plan.&rdquo;</strong></p>
            <div className={styles.blockquote}>
              &ldquo;I hear you — and I want to make sure you have the right information before you
              decide anything. Let me check Dr. [name]&rsquo;s status live right now, while
              we&rsquo;re on the phone. Doctors&rsquo; offices sometimes aren&rsquo;t up to date on
              which plans they&rsquo;re contracted with — those contracts change every year.&rdquo;
            </div>
            <p><strong>&ldquo;I was told I&rsquo;d lose my Medicaid if I switch.&rdquo;</strong></p>
            <div className={styles.blockquote}>
              &ldquo;I completely understand why that would stop you — and I want to make sure you
              have the right information. Medicaid and your Medicare Advantage plan are two separate
              programs. Switching your Medicare plan does not affect your Medicaid status.&rdquo;
            </div>
            <p><strong>&ldquo;The commercial said A and B is all I need.&rdquo;</strong></p>
            <div className={styles.blockquote}>
              &ldquo;I completely understand why you feel that way — those commercials make it sound
              like the money comes straight to you once you have Parts A and B. What they leave out
              is that the government gives those funds to specific plans to distribute. You&rsquo;ve
              already done the hard part by getting Parts A and B. My job is to find which plan in
              your area pays out the highest amount.&rdquo;
            </div>
            <p>
              <strong>The principle:</strong> The screen is the authority. Not you vs. the client.{' '}
              <em>&ldquo;Let me check that right now while we&rsquo;re on the phone&rdquo;</em> is
              the most powerful phrase for this pattern because it makes the verification a live,
              shared experience.
            </p>
          </>
        ),
      },
    ],
    crossLinks: [
      { label: 'Reframing (Pillar 2)', href: '/pillars/reframing' },
      { label: '9 Call Types', href: '/call-types' },
      { label: 'Three Client Signals', href: '/signals' },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Pattern 9 — The Hollow Yes                                      */
  /* -------------------------------------------------------------- */
  'hollow-yes': {
    number: 9,
    title: 'The Hollow Yes',
    description: 'You got the enrollment. The client hangs up uncertain. That is not a win — it is a disenrollment in slow motion.',
    signal: 'yellow',
    rootCause: 'Momentum Killer',
    pillarFix: 'The Close Confirmation Protocol',
    calloutCost: 'Enrollments are being counted that are already at risk before the effective date arrives.',
    sections: [
      {
        title: 'What This Is',
        content: (
          <>
            <p>
              The agent gets the enrollment. The client hangs up uncertain. That is not a win. That
              is a disenrollment in slow motion.
            </p>
            <p>
              Enrollments are being counted that are already at risk before the effective date
              arrives. The client said yes on the call, but they don&rsquo;t know what they enrolled
              in, they can&rsquo;t explain why they switched, and they have no specific thing
              they&rsquo;re looking forward to.
            </p>
          </>
        ),
      },
      {
        title: 'What It Sounds Like',
        content: (
          <>
            <p>
              <strong>The Three Questions Test</strong> — before hanging up, every enrolled client
              should be able to answer these without you prompting them:
            </p>
            <ul className={styles.stepsList}>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>1</span>
                <span><strong>What plan did I just enroll in and when does it start?</strong></span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>2</span>
                <span><strong>Why did I switch?</strong></span>
              </li>
              <li className={styles.stepItem}>
                <span className={styles.stepIcon}>3</span>
                <span><strong>What is the one thing I&rsquo;m most looking forward to?</strong></span>
              </li>
            </ul>
            <p>
              If they cannot answer all three, the Close Confirmation was not executed. The Hollow
              Yes is in motion.
            </p>
          </>
        ),
      },
      {
        title: 'What It Costs',
        content: (
          <>
            <p>
              The agent closed the enrollment and felt the relief of the yes. The compliance steps
              were completed. The call ended on warmth. But:
            </p>
            <p>
              The client was never explicitly told what plan they enrolled in and when coverage
              starts. The client was never given a clear, specific reason for why the switch made
              sense for them — in language they could repeat. The client was never given something
              concrete to anticipate.
            </p>
            <p>
              Without those three things, the client hangs up with a yes they can&rsquo;t defend.
            </p>
          </>
        ),
      },
      {
        title: 'How to Fix It',
        content: (
          <>
            <p>
              <strong>The Close Confirmation Protocol</strong> — three components, executed in
              sequence after every enrollment:
            </p>
            <p><strong>Component 1 — The Anchor Statement</strong></p>
            <p>Name the plan, the effective date, and the specific benefit that motivated the enrollment.</p>
            <div className={styles.blockquote}>
              &ldquo;Mr. Williams, you&rsquo;re all set. Remember — starting February 1st, that
              $148 comes back to your Social Security check every single month. That&rsquo;s $1,776
              a year back in your pocket.&rdquo;
            </div>
            <p><strong>Component 2 — The Confidence Statement</strong></p>
            <p>Give them the exact language to explain the switch to anyone who asks.</p>
            <div className={styles.blockquote}>
              &ldquo;If your family asks why you switched, you can tell them: &lsquo;I was leaving
              almost $1,800 a year on the table. My doctor is still covered, my medications are
              still covered, and now I&rsquo;m getting money back instead of paying for
              nothing.&rsquo;&rdquo;
            </div>
            <p><strong>Component 3 — The Forward Close</strong></p>
            <p>End with something specific to look forward to.</p>
            <div className={styles.blockquote}>
              &ldquo;You&rsquo;ll get your plan card in the mail in about 7 to 10 days. Your
              coverage starts February 1st. You made the right call today, Mr. Williams.&rdquo;
            </div>
            <p>
              <strong>A client who hangs up secure does not disenroll.</strong> The Close
              Confirmation Protocol is not a formality. It is what converts a yes on the phone into
              a retained member. Every component is required.
            </p>
          </>
        ),
      },
    ],
    crossLinks: [
      { label: 'Four Pillars', href: '/pillars' },
      { label: 'Pattern 3 — Logic Responses', href: '/patterns/logic-responses' },
      { label: 'Three Client Signals', href: '/signals' },
    ],
  },
}

/* ------------------------------------------------------------------ */
/* Page component                                                      */
/* ------------------------------------------------------------------ */

export default function PatternContent({ slug }: { slug: string }) {
  const pattern = PATTERNS[slug]

  if (!pattern) {
    return (
      <PageShell signal="neutral">
        <section className={styles.hero}>
          <h1 className={`${styles.headline} display-xl`}>Pattern not found</h1>
          <p className={styles.description}>
            The pattern &ldquo;{slug}&rdquo; does not exist.{' '}
            <Link href="/patterns">View all patterns.</Link>
          </p>
        </section>
      </PageShell>
    )
  }

  return (
    <PageShell signal={pattern.signal}>
      {/* Hero */}
      <section className={styles.hero}>
        <motion.nav
          className={styles.breadcrumb}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...SPRING, delay: 0.05 }}
        >
          <Link href="/patterns" className={styles.breadcrumbLink}>Patterns</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>Pattern {pattern.number}</span>
        </motion.nav>

        <motion.div
          className={styles.meta}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.1 }}
        >
          <SignalBadge signal={pattern.signal} size="lg" />
          <span className={styles.metaTag}>{pattern.rootCause}</span>
          <span className={styles.metaTag}>{pattern.pillarFix}</span>
        </motion.div>

        <motion.h1
          className={`${styles.headline} display-xl`}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.15 }}
        >
          {pattern.title}
        </motion.h1>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.25 }}
        >
          {pattern.description}
        </motion.p>
      </section>

      {/* Callout — the cost */}
      <div className={styles.content}>
        <motion.div
          className={styles.calloutWrapper}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.3 }}
        >
          <CalloutBlock type={pattern.signal}>
            {pattern.calloutCost}
          </CalloutBlock>
        </motion.div>

        {/* Content sections */}
        {pattern.sections.map((section, i) => (
          <AnimatedSection key={section.title} section={section} index={i} />
        ))}
      </div>

      {/* Cross links */}
      <section className={styles.crossSection}>
        <CrossLinks links={pattern.crossLinks} />
      </section>
    </PageShell>
  )
}
