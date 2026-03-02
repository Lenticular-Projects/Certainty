'use client'

import { motion } from 'framer-motion'
import { SPRING } from '@/lib/motion'
import { useSignalHover } from '@/hooks/useSignalHover'
import styles from './QuickRefCard.module.css'

interface QuickRefCardProps {
  whoThisIs: string
  firstSignal: string
  primaryPillar: string
  biggestMistake: string
  signal: 'green' | 'red' | 'yellow'
}

export default function QuickRefCard({ whoThisIs, firstSignal, primaryPillar, biggestMistake, signal }: QuickRefCardProps) {
  const hover = useSignalHover(signal)
  return (
    <motion.div
      className={`${styles.card} ${styles[signal]}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={SPRING}
      {...hover}
    >
      <div className={styles.row}>
        <span className={styles.label}>Who This Is</span>
        <span className={styles.value}>{whoThisIs}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>First Signal</span>
        <span className={styles.value}>{firstSignal}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Primary Pillar</span>
        <span className={styles.value}>{primaryPillar}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Biggest Mistake</span>
        <span className={styles.value}>{biggestMistake}</span>
      </div>
    </motion.div>
  )
}
