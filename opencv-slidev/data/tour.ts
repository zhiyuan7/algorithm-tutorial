import type { MapId, TourScene } from './types'
import { knowledgeMaps } from './knowledge'

const taskNodes = ['task', 'foreground', 'background', 'interference', 'pixel', 'color', 'frequency']
const taskEdges = ['t-foreground', 't-background', 't-interference', 'pixel-color', 'pixel-frequency']
const processNodes = ['pipeline', 'roi', 'threshold', 'hsv', 'filter', 'morphology', 'gradient', 'contour', 'shape', 'debug']
const processEdges = ['p-roi-threshold', 'p-roi-hsv', 'p-threshold-morph', 'p-hsv-morph', 'p-filter-gradient', 'p-morph-contour', 'p-gradient-contour', 'p-contour-shape', 'p-shape-debug']

const contextByFocus: Record<string, string> = {
  foreground: 'background', background: 'foreground', interference: 'background',
  pixel: 'color', color: 'pixel', frequency: 'color',
  roi: 'threshold', threshold: 'roi', hsv: 'threshold',
  filter: 'morphology', morphology: 'filter', gradient: 'morphology',
  contour: 'shape', shape: 'contour', debug: 'shape',
}
function detail(id: string, map: MapId, focus: string, detailKey: string, chapter: string, headline: string, _visibleNodes: string[], visibleEdges: string[] = []): TourScene {
  const shown = [focus, contextByFocus[focus]].filter(Boolean)
  const relationIds = new Set(knowledgeMaps[map].relations
    .filter(relation => shown.includes(relation.source) && shown.includes(relation.target))
    .map(relation => relation.id))
  return {
    id, map, focus, framing: 'node', mode: 'detail', detailKey,
    visibleNodes: shown,
    visibleEdges: visibleEdges.filter(edge => relationIds.has(edge)),
    cameraNodes: shown, chapter, headline,
  }
}
function overview(id: string, map: MapId, focus: string, chapter: string, headline: string, visibleNodes: string[], visibleEdges: string[]): TourScene {
  return { id, map, focus, framing: 'all', mode: 'overview', visibleNodes, visibleEdges, chapter, headline }
}

export const tour: TourScene[] = [
  detail('opening', 'task-signal', 'task', 'opening', 'OPEN CV · 核心问题', '先问：这张图里什么值得保留？', ['task']),
  detail('foreground', 'task-signal', 'foreground', 'role', '任务角色', '前景由当前任务定义', taskNodes.slice(0, 3), ['t-foreground']),
  detail('background', 'task-signal', 'background', 'role', '任务角色', '背景也是任务定义', taskNodes.slice(0, 3), taskEdges.slice(0, 2)),
  detail('interference', 'task-signal', 'interference', 'sources', '干扰', '噪声、退化与处理伪影', taskNodes.slice(0, 4), taskEdges.slice(0, 3)),
  detail('pixel', 'task-signal', 'pixel', 'function', '信号表达', '图像是二维离散函数', taskNodes.slice(0, 5), taskEdges.slice(0, 3)),
  detail('color', 'task-signal', 'color', 'coordinates', '信号表达', '颜色空间改变可观察的差异', taskNodes.slice(0, 6), taskEdges.slice(0, 4)),
  detail('frequency', 'task-signal', 'frequency', 'spectrum', '信号表达', '高频也可能是真实细节', taskNodes, taskEdges),
  overview('task-overview', 'task-signal', 'task', '第一张图谱', '任务决定什么是信号，什么是干扰', taskNodes, taskEdges),
  overview('before-morph', 'task-signal', 'task', '视角转换', '从“看见什么”转向“怎样处理”', taskNodes, taskEdges),
  { id: 'signal-to-action', map: 'morph', focus: 'pipeline', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: [], chapter: '概念映射', headline: '信号线索成为处理决策' },
  overview('process-overview', 'processing-pipeline', 'pipeline', '第二张图谱', '每一步都要能检查中间结果', processNodes, processEdges),
  detail('roi', 'processing-pipeline', 'roi', 'select', '位置先验', '先缩小搜索范围', processNodes, ['p-roi-threshold', 'p-roi-hsv']),
  detail('threshold-fixed', 'processing-pipeline', 'threshold', 'fixed', '亮度分离', '灰度化与固定阈值', processNodes, ['p-roi-threshold', 'p-threshold-morph']),
  detail('threshold-adaptive', 'processing-pipeline', 'threshold', 'adaptive', '亮度分离', '局部阈值应对光照变化', processNodes, ['p-roi-threshold', 'p-threshold-morph']),
  detail('threshold-otsu', 'processing-pipeline', 'threshold', 'otsu', '亮度分离', 'Otsu 自动选择全局阈值', processNodes, ['p-roi-threshold', 'p-threshold-morph']),
  detail('hsv', 'processing-pipeline', 'hsv', 'mask', '颜色分离', '亮度不够时，保留颜色线索', processNodes, ['p-roi-hsv', 'p-hsv-morph']),
  detail('filter-choices', 'processing-pipeline', 'filter', 'choices', '去噪', '滤波器各有取舍', processNodes, ['p-filter-gradient']),
  detail('filter-frequency', 'processing-pipeline', 'filter', 'frequency', '去噪', '低通也会压掉真实边缘', processNodes, ['p-filter-gradient']),
  detail('morphology', 'processing-pipeline', 'morphology', 'openclose', '区域清理', '开去白点，闭填黑洞', processNodes, ['p-threshold-morph', 'p-hsv-morph', 'p-morph-contour']),
  detail('derivatives', 'processing-pipeline', 'gradient', 'derivatives', '边界', 'Sobel 与 Laplacian 描述变化', processNodes, ['p-filter-gradient', 'p-gradient-contour']),
  detail('canny', 'processing-pipeline', 'gradient', 'canny', '边界', 'Canny 把候选边缘压细并连接', processNodes, ['p-filter-gradient', 'p-gradient-contour']),
  detail('contour', 'processing-pipeline', 'contour', 'curves', '边界', '从二值图组织轮廓曲线', processNodes, ['p-morph-contour', 'p-gradient-contour', 'p-contour-shape']),
  detail('shape-geometry', 'processing-pipeline', 'shape', 'geometry', '候选筛选', '几何量筛选目标', processNodes, ['p-contour-shape', 'p-shape-debug']),
  detail('shape-circularity', 'processing-pipeline', 'shape', 'circularity', '候选筛选', '圆度与椭圆提供进一步证据', processNodes, ['p-contour-shape', 'p-shape-debug']),
  detail('debug-stages', 'processing-pipeline', 'debug', 'stages', '可观察性', '错误从哪一步开始出现？', processNodes, processEdges),
  detail('debug-drawing', 'processing-pipeline', 'debug', 'drawing', '可观察性', '把结果画回图像供复核', processNodes, processEdges),
  overview('process-final', 'processing-pipeline', 'pipeline', '第二张图谱', '选择、清理、提取与调试相互约束', processNodes, processEdges),
  overview('synthesis', 'processing-pipeline', 'pipeline', '收束', '任务 → 表示 → 筛选 → 验证', processNodes, processEdges),
]

export function getScene(step: number): TourScene {
  return tour[Math.min(Math.max(0, step), tour.length - 1)]
}
