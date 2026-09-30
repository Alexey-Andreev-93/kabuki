import { applyLayout } from './layouts'
import type { Page } from '../store/store'

// Финал Акта I — Якудза

const finale_p1 = applyLayout('1', 'act1_finale_p1', [
  {
    src: '/comics/act_1/panels/finale_1_1.png', type: 'image' as const,
    alt: 'Якудза у входа в театр',
    focus: { x: 50, y: 30 },
    dialogue: [{ speakerId: 'narrator', text: 'Вечер. Театр готовится к представлению. Но гости пришли не из зала.' }],
  },
  {
    src: '/comics/act_1/panels/finale_1_2.png', type: 'image' as const,
    alt: 'Тадаси выходит к ним',
    dialogue: [
      { speakerId: 'tadashi', text: 'Чем обязаны? Театр закрыт.' },
    ],
  },
  {
    src: '/comics/act_1/panels/finale_1_3.png', type: 'image' as const,
    alt: 'Главарь якудза',
    dialogue: [
      { speakerId: 'narrator', text: 'Главарь — грузный мужчина в дорогом кимоно. Улыбка не касается глаз.' },
    ],
  },
  {
    src: '/comics/act_1/panels/finale_1_4.png', type: 'image' as const,
    alt: 'Горо и Кэнта настороже',
    dialogue: [
      { speakerId: 'goro', text: 'Тадаси-сан, может, не стоит? Мы можем…' },
      { speakerId: 'tadashi', text: 'Нет. Стой здесь.' },
    ],
  },
])

const finale_p2 = applyLayout('8', 'act1_finale_p2', [
  {
    src: '/comics/act_1/panels/finale_2_1.png', type: 'image' as const,
    alt: 'Тадаси и главарь лицом к лицу',
    dialogue: [
      { speakerId: 'boss', text: 'Забыл, мальчик, кто в Эдо хозяин? Твой театр стоит, пока мы позволяем.' },
      { speakerId: 'tadashi', text: 'Мы платим исправно. Сборщик приходит раз в луну. Ты — нет.' },
    ],
  },
  {
    src: '/comics/act_1/panels/finale_2_2.png', type: 'image' as const,
    alt: 'Рюсэй появляется из тени',
    dialogue: [
      { speakerId: 'ryusei', text: 'Тадаси-сан, может, предложим гостям места в первом ряду? Бесплатно. В знак уважения.' },
    ],
  },
  {
    src: '/comics/act_1/panels/finale_2_3.png', type: 'image' as const,
    alt: 'Рэн и Юки наблюдают из тени',
    dialogue: [
      { speakerId: 'ren', text: 'Смотри. Они улыбаются. Те же лица. Те же жесты. Только мечи спрятаны.' },
      { speakerId: 'yuki', text: 'А если они и правда изменились?' },
      { speakerId: 'ren', text: '…' },
    ],
  },
])

const finale_p3: Page = {
  id: 'act1_finale_p3',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',
  gridAreas: [{ panelId: 'fin', area: '1 / 1 / 2 / 2', order: 0 }],
  panels: [
    {
      id: 'fin',
      src: '/comics/act_1/panels/finale_3.png', type: 'image' as const,
      alt: 'Рюсэй один с мечом',
      focus: { x: 50, y: 40 },
      dialogue: [
        { speakerId: 'narrator', text: 'Рюсэй остался один. Он вынул меч. Меч всё помнил.' },
      ],
    },
  ],
}

export const finaleChoice = {
  prompt: 'Акт I завершён. Что дальше?',
  choices: [
    { text: 'Продолжить — Акт II', flag: 'continue' },
  ],
}

export const finalePages = [finale_p1, finale_p2, finale_p3]