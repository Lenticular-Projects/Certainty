'use client'

import styles from './SignalBadge.module.css'

interface SignalBadgeProps {
  signal: 'green' | 'red' | 'yellow'
  variant?: 'filled' | 'tinted'
  size?: 'sm' | 'lg'
  label?: string
}

export default function SignalBadge({ signal, variant = 'tinted', size = 'sm', label }: SignalBadgeProps) {
  const text = label || signal.toUpperCase()

  return (
    <span className={`${styles.badge} ${styles[`${signal}${variant === 'filled' ? 'Filled' : 'Tinted'}`]} ${size === 'lg' ? styles.lg : ''}`}>
      <span className={`${styles.dot} ${styles[`dot${signal}`]}`} />
      {text}
    </span>
  )
}
