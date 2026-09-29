import { type Page } from '../store/store'
import { applyLayout } from './layouts'

// Стр 1 — «Чай на веранде» — шаблон 8 (герой+два: 4:3 + 1:1 + 1:1)
const s0p1_panels = [
  {
    src: '/comics/act_1/panels/s0_1_1.png', type: 'image' as const,
    alt: 'Широкий план веранды — Кагэ сидит, Кэнта поднимается с чаем, луна на горизонте',
    dialogue: [
      { speakerId: 'kenta', text: 'Господин Кагэ… вы не спите? Я чай заварил. Торговец вчера сказал — премьера, мол, у вас, берите за полцены. А я и рад…' },
    ],
  },
  {
    src: '/comics/act_1/panels/s0_1_2.png', type: 'image' as const,
    alt: 'Кэнта протягивает чашку Кагэ',
    dialogue: [
      { speakerId: 'kage', text: '…' },
      { speakerId: 'kenta', text: 'Горячий ещё. Обожжётесь…' },
    ],
  },
  {
    src: '/comics/act_1/panels/s0_1_3.png', type: 'image' as const,
    alt: 'Кагэ пьёт чай, в отражении луна',
    dialogue: [
      { speakerId: 'narrator', text: 'Кагэ взял чашку. Не сказал ни слова. Но Кэнта почему-то понял — его здесь ждали.' },
    ],
  },
]

// Стр 2 — «Разговор» — шаблон 8 (герой+два: 4:3 + 1:1 + 1:1)
const s0p2_panels = [
  {
    src: '/comics/act_1/panels/s0_2_1.png', type: 'image' as const,
    alt: 'Кэнта нервно теребит рукав, чашка в руках',
    dialogue: [
      { speakerId: 'kenta', text: 'Господин Кагэ… а вы не боитесь? Ну… премьера. Вдруг я забуду слова? Или веер уроню? Я вчера всю ночь не спал — всё прокручивал… А вы?' },
    ],
  },
  {
    src: '/comics/act_1/panels/s0_2_2.png', type: 'image' as const,
    alt: 'Кагэ поворачивается к Кэнте',
    dialogue: [
      { speakerId: 'kage', text: 'Я не сплю. Я слушаю тишину.' },
      { speakerId: 'kenta', text: 'Тишину?' },
    ],
  },
  {
    src: '/comics/act_1/panels/s0_2_3.png', type: 'image' as const,
    alt: 'Лицо Кагэ в профиль, полумрак',
    dialogue: [
      { speakerId: 'kage', text: 'Тишина — тоже звук. Её надо уметь слышать. Тогда и бояться некогда.' },
      { speakerId: 'kenta', text: 'Я… кажется, понял. Немного…' },
    ],
  },
]

// Стр 3 — «Рассвет» — fullscreen
const s0p3_page: Page = {
  id: 'act1_scene0_page3',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',
  gridAreas: [{ panelId: 'p_dawn', area: '1 / 1 / 2 / 2', order: 1 }],
  panels: [{
    id: 'p_dawn',
    src: '/comics/act_1/panels/s0_3_1.png', type: 'image' as const,
    alt: 'Рассвет, двое на веранде, длинные тени, луна тает',
    dialogue: [
      { speakerId: 'kage', text: 'Пей чай. Остынет.' },
      { speakerId: 'narrator', text: 'Они не говорили о прошлом. Они говорили о чае и тишине. Но Кэнта запомнил это утро на всю жизнь. Первое утро, когда он почувствовал: он — часть чего-то настоящего.' },
    ],
  }],
}

export const scene0Pages = [
  applyLayout('8', 'act1_scene0_page1', s0p1_panels),
  applyLayout('8', 'act1_scene0_page2', s0p2_panels),
  s0p3_page,
]