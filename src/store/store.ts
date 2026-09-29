import { create } from 'zustand'

export interface Panel {
  id: string
  src: string
  type: 'image' | 'video'
  alt: string
  dialogue: DialogueLine[]
  focus?: { x: number; y: number } // позиция фокуса в %, 50 50 = центр (умолчание)
}

export interface DialogueLine {
  speakerId: string
  text: string
}

export interface Page {
  id: string
  panels: Panel[]
  gridTemplateColumns: string
  gridTemplateRows: string
  gridAreas: { panelId: string; area: string; order: number }[]
}

export interface Choice {
  text: string
  nextPageId: string
}

export interface ChoicePoint {
  prompt: string
  choices: Choice[]
}

export interface HistoryEntry {
  nodeId: string
  pageIndex: number
}

export interface AppState {
  currentPageId: string | null
  currentPanelOrder: number
  currentDialogueIndex: number
  isRevealing: boolean
  flags: Record<string, any>
  actor: number
  killer: number
  pageHistory: HistoryEntry[]

  navigateToPage: (pageId: string) => void
  advancePanel: () => void
  nextDialogue: () => void
  setFlag: (key: string, value: any) => void
  addActor: (val: number) => void
  addKiller: (val: number) => void
  pushHistory: (entry: HistoryEntry) => void
  popHistory: () => HistoryEntry | null
  clearHistory: () => void
  reset: () => void
}

export const useStore = create<AppState>((set, get) => ({
  currentPageId: null,
  currentPanelOrder: 0,
  currentDialogueIndex: 0,
  isRevealing: false,
  flags: {},
  actor: 0,
  killer: 0,
  pageHistory: [],

  navigateToPage: (pageId) => set({
    currentPageId: pageId,
    currentPanelOrder: 0,
    currentDialogueIndex: 0,
    isRevealing: true,
  }),

  advancePanel: () => set((s) => ({
    currentPanelOrder: s.currentPanelOrder + 1,
    currentDialogueIndex: 0,
  })),

  nextDialogue: () => set((s) => ({ currentDialogueIndex: s.currentDialogueIndex + 1 })),

  setFlag: (key, value) => set((s) => ({
    flags: { ...s.flags, [key]: value }
  })),

  pushHistory: (entry) => set((s) => ({
    pageHistory: [...s.pageHistory, entry],
  })),
  popHistory: () => {
    const hist = get().pageHistory
    if (hist.length === 0) return null
    const last = hist[hist.length - 1]
    set({ pageHistory: hist.slice(0, -1) })
    return last
  },
  clearHistory: () => set({ pageHistory: [] }),

  addActor: (val) => set((s) => ({ actor: Math.max(0, Math.min(100, s.actor + val)) })),
  addKiller: (val) => set((s) => ({ killer: Math.max(0, Math.min(100, s.killer + val)) })),

  reset: () => set({
    currentPageId: null,
    currentPanelOrder: 0,
    currentDialogueIndex: 0,
    isRevealing: false,
    flags: {},
  }),
}))