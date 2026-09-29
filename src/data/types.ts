import type { Page, ChoicePoint } from '../store/store'

export interface Scene {
  id: string
  pages: Page[]
  choicePoint?: ChoicePoint
}

export type { Page, ChoicePoint }