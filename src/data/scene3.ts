import { type Page } from '../store/store';
import { applyLayout } from './layouts';

// ─── Вариант A: trust_ren (приняли тепло) ───

const s3a_p1 = applyLayout('8', 'act1_scene3a_p1', [
  {
    src: '/comics/act_1/panels/s3_a_1_1.png',
    type: 'image' as const,
    alt: 'Тадаси представляет Рэна и Юки',
    dialogue: [
      {
        speakerId: 'tadashi',
        text: 'Это Рэн и Юки. Они с нами отныне. Прошу — примите как своих.',
      },
    ],
  },
  {
    src: '/comics/act_1/panels/s3_a_1_2.png',
    type: 'image' as const,
    alt: 'Рюсэй проходит мимо Юки',
    dialogue: [
      {
        speakerId: 'ryusei',
        text: 'Новые маски. Что ж… посмотрим, не треснут ли при первом свете.',
      },
    ],
  },
  {
    src: '/comics/act_1/panels/s3_a_1_3.png',
    type: 'image' as const,
    alt: 'Горо и Кэнта наблюдают',
    dialogue: [{ speakerId: 'goro', text: 'Добрые лица. Место им тут будет.' }],
  },
]);

const s3a_p2 = applyLayout('8', 'act1_scene3a_p2', [
  {
    src: '/comics/act_1/panels/s3_a_2_1.png',
    type: 'image' as const,
    alt: 'Рэн на сцене, монолог мстителя',
    dialogue: [
      {
        speakerId: 'ren',
        text: 'Они думали, что я забуду. Что время сотрёт лица… Но кровь не стирается. Она только темнеет.',
      },
    ],
  },
  {
    src: '/comics/act_1/panels/s3_a_2_2.png',
    type: 'image' as const,
    alt: 'Труппа замерла в напряжении',
    dialogue: [{ speakerId: 'tadashi', text: 'Рэн… это… это просто пьеса. Где ты это взял?' }],
  },
  {
    src: '/comics/act_1/panels/s3_a_2_3.png',
    type: 'image' as const,
    alt: 'Тадаси подходит к Рэну',
    dialogue: [
      {
        speakerId: 'ren',
        text: 'Я импровизировал, господин. Разве не так играют настоящие актёры?',
      },
    ],
  },
]);

// Концовка A — fullscreen
const s3a_end: Page = {
  id: 'act1_scene3a_end',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',
  gridAreas: [{ panelId: 'p_end', area: '1 / 1 / 2 / 2', order: 1 }],
  panels: [
    {
      id: 'p_end',
      src: '/comics/act_1/panels/s3_a_end.png',
      type: 'image' as const,
      alt: 'Тадаси объявляет: «Все свободны»',
      dialogue: [
        { speakerId: 'tadashi', text: 'На сегодня хватит. Все свободны. Репетиция завтра поутру.' },
        {
          speakerId: 'narrator',
          text: 'Репетиция кончилась. Но напряжение не ушло — оно осело в воздухе тонкой пылью.',
        },
      ],
    },
  ],
};

// ─── Вариант B: test_ren (испытание) ───

const s3b_fight = applyLayout('8', 'act1_scene3b_fight', [
  {
    src: '/comics/act_1/panels/s3_b_fight_1.png',
    type: 'image' as const,
    alt: 'Рэн и Рюсэй скрестили мечи',
    dialogue: [
      {
        speakerId: 'tadashi',
        text: 'Хватит болтать. Рюсэй, проверь его. Посмотрим, что за актёр без маски.',
      },
    ],
  },
  {
    src: '/comics/act_1/panels/s3_b_fight_2.png',
    type: 'image' as const,
    alt: 'Глаза Рюсэя',
    dialogue: [
      { speakerId: 'ryusei', text: 'Держи клинок правильно. Или ты только словами боец?' },
    ],
  },
  {
    src: '/comics/act_1/panels/s3_b_fight_3.png',
    type: 'image' as const,
    alt: 'Тадаси наблюдает',
    dialogue: [
      {
        speakerId: 'narrator',
        text: 'Мечи скрестились. В зале стало тихо. Рэн держался — но в глазах Рюсэя мелькнуло что-то, похожее на узнавание.',
      },
    ],
  },
]);

