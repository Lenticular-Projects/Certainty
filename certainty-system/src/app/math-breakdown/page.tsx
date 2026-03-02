'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SPRING } from '@/lib/motion'
import PageShell from '@/components/layout/PageShell'
import CalloutBlock from '@/components/ui/CalloutBlock'
import CrossLinks from '@/components/ui/CrossLinks'
import styles from './page.module.css'

export default function MathBreakdownPage() {
  return (
    <PageShell signal="green">
      <motion.h1
        className="display-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
      >
        The Math Breakdown
      </motion.h1>

      <motion.p
        className={`body-lg ${styles.intro}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.1 }}
      >
        The Math Breakdown is not a script. It is a three-step execution tool that lives under Pillar 3 — The Shift. Every agent must know all three steps before getting on a call.
      </motion.p>

      <motion.div
        className={`glass ${styles.imageWrapper}`}
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <Image
          src="/images/math-breakdown-flow.png"
          alt="The Math Breakdown — three-step flow diagram"
          width={900}
          height={500}
          className={styles.image}
        />
      </motion.div>

      <CalloutBlock type="green">
        <strong>The principle:</strong> Never let the client compare new plan vs. old plan. Make them compare action vs. loss. The moment a client understands that inaction has a specific dollar cost — not a missed opportunity, but an active loss — staying is no longer the safe choice.
      </CalloutBlock>

      <motion.blockquote
        className={styles.quote}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={SPRING}
      >
        The agent&rsquo;s job is not to show the client what they&rsquo;d gain. It&rsquo;s to show them what they&rsquo;re currently giving away.
      </motion.blockquote>

      {/* Step 1 */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <h2 className="display-lg">Step 1 — State the Comparison</h2>
        <p className="body-lg">Side by side. Current benefit vs. available benefit. <strong>Specific numbers.</strong> Not ranges, not approximations — the actual number for their zip code, their plan, their situation.</p>
        <div className={styles.examples}>
          <p className="mono-block">&ldquo;Right now you have $200 back on your Part B. This plan gives you $250.&rdquo;</p>
          <p className="mono-block">&ldquo;Your current plan has a $615 drug deductible. This plan has $0.&rdquo;</p>
          <p className="mono-block">&ldquo;You&rsquo;re getting $75 a month on the OTC card. There&rsquo;s a plan in your area paying $175.&rdquo;</p>
          <p className="mono-block">&ldquo;Your current dental benefit is $1,000. This plan has $2,000. Same network.&rdquo;</p>
        </div>
        <p className="body-md">The number has to be real and specific. &ldquo;You could get more&rdquo; is not a number. Give them the number.</p>
      </motion.section>

      {/* Step 2 */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <h2 className="display-lg">Step 2 — Annualize It</h2>
        <p className="body-lg">Monthly numbers feel small. Annual numbers land.</p>
        <ul className={styles.list}>
          <li>$35/month is easy to dismiss</li>
          <li>$420/year is harder</li>
          <li>$420/year &ldquo;is your grocery bill for six weeks&rdquo; — that&rsquo;s the close</li>
        </ul>
        <p className="body-md"><strong>Always multiply by 12. Always state the annual figure explicitly — do not expect the client to do that math.</strong></p>
        <div className={styles.examples}>
          <p className="mono-block">&ldquo;That&rsquo;s $600 a year you&rsquo;re leaving on the table.&rdquo;</p>
          <p className="mono-block">&ldquo;Over the course of the year, that difference is $1,200.&rdquo;</p>
          <p className="mono-block">&ldquo;That&rsquo;s $2,400 a year. Every year.&rdquo;</p>
        </div>
        <p className="body-md">Say the annual number out loud. Then stop. Let it sit for a beat. Don&rsquo;t rush past it.</p>
      </motion.section>

      {/* Step 3 */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <h2 className="display-lg">Step 3 — Humanize the Cost of Inaction</h2>
        <p className="body-lg">Connect the annual number to something real this specific client said during the call.</p>
        <p className="body-md"><strong>This is not generic. It must be specific to what this person told you. This step is the close. It is missing in the majority of lost calls.</strong></p>
        <div className={styles.examples}>
          <p className="mono-block">&ldquo;You told me groceries are tight on a fixed income. That&rsquo;s $600 a year — that&rsquo;s two months of groceries you&rsquo;re leaving on the table right now.&rdquo;</p>
          <p className="mono-block">&ldquo;You mentioned you&rsquo;ve been putting off the dental work. This plan has a $2,000 dental benefit. That work happens this year.&rdquo;</p>
          <p className="mono-block">&ldquo;You told me you&rsquo;ve been cutting your pills in half. That stops. The drug deductible goes to zero.&rdquo;</p>
          <p className="mono-block">&ldquo;You said your granddaughter&rsquo;s birthday is next month. That $420 — that&rsquo;s the gift. It&rsquo;s already funded. It&rsquo;s just sitting in the wrong plan.&rdquo;</p>
        </div>
      </motion.section>

      {/* Loss Aversion */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <h2 className="display-lg">The Loss Aversion Principle</h2>
        <p className="body-lg">People feel losses twice as powerfully as gains. Every step of this breakdown must be framed as loss, not gain.</p>
        <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Gain frame</th>
              <th>Loss frame</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&ldquo;You&rsquo;d get an extra $100 a month.&rdquo;</td>
              <td>&ldquo;You&rsquo;re leaving $1,200 a year on the table.&rdquo;</td>
            </tr>
            <tr>
              <td>&ldquo;This plan has more dental.&rdquo;</td>
              <td>&ldquo;You&rsquo;re paying for dental you&rsquo;re not getting.&rdquo;</td>
            </tr>
            <tr>
              <td>&ldquo;You could get a grocery card.&rdquo;</td>
              <td>&ldquo;That $175 a month is funded. It&rsquo;s just going to someone else.&rdquo;</td>
            </tr>
          </tbody>
        </table>
        </div>
      </motion.section>

      {/* 3-Question Test */}
      <CalloutBlock type="green">
        <strong>The 3-Question Test</strong> — Before hanging up, the client should be able to answer:
        <ol className={styles.testList}>
          <li>What plan did I just enroll in and when does it start?</li>
          <li>Why did I switch?</li>
          <li>What is the one thing I&rsquo;m most looking forward to?</li>
        </ol>
        <p><strong>Question 2 is answered by the Math Breakdown.</strong> If they can&rsquo;t explain why they switched in their own words, Step 3 didn&rsquo;t land.</p>
      </CalloutBlock>

      <CrossLinks links={[
        { label: 'Pillar 3 — The Shift', href: '/pillars/the-shift' },
        { label: 'Pattern 2 — Incomplete Math Breakdown', href: '/patterns/incomplete-math-breakdown' },
        { label: 'Close Confirmation Protocol', href: '/close-confirmation' },
      ]} />
    </PageShell>
  )
}
