import type { KnowledgeMapData } from './types'

export const oneVariable: KnowledgeMapData = {
  id: 'one-variable',
  title: '极限与一元局部结构',
  subtitle: '从任意精度的控制，走向一阶线性近似',
  nodes: [
    { id: 'one-root', title: '局部变化', subtitle: 'Local behavior', summary: '控制趋近，提取局部变化的规律', accent: '#13254F', x: 800, y: 175, width: 300, parentId: undefined, details: {
      opening: { eyebrow: '核心问题', statement: '怎样把“越来越接近”说得足够精确？', explanation: '极限允许我们讨论一个点附近的行为。连续保证函数值稳定；导数和微分进一步描述变化的主导规律。' },
    } },
    { id: 'limit', title: '极限', subtitle: 'Limit', summary: '任意目标精度都能由输入距离保证', accent: '#163F6F', x: 230, y: 390, width: 220, details: {
      example: { eyebrow: '一 · 从例子开始', statement: 'x 趋近 1 时，函数值趋近 2；函数在 1 处是否有定义并不决定这个极限。', formula: 'f(x)=(x²−1)/(x−1)=x+1  (x≠1)\nlimₓ→₁ f(x)=2', explanation: '一次计算只能给出一次逼近。极限要求任意精度都可以继续满足。' },
      epsilon: { eyebrow: 'ε–δ 定义', statement: '先给任意 ε>0，再找到相应的 δ>0。量词顺序不可交换。', formula: '∀ε>0 ∃δ>0 : 0<|x−a|<δ ⇒ |f(x)−L|<ε', explanation: 'δ 可以依赖 ε；结论必须对 δ 范围内所有合适的 x 成立。' },
    } },
    { id: 'sequence', title: '数列极限', subtitle: 'Sequence', summary: '用 N 控制充分靠后的每一项', accent: '#74A0BA', x: 230, y: 700, width: 220, details: {
      meaning: { eyebrow: '同一控制思想', statement: '函数极限用 δ 缩小输入距离；数列极限用 N 推迟起点。', formula: '∀ε>0 ∃N : n>N ⇒ |aₙ−L|<ε', explanation: '无论精度要求多严，从某项之后的全部数列项都要满足。' },
    } },
    { id: 'continuity', title: '连续', subtitle: 'Continuity', summary: '函数极限与该点函数值一致', accent: '#396D80', x: 565, y: 505, width: 230, details: {
      meaning: { eyebrow: '二 · 连续', statement: '输入增量趋零时，输出增量也趋零。', formula: 'limₓ→ₐ f(x)=f(a)  ⇔  Δy→0', explanation: '这保证局部没有函数值跳变，却没有规定 Δy 按怎样的比例变化。' },
      littleO: { eyebrow: '增量语言', statement: '连续性也可以写成函数值加上一个趋零的小量。', formula: 'f(a+Δx)=f(a)+o(1)', explanation: 'o(1) 表示当 Δx→0 时趋于 0；它不是一个固定的“很小的数”。' },
    } },
    { id: 'derivative', title: '导数', subtitle: 'Derivative', summary: '差商的极限给出局部变化比例', accent: '#624F6B', x: 900, y: 505, width: 225, details: {
      meaning: { eyebrow: '二 · 可导', statement: '差商有有限极限，才有确定的瞬时变化率。', formula: "f′(a)=lim₍Δx→0₎ [f(a+Δx)−f(a)]/Δx", explanation: '在一元情形，趋近只需要协调左右两侧。' },
    } },
    { id: 'differential', title: '可微', subtitle: 'Differentiability', summary: '变化可拆成线性主部与更小余项', accent: '#B5855F', x: 1260, y: 505, width: 220, details: {
      meaning: { eyebrow: '二 · 局部线性', statement: '线性项抓住一阶变化，剩余误差相对 Δx 消失。', formula: 'Δy=AΔx+o(Δx),  A=f′(a)\ndf=f′(a)dx', explanation: '一元实函数中，可导与可微等价；二者都推出连续。' },
    } },
    { id: 'counterexample', title: '边界反例', subtitle: 'Counterexample', summary: '连续不一定存在切线斜率', accent: '#644A56', x: 900, y: 755, width: 240, details: {
      abs: { eyebrow: '逆命题失败', statement: '|x| 在原点连续，左右差商却分别趋于 −1 与 1。', formula: '连续 ⇏ 可导；一元可导 ⇔ 可微 ⇒ 连续', explanation: '维尔斯特拉斯函数甚至可处处连续而处处不可导。连续仅给出函数值控制。' },
    } },
  ],
  relations: [
    { id: 'one-r1', source: 'limit', target: 'continuity', label: '极限等于函数值', type: 'defines' },
    { id: 'one-r2', source: 'continuity', target: 'derivative', label: '继续追问比例', type: 'extends' },
    { id: 'one-r3', source: 'derivative', target: 'differential', label: '一元等价', type: 'implies' },
    { id: 'one-r4', source: 'derivative', target: 'continuity', label: '必然连续', type: 'implies' },
    { id: 'one-r5', source: 'continuity', target: 'counterexample', label: '逆向不成立', type: 'limits' },
    { id: 'one-r6', source: 'limit', target: 'sequence', label: '同一量词结构', type: 'extends' },
  ],
}

