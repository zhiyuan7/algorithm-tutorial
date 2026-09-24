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

function detail(id: string, map: MapId, focus: string, detailKey: string, visibleNodes: string[], chapter: string, headline: string): TourScene {
  const visible = new Set(visibleNodes)
  const edges = hierarchyIds(knowledgeMaps[map].root, visible)
  if (map === 'control-flow' && visible.has('while')) edges.push('r-while-back')
  return { id, map, focus, detailKey, visibleNodes, visibleEdges: edges, framing: 'node', mode: 'detail', chapter, headline }
}

function summary(id: string, map: MapId, focus: string, visibleNodes: string[], chapter: string, headline: string): TourScene {
  const edges = hierarchyIds(knowledgeMaps[map].root, new Set(visibleNodes))
  if (map === 'control-flow' && visibleNodes.includes('while')) edges.push('r-while-back')
  return { id, map, focus, framing: 'subtree', mode: 'summary', visibleNodes, visibleEdges: edges, chapter, headline }
}

export const tour: TourScene[] = [
  detail('opening', 'control-flow', 'flow-root', 'opening', ['flow-root'], '程序执行顺序', '程序执行完当前语句，下一步去哪里？'),
  detail('sequence', 'control-flow', 'sequence', 'meaning', sequenceNodes, '顺序', '默认路径是一条向前的时间线'),
  detail('default-order', 'control-flow', 'default-order', 'trace', sequenceNodes, '顺序', '定义、计算与输出依次发生'),
  detail('state-order', 'control-flow', 'state-order', 'reorder', sequenceNodes, '状态', '调换语句，结果就会不同'),
  summary('sequence-summary', 'control-flow', 'sequence', sequenceNodes, '顺序完成', '次序与状态一起决定结果'),
  detail('choice', 'control-flow', 'choice', 'meaning', choiceNodes, '选择', '条件把执行路径分成不同分支'),
  detail('if-one', 'control-flow', 'if-branch', 'one', choiceNodes, 'if', '条件为真才执行这一段'),
  detail('if-two', 'control-flow', 'if-branch', 'two', choiceNodes, 'if...else', '两个分支只会执行一个'),
  detail('first-match', 'control-flow', 'first-match', 'grades', choiceNodes, 'else if', '多分支选择第一个成立条件'),
  detail('switch', 'control-flow', 'switch', 'menu', choiceNodes, 'switch', '按离散值进入对应 case'),
  summary('choice-summary', 'control-flow', 'choice', choiceNodes, '选择完成', '单路、二路和多路都由条件决定路径'),
  detail('loop', 'control-flow', 'loop', 'meaning', loopNodes, '循环', '重复来自条件判断与回跳'),
  detail('while', 'control-flow', 'while', 'mechanism', loopNodes, 'while', '判断、执行、回跳，再次判断'),
  detail('while-state', 'control-flow', 'while', 'termination', loopNodes, '循环状态', '状态更新决定能否退出循环'),
  detail('for', 'control-flow', 'for', 'anatomy', loopNodes, 'for', '把初始化、条件与更新放在一起'),
  detail('for-while', 'control-flow', 'for', 'equivalence', loopNodes, '循环选型', '次数明确常用 for，条件驱动常用 while'),
  detail('break', 'control-flow', 'escape', 'break', loopNodes, 'break', '提前离开当前循环'),
  detail('continue', 'control-flow', 'escape', 'continue', loopNodes, 'continue', '跳过本轮剩余语句'),
  summary('loop-summary', 'control-flow', 'loop', loopNodes, '循环完成', '回跳、三段结构与局部改道共同控制重复'),
  { id: 'flow-overview', map: 'control-flow', focus: 'flow-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: 'all', chapter: '第一张知识图谱', headline: '顺序向前，选择分叉，循环回跳' },
  { id: 'before-morph', map: 'control-flow', focus: 'flow-root', framing: 'all', mode: 'concept', visibleNodes: 'all', visibleEdges: 'all', chapter: '视角转换', headline: '三种局部结构，如何组成完整程序？' },
  { id: 'flow-to-assembly', map: 'morph', focus: 'assembly-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: [], chapter: '语义过渡', headline: '从执行机制走向算法构造' },
  { id: 'assembly-entry', map: 'algorithm-assembly', focus: 'assembly-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: 'all', chapter: '第二张知识图谱', headline: '嵌套构造程序，控制路径实现数学结果' },
  detail('outer-order', 'algorithm-assembly', 'outer-order', 'flow', programNodes, '外层顺序', '完整程序仍然按阶段推进'),
  detail('nesting', 'algorithm-assembly', 'program', 'nesting', programNodes, '结构嵌套', '循环内部可以继续选择'),
  detail('positive-count', 'algorithm-assembly', 'positive-count', 'example', programNodes, '正数计数', '五轮输入中，只有正数增加计数'),
  detail('piecewise', 'algorithm-assembly', 'piecewise', 'absolute', mathNodes, '分段函数', '选择结构实现分段定义'),
  detail('summation', 'algorithm-assembly', 'summation', 'accumulate', mathNodes, '有限求和', '循环结构实现逐项累积'),
  { id: 'assembly-overview', map: 'algorithm-assembly', focus: 'assembly-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: 'all', chapter: '最终知识图谱', headline: '数学描述结果，程序给出执行路径' },
]

export function getScene(step: number): TourScene {
  return tour[Math.min(Math.max(0, step), tour.length - 1)]
}