const s3b_p1 = applyLayout('8', 'act1_scene3b_p1', [
  {
    src: '/comics/act_1/panels/s3_b_1_1.png',
    type: 'image' as const,
    alt: 'Рэн запыхавшийся после испытания',
    dialogue: [
      {
        speakerId: 'tadashi',
        text: 'Ты справился. Честно — не ожидал. Но это только начало. Настоящая работа впереди.',
      },
    ],
  },
  {
    src: '/comics/act_1/panels/s3_b_1_2.png',
    type: 'image' as const,
    alt: 'Рюсэй точит ногти',
    dialogue: [
      {
        speakerId: 'ryusei',
        text: 'Справился? Первый бой выиграть легко. Трудно — уцелеть после десятого.',
      },
    ],
  },
  {
    src: '/comics/act_1/panels/s3_b_1_3.png',
    type: 'image' as const,
    alt: 'Тадаси говорит',
    dialogue: [{ speakerId: 'tadashi', text: 'Ладно. Покажись труппе. Сегодня работаем вместе.' }],
  },
]);

const s3b_p2 = applyLayout('9', 'act1_scene3b_p2', [
  {
    src: '/comics/act_1/panels/s3_b_2_1.png',
    type: 'image' as const,
    alt: 'Рэн в монологе',
    dialogue: [
      {
        speakerId: 'ren',
        text: 'Вы думали, монстры — это те, кто убивает. Нет. Монстры — те, кто улыбается, убивая. Вы знаете таких?',
      },
    ],
  },
  {
    src: '/comics/act_1/panels/s3_b_2_2.png',
    type: 'image' as const,
    alt: 'Труппа в тишине',
    dialogue: [{ speakerId: 'tadashi', text: 'Рэн. Довольно. Это роль, не исповедь.' }],
  },
  {
    src: '/comics/act_1/panels/s3_b_2_3.png',
    type: 'image' as const,
    alt: 'Тадаси и Рэн',
    dialogue: [{ speakerId: 'ren', text: 'Конечно, господин. Я просто… вжился в образ.' }],
  },
]);

// Концовка B — fullscreen
const s3b_end: Page = {
  id: 'act1_scene3b_end',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',
  gridAreas: [{ panelId: 'p_end', area: '1 / 1 / 2 / 2', order: 1 }],
  panels: [
    {
      id: 'p_end',
      src: '/comics/act_1/panels/s3_b_end.png',
      type: 'image' as const,
      alt: 'Тадаси говорит: «Неплохо для первого раза»',
      dialogue: [
        { speakerId: 'tadashi', text: 'Неплохо для первого раза. Завтра продолжим. Свободны.' },
      ],
    },
  ],
};

// ─── Вариант C: reject_ren (отказали) ───

const s3c_p1 = applyLayout('8', 'act1_scene3c_p1', [
  {
    src: '/comics/act_1/panels/s3_c_1_1.png',
    type: 'image' as const,
    alt: 'Рэн и Юки у входа',
    dialogue: [
      {
        speakerId: 'ren',
        text: 'Вы нам отказали. Мы знаем. Но мы не уйдём. Будем смотреть, учиться, мешать не станем.',
      },
    ],
  },
  {
    src: '/comics/act_1/panels/s3_c_1_2.png',
    type: 'image' as const,
    alt: 'Горо отводит глаза',
    dialogue: [],
  },
  {
    src: '/comics/act_1/panels/s3_c_1_3.png',
    type: 'image' as const,
    alt: 'Рюсэй усмехается',
    dialogue: [
      {
        speakerId: 'ryusei',
        text: 'Настырные щенки. Это мне нравится больше, чем вежливые лицемеры.',
      },
    ],
  },
]);

