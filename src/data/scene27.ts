import { type Page } from '../store/store'
import { applyLayout } from './layouts'

// Стр 1 — «Утро. Вердикт» — 3 панели (Тадаси на сцене + ребята в зале + Рюсэй)
const s27p1_panels = [
  {
    src: '/comics/act_1/panels/s27_1_1.png', type: 'image' as const,
    alt: 'Тадаси стоит на сцене утром',
    dialogue: [
      { speakerId: 'tadashi', text: 'Вы говорили всю ночь. Стены тонкие — я слышал. Вы не спали. Вы думали. Это хорошо.' },
      { speakerId: 'ren', text: 'Мы готовы, господин.' },
    ],
  },
  {
    src: '/comics/act_1/panels/s27_1_2.png', type: 'image' as const,
    alt: 'Рэн и Юки ждут вердикта в зале',
    dialogue: [
      { speakerId: 'yuki', text: '…' },
      { speakerId: 'narrator', text: 'Он стоял на сцене — высоко, в утреннем свету. Они — внизу, в тени. Между ними было расстояние в один шаг. И целая жизнь.' },
    ],
  },
  {
    src: '/comics/act_1/panels/s27_1_3.png', type: 'image' as const,
    alt: 'Рюсэй наблюдает у колонны',
    dialogue: [
      { speakerId: 'ryusei', text: 'Ночью шептались. О чём молчишь ночью — то и есть правда. Интересно, о чём молчали вы?' },
      { speakerId: 'ren', text: 'О том же, о чём вы, господин. О прошлом. Которое не отпускает.' },
    ],
  },
]

// Выбор — полноэкранный кадр 16:9
export const scene27Choice = {
  prompt: 'Утро. Тадаси смотрит на них. Всю ночь он думал. Теперь — слово.',
  image: '/comics/act_1/panels/choice_2.png',
  choices: [
    { text: 'Принять в труппу', nextPageId: 'act1_scene27_after', flag: 'trust_ren' },
    { text: 'Устроить испытание', nextPageId: 'act1_scene27_after', flag: 'test_ren' },
    { text: 'Отказать', nextPageId: 'act1_scene27_after', flag: 'reject_ren' },
  ],
}

export const scene27Pages = [
  applyLayout('8', 'act1_scene27_page1', s27p1_panels),
]

// Эпилоги — одна fullscreen панель на вариант
const epiloguePage = (id: string, src: string, text: string): Page => ({
  id,
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',
  gridAreas: [{ panelId: 'p_ep', area: '1 / 1 / 2 / 2', order: 1 }],
  panels: [{
    id: 'p_ep',
    src, type: 'image' as const,
    alt: text,
    dialogue: [{ speakerId: 'tadashi', text }],
  }],
})

export const epilogueTrust: Page = epiloguePage(
  'act1_scene27_trust',
  '/comics/act_1/panels/s27_trust.png',
  'Оставайтесь. Труппа — это семья. А семья не бросает своих.'
)

export const epilogueTest: Page = epiloguePage(
  'act1_scene27_test',
  '/comics/act_1/panels/s27_test.png',
  'Слова — это ветер. Докажи делом: кто ты на сцене. Вечером — испытание.'
)

export const epilogueReject: Page = epiloguePage(
  'act1_scene27_reject',
  '/comics/act_1/panels/s27_reject.png',
  'Я не возьму вас. Вы переночевали — и довольно. Идите своей дорогой.'
)