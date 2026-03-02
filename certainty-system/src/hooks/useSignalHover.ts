'use client'

import { useAmbient } from '@/context/AmbientContext'

export function useSignalHover(signal: 'red' | 'yellow' | 'green' | 'neutral') {
  const { setSignal, clearSignal } = useAmbient()

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return {}
  }

  return {
    onMouseEnter: () => setSignal(signal),
    onMouseLeave: () => clearSignal(),
  }
}
