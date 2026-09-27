import type { TourScene } from './types'

const compNodes = ['computability-root', 'recognizable', 'decidable', 'halting', 'diagonal']
const cxNodes = ['complexity-root', 'decidable', 'p', 'np', 'sat', 'open-question']
const uniNodes = ['universality-root', 'turing-complete', 'resources', 'control', 'memory', 'boundary']

export const tour: TourScene[] = [
  { id: 'opening', map: 'computability', focus: 'computability-root', framing: 'node', mode: 'detail', detailKey: 'opening', visibleNodes: ['computability-root'], visibleEdges: [], chapter: '先问能不能算', headline: '我们希望程序给出怎样的答案？' },
  { id: 'recognizable', map: 'computability', focus: 'recognizable', framing: 'node', mode: 'detail', detailKey: 'promise', visibleNodes: ['computability-root', 'recognizable'], visibleEdges: 'all', chapter: '可识别', headline: '如果答案是“是”，总能等到它' },
  { id: 'decidable', map: 'computability', focus: 'decidable', framing: 'node', mode: 'detail', detailKey: 'guarantee', visibleNodes: ['computability-root', 'recognizable', 'decidable'], contextNodes: ['recognizable'], visibleEdges: 'all', chapter: '可判定与可识别', headline: '“是”与“不是”，都要给出答案' },
  { id: 'halting-question', map: 'computability', focus: 'halting', framing: 'node', mode: 'detail', detailKey: 'question', visibleNodes: ['recognizable', 'halting'], visibleEdges: 'all', chapter: '图灵与停机问题', headline: '能提前知道一个程序会不会停下来吗？' },
  { id: 'halting-simulate', map: 'computability', focus: 'halting', framing: 'node', mode: 'detail', detailKey: 'simulate', visibleNodes: ['recognizable', 'halting'], visibleEdges: 'all', chapter: '为什么可识别', headline: '真正停下来的那一刻，我们就知道了' },
  { id: 'halting-waiting', map: 'computability', focus: 'halting', framing: 'node', mode: 'detail', detailKey: 'waiting', visibleNodes: ['recognizable', 'halting'], visibleEdges: 'all', chapter: '识别还不等于判定', headline: '一直没有停，能说明永远不停吗？' },
  { id: 'diag-assume', map: 'computability', focus: 'diagonal', framing: 'node', mode: 'detail', detailKey: 'assume', visibleNodes: ['halting', 'diagonal'], visibleEdges: 'all', chapter: '对角线反证', headline: '假设有一个总能预测停机的程序' },
  { id: 'diag-invert', map: 'computability', focus: 'diagonal', framing: 'node', mode: 'detail', detailKey: 'invert', visibleNodes: ['halting', 'diagonal'], visibleEdges: 'all', chapter: '对角线反证', headline: '让另一个程序故意与预测反着来' },
  { id: 'diag-self', map: 'computability', focus: 'diagonal', framing: 'node', mode: 'detail', detailKey: 'self', visibleNodes: ['halting', 'diagonal'], visibleEdges: 'all', chapter: '对角线反证', headline: '把它自己交给它，矛盾就出现了' },
  { id: 'computability-overview', map: 'computability', focus: 'computability-root', framing: 'all', mode: 'overview', visibleNodes: compNodes, visibleEdges: 'all', chapter: '回头看算法的保证', headline: '停机问题可以识别，却无法判定' },
  { id: 'before-morph-a', map: 'computability', focus: 'decidable', framing: 'all', mode: 'summary', visibleNodes: ['computability-root', 'decidable'], visibleEdges: 'all', chapter: '接着问代价', headline: '如果知道会结束，接下来就问要多久' },
  { id: 'morph-a-b', map: 'morph-a-b', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: [], chapter: '从能不能算，到要算多久', headline: '在可判定的范围内，比较求解与验证' },
  { id: 'complexity-opening', map: 'complexity', focus: 'complexity-root', framing: 'node', mode: 'detail', detailKey: 'opening', visibleNodes: ['complexity-root'], visibleEdges: [], chapter: '计算复杂度', headline: '输入越来越大，代价怎样增长？' },
  { id: 'p-np-compare', map: 'complexity', focus: 'decidable', framing: 'subtree', mode: 'detail', detailKey: 'compare', visibleNodes: ['decidable', 'p', 'np'], visibleEdges: 'all', chapter: '$\\mathrm P$ 与 $\\mathrm{NP}$', headline: '快速求解，与快速验证' },
  { id: 'p-poly', map: 'complexity', focus: 'p', framing: 'node', mode: 'detail', detailKey: 'polynomial', visibleNodes: ['decidable', 'p'], visibleEdges: 'all', chapter: '$\\mathrm P$', headline: '固定次幂，是多项式时间的关键' },
  { id: 'p-maximum', map: 'complexity', focus: 'p', framing: 'node', mode: 'detail', detailKey: 'maximum', visibleNodes: ['decidable', 'p'], visibleEdges: 'all', chapter: '$\\mathrm P$ 的例子', headline: '找最大值，只要从头扫到尾' },
  { id: 'np-certificate', map: 'complexity', focus: 'np', framing: 'node', mode: 'detail', detailKey: 'certificate', visibleNodes: ['decidable', 'np'], visibleEdges: 'all', chapter: '$\\mathrm{NP}$', headline: '证据可以快速检查，寻找可以先尝试枚举' },
  { id: 'sat-meaning', map: 'complexity', focus: 'sat', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: ['np', 'sat'], visibleEdges: 'all', chapter: '$\\mathrm{SAT}$ · 布尔可满足性', headline: '有没有一种赋值，让公式为真？' },
  { id: 'sat-witness', map: 'complexity', focus: 'sat', framing: 'node', mode: 'detail', detailKey: 'witness', visibleNodes: ['np', 'sat'], visibleEdges: 'all', chapter: '$\\mathrm{SAT}$ 的证据', headline: '把赋值代进去，就能检查答案' },
  { id: 'p-vs-np', map: 'complexity', focus: 'open-question', framing: 'node', mode: 'detail', detailKey: 'question', visibleNodes: ['p', 'sat', 'open-question'], contextNodes: ['p'], visibleEdges: 'all', chapter: '仍然开放的问题', headline: '$\\mathrm P\\stackrel{?}{=}\\mathrm{NP}$：验证快，求解也能快吗？' },
  { id: 'complexity-overview', map: 'complexity', focus: 'decidable', framing: 'all', mode: 'overview', visibleNodes: cxNodes, visibleEdges: 'all', chapter: '回头看求解与验证', headline: '$\\mathrm P\\subseteq\\mathrm{NP}\\subseteq\\mathrm{Decidable}$：慢，不等于不可判定' },
  { id: 'before-morph-b', map: 'complexity', focus: 'complexity-root', framing: 'all', mode: 'overview', visibleNodes: cxNodes, visibleEdges: 'all', chapter: '把目光移向计算系统', headline: '理解了问题的代价，再看机器的能力' },
  { id: 'morph-b-c', map: 'morph-b-c', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: [], chapter: '从问题走向机器', headline: '怎样的系统能够表达通用计算？' },
  { id: 'turing-complete', map: 'universality', focus: 'turing-complete', framing: 'node', mode: 'detail', detailKey: 'simulation', visibleNodes: ['universality-root', 'turing-complete'], visibleEdges: 'all', chapter: '图灵完备', headline: '核心是能够模拟任意图灵机' },
  { id: 'resources', map: 'universality', focus: 'resources', framing: 'subtree', mode: 'detail', detailKey: 'ingredients', visibleNodes: ['resources', 'control', 'memory'], visibleEdges: 'all', chapter: '通用计算需要什么', headline: '保存状态，再让计算按状态继续展开' },
  { id: 'control-flow', map: 'universality', focus: 'control', framing: 'node', mode: 'detail', detailKey: 'flow', visibleNodes: ['resources', 'control'], visibleEdges: 'all', chapter: '分支、循环与递归', headline: '既能选择下一步，也能继续执行' },
  { id: 'boundary', map: 'universality', focus: 'boundary', framing: 'node', mode: 'detail', detailKey: 'limit', visibleNodes: ['turing-complete', 'boundary'], visibleEdges: 'all', chapter: '通用计算也有边界', headline: '能表达所有算法，仍无法判定停机问题' },
  { id: 'synthesis', map: 'universality', focus: 'universality-root', framing: 'all', mode: 'overview', visibleNodes: uniNodes, visibleEdges: 'all', chapter: '把三个问题放在一起', headline: '能力、代价与边界，各自回答不同的问题' },
]

export function getScene(step: number): TourScene {
  return tour[Math.min(Math.max(0, step), tour.length - 1)]
}
