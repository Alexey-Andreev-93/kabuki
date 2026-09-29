# AGENTS.md — Правила работы с проектом «Театр Теней»

> Этот файл — инструкция для ИИ-агента. Начинай каждую сессию с его прочтения.

## 1. Проект

Интерактивный манга-комикс (React + Vite + TypeScript + Zustand).
**Жанр:** психологическая драма, триллер, Эдо 1651 год.
**Стиль:** ч/б + красный акцент. Сцены НА СЦЕНЕ ТЕАТРА — полноцветные.

**Рабочая директория:** `~/dev/kabuki/`

## 2. Стилистика изображений

### Общие правила
- Чёрно-белый рисунок тушью (lineart), хэтчинг, грубая штриховка
- Красный — **только акцентный** (камелия, повязка, шарф, подклад рукава)
- Сцены на театральной сцене (выступления, репетиции) — **ПОЛНОЦВЕТНЫЕ**
- Всё остальное (улицы, закулисье, флешбэки, интерьеры) — **ч/б с красным**

### Промпты
- **Длина:** от 1500 символов
- **Обязательные разделы:**
  - Тип иллюстрации (манга/полноцвет)
  - Описание композиции: ракурс, что на переднем/заднем плане
  - Детали: одежда, позы, выражения лиц, текстуры
  - Освещение: откуда свет, тени
  - Цвет: красные акценты (для ч/б) или палитра (для цвета)
  - `--ar {соотношение}` (обязательно в конце)
- **📎 I2I референсы:** всегда указывать какие референсы использовать (имена персонажей, номера локаций)
- **Запрещено:** короткие промпты (<1000 символов), абстрактные описания

### Aspect ratios (под шаблоны)
| AR | Для шаблона | Пример |
|----|------------|--------|
| 16:9 | 1, 7, fullscreen | Панорамы, широкие кадры |
| 4:3 | 2, 8 (hero) | Средние планы, герой |
| 1:1 | 4, 8 (sm) | Крупные планы, детали |
| 9:16 | 5, 9 | Портреты, вертикальные |
| 3:2 / 2:1 | 6 | Левые/правые панели |

## 3. Архитектура

```
src/
├── components/
│   ├── MangaViewer.tsx        # Основной плеер (панели, диалоги, анимация slide-in)
│   ├── ChoiceOverlay.tsx      # Экран выбора (3 варианта)
│   ├── TitleCard.tsx          # Титульная страница акта
│   ├── AudioProvider.tsx      # BGM-провайдер (контекст)
│   └── SceneAudioPlayer.tsx   # Авто-переключение BGM по сцене
├── data/
│   ├── layouts.ts             # Шаблоны раскладок (1–9)
│   ├── prologue.ts            # Пролог: 3 стр, линейный
│   ├── scene1.ts              # Сц 1: 3 стр, линейный
│   ├── scene2.ts              # Сц 2: 2 стр + выбор (trust/test/reject)
│   └── scene3.ts              # Сц 3: 3 варианта × 2 стр + видео
├── store/store.ts             # Zustand: флаги, currentPanelOrder, dialogueIndex
├── App.tsx                    # Роутинг сцен, выборы, AudioProvider
└── index.css                  # Все стили
```

### Навигация
```
Титульник → клик → Акт I титульник → Пролог (9 стр)
→ Сц 1 (5 стр) → Сц 2 (3 стр) → [выбор: trust/test/reject]
→ титульник → Сц 3 (вариант A/B/C, по 4-5 стр + ужин)
→ [выбор: ren_past / ignore / yuki_bond]
→ титульник → Мостик (3 варианта, по 1 стр)
→ Сц 4 (3 стр, 3 варианта силуэта по флагу)
→ Финал (3 стр) → END
```

Сцена 3 загружается через state machine (engine/routes.ts).

## 4. Как добавить новую сцену

1. Создать `src/data/sceneN.ts`
2. Панели через `applyLayout('тип', 'id_cтраницы', [...panels])`
3. Для видео-панелей: `type: 'video'`, путь `.mp4`
4. Если сцена с выбором — добавить `choiceAfter` и экспортировать
5. В `App.tsx`: добавить в `scenes[]` или настроить роутинг в `handleChoice`
6. BGM: добавить в `bgmMap` в `SceneAudioPlayer.tsx`
7. Обновить `STORY.md`

