import { Page } from '../store/store'

export type LayoutType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B'

interface Layout {
  cols: string
  rows: string
  ar: string  // что генерить для каждой ячейки
  slots: { id: string; area: string }[]
}

const layouts: Record<LayoutType, Layout> = {
  '1': { // 2×2 сетка — все 16:9
    cols: '1fr 1fr', rows: '1fr 1fr',
    ar: '16:9',
    slots: [
      { id: 'a', area: '1 / 1 / 2 / 2' },
      { id: 'b', area: '1 / 2 / 2 / 3' },
      { id: 'c', area: '2 / 1 / 3 / 2' },
      { id: 'd', area: '2 / 2 / 3 / 3' },
    ],
  },
  '2': { // Журнал — 4:3 все
    cols: '3fr 1fr', rows: '1fr 1fr 1fr',
    ar: '4:3',
    slots: [
      { id: 'big', area: '1 / 1 / 4 / 2' },
      { id: 'r1',   area: '1 / 2 / 2 / 3' },
      { id: 'r2',   area: '2 / 2 / 3 / 3' },
      { id: 'r3',   area: '3 / 2 / 4 / 3' },
    ],
  },
  '3': { // Баннер — левые 21:9, правые 16:9
    cols: '2fr 1fr', rows: '1fr 1fr',
    ar: 'левые 21:9, правые 16:9',
    slots: [
      { id: 'tl', area: '1 / 1 / 2 / 2' },
      { id: 'bl', area: '2 / 1 / 3 / 2' },
      { id: 'tr', area: '1 / 2 / 2 / 3' },
      { id: 'br', area: '2 / 2 / 3 / 3' },
    ],
  },
  '4': { // 4:3 + 1:1 — левый портрет, правый квадрат
    cols: '4fr 5fr', rows: '1fr',
    ar: 'левый 3:4, правый 1:1',
    slots: [
      { id: 'left',  area: '1 / 1 / 2 / 2' },
      { id: 'right', area: '1 / 2 / 2 / 3' },
    ],
  },
  '5': { // 3 портрета — все 9:16
    cols: '1fr 1fr 1fr', rows: '1fr',
    ar: '9:16',
    slots: [
      { id: 'p1', area: '1 / 1 / 2 / 2' },
      { id: 'p2', area: '1 / 2 / 2 / 3' },
      { id: 'p3', area: '1 / 3 / 2 / 4' },
    ],
  },
  '6': { // 4 панели — левые 3:2, правые 2:1
    cols: '3fr 4fr', rows: '1fr 1fr',
    ar: 'левые 3:2, правые 2:1',
    slots: [
      { id: 'lt', area: '1 / 1 / 2 / 2' },
      { id: 'lb', area: '2 / 1 / 3 / 2' },
      { id: 'rt', area: '1 / 2 / 2 / 3' },
      { id: 'rb', area: '2 / 2 / 3 / 3' },
    ],
  },
  '7': { // 4× 16:9 (чуть шире/уже) — запасной
    cols: '1.1fr 1fr', rows: '1fr 1fr',
    ar: '16:9',
    slots: [
      { id: 'lt', area: '1 / 1 / 2 / 2' },
      { id: 'lb', area: '2 / 1 / 3 / 2' },
      { id: 'rt', area: '1 / 2 / 2 / 3' },
      { id: 'rb', area: '2 / 2 / 3 / 3' },
    ],
  },
}

// Extras for 3-panel pages
export const extraLayouts: Record<string, Layout> = {
  '8': { // Герой + два (левая 4:3, правые 1:1)
    cols: '3fr 1.2fr', rows: '1fr 1fr',
    ar: 'левая 4:3, правые 1:1',
    slots: [
      { id: 'hero', area: '1 / 1 / 3 / 2' },
      { id: 'sm1',  area: '1 / 2 / 2 / 3' },
      { id: 'sm2',  area: '2 / 2 / 3 / 3' },
    ],
  },
  '9': { // 3 в ряд — все 9:16
    cols: '1fr 1fr 1fr', rows: '1fr',
    ar: '9:16',
    slots: [
      { id: 'p1', area: '1 / 1 / 2 / 2' },
      { id: 'p2', area: '1 / 2 / 2 / 3' },
      { id: 'p3', area: '1 / 3 / 2 / 4' },
    ],
  },

  'A': { // Флагман — 5 панелей: верх большой, центр 3 в ряд, низ широкий
    cols: '1fr 1fr 1fr', rows: '2fr 1fr 1.5fr',
    ar: 'произвольный (заполняют ячейки)',
    slots: [
      { id: 'top',   area: '1 / 1 / 2 / 4' },
      { id: 'c1',    area: '2 / 1 / 3 / 2' },
      { id: 'c2',    area: '2 / 2 / 3 / 3' },
      { id: 'c3',    area: '2 / 3 / 3 / 4' },
      { id: 'bot',   area: '3 / 1 / 4 / 4' },
    ],
  },

  'B': { // Горизонт — 4 панели: 2×(4:3+1:1) слева+справа
    cols: '3fr 1fr', rows: '1fr 1fr',
    ar: 'левые 4:3, правые 1:1',
    slots: [
      { id: 'tall', area: '1 / 1 / 2 / 2' },
      { id: 'sq1',  area: '1 / 2 / 2 / 3' },
      { id: 'mid',  area: '2 / 1 / 3 / 2' },
      { id: 'sq2',  area: '2 / 2 / 3 / 3' },
    ],
  },
}

type PanelInput = {
  src: string; type: 'image' | 'video'; alt: string
  dialogue: { speakerId: string; text: string }[]
  focus?: { x: number; y: number }
}

export function applyLayout(
  template: LayoutType | keyof typeof extraLayouts,
  pageId: string,
  panelData: PanelInput[]
): Page {
  const layout: Layout = (layouts as any)[template] || extraLayouts[template]!
  const panels = panelData.map((p, i) => ({ ...p, id: layout.slots[i]?.id || `p${i}` }))
  const gridAreas = layout.slots.slice(0, panels.length).map((slot, i) => ({
    panelId: panels[i].id,
    area: slot.area,
    order: i + 1,
  }))
  return {
    id: pageId,
    gridTemplateColumns: layout.cols,
    gridTemplateRows: layout.rows,
    gridAreas,
    panels,
  }
}