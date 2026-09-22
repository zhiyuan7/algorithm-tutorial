import type { TourScene } from './types'

const compNodes = ['computability-root', 'recognizable', 'decidable', 'atm', 'diagonal']
const compEdges = ['h-computability-root-recognizable', 'h-recognizable-decidable', 'h-recognizable-atm', 'h-recognizable-diagonal', 'r-decidable-recognizable', 'r-atm-diagonal']
const cxNodes = ['complexity-root', 'decidable', 'np', 'p', 'sat', 'exponential', 'open-question']
const cxEdges = ['h-complexity-root-decidable', 'h-decidable-np', 'h-np-p', 'h-np-sat', 'h-np-open-question', 'h-sat-exponential', 'r-p-np', 'r-sat-exponential', 'r-open-p']
const uniNodes = ['universality-root', 'turing-complete', 'resources', 'branching', 'memory', 'unbounded-loop', 'factorial', 'boundary']
const uniEdges = ['h-universality-root-turing-complete', 'h-turing-complete-resources', 'h-turing-complete-boundary', 'h-resources-branching', 'h-resources-memory', 'h-resources-unbounded-loop', 'h-resources-factorial', 'r-resources-factorial', 'r-complete-boundary']

export const tour: TourScene[] = [
  { id: 'opening', map: 'computability', focus: 'computability-root', framing: 'node', mode: 'detail', detailKey: 'opening', visibleNodes: ['computability-root'], visibleEdges: [], chapter: '第一问 · 可计算性', headline: '算法究竟承诺什么？' },
  { id: 'recognizable', map: 'computability', focus: 'recognizable', framing: 'subtree', mode: 'detail', detailKey: 'promise', visibleNodes: ['computability-root', 'recognizable', 'atm'], visibleEdges: ['h-computability-root-recognizable', 'h-recognizable-atm'], chapter: 'Recognizable', headline: 'YES 会被认出，NO 可能永远等待' },
  { id: 'decidable', map: 'computability', focus: 'decidable', framing: 'node', mode: 'detail', detailKey: 'guarantee', visibleNodes: ['computability-root', 'recognizable', 'decidable'], visibleEdges: ['h-computability-root-recognizable', 'h-recognizable-decidable'], chapter: 'Decidable', headline: 'YES 与 NO 都必须在有限时间内结束' },
  { id: 'inclusion', map: 'computability', focus: 'recognizable', framing: 'all', mode: 'detail', detailKey: 'inclusion', visibleNodes: compNodes, visibleEdges: compEdges.slice(0, 5), chapter: '严格包含', headline: '可判定比可识别要求更强' },
  { id: 'atm-simulate', map: 'computability', focus: 'atm', framing: 'node', mode: 'detail', detailKey: 'simulate', visibleNodes: compNodes, visibleEdges: compEdges, chapter: 'A_TM', headline: '模拟可以看见接受' },
  { id: 'atm-halt', map: 'computability', focus: 'atm', framing: 'node', mode: 'detail', detailKey: 'haltCorrection', visibleNodes: compNodes, visibleEdges: compEdges, chapter: 'A_TM ≠ HALT_TM', headline: '接受与停机不是同一个事件' },
  { id: 'diag-assume', map: 'computability', focus: 'diagonal', framing: 'node', mode: 'detail', detailKey: 'assume', visibleNodes: compNodes, visibleEdges: compEdges, chapter: '对角线反证 · 1', headline: '先假设万能判定器 H 存在' },
  { id: 'diag-invert', map: 'computability', focus: 'diagonal', framing: 'node', mode: 'detail', detailKey: 'invert', visibleNodes: compNodes, visibleEdges: compEdges, chapter: '对角线反证 · 2', headline: '构造一台专门反转预测的机器 D' },
  { id: 'diag-self', map: 'computability', focus: 'diagonal', framing: 'node', mode: 'detail', detailKey: 'self', visibleNodes: compNodes, visibleEdges: compEdges, chapter: '对角线反证 · 3', headline: '让 D 读取自己，矛盾出现' },
  { id: 'computability-overview', map: 'computability', focus: 'computability-root', framing: 'all', mode: 'overview', visibleNodes: compNodes, visibleEdges: compEdges, chapter: '图谱 A · 能力边界', headline: 'Decidable ⊊ Recognizable' },
  { id: 'before-morph-a', map: 'computability', focus: 'decidable', framing: 'all', mode: 'summary', visibleNodes: compNodes, visibleEdges: compEdges, dimNodes: ['atm', 'diagonal'], chapter: '视角转换', headline: '确认会结束之后，才有“要多久”' },
  { id: 'morph-a-b', map: 'morph-a-b', focus: 'decidable', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: [], chapter: '变形过渡 A → B', headline: '从停机保证，转向资源增长' },
  { id: 'complexity-opening', map: 'complexity', focus: 'complexity-root', framing: 'node', mode: 'detail', detailKey: 'opening', visibleNodes: ['complexity-root', 'decidable'], visibleEdges: ['h-complexity-root-decidable'], chapter: '第二问 · 复杂度', headline: '输入变大时，代价怎样增长？' },
  { id: 'p-poly', map: 'complexity', focus: 'p', framing: 'node', mode: 'detail', detailKey: 'polynomial', visibleNodes: ['complexity-root', 'decidable', 'np', 'p'], visibleEdges: cxEdges.slice(0, 3), chapter: 'P', headline: '固定次幂定义多项式时间' },
  { id: 'p-maximum', map: 'complexity', focus: 'p', framing: 'node', mode: 'detail', detailKey: 'maximum', visibleNodes: ['complexity-root', 'decidable', 'np', 'p'], visibleEdges: cxEdges.slice(0, 3), chapter: 'P · 例子', headline: '一次扫描找到最大值' },
  { id: 'exponential', map: 'complexity', focus: 'exponential', framing: 'node', mode: 'detail', detailKey: 'bruteForce', visibleNodes: cxNodes, visibleEdges: cxEdges, chapter: '指数代价', headline: '2^n 很慢，但搜索仍会结束' },
  { id: 'np-certificate', map: 'complexity', focus: 'np', framing: 'subtree', mode: 'detail', detailKey: 'certificate', visibleNodes: cxNodes, visibleEdges: cxEdges, chapter: 'NP', headline: '给出证据后，YES 可以快速验证' },
  { id: 'sat-witness', map: 'complexity', focus: 'sat', framing: 'node', mode: 'detail', detailKey: 'witness', visibleNodes: cxNodes, visibleEdges: cxEdges, chapter: 'SAT', headline: '布尔赋值就是可检查的证据' },
  { id: 'p-subset', map: 'complexity', focus: 'p', framing: 'all', mode: 'detail', detailKey: 'subset', visibleNodes: cxNodes, visibleEdges: cxEdges, chapter: 'P ⊆ NP', headline: '会快速求解，当然会快速验证' },
  { id: 'p-vs-np', map: 'complexity', focus: 'open-question', framing: 'node', mode: 'detail', detailKey: 'question', visibleNodes: cxNodes, visibleEdges: cxEdges, chapter: '开放问题', headline: '快速验证是否等于快速找到？' },
  { id: 'complexity-overview', map: 'complexity', focus: 'decidable', framing: 'all', mode: 'detail', detailKey: 'finite', visibleNodes: cxNodes, visibleEdges: cxEdges, chapter: '图谱 B · 资源层级', headline: '很慢，不等于不可计算' },
  { id: 'before-morph-b', map: 'complexity', focus: 'complexity-root', framing: 'all', mode: 'overview', visibleNodes: cxNodes, visibleEdges: cxEdges, chapter: '视角转换', headline: '从问题属于哪一类，转向机器能表达什么' },
  { id: 'morph-b-c', map: 'morph-b-c', focus: 'turing-complete', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: [], chapter: '变形过渡 B → C', headline: '资源分类折叠为计算系统的能力' },
  { id: 'turing-complete', map: 'universality', focus: 'turing-complete', framing: 'subtree', mode: 'detail', detailKey: 'simulation', visibleNodes: ['universality-root', 'turing-complete', 'resources', 'boundary'], visibleEdges: uniEdges.slice(0, 3), chapter: '第三问 · 图灵完备', headline: '核心是模拟任意图灵机' },
  { id: 'resources', map: 'universality', focus: 'resources', framing: 'subtree', mode: 'detail', detailKey: 'ingredients', visibleNodes: uniNodes, visibleEdges: uniEdges, chapter: '通用计算的构件', headline: '分支、存储与无界展开' },
  { id: 'factorial', map: 'universality', focus: 'factorial', framing: 'node', mode: 'detail', detailKey: 'growth', visibleNodes: uniNodes, visibleEdges: uniEdges, chapter: 'n! 示例', headline: '输入增长，数据与步骤都继续增长' },
  { id: 'boundary', map: 'universality', focus: 'boundary', framing: 'node', mode: 'detail', detailKey: 'limit', visibleNodes: uniNodes, visibleEdges: uniEdges, chapter: '能力边界', headline: '图灵完备不等于无所不能' },
  { id: 'synthesis', map: 'universality', focus: 'universality-root', framing: 'all', mode: 'overview', visibleNodes: uniNodes, visibleEdges: uniEdges, chapter: '图谱 C · 综合', headline: '能力、代价与边界是三件事' },
]

export function getScene(step: number): TourScene {
  return tour[Math.min(Math.max(0, step), tour.length - 1)]
}
