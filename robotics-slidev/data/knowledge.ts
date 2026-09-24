import type { KnowledgeMapData, KnowledgeNodeData } from './types'

const representationRoot: KnowledgeNodeData = {
  id: 'representation-root', title: '描述刚体运动', subtitle: 'Frame · Rotation · Pose · Coordinates',
  summary: '先说明对象、相对参考系和表达基，再选择旋转与位姿表示。', accent: 'var(--ink)',
  details: { opening: { eyebrow: '核心问题', statement: '怎样用数字描述运动，同时不把坐标变化误当成真实运动？', explanation: '从位置和速度的参照系开始，逐步走向旋转矩阵、齐次变换和紧凑坐标。' } },
  children: [
    { id: 'reference', title: '坐标语义', subtitle: 'What · Relative to · Expressed in', summary: '几何对象、相对参考系与表达基必须区分。', accent: 'var(--blue)', details: {
      position: { eyebrow: '位置 · 两层信息', statement: '点 P 是几何对象；上标 A 指它用 A 坐标系的基表达。', formula: 'ᴬpₚ = 点 P 的位置在 A 中的坐标', explanation: '更换坐标系会改变数字，不会让点 P 发生运动。' },
      velocity: { eyebrow: '速度 · 三层信息', statement: '速度还要说清“相对于哪个参考系”观察运动。', formula: 'ᶜvₚ/ₐ：P 相对于 A 的速度，用 C 表达', example: '火车中静坐的人相对火车速度为零，相对地面速度非零。' },
      transport: { eyebrow: '运输定理', statement: '转动参考系中的求导结果，还差一个由参考系旋转带来的叉乘项。', formula: '(dr/dt)ₐ = (dr/dt)ᵦ + ωᵦ/ₐ × r', explanation: '“在哪个系中求导”和“用哪个基表达”是不同问题。' },
    } },
    { id: 'rotation', title: 'SO(3) 旋转', subtitle: 'Orientation & Change of Basis', summary: '三维姿态既可描述坐标系，也可执行旋转。', accent: 'var(--teal)', details: {
      conditions: { eyebrow: '特殊正交群', statement: '旋转矩阵保持长度和方向，排除镜像反射。', formula: 'RᵀR = I，det R = +1', explanation: '仅有正交性还不够；det R = −1 对应反射。' },
      attitude: { eyebrow: '用途一 · 姿态', statement: 'Rₐᵦ 的三列，是 B 系三根轴在 A 系中的坐标。', formula: 'Rₐᵦ = [ ᴬx̂ᵦ  ᴬŷᵦ  ᴬẑᵦ ]' },
      basis: { eyebrow: '用途二 · 被动换系', statement: '同一几何向量没有动，只是坐标从 B 系写到 A 系。', formula: 'ᴬp = Rₐᵦ ᴮp，Rᵦₐ = Rₐᵦᵀ' },
      active: { eyebrow: '用途三 · 主动旋转', statement: '坐标系保持不变，向量本身被旋转。', formula: 'ᴬp′ = R ᴬp', explanation: '矩阵乘向量的形式相同，但几何意义与被动换系不同。' },
      multiply: { eyebrow: '空间轴与本体轴', statement: '左乘在空间系中描述旋转；右乘在当前本体系中描述。', formula: 'R′ₐᵦ = QₐRₐᵦ = RₐᵦQᵦ', explanation: '同一旋转满足 Qₐ = RₐᵦQᵦRₐᵦ⁻¹。' },
    } },
    { id: 'transform', title: 'SE(3) 位姿', subtitle: 'Rigid Transformation', summary: '齐次矩阵把旋转与平移合成一次矩阵乘法。', accent: 'var(--plum)', details: {
      homogeneous: { eyebrow: '从旋转到刚体位姿', statement: '刚体的完整运动同时包含姿态与位置。', formula: 'p′ = Rp + t；T = [ R  t ; 0  1 ]', explanation: '扩展点的齐次坐标为 [x,y,z,1]ᵀ，便可用 4×4 矩阵连续复合变换。' },
      roles: { eyebrow: '同一工具 · 三种含义', statement: 'T 可表示位姿、改变坐标表达，也可作用于点执行刚体位移。', bullets: ['位姿：B 系相对 A 系的位置与朝向', '换系：同一对象用另一参考系表达', '主动位移：物体确实移动'], footnote: '自由向量的齐次末项为 0，平移项不会改变它。' },
    } },
    { id: 'compact', title: '紧凑表示', subtitle: 'Axis–Angle · Screw · Euler', summary: '用更少参数表达旋转，并为关节运动建立指数形式。', accent: 'var(--ochre)', details: {
      axisAngle: { eyebrow: '轴角与指数坐标', statement: '三维旋转只有三个自由度：单位轴提供两个，角度提供一个。', formula: 'R = exp([ω̂]θ)，2 + 1 = 3', explanation: '[ω̂] 是叉乘矩阵： [ω̂]v = ω̂ × v。' },
      rodrigues: { eyebrow: 'Rodrigues 公式', statement: '矩阵指数的无穷级数可合并为闭式旋转公式。', formula: 'R = I + sinθ[ω̂] + (1−cosθ)[ω̂]²', explanation: '奇次项给正弦，偶次项给 1−cosθ；轴向分量保持不变。' },
      screw: { eyebrow: '从旋转到螺旋', statement: '旋转加沿轴平移可以统一表示刚体运动。', formula: 'S = [ω; v]，T = exp([S]θ) ∈ SE(3)', explanation: '纯旋转与纯平移都是特殊情况；这也是指数积正运动学的基本因子。' },
      euler: { eyebrow: '欧拉角与固定角', statement: '三个角度必须附带轴序和固定轴 / 运动轴约定。', formula: '内旋 XYZ ⇔ 外旋 ZYX（角度顺序对应反转）', explanation: '标准轴序有 6 种 Tait–Bryan 与 6 种 proper Euler。只写“XYZ”仍可能有歧义。' },
    } },
  ],
}

