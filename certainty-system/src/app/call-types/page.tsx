'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from '@carbon/icons-react'
import PageShell from '@/components/layout/PageShell'
import SignalBadge from '@/components/ui/SignalBadge'
import CrossLinks from '@/components/ui/CrossLinks'
import { useSignalHover } from '@/hooks/useSignalHover'
import { SPRING, SPRING_FAST, staggerContainer, staggerChild } from '@/lib/motion'
import styles from './page.module.css'

/* ------------------------------------------------------------------ */
/* Call type card data                                                  */
/* ------------------------------------------------------------------ */

interface CallTypeCard {
  number: number
  title: string
  slug: string
  description: string
  signal: 'green' | 'red' | 'yellow'
  pillar: string
  biggestMistake: string
}

const callTypes: CallTypeCard[] = [
  {
    number: 1,
    title: 'The Money Caller',
    slug: 'money-caller',
    description: 'They called about a specific benefit. Most motivated caller you will get. The danger is stopping at the monthly number.',
    signal: 'green',
    pillar: 'The Shift',
    biggestMistake: 'Stopping at the monthly number',
  },
  {
    number: 2,
    title: 'The Scared Switcher',
    slug: 'scared-switcher',
    description: 'Interested but afraid of losing something. Fear is the objection — not the words they say.',
    signal: 'red',
    pillar: 'Reframing',
    biggestMistake: 'Logic response to emotional fear',
  },
  {
    number: 3,
    title: 'The Misinformed Caller',
    slug: 'misinformed',
    description: 'Operating on false information from someone they trusted. The false belief is the wall.',
    signal: 'green',
    pillar: 'Reframing + Persuasion',
    biggestMistake: 'Building on a false foundation',
  },
  {
    number: 4,
    title: 'Third Party Controlled',
    slug: 'third-party-controlled',
    description: 'The person on the phone is not the decision maker. Get the real authority into this conversation.',
    signal: 'red',
    pillar: 'Persuasion',
    biggestMistake: 'Selling to the wrong person',
  },
  {
    number: 5,
    title: 'The Detail Staller',
    slug: 'detail-staller',
    description: 'They want more information before deciding. Giving them more information is the wrong move.',
    signal: 'yellow',
    pillar: 'The Shift',
    biggestMistake: 'Giving them something to research',
  },
  {
    number: 6,
    title: 'The Time Bomb',
    slug: 'time-bomb',
    description: 'Open and motivated — but they have a hard constraint. Do not spend time on rapport.',
    signal: 'yellow',
    pillar: 'Refocusing',
    biggestMistake: 'Spending time on rapport',
  },
  {
    number: 7,
    title: 'Commercial Myth Caller',
    slug: 'commercial-myth-caller',
    description: 'Their expectations were set by television. Join the frustration. Become the ally. Then redirect.',
    signal: 'red',
    pillar: 'Reframing',
    biggestMistake: 'Defending the system',
  },
  {
    number: 8,
    title: 'The Veteran',
    slug: 'veteran',
    description: 'They use VA benefits and see Medicare Advantage as a threat. VA and MA are additive, not competing.',
    signal: 'green',
    pillar: 'The Shift',
    biggestMistake: 'PCP before neutralizing VA fear',
  },
  {
    number: 9,
    title: 'The Timing Objector',
    slug: 'timing-objector',
    description: 'Willing and interested — but fixated on a timing issue that is almost always a stall.',
    signal: 'yellow',
    pillar: 'The Shift',
    biggestMistake: 'Accepting the stall and offering a callback',
  },
]

/* ------------------------------------------------------------------ */
/* Card component                                                      */
/* ------------------------------------------------------------------ */

function CallTypeCardComponent({ callType }: { callType: CallTypeCard }) {
  const hover = useSignalHover(callType.signal)

  return (
    <motion.div variants={staggerChild}>
      <Link href={`/call-types/${callType.slug}`} className={styles.cardLink}>
        <motion.div
          className={`${styles.card} glass`}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={SPRING_FAST}
          {...hover}
        >
          <div className={styles.cardHeader}>
            <span className={styles.cardNumber}>Type {callType.number}</span>
            <SignalBadge signal={callType.signal} />
          </div>
          <h3 className={styles.cardTitle}>{callType.title}</h3>
          <p className={styles.cardDesc}>{callType.description}</p>
          <div className={styles.cardFooter}>
            <span className={styles.cardPillar}>{callType.pillar}</span>
            <ArrowRight size={16} className={styles.cardArrow} />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function CallTypesPage() {
  return (
    <PageShell signal="neutral">
      {/* Header */}
      <header className={styles.header}>
        <motion.h1
          className={`${styles.headline} display-xl`}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.1 }}
        >
          The 9 Call Types
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.2 }}
        >
          In the first two minutes of every call, you are doing one thing: pattern recognition. The type tells you the playbook. The playbook tells you what&rsquo;s coming before it arrives.
        </motion.p>
        <motion.p
          className={styles.intro}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.3 }}
        >
          <span className={styles.introStrong}>Most calls are combinations of types.</span>{' '}
          Identify the dominant one first and lead from there.
        </motion.p>
      </header>

      {/* Call Type Tree diagram */}
      <motion.div
        className={`${styles.diagramWrapper} glass`}
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <Image
          src="/images/call-type-tree.png"
          alt="The 9 Call Types decision tree — identification flow from first two minutes of the call"
          width={900}
          height={600}
          className={styles.diagramImage}
          priority={false}
        />
      </motion.div>

      {/* Quick reference table */}
      <motion.div
        className={styles.tableWrapper}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>First Signal</th>
              <th>Primary Pillar</th>
              <th>Biggest Mistake</th>
            </tr>
          </thead>
          <tbody>
            {callTypes.map((ct) => (
              <tr key={ct.slug}>
                <td>{ct.number}</td>
                <td>{ct.title}</td>
                <td>{ct.signal === 'green' ? 'GREEN' : ct.signal === 'red' ? 'RED' : 'YELLOW / Mixed'}</td>
                <td>{ct.pillar}</td>
                <td>{ct.biggestMistake}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Call type cards — 3x3 grid */}
      <motion.div
        className={`${styles.cardsGrid} grid-3`}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        {callTypes.map((ct) => (
          <CallTypeCardComponent key={ct.slug} callType={ct} />
        ))}
      </motion.div>

      {/* Cross links */}
      <CrossLinks
        links={[
          { label: 'Three Client Signals', href: '/signals' },
          { label: 'Four Pillars', href: '/pillars' },
          { label: 'Objection Handbook', href: '/objections' },
        ]}
      />
    </PageShell>
  )
}
