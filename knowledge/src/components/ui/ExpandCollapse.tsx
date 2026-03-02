'use client'

import { useState } from 'react'
import { ArrowRight } from '@carbon/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { SPRING_FAST, EASE_SPRING } from '@/lib/motion'
import { useSignalHover } from '@/hooks/useSignalHover'
import SignalBadge from './SignalBadge'
import styles from './ExpandCollapse.module.css'

interface ExpandCollapseProps {
  clientPhrase: string
  underneath: string
  doNotSay?: string[]
  responses: Array<{ label?: string; text: string }>
  pillar: string
  signal: 'red' | 'yellow' | 'green'
}

export default function ExpandCollapse({
  clientPhrase,
  underneath,
  doNotSay,
  responses,
  pillar,
  signal,
}: ExpandCollapseProps) {
  const [isOpen, setIsOpen] = useState(false)
  const hover = useSignalHover(signal)

  return (
    <motion.div
      className={`${styles.card} ${isOpen ? styles.open : ''}`}
      whileHover={!isOpen ? { y: -2 } : undefined}
      transition={SPRING_FAST}
      {...hover}
    >
      <button
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className={styles.headerMeta}>
          <SignalBadge signal={signal} variant="tinted" />
        </div>
        <h3 className={styles.phrase}>{clientPhrase}</h3>
        <p className={styles.preview}>{underneath}</p>
        <div className={styles.headerFooter}>
          <span className={styles.pillarTag}>{pillar}</span>
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={SPRING_FAST}
            className={styles.arrow}
          >
            <ArrowRight size={16} />
          </motion.span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_SPRING }}
            style={{ overflow: 'hidden' }}
          >
            <div className={styles.body}>
              {/* Underneath It */}
              <div className={styles.section}>
                <span className={styles.sectionLabel}>Underneath It</span>
                <p className={styles.sectionText}>{underneath}</p>
              </div>

              {/* What NOT to say */}
              {doNotSay && doNotSay.length > 0 && (
                <div className={styles.doNotSay}>
                  <span className={styles.sectionLabel}>What NOT to Say</span>
                  <ul className={styles.doNotList}>
                    {doNotSay.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* The Response */}
              <div className={styles.response}>
                <span className={styles.sectionLabel}>The Response</span>
                {responses.map((r, i) => (
                  <div key={i} className={styles.responseItem}>
                    {r.label && <span className={styles.responseLabel}>{r.label}</span>}
                    <p className={styles.responseText}>{r.text}</p>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
