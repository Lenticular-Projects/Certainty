'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from '@carbon/icons-react'
import PageShell from '@/components/layout/PageShell'
import CrossLinks from '@/components/ui/CrossLinks'
import { useSignalHover } from '@/hooks/useSignalHover'
import { SPRING, SPRING_FAST, staggerContainer, staggerChild } from '@/lib/motion'
import styles from './page.module.css'

const pillars = [
  {
    slug: 'persuasion',
    number: 1,
    label: 'Persuasion',
    signal: 'neutral' as const,
    glowClass: '',
    description: 'The macro mindset. Lead with authority from first word to last. Present on every call.',
  },
  {
    slug: 'reframing',
    number: 2,
    label: 'Reframing',
    signal: 'red' as const,
    glowClass: 'cardGlowRed',
    description: 'Name the emotion. Redirect the meaning. Never logic first.',
  },
  {
    slug: 'the-shift',
    number: 3,
    label: 'The Shift',
    signal: 'green' as const,
    glowClass: 'cardGlowGreen',
    description: 'Change what they\'re comparing. Execute the Math Breakdown. Show them what they\'re losing.',
  },
  {
    slug: 'refocusing',
    number: 4,
    label: 'Refocusing',
    signal: 'yellow' as const,
    glowClass: 'cardGlowYellow',
    description: 'Validate in one sentence. Bridge back to the enrollment. Narrate dead air.',
  },
]

function PillarCard({ pillar }: { pillar: typeof pillars[number] }) {
  const hover = useSignalHover(pillar.signal)
  return (
    <motion.div variants={staggerChild}>
      <Link href={`/pillars/${pillar.slug}`} className={styles.cardLink}>
        <motion.div
          className={`${styles.card} glass ${pillar.glowClass ? `cardGlow ${pillar.glowClass}` : ''}`}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={SPRING_FAST}
          {...hover}
        >
          <span className={styles.pillarNumber}>Pillar {pillar.number}</span>
          <h3 className={styles.cardTitle}>{pillar.label}</h3>
          <p className={styles.cardDesc}>{pillar.description}</p>
          <ArrowRight size={16} className={styles.cardArrow} />
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default function PillarsOverviewPage() {
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
          The Four Pillars
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.2 }}
        >
          The four tools agents deploy based on the signal they are reading. Every response in the Certainty System maps back to one of these four. They are not four separate things to memorize — they are four layers of the same lens.
        </motion.p>
      </header>

      {/* Diagram */}
      <motion.div
        className={`${styles.diagramWrapper} glass`}
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <Image
          src="/images/pillars-diagram.png"
          alt="The Four Pillars — Persuasion, Reframing, The Shift, Refocusing and their signal mapping"
          width={900}
          height={600}
          className={styles.diagramImage}
          priority={false}
        />
      </motion.div>

      {/* Overview table */}
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
              <th>Pillar</th>
              <th>Signal</th>
              <th>Core Function</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 — Persuasion</td>
              <td>All calls</td>
              <td>The macro mindset. Lead with authority from first word to last.</td>
            </tr>
            <tr>
              <td>2 — Reframing</td>
              <td>RED</td>
              <td>Name the emotion. Redirect the meaning.</td>
            </tr>
            <tr>
              <td>3 — The Shift</td>
              <td>GREEN</td>
              <td>Change what they&rsquo;re comparing. Execute the Math Breakdown.</td>
            </tr>
            <tr>
              <td>4 — Refocusing</td>
              <td>YELLOW</td>
              <td>Validate in one sentence. Bridge back to the enrollment.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      {/* Pillar cards grid */}
      <motion.div
        className={`${styles.cardsGrid} grid-2`}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        {pillars.map((pillar) => (
          <PillarCard key={pillar.slug} pillar={pillar} />
        ))}
      </motion.div>

      {/* Cross links */}
      <CrossLinks
        links={[
          { label: 'Three Client Signals', href: '/signals' },
          { label: 'Nine Failure Patterns', href: '/patterns' },
          { label: '9 Call Types', href: '/call-types' },
        ]}
      />
    </PageShell>
  )
}
