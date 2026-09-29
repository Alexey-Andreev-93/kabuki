// Типы для state machine
export interface ChoiceDef {
  text: string
  flag: string
  nextPageId?: string
}

export interface RouteNode {
  type: 'start' | 'act_title' | 'scene' | 'scene_variant' | 'bridge' | 'choice' | 'title_card' | 'end'
  id?: string
  pages?: any
  choice?: any
  choiceAfter?: any
  jp?: string
  ru?: string
  sub?: string
  prompt?: string
  choices?: ChoiceDef[]
  next?: string
}

export interface RouteEntry {
  node: RouteNode
  onComplete?: string
  onChoice?: Record<string, string>
}