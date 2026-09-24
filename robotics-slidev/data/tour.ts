import type { TourScene } from './types'

const rep = ['representation-root', 'reference', 'rotation', 'transform', 'compact']
const repEdges = ['r-reference-rotation', 'r-rotation-transform', 'r-transform-compact']
const fk = ['fk-root', 'dh', 'poe', 'target']
const fkEdges = ['h-fk-root-dh', 'h-fk-root-poe', 'h-fk-root-target']

function detail(id: string, focus: string, detailKey: string, chapter: string, headline: string, visibleNodes: string[], visibleEdges: string[]): TourScene {
  return { id, map: 'representation', focus, framing: 'node', mode: 'detail', detailKey, visibleNodes, visibleEdges, chapter, headline }
}
function fkDetail(id: string, focus: string, detailKey: string, chapter: string, headline: string): TourScene {
  return { id, map: 'kinematics', focus, framing: 'node', mode: 'detail', detailKey, visibleNodes: fk, visibleEdges: fkEdges, chapter, headline }
}

export const tour: TourScene[] = [
  detail('opening', 'representation-root', 'opening', '简明机器人学', '描述运动之前，先问清参照系', [rep[0]], []),
  detail('position', 'reference', 'position', '坐标语义', '位置有对象与表达基两层信息', rep.slice(0, 2), []),
  detail('velocity', 'reference', 'velocity', '坐标语义', '速度还需要相对参考系', rep.slice(0, 2), []),
  detail('transport', 'reference', 'transport', '坐标语义', '转动参考系让求导多出一项', rep.slice(0, 2), []),
  { id: 'reference-summary', map: 'representation', focus: 'reference', framing: 'subtree', mode: 'summary', visibleNodes: rep.slice(0, 2), visibleEdges: [], chapter: '坐标语义', headline: '谁在动，相对谁，用哪个基表达' },
  detail('so3', 'rotation', 'conditions', '旋转矩阵', 'SO(3) 排除了镜像反射', rep.slice(0, 3), repEdges.slice(0, 1)),
  detail('attitude', 'rotation', 'attitude', '旋转矩阵', '矩阵的列就是坐标轴的方向', rep.slice(0, 3), repEdges.slice(0, 1)),
  detail('basis', 'rotation', 'basis', '旋转矩阵', '被动换系只改变数字', rep.slice(0, 3), repEdges.slice(0, 1)),
  detail('active', 'rotation', 'active', '旋转矩阵', '主动旋转改变几何对象', rep.slice(0, 3), repEdges.slice(0, 1)),
  detail('multiply', 'rotation', 'multiply', '旋转矩阵', '左乘看空间轴，右乘看本体轴', rep.slice(0, 3), repEdges.slice(0, 1)),
  detail('homogeneous', 'transform', 'homogeneous', '刚体位姿', '把旋转和平移写进同一个矩阵', rep.slice(0, 4), repEdges.slice(0, 2)),
  detail('transform-roles', 'transform', 'roles', '刚体位姿', '位姿、换系和实际位移', rep.slice(0, 4), repEdges.slice(0, 2)),
  detail('axis-angle', 'compact', 'axisAngle', '紧凑表示', '一个旋转只需要三个自由度', rep, repEdges),
  detail('rodrigues', 'compact', 'rodrigues', '紧凑表示', '矩阵指数有可计算的闭式', rep, repEdges),
  detail('screw', 'compact', 'screw', '紧凑表示', '螺旋把旋转和平移统一', rep, repEdges),
  detail('euler', 'compact', 'euler', '紧凑表示', '欧拉角必须说明轴序与轴类型', rep, repEdges),
  { id: 'representation-overview', map: 'representation', focus: rep[0], framing: 'all', mode: 'overview', visibleNodes: rep, visibleEdges: repEdges, chapter: '第一张知识图谱', headline: '从参照系走到完整的刚体表示' },
  { id: 'before-morph', map: 'representation', focus: rep[0], framing: 'all', mode: 'concept', visibleNodes: rep, visibleEdges: repEdges, chapter: '视角转换', headline: '把表示工具用于机械臂求解' },
  { id: 'kinematics-morph', map: 'morph', focus: 'fk-root', framing: 'all', mode: 'overview', visibleNodes: 'all', visibleEdges: [], chapter: '变形过渡', headline: '坐标系、位姿和螺旋轴进入正运动学' },
  { id: 'fk-overview', map: 'kinematics', focus: fk[0], framing: 'all', mode: 'overview', visibleNodes: fk, visibleEdges: fkEdges, chapter: '第二张知识图谱', headline: '两条路线，求同一个末端位姿' },
  fkDetail('fk-goal', 'fk-root', 'goal', '正运动学', '已知关节变量，求末端位姿'),
  fkDetail('dh-chain', 'dh', 'chain', 'DH 方法', '逐段建立相邻坐标系变换'),
  fkDetail('dh-tradeoff', 'dh', 'tradeoff', 'DH 方法', '参数紧凑，坐标系布置需仔细'),
  fkDetail('poe-space', 'poe', 'space', 'PoE 方法', '所有关节轴都在同一空间系表达'),
  fkDetail('poe-ingredients', 'poe', 'ingredients', 'PoE 方法', '零位构型与关节螺旋轴'),
  fkDetail('target', 'target', 'synthesis', '末端位姿', '两种方法都得到 SE(3) 中的结果'),
  { id: 'fk-final', map: 'kinematics', focus: fk[0], framing: 'all', mode: 'overview', visibleNodes: fk, visibleEdges: fkEdges, chapter: '完整知识图谱', headline: '描述清楚坐标，才能正确计算运动' },
]

export function getScene(step: number): TourScene {
  return tour[Math.min(Math.max(0, step), tour.length - 1)]
}
