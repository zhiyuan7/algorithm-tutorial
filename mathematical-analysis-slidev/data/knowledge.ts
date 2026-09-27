import type { KnowledgeDetail, KnowledgeMapData, KnowledgeNodeData, KnowledgeRelation } from './types'

const tex = String.raw
const colors = ['#13254F', '#163F6F', '#396D80', '#624F6B', '#B5855F', '#74A0BA']
function node(id: string, title: string, x: number, y: number, parentId?: string, details?: Record<string, KnowledgeDetail>, width = 250): KnowledgeNodeData {
  return { id, title, x, y, parentId, details, width, height: 96, summary: title, accent: colors[parentId ? 1 + title.length % 5 : 0] }
}
function link(id: string, source: string, target: string, label = '', type: KnowledgeRelation['type'] = 'defines'): KnowledgeRelation {
  return { id, source, target, label, type }
}

export const oneVariable: KnowledgeMapData = {
  id: 'one-variable', title: '一元函数的局部变化', subtitle: '从附近的变化，走向极限与线性近似',
  nodes: [
    node('one-root', '局部变化', 800, 160, undefined, {
      opening: { statement: '先轻轻移动输入，看看输出怎样跟着变化。', formula: tex`\begin{aligned}x&=a+h\\\Delta f&=f(a+h)-f(a)\end{aligned}`, explanation: tex`让 $h$ 越来越接近零，我们关心附近的趋势，以及变化能否用一个简单的规律描述。极限就是把这种观察说清楚的工具。` },
    }),
    node('limit', '极限：函数与数列', 800, 370, 'one-root', {
      example: { statement: '附近的趋势，可以和点上的取值分开讨论。', formula: tex`\begin{aligned}f(x)&=\frac{x^2-1}{x-1}=x+1\quad(x\ne1)\\\lim_{x\to1}f(x)&=2\end{aligned}`, explanation: tex`函数在 $1$ 处没有定义，但附近的值仍趋近 $2$。数列 $a_n=2+1/n$ 也趋近 $2$：一个缩小输入距离，一个把项数向后推。` },
      epsilon: { statement: '精度要求无论多严，都能找到一个范围，让之后的所有值满足它。', formula: tex`\begin{aligned}&\forall\varepsilon>0,\ \exists\delta>0:\\&0<|x-a|<\delta\Rightarrow|f(x)-L|<\varepsilon\\[5pt]&\forall\varepsilon>0,\ \exists N\in\mathbb N:\\&n>N\Rightarrow|a_n-L|<\varepsilon\end{aligned}`, explanation: tex`函数极限用 $\delta$ 控制附近，数列极限用 $N$ 控制尾部。两者都先给 $\varepsilon$，再选范围；一次接近还不足以说明极限。` },
    }, 320),
    node('continuity', '连续', 360, 620, 'limit', {
      meaning: { statement: '附近的趋势，恰好接上这个点的函数值。', formula: tex`\begin{aligned}\lim_{x\to a}f(x)&=f(a)\\h\to0&\Rightarrow f(a+h)-f(a)\to0\end{aligned}`, explanation: tex`输入的变化趋于零，输出的变化也趋于零。这里还没有要求变化率存在。` },
      littleO: { statement: '用增量写，连续就是“原来的值，加上一个趋零的余量”。', formula: tex`f(a+h)=f(a)+o(1)\qquad(h\to0)`, explanation: tex`$o(1)$ 表示随 $h\to0$ 而趋零的量，不能把它当作一个固定的小数。` },
    }),
    node('derivative', '导数', 800, 620, 'limit', {
      meaning: { statement: '把输出变化除以输入变化，再让输入变化趋零。', formula: tex`f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}`, explanation: tex`这个有限极限就是瞬时变化率。左右两侧的差商要趋向同一个数，导数才存在。` },
    }),
    node('differential', '可微', 1240, 620, 'limit', {
      meaning: { statement: '用线性项描述主要变化，让剩下的误差比输入变化更小。', formula: tex`\begin{aligned}f(a+h)-f(a)&=Ah+o(|h|)\\A&=f'(a),\qquad df=f'(a)\,dx\end{aligned}`, explanation: tex`微分是线性主部 $df$。系数 $A$ 描述变化率，余项相对于 $|h|$ 趋零，所以线性近似会在输入越来越接近时越来越准确。` },
    }),
  ],
  relations: [
    link('one-local-limit', 'one-root', 'limit', '把趋近说清楚'),
    link('one-limit-cont', 'limit', 'continuity', '函数值的极限'),
    link('one-limit-deriv', 'limit', 'derivative', '差商的极限'),
    link('one-limit-diff', 'limit', 'differential', '余项的极限'),
    link('one-equivalence', 'derivative', 'differential', '可导与可微等价', 'implies'),
    link('one-continuous', 'derivative', 'continuity', '可导必连续；反向不成立', 'implies'),
  ],
}

