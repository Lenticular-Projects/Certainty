'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from '@carbon/icons-react'
import { SPRING, SPRING_FAST, staggerContainer, staggerChild } from '@/lib/motion'
import { useSignalHover } from '@/hooks/useSignalHover'
import styles from './page.module.css'

const sectionCards = [
  { label: 'Three Client Signals', href: '/signals', description: 'GREEN, RED, YELLOW — read the client state.', signal: 'neutral' as const },
  { label: 'Four Pillars', href: '/pillars', description: 'The four tools for the four situations.', signal: 'neutral' as const },
  { label: 'Nine Failure Patterns', href: '/patterns', description: 'The nine ways calls fail — and the fix for each.', signal: 'neutral' as const },
  { label: '9 Call Types', href: '/call-types', description: 'Identify the client in the first two minutes.', signal: 'neutral' as const },
  { label: 'Objection Handbook', href: '/objections', description: 'Find the phrase. Deploy the response.', signal: 'neutral' as const },
  { label: 'Math Breakdown', href: '/math-breakdown', description: 'Three steps. The last one closes.', signal: 'green' as const },
]

function SectionCard({ card }: { card: typeof sectionCards[number] }) {
  const hover = useSignalHover(card.signal)
  return (
    <motion.div variants={staggerChild}>
      <Link href={card.href} className={styles.cardLink}>
        <motion.div
          className={`${styles.card} glass`}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={SPRING_FAST}
          {...hover}
        >
          <h3 className={styles.cardTitle}>{card.label}</h3>
          <p className={styles.cardDesc}>{card.description}</p>
          <ArrowRight size={16} className={styles.cardArrow} />
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default function HomePage() {
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    document.body.setAttribute('data-signal', 'neutral')
    document.body.setAttribute('data-page-signal', 'neutral')
  }, [])

  return (
    <>
      {/* Hero — no overlay, full gradient */}
      <section className={styles.hero}>
        {/* Video texture slot */}
        {!videoFailed && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.heroVideo}
            src="/hero-bg.mp4"
            onError={() => setVideoFailed(true)}
          />
        )}

        {/* Ghostly watermark */}
        <div className={styles.heroWatermark} aria-hidden="true">CERTAINTY</div>

        {/* Content */}
        <div className={styles.heroContent}>
          <motion.p
            className={styles.heroLabel}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.05 }}
          >
            The Certainty System
          </motion.p>

          <motion.h1
            className={`${styles.heroHeadline} display-xl`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.15 }}
          >
            The system that turns a conversation into a commitment.
          </motion.h1>

          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.25 }}
          >
            A field reference for Medicare Advantage agents. Built from real call data.
          </motion.p>

          <motion.div
            className={styles.heroCtas}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.4 }}
          >
            <Link href="/objections" className={styles.ctaPrimary}>
              Open Objection Handbook
            </Link>
            <Link href="/how-calls-are-graded" className={styles.ctaSecondary}>
              How calls are graded
            </Link>
          </motion.div>
        </div>
      </section>

      {/* System map */}
      <section className={styles.mapSection}>
        <motion.div
          className={`${styles.mapWrapper} glass`}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={SPRING}
        >
          <Image
            src="/images/system-map.png"
            alt="The Certainty System — complete map of signals, pillars, patterns, and call types"
            width={900}
            height={600}
            className={styles.mapImage}
            priority={false}
          />
        </motion.div>
      </section>

      {/* Section nav cards */}
      <section className={styles.cardsSection}>
        <motion.div
          className={`${styles.cardsGrid} grid-3`}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {sectionCards.map((card) => (
            <SectionCard key={card.href} card={card} />
          ))}
        </motion.div>
      </section>
    </>
  )
}
