import { type Page } from '../store/store'
import { applyLayout } from './layouts'

const s1p1_panels = [
  {
    src: '/comics/act_1/panels/panel_1_1.png', type: 'image' as const,
    alt: 'Широкий план закулисья театра',
    dialogue: [
      { speakerId: 'tadashi', text: 'Солнце встанет — зал откроется. А у нас ни прогона, ни порядка. Шевелись, Горо.' },
      { speakerId: 'goro', text: 'Да движемся, господин. Рис на рынке третью седмицу дорожает, а спектакль — никогда. Успеем.' },
      { speakerId: 'tadashi', text: 'Рис подождёт. Долг — нет. Сегодня зритель платит за то, чтобы забыть свои заботы. Наша работа — дать ему эту забыть.' },
    ],
  },
  {
    src: '/comics/act_1/panels/panel_1_2.png', type: 'image' as const,
    alt: 'Тадаси с листком',
    dialogue: [
      { speakerId: 'tadashi', text: 'Кэнта. Веер. Ты без него как воин без меча. Роль без веера — не роль. Подбери.' },
    ],
  },
  {
    src: '/comics/act_1/panels/panel_1_3.png', type: 'image' as const,
    alt: 'Горо тащит декорацию',
    dialogue: [
      { speakerId: 'goro', text: 'Было время — за такую тяжесть платили медяками, а могли и мечом по шее. Теперь вот декорации таскаю. И странное дело — легче на душе.' },
    ],
  },
]

const s1p2_panels = [
  {
    src: '/comics/act_1/panels/panel_2_1.png', type: 'image' as const,
    alt: 'Рюсэй перед зеркалом',
    dialogue: [
      { speakerId: 'ryusei', text: 'Глаз — чуть шире. Бровь — на волосок острей. Идеально. Эти скоты в зале не увидят и половины. Ну и пусть. Я знаю — значит, есть.' },
    ],
  },
  {
    src: '/comics/act_1/panels/panel_2_2.png', type: 'image' as const,
    alt: 'Кэнта роняет веер',
    dialogue: [
      { speakerId: 'kenta', text: 'Тьфу!.. Чтоб тебя… Целый? Целый, кажись. Чуть душу предкам не отдал со страху.' },
      { speakerId: 'goro', text: 'Нишкни, малой. Первый раз — он самый страшный. К вечеру сто раз уронишь — перестанешь замечать.' },
    ],
  },
  {
    src: '/comics/act_1/panels/panel_2_3.png', type: 'image' as const,
    alt: 'Кагэ на крыше',
    dialogue: [
      { speakerId: 'kage', text: '…' },
    ],
  },
]

const s1p3_panels = [
  {
    src: '/comics/act_1/panels/panel_2_4.png', type: 'image' as const,
    alt: 'Пауза — все замолкают',
    dialogue: [
      { speakerId: 'tadashi', text: 'Раньше… у нас была другая работа. Мечи, заказы, кровь. Тьма. Ладно. Не поминайте лихом. Вернёмся к делу.' },
      { speakerId: 'ryusei', text: '…' },
    ],
  },
]

export const page1 = applyLayout('8', 'act1_scene1_page1', s1p1_panels)
export const page2 = applyLayout('5', 'act1_scene1_page2', s1p2_panels)

export const page3: Page = {
  id: 'act1_scene1_page3',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',
  gridAreas: [{ panelId: 'p3_main', area: '1 / 1 / 2 / 2', order: 1 }],
  panels: [{ id: 'p3_main', ...s1p3_panels[0] }],
}

export const scene1Pages = [page1, page2,
  // Стр 4 — Кагэ на крыше
  applyLayout('8', 'act1_scene1_roof', [
    {
      src: '/comics/act_1/panels/s1_reroof_1.png', type: 'image' as const,
      alt: 'Кагэ на крыше с луком',
      focus: { x: 50, y: 30 },
      dialogue: [
        { speakerId: 'kage', text: '…' },
        { speakerId: 'tadashi', text: 'Фейерверки проверил? Вечером народ соберётся — всё должно быть чисто.' },
        { speakerId: 'kage', text: 'Готово.' },
      ],
    },
    {
      src: '/comics/act_1/panels/s1_reroof_2.png', type: 'image' as const,
      alt: 'Стрелы в колчане',
      dialogue: [
        { speakerId: 'tadashi', text: 'Смотришь вдаль. О чём думаешь?' },
      ],
    },
    {
      src: '/comics/act_1/panels/s1_reroof_3.png', type: 'image' as const,
      alt: 'Тадаси поднимается на крышу',
      dialogue: [
        { speakerId: 'kage', text: 'Думаю, скоро дождь.' },
      ],
    },
  ]),

  // Стр 4.5: панорама крыши — Тадаси и Кагэ молчат
  {
    id: 'act1_scene1_roof_sunset',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    gridAreas: [{ panelId: 'p_sunset', area: '1 / 1 / 2 / 2', order: 1 }],
    panels: [{
      id: 'p_sunset',
      src: '/comics/act_1/panels/s1_roof_sunset.png', type: 'image' as const,
      alt: 'Тадаси и Кагэ на закате',
      dialogue: [{ speakerId: 'narrator', text: 'Они не говорили о прошлом. Никогда. Но иногда слова не нужны — когда рядом тот, кто знает.' }],
    }],
  },

  page3,
]