export const manyDirections: KnowledgeMapData = {
  id: 'many-directions', title: '多元函数的局部变化', subtitle: '逐变量观察，或把整个增量一起看',
  nodes: [
    node('many-root', '多元函数的局部变化', 760, 100, undefined, {
      opening: { statement: '输入变成多个坐标后，观察变化有两种自然的方式。', formula: tex`\begin{aligned}\boldsymbol{x}&=\boldsymbol{a}+\boldsymbol{h}\\\Delta f&=f(\boldsymbol{a}+\boldsymbol{h})-f(\boldsymbol{a})\end{aligned}`, bullets: ['分而治之：每次只动一个变量，其余变量暂时当作参数。', '整体看待：让整个向量移动，用距离衡量输入变化。'], explanation: tex`两种观察会分别进入极限、连续和微分的叙述。` },
    }, 330),
    node('coordinate-view', '逐变量：其余是参数', 390, 285, 'many-root', {
      meaning: { statement: '先固定其他坐标，就回到了一个熟悉的一元函数。', formula: tex`g_i(t)=f(a_1,\ldots,a_i+t,\ldots,a_n)`, explanation: tex`一次只研究 $t$ 的变化。求偏导时走的就是这条路；若逐次让多个变量趋近，还可以讨论累次极限。` },
    }, 300),
    node('metric-view', '整体：用距离衡量', 1020, 285, 'many-root', {
      meaning: { statement: '向量没有像实数那样天然的全序，但距离是可以比较大小的实数。', formula: tex`\begin{aligned}d(\boldsymbol{x},\boldsymbol{a})&=\|\boldsymbol{x}-\boldsymbol{a}\|_2\\&=\sqrt{\sum_{i=1}^n(x_i-a_i)^2}\end{aligned}`, explanation: tex`用 $\|\boldsymbol{h}\|<\delta$ 表示整个输入足够接近。我们比较的是距离的大小，并没有给向量本身建立大小顺序。` },
    }, 300),
    node('many-limit', '极限的两种观察', 760, 475, 'many-root', {
      coordinate: { statement: '固定参数取一元极限；再逐次取极限，就得到累次极限。', formula: tex`\begin{aligned}&\lim_{x\to a}f(x,b)\\&\lim_{x\to a}\left(\lim_{y\to b}f(x,y)\right)\end{aligned}`, explanation: tex`第一行只看一条切片，第二行先完成内层趋近，再进行外层趋近。交换先后顺序可能改变结果；它们都不能替代整体极限。` },
      joint: { statement: '整体极限要求整个邻域内的输入，都把输出带到同一个目标附近。', formula: tex`\begin{aligned}&\forall\varepsilon>0,\ \exists\delta>0:\\&0<\|\boldsymbol{x}-\boldsymbol{a}\|<\delta\\&\qquad\Rightarrow|f(\boldsymbol{x})-L|<\varepsilon\end{aligned}`, explanation: tex`这里必须覆盖所有方向、所有路径。一元定义中的绝对值距离，换成了向量的范数距离。` },
    }, 290),
    node('many-continuity', '连续：分别与联合', 340, 700, 'many-limit', {
      separate: { statement: '按逐变量的方式观察，要求每个一元切片都接上该点的函数值。', formula: tex`\lim_{t\to0}f(\boldsymbol{a}+t\boldsymbol{e}_i)=f(\boldsymbol{a})`, explanation: tex`这叫分别连续：其他坐标保持不动，每个变量分别接受一元连续性的检验。它与逐次取极限的操作需要区分。` },
      joint: { statement: '按整体的方式观察，整个向量趋近时，输出接上函数值。', formula: tex`\lim_{\|\boldsymbol{h}\|\to0}f(\boldsymbol{a}+\boldsymbol{h})=f(\boldsymbol{a})`, explanation: tex`这叫联合连续，也是多元函数通常所说的连续。无论从哪条路径靠近，都必须满足同一个精度要求。` },
    }, 280),
    node('partial', '偏导：逐变量变化率', 760, 700, 'many-limit', {
      meaning: { statement: '固定其他变量，对当前变量的一元切片求导。', formula: tex`\frac{\partial f}{\partial x_i}(\boldsymbol{a})=\lim_{t\to0}\frac{f(\boldsymbol{a}+t\boldsymbol{e}_i)-f(\boldsymbol{a})}{t}`, explanation: tex`偏导采用分而治之的视角，每次只让一个坐标变化。这里的 $\boldsymbol{e}_i$ 是第 $i$ 个坐标方向的单位向量。` },
    }, 290),
    node('frechet', '可微：整体线性近似', 1180, 700, 'many-limit', {
      meaning: { statement: '找到一个线性映射，让它同时描述整个输入向量的一阶变化。', formula: tex`\begin{aligned}f(\boldsymbol{a}+\boldsymbol{h})&=f(\boldsymbol{a})+A\boldsymbol{h}+r(\boldsymbol{h})\\\frac{|r(\boldsymbol{h})|}{\|\boldsymbol{h}\|}&\longrightarrow0\end{aligned}`, explanation: tex`可微采用整体视角：不是分别给每条路径找近似，而是让同一个 $A$ 统一处理所有小增量。` },
    }, 290),
    node('complex', '复分析中的特殊情况', 1570, 285, 'many-root', {
      meaning: { statement: '复数也有两个实坐标，但复导数要求用一个复数乘法来描述变化。', formula: tex`f'(z)=\lim_{h\to0}\frac{f(z+h)-f(z)}{h}`, explanation: tex`$h$ 可沿复平面的任意方向趋零。把复函数看成二维实映射后，复线性比一般的实线性多了一层限制。` },
    }, 310),
    node('cr', 'Cauchy–Riemann 方程', 1570, 505, 'complex', {
      meaning: { statement: '这层限制，让实部与虚部的偏导必须相互配合。', formula: tex`\begin{aligned}f&=u+iv,\qquad u_x=v_y,\quad u_y=-v_x\\J_f&=\begin{pmatrix}a&-b\\b&a\end{pmatrix}\end{aligned}`, explanation: tex`复线性对应旋转与缩放的矩阵。如果实映射在该点可微，再满足这些方程，就得到复可导；只有方程在一点成立还不够。` },
    }, 310),
    node('holomorphic', '全纯', 1570, 925, 'complex', {
      meaning: { statement: '在开集上处处复可导，会带来比实函数强得多的光滑性。', formula: tex`f\text{ 全纯}\quad\Longrightarrow\quad f^{(k)}\text{ 存在}\ (k=1,2,\ldots)`, explanation: tex`只要在开集的每一点复可导，就称为全纯函数。它会自动具有任意阶导数。` },
    }),
  ],
  relations: [
    link('many-coordinate', 'many-root', 'coordinate-view'), link('many-metric', 'many-root', 'metric-view'),
    link('coordinate-limit', 'coordinate-view', 'many-limit', '切片与累次'), link('metric-limit', 'metric-view', 'many-limit', '联合趋近'),
    link('many-limit-cont', 'many-limit', 'many-continuity', '两种观察'), link('many-limit-partial', 'many-limit', 'partial', '逐变量'), link('many-limit-diff', 'many-limit', 'frechet', '整体'),
    link('many-complex', 'many-root', 'complex', '复线性的限制'), link('complex-cr', 'complex', 'cr'), link('complex-holo', 'complex', 'holomorphic'),
  ],
}

