'use client'

import { useEffect } from 'react'

type Signal = 'neutral' | 'red' | 'yellow' | 'green'

export function usePageSignal(signal: Signal) {
  useEffect(() => {
    document.body.setAttribute('data-signal', signal)
    document.body.setAttribute('data-page-signal', signal)

    return () => {
      document.body.removeAttribute('data-signal')
      document.body.removeAttribute('data-page-signal')
    }
  }, [signal])
}
