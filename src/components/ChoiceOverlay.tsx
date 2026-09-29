import { useState, useCallback } from 'react'

interface Choice {
  text: string
  nextPageId?: string
  flag: string
}

interface ChoiceOverlayProps {
  prompt: string
  choices: Choice[]
  onChoose: (choice: Choice) => void
}

const CX = 200, CY = 200, RING_R = 95, TEXT_R = 165

function polar(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180
  return { x: CX + Math.cos(rad) * r, y: CY + Math.sin(rad) * r }
}

function splitText(text: string, maxLen = 14): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const w of words) {
    if ((current + ' ' + w).trim().length <= maxLen) {
      current = (current + ' ' + w).trim()
    } else {
      if (current) lines.push(current)
      current = w
    }
  }
  if (current) lines.push(current)
  return lines.length ? lines : [text]
}

function flameTendril(angle: number, startOffset: number, endOffset: number): string {
  const startRad = ((angle + startOffset) * Math.PI) / 180
  const endRad = ((angle + endOffset) * Math.PI) / 180
  const sx = CX + Math.cos(startRad) * RING_R
  const sy = CY + Math.sin(startRad) * RING_R
  const ex = CX + Math.cos(endRad) * (TEXT_R + 5)
  const ey = CY + Math.sin(endRad) * (TEXT_R + 5)
  const midR = (RING_R + TEXT_R) / 2
  const midA = ((angle + (startOffset + endOffset) * 0.4) * Math.PI) / 180
  const cpx = CX + Math.cos(midA) * midR * 1.1
  const cpy = CY + Math.sin(midA) * midR * 1.1
  const midA2 = ((angle + (startOffset + endOffset) * 0.7) * Math.PI) / 180
  const cpx2 = CX + Math.cos(midA2) * midR * 1.05
  const cpy2 = CY + Math.sin(midA2) * midR * 1.05
  return `M${sx},${sy} C${cpx},${cpy} ${cpx2},${cpy2} ${ex},${ey}`
}

export default function ChoiceOverlay({ prompt, choices, onChoose }: ChoiceOverlayProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [mouseAngle, setMouseAngle] = useState(-90)

  const angles = [-90, 30, 150]

  const svgMouse = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
    const mx = ((e.clientX - rect.left) / rect.width) * 400
    const my = ((e.clientY - rect.top) / rect.height) * 400
    const angle = Math.atan2(my - CY, mx - CX) * (180 / Math.PI)
    setMouseAngle(angle)

    let minDist = Infinity, closest = -1
    angles.forEach((a, i) => {
      let diff = Math.abs(angle - a)
      if (diff > 180) diff = 360 - diff
      if (diff < minDist) { minDist = diff; closest = i }
    })
    setHovered(closest)
  }, [angles])

  return (
    <div className="choice-overlay" onClick={(e) => e.stopPropagation()}>
      <svg viewBox="0 0 400 400" style={{ width: 560, height: 560, display: 'block' }}
        onMouseMove={svgMouse} onMouseLeave={() => setHovered(null)}
      >
        <defs>
          <style>{`
            @keyframes ringSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .spin-ring { animation: ringSpin 12s linear infinite; transform-origin: 200px 200px; }
            @keyframes fp0 { 0%,100% { opacity: 0.25; } 50% { opacity: 0.65; } }
            @keyframes fp1 { 0%,100% { opacity: 0.2; } 50% { opacity: 0.5; } }
            @keyframes fp2 { 0%,100% { opacity: 0.3; } 50% { opacity: 0.7; } }
            @keyframes fp3 { 0%,100% { opacity: 0.15; } 50% { opacity: 0.5; } }
            .flame-0 { animation: fp0 1.8s ease-in-out infinite; }
            .flame-1 { animation: fp1 2.2s ease-in-out 0.3s infinite; }
            .flame-2 { animation: fp2 1.5s ease-in-out 0.6s infinite; }
            .flame-3 { animation: fp3 2.5s ease-in-out 1s infinite; }
          `}</style>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cc0000" />
            <stop offset="50%" stopColor="#ff4444" />
            <stop offset="100%" stopColor="#990000" />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="softGlow"><feGaussianBlur stdDeviation="8" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>

        {/* Flame tendrils */}
        {hovered !== null && (() => {
          const a = angles[hovered]
          const tendrils = [
            { startOff: -25, endOff: 0, w: 6, cls: 'flame-0' },
            { startOff: -10, endOff: 0, w: 5, cls: 'flame-1' },
            { startOff: 10, endOff: 0, w: 5, cls: 'flame-2' },
            { startOff: 25, endOff: 0, w: 6, cls: 'flame-3' },
          ]
          const base = polar(a, TEXT_R)
          return (
            <>
              <circle cx={base.x} cy={base.y} r={40} fill="rgba(204,0,0,0.08)" filter="url(#softGlow)" />
              <circle cx={base.x} cy={base.y} r={25} fill="rgba(204,0,0,0.12)" filter="url(#softGlow)" />
              {tendrils.map((t, idx) => (
                <path key={idx} d={flameTendril(a, t.startOff, t.endOff)}
                  fill="none" stroke="#cc0000" strokeWidth={t.w}
                  strokeLinecap="round" opacity={0.6} filter="url(#glow)" className={t.cls} />
              ))}
            </>
          )
        })()}

        {/* Rotating ring */}
        <g className="spin-ring">
          <circle cx={CX} cy={CY} r={RING_R} fill="none" stroke="url(#ringGrad)" strokeWidth="7" />
        </g>

        {/* Text labels */}
        {choices.map((choice, i) => {
          const a = angles[i]
          const pos = polar(a, TEXT_R)
          const isHover = hovered === i
          const lines = splitText(choice.text, 14)
          const lineH = 22
          return lines.map((line, li) => (
            <text key={`${i}_${li}`}
              x={pos.x}
              y={pos.y - (lines.length - 1) * lineH / 2 + li * lineH}
              textAnchor="middle" dominantBaseline="central"
              fontSize={isHover ? 16 : 15} fontWeight="bold"
              fill={isHover ? 'url(#ringGrad)' : '#ccc'}
              style={isHover ? { filter: 'drop-shadow(0 0 6px rgba(204,0,0,0.5))' } : {}}
              pointerEvents="none">{line}</text>
          ))
        })}

        {/* Center prompt */}
        <text x={CX} y={CY} textAnchor="middle" dominantBaseline="central"
          fill="#888" fontSize="13" letterSpacing="2" pointerEvents="none">{prompt}</text>

        {/* Hit layer — on top of everything, catches clicks */}
        <rect x="0" y="0" width="400" height="400" fill="transparent" cursor="pointer"
          onClick={() => { if (hovered !== null) onChoose(choices[hovered]) }} />
      </svg>
    </div>
  )
}