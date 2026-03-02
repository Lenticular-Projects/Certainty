'use client'

import { useEffect } from 'react'
import styles from './PageShell.module.css'

interface PageShellProps {
  signal?: 'neutral' | 'red' | 'yellow' | 'green'
  children: React.ReactNode
}

export default function PageShell({ signal = 'neutral', children }: PageShellProps) {
  useEffect(() => {
    document.body.setAttribute('data-signal', signal)
    document.body.setAttribute('data-page-signal', signal)
    return () => {
      document.body.removeAttribute('data-signal')
      document.body.removeAttribute('data-page-signal')
    }
  }, [signal])

  return (
    <>
      <div className={styles.overlay} />
      <main className={styles.main}>
        {children}
      </main>
    </>
  )
}
