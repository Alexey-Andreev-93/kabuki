// Calculate panel pixel positions from grid template data
export function calcPositions(
  colsFr: string[],
  rowsFr: string[],
  viewW: number,
  viewH: number,
  gap: number,
  areas: { panelId: string; area: string }[]
) {
  const colFr = colsFr.map(s => parseFloat(s))
  const rowFr = rowsFr.map(s => parseFloat(s))
  const colPx = colFr.map(f => (f / colFr.reduce((a, b) => a + b, 0)) * viewW)
  const rowPx = rowFr.map(f => (f / rowFr.reduce((a, b) => a + b, 0)) * viewH)

  return areas.map(a => {
    const parts = a.area.split(' / ').map(Number) // [rs, cs, re, ce]
    const [rs, cs, re, ce] = parts
    // Adjust for 0-indexed
    const r1 = rs - 1, c1 = cs - 1, r2 = re - 1, c2 = ce - 1

    let x = 0, y = 0, w = 0, h = 0
    for (let i = 0; i < c1; i++) x += colPx[i] + gap
    for (let i = 0; i < r1; i++) y += rowPx[i] + gap
    for (let i = c1; i < c2; i++) w += colPx[i] + (i > c1 ? gap : 0)
    for (let i = r1; i < r2; i++) h += rowPx[i] + (i > r1 ? gap : 0)

    return { panelId: a.panelId, x, y, w, h, order: 0 }
  })
}

// Fullscreen position
const full = { x: 0, y: 0, w: 1, h: 1 } // will be replaced with viewport dims