'use client'

import { createContext, useContext, useCallback, useRef } from 'react'

type Signal = 'neutral' | 'red' | 'yellow' | 'green'

const AmbientContext = createContext<{
  setSignal: (s: Signal) => void
  clearSignal: () => void
}>({ setSignal: () => {}, clearSignal: () => {} })

export function AmbientProvider({ children }: { children: React.ReactNode }) {
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const returnRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const setSignal = useCallback((signal: Signal) => {
    clearTimeout(returnRef.current)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      document.body.setAttribute('data-signal', signal)
    }, 300)
  }, [])

  const clearSignal = useCallback(() => {
    clearTimeout(debounceRef.current)
    returnRef.current = setTimeout(() => {
      const pageSignal = document.body.getAttribute('data-page-signal') || 'neutral'
      document.body.setAttribute('data-signal', pageSignal)
    }, 600)
  }, [])

  return (
    <AmbientContext.Provider value={{ setSignal, clearSignal }}>
      {children}
    </AmbientContext.Provider>
  )
}

export const useAmbient = () => useContext(AmbientContext)
