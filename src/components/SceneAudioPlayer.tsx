import { useEffect } from 'react'
import { useAudio } from './AudioProvider'
import { assetPath } from '../lib/paths'

const bgmMap: Record<string, string> = {
  title: '/audio/title.mp3',
  scene1: '/audio/scene1.mp3',
  scene2: '/audio/scene2.mp3',
  scene3: '/audio/scene3.mp3',
  scene4: '/audio/scene4.mp3',
  finale: '/audio/finale.mp3',
}

export default function SceneAudioPlayer({ sceneId, playKey }: { sceneId: string; playKey: number }) {
  const { playBgm, stopBgm } = useAudio()

  useEffect(() => {
    const raw = bgmMap[sceneId]
    if (raw) playBgm(assetPath(raw))
    else stopBgm()
  }, [sceneId, playKey, playBgm, stopBgm])

  return null
}