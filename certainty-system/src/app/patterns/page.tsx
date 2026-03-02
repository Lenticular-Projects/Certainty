'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from '@carbon/icons-react'
import PageShell from '@/components/layout/PageShell'
import SignalBadge from '@/components/ui/SignalBadge'
import CrossLinks from '@/components/ui/CrossLinks'
import { SPRING, SPRING_FAST, staggerContainer, staggerChild } from '@/lib/motion'
import { useSignalHover } from '@/hooks/useSignalHover'
import styles from './page.module.css'

/* ------------------------------------------------------------------ */
/* Pattern data                                                        */
/* ------------------------------------------------------------------ */

interface PatternCard {
  number: number
  title: string
  slug: string
  description: string
  signal: 'red' | 'yellow' | 'green'
  pillarFix: string
}

const patterns: PatternCard[] = [
  {
    number: 1,
    title: 'Client Gold Ignored',
    slug: 'client-gold-ignored',
    description: 'Agents walk past the emotionally significant things clients say and return to the script. Those moments are the actual close.',
    signal: 'red',
    pillarFix: 'Persuasion / The Shift',
  },
  {
    number: 2,
    title: 'Incomplete Math Breakdown',
    slug: 'incomplete-math-breakdown',
    description: 'Agents present the monthly benefit and stop. Step 3 — connecting the annual figure to their real life — is the close.',
    signal: 'green',
    pillarFix: 'The Shift',
  },
  {
    number: 3,
    title: 'Logic Responses to Emotional Objections',
    slug: 'logic-responses',
    description: 'Client resistance is almost never intellectual — it is emotional. You cannot explain someone out of a fear.',
    signal: 'red',
    pillarFix: 'Reframing',
  },
  {
    number: 4,
    title: 'Permission-Seeking Language',
    slug: 'permission-seeking-language',
    description: 'Phrases that hand control of the call away at the exact moment the agent needs to hold it.',
    signal: 'red',
    pillarFix: 'Persuasion',
  },
  {
    number: 5,
    title: 'System Navigation Dead Air',
    slug: 'system-navigation-dead-air',
    description: 'When agents go silent during a system search, clients talk themselves out of the enrollment.',
    signal: 'yellow',
    pillarFix: 'Refocusing',
  },
  {
    number: 6,
    title: 'Rapport Without an Off-Switch',
    slug: 'rapport-without-off-switch',
    description: 'The client likes them. The call ends warmly. No enrollment. Social mode and sales mode are different gears.',
    signal: 'red',
    pillarFix: 'Refocusing',
  },
  {
    number: 7,
    title: 'The Third Party Blind Spot',
    slug: 'third-party-blind-spot',
    description: 'The real decision-maker was on the call and you never addressed them. The decision happened after you hung up.',
    signal: 'yellow',
    pillarFix: 'Persuasion',
  },
  {
    number: 8,
    title: 'Accepting Misinformation as Truth',
    slug: 'accepting-misinformation',
    description: 'Clients come in with false information. Agents accept it and try to work around it. The false belief becomes the wall.',
    signal: 'red',
    pillarFix: 'Reframing',
  },
  {
    number: 9,
    title: 'The Hollow Yes',
    slug: 'hollow-yes',
    description: 'The agent gets the enrollment. The client hangs up uncertain. That is not a win — it is a disenrollment in slow motion.',
    signal: 'yellow',
    pillarFix: 'Close Confirmation Protocol',
  },
]

/* ------------------------------------------------------------------ */
/* Root cause groupings                                                */
/* ------------------------------------------------------------------ */

interface RootCauseGroup {
  label: string
  title: string
  description: string
  patternNumbers: number[]
}