export const manyDirections: KnowledgeMapData = {
  id: 'many-directions',
  title: '方向与线性映射',
  subtitle: '坐标方向、全部路径与复方向的条件强度不同',
  nodes: [
    { id: 'many-root', title: '方向决定强度', subtitle: 'Directions matter', summary: '增量来自哪些方向，决定定义有多强', accent: '#13254F', x: 800, y: 160, width: 310 },
    { id: 'joint', title: '联合连续', subtitle: 'All paths', summary: '所有趋近路径上都要趋于函数值', accent: '#163F6F', x: 205, y: 350, width: 235, details: {
      meaning: { eyebrow: '三 · 多元连续', statement: '二维标准连续性检查整个邻域，而非仅检查两条坐标轴。', formula: '‖h‖→0 ⇒ f(a+h)→f(a)', explanation: 'ε–δ 定义中的距离从 |x−a| 变成范数 ‖x−a‖。单点联合连续本身不保证附近各切片的内层极限都存在。' },
    } },
    { id: 'path-counterexample', title: '路径反例', subtitle: 'Path test', summary: '坐标方向为零，斜线方向为 1/2', accent: '#644A56', x: 210, y: 690, width: 235, details: {
      example: { eyebrow: '分别连续仍不够', statement: '两条坐标轴上的检验都给 0，沿 y=x 却恒为 1/2。', formula: 'f(x,y)=xy/(x²+y²),  f(0,0)=0\nf(x,x)=1/2  (x≠0)', explanation: '这个函数在原点的两个偏导都存在，仍然不连续。' },
    } },
    { id: 'partial', title: '偏导数', subtitle: 'Coordinate axes', summary: '每次只改变一个坐标', accent: '#74A0BA', x: 505, y: 515, width: 220, details: {
      meaning: { eyebrow: '三 · 偏导', statement: '偏导是坐标轴上的差商极限，不能代替全部路径的行为。', formula: '∂ᵢf(a)=limₜ→₀ [f(a+teᵢ)−f(a)]/t', explanation: '所有一阶偏导存在，单独不足以推出连续或可微。' },
    } },
    { id: 'frechet', title: 'Fréchet 可微', subtitle: 'Linear map', summary: '同一个线性映射近似所有方向', accent: '#396D80', x: 795, y: 360, width: 260, details: {
      meaning: { eyebrow: '三 · 可微', statement: '存在统一的线性映射 A，使余项比 ‖h‖ 更小。', formula: 'f(a+h)=f(a)+A(h)+o(‖h‖)', explanation: '标量值函数中 A(h)=∇f(a)ᵀh。它推出连续，也推出各偏导存在。' },
    } },
    { id: 'jacobian-multi', title: 'Jacobian', subtitle: 'Component rows', summary: '向量函数的线性映射写成系数矩阵', accent: '#9AAE8F', x: 790, y: 655, width: 235, details: {
      meaning: { eyebrow: '三 · 向量值函数', statement: '把每个输出分量的一阶系数排成一行，就得到 Jacobian。', formula: 'F(a+h)=F(a)+J_F(a)h+o(‖h‖)\nJ_F∈ℝᵐˣⁿ', explanation: 'Jacobian 表示一个从 ℝⁿ 到 ℝᵐ 的局部线性映射。' },
    } },
    { id: 'conditions', title: '蕴含关系', subtitle: 'Sufficient conditions', summary: '偏导连续足以保证可微；逆向一般失败', accent: '#B5855F', x: 1090, y: 765, width: 235, details: {
      meaning: { eyebrow: '三 · 逻辑结构', statement: '一阶偏导在邻域存在且在该点连续，是可微的充分条件。', formula: '偏导连续 ⇒ 可微 ⇒ 连续\n可微 ⇒ 各偏导存在', explanation: '各偏导存在本身很弱；切勿把它当作 Fréchet 可微。' },
    } },
    { id: 'complex', title: '复可导', subtitle: 'Complex directions', summary: '所有复方向的差商必须趋于同一复数', accent: '#624F6B', x: 1330, y: 355, width: 220, details: {
      meaning: { eyebrow: '四 · 复方向', statement: 'h 可以沿实轴、虚轴或任意角度趋零，差商必须有同一个极限。', formula: "f′(z)=limₕ→₀ [f(z+h)−f(z)]/h", explanation: '因此复可导比一般的实二维可微要求更强。' },
    } },
    { id: 'cr', title: 'C–R 结构', subtitle: 'Complex linearity', summary: 'Jacobian 被限制为复数乘法矩阵', accent: '#ACA6BF', x: 1330, y: 555, width: 220, details: {
      meaning: { eyebrow: '四 · Cauchy–Riemann', statement: '复线性要求实 Jacobian 具有旋转加缩放的特殊形式。', formula: 'uₓ=vᵧ,  uᵧ=−vₓ\nJ=[a −b; b a]', explanation: 'C–R 方程是复可导的必要条件；仅在一点满足它们还不充分。' },
    } },
    { id: 'holomorphic', title: '全纯', subtitle: 'Holomorphic', summary: '开集上复可导，进而有任意阶导数', accent: '#644A56', x: 1330, y: 755, width: 220, details: {
      meaning: { eyebrow: '四 · 全纯', statement: '在开集每一点复可导，会自动得到任意阶可导。', formula: '开集上复可导 ⇒ 全纯 ⇒ C∞', explanation: '这个结论远强于一般实函数的一次可导。' },
    } },
  ],
  relations: [
    { id: 'many-r1', source: 'joint', target: 'path-counterexample', label: '路径检验', type: 'limits' },
    { id: 'many-r2', source: 'partial', target: 'frechet', label: '不充分', type: 'limits' },
    { id: 'many-r3', source: 'frechet', target: 'joint', label: '推出连续', type: 'implies' },
    { id: 'many-r4', source: 'frechet', target: 'jacobian-multi', label: '矩阵表示', type: 'computes' },
    { id: 'many-r5', source: 'conditions', target: 'frechet', label: '充分条件', type: 'implies' },
    { id: 'many-r6', source: 'complex', target: 'cr', label: '必要结构', type: 'defines' },
    { id: 'many-r7', source: 'complex', target: 'holomorphic', label: '开集逐点', type: 'extends' },
    { id: 'many-r8', source: 'frechet', target: 'complex', label: '加强为复线性', type: 'extends' },
  ],
}

