import { useState, useCallback, useMemo, useRef } from 'react'
import MangaViewer from './components/MangaViewer'
import ChoiceOverlay from './components/ChoiceOverlay'
import TitleCard from './components/TitleCard'
import SceneAudioPlayer from './components/SceneAudioPlayer'
import AudioProvider from './components/AudioProvider'
import { getRoutes, scaleMap } from './engine/routes'
import type { RouteEntry } from './engine/types'
import { useStore, type HistoryEntry } from './store/store'
import { assetPath } from './lib/paths'
import './index.css'

export default function App() {
  const [nodeId, setNodeId] = useState('start')
  const [pageIndex, setPageIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [bgmKey, setBgmKey] = useState(0)
  const [fadeOverlay, setFadeOverlay] = useState(false)

  const navigateToPage = useStore((s) => s.navigateToPage)
  const setFlag = useStore((s) => s.setFlag)
  const addActor = useStore((s) => s.addActor)
  const addKiller = useStore((s) => s.addKiller)
  const pushHistory = useStore((s) => s.pushHistory)
  const popHistory = useStore((s) => s.popHistory)
  const clearHistory = useStore((s) => s.clearHistory)
  const pageHistory = useStore((s) => s.pageHistory)

  // Current route
  const routes = useMemo(() => getRoutes(), [nodeId])
  const route = routes[nodeId] as RouteEntry | undefined
  const node = route?.node

  // Page source: scene / scene_variant / bridge
  const currentPages = node?.pages as any[] | undefined
  const currentPage = currentPages?.[pageIndex] ?? null

  // BGM
  const sceneId = nodeId === 'start' ? ''
    : nodeId === 'act1_title' ? 'title'
    : nodeId.startsWith('prologue') ? 'title'
    : nodeId.startsWith('scene0') ? 'scene1'
    : nodeId.startsWith('scene1') ? 'scene1'
    : nodeId.startsWith('scene2') || nodeId === 'scene2_title' ? 'scene2'
    : nodeId.startsWith('scene3') || nodeId.startsWith('bridge') ? 'scene3'
    : nodeId.startsWith('scene4') ? 'scene4'
    : nodeId.startsWith('finale') || nodeId === 'end' ? 'finale'
    : ''

  // ─── START ───
  const handleStart = useCallback(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    ctx.resume().catch(() => {})
    setBgmKey(k => k + 1)
    setNodeId('act1_title')
  }, [])

  // ─── PAGE COMPLETE ───
  const advanceToPage = useCallback((idx: number) => {
    setVisible(false)
    setTimeout(() => {
      pushHistory({ nodeId, pageIndex })
      navigateToPage(currentPages![idx].id)
      setPageIndex(idx)
      setTimeout(() => setVisible(true), 50)
    }, 300)
  }, [nodeId, pageIndex, currentPages, pushHistory, navigateToPage])

  const handlePageComplete = useCallback(() => {
    if (!route || !currentPages) return
    const ni = pageIndex + 1
    if (ni < currentPages.length) {
      advanceToPage(ni)
      return
    }
    // Choice after variant pages (scene 3 variants)
    if (node?.choiceAfter) {
      setShowChoiceOverlay(node.choiceAfter.prompt, node.choiceAfter.choices)
      return
    }
    // Scene-level choice
    if (node?.choice) {
      setShowChoiceOverlay(node.choice.prompt, node.choice.choices, node.choice.image)
      return
    }
    // Linear transition
    if (route.onComplete) {
      setFadeOverlay(true)
      setVisible(false)
      setTimeout(() => {
        clearHistory()
        setNodeId(route.onComplete)
        setPageIndex(0)
        setTimeout(() => {
          setVisible(true)
          setFadeOverlay(false)
        }, 50)
      }, 300)
    }
  }, [route, node, pageIndex, currentPages, advanceToPage, clearHistory])

  // ─── CHOICE ───
  const [choiceOverlay, setChoiceOverlay] = useState<{ prompt: string; choices: any[]; image?: string } | null>(null)

  const setShowChoiceOverlay = useCallback((prompt: string, choices: any[], image?: string) => {
    setChoiceOverlay({ prompt, choices, image })
  }, [])

  const handleChoice = useCallback((choice: { flag: string }) => {
    setFlag(choice.flag, true)
    setChoiceOverlay(null)

    // Scales
    const scale = scaleMap[choice.flag]
    if (scale) {
      const { actor, killer } = scale()
      if (actor) addActor(actor)
      if (killer) addKiller(killer)
    }

    // Route via onChoice
    if (route?.onChoice?.[choice.flag]) {
      setFadeOverlay(true)
      setVisible(false)
      setTimeout(() => {
        clearHistory()
        setNodeId(route.onChoice[choice.flag])
        setPageIndex(0)
        setTimeout(() => {
          setVisible(true)
          setFadeOverlay(false)
        }, 50)
      }, 300)
    }
  }, [route, setFlag, addActor, addKiller, clearHistory])

  // ─── TITLE CARD ───
  const handleTitleNext = useCallback(() => {
    if (!node) return
    setFadeOverlay(true)
    setVisible(false)
    setTimeout(() => {
      if (route?.onComplete) {
        clearHistory()
        setNodeId(route.onComplete)
        setPageIndex(0)
      }
      setTimeout(() => {
        setVisible(true)
        setFadeOverlay(false)
      }, 50)
    }, 300)
  }, [route, node, clearHistory])

  // ─── BACK ───
  const handleBack = useCallback(() => {
    const prev = popHistory()
    if (prev === null) return
    setBgmKey(k => k + 1)
    setVisible(false)
    setTimeout(() => {
      setNodeId(prev.nodeId)
      setPageIndex(prev.pageIndex)
      setTimeout(() => setVisible(true), 50)
    }, 300)
  }, [popHistory, setNodeId])

  // Reset store when page changes
  useMemo(() => {
    if (currentPage?.id) navigateToPage(currentPage.id)
  }, [currentPage?.id])

  // ─── RENDER ───
  if (!node) return <div style={{ color: '#fff', padding: 40 }}>Ошибка: узел {nodeId} не найден</div>

  // Choice overlay (sits on top of current page)
  const showChoice = choiceOverlay !== null

  return (
    <AudioProvider>
      <SceneAudioPlayer sceneId={sceneId} playKey={bgmKey} />

      {/* Landscape hint for mobile */}
      <div className="landscape-hint">
        <div style={{ fontSize: 'clamp(32px, 10vw, 64px)' }}>📱↻</div>
        <div>Пожалуйста, поверните устройство</div>
        <div style={{ color: '#666', fontSize: 'clamp(12px, 3vw, 16px)' }}>Для просмотра комикса используйте горизонтальную ориентацию</div>
      </div>

      {node.type === 'start' ? (
        <div
          style={{
            width: '100vw', height: '100vh', background: '#0a0a0a',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '32px', cursor: 'pointer',
          }}
          onClick={handleStart}
        >
          <div style={{ color: '#cc0000', fontSize: '42px', fontWeight: 'bold', letterSpacing: '0.3em' }}>
            テアトル オブ シャドウズ
          </div>
          <div style={{ color: '#555', fontSize: '24px', letterSpacing: '0.2em' }}>
            ТЕАТР ТЕНЕЙ
          </div>
          <div style={{ color: '#333', fontSize: '14px', marginTop: '48px', letterSpacing: '0.1em' }}>
            НАЖМИТЕ, ЧТОБЫ НАЧАТЬ
          </div>
        </div>
      ) : node.type === 'title_card' ? (
        <TitleCard
          jp={node.jp || ''}
          ru={node.ru || ''}
          sub={node.sub}
          onNext={handleTitleNext}
        />
      ) : (
        <div style={{ position: 'relative' }}>
          {showChoice && choiceOverlay?.image ? (
            <div style={{ position: 'fixed', inset: 0, background: '#0a0a0a' }}>
              <img src={assetPath(choiceOverlay.image)} alt="" style={{
                width: '100vw', height: '100vh', objectFit: 'cover', display: 'block',
              }} />
            </div>
          ) : null}
          {currentPage ? (
            <div className={`page-wrap ${visible ? 'page-visible' : 'page-hidden'}`}>
              <MangaViewer page={currentPage} sceneClass={nodeId.replace(/_.*$/, '')} onPageComplete={handlePageComplete} />
            </div>
          ) : showChoice ? null : (
            <div style={{ color: '#fff', padding: 40 }}>Загрузка…</div>
          )}
          {pageHistory.length > 0 && !showChoice && (
            <button onClick={handleBack} style={{
              position: 'fixed', left: 16, bottom: 16,
              width: 44, height: 44,
              background: 'rgba(0,0,0,0.3)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%',
              fontSize: 20, cursor: 'pointer', zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s', opacity: 0.7,
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
            title="Назад">←</button>
          )}
          {showChoice && choiceOverlay && (
            <ChoiceOverlay
              prompt={choiceOverlay.prompt}
              choices={choiceOverlay.choices}
              onChoose={handleChoice}
            />
          )}
          {fadeOverlay && (
            <div style={{
              position: 'fixed', inset: 0, background: '#0a0a0a', zIndex: 999,
              transition: 'opacity 0.3s', opacity: 1,
            }} />
          )}
        </div>
      )}
      {/* Act I progress bar */}
      {node.type !== 'start' && (() => {
        const beats = [
          { key: 'prologue', label: 'Пролог' },
          { key: 'scene0', label: 'Утро' },
          { key: 'scene15', label: 'Рынок' },
          { key: 'scene1', label: 'Хлопоты' },
          { key: 'scene2', label: 'Гости' },
          { key: 'scene25', label: 'Ночь' },
          { key: 'scene27', label: 'Вердикт' },
          { key: 'scene3', label: 'Репетиция' },
          { key: 'bridge', label: 'Мостик' },
          { key: 'scene4', label: 'Сад' },
          { key: 'finale', label: 'Финал' },
        ]
        const idx = beats.findIndex(b => nodeId === b.key || nodeId.startsWith(b.key + '_'))
        const pct = idx >= 0 ? ((idx + 1) / beats.length) * 100 : 0
        return (
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, height: 3, zIndex: 100,
            background: 'rgba(255,255,255,0.08)',
          }}>
            <div style={{
              height: '100%', width: `${pct}%`,
              background: '#cc0000', transition: 'width 0.5s ease',
            }} />
          </div>
        )
      })()}
    </AudioProvider>
  )
}