const rootCauseGroups: RootCauseGroup[] = [
  {
    label: 'Root Cause 1',
    title: 'Loss of Lead',
    description: 'The agent stopped leading. Permission-seeking language, validating stalls, sending clients to research plans on their own. When the agent stops leading, the client makes the decision alone — and they almost always decide to stay where they are.',
    patternNumbers: [1, 4, 6],
  },
  {
    label: 'Root Cause 2',
    title: 'Wrong Response to Signal',
    description: 'The agent misread what the client needed in that moment. Logic when the client needed empathy. Information when the client needed a reframe. The wrong tool at the wrong moment costs the sale every time.',
    patternNumbers: [2, 3, 7, 8],
  },
  {
    label: 'Root Cause 3',
    title: 'Momentum Killers',
    description: 'The agent let the energy of the call die. Dead air during system navigation. Rapport that built and built with no transition to close.',
    patternNumbers: [5, 9],
  },
]

/* ------------------------------------------------------------------ */
/* Pattern card component                                              */
/* ------------------------------------------------------------------ */

function PatternCardComponent({ pattern }: { pattern: PatternCard }) {
  const hover = useSignalHover(pattern.signal)

  return (
    <motion.div variants={staggerChild}>
      <Link href={`/patterns/${pattern.slug}`} className={styles.cardLink}>
        <motion.div
          className={`${styles.card} glass`}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={SPRING_FAST}
          {...hover}
        >
          <div className={styles.cardHeader}>
            <span className={styles.cardNumber}>Pattern {pattern.number}</span>
            <SignalBadge signal={pattern.signal} />
          </div>
          <h3 className={styles.cardTitle}>{pattern.title}</h3>
          <p className={styles.cardDesc}>{pattern.description}</p>
          <div className={styles.cardFooter}>
            <span className={styles.cardPillar}>{pattern.pillarFix}</span>
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

export default function PatternsPage() {
  return (
    <PageShell signal="neutral">
      {/* Hero */}
      <section className={styles.hero}>
        <motion.h1
          className={`${styles.headline} display-xl`}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.1 }}
        >
          The Nine Failure Patterns
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.2 }}
        >
          Nine patterns. Three root causes. Every one of them is a training problem — which means every one of them is solvable.
        </motion.p>

        <motion.p
          className={styles.intro}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.3 }}
        >
          <span className={styles.introStrong}>Most agents have one or two dominant patterns.</span>{' '}
          You cannot fix what you cannot name.
        </motion.p>
      </section>

      {/* Pattern Wheel image */}
      <section className={styles.wheelSection}>
        <motion.div
          className={`${styles.wheelWrapper} glass`}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={SPRING}
        >
          <Image
            src="/images/pattern-wheel.png"
            alt="The nine failure patterns arranged by root cause — Loss of Lead, Wrong Response to Signal, and Momentum Killers"
            width={900}
            height={600}
            className={styles.wheelImage}
            priority={false}
          />
        </motion.div>
      </section>

      {/* Root cause groups */}
      <section className={styles.groupsSection}>
        {rootCauseGroups.map((group, groupIndex) => {
          const groupPatterns = group.patternNumbers.map(
            (num) => patterns.find((p) => p.number === num)!
          )

          return (
            <motion.div
              key={group.label}
              className={styles.group}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ ...SPRING, delay: groupIndex * 0.1 }}
            >
              <div className={styles.groupHeader}>
                <p className={styles.groupLabel}>{group.label}</p>
                <h2 className={styles.groupTitle}>{group.title}</h2>
                <p className={styles.groupDesc}>{group.description}</p>
              </div>

              <motion.div
                className={styles.groupGrid}
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
              >
                {groupPatterns.map((pattern) => (
                  <PatternCardComponent key={pattern.slug} pattern={pattern} />
                ))}
              </motion.div>
            </motion.div>
          )
        })}
      </section>

      {/* Cross links */}
      <section className={styles.crossSection}>
        <CrossLinks
          links={[
            { label: 'Four Pillars', href: '/pillars' },
            { label: 'Three Client Signals', href: '/signals' },
            { label: '9 Call Types', href: '/call-types' },
          ]}
        />
      </section>
    </PageShell>
  )
}
