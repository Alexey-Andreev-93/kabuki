// Actor / Killer scale мэппинг
// Каждому выбору — прибавка к одной из шкал
export const scaleMap: Record<string, () => { actor: number; killer: number }> = {
  trust_ren:  () => ({ actor: 1, killer: 0 }),
  test_ren:   () => ({ actor: 1, killer: 0 }),
  reject_ren: () => ({ actor: 0, killer: 1 }),
  ren_past:   () => ({ actor: 1, killer: 0 }),
  ignore:     () => ({ actor: 0, killer: 1 }),
  yuki_bond:  () => ({ actor: 1, killer: 0 }),
}