const s3c_p2 = applyLayout('8', 'act1_scene3c_p2', [
  {
    src: '/comics/act_1/panels/s3_c_2_1.png',
    type: 'image' as const,
    alt: 'Рэн шепчет монолог в углу',
    dialogue: [
      {
        speakerId: 'ren',
        text: 'Они думают, что я пришёл смотреть. Нет. Я пришёл запомнить. Каждое лицо. Каждое движение.',
      },
    ],
  },
  {
    src: '/comics/act_1/panels/s3_c_2_2.png',
    type: 'image' as const,
    alt: 'Юки касается руки Рэна',
    dialogue: [],
  },
  {
    src: '/comics/act_1/panels/s3_c_2_3.png',
    type: 'image' as const,
    alt: 'Тадаси проходит мимо',
    dialogue: [{ speakerId: 'tadashi', text: 'Молчите. Смотрите. Учитесь. На сцену не лезьте.' }],
  },
]);

// Концовка C — fullscreen
const s3c_end: Page = {
  id: 'act1_scene3c_end',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',
  gridAreas: [{ panelId: 'p_end', area: '1 / 1 / 2 / 2', order: 1 }],
  panels: [
    {
      id: 'p_end',
      src: '/comics/act_1/panels/s3_c_end.png',
      type: 'image' as const,
      alt: 'Тадаси уходит; Рэн и Юки остаются в зале',
      dialogue: [
        { speakerId: 'tadashi', text: 'Оставайтесь. Но на сцену — ни шагу. Смотрите и учитесь.' },
      ],
    },
  ],
};

// ─── Ужин (общая страница для всех вариантов) ───
const dinnerPage: Page = {
  id: 'act1_scene3_dinner',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',
  gridAreas: [{ panelId: 'p_dinner', area: '1 / 1 / 2 / 2', order: 1 }],
  panels: [
    {
      id: 'p_dinner',
      src: '/comics/act_1/panels/s3_dinner.png',
      type: 'image' as const,
      alt: 'Ужин всей труппой, Кагэ в углу',
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Ужин прошёл в молчании. Но молчание это было тяжёлым — каждый думал о своём. И каждый чувствовал: что-то изменилось.',
        },
      ],
    },
  ],
};

// ─── Экспорт ───

export interface Scene3Variant {
  id: string;
  pages: ReturnType<typeof applyLayout>[];
  choiceAfter: {
    prompt: string;
    choices: { text: string; flag: string }[];
  };
}

export const scene3Variants: Record<string, Scene3Variant> = {
  trust: {
    id: 'scene3_trust',
    pages: [s3a_p1, s3a_p2, s3a_end, dinnerPage],
    choiceAfter: {
      prompt: 'Что ты думаешь?',
      choices: [
        { text: 'Спросить Рэна о прошлом', flag: 'ren_past' },
        { text: 'Сделать вид, что всё нормально', flag: 'ignore' },
        { text: 'Поговорить с Юки', flag: 'yuki_bond' },
      ],
    },
  },
  test: {
    id: 'scene3_test',
    pages: [s3b_fight, s3b_p1, s3b_p2, s3b_end, dinnerPage],
    choiceAfter: {
      prompt: 'Что ты думаешь?',
      choices: [
        { text: 'Спросить Рэна о прошлом', flag: 'ren_past' },
        { text: 'Сделать вид, что всё нормально', flag: 'ignore' },
        { text: 'Поговорить с Юки', flag: 'yuki_bond' },
      ],
    },
  },
  reject: {
    id: 'scene3_reject',
    pages: [s3c_p1, s3c_p2, s3c_end, dinnerPage],
    choiceAfter: {
      prompt: 'Что ты думаешь?',
      choices: [
        { text: 'Спросить Рэна о прошлом', flag: 'ren_past' },
        { text: 'Сделать вид, что всё нормально', flag: 'ignore' },
        { text: 'Поговорить с Юки', flag: 'yuki_bond' },
      ],
    },
  },
};
