import type { MapId, TourScene } from './types'

const g = ['ros-graph', 'node', 'callback', 'topic', 'service', 'matching', 'qos', 'interface', 'name']
const r = ['runtime', 'process', 'composition', 'group', 'executor', 'waitset', 'priority', 'launch']
const commEdges = ['r-node-callback', 'r-topic-callback', 'r-matching-topic']
const runEdges = ['r-process-composition', 'r-group-executor']

function detail(id: string, map: MapId, focus: string, detailKey: string, visibleNodes: string[], chapter: string, headline: string, visibleEdges: string[] = []): TourScene {
  return { id, map, focus, framing: 'node', mode: 'detail', detailKey, visibleNodes, visibleEdges, chapter, headline }
}
export const tour: TourScene[] = [
  detail('question', 'communication', 'ros-graph', 'opening', ['ros-graph'], 'ROS 2 · 起点', '复杂机器人怎样拆分并协作？'),
  detail('node', 'communication', 'node', 'responsibility', ['ros-graph', 'node'], '功能边界', 'Node 把机器人拆成逻辑单元'),
  detail('node-process', 'communication', 'node', 'process', ['ros-graph', 'node'], '边界辨析', 'Node 不等于 Process'),
  detail('callback-event', 'communication', 'callback', 'event', ['ros-graph', 'node', 'callback'], '执行入口', '事件到来，Callback 才 ready', ['r-node-callback']),
  detail('callback-timer', 'communication', 'callback', 'timer', ['ros-graph', 'node', 'callback'], '时间驱动', 'Timer 周期不等于硬实时保证', ['r-node-callback']),
  detail('topic', 'communication', 'topic', 'stream', ['ros-graph', 'node', 'callback', 'topic'], '通信方式', 'Topic 传递连续数据流', ['r-node-callback', 'r-topic-callback']),
  detail('service', 'communication', 'service', 'request', ['ros-graph', 'topic', 'service'], '通信方式', 'Service 让一次请求对应一次结果'),
  detail('interfaces', 'communication', 'service', 'contrast', ['ros-graph', 'topic', 'service'], '接口选择', 'Topic、Service、Action 各有时间尺度'),
  detail('matching', 'communication', 'matching', 'contract', ['ros-graph', 'topic', 'service', 'matching'], '通信匹配', '名称、类型、QoS 共同决定连接'),
  detail('qos', 'communication', 'qos', 'policy', ['ros-graph', 'matching', 'qos'], '通信匹配 · QoS', '双方 QoS 兼容即可'),
  detail('interface', 'communication', 'interface', 'schema', ['ros-graph', 'matching', 'qos', 'interface'], '通信匹配 · 类型', '端点要理解同一种接口'),
  detail('name', 'communication', 'name', 'resolution', ['ros-graph', 'matching', 'qos', 'interface', 'name'], '通信匹配 · 名称', '匹配的是最终解析后的名称'),
  { id: 'matching-summary', map: 'communication', focus: 'matching', framing: 'all', mode: 'concept', visibleNodes: g, visibleEdges: commEdges, chapter: '第一张图谱', headline: '从功能拆分到通信契约' },
  { id: 'communication-overview', map: 'communication', focus: 'ros-graph', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: 'all', chapter: 'ROS Graph', headline: '逻辑连接已经建立' },
  { id: 'morph-source', map: 'morph', framing: 'all', mode: 'overview', visibleNodes: [], visibleEdges: [], morphPhase: 0, chapter: '视角转换 · 1/3', headline: '先保留逻辑连接的四个锚点' },
  { id: 'morph-bridge', map: 'morph', framing: 'all', mode: 'overview', visibleNodes: [], visibleEdges: [], morphPhase: 1, chapter: '视角转换 · 2/3', headline: '把逻辑单元映射到运行时' },
  { id: 'morph-target', map: 'morph', framing: 'all', mode: 'overview', visibleNodes: [], visibleEdges: [], morphPhase: 2, chapter: '视角转换 · 3/3', headline: '进程、约束、就绪与部署出现' },
  detail('runtime-question', 'execution', 'runtime', 'opening', ['runtime'], '执行模型', '回调 ready 后，谁让它获得 CPU？'),
  detail('process', 'execution', 'process', 'isolation', ['runtime', 'process'], '进程', '隔离提高韧性，也增加通信成本'),
  detail('composition', 'execution', 'composition', 'container', ['runtime', 'process', 'composition'], '组合', '多个 Node 可以共享一个进程', ['r-process-composition']),
  detail('ipc', 'execution', 'composition', 'ipc', ['runtime', 'process', 'composition'], '进程内通信', '同进程提供优化条件', ['r-process-composition']),
  detail('exclusive', 'execution', 'group', 'exclusive', ['runtime', 'composition', 'group'], '回调组', '互斥组限制组内并行'),
  detail('reentrant', 'execution', 'group', 'reentrant', ['runtime', 'composition', 'group'], '回调组', '可重入组允许并发'),
  detail('executor', 'execution', 'executor', 'dispatch', ['runtime', 'group', 'executor'], '执行器', 'Executor 把 ready 工作交给线程', ['r-group-executor']),
  detail('executors', 'execution', 'executor', 'comparison', ['runtime', 'group', 'executor'], '执行器', '多线程仍受回调组约束', ['r-group-executor']),
  detail('waitset', 'execution', 'waitset', 'wake', ['runtime', 'executor', 'waitset'], '等待机制', 'Wait Set 避免无事件时忙等'),
  detail('scheduling', 'execution', 'waitset', 'scheduling', ['runtime', 'executor', 'waitset'], '调度顺序', '积压时没有全局 FIFO 保证'),
  detail('priority', 'execution', 'priority', 'assign', ['runtime', 'group', 'executor', 'waitset', 'priority'], '优先级', '分配 Group 后再配置线程调度', ['r-group-executor']),
  detail('launch', 'execution', 'launch', 'system', ['runtime', 'process', 'composition', 'group', 'executor', 'launch'], '系统启动', 'Launch 描述整个机器人的部署'),
  detail('synthesis', 'execution', 'launch', 'synthesis', r, '系统合成', '逻辑结构与运行配置共同决定行为', runEdges),
  { id: 'runtime-overview', map: 'execution', focus: 'runtime', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: 'all', chapter: '运行时图谱', headline: '从 ready 到 CPU，再到系统启动' },
]

export function getScene(step: number): TourScene {
  return tour[Math.min(Math.max(0, step), tour.length - 1)]
}
