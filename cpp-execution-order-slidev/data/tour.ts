import { knowledgeMaps } from './knowledge'
import type { KnowledgeNodeData, MapId, TourScene } from './types'

const sequenceNodes = ['flow-root', 'sequence', 'default-order', 'state-order']
const choiceNodes = ['flow-root', 'choice', 'if-branch', 'first-match', 'switch']
const loopNodes = ['flow-root', 'loop', 'while', 'for', 'escape']
const programNodes = ['assembly-root', 'program', 'outer-order', 'positive-count']
const mathNodes = ['assembly-root', 'math', 'piecewise', 'summation']

function hierarchyIds(root: KnowledgeNodeData, visible: Set<string>): string[] {
  const result: string[] = []
  function visit(node: KnowledgeNodeData) {
    for (const child of node.children ?? []) {
      if (visible.has(node.id) && visible.has(child.id)) result.push(`h-${node.id}-${child.id}`)
      visit(child)
    }
  }
  visit(root)
  return result
}

// Introductory scenes show the branch; examples retain only their ancestry.
function detail(id: string, map: MapId, focus: string, detailKey: string, branchNodes: string[], chapter: string, headline: string): TourScene {
  const mapData = knowledgeMaps[map]
  const lineage = new Set<string>()
  function find(node: KnowledgeNodeData, ancestors: string[]): boolean {
    if (node.id === focus) {
      [...ancestors, node.id].forEach(id => lineage.add(id))
      return true
    }
    return node.children?.some(child => find(child, [...ancestors, node.id])) ?? false
  }
  find(mapData.root, [])
  const visibleNodes = ['meaning', 'nesting'].includes(detailKey)
    ? branchNodes
    : branchNodes.filter(id => lineage.has(id))
  // Keep the alternate loop visible when comparing the two forms.
  if (detailKey === 'equivalence') visibleNodes.push('while')
  const visible = new Set(visibleNodes)
  const visibleEdges = hierarchyIds(mapData.root, visible)
  visibleEdges.push(...mapData.relations
    .filter(edge => visible.has(edge.source) && visible.has(edge.target))
    .map(edge => edge.id))
  return { id, map, focus, detailKey, visibleNodes, visibleEdges, framing: 'node', mode: 'detail', chapter, headline }
}

export const tour: TourScene[] = [
  detail('opening', 'control-flow', 'flow-root', 'opening', ['flow-root'], '执行顺序', '这一句执行完，接下来去哪儿？'),
  detail('sequence', 'control-flow', 'sequence', 'meaning', sequenceNodes, '顺序执行', '没有岔路时，就一条一条往下走'),
  detail('default-order', 'control-flow', 'default-order', 'trace', sequenceNodes, '顺序执行', '先定义，再计算，最后输出'),
  detail('state-order', 'control-flow', 'state-order', 'reorder', sequenceNodes, '语句的次序', '换一下顺序，结果会变吗？'),
  detail('choice', 'control-flow', 'choice', 'meaning', choiceNodes, '选择执行', '到了条件判断处，程序开始选路'),
  detail('if-one', 'control-flow', 'if-branch', 'one', choiceNodes, 'if', '条件成立，才执行这一段'),
  detail('if-two', 'control-flow', 'if-branch', 'two', choiceNodes, 'if...else', '两条路，只走其中一条'),
  detail('first-match', 'control-flow', 'first-match', 'grades', choiceNodes, 'else if', '从上往下，找到第一个成立的条件'),
  detail('switch', 'control-flow', 'switch', 'menu', choiceNodes, 'switch', '选项是几，就进入对应的 case'),
  detail('loop', 'control-flow', 'loop', 'meaning', loopNodes, '循环执行', '同一段操作，怎样重复做？'),
  detail('while', 'control-flow', 'while', 'mechanism', loopNodes, 'while 循环', '先检查条件，做完一轮再检查'),
  detail('while-state', 'control-flow', 'while', 'termination', loopNodes, '循环何时结束', '状态变了，循环才有机会停下来'),
  detail('for', 'control-flow', 'for', 'anatomy', loopNodes, 'for 循环', '起点、条件、更新，都写在这一行'),
  detail('for-while', 'control-flow', 'for', 'equivalence', loopNodes, '选择循环写法', '怎样写，能让重复的过程更清楚？'),
  detail('break', 'control-flow', 'escape', 'break', loopNodes, 'break', '做到这里，提前结束循环'),
  detail('continue', 'control-flow', 'escape', 'continue', loopNodes, 'continue', '这一轮先跳过，继续下一轮'),
  { id: 'loop-summary', map: 'control-flow', focus: 'flow-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: 'all', chapter: '回头看执行路径', headline: '往下走、选一条路、再做一轮' },
  { id: 'before-morph', map: 'control-flow', focus: 'flow-root', framing: 'all', mode: 'concept', visibleNodes: 'all', visibleEdges: 'all', chapter: '把结构组合起来', headline: '这三种走法，怎样组成一个完整程序？' },
  { id: 'flow-to-assembly', map: 'morph', focus: 'assembly-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: [], chapter: '从走法到用法', headline: '把执行路径用在完整的计算里' },
  detail('nesting', 'algorithm-assembly', 'program', 'nesting', programNodes, '结构嵌套', '一个数正数的程序，三种结构都用上了'),
  detail('piecewise', 'algorithm-assembly', 'piecewise', 'absolute', mathNodes, '分段函数', '绝对值的两段定义，对应两条分支'),
  detail('summation', 'algorithm-assembly', 'summation', 'accumulate', mathNodes, '有限求和', '每次加一项，循环就算出了总和'),
  { id: 'assembly-overview', map: 'algorithm-assembly', focus: 'assembly-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: 'all', chapter: '回头看完整程序', headline: '数学写出要算什么，程序写出一步步怎样算' },
]

export function getScene(step: number): TourScene {
  return tour[Math.min(Math.max(0, step), tour.length - 1)]
}
