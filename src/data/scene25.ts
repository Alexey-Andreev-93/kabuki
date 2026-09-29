import { type Page } from '../store/store'
import { applyLayout } from './layouts'

// Стр 1 — 3 в ряд (1:1 + 1:1 + 1:1)
const s25p1_page: Page = {
  id: 'act1_scene25_page1',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '1fr',
  gridAreas: [
    { panelId: 'p_ren', area: '1 / 1 / 2 / 2', order: 1 },
    { panelId: 'p_hands', area: '1 / 2 / 2 / 3', order: 2 },
    { panelId: 'p_yuki_start', area: '1 / 3 / 2 / 4', order: 3 },
  ],
  panels: [
    {
      id: 'p_ren',
      src: '/comics/act_1/panels/s25_1_3.png', type: 'image' as const,
      alt: 'Профиль Рэна у окна',
      dialogue: [
        { speakerId: 'yuki', text: 'Комната маленькая. Но тихая. Мы давно не спали в тишине.' },
        { speakerId: 'ren', text: 'Тишина — это хорошо. В тишине слышно, о чём думаешь.' },
      ],
    },
    {
      id: 'p_hands',
      src: '/comics/act_1/panels/s25_1_2.png', type: 'image' as const,
      alt: 'Руки Юки на струнах сямисэна',
      dialogue: [
        { speakerId: 'yuki', text: 'Я помню, как мать играла эту мелодию. Перед сном. Ты помнишь?' },
        { speakerId: 'ren', text: '…Помню. Но я стараюсь не вспоминать.' },
      ],
    },
    {
      id: 'p_yuki_start',
      src: '/comics/act_1/panels/s25_2_3.png', type: 'image' as const,
      alt: 'Лицо Юки',
      dialogue: [
        { speakerId: 'ren', text: 'Воспоминания — роскошь, которую мы не можем себе позволить. Пока не закончим.' },
        { speakerId: 'yuki', text: 'А когда закончим — что тогда?' },
      ],
    },
  ],
}

// Стр 2 — шаблон 8: слева 4:3 (комната), справа две 1:1 (подоконник + лицо Юки)
const s25p2_panels = [
  {
    src: '/comics/act_1/panels/s25_1_1.png', type: 'image' as const,
    alt: 'Весь план комнаты — Рэн у окна, Юки на полу',
    dialogue: [
      { speakerId: 'ren', text: 'Тогда будем жить. По-настоящему. Без долгов. Без теней.' },
      { speakerId: 'yuki', text: 'А если мы ошиблись? Если это не они? Мы потратим годы — на пустоту.' },
    ],
  },
  {
    src: '/comics/act_1/panels/s25_2_2.png', type: 'image' as const,
    alt: 'Рука Рэна сжимает подоконник',
    dialogue: [
      { speakerId: 'ren', text: 'Это они. Я знаю их запах. Я помню ту ночь — каждую секунду.' },
    ],
  },
  {
    src: '/comics/act_1/panels/s25_2_1.png', type: 'image' as const,
    alt: 'Разговор, Рэн поворачивается к Юки',
    dialogue: [
      { speakerId: 'yuki', text: 'Ты помнишь запах. А я помню лицо нашей матери. Она плакала — не за себя, за нас.' },
    ],
  },
]

// Стр 3 — fullscreen
const s25p3_page: Page = {
  id: 'act1_scene25_page3',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',
  gridAreas: [{ panelId: 'p_moon', area: '1 / 1 / 2 / 2', order: 1 }],
  panels: [{
    id: 'p_moon',
    src: '/comics/act_1/panels/s25_3_1.png', type: 'image' as const,
    alt: 'Комната сверху — луна между Рэном и Юки',
    dialogue: [
      { speakerId: 'ren', text: 'Ложись спать. Завтра будет долгий день.' },
      { speakerId: 'narrator', text: 'Они не поссорились. Они просто замолчали. Но в этом молчании было больше правды, чем за весь день улыбок и поклонов.' },
    ],
  }],
}

export const scene25Pages = [
  s25p1_page,
  applyLayout('8', 'act1_scene25_page2', s25p2_panels),
  s25p3_page,
]