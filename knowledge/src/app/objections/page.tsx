'use client'

import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import { Search, Close, ArrowRight } from '@carbon/icons-react'
import { motion } from 'framer-motion'
import { SPRING, SPRING_FAST } from '@/lib/motion'
import PageShell from '@/components/layout/PageShell'
import ExpandCollapse from '@/components/ui/ExpandCollapse'
import CrossLinks from '@/components/ui/CrossLinks'
import { objections, sections } from '@/lib/objections-data'

const sectionDescriptions: Record<string, string> = {
  'All': 'Every objection across all categories. Use search to find what you just heard.',
  'Fear & Resistance': 'The client is protecting what they have. Fear drives the words, not logic.',
  'Commercial & Benefit': 'Cost, coverage, and benefit comparisons that stall the enrollment.',
  'Stall': 'Not saying no — not saying yes. They\'re buying time.',
  'Network & Coverage': 'Doctor, hospital, and provider network concerns.',
  'Loyalty': 'They have a relationship — with their plan, agent, or carrier.',
  'Timing': 'Not now. Call me back. I need more time to decide.',
  'Benefit & Plan Comparison': 'Side-by-side plan comparisons and specific benefit questions.',
  'Trust & Credibility': 'They don\'t believe you, the company, or the process yet.',
  'Family & Third Party': 'Someone else needs to be involved before they can decide.',
  'Closing & Resistance': 'Final resistance at the exact moment of commitment.',
}
import styles from './page.module.css'

export default function ObjectionsPage() {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('All')

  const fuse = useMemo(
    () =>
      new Fuse(objections, {
        keys: ['clientPhrase'],
        threshold: 0.4,
      }),
    []
  )

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: objections.length }
    for (const obj of objections) {
      map[obj.section] = (map[obj.section] || 0) + 1
    }
    return map
  }, [])

  const filtered = useMemo(() => {
    let results = objections

    // Search filter
    if (query.trim()) {
      results = fuse.search(query).map((r) => r.item)
    }

    // Tab filter
    if (activeTab !== 'All') {
      results = results.filter((o) => o.section === activeTab)
    }

    return results
  }, [query, activeTab, fuse])

  return (
    <PageShell signal="neutral">
      <motion.h1
        className="display-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
      >
        Objection Handbook
      </motion.h1>

      <motion.p
        className={`body-lg ${styles.intro}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.1 }}
      >
        When a client says something that stops the call, find it here. Every entry is organized by what the client said. Look up the words you just heard. Deploy the response.
      </motion.p>

      {/* Search bar */}
      <motion.div
        className={styles.searchWrapper}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.15 }}
      >
        <Search size={20} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by what the client said..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            className={styles.clearBtn}
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            <Close size={20} />
          </button>
        )}
      </motion.div>

      {/* Filter cards */}
      <div className={styles.tabs}>
        {sections.map((section, i) => (
          <motion.button
            key={section}
            className={`${styles.tab} ${activeTab === section ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(section)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.2 + i * 0.04 }}
          >
            <h3 className={styles.tabHeading}>{section}</h3>
            <p className={styles.tabDesc}>{sectionDescriptions[section]}</p>
            <ArrowRight size={16} className={styles.tabArrow} />
          </motion.button>
        ))}
      </div>

      {/* Results count */}
      <p className={styles.count}>
        {filtered.length} {filtered.length === 1 ? 'objection' : 'objections'}
        {query && ` matching "${query}"`}
        {activeTab !== 'All' && ` in ${activeTab}`}
      </p>

      {/* Cards */}
      <div className={styles.cards}>
        {filtered.map((obj) => (
          <ExpandCollapse
            key={obj.id}
            clientPhrase={obj.clientPhrase}
            underneath={obj.underneath}
            doNotSay={obj.doNotSay}
            responses={obj.responses}
            pillar={obj.pillar}
            signal={obj.signal}
          />
        ))}

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>No objections found. Try a different search or filter.</p>
          </div>
        )}
      </div>

      <CrossLinks links={[
        { label: 'Four Pillars', href: '/pillars' },
        { label: 'Three Client Signals', href: '/signals' },
        { label: '9 Call Types', href: '/call-types' },
        { label: 'Storytelling', href: '/storytelling' },
      ]} />
    </PageShell>
  )
}
