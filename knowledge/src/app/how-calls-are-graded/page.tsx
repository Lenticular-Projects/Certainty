'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SPRING } from '@/lib/motion'
import PageShell from '@/components/layout/PageShell'
import CalloutBlock from '@/components/ui/CalloutBlock'
import CrossLinks from '@/components/ui/CrossLinks'
import styles from './page.module.css'

const categories = [
  { name: 'Lead', max: 20, description: 'Did you lead the call, maintain that lead, and recover it when lost?', earns: ['Held authority and consultant frame throughout', 'Assumptive language used consistently', 'When lost, deliberate recovery attempted'], costs: ['Permission-seeking language at any point', 'Passive closes', 'Lead lost and not recovered'], guide: '18–20 = dominant frame | 13–17 = held with minor slippage | 8–12 = lost at least once | 0–7 = lost early, not recovered', links: [{ label: 'Pillar 1 — Persuasion', href: '/pillars/persuasion' }, { label: 'Pattern 1 — Client Gold Ignored', href: '/patterns/client-gold-ignored' }, { label: 'Pattern 4 — Permission-Seeking Language', href: '/patterns/permission-seeking-language' }] },
  { name: 'Signal Reading', max: 20, description: 'Did you correctly identify the client\'s state at each key moment and respond with the right tool?', earns: ['Correct signal identified at each key moment', 'Right tool deployed — empathy on RED, statement on YELLOW, value on GREEN', 'Client Gold recognized and deployed later'], costs: ['Logic response to emotional objection', 'Refocus tool applied to RED signal', 'Client Gold missed entirely'], guide: '18–20 = every moment correct | 13–17 = mostly correct, one misread | 8–12 = multiple misreads | 0–7 = absent', links: [{ label: 'Three Signals', href: '/signals' }, { label: 'Pillar 2 — Reframing', href: '/pillars/reframing' }, { label: 'Pillar 4 — Refocusing', href: '/pillars/refocusing' }] },
  { name: 'Math Breakdown', max: 20, description: 'Was the Math Breakdown executed — and did it land?', earns: ['Step 1: specific monthly comparison stated', 'Step 2: annual figure stated explicitly', 'Step 3: connected to something real this client said', 'All three steps landed in sequence'], costs: ['Benefit mentioned but not compared', 'Monthly number stated but not annualized', 'Annual number stated but not humanized'], guide: '18–20 = all three steps clean | 13–17 = two steps, Step 3 incomplete | 8–12 = Step 1 only | 0–7 = no structured breakdown', links: [{ label: 'The Math Breakdown', href: '/math-breakdown' }, { label: 'Pillar 3 — The Shift', href: '/pillars/the-shift' }, { label: 'Pattern 2 — Incomplete Math Breakdown', href: '/patterns/incomplete-math-breakdown' }] },
  { name: 'Objection Handling', max: 15, description: 'Was every objection handled with the correct tool for the signal being sent?', earns: ['Correct tool for the signal — Reframing on RED, Refocusing on YELLOW', 'Stalls not validated — reframe attempted first', 'Assertive but compliant'], costs: ['Logic response to emotional objection', 'Stall validated without reframe', 'Objection ignored entirely'], guide: '13–15 = every objection correct | 9–12 = most correct, one missed | 5–8 = multiple wrong tools | 0–4 = consistently ignored', links: [{ label: 'Objection Handbook', href: '/objections' }, { label: 'Pattern 3 — Logic Responses', href: '/patterns/logic-responses' }] },
  { name: 'Call Outcome Quality', max: 10, description: 'What happened at the moment of truth — and did the agent protect what they built?', earns: ['Close Confirmation attempted after enrollment (Enrolled)', 'No unnecessary compliance risk statements', 'Math Breakdown attempted at some level (Missed Opportunity)', 'Recovery attempted at the losing moment'], costs: [], guide: 'Evaluated differently for Enrolled vs. Missed Opportunity calls', links: [{ label: 'Close Confirmation Protocol', href: '/close-confirmation' }, { label: 'Pattern 9 — The Hollow Yes', href: '/patterns/hollow-yes' }] },
  { name: 'Compliance & Professionalism', max: 15, description: 'Was the call run cleanly from a regulatory and professional standpoint?', earns: ['TPMO disclaimer delivered correctly (4 pts)', 'SOA confirmation obtained (4 pts)', 'Enrollment verification accurate (4 pts)', 'No regulatory risk statements (3 pts)'], costs: ['Missing or incomplete compliance language', 'Compliance delivered in a momentum-killing way', 'Flaggable statements on a recorded line'], guide: '', links: [] },
]