export const matrixCalculus: KnowledgeMapData = {
  id: 'matrix-calculus',
  title: '矩阵微积分',
  subtitle: '将局部线性近似变成结构化的计算',
  nodes: [
    { id: 'matrix-root', title: '局部线性 · 计算', subtitle: 'Matrix calculus', summary: '函数的一阶与二阶变化用矩阵语言表达', accent: '#13254F', x: 800, y: 155, width: 325 },
    { id: 'gradient', title: '梯度', subtitle: 'Scalar output', summary: '标量函数的一阶系数列', accent: '#163F6F', x: 185, y: 370, width: 215, details: {
      meaning: { eyebrow: '五 · 一阶结构', statement: '梯度将标量函数对各坐标的一阶系数排成列。', formula: 'df=∇f(x)ᵀdx', explanation: '这是 Jacobian 在标量输出时的转置写法，采用列梯度约定。' },
    } },
    { id: 'jacobian-matrix', title: 'Jacobian', subtitle: 'Vector output', summary: '向量函数的一阶线性算子', accent: '#396D80', x: 500, y: 370, width: 225, details: {
      meaning: { eyebrow: '五 · 一阶结构', statement: '输入维度 n、输出维度 m 时，Jacobian 是 m×n 矩阵。', formula: 'df=J_f dx,  J_f∈ℝᵐˣⁿ', explanation: '每一行对应一个输出分量的一阶线性近似。' },
    } },
    { id: 'hessian', title: 'Hessian', subtitle: 'Second order', summary: '梯度的 Jacobian 刻画二阶变化', accent: '#624F6B', x: 805, y: 370, width: 225, details: {
      meaning: { eyebrow: '五 · 二阶结构', statement: 'Hessian 是梯度再求一次 Jacobian。', formula: 'H_f=J_{∇f}=∇²f\nf(x+h)≈f(x)+∇fᵀh+½hᵀH_fh', explanation: '一阶项给局部斜率，二阶项描述曲率；标准二阶 Taylor 式需适当光滑性。' },
    } },
    { id: 'matrix-gradient', title: '矩阵梯度', subtitle: 'Matrix → scalar', summary: '迹配对压缩逐元素的一阶求和', accent: '#B5855F', x: 1110, y: 370, width: 225, details: {
      meaning: { eyebrow: '五 · 矩阵到标量', statement: '矩阵梯度与输入 X 同形；微分是各元素变化的加权和。', formula: 'df=tr[(∇_X f)ᵀdX]\n∇_X‖X‖²_F=2X', explanation: '迹公式只是 Frobenius 内积的矩阵写法。' },
    } },
    { id: 'matrix-diff', title: '矩阵值微分', subtitle: 'Matrix → matrix', summary: '以线性算子作用于矩阵增量', accent: '#9AAE8F', x: 1400, y: 370, width: 235, details: {
      meaning: { eyebrow: '五 · 矩阵到矩阵', statement: '用 DF(X)[H] 表示输入矩阵增量 H 的一阶响应。', formula: 'F(X+H)=F(X)+DF(X)[H]+o(‖H‖_F)', explanation: '向量化后 Jacobian 大小为 pq×mn；实际计算通常保留算子写法。' },
    } },
    { id: 'rules', title: '基本规则', subtitle: 'Differential rules', summary: '线性、乘积、转置与迹', accent: '#74A0BA', x: 270, y: 665, width: 225, details: {
      meaning: { eyebrow: '六 · 运算规则', statement: '先写微分，再按矩阵形状整理；矩阵乘积的次序必须保留。', formula: 'd(AB)=(dA)B+A(dB)\nd(Xᵀ)=(dX)ᵀ', explanation: '微分满足线性规则；迹的循环性可把所需变量移到便于识别的位置。' },
    } },
    { id: 'chain', title: '链式法则', subtitle: 'Composition', summary: '复合函数的 Jacobian 按次序相乘', accent: '#396D80', x: 580, y: 665, width: 235, details: {
      meaning: { eyebrow: '六 · 复合映射', statement: '先由内层函数把 dx 变成 dy，再由外层把 dy 变成 dz。', formula: 'dy=J_g dx,  dz=J_f dy\nJ_{f∘g}=J_f J_g', explanation: '这也是机器人运动学与神经网络反向传播的基础。' },
    } },
    { id: 'formulas', title: '典型公式', subtitle: 'Linear & quadratic', summary: '线性函数与二次型的梯度', accent: '#624F6B', x: 890, y: 665, width: 235, details: {
      meaning: { eyebrow: '七 · 从微分读梯度', statement: '二次型需要保留 A 与 Aᵀ；只有 A 对称时才写作 2Ax。', formula: '∇(aᵀx)=a\n∇(xᵀAx)=(A+Aᵀ)x', explanation: '二次型微分中的两项来自乘积法则。' },
    } },
    { id: 'least-squares', title: '最小二乘', subtitle: 'Optimization', summary: '梯度归零产生正规方程', accent: '#B5855F', x: 1180, y: 665, width: 225, details: {
      meaning: { eyebrow: '七 · 优化应用', statement: '平方残差的梯度将线性代数与最优化连接起来。', formula: '∇‖Ax−b‖²=2Aᵀ(Ax−b)\nAᵀAx=Aᵀb', explanation: '秩不足时正规方程仍成立，但解可能不唯一。' },
    } },
    { id: 'inverse', title: '逆矩阵微分', subtitle: 'Inverse map', summary: '对 XX⁻¹=I 求微分', accent: '#644A56', x: 1440, y: 665, width: 225, details: {
      meaning: { eyebrow: '七 · 恒等式推导', statement: '把 X 与 X⁻¹ 视为相互依赖的矩阵，对恒等式应用乘积法则。', formula: 'd(X⁻¹)=−X⁻¹(dX)X⁻¹', explanation: '这一公式要求 X 可逆；左右两个 X⁻¹ 的顺序不能随意交换。' },
    } },
  ],
  relations: [
    { id: 'matrix-r1', source: 'gradient', target: 'jacobian-matrix', label: '标量到向量', type: 'extends' },
    { id: 'matrix-r2', source: 'gradient', target: 'hessian', label: '再求 Jacobian', type: 'computes' },
    { id: 'matrix-r3', source: 'jacobian-matrix', target: 'matrix-diff', label: '输入输出矩阵化', type: 'extends' },
    { id: 'matrix-r4', source: 'gradient', target: 'matrix-gradient', label: '输入矩阵化', type: 'extends' },
    { id: 'matrix-r5', source: 'rules', target: 'chain', label: '函数复合', type: 'computes' },
    { id: 'matrix-r6', source: 'rules', target: 'formulas', label: '展开求导', type: 'computes' },
    { id: 'matrix-r7', source: 'formulas', target: 'least-squares', label: '优化应用', type: 'applies' },
    { id: 'matrix-r8', source: 'rules', target: 'inverse', label: '恒等式求导', type: 'applies' },
  ],
}

export const knowledgeMaps = {
  'one-variable': oneVariable,
  'many-directions': manyDirections,
  'matrix-calculus': matrixCalculus,
} as const
