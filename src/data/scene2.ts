import { applyLayout } from './layouts';

// Стр 1 — у ворот, Рэн и Юки одни
const s2p1_panels = [
  {
    src: '/comics/act_1/panels/panel_s2_1_1.png',
    type: 'image' as const,
    alt: 'Рэн и Юки у входа в театр',
    dialogue: [
      { speakerId: 'ren', text: 'Это здесь. Театр «Кагэ-дза». Входим — и обратного пути нет. Готова?' },
      { speakerId: 'yuki', text: 'Нет. Но мы всё равно войдём.' },
    ],
  },
  {
    src: '/comics/act_1/panels/panel_s2_1_2.png',
    type: 'image' as const,
    alt: 'Рука Рэна, сжимающая посох',
    dialogue: [
      { speakerId: 'ren', text: 'Держись рядом. И не смотри им в глаза лишний раз.' },
    ],
  },
  {
    src: '/comics/act_1/panels/panel_s2_1_3.png',
    type: 'image' as const,
    alt: 'Лицо Юки',
    dialogue: [
      { speakerId: 'yuki', text: 'А если они узнают нас? По голосу. По взгляду.' },
      { speakerId: 'ren', text: 'Пусть узнают. Мы пришли не прятаться.' },
    ],
  },
  {
    src: '/comics/act_1/panels/panel_s2_1_4.png',
    type: 'image' as const,
    alt: 'Театр снаружи, пустой',
    dialogue: [],
  },
];

// Стр 2 — разговор с Тадаси
const s2p2_panels = [
  {
    src: '/comics/act_1/panels/panel_s2_2_1.png',
    type: 'image' as const,
    alt: 'Тадаси в дверях',
    dialogue: [
      { speakerId: 'tadashi', text: 'Кто вы такие? Мы вас раньше не видели. Что вам нужно в нашем театре?' },
    ],
  },
  {
    src: '/comics/act_1/panels/panel_s2_2_2.png',
    type: 'image' as const,
    alt: 'Крупный план Рэна',
    dialogue: [
      { speakerId: 'ren', text: 'Меня зовут Рэн. Это моя сестра, Юки. Странствующие актёры. Слышали о вашей труппе — лучшая в Эдо, говорят. Я играю на сцене. Она играет на сямисэне. Возьмите нас — не пожалеете.' },
    ],
  },
  {
    src: '/comics/act_1/panels/panel_s2_2_3.png',
    type: 'image' as const,
    alt: 'Группа в воротах',
    dialogue: [
      { speakerId: 'ryusei', text: 'Молоды больно. В кабуки мальчишек не берут — закон. Сколько тебе?' },
      { speakerId: 'ren', text: 'Двадцать два, господин.' },
      { speakerId: 'ryusei', text: 'А сестра? Женщинам на сцену — нельзя. Сёгунат запретил ещё в двадцать девятом.' },
      { speakerId: 'yuki', text: 'Я не актриса, господин. Я музыкант. Сямисэн — моё дело.' },
    ],
  },
  {
    src: '/comics/act_1/panels/panel_s2_2_4.png',
    type: 'image' as const,
    alt: 'Реакция труппы',
    dialogue: [
      { speakerId: 'tadashi', text: 'Что скажете, народ? Я чужаков не жалую.' },
      { speakerId: 'goro', text: 'Девчонка на племяшку мою похожа. А парень… есть в нём стержень. Признаться, видел я их сегодня на рынке — не таились, не прятались. Дорогу до театра спрашивали. Я — за.' },
      { speakerId: 'ryusei', text: 'Горо за — редкий случай. Значит, либо парень и правда стоящий, либо Горо просто захотел компанию за ужином.' },
      { speakerId: 'tadashi', text: 'Остаётесь на ночь. Утром решим, чего вы стоите.' },
    ],
  },
];

export const scene2Page1 = applyLayout('1', 'act1_scene2_page1', s2p1_panels);
export const scene2Page2 = applyLayout('6', 'act1_scene2_page2', s2p2_panels);

export const scene2Pages = [scene2Page1,
  // Стр 1.5 — первые впечатления внутри театра
  applyLayout('9', 'act1_scene2_interior', [
    {
      src: '/comics/act_1/panels/s2_interior_1.png', type: 'image' as const,
      alt: 'Рэн изучает зал', focus: { x: 50, y: 40 },
      dialogue: [
        { speakerId: 'narrator', text: 'Рэн вошёл внутрь и замер. Взгляд скользнул по рядам кресел, по колоннам, по тёмным проёмам кулис. Он запоминал каждую деталь.' },
      ],
    },
    {
      src: '/comics/act_1/panels/s2_interior_2.png', type: 'image' as const,
      alt: 'Юки смотрит на сцену', focus: { x: 50, y: 40 },
      dialogue: [
        { speakerId: 'narrator', text: 'Юки подняла голову и впервые увидела театр изнутри. Свет со сцены упал на её лицо — и на мгновение она забыла, зачем пришла.' },
      ],
    },
    {
      src: '/comics/act_1/panels/s2_interior_3.png', type: 'image' as const,
      alt: 'Горо замечает их', focus: { x: 50, y: 40 },
      dialogue: [
        { speakerId: 'goro', text: 'Э, гляньте-ка! Новые лица!.. Погоди-ка… Где я тебя видел? На рынке, что ли? Ты дорогу спрашивал… Да нет, показалось. Добро пожаловать, путники! Давно у нас свежая кровь не появлялась.' },
      ],
    },
  ]),
scene2Page2];