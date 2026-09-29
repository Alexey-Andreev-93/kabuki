# Архитектура «Театр Теней» — План рефакторинга

## 1. Текущие проблемы

### App.tsx (345 строк монолита)
- `handlePageComplete` — 6 вложенных путей (scene3Pages / bridge / normal scenes / scene4 hack)
- `handleChoice` — 3 разных маршрута + fallback, всё в одном callback
- `scenes` — статический массив, scene4 пришлось чинить в 4 местах
- Состояние: 13+ useState (sceneIdx, pageIndex, scene3Pages, bridgeMode, scene4Pages…)
- Добавление Акта II = ещё больше if/else

### Файловая структура
- Всё в src/data/ — уже нормально
- store — минимальный, норм
- components — норм
- Проблема: **маршрутизация** размазана по App.tsx

---

## 2. State Machine — что предлагаю

Вместо if/else — таблица маршрутов:

```typescript
// Каждый «узел» — законченное состояние игры
type GameNode = 
  | { type: 'start' }
  | { type: 'act_title', act: 1 | 2 | 3 }
  | { type: 'scene', id: string, pages: Page[] }
  | { type: 'scene_variant', id: string, pages: Page[], choiceAfter: ChoiceDef }
  | { type: 'bridge', id: string, pages: Page[] }
  | { type: 'choice', prompt: string, choices: ChoiceDef[] }
  | { type: 'title_card', jp: string, ru: string, sub: string, next: string }
  | { type: 'end' }

// Таблица переходов: из → в
const routes: Record<string, { node: GameNode; onComplete?: string; onChoice?: Record<string, string> }> = {
  start: { node: { type: 'act_title', act: 1 }, onComplete: 'prologue' },
  prologue: { node: { type: 'scene', id: 'prologue', pages: prologuePages }, onComplete: 'scene1' },
  scene1: { node: { type: 'scene', id: 'scene1', pages: scene1Pages }, onComplete: 'scene2' },
  scene2: { node: { type: 'scene', id: 'scene2', pages: scene2Pages, choice: scene2Choice } },
  scene2_choice: { node: { type: 'choice', ...scene2Choice },
    onChoice: {
      trust_ren: 'scene3_trust_title',
      test_ren: 'scene3_test_title',
      reject_ren: 'scene3_reject_title',
    }
  },
  scene3_trust_title: { node: { type: 'title_card', ...trustTitle }, onComplete: 'scene3_trust' },
  scene3_trust: { node: { type: 'scene_variant', id: 'trust', pages: s3TrustPages, choiceAfter: scene3SecondChoice },
    onChoice: {
      ren_past: 'bridge_ren_title',
      ignore: 'bridge_ignore_title',
      yuki_bond: 'bridge_yuki_title',
    }
  },
  // ... и так далее
  bridge_ren: { node: { type: 'bridge', pages: bridgeRenPast }, onComplete: 'scene4' },
  bridge_ignore: { node: { type: 'bridge', pages: bridgeIgnore }, onComplete: 'scene4' },
  bridge_yuki: { node: { type: 'bridge', pages: bridgeYukiBond }, onComplete: 'scene4' },
  scene4: { node: { type: 'scene', id: 'scene4', pages: getScene4Pages() }, onComplete: 'finale' },
  finale: { node: { type: 'scene', id: 'finale', pages: finalePages, choice: finaleChoice } },
  end: { node: { type: 'end' } },
}
```

В App.tsx остаётся:

```typescript
const [nodeId, setNodeId] = useState('start')
const route = routes[nodeId]

handlePageComplete = () => {
  if (route.onComplete) setNodeId(route.onComplete)
}

handleChoice = (choice) => {
  setFlag, addActor/addKiller
  if (route.onChoice) setNodeId(route.onChoice[choice.flag])
}
```

---

## 3. Как меняется структура

### Было:
```
App.tsx              ← 345 строк, вся логика
  ├── данные сцен    ← import
  ├── handlePageComplete  ← if/else по состоянию
  ├── handleChoice       ← if/else по флагу
  └── render             ← if/else по showTitle/showChoice/scene3Pages
```

### Станет:
```
App.tsx              ← ~100 строк (движок)
routes.ts            ← таблица маршрутов (легко читать / добавлять)
  ├── сцены          ← import из data/
  ├── титульники     ← из data/titles.ts
  └── choiceAfter    ← из data/

data/                ← только контент (без маршрутизации)
  ├── prologue.ts
  ├── scene1.ts
  ├── scene2.ts
  ├── scene3.ts
  ├── bridge.ts
  ├── scene4.ts
  ├── finale.ts
  └── titles.ts      ← вынести сюда все choiceTitles / sceneTitles / actTitles
```

### Компоненты без изменений:
- MangaViewer, ChoiceOverlay, TitleCard, AudioProvider, SceneAudioPlayer
- Store (только добавится scale-резолвер)
- Данные сцен (*.ts) — менять не нужно

---

## 4. План действий (пошагово)

| Шаг | Что делаем | Файлы |
|-----|-----------|-------|
| 1 | Создать `src/engine/routes.ts` с таблицей маршрутов | routes.ts |
| 2 | Вынести титульники из App.tsx в `data/titles.ts` | titles.ts |
| 3 | Переписать App.tsx под state machine | App.tsx |
| 4 | Добавить scaleAsActor / scaleAsKiller в handleChoice | App.tsx |
| 5 | Перенести scene4 hack в штатный механизм | routes.ts |
| 6 | Собрать @types для GameNode | types.ts |
| 7 | Проверить build и все переходы | — |

---

## 5. Итог

После рефакторинга:
- Добавление новой сцены = 3 строки в routes.ts
- Никаких if/else цепочек
- Все костыли (bridgeMode, s4Pages) уходят в таблицу
- Легко добавлять Акт II и III
- handlePageComplete = 10 строк
- handleChoice = 10 строк