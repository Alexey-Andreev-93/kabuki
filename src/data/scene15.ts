import { type Page } from '../store/store'
import { applyLayout } from './layouts'

// Стр 1 — «На рынке» — шаблон 8 (герой+два: 4:3 + 1:1 + 1:1)
const s15p1_panels = [
  {
    src: '/comics/act_1/panels/s15_1_1.png', type: 'image' as const,
    alt: 'Рынок Эдо, полдень — Горо с рисом, Рюсэй брезгливо обходит лужи',
    dialogue: [
      { speakerId: 'goro', text: 'Рис подешевел. Торговец сказал — урожай добрый. Хорошая примета перед премьерой, а?' },
      { speakerId: 'ryusei', text: 'Примета — когда зритель платит. А рис… рис и есть рис.' },
    ],
  },
  {
    src: '/comics/act_1/panels/s15_1_2.png', type: 'image' as const,
    alt: 'Рюсэй остановился, смотрит вдаль сквозь толпу',
    dialogue: [
      { speakerId: 'ryusei', text: 'Смотри. Вон там.' },
      { speakerId: 'goro', text: 'Где? А, эти. Какие-то двое молодых. Я их раньше не встречал — не наши.' },
    ],
  },
  {
    src: '/comics/act_1/panels/s15_1_3.png', type: 'image' as const,
    alt: 'Крупный план лица Рюсэя — прищур, тень подозрения',
    dialogue: [
      { speakerId: 'ryusei', text: 'Ищут. Точно ищут. Вопрос — что.' },
    ],
  },
]

// Стр 2 — «Чужаки» — шаблон 8 (герой+два: 4:3 + 1:1 + 1:1)
const s15p2_panels = [
  {
    src: '/comics/act_1/panels/s15_2_1.png', type: 'image' as const,
    alt: 'Рэн и Юки сквозь толпу, сямисэн за спиной',
    dialogue: [
      { speakerId: 'goro', text: 'Может, зрители? Слух про наш театр уже по всему Эдо гуляет.' },
      { speakerId: 'ryusei', text: 'Зрители смотрят на афиши. Эти смотрят на вывеску. Разница есть.' },
    ],
  },
  {
    src: '/comics/act_1/panels/s15_2_2.png', type: 'image' as const,
    alt: 'Рюсэй смотрит на свои руки, задумался',
    dialogue: [
      { speakerId: 'ryusei', text: '…' },
      { speakerId: 'goro', text: 'Да брось. Двое молодых. Мальчишка и девчонка. Чем они нам страшны?' },
    ],
  },
  {
    src: '/comics/act_1/panels/s15_2_3.png', type: 'image' as const,
    alt: 'Горо хохочет, хлопает Рюсэя по плечу',
    dialogue: [
      { speakerId: 'goro', text: 'У тебя паранойя, мастер Рюсэй. После обеда пройдёт. Пошли — мисо купим, Тадаси велел к ужину вернуться.' },
      { speakerId: 'ryusei', text: 'Иди. Я догоню.' },
    ],
  },
]

// Стр 3 — «Проводы взглядом» — fullscreen
const s15p3_page: Page = {
  id: 'act1_scene15_page3',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',
  gridAreas: [{ panelId: 'p_after', area: '1 / 1 / 2 / 2', order: 1 }],
  panels: [{
    id: 'p_after',
    src: '/comics/act_1/panels/s15_3_1.png', type: 'image' as const,
    alt: 'Рюсэй стоит один на рынке, смотрит вслед ушедшим Рэну и Юки',
    dialogue: [
      { speakerId: 'narrator', text: 'Рюсэй стоял и смотрел им вслед. Он не знал кто они. Не знал зачем пришли. Но внутри что-то дрогнуло — как струна, которую не трогали много лет. И этот звон ему не понравился.' },
      { speakerId: 'ryusei', text: '…надо сказать Тадаси.' },
    ],
  }],
}

export const scene15Pages = [
  applyLayout('8', 'act1_scene15_page1', s15p1_panels),
  applyLayout('8', 'act1_scene15_page2', s15p2_panels),
  s15p3_page,
]