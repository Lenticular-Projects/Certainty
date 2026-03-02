'use client'

import Link from 'next/link'
import { ArrowRight } from '@carbon/icons-react'
import { motion } from 'framer-motion'
import { SPRING_FAST, SPRING } from '@/lib/motion'
import styles from './CrossLinks.module.css'

interface CrossLinksProps {
  links: Array<{ label: string; href: string }>
}

export default function CrossLinks({ links }: CrossLinksProps) {
  return (
    <motion.nav
      className={styles.wrapper}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={SPRING}
    >
      <span className={styles.label}>Related</span>
      <div className={styles.links}>
        {links.map((link) => (
          <motion.div
            key={link.href}
            whileHover={{ y: -1 }}
            transition={SPRING_FAST}
          >
            <Link href={link.href} className={styles.link}>
              {link.label}
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.nav>
  )
}