### Панель (формат данных)
```typescript
{
  src: '/comics/act_1/panels/s3_a_2_1.mp4',
  type: 'image' | 'video',
  alt: 'Описание',
  focus: { x: 50, y: 50 },   // object-position
  dialogue: [
    { speakerId: 'tadashi', text: 'Диалог' },
  ],
}
```

### Speaker ID (для диалогов)
- `tadashi` — ТАДАСИ, командирский, рубленый
- `ryusei` — РЮСЭЙ, театральный, ядовитый
- `goro` — ГОРО, простой, тёплый
- `kenta` — КЭНТА, нервный, почтительный
- `kage` — КАГЭ, молчаливый
- `ren` — РЭН, вежливый с холодком
- `yuki` — ЮКИ, тихая, чувствительная
- `narrator` — нарратор (без имени, плашка по центру внизу)

## 5. Диалоги

- Естественный русский язык с колоритом эпохи Эдо (1651)
- Без современных выражений
- **Без «игрок»** — нет протагониста, 7 равных персонажей
- С обращениями «господин», «мастер»
- Каждый персонаж — свой голос (см. Speaker ID)
- Речь в пузырях внутри панелей (кроме narrator — плашка внизу)

## 6. Анимация

- **Slide-in:** новые панели выезжают снизу (translateY(30px) → 0) с opacity
- **Fade переходы** между страницами (300ms)
- **Видео:** 5с, проигрывается 1 раз (не loop), `preload="auto"`
- **Задний фон** манга-страниц: `#2a2a2a` (тёмно-серый)

## 7. Аудио

- BGM переключается автоматически по `sceneId`
- Карта: `title`, `scene1`, `scene2`, `scene3`, `scene4`
- Файлы в `public/audio/`
- Формат: MP3, loop, громкость 0.3
- Аудио стартует по клику на титульнике (задержка 1.5с перед прологом)

## 8. Сборка и запуск

```bash
npm run dev        # dev-сервер → http://localhost:5173
npm run build      # production-сборка (vite build, без tsc)
npm run preview    # предпросмотр dist/
```

**ВАЖНО:** `tsc -b` отключён из-за глобального TS 7.x. Сборка только через vite.

## 9. Генерация изображений

### Порядок работы
1. Написать промпт в чат (>=1500 символов, с --ar и 📎 I2I)
2. Пользователь генерирует изображение в нейросети
3. Файл скачивается в `~/Загрузки/`
4. Скопировать в `public/comics/act_1/panels/` с правильным именем
5. Обновить `ASSETS.md` при необходимости

### Нейминг файлов панелей
- `prologue_{N}.png` — пролог
- `panel_{act}_{scene}_{page}_{panel}.png` — основные сцены (panel_2_1_3.png)
- `s3_{variant}_{page}_{panel}.png` — сцена 3 с вариантами (s3_a_2_1.mp4)
- Видео: то же имя, расширение `.mp4`

## 10. Важные правила

1. **Синхронизация документации:** любое изменение сюжета, персонажей, стилистики — отразить в STORY.md, CHARACTERS.md, STYLE.md, ASSETS.md, LAYOUTS.md
2. **Бэкапы:** перед крупными изменениями — `cp -a ~/dev/kabuki ~/dev/kabuki_backup_{date}`
3. **node_modules:** в этом окружении npm install может не работать. Решение — копировать из бэкапа
4. **Ничего не качать без спроса:** sudo, apt, сторонние бинари — только с разрешения пользователя
5. **Эксперименты:** сначала утвердить подход с пользователем, потом реализовывать
6. **Референсы:** при генерации всегда указывать раздел 📎 I2I референсы
***(auto-saved — session 2026-09-27)***

## Project State (end of session)

**AI agent — read this on launch:**

