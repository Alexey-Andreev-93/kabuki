import { useStore, Page } from '../store/store'
import { useEffect, useRef, useState } from 'react'
import { assetPath } from '../lib/paths'

const speakerNames: Record<string, string> = {
  tadashi: 'ТАДАСИ', ryusei: 'РЮСЭЙ', goro: 'ГОРО',
  kenta: 'КЭНТА', kage: 'КАГЭ', ren: 'РЭН', yuki: 'ЮКИ',
}

interface Props { page: Page; onPageComplete: () => void; sceneClass?: string }

export default function MangaViewer({ page, onPageComplete, sceneClass }: Props) {
  const currentPanelOrder = useStore((s) => s.currentPanelOrder)
  const currentDialogueIndex = useStore((s) => s.currentDialogueIndex)
  const advancePanel = useStore((s) => s.advancePanel)
  const nextDialogue = useStore((s) => s.nextDialogue)

  const sortedAreas = [...page.gridAreas].sort((a, b) => a.order - b.order)
  const currentPanelId = sortedAreas[currentPanelOrder]?.panelId
  const currentPanel = page.panels.find((p) => p.id === currentPanelId)
  const currentDialogue = currentPanel?.dialogue[currentDialogueIndex]

  const animated = !!sceneClass
  const skewAmt = (area: string | undefined) => {
    if (!animated || !area) return ''
    // Если панель растянута на несколько рядов (row-end - row-start > 1)
    // — уменьшаем skew, чтобы не залезать на соседние
    const parts = area.split('/').map(s => parseInt(s.trim()))
    if (parts.length === 4 && parts[2] - parts[1] > 1) return ' skewX(1deg)'
    return ' skewX(3deg)'
  }
  const [sliding, setSliding] = useState<Set<string>>(new Set())
  const prevPageId = useRef(page.id)

  // Reset sliding on page change
  useEffect(() => {
    if (page.id !== prevPageId.current) {
      prevPageId.current = page.id
      setSliding(new Set())
    }
  }, [page.id])

  // Preload videos
  useEffect(() => {
    document.querySelectorAll('.panel video').forEach(v => (v as HTMLVideoElement).load())
  }, [page.id])

  const handleClick = () => {
    if (!currentPanel) return
    if (currentDialogueIndex + 1 < currentPanel.dialogue.length) { nextDialogue(); return }
    if (currentPanelOrder + 1 < sortedAreas.length) {
      // Set sliding synchronously BEFORE advancePanel so the new panel
      // renders with the transition already applied
      if (animated) {
        const nextId = sortedAreas[currentPanelOrder + 1]?.panelId
        if (nextId) {
          setSliding(prev => new Set(prev).add(nextId))
          setTimeout(() => {
            setSliding(prev => {
              const next = new Set(prev)
              next.delete(nextId)
              return next
            })
          }, 450)
        }
      }
      advancePanel()
      return
    }
    onPageComplete()
  }

  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: page.gridTemplateColumns,
    gridTemplateRows: page.gridTemplateRows,
  }

  return (
    <div className={`manga-page${sceneClass ? ' scene-' + sceneClass : ''}${animated ? ' scene-animated' : ''}`} style={gridStyle} onClick={handleClick}>
      {page.panels.map(panel => {
        const area = page.gridAreas.find(a => a.panelId === panel.id)
        const order = sortedAreas.findIndex(a => a.panelId === panel.id)
        const isRevealed = order <= currentPanelOrder
        const isActive = panel.id === currentPanelId
        const dialogue = isActive && currentDialogue ? currentDialogue : undefined
        const isNarrator = dialogue?.speakerId === 'narrator'
        const focus = panel.focus || { x: 50, y: 50 }

        let panelStyle: React.CSSProperties = { gridArea: area?.area }

        if (animated) {
          const s = skewAmt(area?.area)
          if (!isRevealed) {
            panelStyle = { ...panelStyle, opacity: 0, transform: `scale(0.92) translateY(20px)${s}`, pointerEvents: 'none' }
          } else if (sliding.has(panel.id)) {
            panelStyle = {
              ...panelStyle, opacity: 1, transform: `scale(1) translateY(0)${s}`,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
            }
          } else {
            panelStyle = { ...panelStyle, opacity: 1, transform: `scale(1) translateY(0)${s}` }
          }
        } else {
          panelStyle = { ...panelStyle, opacity: isRevealed ? 1 : 0, pointerEvents: isRevealed ? 'auto' : 'none' }
        }

        return (
          <div key={panel.id} className="panel" style={panelStyle}>
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