export default function HowCallsAreGradedPage() {
  return (
    <PageShell signal="neutral">
      <motion.h1
        className="display-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
      >
        How Your Calls Are Graded
      </motion.h1>

      <motion.p
        className={`body-lg ${styles.intro}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.1 }}
      >
        Every call reviewed under The Certainty System receives a structured analysis using the Certainty Score — a 100-point framework built to tell you exactly what happened on a call, why it went the way it did, and what to do differently next time.
      </motion.p>

      <CalloutBlock type="neutral">
        <strong>Scores are earned, not deducted.</strong> The review starts at zero and adds points for what was present. A genuine attempt with imperfect execution earns partial credit. No attempt earns zero.
      </CalloutBlock>

      {/* Call Classification */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <h2 className="display-lg">Step 1 — Call Classification</h2>
        <p className="body-lg">Before scoring begins, every call is placed into one of four categories:</p>
        <div className={styles.classGrid}>
          <div className={styles.classCard}>
            <h3 className="heading-md">Enrolled</h3>
            <p className="body-md">You closed. The audit focuses on execution quality — not just whether the client enrolled, but whether they hung up secure and certain.</p>
          </div>
          <div className={styles.classCard}>
            <h3 className="heading-md">Missed Opportunity</h3>
            <p className="body-md">The plan was viable, no hard barriers — but the sale didn&rsquo;t close. This is the primary coaching category.</p>
          </div>
          <div className={styles.classCard}>
            <h3 className="heading-md">Unclosable</h3>
            <p className="body-md">A hard, logical barrier prevented the sale. Not scored — the primary metric is speed of diagnosis.</p>
          </div>
          <div className={styles.classCard}>
            <h3 className="heading-md">Correct No-Sale</h3>
            <p className="body-md">The agent correctly identified the client was already on the optimal plan and recommended they stay.</p>
          </div>
        </div>
      </motion.section>

      {/* Score Overview */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <h2 className="display-lg">Step 2 — The Certainty Score</h2>
        <p className="body-lg">Enrolled and Missed Opportunity calls receive a Certainty Score out of 100:</p>
        <table className={styles.scoreTable}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Max Points</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.name}>
                <td>{cat.name}</td>
                <td>{cat.max}</td>
              </tr>
            ))}
            <tr className={styles.totalRow}>
              <td><strong>Total</strong></td>
              <td><strong>100</strong></td>
            </tr>
          </tbody>
        </table>
      </motion.section>

      {/* Category Details */}
      {categories.map((cat, i) => (
        <motion.section
          key={cat.name}
          className={styles.section}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ ...SPRING, delay: 0.05 * i }}
        >
          <h2 className="display-lg">{i + 1} — {cat.name} ({cat.max} points)</h2>
          <p className="body-lg"><em>{cat.description}</em></p>

          {cat.earns.length > 0 && (
            <div className={styles.earnsBlock}>
              <span className="label">What earns points</span>
              <ul className={styles.list}>
                {cat.earns.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}

          {cat.costs.length > 0 && (
            <div className={styles.costsBlock}>
              <span className="label">What costs points</span>
              <ul className={styles.list}>
                {cat.costs.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}

          {cat.guide && (
            <p className={`body-md ${styles.guide}`}><strong>Score guide:</strong> {cat.guide}</p>
          )}

          {cat.links.length > 0 && (
            <div className={styles.seeLinks}>
              {cat.links.map((link) => (
                <Link key={link.href} href={link.href} className={styles.seeLink}>{link.label}</Link>
              ))}
            </div>
          )}
        </motion.section>
      ))}

      <CrossLinks links={[
        { label: 'Three Client Signals', href: '/signals' },
        { label: 'Four Pillars', href: '/pillars' },
        { label: 'Nine Failure Patterns', href: '/patterns' },
        { label: 'The Math Breakdown', href: '/math-breakdown' },
        { label: 'Close Confirmation', href: '/close-confirmation' },
      ]} />
    </PageShell>
  )
}
