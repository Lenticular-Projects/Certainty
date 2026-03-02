'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, Close } from '@carbon/icons-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SPRING_FAST, EASE_SPRING } from '@/lib/motion'
import styles from './Nav.module.css'

const mainLinks = [
  { label: 'Objections', href: '/objections' },
  { label: 'Call Types', href: '/call-types' },
  { label: 'Signals', href: '/signals' },
  { label: 'Pillars', href: '/pillars' },
  { label: 'Patterns', href: '/patterns' },
  { label: 'Math Breakdown', href: '/math-breakdown' },
  { label: 'Storytelling', href: '/storytelling' },
]

const moreLinks = [
  { label: 'Close Confirmation', href: '/close-confirmation' },
  { label: 'How Calls Are Graded', href: '/how-calls-are-graded' },
]

export default function Nav() {
  const pathname = usePathname()
  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.nav
      className={styles.nav}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SPRING_FAST}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.wordmark}>
          The Certainty System
        </Link>

        {/* Desktop links */}
        <div className={styles.desktopLinks}>
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname.startsWith(link.href) ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}

          {/* More dropdown */}
          <div
            className={styles.moreWrapper}
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              className={`${styles.link} ${styles.moreBtn}`}
              onClick={() => setMoreOpen(!moreOpen)}
            >
              More
              <motion.span
                animate={{ rotate: moreOpen ? 180 : 0 }}
                transition={SPRING_FAST}
                style={{ display: 'inline-flex' }}
              >
                <ChevronDown size={14} />
              </motion.span>
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  className={styles.dropdown}
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={SPRING_FAST}
                >
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`${styles.dropdownLink} ${pathname === link.href ? styles.active : ''}`}
                      onClick={() => setMoreOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <Close size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_SPRING }}
            style={{ overflow: 'hidden' }}
          >
            {[...mainLinks, ...moreLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${pathname.startsWith(link.href) ? styles.active : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