const kinematicsRoot: KnowledgeNodeData = {
  id: 'fk-root', title: '正运动学', subtitle: 'Joint Variables → End-Effector Pose',
  summary: '给定关节变量 q，求末端坐标系相对基座的位姿 T。', accent: 'var(--ink)',
  details: { goal: { eyebrow: '从表示走向计算', statement: '已知各关节的位置或位移，求机器人末端在哪里、朝向哪里。', formula: '(q₁,…,qₙ) → T₀ₙ(q) ∈ SE(3)', explanation: 'DH 与 PoE 是两种组织同一正运动学问题的方法。' } },
  children: [
    { id: 'dh', title: 'DH 方法', subtitle: '相邻坐标系链', summary: '按连杆建立局部坐标系，逐段相乘。', accent: 'var(--blue)', details: {
      chain: { eyebrow: '局部换系', statement: '每节变换描述相邻连杆坐标系的关系，再按顺序相乘。', formula: 'T₀₃ = T₀₁ T₁₂ T₂₃', explanation: '标准 DH 用 θᵢ、dᵢ、aᵢ、αᵢ 四个参数描述相邻坐标系。' },
      tradeoff: { eyebrow: '方法特点', statement: '参数紧凑，但需要按约定布置中间坐标系。', example: '关节越多，局部坐标系的选择和检查越繁琐。' },
    } },
    { id: 'poe', title: 'PoE 方法', subtitle: '统一空间坐标系', summary: '用零位构型和各关节螺旋轴直接构造末端位姿。', accent: 'var(--teal)', details: {
      space: { eyebrow: '指数积 · Space Form', statement: '所有关节螺旋轴都在固定空间系中表达。', formula: 'Tₛᵦ(q) = exp([S₁]q₁) ··· exp([Sₙ]qₙ) M', explanation: '每个指数因子代表一个关节运动；乘法顺序必须保持。' },
      ingredients: { eyebrow: '两组必要信息', statement: 'M 是零位末端位姿，Sᵢ 是第 i 个关节的空间螺旋轴。', formula: 'M = Tₛᵦ(0)；S₁,…,Sₙ 都在 {s} 中表达', explanation: '旋转关节的螺旋轴按单位轴约定；移动关节可令角速度分量为零。' },
    } },
    { id: 'target', title: '末端位姿', subtitle: 'T₀ₙ / Tₛᵦ', summary: '两条计算路线的结果都是 SE(3) 位姿。', accent: 'var(--plum)', details: {
      synthesis: { eyebrow: '两种路线 · 同一结果', statement: 'DH 连乘局部变换；PoE 连乘统一空间系的关节指数。', formula: '关节变量 q → 末端位姿 T(q) ∈ SE(3)', explanation: '选用哪一种表达取决于建模、标定与推导的便利性。' },
    } },
  ],
}

export const representationMap: KnowledgeMapData = {
  id: 'representation', title: '运动如何表示', subtitle: '从坐标语义到刚体位姿', layout: 'diamond', root: representationRoot,
  relations: [
    { id: 'r-reference-rotation', source: 'reference', target: 'rotation', label: '定义表达', type: 'supports' },
    { id: 'r-rotation-transform', source: 'rotation', target: 'transform', label: '加入平移', type: 'flow' },
    { id: 'r-transform-compact', source: 'transform', target: 'compact', label: '参数化', type: 'flow' },
  ],
}

export const kinematicsMap: KnowledgeMapData = {
  id: 'kinematics', title: '关节变量如何得到末端位姿', subtitle: '局部坐标链与空间螺旋轴', layout: 'tree', root: kinematicsRoot,
  relations: [
    { id: 'r-dh-target', source: 'dh', target: 'target', label: '局部连乘', type: 'application' },
    { id: 'r-poe-target', source: 'poe', target: 'target', label: '指数积', type: 'application' },
  ],
}

export const knowledgeMaps = { [representationMap.id]: representationMap, [kinematicsMap.id]: kinematicsMap }
