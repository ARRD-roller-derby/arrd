import { useEffect } from 'react'
import { useLocalState } from './local-state'

export function useIsMobile(): boolean {
  const { localState, setLocalState } = useLocalState<{ isMobile: boolean }>(
    { isMobile: true },
    'valhalla_device'
  )

  const handleResize = () => {
    setLocalState({ isMobile: window.innerWidth <= 600 ? true : false })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  return typeof window !== 'undefined' ? localState.isMobile : false
}
