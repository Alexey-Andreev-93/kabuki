import type { RouteEntry } from './types'
import { prologuePages } from '../data/prologue'
import { scene0Pages } from '../data/scene0'
import { scene1Pages } from '../data/scene1'
import { scene2Pages } from '../data/scene2'
import { scene25Pages } from '../data/scene25'
import { scene27Pages, scene27Choice, epilogueTrust, epilogueTest, epilogueReject } from '../data/scene27'
import { scene3Variants } from '../data/scene3'
import { getScene4Pages } from '../data/scene4'
import { scene15Pages } from '../data/scene15'
import { bridgePages } from '../data/bridge'
import { finalePages, finaleChoice } from '../data/finale'
import { sceneTitles, choiceTitles, actTitles } from '../data/titles'
import { scaleMap } from '../data/scales'

// Таблица маршрутов — вычисляется каждый раз с актуальными флагами
export function getRoutes(): Record<string, RouteEntry> {
  return {
    start: { node: { type: 'start' }, onComplete: 'act1_title' },
    act1_title: { node: { type: 'title_card', ...actTitles.act1 }, onComplete: 'prologue' },

    prologue: { node: { type: 'scene', id: 'prologue', pages: prologuePages }, onComplete: 'scene0_title' },
    scene0_title: { node: { type: 'title_card', ...sceneTitles.scene0 }, onComplete: 'scene0' },
    scene0: { node: { type: 'scene', id: 'scene0', pages: scene0Pages }, onComplete: 'scene15_title' },
    scene15_title: { node: { type: 'title_card', ...sceneTitles.scene15 }, onComplete: 'scene15' },
    scene15:     { node: { type: 'scene', id: 'scene15', pages: scene15Pages }, onComplete: 'scene1_title' },
    scene1_title: { node: { type: 'title_card', ...sceneTitles.scene1 }, onComplete: 'scene1' },
    scene1:      { node: { type: 'scene', id: 'scene1', pages: scene1Pages }, onComplete: 'scene2_title' },
    scene2_title: { node: { type: 'title_card', ...sceneTitles.scene2 }, onComplete: 'scene2' },
    scene2: {
      node: { type: 'scene', id: 'scene2', pages: scene2Pages },
      onComplete: 'scene25_title',
    },

    scene25_title: { node: { type: 'title_card', ...sceneTitles.scene25 }, onComplete: 'scene25' },
    scene25: { node: { type: 'scene', id: 'scene25', pages: scene25Pages }, onComplete: 'scene27_title' },
    scene27_title: { node: { type: 'title_card', ...sceneTitles.scene27 }, onComplete: 'scene27' },
    scene27: {
      node: { type: 'scene', id: 'scene27', pages: scene27Pages, choice: scene27Choice },
      onChoice: { trust_ren: 'scene27_trust', test_ren: 'scene27_test', reject_ren: 'scene27_reject' },
    },
    scene27_trust:  { node: { type: 'scene', id: 'scene27_trust', pages: [epilogueTrust] }, onComplete: 'scene3_trust_title' },
    scene27_test:   { node: { type: 'scene', id: 'scene27_test', pages: [epilogueTest] }, onComplete: 'scene3_test_title' },
    scene27_reject: { node: { type: 'scene', id: 'scene27_reject', pages: [epilogueReject] }, onComplete: 'scene3_reject_title' },

    scene3_trust_title:  { node: { type: 'title_card', ...choiceTitles.trust_ren }, onComplete: 'scene3_trust' },
    scene3_test_title:   { node: { type: 'title_card', ...choiceTitles.test_ren }, onComplete: 'scene3_test' },
    scene3_reject_title: { node: { type: 'title_card', ...choiceTitles.reject_ren }, onComplete: 'scene3_reject' },

    scene3_trust: {
      node: { type: 'scene_variant', id: 'trust', pages: scene3Variants.trust.pages, choiceAfter: scene3Variants.trust.choiceAfter },
      onChoice: { ren_past: 'bridge_ren_title', ignore: 'bridge_ignore_title', yuki_bond: 'bridge_yuki_title' },
    },
    scene3_test: {
      node: { type: 'scene_variant', id: 'test', pages: scene3Variants.test.pages, choiceAfter: scene3Variants.test.choiceAfter },
      onChoice: { ren_past: 'bridge_ren_title', ignore: 'bridge_ignore_title', yuki_bond: 'bridge_yuki_title' },
    },
    scene3_reject: {
      node: { type: 'scene_variant', id: 'reject', pages: scene3Variants.reject.pages, choiceAfter: scene3Variants.reject.choiceAfter },
      onChoice: { ren_past: 'bridge_ren_title', ignore: 'bridge_ignore_title', yuki_bond: 'bridge_yuki_title' },
    },

    bridge_ren_title:   { node: { type: 'title_card', ...choiceTitles.ren_past }, onComplete: 'bridge_ren' },
    bridge_ignore_title:{ node: { type: 'title_card', ...choiceTitles.ignore }, onComplete: 'bridge_ignore' },
    bridge_yuki_title: { node: { type: 'title_card', ...choiceTitles.yuki_bond }, onComplete: 'bridge_yuki' },

    bridge_ren:   { node: { type: 'bridge', id: 'bridge_ren', pages: bridgePages.ren_past }, onComplete: 'scene4' },
    bridge_ignore:{ node: { type: 'bridge', id: 'bridge_ignore', pages: bridgePages.ignore }, onComplete: 'scene4' },
    bridge_yuki:  { node: { type: 'bridge', id: 'bridge_yuki', pages: bridgePages.yuki_bond }, onComplete: 'scene4' },

    scene4: { node: { type: 'scene', id: 'scene4', pages: getScene4Pages() }, onComplete: 'finale' },
    finale: { node: { type: 'scene', id: 'finale', pages: finalePages, choice: finaleChoice }, onChoice: { continue: 'act2_title' } },

    act2_title: { node: { type: 'title_card', jp: '第二幕', ru: 'АКТ ВТОРОЙ', sub: 'Ха — Прорыв' }, onComplete: 'start' },
  }
}

export { scaleMap }