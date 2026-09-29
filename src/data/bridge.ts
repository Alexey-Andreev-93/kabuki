import { applyLayout } from './layouts'

// Сцена-мостик между выбором в сцене 3 и сценой 4
const bridgeRenPast = applyLayout('1', 'act1_bridge_ren_past', [
  { src: '/comics/act_1/panels/s3_ren_past_1.png', type: 'image' as const, alt: 'Рэн один в коридоре', focus: { x: 50, y: 40 },
    dialogue: [{ speakerId: 'narrator', text: 'Рэн ушёл, не ответив. Дверь за ним закрылась. И никто не решился постучать.' }] },
  { src: '/comics/act_1/panels/s3_ren_past_2.png', type: 'image' as const, alt: 'Тадаси смотрит на дверь',
    dialogue: [] },
  { src: '/comics/act_1/panels/s3_ren_past_3.png', type: 'image' as const, alt: 'Лицо Рэна в полутьме',
    dialogue: [] },
  { src: '/comics/act_1/panels/s3_ren_past_4.png', type: 'image' as const, alt: 'Пустой коридор',
    dialogue: [] },
])

const bridgeIgnore = applyLayout('1', 'act1_bridge_ignore', [
  { src: '/comics/act_1/panels/s3_ignore_1.png', type: 'image' as const, alt: 'Ужин в молчании', focus: { x: 50, y: 40 },
    dialogue: [{ speakerId: 'narrator', text: 'Ужин прошёл в молчании. Горо пытался шутить — никто не улыбнулся. Все слишком старались быть обычными.' }] },
  { src: '/comics/act_1/panels/s3_ignore_2.png', type: 'image' as const, alt: 'Горо не решается',
    dialogue: [] },
  { src: '/comics/act_1/panels/s3_ignore_3.png', type: 'image' as const, alt: 'Рэн смотрит в тарелку',
    dialogue: [] },
  { src: '/comics/act_1/panels/s3_ignore_4.png', type: 'image' as const, alt: 'Тадаси уходит',
    dialogue: [] },
])

const bridgeYukiBond = applyLayout('1', 'act1_bridge_yuki_bond', [
  { src: '/comics/act_1/panels/s3_yuki_bond_1.png', type: 'image' as const, alt: 'Юки встаёт и выходит', focus: { x: 50, y: 40 },
    dialogue: [{ speakerId: 'narrator', text: 'Рюсэй заметил, что Юки вышла. Не сразу — но заметил. Прошёлся по пустым комнатам, заглянул в коридоры.' }] },
  { src: '/comics/act_1/panels/s3_yuki_bond_2.png', type: 'image' as const, alt: 'Рюсэй идёт по коридору',
    dialogue: [] },
  { src: '/comics/act_1/panels/s3_yuki_bond_3.png', type: 'image' as const, alt: 'Рюсэй у лестницы',
    dialogue: [] },
  { src: '/comics/act_1/panels/s3_yuki_bond_4.png', type: 'image' as const, alt: 'Рюсэй на веранде',
    dialogue: [{ speakerId: 'narrator', text: 'Потом вышел на веранду и услышал — в саду кто-то играл на сямисэне.' }] },
])

export const bridgePages: Record<string, ReturnType<typeof applyLayout>[]> = {
  ren_past: [bridgeRenPast],
  ignore: [bridgeIgnore],
  yuki_bond: [bridgeYukiBond],
}