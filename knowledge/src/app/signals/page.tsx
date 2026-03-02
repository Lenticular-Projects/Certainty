'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SPRING } from '@/lib/motion'
import { useSignalHover } from '@/hooks/useSignalHover'
import PageShell from '@/components/layout/PageShell'
import CalloutBlock from '@/components/ui/CalloutBlock'
import CrossLinks from '@/components/ui/CrossLinks'
import styles from './page.module.css'

function SignalSection({ signal, children, className }: { signal: 'green' | 'red' | 'yellow'; children: React.ReactNode; className?: string }) {
  const hover = useSignalHover(signal)
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={SPRING}
      {...hover}
    >
      {children}
    </motion.section>
  )
}

export default function SignalsPage() {
  return (
    <PageShell signal="neutral">
      {/* ---- Hero ---- */}
      <section className={styles.hero}>
        <motion.h1
          className={`${styles.title} display-xl`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SPRING}
        >
          The Three Client Signals
        </motion.h1>

        <motion.p
          className={styles.intro}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...SPRING, delay: 0.08 }}
        >
          At every moment in a call, the client is in one of three states. The
          agent&rsquo;s job is to read the signal and deploy the right response.
          Misreading the signal&nbsp;&mdash; or responding to the words instead of
          the state&nbsp;&mdash; is Root Cause&nbsp;2.
        </motion.p>

        <motion.p
          className={styles.intro}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...SPRING, delay: 0.14 }}
        >
          Most clients start somewhere between Yellow and Red.{' '}
          <strong>
            Green is where they end up when you&rsquo;re leading well.
          </strong>{' '}
          Your job is to read where they are and respond&nbsp;&mdash; not deploy
          the same response every time.
        </motion.p>
      </section>

      {/* ---- Visual ---- */}
      <motion.section
        className={styles.visualSection}
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <div className={`${styles.visualCard} glass`}>
          <Image
            src="/images/signals-visual.png"
            alt="Diagram of the three client signals: GREEN (open), RED (resistant), YELLOW (drifting)"
            width={900}
            height={520}
            className={styles.visualImage}
            priority
          />
        </div>
      </motion.section>

      {/* ---- Callout: handle RED before YELLOW ---- */}
      <motion.section
        className={styles.calloutSection}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={SPRING}
      >
        <CalloutBlock type="red">
          <p>
            <strong>The rule: always handle RED before YELLOW.</strong> Address
            the emotion before attempting to refocus. An agent who tries to
            refocus a resistant client is applying the wrong tool. The client is
            not drifting&nbsp;&mdash; they are afraid. Name it first.
          </p>
        </CalloutBlock>
      </motion.section>

      {/* ---- GREEN ---- */}
      <SignalSection signal="green" className={styles.signalSection}>
        <div className={styles.signalHeader}>
          <span className={`${styles.signalDot} ${styles.green}`} />
          <h2 className={`${styles.signalTitle} display-lg`}>
            GREEN&nbsp;&mdash; Open and With You
          </h2>
        </div>

        <p className={styles.body}>
          Engaged. Asking questions. Saying &ldquo;really?&rdquo; or &ldquo;how
          does that work?&rdquo; Leaning in.
        </p>

        <h3 className={styles.subhead}>Your move</h3>
        <p className={styles.body}>
          Present value, execute the Math Breakdown, move toward the close.
        </p>

        <h3 className={styles.subhead}>Watch yourself</h3>
        <p className={styles.body}>
          Don&rsquo;t stay in presentation mode when the signal shifts&nbsp;&mdash;
          and don&rsquo;t assume GREEN is permanent. A client who was fully
          engaged and asking questions can go YELLOW if dead air sets in, or RED
          if something they hear triggers fear.
        </p>

        <h3 className={styles.subhead}>What GREEN sounds like</h3>
        <ul className={styles.quoteList}>
          <li>&ldquo;Really? I didn&rsquo;t know that.&rdquo;</li>
          <li>&ldquo;How does the grocery card work exactly?&rdquo;</li>
          <li>&ldquo;So I could get more money back?&rdquo;</li>
          <li>&ldquo;That sounds good&nbsp;&mdash; what would I need to do?&rdquo;</li>
        </ul>

        <h3 className={styles.subhead}>Which pillar</h3>
        <p className={styles.body}>
          Persuasion (stay in the lead), The Shift (execute the Math Breakdown
          when ready)
        </p>
      </SignalSection>

      {/* ---- RED ---- */}
      <SignalSection signal="red" className={styles.signalSection}>
        <div className={styles.signalHeader}>
          <span className={`${styles.signalDot} ${styles.red}`} />
          <h2 className={`${styles.signalTitle} display-lg`}>
            RED&nbsp;&mdash; Resistant
          </h2>
        </div>

        <p className={styles.body}>Pushing back. Going quiet. Digging in.</p>

        <h3 className={styles.subhead}>
          What you must understand about RED
        </h3>
        <p className={styles.body}>
          The words they say are not the objection. The emotion underneath is.
        </p>

        <ul className={styles.quoteList}>
          <li>
            <em>&ldquo;I&rsquo;m happy with what I have&rdquo;</em>&nbsp;&mdash;
            fear of losing something that feels safe
          </li>
          <li>
            <em>&ldquo;I need to think about it&rdquo;</em>&nbsp;&mdash; a polite
            exit from a call the agent stopped leading
          </li>
          <li>
            <em>&ldquo;I want to talk to my daughter&rdquo;</em>&nbsp;&mdash;
            often not about the daughter; about not feeling pushed
          </li>
          <li>
            <em>&ldquo;I&rsquo;ll stick with what I got&rdquo;</em>&nbsp;&mdash;
            inertia dressed up as a decision
          </li>
        </ul>

        <p className={styles.body}>
          You cannot logic someone out of a fear. The moment you respond to RED
          with information, you are losing. Your job is to lead them out of
          RED&nbsp;&mdash; not follow them into it.
        </p>

        <h3 className={styles.subhead}>Your move</h3>
        <p className={styles.body}>
          Name the emotion first. Reframe the meaning. Then&nbsp;&mdash; and only
          then&nbsp;&mdash; redirect.
        </p>

        <h3 className={styles.subhead}>Watch yourself</h3>
        <p className={styles.body}>
          Explaining, presenting more features, or defending the plan when a
          client pushes back. That is the wrong tool. Information against fear
          hardens the fear.
        </p>

        <h3 className={styles.subhead}>Which pillar</h3>
        <p className={styles.body}>Reframing</p>
      </SignalSection>

      {/* ---- YELLOW ---- */}
      <SignalSection signal="yellow" className={styles.signalSection}>
        <div className={styles.signalHeader}>
          <span className={`${styles.signalDot} ${styles.yellow}`} />
          <h2 className={`${styles.signalTitle} display-lg`}>
            YELLOW&nbsp;&mdash; Drifting
          </h2>
        </div>

        <p className={styles.body}>
          The call has gone social. Dead air has set in. You&rsquo;re on a
          tangent. The direction is gone.
        </p>

        <p className={styles.body}>
          YELLOW doesn&rsquo;t fix itself. It requires leadership. And
          here&rsquo;s what most agents don&rsquo;t realize: you think
          you&rsquo;re building rapport, but you&rsquo;re actually burning your
          client&rsquo;s decision-making bandwidth. The longer a call meanders,
          the harder it becomes for the client to re-engage. Think of an athlete
          who stops moving mid-game&nbsp;&mdash; it&rsquo;s harder to get back to
          speed than to stay in motion. For a 70 or 80-year-old on the phone,
          mental fatigue is real. You have to keep the energy moving.
        </p>

        <p className={styles.body}>
          When a call goes YELLOW and stays there long enough, it doesn&rsquo;t
          end in a no&nbsp;&mdash; it ends in &ldquo;I need to think about
          it.&rdquo; That&rsquo;s not the client&rsquo;s decision. That&rsquo;s
          your decision to let the call drift.
        </p>

        <h3 className={styles.subhead}>Your move</h3>
        <p className={styles.body}>
          Validate in one sentence, then bridge back to their benefits with a
          forward statement&nbsp;&mdash; always back toward the enrollment, never
          just back to conversation.
        </p>

        <h3 className={styles.subhead}>Watch yourself</h3>
        <p className={styles.body}>
          Creating YELLOW yourself with system navigation dead air.
          That&rsquo;s self-inflicted.
        </p>

        <h3 className={styles.subhead}>Bridge phrases that work</h3>
        <ul className={styles.quoteList}>
          <li>
            <em>
              &ldquo;I love that&nbsp;&mdash; and that&rsquo;s actually exactly
              why this matters for you...&rdquo;
            </em>
          </li>
          <li>
            <em>
              &ldquo;Real quick&nbsp;&mdash; based on what you just told me, let
              me show you something...&rdquo;
            </em>
          </li>
          <li>
            <em>
              &ldquo;That connects perfectly to what I need to show you about
              your plan...&rdquo;
            </em>
          </li>
          <li>
            <em>
              &ldquo;While I pull this up&nbsp;&mdash; tell me, are you using all
              the benefits on your current plan? A lot of people I talk to
              don&rsquo;t realize some of them expire if you don&rsquo;t use
              them.&rdquo;
            </em>
          </li>
        </ul>

        <h3 className={styles.subhead}>Which pillar</h3>
        <p className={styles.body}>Refocusing</p>
      </SignalSection>

      {/* ---- Cross-links ---- */}
      <section className={styles.crossSection}>
        <CrossLinks
          links={[
            { label: 'Four Pillars', href: '/pillars' },
            { label: 'Nine Failure Patterns', href: '/patterns' },
            { label: '9 Call Types', href: '/call-types' },
          ]}
        />
      </section>
    </PageShell>
  )
}
