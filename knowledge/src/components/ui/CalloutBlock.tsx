'use client'

import { useSignalHover } from '@/hooks/useSignalHover'
import styles from './CalloutBlock.module.css'

interface CalloutBlockProps {
  type: 'red' | 'yellow' | 'green' | 'neutral'
  children: React.ReactNode
}

export default function CalloutBlock({ type, children }: CalloutBlockProps) {
  const hover = useSignalHover(type)
  return (
    <div className={`${styles.callout} ${styles[type]}`} {...hover}>
      {children}
    </div>
  )
}
