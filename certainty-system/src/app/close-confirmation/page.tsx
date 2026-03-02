'use client'

import { motion } from 'framer-motion'
import { SPRING } from '@/lib/motion'
import PageShell from '@/components/layout/PageShell'
import CalloutBlock from '@/components/ui/CalloutBlock'
import CrossLinks from '@/components/ui/CrossLinks'
import styles from './page.module.css'

export default function CloseConfirmationPage() {
  return (
    <PageShell signal="neutral">
      <motion.h1
        className="display-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
      >
        The Close Confirmation Protocol
      </motion.h1>

      <motion.p
        className={`body-lg ${styles.intro}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.1 }}
      >
        The Close Confirmation Protocol is executed after every enrollment, after all compliance steps are complete. It is not a formality. It is what converts a yes on the phone into a retained member.
      </motion.p>

      <CalloutBlock type="red">
        <strong>Why it exists:</strong> Pattern 9 — The Hollow Yes. The client said yes. The client hangs up uncertain. That is a disenrollment in slow motion. The Close Confirmation Protocol is how it doesn&rsquo;t happen.
      </CalloutBlock>

      {/* 3-Question Test */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <h2 className="display-lg">The Three-Question Test</h2>
        <p className="body-lg">Before hanging up, every enrolled client should be able to answer these three questions <strong>without you prompting them:</strong></p>
        <ol className={styles.testList}>
          <li><strong>What plan did I just enroll in and when does it start?</strong></li>
          <li><strong>Why did I switch?</strong></li>
          <li><strong>What is the one thing I&rsquo;m most looking forward to?</strong></li>
        </ol>
        <p className="body-md">The Anchor Statement covers #1. The Confidence Statement covers #2. The Forward Close covers #3. <strong>All three components are required.</strong> Skipping any one leaves a gap the client will fill with doubt.</p>
      </motion.section>

      {/* Component 1 */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <h2 className="display-lg">Component 1 — The Anchor Statement</h2>
        <p className="body-lg"><strong>Purpose:</strong> Make the specific benefit concrete and memorable. The client must leave the call knowing exactly what they enrolled in and what changes for them on day one.</p>
        <div className={styles.structure}>
          <p className="mono-block">&ldquo;[Client name], you&rsquo;re all set. Remember — starting [date], [the specific benefit they enrolled for]. That&rsquo;s [monthly amount] a month — that&rsquo;s [annual amount] a year back in your pocket.&rdquo;</p>
        </div>
        <div className={styles.examples}>
          <p className="mono-block">&ldquo;Mr. Williams, you&rsquo;re all set. Remember — starting February 1st, that $148 comes back to your Social Security check every single month. That&rsquo;s $1,776 a year back in your pocket.&rdquo;</p>
          <p className="mono-block">&ldquo;Ms. Davis, you&rsquo;re all set. Your dental benefit is $2,000 starting January 1st. That appointment you&rsquo;ve been putting off — make it.&rdquo;</p>
          <p className="mono-block">&ldquo;Mrs. Johnson, you&rsquo;re all set. Your OTC card loads $175 on the first of every month starting February. That&rsquo;s yours.&rdquo;</p>
        </div>
      </motion.section>

      {/* Component 2 */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <h2 className="display-lg">Component 2 — The Confidence Statement</h2>
        <p className="body-lg"><strong>Purpose:</strong> Give the client the exact language to explain and defend the switch to anyone who asks — family members, friends, neighbors, their doctor&rsquo;s office.</p>
        <div className={styles.structure}>
          <p className="mono-block">&ldquo;If [family member / anyone] asks why you switched, you can tell them: &lsquo;[Plain-language explanation of the decision that this specific client can repeat back].&rsquo;&rdquo;</p>
        </div>
        <h3 className="heading-md">By call type:</h3>
        <div className={styles.examples}>
          <div className={styles.exampleGroup}>
            <span className="label">Money Caller</span>
            <p className="mono-block">&ldquo;If your family asks why you switched, you can tell them: &lsquo;I was leaving almost $1,800 a year on the table. My doctor is still covered, my medications are still covered, and now I&rsquo;m getting money back instead of paying for nothing.&rsquo;&rdquo;</p>
          </div>
          <div className={styles.exampleGroup}>
            <span className="label">Scared Switcher</span>
            <p className="mono-block">&ldquo;If anyone tells you that you shouldn&rsquo;t have switched, you can tell them: &lsquo;I verified my doctor is still in-network and my medications are still covered. Everything I had, I kept — and now I also get [benefit].&rsquo;&rdquo;</p>
          </div>
          <div className={styles.exampleGroup}>
            <span className="label">Veteran</span>
            <p className="mono-block">&ldquo;If someone asks why you added Medicare to your VA — you can tell them: &lsquo;My VA covers everything at the VA. This covers everything outside it. They work together. I&rsquo;m not replacing anything. I just stopped having a gap.&rsquo;&rdquo;</p>
          </div>
          <div className={styles.exampleGroup}>
            <span className="label">Third Party Controlled</span>
            <p className="mono-block">&ldquo;When [daughter/son] asks about this — here&rsquo;s what you can tell them: &lsquo;A licensed agent ran the side-by-side comparison with me. My doctor is confirmed in-network. My medications are covered. And I&rsquo;m getting [benefit] I wasn&rsquo;t getting before.&rsquo;&rdquo;</p>
          </div>
        </div>
      </motion.section>

      {/* Component 3 */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <h2 className="display-lg">Component 3 — The Forward Close</h2>
        <p className="body-lg"><strong>Purpose:</strong> End the call with the client looking forward, not looking back. Give them something specific to anticipate so the last thing they feel is anticipation, not anxiety.</p>
        <div className={styles.structure}>
          <p className="mono-block">&ldquo;You&rsquo;ll get your new card in the mail in [timeframe]. Your coverage starts [date]. You made a smart move today, [client name]. [Connect to something specific they mentioned.]&rdquo;</p>
        </div>
        <div className={styles.examples}>
          <p className="mono-block">&ldquo;Your new card will arrive in 7–10 business days. Coverage starts January 1st. You made a smart move today, Mrs. Johnson. Go ahead and schedule that dental appointment.&rdquo;</p>
          <p className="mono-block">&ldquo;Everything kicks in on the first. You&rsquo;ll get confirmation in the mail this week. You did the right thing today, Mr. Williams — your coverage is solid.&rdquo;</p>
        </div>
      </motion.section>

      {/* Medicare Note */}
      <CalloutBlock type="neutral">
        <strong>Medicare Enrollment Accuracy Note:</strong> There is no unconditional cancellation window for Medicare Advantage after enrollment. What you can commit to: &ldquo;If you enroll today and something isn&rsquo;t right, call me directly. I will work to find a resolution through the proper enrollment channels. That&rsquo;s what I&rsquo;m here for.&rdquo;
      </CalloutBlock>

      <CrossLinks links={[
        { label: 'Pattern 9 — The Hollow Yes', href: '/patterns/hollow-yes' },
        { label: 'The Math Breakdown', href: '/math-breakdown' },
        { label: 'How Calls Are Graded', href: '/how-calls-are-graded' },
      ]} />
    </PageShell>
  )
}
