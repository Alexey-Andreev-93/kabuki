import { type Page } from '../store/store';
import { applyLayout } from './layouts';

// Пролог — 4 страницы
export const prologuePages: Page[] = [
  // Стр 1: Эдо + кабукимоно + труппа
  applyLayout('8', 'prologue_1', [
    {
      src: '/comics/act_1/panels/prologue_1.png',
      type: 'image' as const,
      alt: 'Эдо на закате',
      focus: { x: 50, y: 30 },
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Эдо. 1651 год. Сёгун Токугава Иэмицу умер — старый мир рухнул, новый ещё не родился. По улицам бродили ронины, потерявшие хозяев. Кто-то собирал армии для мятежа. А кто-то просто хотел забыть — и начинал сначала. В театре, в вине, в тишине. Каждый искал свой способ выжить.',
        },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_2.png',
      type: 'image' as const,
      alt: 'Кабукимоно',
      focus: { x: 50, y: 40 },
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'По улицам бродили кабукимоно — в пыльных дорожных накидках мино, с длинными мечами наперевес. Они пили, дрались и убивали за деньги.',
        },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_3.png',
      type: 'image' as const,
      alt: 'Труппа убийц',
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Лучшие из них называли себя «Кагэ-дза». У них не было сцены. Были только мечи.',
        },
      ],
    },
  ]),

  // Стр 1.5: ночной квартал — кабукимоно и театр рядом
  {
    id: 'prologue_kabuki_night',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr 1fr',
    gridAreas: [
      { panelId: 'p_night', area: '1 / 1 / 2 / 2', order: 1 },
      { panelId: 'p_dawn', area: '2 / 1 / 3 / 2', order: 2 },
    ],
    panels: [
      {
        id: 'p_night',
        src: '/comics/act_1/panels/prologue_kabuki_night.png',
        type: 'image' as const,
        alt: 'Ночной квартал Эдо — кабукимоно и театр',
        dialogue: [
          {
            speakerId: 'narrator',
            text: 'Театр в Эдо стоял на границе двух миров. Днём — сцена, свет, поклоны. Ночью — тени, слухи, сделки. Одни приходили смотреть представление. Другие — договариваться. Иногда это были одни и те же люди.',
          },
        ],
      },
      {
        id: 'p_dawn',
        src: '/comics/act_1/panels/prologue_kabuki_dawn.png',
        type: 'image' as const,
        alt: 'Рассвет над кварталом Эдо — пустая улица, дым из трубок',
        dialogue: [
          {
            speakerId: 'narrator',
            text: 'К утру улица пустела. Кабукимоно расходились по ночлежкам. Торговцы открывали ставни. И театр, который ночью был тенью, снова становился сценой.',
          },
        ],
      },
    ],
  },

  // Стр 3 (NEW): Кэнта ДО — голод, улица, воровство
  applyLayout('2', 'prologue_kenta_before', [
    {
      src: '/comics/act_1/panels/prologue_kenta_big.png',
      type: 'image' as const,
      alt: 'Кэнта один на улице',
      focus: { x: 50, y: 30 },
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Он знал улицу лучше, чем любой дом. Знал, у какого торговца отвернуться на секунду дольше, чем нужно. Знал, где спрятаться от дождя. Знал: если упасть — никто не поднимет. И всё равно вставал.',
        },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_kenta_r1.png',
      type: 'image' as const,
      alt: 'Рука тянется к мандарину',
      dialogue: [
        { speakerId: 'narrator', text: 'Он воровал — не со зла, а потому что иначе не выжить.' },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_kenta_r2.png',
      type: 'image' as const,
      alt: 'Рука торговца хватает Кэнту',
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Его ловили, били, прогоняли. Но он возвращался — снова и снова.',
        },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_kenta_r3.png',
      type: 'image' as const,
      alt: 'Кэнта под навесом',
      focus: { x: 50, y: 40 },
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Мир не давал ему ничего. И он брал сам. Пока однажды кто-то не протянул руку.',
        },
      ],
    },
  ]),

  // Стр 4: Кэнта — прошлое, как его нашли
  applyLayout('8', 'prologue_kenta', [
    {
      src: '/comics/act_1/panels/prologue_kenta_1.png',
      type: 'image' as const,
      alt: 'Кэнта-ребёнок на улице',
      focus: { x: 50, y: 40 },
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Кэнта не помнил родителей. Он рос на улицах Эдо — воровал, спал под мостами, дрался с собаками за объедки.',
        },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_kenta_2.png',
      type: 'image' as const,
      alt: 'Рука Тадаси',
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Тадаси протянул руку. И Кэнта впервые за долгое время поверил, что мир не состоит из жестокости.',
        },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_kenta_3.png',
      type: 'image' as const,
      alt: 'Кэнта смотрит на Тадаси',
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Тадаси нашёл его в дождливую ночь. Мальчишка сидел под навесом и сжимал в руке украденный мандарин. Не ел. Просто сжимал — как будто это было единственное, что принадлежало ему.',
        },
      ],
    },
  ]),

  // Стр 5 (NEW): Заказ — решение труппы
  applyLayout('3', 'prologue_order', [
    {
      src: '/comics/act_1/panels/prologue_order_tl.png',
      type: 'image' as const,
      alt: 'Труппа в тёмной комнате',
      focus: { x: 50, y: 30 },
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Тадаси знал: если они возьмут ещё один заказ — Кэнта вырастет в тени трупов. Но если не возьмут — у них не будет будущего.',
        },
        { speakerId: 'tadashi', text: 'За воротами Эдо ронины собирают армию. Мятеж. Нас могли бы призвать — но я выбрал другое. Театр. Для этого мальчика. Чтобы он вырос не в тени трупов.' },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_order_bl.png',
      type: 'image' as const,
      alt: 'Тадаси смотрит на спящего Кэнту',
      dialogue: [
        {
          speakerId: 'tadashi',
          text: 'Хватит. Этот мальчик не пойдёт по нашей дороге. В этот раз — правда.',
        },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_order_tr.png',
      type: 'image' as const,
      alt: 'Горо, Рюсэй, Кагэ',
      dialogue: [
        { speakerId: 'goro', text: 'Если это последний — я в деле.' },
        { speakerId: 'ryusei', text: 'Мы уже сто раз говорили «последний»…' },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_order_br.png',
      type: 'image' as const,
      alt: 'Тадаси сжигает записку',
      dialogue: [
        {
          speakerId: 'tadashi',
          text: 'В этот раз — правда последний. Потому что после него мы уходим. Навсегда.',
        },
        {
          speakerId: 'narrator',
          text: 'Они не знали, что прошлое не отпускает. Оно просто ждёт за кулисами.',
        },
      ],
    },
  ]),

  // Стр 5.5 (NEW): Восстание Кэян — ронины за воротами Эдо
  {
    id: 'prologue_keian',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    gridAreas: [{ panelId: 'p_keian', area: '1 / 1 / 2 / 2', order: 1 }],
    panels: [{
      id: 'p_keian',
      src: '/comics/act_1/panels/prologue_keian.png', type: 'image' as const,
      alt: 'Лагерь ронинов за воротами Эдо, костры, луна',
      dialogue: [
        { speakerId: 'narrator', text: 'Пока труппа решала свою судьбу, за воротами Эдо зрела гроза. Ронины стекались со всех провинций. Они хотели вернуть старый мир — ценой крови. Восстание Кэян началось… и захлебнулось в той же крови.' },
      ],
    }],
  },

  // Стр 6: горящий дом + мечи + становление
  applyLayout('8', 'prologue_2', [
    {
      src: '/comics/act_1/panels/prologue_4.png',
      type: 'image' as const,
      alt: 'Горящий дом',
      focus: { x: 50, y: 40 },
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Последний заказ. Дом торговца оружием. Тадаси не обернулся, когда пламя взметнулось к небу. Он смотрел только вперёд.',
        },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_5.png',
      type: 'image' as const,
      alt: 'Труппа на привале',
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Денег с этого заказа хватило, чтобы купить театр. Похоронить мечи. Начать сначала.',
        },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_6.png',
      type: 'image' as const,
      alt: 'Труппа актёрами',
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Так родился театр. Не из любви к искусству — из попытки дать Кэнте жизнь, которой у них самих никогда не было.',
        },
      ],
    },
  ]),

  // Стр 7a (NEW): Театр — первые дни (общий план + работа)
  applyLayout('1', 'prologue_theater_1', [
    {
      src: '/comics/act_1/panels/prologue_theater_top.png',
      type: 'image' as const,
      alt: 'Заброшенный театр',
      focus: { x: 50, y: 30 },
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Театр был старым, пыльным, почти разрушенным. Крыша текла. Циновки сгнили. Но они не искали красивое — они искали своё.',
        },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_theater_c1.png',
      type: 'image' as const,
      alt: 'Горо и Рюсэй чинят',
      dialogue: [
        { speakerId: 'goro', text: 'Ты когда-нибудь строил театр?' },
        { speakerId: 'ryusei', text: 'Я когда-нибудь строил вообще что-то?' },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_theater_c2.png',
      type: 'image' as const,
      alt: 'Тадаси на сцене',
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Тадаси стоял на сцене и смотрел вверх — на свет, пробивающийся сквозь дырявую крышу. В этом свете было обещание.',
        },
      ],
    },
    {
      src: '/comics/act_1/panels/prologue_theater_c3.png',
      type: 'image' as const,
      alt: 'Кэнта на краю сцены',
      dialogue: [
        {
          speakerId: 'narrator',
          text: 'Кэнта сидел на краю сцены и улыбался. Впервые за долгое время — по-настоящему.',
        },
      ],
    },
  ]),

  // Стр 7b (NEW): Театр — финальный кадр, полные сборы
  {
    id: 'prologue_theater_2',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    gridAreas: [{ panelId: 'p1', area: '1 / 1 / 2 / 2', order: 1 }],
    panels: [
      {
        id: 'p1',
        src: '/comics/act_1/panels/prologue_theater_bot.png',
        type: 'image' as const,
        alt: 'Труппа в работе',
        dialogue: [
          {
            speakerId: 'narrator',
            text: 'Горо сбил подмостки. Рюсэй вырезал маски. Кагэ чинил светильники. Тадаси писал пьесу — коряво, по слогам, но писал. Кэнта подметал сцену. Никто из них не умел этого раньше. Но они делали. День за днём.',
          },
        ],
      },
    ],
  },

  // Стр 4: финальный акцент — fullscreen
  {
    id: 'prologue_3',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    gridAreas: [{ panelId: 'p1', area: '1 / 1 / 2 / 2', order: 1 }],
    panels: [
      {
        id: 'p1',
        src: '/comics/act_1/panels/prologue_7.png',
        type: 'image' as const,
        alt: 'Театр на рассвете',
        dialogue: [
          {
            speakerId: 'narrator',
            text: 'Театр открылся через месяц. Первый спектакль собрал полный зал. Никто из зрителей не знал, кто сидит перед ними на сцене. Никто не знал, что было до. Пока — не знал.',
          },
        ],
      },
    ],
  },
];
