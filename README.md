# Театр Теней

Интерактивный манга-комикс (React + Vite + TypeScript + Zustand).
Эдо, 1651 год. Ч/б + красный акцент. Сцены на театре — полноцветные.

## Быстрый старт

```bash
cd ~/dev/kabuki
npm run dev        # dev-сервер → http://localhost:5173
npm run build      # production-сборка → dist/
npm run preview    # просмотр dist/
```

## Стек

| Слой | Технология |
|------|-----------|
| UI | React 19 + TypeScript |
| Стейт-менеджмент | Zustand |
| Сборка | Vite 6 |
| Анимации | CSS transitions (slide-in, fade) |
| Аудио | HTMLAudioElement, провайдер через контекст |

## Структура проекта

```
kabuki/
├── public/
│   ├── audio/          # BGM-файлы (title, scene1..4)
│   └── comics/act_1/panels/  # PNG-панели + MP4-видео
├── src/
│   ├── components/
│   │   ├── MangaViewer.tsx   # Основной плеер (панели, диалоги, анимация)
│   │   ├── ChoiceOverlay.tsx  # Экран выбора
│   │   ├── TitleCard.tsx      # Титульная страница акта
│   │   ├── AudioProvider.tsx  # Контекст для BGM
│   │   └── SceneAudioPlayer.tsx  # Автоматическое переключение BGM
│   ├── data/
│   │   ├── layouts.ts        # Шаблоны раскладок панелей (1–9)
│   │   ├── prologue.ts       # Пролог (3 стр)
│   │   ├── scene1.ts         # Акт I, сц 1 (3 стр)
│   │   ├── scene2.ts         # Акт I, сц 2 (2 стр + выбор)
│   │   └── scene3.ts         # Акт I, сц 3 (3 варианта × 2 стр)
│   ├── store/
│   │   └── store.ts          # Zustand (флаги, текущая панель)
│   ├── App.tsx               # Роутинг сцен, выборы, AudioProvider
│   └── index.css             # Все стили (манга-страница, баблы, прелоадер)
├── STORY.md          # Сюжет, ветвления, карта
├── CHARACTERS.md     # Персонажи
├── STYLE.md          # Стилистика
├── ASSETS.md         # Ассеты (что сгенерировано)
└── LAYOUTS.md        # Шаблоны раскладок
```

## Архитектура

### Сцены и навигация

Приложение — последовательность сцен (`scenes[]` в `App.tsx`):
```
Титульник → Пролог → Сц 1 → Сц 2 → [выбор] → Сц 3 (A/B/C) → ...
```

Каждая сцена — массив страниц (`pages[]`). Страница — набор панелей (`panels[]`), расположенных по шаблону (`applyLayout`).

Сцена 3 — 3 варианта (trust/test/reject), загружаются не из `scenes[]`, а через `scene3Pages` state.

### Анимация панелей (slide-in)

Новые панели выезжают снизу с fade (`translateY(30px) → translateY(0)`).
Отслеживается через `sliding` Set в MangaViewer.

### Аудио

BGM переключается автоматически при смене сцены через `SceneAudioPlayer`.
Карта: `title → title.mp3`, `scene1 → scene1.mp3`, `scene2 → scene2.mp3`, `scene3 → scene3.mp3`, `scene4 → scene4.mp3`

Из-за автоплей-политики браузера, аудио стартует после клика на титульнике (задержка 1.5с перед переходом в пролог).

### Панели

```typescript
interface Panel {
  id: string
  src: string           // путь к PNG или MP4
  type: 'image' | 'video'
  alt: string
  focus?: { x: number; y: number }  // object-position
  dialogue: Dialogue[]
}
```

### Шаблоны раскладок

| Тип | Описание | AR ячеек |
|-----|----------|----------|
| `1` | 2×2 сетка | 16:9 |
| `2` | Журнал (4 стр) | 4:3 |
| `3` | Баннер + 16:9 | 21:9 + 16:9 |
| `4` | 3:4 + 1:1 | 3:4 + 1:1 |
| `5` | 3 портрета | 9:16 |
| `6` | 3:2 + 2:1 | 3:2 + 2:1 |
| `7` | 4×16:9 | 16:9 |
| `8` | Герой+два | 4:3 + 1:1×2 |
| `9` | 3 в ряд | 9:16 |

## Как добавить новую сцену

1. Создать `src/data/sceneN.ts`
2. В ней: `applyLayout('8', 'sceneN_p1', [...panels])`
3. Добавить сцену в `scenes[]` в `App.tsx` или в `handleChoice`
4. BGM: добавить в `bgmMap` в `SceneAudioPlayer.tsx`
5. Обновить `STORY.md`

## Известные проблемы

- **`tsc -b`** отключён из-за глобального TS 7.x и отсутствия локального. Сборка идёт через `vite build` напрямую.
- **Автоплей аудио** — только после клика пользователя.
- **node_modules** не всегда устанавливаются через `npm install` (особенность окружения). Решение: копировать из бэкапа.

## Бэкапы

```bash
~/dev/kabuki_backup_20260926_185648/        # оригинал (без аудио, без анимаций)
~/dev/kabuki_backup_20260926_203227_before_electron/  # с аудио, слайд-ин, выбор
```