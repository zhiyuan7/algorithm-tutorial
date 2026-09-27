import type { TourScene } from './types'

const scienceAll = ['science-root', 'reality', 'induction', 'theory', 'deduction']
const scienceEdges = ['r-reality-induction', 'r-induction-theory', 'r-theory-deduction', 'r-deduction-reality']
const formalNodes = ['paradigms-root', 'formal', 'axiom']
const formalEdges = ['h-paradigms-root-formal', 'h-formal-axiom']
const paradigmNodes = [...formalNodes, 'natural']
const paradigmEdges = [...formalEdges, 'h-paradigms-root-natural']
const materialityNodes = [...paradigmNodes, 'materiality']
const materialityEdges = [...paradigmEdges, 'h-formal-materiality']
const originNodes = [...materialityNodes, 'origin']
const originEdges = [...materialityEdges, 'h-materiality-origin']
const prototypeNodes = [...originNodes, 'prototype']
const prototypeEdges = [...originEdges, 'h-materiality-prototype', 'r-prototype-natural']
const godelNodes = [...prototypeNodes, 'godel']
const godelEdges = [...prototypeEdges, 'h-materiality-godel', 'r-axiom-godel']

// 原知识舞台第 3、6、9、12、14 页的纯结构场景已删除。
// 页码按 KnowledgeStage 的场景计数，封面与结束页不计入。
export const tour: TourScene[] = [
  { id: 'opening', map: 'science-knowledge', focus: 'science-root', framing: 'node', mode: 'detail', detailKey: 'opening', visibleNodes: ['science-root'], visibleEdges: [], chapter: '科学', headline: '从本体论与认识论出发' },
  { id: 'reality-detail', map: 'science-knowledge', focus: 'reality', framing: 'node', mode: 'detail', detailKey: 'complexity', visibleNodes: ['science-root', 'reality'], visibleEdges: [], chapter: '现实', headline: '现实总比模型更复杂' },
  { id: 'induction-pipeline', map: 'science-knowledge', focus: 'induction', framing: 'node', mode: 'detail', detailKey: 'pipeline', visibleNodes: ['science-root', 'reality', 'induction'], visibleEdges: ['r-reality-induction'], chapter: '归纳与建模', headline: '从观测中选择信息，建立模型' },
  { id: 'induction-monocular', map: 'science-knowledge', focus: 'induction', framing: 'node', mode: 'detail', detailKey: 'monocular', visibleNodes: ['science-root', 'reality', 'induction'], visibleEdges: ['r-reality-induction'], chapter: '归纳与建模', headline: '像素高度如何变成距离' },
  { id: 'theory-distinction', map: 'science-knowledge', focus: 'theory', framing: 'node', mode: 'detail', detailKey: 'distinction', visibleNodes: ['science-root', 'reality', 'induction', 'theory'], visibleEdges: scienceEdges.slice(0, 2), chapter: '理论', headline: '一般规律如何形成解释体系' },
  { id: 'theory-pendulum', map: 'science-knowledge', focus: 'theory', framing: 'node', mode: 'detail', detailKey: 'pendulum', visibleNodes: ['science-root', 'reality', 'induction', 'theory'], visibleEdges: scienceEdges.slice(0, 2), chapter: '理论与模型', headline: '牛顿第二定律与单摆模型' },
  { id: 'deduction-method', map: 'science-knowledge', focus: 'deduction', framing: 'node', mode: 'detail', detailKey: 'method', visibleNodes: scienceAll, visibleEdges: scienceEdges, chapter: '演绎与实验', headline: '假说、预测与反驳' },
  { id: 'deduction-yolo', map: 'science-knowledge', focus: 'deduction', framing: 'node', mode: 'detail', detailKey: 'yolo', visibleNodes: scienceAll, visibleEdges: scienceEdges, chapter: '演绎与实验', headline: '用距离检验检测假说' },
  { id: 'science-overview', map: 'science-knowledge', focus: 'science-root', framing: 'all', mode: 'overview', visibleNodes: scienceAll, visibleEdges: scienceEdges, chapter: '科学', headline: '科学如何认识现实' },
  { id: 'paradigm-morph', map: 'morph', focus: 'paradigms-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: [], chapter: '科学的两种范式', headline: '形式推演与经验检验' },
  { id: 'formal-detail', map: 'scientific-paradigms', focus: 'formal', framing: 'subtree', mode: 'detail', detailKey: 'paradigm', visibleNodes: formalNodes, visibleEdges: formalEdges, chapter: '形式科学', headline: '如果接受这些规则，会推出什么' },
  { id: 'axiom-meaning', map: 'scientific-paradigms', focus: 'axiom', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: formalNodes, visibleEdges: formalEdges, chapter: '公理', headline: '形式系统的起点' },
  { id: 'axiom-euclid', map: 'scientific-paradigms', focus: 'axiom', framing: 'node', mode: 'detail', detailKey: 'euclid', visibleNodes: formalNodes, visibleEdges: formalEdges, chapter: '欧几里得', headline: '五条公设如何规定一种几何' },
  { id: 'axiom-independence', map: 'scientific-paradigms', focus: 'axiom', framing: 'node', mode: 'detail', detailKey: 'independence', visibleNodes: formalNodes, visibleEdges: formalEdges, chapter: '第五公设', headline: '反模型说明公理独立性' },
  { id: 'natural-detail', map: 'scientific-paradigms', focus: 'natural', framing: 'subtree', mode: 'detail', detailKey: 'paradigm', visibleNodes: paradigmNodes, visibleEdges: paradigmEdges, chapter: '自然科学', headline: '理论与模型需要接受经验检验' },
  { id: 'materiality-overview', map: 'scientific-paradigms', focus: 'materiality', framing: 'node', mode: 'detail', detailKey: 'overview', visibleNodes: materialityNodes, visibleEdges: materialityEdges, chapter: '形式科学的唯物性', headline: '从三个方面理解形式与现实的联系' },
  { id: 'origin-learning', map: 'scientific-paradigms', focus: 'origin', framing: 'node', mode: 'detail', detailKey: 'learning', visibleNodes: originNodes, visibleEdges: originEdges, chapter: '第一点 · 认识的过程', headline: '从一个苹果与另一个苹果理解加法' },
  { id: 'prototype-transfer', map: 'scientific-paradigms', focus: 'prototype', framing: 'node', mode: 'detail', detailKey: 'transfer', visibleNodes: prototypeNodes, visibleEdges: prototypeEdges, chapter: '第二点 · 现实的广阔性', headline: '形式可能在现实中找到原型' },
  { id: 'godel-first', map: 'scientific-paradigms', focus: 'godel', framing: 'node', mode: 'detail', detailKey: 'first', visibleNodes: godelNodes, visibleEdges: godelEdges, chapter: '第三点 · 公理体系的边界', headline: '第一不完备定理：系统内存在不可判定命题' },
  { id: 'godel-second', map: 'scientific-paradigms', focus: 'godel', framing: 'node', mode: 'detail', detailKey: 'second', visibleNodes: godelNodes, visibleEdges: godelEdges, chapter: '第三点 · 公理体系的边界', headline: '第二不完备定理：自身一致性的证明边界' },
  { id: 'formal-perspective', map: 'scientific-paradigms', focus: 'godel', framing: 'node', mode: 'detail', detailKey: 'perspective', visibleNodes: godelNodes, visibleEdges: godelEdges, chapter: '形式与认识', headline: '形式揭示现实的结构与侧面' },
  { id: 'fallibilism', map: 'scientific-paradigms', focus: 'fallibilism', framing: 'node', mode: 'detail', detailKey: 'synthesis', visibleNodes: 'all', visibleEdges: 'all', chapter: '可谬论', headline: '认识形式科学时，保留检查与修正的可能' },
  { id: 'paradigms-overview', map: 'scientific-paradigms', focus: 'paradigms-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: 'all', chapter: '科学', headline: '形式的现实来源、探索价值与认识边界' },
]

export function getScene(step: number): TourScene {
  return tour[Math.min(Math.max(0, step), tour.length - 1)]
}
