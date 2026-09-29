import { applyLayout } from './layouts'
import type { Page } from '../store/store'
import { useStore } from '../store/store'

// Сцена 4 — Ночной разговор (3 панели + 3 силуэта по флагу)
export function getScene4Pages(): Page[] {
  const flags = useStore.getState().flags

  // Выбор силуэта: у кого +1 — тот и вышел в сад
  let silhouetteSrc = '/comics/act_1/panels/s4_1_3_ren.png'
  let silhouetteDialogue = [
    { speakerId: 'ren', text: 'Не спится? В театре всегда шумно. А в саду — тихо.' },
  ]
  if (flags.yuki_bond) {
    silhouetteSrc = '/comics/act_1/panels/s4_1_3.png'
    silhouetteDialogue = [
      { speakerId: 'ryusei', text: 'Струны… Тонкая работа. Чуть нажмёшь сильнее — рвётся. Чуть слабее — молчит. Как люди.' },
    ]
  } else if (flags.ren_past) {
    silhouetteSrc = '/comics/act_1/panels/s4_1_3_ren.png'
    silhouetteDialogue = [
      { speakerId: 'ren', text: 'Не спится? В театре всегда шумно. А в саду — тихо.' },
    ]
  } else if (flags.ignore) {
    silhouetteSrc = '/comics/act_1/panels/s4_1_3_tadashi.png'
    silhouetteDialogue = [
      { speakerId: 'tadashi', text: 'Ты играешь, а я слушаю. Давно я ничего не слушал. Только приказывал.' },
    ]
  }

  return [
    // Стр 1: сад ночью
    applyLayout('8', 'act1_scene4_garden', [
      {
        src: '/comics/act_1/panels/s4_garden.png', type: 'image' as const,
        alt: 'Сад театра ночью', focus: { x: 50, y: 30 },
        dialogue: [
          { speakerId: 'narrator', text: 'Ночь. Сад за театром. Луна полная. Кто-то не спит — бродит между деревьями. А в беседке — тихий звук сямисэна.' },
        ],
      },
      {
        src: '/comics/act_1/panels/s4_1_1.png', type: 'image' as const,
        alt: 'Юки в саду',
        dialogue: [
          { speakerId: 'yuki', text: '…' },
        ],
      },
      {
        src: '/comics/act_1/panels/s4_1_2.png', type: 'image' as const,
        alt: 'Руки на струнах',
        dialogue: [
          { speakerId: 'narrator', text: 'Она играла не для кого-то. Просто пальцы сами находили струны.' },
        ],
      },
    ]),

    // Стр 2: разговор
    applyLayout('6', 'act1_scene4_talk', [
      {
        src: silhouetteSrc, type: 'image' as const,
        alt: 'Силуэт в саду',
        dialogue: silhouetteDialogue,
      },
      {
        src: '/comics/act_1/panels/s4_2_1.png', type: 'image' as const,
        alt: 'Юки смотрит на луну',
        dialogue: [
          { speakerId: 'yuki', text: 'Я часто не сплю. Сон — это роскошь. В тишине можно услышать то, что днём скрыто.' },
        ],
      },
      {
        src: '/comics/act_1/panels/s4_2_2.png', type: 'image' as const,
        alt: 'Флешбэк — горящий дом',
        dialogue: [
          { speakerId: 'narrator', text: 'Флешбэк. Чёрно-белая гравюра. Горящий дом. Детский силуэт. Крики.' },
        ],
      },
      {
        src: '/comics/act_1/panels/s4_2_3.png', type: 'image' as const,
        alt: 'Юки касается ветки',
        dialogue: [
          { speakerId: 'yuki', text: 'Я слышу, как горит дерево. И как люди кричат. Но это, наверное, просто ветер.' },
        ],
      },
    ]),

    // Стр 3: финал
    {
      id: 'act1_scene4_end',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr',
      gridAreas: [{ panelId: 'p_silencio', area: '1 / 1 / 2 / 2', order: 1 }],
      panels: [{
        id: 'p_silencio',
        src: '/comics/act_1/panels/s4_2_4.png', type: 'image' as const,
        alt: 'Сямисэн молчит',
        dialogue: [
          { speakerId: 'narrator', text: 'Сямисэн замолчал. Сад снова погрузился в тишину. Но тишина эта была другой — не пустой, а полная невысказанных слов.' },
        ],
      }],
    },
  ]
}