import { createContext, useContext, useRef, useCallback, useEffect, type ReactNode } from 'react'
import { useStore } from '../store/store'

interface AudioCtx {
  playBgm: (src: string) => void
  stopBgm: () => void
}

const Ctx = createContext<AudioCtx>({ playBgm: () => {}, stopBgm: () => {} })
export const useAudio = () => useContext(Ctx)

export default function AudioProvider({ children }: { children: ReactNode }) {
  const bgmRef = useRef<HTMLAudioElement | null>(null)

  const playBgm = useCallback((src: string) => {
    if (bgmRef.current) { bgmRef.current.pause(); bgmRef.current = null }
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.3
    audio.play().catch(() => {})
    bgmRef.current = audio
  }, [])

  const stopBgm = useCallback(() => {
    if (bgmRef.current) { bgmRef.current.pause(); bgmRef.current = null }
  }, [])

  useEffect(() => {
    return () => { if (bgmRef.current) bgmRef.current.pause() }
  }, [])

  return <Ctx.Provider value={{ playBgm, stopBgm }}>{children}</Ctx.Provider>
}