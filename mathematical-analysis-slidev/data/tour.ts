import type { MapId, TourScene } from './types'

function detail(map: MapId, id: string, focus: string, detailKey: string, chapter: string, headline: string, context: string[] = []): TourScene {
  return { id, map, focus, detailKey, chapter, headline, framing: 'node', mode: 'detail', visibleNodes: [focus, ...context], visibleEdges: 'all' }
}
function review(map: MapId, focus: string, chapter: string, headline: string): TourScene {
  return { id: `${map}-review`, map, focus, chapter, headline, framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: 'all' }
}
const one = 'one-variable'
const many = 'many-directions'
const matrix = 'matrix-calculus'

// Original states 11–14 and 25–28 were morph triplets and entry overviews.
// The new narration enters each chapter directly through local behavior.
export const tour: TourScene[] = [
  detail(one, 'opening', 'one-root', 'opening', '一元函数 · 局部变化', '从输入的小变化开始'),
  detail(one, 'limit-example', 'limit', 'example', '一元函数 · 极限', '函数与数列，都在描述趋近'),
  detail(one, 'limit-definition', 'limit', 'epsilon', '一元函数 · 极限', '把“足够接近”说得精确'),
  detail(one, 'continuity', 'continuity', 'meaning', '一元函数 · 连续', '附近的趋势接上函数值'),
  detail(one, 'little-o', 'continuity', 'littleO', '一元函数 · 连续', '把连续写成一个增量关系'),
  detail(one, 'derivative', 'derivative', 'meaning', '一元函数 · 导数', '从变化中提取变化率'),
  detail(one, 'differential', 'differential', 'meaning', '一元函数 · 可微', '用线性项抓住主要变化'),
  review(one, 'one-root', '一元函数 · 回顾', '沿着关系线，连起连续、可导与可微'),

  detail(many, 'many-opening', 'many-root', 'opening', '多元函数 · 局部变化', '多个变量，可以分开看，也可以一起看'),
  detail(many, 'coordinate-view', 'coordinate-view', 'meaning', '多元函数 · 逐变量', '先把其他变量当作参数'),
  detail(many, 'metric-view', 'metric-view', 'meaning', '多元函数 · 整体', '用距离描述整个输入的变化'),
  detail(many, 'coordinate-limit', 'many-limit', 'coordinate', '多元函数 · 极限', '固定参数，或按顺序逐次趋近', ['coordinate-view']),
  detail(many, 'joint-limit', 'many-limit', 'joint', '多元函数 · 极限', '整个邻域一起接受精度检验', ['metric-view']),
  detail(many, 'separate-continuity', 'many-continuity', 'separate', '多元函数 · 连续', '每个一元切片都连续', ['coordinate-view']),
  detail(many, 'joint-continuity', 'many-continuity', 'joint', '多元函数 · 连续', '整个输入趋近时，输出也接上', ['metric-view']),
  detail(many, 'partial', 'partial', 'meaning', '多元函数 · 偏导', '逐变量地提取变化率', ['coordinate-view']),
  detail(many, 'frechet', 'frechet', 'meaning', '多元函数 · 可微', '让一个线性映射照顾所有小增量', ['metric-view']),
  detail(many, 'complex', 'complex', 'meaning', '复分析 · 复可导', '复数乘法带来更强的要求'),
  detail(many, 'cr', 'cr', 'meaning', '复分析 · 复线性', '实部与虚部的变化需要相互配合'),
  detail(many, 'holomorphic', 'holomorphic', 'meaning', '复分析 · 全纯', '开集上的复可导，带来更强的光滑性'),
  review(many, 'many-root', '多元函数 · 回顾', '从两种观察方式，走到各自的定义'),

  detail(matrix, 'vector-input', 'matrix-root', 'input', '矩阵微积分 · 输入', '向量输入，仍是多元函数的微分'),
  detail(matrix, 'vector-output', 'matrix-root', 'output', '矩阵微积分 · 输出', '向量输出，让各个分量并行计算'),
  detail(matrix, 'differential-derivative', 'differential-derivative', 'meaning', '矩阵微积分 · 微分与导数', '系数给出映射，增量带来响应'),
  detail(matrix, 'gradient', 'gradient', 'meaning', '矩阵微积分 · 分类', '标量输出的一阶导，排成梯度'),
  detail(matrix, 'jacobian', 'jacobian-matrix', 'meaning', '矩阵微积分 · 分类', '向量输出的一阶导，排成 Jacobian'),
  detail(matrix, 'hessian', 'hessian', 'meaning', '矩阵微积分 · 分类', '再求一次导数，得到 Hessian'),
  detail(matrix, 'matrix-scalar', 'matrix-functions', 'scalar', '矩阵微积分 · 矩阵函数', '矩阵输入的梯度，保持输入的形状'),
  detail(matrix, 'matrix-matrix', 'matrix-functions', 'matrix', '矩阵微积分 · 矩阵函数', '矩阵输出，用线性算子接收增量'),
  detail(matrix, 'basic-rules', 'basic-rules', 'meaning', '矩阵微积分 · 计算规则', '展开微分，保留矩阵乘法的次序'),
  detail(matrix, 'chain', 'chain', 'meaning', '矩阵微积分 · 计算规则', '内层变化，继续传到外层'),
  detail(matrix, 'trace-properties', 'trace', 'properties', '矩阵微积分 · 迹', '利用线性与循环性，整理迹的微分'),
  detail(matrix, 'trace-gradient', 'trace', 'readGradient', '矩阵微积分 · 迹', '把微分整理好，梯度就能读出来'),
  detail(matrix, 'trace-quadratic', 'trace', 'quadratic', '矩阵微积分 · 迹', '用平方范数，完整走一遍推导'),
  detail(matrix, 'formulas', 'formulas', 'meaning', '矩阵微积分 · 例子', '线性函数与二次型，先微分再读梯度'),
  detail(matrix, 'least-squares', 'least-squares', 'meaning', '矩阵微积分 · 例子', '残差的平方，连接到最小二乘'),
  detail(matrix, 'inverse', 'inverse', 'meaning', '矩阵微积分 · 例子', '从恒等式，推出逆矩阵的微分'),
  review(matrix, 'matrix-root', '矩阵微积分 · 回顾', '分类、规则与例子，都在表达局部变化'),
]

export const getScene = (step: number) => tour[Math.max(0, Math.min(step, tour.length - 1))]
