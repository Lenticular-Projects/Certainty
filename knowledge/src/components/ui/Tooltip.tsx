'use client'

import { useState } from 'react'
import { Information } from '@carbon/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { SPRING_FAST } from '@/lib/motion'
import styles from './Tooltip.module.css'

interface TooltipProps {
  term: string
  definition: string
}

export default function Tooltip({ term, definition }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
    >
      <span className={styles.term}>{term}</span>
      <Information size={14} className={styles.icon} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.popup}
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={SPRING_FAST}
          >
            {definition}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
