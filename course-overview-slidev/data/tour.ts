import type { TourScene } from './types'

const cycleAll = ['cycle-root', 'reality', 'induction', 'theory', 'deduction']
const cycleEdges = ['r-reality-induction', 'r-induction-theory', 'r-theory-deduction', 'r-deduction-reality']
const paradigmAll = ['paradigms-root', 'formal', 'axiom', 'godel', 'natural', 'usefulness', 'fallibilism']

export const tour: TourScene[] = [
  { id: 'opening', map: 'scientific-cycle', focus: 'cycle-root', framing: 'node', mode: 'detail', detailKey: 'opening', visibleNodes: ['cycle-root'], visibleEdges: [], chapter: '总纲', headline: '从现实中得到知识' },
  { id: 'reality-detail', map: 'scientific-cycle', focus: 'reality', framing: 'node', mode: 'detail', detailKey: 'complexity', visibleNodes: ['cycle-root', 'reality'], visibleEdges: [], chapter: '现实', headline: '现实总比模型更复杂' },
  { id: 'reality-summary', map: 'scientific-cycle', focus: 'reality', framing: 'subtree', mode: 'summary', visibleNodes: ['cycle-root', 'reality'], visibleEdges: [], chapter: '现实', headline: '问题决定我们看见哪一部分' },
  { id: 'induction-pipeline', map: 'scientific-cycle', focus: 'induction', framing: 'node', mode: 'detail', detailKey: 'pipeline', visibleNodes: ['cycle-root', 'reality', 'induction'], visibleEdges: ['r-reality-induction'], chapter: '第一座桥', headline: '归纳与建模' },
  { id: 'induction-monocular', map: 'scientific-cycle', focus: 'induction', framing: 'node', mode: 'detail', detailKey: 'monocular', visibleNodes: ['cycle-root', 'reality', 'induction'], visibleEdges: ['r-reality-induction'], chapter: '第一座桥', headline: '像素高度如何变成距离' },
  { id: 'induction-summary', map: 'scientific-cycle', focus: 'induction', framing: 'subtree', mode: 'summary', visibleNodes: ['cycle-root', 'reality', 'induction'], visibleEdges: ['r-reality-induction'], chapter: '建模完成', headline: '桥收缩，关系保留' },
  { id: 'theory-distinction', map: 'scientific-cycle', focus: 'theory', framing: 'node', mode: 'detail', detailKey: 'distinction', visibleNodes: ['cycle-root', 'reality', 'induction', 'theory'], visibleEdges: ['r-reality-induction', 'r-induction-theory'], chapter: '理论', headline: '一般规律与具体模型' },
  { id: 'theory-pendulum', map: 'scientific-cycle', focus: 'theory', framing: 'node', mode: 'detail', detailKey: 'pendulum', visibleNodes: ['cycle-root', 'reality', 'induction', 'theory'], visibleEdges: ['r-reality-induction', 'r-induction-theory'], chapter: '理论', headline: '单摆方程的推导链' },
  { id: 'theory-summary', map: 'scientific-cycle', focus: 'theory', framing: 'subtree', mode: 'summary', visibleNodes: ['cycle-root', 'reality', 'induction', 'theory'], visibleEdges: ['r-reality-induction', 'r-induction-theory'], chapter: '理论完成', headline: '一般规律成为地图节点' },
  { id: 'deduction-method', map: 'scientific-cycle', focus: 'deduction', framing: 'node', mode: 'detail', detailKey: 'method', visibleNodes: cycleAll, visibleEdges: cycleEdges.slice(0, 3), chapter: '第二座桥', headline: '假说、预测与反驳' },
  { id: 'deduction-yolo', map: 'scientific-cycle', focus: 'deduction', framing: 'node', mode: 'detail', detailKey: 'yolo', visibleNodes: cycleAll, visibleEdges: cycleEdges.slice(0, 3), chapter: '第二座桥', headline: '用距离检验检测假说' },
  { id: 'deduction-summary', map: 'scientific-cycle', focus: 'deduction', framing: 'subtree', mode: 'summary', visibleNodes: cycleAll, visibleEdges: cycleEdges, chapter: '实验完成', headline: '支持不等于绝对证明' },
  { id: 'cycle-overview', map: 'scientific-cycle', focus: 'cycle-root', framing: 'all', mode: 'overview', visibleNodes: cycleAll, visibleEdges: cycleEdges, chapter: '第一张知识图谱', headline: '科学在现实与理论之间循环' },
  { id: 'before-morph', map: 'scientific-cycle', focus: 'cycle-root', framing: 'all', mode: 'concept', visibleNodes: cycleAll, visibleEdges: cycleEdges, chapter: '视角转换', headline: '从“知识如何建立”转向“科学如何组织”' },
  { id: 'paradigm-morph', map: 'morph', focus: 'paradigms-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: [], chapter: '变形过渡', headline: '一个循环重组为两种科学范式' },
  { id: 'formal-detail', map: 'scientific-paradigms', focus: 'formal', framing: 'subtree', mode: 'detail', detailKey: 'paradigm', visibleNodes: ['paradigms-root', 'formal', 'axiom', 'godel'], visibleEdges: ['h-paradigms-root-formal', 'h-formal-axiom', 'h-formal-godel'], chapter: '形式科学', headline: '如果接受这些规则，会推出什么' },
  { id: 'axiom-meaning', map: 'scientific-paradigms', focus: 'axiom', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: ['paradigms-root', 'formal', 'axiom', 'godel'], visibleEdges: ['h-paradigms-root-formal', 'h-formal-axiom', 'h-formal-godel'], chapter: '公理', headline: '形式系统的起点' },
  { id: 'axiom-euclid', map: 'scientific-paradigms', focus: 'axiom', framing: 'node', mode: 'detail', detailKey: 'euclid', visibleNodes: ['paradigms-root', 'formal', 'axiom', 'godel'], visibleEdges: ['h-paradigms-root-formal', 'h-formal-axiom'], chapter: '欧几里得', headline: '五条公设如何定义一种几何' },
  { id: 'axiom-independence', map: 'scientific-paradigms', focus: 'axiom', framing: 'node', mode: 'detail', detailKey: 'independence', visibleNodes: ['paradigms-root', 'formal', 'axiom', 'godel'], visibleEdges: ['h-paradigms-root-formal', 'h-formal-axiom'], chapter: '第五公设', headline: '反模型说明公理独立性' },
  { id: 'natural-detail', map: 'scientific-paradigms', focus: 'natural', framing: 'subtree', mode: 'detail', detailKey: 'paradigm', visibleNodes: paradigmAll, visibleEdges: ['h-paradigms-root-formal', 'h-formal-axiom', 'h-formal-godel', 'h-paradigms-root-natural', 'h-natural-usefulness', 'h-natural-fallibilism'], chapter: '自然科学', headline: '理论必须回到现实接受检验' },
  { id: 'usefulness-transfer', map: 'scientific-paradigms', focus: 'usefulness', framing: 'node', mode: 'detail', detailKey: 'transfer', visibleNodes: paradigmAll, visibleEdges: 'all', chapter: '用与无用', headline: '形式体系可以在未来找到现实原型' },
  { id: 'godel-first', map: 'scientific-paradigms', focus: 'godel', framing: 'node', mode: 'detail', detailKey: 'first', visibleNodes: paradigmAll, visibleEdges: 'all', chapter: '哥德尔', headline: '一致且足够强的系统存在不可判定命题' },
  { id: 'godel-second', map: 'scientific-paradigms', focus: 'godel', framing: 'node', mode: 'detail', detailKey: 'second', visibleNodes: paradigmAll, visibleEdges: 'all', chapter: '哥德尔', headline: '系统无法在自身内部完成所有安全保证' },
  { id: 'fallibilism', map: 'scientific-paradigms', focus: 'fallibilism', framing: 'node', mode: 'detail', detailKey: 'synthesis', visibleNodes: paradigmAll, visibleEdges: 'all', chapter: '可谬论', headline: '可修正性让知识保持开放' },
  { id: 'paradigms-overview', map: 'scientific-paradigms', focus: 'paradigms-root', framing: 'all', mode: 'overview', visibleNodes: paradigmAll, visibleEdges: 'all', chapter: '第二张知识图谱', headline: '两种范式在不断提问中向前延伸' },
]

export function getScene(step: number): TourScene {
  return tour[Math.min(Math.max(0, step), tour.length - 1)]
}