export const matrixCalculus: KnowledgeMapData = {
  id: 'matrix-calculus', title: '矩阵微积分', subtitle: '输入与输出的形状，决定一阶系数怎样排列',
  nodes: [
    node('matrix-root', '向量输入与向量输出', 800, 100, undefined, {
      input: { statement: '输入是向量时，微分仍然就是多元函数的一阶线性近似。', formula: tex`\begin{aligned}f&:\mathbb R^n\to\mathbb R\\df&=\sum_{i=1}^n\frac{\partial f}{\partial x_i}\,dx_i\end{aligned}`, explanation: tex`把各坐标的变化分别加权再相加，就得到标量输出的主要变化。先理解这件事，再给系数取名字。` },
      output: { statement: '输出也是向量时，只需让每个输出分量并行完成同样的计算。', formula: tex`\begin{aligned}F&=(f_1,\ldots,f_m)^\top\\df_j&=\sum_{i=1}^n\frac{\partial f_j}{\partial x_i}\,dx_i\\dF&=\begin{pmatrix}df_1\\\vdots\\df_m\end{pmatrix}\end{aligned}`, explanation: tex`每个分量给出一行结果，把这些行叠起来就是一个矩阵。输入、输出的维数决定它的形状。` },
    }, 340),
    node('differential-derivative', '微分与导数', 800, 290, 'matrix-root', {
      meaning: { statement: '导数给出线性映射，微分是这个映射对输入增量的作用。', formula: tex`\begin{aligned}DF(\boldsymbol{x})&:\mathbb R^n\to\mathbb R^m\\dF&=DF(\boldsymbol{x})[d\boldsymbol{x}]\\&=J_F(\boldsymbol{x})\,d\boldsymbol{x}\\df&=f'(x)\,dx\quad\text{（一元）}\end{aligned}`, explanation: tex`一元导数可用一个数表示，多元导数通常用矩阵表示。微分还包含输入增量；它描述由这个增量引起的一阶输出变化。` },
    }, 310),
    node('classification', '按输入与输出分类', 260, 480, 'differential-derivative'),
    node('rules', '计算规则', 800, 480, 'differential-derivative'),
    node('examples', '把规则用起来', 1340, 480, 'differential-derivative'),
    node('gradient', '一阶导：梯度', 120, 680, 'classification', {
      meaning: { statement: '标量输出的一阶系数，按列排好就是梯度。', formula: tex`\begin{aligned}\nabla f&=\begin{pmatrix}\partial_1f\\\vdots\\\partial_nf\end{pmatrix}\in\mathbb R^n\\df&=\nabla f^\top d\boldsymbol{x}\end{aligned}`, explanation: tex`采用列梯度约定。微分仍是“偏导乘坐标增量，再全部相加”。` },
    }, 245),
    node('jacobian-matrix', '向量一阶导：Jacobian', 390, 680, 'classification', {
      meaning: { statement: '一行对应一个输出，一列对应一个输入坐标。', formula: tex`\begin{aligned}(J_F)_{ji}&=\frac{\partial f_j}{\partial x_i}\\J_F&\in\mathbb R^{m\times n},\qquad dF=J_F\,d\boldsymbol{x}\end{aligned}`, explanation: tex`Jacobian 把刚才并行的分量微分合成一个线性映射。` },
    }, 265),
    node('hessian', '二阶导：Hessian', 120, 875, 'classification', {
      meaning: { statement: '对梯度再求一次导数，就得到描述二阶变化的 Hessian。', formula: tex`\begin{aligned}H_f&=J_{\nabla f},\qquad (H_f)_{ij}=\partial_j(\partial_i f)\\f(\boldsymbol{x}+\boldsymbol{h})&=f(\boldsymbol{x})+\nabla f^\top\boldsymbol{h}\\&\quad+\tfrac12\boldsymbol{h}^\top H_f\boldsymbol{h}+o(\|\boldsymbol{h}\|^2)\end{aligned}`, explanation: tex`当 $f$ 在邻域内二阶连续可导时，混合偏导可交换，Hessian 对称，上面的展开成立。` },
    }, 245),
    node('matrix-functions', '矩阵函数', 390, 875, 'classification', {
      scalar: { statement: '输入改成矩阵，标量输出的一阶系数也按同样的矩阵形状排列。', formula: tex`\begin{aligned}df&=\sum_{i,j}\frac{\partial f}{\partial X_{ij}}\,dX_{ij}\\&=\operatorname{tr}\!\left((\nabla_X f)^\top dX\right)\end{aligned}`, explanation: tex`矩阵梯度与 $X$ 同形。迹只是逐元素求和的紧凑写法，稍后会展开它的计算规则。` },
      matrix: { statement: '如果输出也是矩阵，就保留一个作用于矩阵增量的线性算子。', formula: tex`\begin{aligned}F(X+H)&=F(X)+DF(X)[H]\\&\quad+o(\|H\|_F)\\dF&=DF(X)[dX]\end{aligned}`, explanation: tex`输入为 $m\times n$、输出为 $p\times q$ 时，向量化后的 Jacobian 是 $pq\times mn$。实际推导常用紧凑的算子形式。` },
    }, 265),
    node('basic-rules', '线性、乘积与转置', 670, 680, 'rules', {
      meaning: { statement: '微分按熟悉的规则展开，但矩阵因子的先后次序必须保留。', formula: tex`\begin{aligned}d(ag+bh)&=a\,dg+b\,dh\\\nabla_X(ag+bh)&=a\nabla_Xg+b\nabla_Xh\\d(AB)&=(dA)B+A(dB)\\d(X^\top)&=(dX)^\top\end{aligned}`, explanation: tex`$a,b$ 是常数，$A,B$ 可以依赖同一输入。乘积里的每个可变因子分别贡献一项；不能把 $(dA)B$ 随手换成 $B(dA)$。` },
    }, 250),
    node('chain', '链式法则', 940, 680, 'rules', {
      meaning: { statement: '先算内层带来的变化，再让外层接收这个变化。', formula: tex`\begin{aligned}dy&=J_g\,dx,\qquad dz=J_f\,dy\\dz&=J_fJ_g\,dx\\J_{f\circ g}(x)&=J_f(g(x))\,J_g(x)\end{aligned}`, explanation: tex`若输入、中间量、输出的维数分别为 $n,m,p$，矩阵相乘的形状就是 $(p\times m)(m\times n)$。` },
    }, 250),
    node('trace', '迹的微分与梯度', 800, 875, 'rules', {
      properties: { statement: '迹是线性的，也允许循环移动因子，帮助我们整理微分。', formula: tex`\begin{aligned}d\,\operatorname{tr}(X)&=\operatorname{tr}(dX)\\d\,\operatorname{tr}(AB)&=\operatorname{tr}((dA)B+A(dB))\\\operatorname{tr}(ABC)&=\operatorname{tr}(BCA)\\&=\operatorname{tr}(CAB)\end{aligned}`, explanation: tex`乘积需维数相容，取迹的整体需为方阵。循环移动不会改变迹，但不能任意交换相邻因子；$\operatorname{tr}(ABC)$ 一般不等于 $\operatorname{tr}(ACB)$。` },
      readGradient: { statement: '把微分整理成与输入增量配对的形式，就能直接读出梯度。', formula: tex`\begin{aligned}\operatorname{tr}(G^\top dX)&=\sum_{i,j}G_{ij}\,dX_{ij}\\df=\operatorname{tr}(G^\top dX)&\Rightarrow\nabla_Xf=G\\f(X)=\operatorname{tr}(A^\top X)&\Rightarrow\nabla_Xf=A\\df=\operatorname{tr}(A^\top dX)&\quad(A\text{ 为常矩阵})\end{aligned}`, explanation: tex`关键是转置的位置：如果得到 $df=\operatorname{tr}(B\,dX)$，梯度就是 $B^\top$，不能直接写成 $B$。` },
      quadratic: { statement: '平方 Frobenius 范数，把乘积法则和迹的整理连在一起。', formula: tex`\begin{aligned}f(X)&=\|X\|_F^2=\operatorname{tr}(X^\top X)\\df&=\operatorname{tr}((dX)^\top X+X^\top dX)\\&=2\operatorname{tr}(X^\top dX)\\\nabla_Xf&=2X\end{aligned}`, explanation: tex`利用标量等于自身的转置，两项都能整理成 $\operatorname{tr}(X^\top dX)$。展开后每个元素都对应 $d(X_{ij}^2)=2X_{ij}\,dX_{ij}$。` },
    }, 300),
    node('formulas', '线性函数与二次型', 1210, 680, 'examples', {
      meaning: { statement: '先展开微分，再把输入增量放到右边读出系数。', formula: tex`\begin{aligned}d(a^\top x)&=a^\top dx,\quad\nabla(a^\top x)=a\\d(x^\top Ax)&=(dx)^\top Ax+x^\top A\,dx\\&=x^\top(A^\top+A)\,dx\\\nabla(x^\top Ax)&=(A+A^\top)x\end{aligned}`, explanation: tex`$a,A$ 为常量。只有 $A=A^\top$ 时，二次型梯度才简化为 $2Ax$。` },
    }, 250),
    node('least-squares', '最小二乘', 1480, 680, 'examples', {
      meaning: { statement: '把残差的平方求导，线性代数里的正规方程就出现了。', formula: tex`\begin{aligned}r&=Ax-b,\quad dr=A\,dx\\d\|r\|^2&=2r^\top A\,dx\\\nabla_x\|Ax-b\|^2&=2A^\top(Ax-b)\\\nabla f=0&\Rightarrow A^\top Ax=A^\top b\end{aligned}`, explanation: tex`$A,b$ 固定。满列秩时解唯一；秩不足时正规方程仍成立，但最优解可能不唯一。` },
    }, 250),
    node('inverse', '逆矩阵的微分', 1340, 875, 'examples', {
      meaning: { statement: '从逆矩阵的定义出发，对恒等式求一次微分。', formula: tex`\begin{aligned}XY&=I,\qquad Y=X^{-1}\\(dX)Y+X(dY)&=0\\dY&=-X^{-1}(dX)Y\\d(X^{-1})&=-X^{-1}(dX)X^{-1}\end{aligned}`, explanation: tex`$X$ 必须可逆。先左乘 $X^{-1}$，再代入 $Y=X^{-1}$；这也解释了两个逆矩阵为什么分列增量两侧。` },
    }, 300),
  ],
  relations: [
    link('matrix-difference', 'matrix-root', 'differential-derivative'),
    ...['classification', 'rules', 'examples'].map(id => link(`matrix-${id}`, 'differential-derivative', id)),
    ...['gradient', 'jacobian-matrix', 'hessian', 'matrix-functions'].map(id => link(`class-${id}`, 'classification', id)),
    ...['basic-rules', 'chain', 'trace'].map(id => link(`rule-${id}`, 'rules', id)),
    ...['formulas', 'least-squares', 'inverse'].map(id => link(`example-${id}`, 'examples', id)),
  ],
}

export const knowledgeMaps = { 'one-variable': oneVariable, 'many-directions': manyDirections, 'matrix-calculus': matrixCalculus } as const
