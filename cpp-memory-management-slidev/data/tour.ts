import type { TourScene } from './types'

export const tour: TourScene[] = [
  { id: 'opening', map: 'storage', focus: 'memory-root', framing: 'node', mode: 'detail', detailKey: 'opening', visibleNodes: ['memory-root'], visibleEdges: [], chapter: '内存管理', headline: '数据如何存在于内存中' },
  { id: 'address', map: 'storage', focus: 'representation', framing: 'node', mode: 'detail', detailKey: 'address', visibleNodes: ['memory-root', 'representation'], visibleEdges: ['h-memory-root-representation'], chapter: '地址与类型', headline: '常见类型占多少空间？' },
  { id: 'array', map: 'storage', focus: 'array', framing: 'node', mode: 'detail', detailKey: 'layout', visibleNodes: ['memory-root', 'representation', 'array'], visibleEdges: ['h-memory-root-representation', 'h-representation-array'], chapter: '数组', headline: '同类型的元素，连续放在一起' },
  { id: 'struct', map: 'storage', focus: 'struct', framing: 'node', mode: 'detail', detailKey: 'layout', visibleNodes: ['memory-root', 'representation', 'struct'], visibleEdges: ['h-memory-root-representation', 'h-representation-struct'], chapter: '结构体', headline: '不同类型的成员，还要考虑对齐' },
  { id: 'choice', map: 'storage', focus: 'lifetime', framing: 'node', mode: 'detail', detailKey: 'choice', visibleNodes: ['memory-root', 'lifetime'], visibleEdges: ['h-memory-root-lifetime'], chapter: '存储期', headline: '为什么不把所有对象都动态分配' },
  { id: 'static', map: 'storage', focus: 'static', framing: 'node', mode: 'detail', detailKey: 'behavior', visibleNodes: ['memory-root', 'lifetime', 'static'], visibleEdges: ['h-memory-root-lifetime', 'h-lifetime-static'], chapter: '静态存储期', headline: '多次调用，继续使用同一个对象' },
  { id: 'automatic', map: 'storage', focus: 'automatic', framing: 'node', mode: 'detail', detailKey: 'behavior', visibleNodes: ['memory-root', 'lifetime', 'static', 'automatic'], visibleEdges: ['h-memory-root-lifetime', 'h-lifetime-static', 'h-lifetime-automatic'], chapter: '自动存储期', headline: '退出内层作用域，外层对象仍然存在' },
  { id: 'dynamic', map: 'storage', focus: 'dynamic', framing: 'node', mode: 'detail', detailKey: 'need', visibleNodes: ['memory-root', 'lifetime', 'static', 'automatic', 'dynamic'], visibleEdges: ['h-memory-root-lifetime', 'h-lifetime-static', 'h-lifetime-automatic', 'h-lifetime-dynamic', 'r-automatic-dynamic'], chapter: '动态存储期', headline: '规模与释放时机在运行时决定' },
  { id: 'scope', map: 'storage', focus: 'lifetime', framing: 'node', mode: 'detail', detailKey: 'distinction', visibleNodes: ['memory-root', 'lifetime'], visibleEdges: ['h-memory-root-lifetime'], chapter: '作用域与存储期', headline: '名字看得见，不等于对象才存在' },
  { id: 'pointer', map: 'storage', focus: 'pointer', framing: 'node', mode: 'detail', detailKey: 'address', visibleNodes: ['memory-root', 'lifetime', 'static', 'automatic', 'dynamic', 'pointer'], visibleEdges: ['h-memory-root-lifetime', 'h-lifetime-static', 'h-lifetime-automatic', 'h-lifetime-dynamic', 'h-dynamic-pointer', 'r-automatic-dynamic'], chapter: '地址被保存', headline: '指针与被指向对象各有自己的存储期' },
  { id: 'before-morph', map: 'storage', focus: 'dynamic', framing: 'all', mode: 'concept', visibleNodes: 'all', visibleEdges: 'all', chapter: '回顾与下一步', headline: '动态存储带来新的问题：谁负责释放' },
  { id: 'ownership-morph', map: 'morph', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: [], chapter: '从生命期到释放责任', headline: '从存储期转向资源所有权' },
  { id: 'ownership-opening', map: 'ownership', focus: 'ownership-root', framing: 'node', mode: 'detail', detailKey: 'opening', visibleNodes: ['ownership-root'], visibleEdges: [], chapter: '动态资源', headline: '谁拥有动态对象' },
  { id: 'malloc', map: 'ownership', focus: 'malloc', framing: 'node', mode: 'detail', detailKey: 'mechanism', visibleNodes: ['ownership-root', 'malloc'], visibleEdges: ['h-ownership-root-malloc'], chapter: 'C 的分配接口', headline: 'malloc 只负责申请原始字节' },
  { id: 'new', map: 'ownership', focus: 'new', framing: 'node', mode: 'detail', detailKey: 'mechanism', visibleNodes: ['ownership-root', 'new'], visibleEdges: ['h-ownership-root-new'], chapter: 'C++ 的对象语义', headline: 'new 不只分配空间，还负责初始化对象' },
  { id: 'risk', map: 'ownership', focus: 'risk', framing: 'node', mode: 'detail', detailKey: 'leak', visibleNodes: ['ownership-root', 'new', 'risk'], visibleEdges: ['h-ownership-root-new', 'h-ownership-root-risk', 'r-new-risk'], chapter: '内存泄漏', headline: '提前返回之后，谁来执行 delete？' },
  { id: 'raii', map: 'ownership', focus: 'raii', framing: 'node', mode: 'detail', detailKey: 'principle', visibleNodes: ['ownership-root', 'risk', 'raii'], visibleEdges: ['h-ownership-root-risk', 'h-ownership-root-raii', 'r-risk-raii'], chapter: 'RAII', headline: '把释放责任交给对象的析构函数' },
  { id: 'unique', map: 'ownership', focus: 'unique', framing: 'node', mode: 'detail', detailKey: 'transfer', visibleNodes: ['ownership-root', 'raii', 'unique'], visibleEdges: ['h-ownership-root-raii', 'h-raii-unique'], chapter: '唯一所有权', headline: 'unique_ptr 可以移动，不能复制' },
  { id: 'shared', map: 'ownership', focus: 'shared', framing: 'node', mode: 'detail', detailKey: 'count', visibleNodes: ['ownership-root', 'raii', 'unique', 'shared'], visibleEdges: ['h-ownership-root-raii', 'h-raii-unique', 'h-raii-shared'], chapter: '共享所有权', headline: 'shared_ptr 在最后一个所有者消失时释放' },
  { id: 'ownership-summary', map: 'ownership', focus: 'raii', framing: 'all', mode: 'summary', visibleNodes: 'all', visibleEdges: 'all', chapter: '从接口到责任', headline: '先确定谁负责释放，再选择管理方式' },
]

export function getScene(step: number): TourScene {
  return tour[Math.min(Math.max(0, step), tour.length - 1)]
}
