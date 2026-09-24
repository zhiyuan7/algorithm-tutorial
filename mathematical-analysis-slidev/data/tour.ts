import type { TourScene } from './types'

const one = 'one-variable' as const
const many = 'many-directions' as const
const matrix = 'matrix-calculus' as const

const oneAll = ['one-root', 'limit', 'sequence', 'continuity', 'derivative', 'differential', 'counterexample']
const manyAll = ['many-root', 'joint', 'path-counterexample', 'partial', 'frechet', 'jacobian-multi', 'conditions', 'complex', 'cr', 'holomorphic']
const matrixAll = ['matrix-root', 'gradient', 'jacobian-matrix', 'hessian', 'matrix-gradient', 'matrix-diff', 'rules', 'chain', 'formulas', 'least-squares', 'inverse']

export const tour: TourScene[] = [
  { id: 'opening', map: one, focus: 'one-root', framing: 'node', mode: 'detail', detailKey: 'opening', visibleNodes: ['one-root'], visibleEdges: [], chapter: '数学分析', headline: '局部变化如何被精确描述' },
  { id: 'limit-example', map: one, focus: 'limit', framing: 'node', mode: 'detail', detailKey: 'example', visibleNodes: ['one-root', 'limit'], visibleEdges: [], chapter: '一 · 极限', headline: '点上的取值与附近的趋势不同' },
  { id: 'limit-epsilon', map: one, focus: 'limit', framing: 'node', mode: 'detail', detailKey: 'epsilon', visibleNodes: ['one-root', 'limit'], visibleEdges: [], chapter: '一 · 极限', headline: '任意精度都能继续保证' },
  { id: 'sequence', map: one, focus: 'sequence', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: ['one-root', 'limit', 'sequence'], visibleEdges: ['one-r6'], chapter: '一 · 极限', headline: '数列用 N 表达同一思想' },
  { id: 'continuity', map: one, focus: 'continuity', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: ['one-root', 'limit', 'sequence', 'continuity'], visibleEdges: ['one-r1', 'one-r6'], chapter: '二 · 连续', headline: '极限落在函数值上' },
  { id: 'little-o', map: one, focus: 'continuity', framing: 'node', mode: 'detail', detailKey: 'littleO', visibleNodes: ['one-root', 'limit', 'sequence', 'continuity'], visibleEdges: ['one-r1', 'one-r6'], chapter: '二 · 连续', headline: '连续性的增量记法' },
  { id: 'derivative', map: one, focus: 'derivative', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: ['one-root', 'limit', 'sequence', 'continuity', 'derivative'], visibleEdges: ['one-r1', 'one-r2', 'one-r6'], chapter: '二 · 可导', headline: '差商提取局部变化比例' },
  { id: 'differential', map: one, focus: 'differential', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: ['one-root', 'limit', 'sequence', 'continuity', 'derivative', 'differential'], visibleEdges: ['one-r1', 'one-r2', 'one-r3', 'one-r6'], chapter: '二 · 可微', headline: '线性主部加高阶小量' },
  { id: 'abs-counterexample', map: one, focus: 'counterexample', framing: 'node', mode: 'detail', detailKey: 'abs', visibleNodes: oneAll, visibleEdges: 'all', chapter: '二 · 蕴含关系', headline: '连续并不保证存在导数' },
  { id: 'one-overview', map: one, focus: 'one-root', framing: 'all', mode: 'overview', visibleNodes: oneAll, visibleEdges: 'all', chapter: '第一张图谱', headline: '可导 ⇔ 可微 ⇒ 连续' },
  { id: 'morph-1-hold', map: 'morph', framing: 'all', mode: 'overview', visibleNodes: [], visibleEdges: [], chapter: '框架转换 ①', headline: '从一条数轴走向所有路径', morphId: 'one-to-many', morphPhase: 0 },
  { id: 'morph-1-move', map: 'morph', framing: 'all', mode: 'overview', visibleNodes: [], visibleEdges: [], chapter: '框架转换 ①', headline: '绝对值控制扩展为范数控制', morphId: 'one-to-many', morphPhase: 1 },
  { id: 'morph-1-settle', map: 'morph', framing: 'all', mode: 'overview', visibleNodes: [], visibleEdges: [], chapter: '框架转换 ①', headline: '同一个线性近似，新的方向问题', morphId: 'one-to-many', morphPhase: 2 },
  { id: 'many-overview-1', map: many, focus: 'many-root', framing: 'all', mode: 'overview', visibleNodes: manyAll, visibleEdges: 'all', chapter: '第二张图谱', headline: '方向决定定义的强度' },
  { id: 'joint', map: many, focus: 'joint', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: manyAll, visibleEdges: 'all', chapter: '三 · 多元连续', headline: '联合极限必须经过所有路径' },
  { id: 'path-counterexample', map: many, focus: 'path-counterexample', framing: 'node', mode: 'detail', detailKey: 'example', visibleNodes: manyAll, visibleEdges: 'all', chapter: '三 · 多元连续', headline: '两个坐标方向不能代表平面' },
  { id: 'partial', map: many, focus: 'partial', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: manyAll, visibleEdges: 'all', chapter: '三 · 偏导', headline: '偏导只检查坐标轴方向' },
  { id: 'frechet', map: many, focus: 'frechet', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: manyAll, visibleEdges: 'all', chapter: '三 · 可微', headline: '一个线性映射同时近似所有方向' },
  { id: 'jacobian-multi', map: many, focus: 'jacobian-multi', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: manyAll, visibleEdges: 'all', chapter: '三 · Jacobian', headline: '把分量的一阶近似排成矩阵' },
  { id: 'conditions', map: many, focus: 'conditions', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: manyAll, visibleEdges: 'all', chapter: '三 · 关系', headline: '偏导存在不是可微' },
  { id: 'complex', map: many, focus: 'complex', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: manyAll, visibleEdges: 'all', chapter: '四 · 复变', headline: '复差商要经受所有复方向的检验' },
  { id: 'cr', map: many, focus: 'cr', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: manyAll, visibleEdges: 'all', chapter: '四 · C–R', headline: '复线性限制 Jacobian 的形状' },
  { id: 'holomorphic', map: many, focus: 'holomorphic', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: manyAll, visibleEdges: 'all', chapter: '四 · 全纯', headline: '开集复可导带来任意阶可导' },
  { id: 'many-overview-2', map: many, focus: 'many-root', framing: 'all', mode: 'overview', visibleNodes: manyAll, visibleEdges: 'all', chapter: '第二张图谱', headline: '路径、线性映射与复线性' },
  { id: 'morph-2-hold', map: 'morph', framing: 'all', mode: 'overview', visibleNodes: [], visibleEdges: [], chapter: '框架转换 ②', headline: '把线性映射写成可计算的形式', morphId: 'many-to-matrix', morphPhase: 0 },
  { id: 'morph-2-move', map: 'morph', framing: 'all', mode: 'overview', visibleNodes: [], visibleEdges: [], chapter: '框架转换 ②', headline: '一阶系数成为梯度与 Jacobian', morphId: 'many-to-matrix', morphPhase: 1 },
  { id: 'morph-2-settle', map: 'morph', framing: 'all', mode: 'overview', visibleNodes: [], visibleEdges: [], chapter: '框架转换 ②', headline: '从定义走向运算规则', morphId: 'many-to-matrix', morphPhase: 2 },
  { id: 'matrix-overview-1', map: matrix, focus: 'matrix-root', framing: 'all', mode: 'overview', visibleNodes: matrixAll, visibleEdges: 'all', chapter: '第三张图谱', headline: '矩阵微积分是线性近似的计算语言' },
  { id: 'gradient', map: matrix, focus: 'gradient', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: matrixAll, visibleEdges: 'all', chapter: '五 · 梯度', headline: '标量函数的一阶系数列' },
  { id: 'jacobian-matrix', map: matrix, focus: 'jacobian-matrix', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: matrixAll, visibleEdges: 'all', chapter: '五 · Jacobian', headline: '向量输出的一阶线性算子' },
  { id: 'hessian', map: matrix, focus: 'hessian', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: matrixAll, visibleEdges: 'all', chapter: '五 · Hessian', headline: '二阶变化来自梯度的 Jacobian' },
  { id: 'matrix-gradient', map: matrix, focus: 'matrix-gradient', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: matrixAll, visibleEdges: 'all', chapter: '五 · 矩阵梯度', headline: '迹只是逐元素求和的压缩写法' },
  { id: 'matrix-diff', map: matrix, focus: 'matrix-diff', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: matrixAll, visibleEdges: 'all', chapter: '五 · 矩阵值函数', headline: '用算子记录矩阵增量的响应' },
  { id: 'rules', map: matrix, focus: 'rules', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: matrixAll, visibleEdges: 'all', chapter: '六 · 基本规则', headline: '矩阵乘积求导必须保留次序' },
  { id: 'chain', map: matrix, focus: 'chain', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: matrixAll, visibleEdges: 'all', chapter: '六 · 链式法则', headline: '复合映射的 Jacobian 相乘' },
  { id: 'formulas', map: matrix, focus: 'formulas', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: matrixAll, visibleEdges: 'all', chapter: '七 · 常见公式', headline: '从微分读出线性与二次型梯度' },
  { id: 'least-squares', map: matrix, focus: 'least-squares', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: matrixAll, visibleEdges: 'all', chapter: '七 · 最小二乘', headline: '正规方程来自梯度为零' },
  { id: 'inverse', map: matrix, focus: 'inverse', framing: 'node', mode: 'detail', detailKey: 'meaning', visibleNodes: matrixAll, visibleEdges: 'all', chapter: '七 · 逆矩阵', headline: '对恒等式求导得到逆矩阵微分' },
  { id: 'matrix-overview-2', map: matrix, focus: 'matrix-root', framing: 'all', mode: 'overview', visibleNodes: matrixAll, visibleEdges: 'all', chapter: '完整图谱', headline: '所有公式都在表达局部变化' },
]

export const getScene = (step: number) => tour[Math.max(0, Math.min(step, tour.length - 1))]