- **Dialogues**: natural Russian, Edo period flavor, NO "игрок" references
- **No player character** — story follows 7 troupe members
- **Scales**: `actor` + `killer` (0–100 each), tracked in Zustand store
- **Scene 3 → 4 flow**: choice → title card → bridge scene → scene 4
- **Choice ring UI**: SVG ring + flame tendrils, full-screen hit detection by angle
- **Back button**: history stack in store, cleared on choice
- **Fonts**: PT Serif (dialogs), Oswald (titles) via Google Fonts
- **Choice system**: 3 choices → 3 scene3 variants → 3 bridge variants → 3 intro panels in scene4
- **prologue_4**: burning house, troupe walking away
- **prologue_5**: troupe at camp, Kenta with Goro  
- **prologue_6**: troupe becomes actors
- **Scene 4 intro panel**: 3 variants (Ren/Tadashi/Ryusei silhouette) selected by flag

## AUTO-SAVED — Session 2026-09-27

### Expansion plan: Act I → 2× content

New scene order (current + new in bold):

```
PROLOGUE     — as is
[NEW] S0     — УТРО С КАГЭ (Кэнта + Кагэ, чай, луна)
S1           — Утро, труппа (as is)
[NEW] S1.5   — РЫНОК (Горо + Рюсэй, видят чужаков)
S2           — Рэн и Юки у порога (as is) → ВЫБОР 1
[NEW] S2.5   — НОЧЬ (Рэн + Юки вдвоём в комнате)
S3           — Репетиция, A/B/C (as is) → ВЫБОР 2
УЖИН         — as is
[NEW] S3.5   — ТЕНИ (зарисовки перед сном, по варианту)
BRIDGE       — as is
S4           — Сад (as is, 3 силуэта)
[NEW] S4.5   — ГОСТЬ (записка, тень у ворот)
FINALE       — as is
```

### Workflow per scene
1. Write script (narration + dialogues) + panel descriptions
2. Write image prompts (1500+ chars, 📎 I2I, --ar)
3. User generates → copies from ~/Загрузки/
4. Code scene file → add to routes.ts → build → test

### Current state
- Architecture: state machine in engine/routes.ts
- App.tsx: ~155 lines (render + engine)
- All transitions: fade (300ms) + store reset
- Scene 4: 3 dynamic silhouettes (Ren/Tadashi/Ryusei) + dynamic dialogues
- Dialogues: no "игрок", spoken TO the character present, not ABOUT them

## 📋 NEXT SESSION — Prep

### Current state (end of 27.09.2026)
- **Prologue:** 9 pages (was 5) — +3 new pages: детство Кэнты, заказ, театр
- **Architecture:** state machine in engine/routes.ts ✅
- **App.tsx:** ~155 lines (was 345) ✅
- **Scene 4:** 3 dynamic silhouettes (Ren/Ryusei/Tadashi) ✅
- **Dialogues:** no "игрок", dynamic by flag ✅
- **Layouts:** 11 templates (1-9 + A + B) ✅
- **Docs updated:** STORY.md, CHARACTERS.md, STYLE.md, ASSETS.md, LAYOUTS.md, AGENTS.md, ARCHITECTURE.md ✅

### Expansion queue (rest)
| # | Scene | Between | Priority |
|---|-------|---------|----------|
| S0 | Утро с Кагэ (Кэнта + Кагэ, чай, луна) | Пролог → Сц 1 | ✅ Готово |
| S1.5 | Рынок (Горо + Рюсэй, видят чужаков) | Сц 1 → Сц 2 | ⭐ |
| S2.5 | Ночь вдвоём (Рэн + Юки в комнате) | Сц 2 → Сц 3 | ⭐ |
| S3.5 | Тени (зарисовки перед сном) | Ужин → Мостик | ⭐ |
| S4.5 | Гость (записка, тень у ворот) | Сц 4 → Финал | ⭐ |

### Workflow per scene
1. Write script (narrator + dialogues + panel descriptions)
2. Write prompts (1500+ chars, 📎 I2I, --ar)
3. User generates → files in ~/Загрузки/
4. Copy to public/comics/act_1/panels/
5. Code scene in src/data/*.ts
6. If new route: add entry in routes.ts
7. Build: npm run build → test

### Server
`npm run dev` → http://localhost:5173
