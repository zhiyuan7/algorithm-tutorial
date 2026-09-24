import { knowledgeMaps } from './knowledge'
import type { KnowledgeNodeData, MapId, TourScene } from './types'

const valueTerms = ['value-root', 'term', 'operator', 'types']
const valueFunctions = ['value-root', 'functions', 'definition', 'effects', 'scope']
const valueReuse = ['value-root', 'reuse', 'multi-output', 'overload']
const judgmentRelations = ['judgment-root', 'relation-group', 'term-input', 'atomic', 'comparison']
const judgmentLogic = ['judgment-root', 'logic-group', 'connectives', 'short-circuit']
const judgmentLanguage = ['judgment-root', 'language-group', 'expression', 'bool-conversion']

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
  return { id, map, focus, detailKey, visibleNodes, visibleEdges: hierarchyIds(knowledgeMaps[map].root, visible), framing: 'node', mode: 'detail', chapter, headline }
}

export const tour: TourScene[] = [
  detail('opening', 'value-construction', 'value-root', 'opening', ['value-root'], '运算与函数', '运算符与函数，都是构造值的方法'),
  detail('term', 'value-construction', 'term', 'meaning', valueTerms, '项', '从变量和常量构造更复杂的项'),
  detail('operator', 'value-construction', 'operator', 'binary', valueTerms, '运算符', 'a + b 是二元运算的中缀写法'),
  detail('division', 'value-construction', 'types', 'division', valueTerms, '类型', '同一个除号，结果取决于输入类型'),
  detail('power', 'value-construction', 'types', 'power', valueTerms, '类型', '^ 是异或，不是乘方'),
  detail('composition', 'value-construction', 'functions', 'composition', valueFunctions, '函数', '基本运算组合成新的计算'),
  detail('definition', 'value-construction', 'definition', 'add', valueFunctions, '函数定义', '接口说明输入与输出'),
  detail('effects', 'value-construction', 'effects', 'state', valueFunctions, '副作用', '程序函数还可以改变状态'),
  detail('scope', 'value-construction', 'scope', 'names', valueFunctions, '作用域', '函数也封装名字'),
  { id: 'functions-summary', map: 'value-construction', focus: 'functions', framing: 'subtree', mode: 'summary', visibleNodes: valueFunctions, visibleEdges: hierarchyIds(knowledgeMaps['value-construction'].root, new Set(valueFunctions)), chapter: '函数完成', headline: '函数同时封装计算、状态与名字' },
  detail('multi-output', 'value-construction', 'multi-output', 'methods', valueReuse, '多值输出', '打包返回，或写入调用者对象'),
  detail('overload', 'value-construction', 'overload', 'selection', valueReuse, '重载', '参数列表决定调用哪个版本'),
  { id: 'value-overview', map: 'value-construction', focus: 'value-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: 'all', chapter: '第一张知识图谱', headline: '值由运算构造，由函数封装与复用' },
  { id: 'before-morph', map: 'value-construction', focus: 'value-root', framing: 'all', mode: 'concept', visibleNodes: 'all', visibleEdges: 'all', chapter: '视角转换', headline: '构造出的值，如何进入真假判断？' },
  { id: 'value-to-judgment', map: 'morph', focus: 'judgment-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: [], chapter: '语义过渡', headline: '项、函数调用与类型规则进入判断世界' },
  { id: 'judgment-entry', map: 'judgment-expression', focus: 'judgment-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: 'all', chapter: '第二张知识图谱', headline: '关系形成判断，逻辑组合条件，语言统一表达式' },
  detail('term-input', 'judgment-expression', 'term-input', 'bridge', judgmentRelations, '项', '关系先接收两个已经构造好的值'),
  detail('atomic', 'judgment-expression', 'atomic', 'relation', judgmentRelations, '原子公式', '关系把项变成可判真假的陈述'),
  detail('comparison', 'judgment-expression', 'comparison', 'operators', judgmentRelations, '关系运算', '比较在 C++ 中产生 bool 值'),
  detail('connectives', 'judgment-expression', 'connectives', 'combine', judgmentLogic, '逻辑', '联结词把简单判断组合起来'),
  detail('short-circuit', 'judgment-expression', 'short-circuit', 'safety', judgmentLogic, '短路', '逻辑结果还控制右侧是否执行'),
  detail('expression', 'judgment-expression', 'expression', 'unified', judgmentLanguage, '表达式', 'C/C++ 用表达式统一这些结构'),
  detail('bool-conversion', 'judgment-expression', 'bool-conversion', 'context', judgmentLanguage, '布尔转换', '条件上下文允许类型转换'),
  { id: 'judgment-overview', map: 'judgment-expression', focus: 'judgment-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: 'all', chapter: '第二张知识图谱', headline: '值、判断与表达式形成一条构造链' },
]

export function getScene(step: number): TourScene {
  return tour[Math.min(Math.max(0, step), tour.length - 1)]
}
