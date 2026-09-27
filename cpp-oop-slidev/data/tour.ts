import { knowledgeMaps } from './knowledge'
import type { KnowledgeNodeData, MapId, TourScene } from './types'

function edgesFor(map: MapId, visible: string[]) {
  const ids = new Set(visible)
  const result: string[] = []
  function walk(node: KnowledgeNodeData) {
    node.children?.forEach(child => {
      if (ids.has(node.id) && ids.has(child.id)) result.push(`h-${node.id}-${child.id}`)
      walk(child)
    })
  }
  walk(knowledgeMaps[map].root)
  knowledgeMaps[map].relations.forEach(edge => {
    if (ids.has(edge.source) && ids.has(edge.target)) result.push(edge.id)
  })
  return result
}
function s(id: string, map: MapId, focus: string, mode: TourScene['mode'], chapter: string, headline: string, visibleNodes: string[], detailKey?: string, framing: TourScene['framing'] = 'node'): TourScene {
  return { id, map, focus, mode, chapter, headline, visibleNodes, visibleEdges: edgesFor(map, visibleNodes), detailKey, framing }
}
const o = ['object-root']
const oc = [...o, 'construction']
const oi = [...oc, 'initialization']
const ol = [...oi, 'lifetime']
const od = [...ol, 'defaults']
const oe = [...od, 'encapsulation']
const ov = [...oe, 'process-reuse']
const oa = [...ov, 'stable-interface']
const t = ['types-root']
const ti = [...t, 'inheritance']
const tr = [...ti, 'reuse']
const tk = [...tr, 'contract']
const td = [...tk, 'dispatch']
const tv = [...td, 'virtual-table']
const tf = [...tv, 'factory']
const ta = [...tf, 'virtual-dtor']
export const tour: TourScene[] = [
  s('opening', 'object', 'object-root', 'detail', '面向对象', '让机器人自己管理状态和行为', o, 'opening'),
  s('construct', 'object', 'construction', 'detail', '构造函数', '默认可以有，也可以自己写', oc, 'main'),
  s('init-direct', 'object', 'initialization', 'detail', '初始化列表', '直接初始化，少做一次多余的工作', oi, 'direct'),
  s('init-required', 'object', 'initialization', 'detail', '初始化列表', '有些成员必须在建立时初始化', oi, 'required'),
  s('lifetime', 'object', 'lifetime', 'detail', '生命周期', '对象离开时，析构负责收尾', ol, 'destruction'),
  s('raii', 'object', 'lifetime', 'detail', 'RAII', '让资源跟着对象的生命周期走', ol, 'raii'),
  s('defaults', 'object', 'defaults', 'detail', '默认与禁用', '把允许和不允许的操作写清楚', od, 'policy'),
  s('boundary', 'object', 'encapsulation', 'detail', '封装', '把过程打包，把入口管好', oe, 'boundary'),
  s('process-reuse', 'object', 'process-reuse', 'detail', '为什么封装 · 复用过程', '重复的处理步骤，只用写一次', ov, 'process'),
  s('stable-api', 'object', 'stable-interface', 'detail', '为什么封装 · 控制接口', '入口保持稳定，内部更容易扩展', oa, 'representation'),
  s('branch-summary', 'object', 'encapsulation', 'summary', '回顾封装', '复用过程，控制接口', [...o, 'encapsulation', 'process-reuse', 'stable-interface'], undefined, 'subtree'),
  s('object-overview', 'object', 'object-root', 'overview', '回顾对象', '构造、生命周期与封装一起照顾对象', oa, undefined, 'all'),
  s('types-overview', 'types', 'types-root', 'overview', '类型怎样协作', '选择合适的关系，使用共同的接口', ta, undefined, 'all'),
  s('inheritance', 'types', 'inheritance', 'detail', '继承与组合', '是一种用继承，有一个用组合', ti, 'is_a'),
  s('reuse', 'types', 'reuse', 'detail', '派生类能力', '沿用已有功能，再添加自己的能力', tr, 'extension'),
  s('nonvirtual', 'types', 'contract', 'detail', '函数契约 · 非虚函数', '先看三种函数怎么声明', tk, 'nonvirtual'),
  s('virtual', 'types', 'contract', 'detail', '函数契约 · 虚函数', '基类写 virtual，重写时写 override', tk, 'virtual'),
  s('pure', 'types', 'contract', 'detail', '函数契约 · 纯虚函数', '加上 = 0，让具体派生类提供实现', tk, 'pure'),
  s('dispatch', 'types', 'dispatch', 'detail', '动态分派', '同一句调用，机器人做出不同动作', td, 'attack'),
  s('vtable-layout', 'types', 'virtual-table', 'detail', '动态分派 · 常见实现', '对象里的指针，连到自己的虚函数表', tv, 'layout'),
  s('vtable-call', 'types', 'virtual-table', 'detail', '动态分派 · 调用过程', '沿着指针和表项，找到实际执行的函数', tv, 'lookup'),
  s('factory', 'types', 'factory', 'detail', '工厂函数', '具体怎么创建，交给工厂决定', tf, 'creation'),
  s('virtual-dtor', 'types', 'virtual-dtor', 'detail', '虚析构', '通过基类接口，也要完整地销毁对象', ta, 'deletion'),
  s('destruction-order', 'types', 'virtual-dtor', 'detail', '构造与析构', '先建立基类，最后结束基类', ta, 'order'),
  s('types-final', 'types', 'types-root', 'overview', '回顾类型协作', '合适的关系，加上稳定的共同接口', ta, undefined, 'all'),
]
export function getScene(step: number): TourScene { return tour[Math.min(Math.max(0, step), tour.length - 1)] }
