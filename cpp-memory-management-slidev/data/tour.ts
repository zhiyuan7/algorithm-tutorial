import type { TourScene } from './types'

const storageAll = ['memory-root', 'representation', 'lifetime', 'static', 'automatic', 'dynamic', 'pointer']
const storageEdges = ['h-memory-root-representation', 'h-memory-root-lifetime', 'h-lifetime-static', 'h-lifetime-automatic', 'h-lifetime-dynamic', 'h-dynamic-pointer', 'r-automatic-dynamic']
const ownershipAll = ['ownership-root', 'malloc', 'new', 'risk', 'raii', 'unique', 'shared']
const ownershipEdges = ['h-ownership-root-malloc', 'h-ownership-root-new', 'h-ownership-root-risk', 'h-ownership-root-raii', 'h-raii-unique', 'h-raii-shared', 'r-malloc-new', 'r-new-risk', 'r-risk-raii']

export const tour: TourScene[] = [
  { id: 'opening', map: 'storage', focus: 'memory-root', framing: 'node', mode: 'detail', detailKey: 'opening', visibleNodes: ['memory-root'], visibleEdges: [], chapter: '内存管理', headline: '数据如何存在于内存中' },
  { id: 'address', map: 'storage', focus: 'representation', framing: 'node', mode: 'detail', detailKey: 'address', visibleNodes: ['memory-root', 'representation'], visibleEdges: ['h-memory-root-representation'], chapter: '地址与类型', headline: '名字最终通向一段地址' },
  { id: 'layout', map: 'storage', focus: 'representation', framing: 'node', mode: 'detail', detailKey: 'layout', visibleNodes: ['memory-root', 'representation'], visibleEdges: ['h-memory-root-representation'], chapter: '数组与结构体', headline: '连续排列与对齐填充' },
  { id: 'choice', map: 'storage', focus: 'lifetime', framing: 'node', mode: 'detail', detailKey: 'choice', visibleNodes: ['memory-root', 'lifetime'], visibleEdges: ['h-memory-root-lifetime'], chapter: '存储期', headline: '为什么不把所有对象都动态分配' },
  { id: 'scope', map: 'storage', focus: 'lifetime', framing: 'node', mode: 'detail', detailKey: 'distinction', visibleNodes: ['memory-root', 'lifetime'], visibleEdges: ['h-memory-root-lifetime'], chapter: '作用域 ≠ 存储期', headline: '名字可见范围和对象生命期是两件事' },
  { id: 'static', map: 'storage', focus: 'static', framing: 'node', mode: 'detail', detailKey: 'behavior', visibleNodes: ['memory-root', 'lifetime', 'static'], visibleEdges: ['h-memory-root-lifetime', 'h-lifetime-static'], chapter: '静态存储期', headline: '局部名字也可以对应长寿命对象' },
  { id: 'automatic', map: 'storage', focus: 'automatic', framing: 'node', mode: 'detail', detailKey: 'behavior', visibleNodes: ['memory-root', 'lifetime', 'static', 'automatic'], visibleEdges: ['h-memory-root-lifetime', 'h-lifetime-static', 'h-lifetime-automatic'], chapter: '自动存储期', headline: '作用域负责对象的收尾' },
  { id: 'dynamic', map: 'storage', focus: 'dynamic', framing: 'node', mode: 'detail', detailKey: 'need', visibleNodes: ['memory-root', 'lifetime', 'static', 'automatic', 'dynamic'], visibleEdges: ['h-memory-root-lifetime', 'h-lifetime-static', 'h-lifetime-automatic', 'h-lifetime-dynamic', 'r-automatic-dynamic'], chapter: '动态存储期', headline: '规模与释放时机在运行时决定' },
  { id: 'pointer', map: 'storage', focus: 'pointer', framing: 'node', mode: 'detail', detailKey: 'address', visibleNodes: ['memory-root', 'lifetime', 'static', 'automatic', 'dynamic', 'pointer'], visibleEdges: ['h-memory-root-lifetime', 'h-lifetime-static', 'h-lifetime-automatic', 'h-lifetime-dynamic', 'h-dynamic-pointer', 'r-automatic-dynamic'], chapter: '地址被保存', headline: '指针与被指向对象各有自己的存储期' },
  { id: 'storage-summary', map: 'storage', focus: 'lifetime', framing: 'subtree', mode: 'summary', visibleNodes: storageAll, visibleEdges: storageEdges, chapter: '第一张图谱', headline: '三种存储期解决不同的生命期需求' },
  { id: 'storage-overview', map: 'storage', focus: 'memory-root', framing: 'all', mode: 'overview', visibleNodes: storageAll, visibleEdges: storageEdges, chapter: '地址 × 时间', headline: '从数据表示到对象生命周期' },
  { id: 'before-morph', map: 'storage', focus: 'dynamic', framing: 'all', mode: 'concept', visibleNodes: storageAll, visibleEdges: storageEdges, chapter: '视角转换', headline: '动态存储带来新的问题：谁负责释放' },
  { id: 'ownership-morph', map: 'morph', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: [], chapter: '图谱变形', headline: '从存储期转向资源所有权' },
  { id: 'ownership-opening', map: 'ownership', focus: 'ownership-root', framing: 'node', mode: 'detail', detailKey: 'opening', visibleNodes: ['ownership-root'], visibleEdges: [], chapter: '第二张图谱', headline: '谁拥有动态对象' },
  { id: 'malloc', map: 'ownership', focus: 'malloc', framing: 'node', mode: 'detail', detailKey: 'mechanism', visibleNodes: ['ownership-root', 'malloc'], visibleEdges: ['h-ownership-root-malloc'], chapter: 'C 的分配接口', headline: 'malloc 只负责申请原始字节' },
  { id: 'new', map: 'ownership', focus: 'new', framing: 'node', mode: 'detail', detailKey: 'mechanism', visibleNodes: ['ownership-root', 'new'], visibleEdges: ['h-ownership-root-new'], chapter: 'C++ 的对象语义', headline: 'new 和 delete 处理构造与析构' },
  { id: 'risk', map: 'ownership', focus: 'risk', framing: 'node', mode: 'detail', detailKey: 'leak', visibleNodes: ['ownership-root', 'new', 'risk'], visibleEdges: ['h-ownership-root-new', 'h-ownership-root-risk', 'r-new-risk'], chapter: '内存泄漏', headline: '手动释放在复杂控制流中易遗漏' },
  { id: 'raii', map: 'ownership', focus: 'raii', framing: 'node', mode: 'detail', detailKey: 'principle', visibleNodes: ['ownership-root', 'risk', 'raii'], visibleEdges: ['h-ownership-root-risk', 'h-ownership-root-raii', 'r-risk-raii'], chapter: 'RAII', headline: '把释放责任交给对象的析构函数' },
  { id: 'unique', map: 'ownership', focus: 'unique', framing: 'node', mode: 'detail', detailKey: 'transfer', visibleNodes: ['ownership-root', 'raii', 'unique'], visibleEdges: ['h-ownership-root-raii', 'h-raii-unique'], chapter: '唯一所有权', headline: 'unique_ptr 可以移动，不能复制' },
  { id: 'shared', map: 'ownership', focus: 'shared', framing: 'node', mode: 'detail', detailKey: 'count', visibleNodes: ['ownership-root', 'raii', 'unique', 'shared'], visibleEdges: ['h-ownership-root-raii', 'h-raii-unique', 'h-raii-shared'], chapter: '共享所有权', headline: 'shared_ptr 在最后一个所有者消失时释放' },
  { id: 'ownership-summary', map: 'ownership', focus: 'raii', framing: 'all', mode: 'summary', visibleNodes: ownershipAll, visibleEdges: ownershipEdges, chapter: '从接口到责任', headline: '分配方式最终要落实到所有权模型' },
  { id: 'ownership-overview', map: 'ownership', focus: 'ownership-root', framing: 'all', mode: 'overview', visibleNodes: ownershipAll, visibleEdges: ownershipEdges, chapter: '第二张图谱', headline: '默认独占，需要时才共享' },
]

export function getScene(step: number): TourScene {
  return tour[Math.min(Math.max(0, step), tour.length - 1)]
}
