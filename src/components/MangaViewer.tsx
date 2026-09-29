import { useStore, Page } from '../store/store'
import { useEffect, useRef, useState } from 'react'
import { assetPath } from '../lib/paths'

const speakerNames: Record<string, string> = {
  tadashi: 'ТАДАСИ', ryusei: 'РЮСЭЙ', goro: 'ГОРО',
  kenta: 'КЭНТА', kage: 'КАГЭ', ren: 'РЭН', yuki: 'ЮКИ',
}

interface Props { page: Page; onPageComplete: () => void }

export default function MangaViewer({ page, onPageComplete }: Props) {
  const currentPanelOrder = useStore((s) => s.currentPanelOrder)
  const currentDialogueIndex = useStore((s) => s.currentDialogueIndex)
  const advancePanel = useStore((s) => s.advancePanel)
  const nextDialogue = useStore((s) => s.nextDialogue)

  const sortedAreas = [...page.gridAreas].sort((a, b) => a.order - b.order)
  const currentPanelId = sortedAreas[currentPanelOrder]?.panelId
  const currentPanel = page.panels.find((p) => p.id === currentPanelId)
  const currentDialogue = currentPanel?.dialogue[currentDialogueIndex]

  // Track newly revealed panels for slide-in animation
  const [sliding, setSliding] = useState<Set<string>>(new Set())
  const prevOrder = useRef(currentPanelOrder)
  useEffect(() => {
    if (currentPanelOrder > prevOrder.current) {
      const newId = sortedAreas[currentPanelOrder]?.panelId
      if (newId) setSliding(prev => new Set(prev).add(newId))
      const t = setTimeout(() => setSliding(new Set()), 400)
      prevOrder.current = currentPanelOrder
      return () => clearTimeout(t)
    }
  }, [currentPanelOrder, sortedAreas])

  // Preload videos — force browser to start downloading
  useEffect(() => {
    document.querySelectorAll('.panel video').forEach(v => (v as HTMLVideoElement).load())
  }, [page.id])

  const handleClick = () => {
    if (!currentPanel) return
    if (currentDialogueIndex + 1 < currentPanel.dialogue.length) { nextDialogue(); return }
    if (currentPanelOrder + 1 < sortedAreas.length) { advancePanel(); return }
    onPageComplete()
  }

  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: page.gridTemplateColumns,
    gridTemplateRows: page.gridTemplateRows,
  }

  return (
    <div className="manga-page" style={gridStyle} onClick={handleClick}>
      {page.panels.map(panel => {
        const area = page.gridAreas.find(a => a.panelId === panel.id)
        const order = sortedAreas.findIndex(a => a.panelId === panel.id)
        const isRevealed = order <= currentPanelOrder
        const isNew = sliding.has(panel.id)
        const isActive = panel.id === currentPanelId
        const dialogue = isActive && currentDialogue ? currentDialogue : undefined
        const isNarrator = dialogue?.speakerId === 'narrator'
        const focus = panel.focus || { x: 50, y: 50 }

        let animStyle: React.CSSProperties = {}
        if (!isRevealed) {
          // Keep video elements in DOM but hidden to allow preloading
          animStyle = panel.type === 'video' 
            ? { opacity: 0, pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: -1 }
            : { opacity: 0, transform: 'translateY(30px)', transition: 'none', display: 'none' }
        } else if (isNew) {
          animStyle = { opacity: 1, transform: 'translateY(0)', transition: 'transform 0.35s ease, opacity 0.3s ease' }
        } else {
          animStyle = { opacity: 1, transform: 'translateY(0)' }
        }

        return (
          <div
            key={panel.id}
            className="panel"
            style={{ gridArea: area?.area, ...animStyle }}
          >
            {panel.type === 'video' ? (
              <video src={assetPath(panel.src)} autoPlay muted playsInline preload="auto"
                draggable={false} onContextMenu={e => e.preventDefault()}
                style={{ objectPosition: `${focus.x}% ${focus.y}%`, width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none', WebkitUserSelect: 'none' }} />
            ) : (
              <img src={assetPath(panel.src)} alt={panel.alt}
                draggable={false} onContextMenu={e => e.preventDefault()}
                style={{ objectPosition: `${focus.x}% ${focus.y}%`, width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none', WebkitUserSelect: 'none' }} />
            )}
            {dialogue && (
              <div className={isNarrator ? 'bubble-narrator' : 'bubble'}>
                {!isNarrator && <div className="bubble-tail" />}
                {!isNarrator && <div className="bubble-name">{speakerNames[dialogue.speakerId] || dialogue.speakerId}</div>}
                <div className="bubble-text">{dialogue.text}{!isNarrator && <span className="bubble-cursor" />}</div>
              </div>
            )}
          </div>
        )
      })}
      <div className="page-counter">{currentPanelOrder + 1}/{sortedAreas.length}</div>
    </div>
  )
}