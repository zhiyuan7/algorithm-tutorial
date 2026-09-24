import type { KnowledgeMapData, KnowledgeNodeData } from './types'

const linearLanguageRoot: KnowledgeNodeData = {
  id: 'linear-language-root',
  title: '线性语言',
  subtitle: 'Structure · Basis · Representation',
  summary: '从运算规律出发，用基和坐标将抽象结构变成可计算表示',
  accent: '#13254F',
  details: {
    opening: {
      eyebrow: '核心问题',
      statement: '线性代数如何在“坐标会改变”的前提下，仍然说清空间与变换的结构？',
      explanation: '路线不是从矩阵技巧开始，而是从对象、运算和规律开始；再通过基把抽象对象编码成数字。',
      bullets: ['结构：向量空间与线性映射', '表示：基、坐标与矩阵', '本质：秩、体积、不变方向与能量'],
    },
  },
  children: [
    {
      id: 'algebra',
      title: '代数结构',
      subtitle: 'Objects · Operations · Laws',
      summary: '忽略对象的材料，只保留运算规律',
      accent: '#B5855F',
      details: {
        structure: {
          eyebrow: '从具体对象到结构',
          statement: '代数研究的是“对象 + 运算 + 运算满足的规律”。',
          formula: 'G × G  →  G',
          explanation: '实数加法、平面旋转与某些矩阵乘法的“材料”完全不同，但只要满足同样的公理，便可以共享同一组定理。',
          footnote: 'Algebra 源于 al-jabr；现代含义早已超越“用字母代替未知数”。',
        },
      },
    },
    {
      id: 'vector-space',
      title: '线性空间',
      subtitle: 'Vector Space',
      summary: '加法与数乘共同定义对象的内部结构',
      accent: '#163F6F',
      details: {
        axioms: {
          eyebrow: '结构一边：线性空间',
          statement: '向量空间是定义了向量加法和标量乘法，并满足八条相容公理的集合。',
          formula: 'V × V → V      F × V → V',
          bullets: ['向量加法构成交换群', '数乘与域 F 的乘法相容', '数乘对标量加法和向量加法均可分配'],
          example: 'Fⁿ 的运算逐坐标进行，因而它的线性结构直接继承自数域 F。',
        },
        subspace: {
          eyebrow: '子空间判定',
          statement: '在已知线性空间 V 中，非空子集 W 只需对加法和数乘封闭。',
          formula: 'u,v∈W ⇒ u+v∈W     λ∈F,u∈W ⇒ λu∈W',
          explanation: '结合律、交换律和分配律已在 V 中成立；W 一旦封闭，就会继承这些规律。',
        },
      },
      children: [
        {
          id: 'basis-system',
          title: '基与维数',
          subtitle: 'Span · Independence',
          summary: '能张成全部空间且没有冗余的最小生成系统',
          accent: '#ACA6BF',
          details: {
            span: {
              eyebrow: '能到哪里',
              statement: '一组向量的所有线性组合，构成它们的张成空间。',
              formula: 'span(v₁,…,vₖ) = { a₁v₁ + ··· + aₖvₖ }',
              explanation: '张成回答“这组向量能否生成整个 V”，却还不保证生成方式没有冗余。',
            },
            independence: {
              eyebrow: '是否冗余',
              statement: '线性无关意味着，只有全部系数为零才能得到零向量。',
              formula: 'a₁v₁ + ··· + aₖvₖ = 0  ⇒  a₁=···=aₖ=0',
              example: '若 v₃=2v₁+v₂，那么 v₃ 可由其他向量表出，删去它不会改变张成空间。',
            },
            basis: {
              eyebrow: '最小线性生成系统',
              statement: '基同时满足“张成整个空间”与“线性无关”，维数是任意一组基的大小。',
              formula: '|线性无关组|  ≤  dim V  ≤  |张成组|',
              explanation: '在 n 维空间中，无关组至多有 n 个向量，张成组至少有 n 个向量；基恰好占据临界位置。',
            },
          },
        },
        {
          id: 'coordinates',
          title: '坐标',
          subtitle: 'Coordinates',
          summary: '抽象向量在所选基下的唯一数字编码',
          accent: '#396D80',
          details: {
            meaning: {
              eyebrow: '从抽象对象到数字列',
              statement: '基能张成且线性无关，因此每个向量都有唯一的坐标。',
              formula: 'v = x₁v₁ + ··· + xₙvₙ      [v]ᴮ = (x₁,…,xₙ)ᵀ',
              explanation: '向量 v 是空间中的抽象对象；列向量 [v]ᴮ 只是它在基 ᴮ 下的表示。换基会改变坐标，不会把 v 换成另一个对象。',
            },
          },
        },
      ],
    },
    {
      id: 'linear-map',
      title: '线性映射',
      subtitle: 'Linear Map',
      summary: '保持向量加法和标量乘法的结构映射',
      accent: '#624F6B',
      details: {
        definition: {
          eyebrow: '结构的另一边：映射',
          statement: '线性映射保持加法和数乘，也就保持一切线性组合。',
          formula: 'T(u+v)=T(u)+T(v)      T(λu)=λT(u)',
          explanation: '若 v=Σ aᵢvᵢ，则 T(v)=Σ aᵢT(vᵢ)。因此只要知道 T 对一组基做了什么，就知道它对整个空间做了什么。',
        },
      },
      children: [
        {
          id: 'matrix-representation',
          title: '矩阵表示',
          subtitle: 'Matrix Representation',
          summary: '线性映射在定义域基与值域基下的坐标语法',
          accent: '#7D8981',
          details: {
            columns: {
              eyebrow: '矩阵从哪里来',
              statement: '矩阵的第 j 列，就是 T(vⱼ) 在值域基 ᶜ 下的坐标。',
              formula: '[T(v)]ᶜ = A[v]ᴮ',
              explanation: '矩阵不是线性映射本身。它依赖于定义域和值域中所选的基；基一变，同一映射的矩阵通常也会变。',
            },
            data: {
              eyebrow: '矩阵的另一个角色',
              statement: '矩阵也是一种将多个量组织成行与列的数据结构。',
              formula: 'Ax=b       A=(aᵢⱼ)',
              bullets: ['线性方程组的系数', '灰度图的像素亮度', '协方差、邻接与状态转移关系'],
              footnote: '“映射的坐标表示”是统一理论视角；“表格化数据”是应用视角。',
            },
          },
        },
      ],
    },
  ],
}

const matrixPerspectivesRoot: KnowledgeNodeData = {
  id: 'matrix-perspectives-root',
  title: '矩阵视角',
  subtitle: 'Action · Frame · Capability',
  summary: '矩阵既能描述对象在动，也能描述观察框架在变',
  accent: '#13254F',
  children: [
    {
      id: 'active-transform',
      title: '主动变换',
      subtitle: 'Vector Moves',
      summary: '坐标系不动，向量按同一线性规则运动',
      accent: '#624F6B',
      details: {
        motion: {
          eyebrow: '“变”：对象在动',
          statement: '在同一空间和同一组基中观察前后向量时，矩阵描述空间的主动变形。',
          formula: 'x  ↦  Ax',
          bullets: ['旋转：方向改变，长度保持', '缩放：坐标方向的尺度改变', '反射与剪切：保留线性结构的其他变形'],
          footnote: '更严格地说，这里讨论的是 V→V 的线性自映射。',
        },
      },
      children: [
        {
          id: 'composition',
          title: '复合与迹',
          subtitle: 'Composition & Trace',
          summary: '矩阵乘法就是线性映射复合的坐标形式',
          accent: '#B5855F',
          details: {
            product: {
              eyebrow: '为什么必须行乘列',
              statement: '矩阵乘法的定义被“正确表示映射复合”这一要求锁定。',
              formula: '[S∘T] = [S][T] = BA       AB ≠ BA',
              explanation: '复合次序通常不可交换，所以矩阵乘法也通常不可交换。从列看，AB 就是对 B 的每一列分别实施 A。',
              example: 'tr(AB)=tr(BA)，tr(ABC)=tr(BCA)=tr(CAB)；这是循环不变性，不是 AB=BA。',
            },
          },
        },
        {
          id: 'orthogonal',
          title: '正交结构',
          subtitle: 'Orthogonal Group',
          summary: '保持内积、长度、夹角和距离的变换',
          accent: '#9AAE8F',
          details: {
            geometry: {
              eyebrow: '什么样的矩阵像旋转',
              statement: '正交矩阵的列是标准正交基，因此它保持内积、长度与夹角。',
              formula: 'QᵀQ=I      Q⁻¹=Qᵀ      ‖Qx‖=‖x‖',
              bullets: ['det Q=1：特殊正交群 SO(n)，纯旋转', 'det Q=-1：变换中含反射', 'n 维旋转的自由度为 n(n-1)/2'],
            },
          },
        },
      ],
    },
    {
      id: 'passive-basis',
      title: '被动换基',
      subtitle: 'Frame Moves',
      summary: '向量不动，改变用于描述它的基与坐标',
      accent: '#396D80',
      details: {
        duality: {
          eyebrow: '“不变”：对象不动',
          statement: '换基只是把同一向量在不同坐标系中的数字表示互相翻译。',
          formula: 'x = P x′',
          explanation: '纯代数上的 y=Ax 可以被读成主动运动，也可以被读成被动换框架。分清“什么不动”才能赋予矩阵正确的几何意义。',
        },
      },
      children: [
        {
          id: 'similarity',
          title: '换基与相似',
          subtitle: 'Change of Basis',
          summary: '同一抽象映射在不同基下得到不同矩阵',
          accent: '#ACA6BF',
          details: {
            change: {
              eyebrow: '一般换基与自映射',
              statement: '输入基和输出基可以独立改变；当定义域与值域同时使用同一次换基时，就得到相似矩阵。',
              formula: 'A′ = Q⁻¹AP       V=W, P=Q ⇒ A′=P⁻¹AP',
              explanation: 'P 先把新基输入坐标翻译到旧基，A 完成映射，Q⁻¹ 再把输出翻译到新基。相似矩阵是同一线性自映射的不同观察窗口。',
            },
          },
        },
      ],
    },
    {
      id: 'matrix-capability',
      title: '映射能力',
      subtitle: 'Image · Kernel · Scale',
      summary: '秩和奇异值描述映射能够传递多少独立方向',
      accent: '#163F6F',
      children: [
        {
          id: 'rank',
          title: '秩',
          subtitle: 'Rank',
          summary: '像空间的维数，也是独立列和独立行的数量',
          accent: '#74A0BA',
          details: {
            image: {
              eyebrow: '矩阵能把多少方向送到输出',
              statement: '矩阵的列是标准基的像，因此列空间就是线性映射的像空间。',
              formula: 'rank(A) = dim Im(T) = 独立列数 = 独立行数',
              explanation: '秩不是矩阵尺寸，而是映射后仍然保留的独立维度数。',
            },
            maps: {
              eyebrow: '秩与映射性质',
              statement: '满行秩给出满射，满列秩给出单射，方阵满秩才同时可逆。',
              formula: 'dim ker T = n - rank(A)',
              bullets: ['rank A=m ⇒ Im(T)=Fᵐ，T 满射', 'rank A=n ⇒ ker(T)={0}，T 单射', 'm=n=rank A ⇒ A⁻¹ 存在'],
            },
          },
        },
        {
          id: 'svd',
          title: '奇异值分解',
          subtitle: 'SVD',
          summary: '用两次正交变换和一次按方向缩放解释任意实矩阵',
          accent: '#B5855F',
          details: {
            decomposition: {
              eyebrow: '一般矩阵的几何拆解',
              statement: 'SVD 把线性映射拆成输入旋转/反射、按主方向缩放、输出旋转/反射。',
              formula: 'A = UΣVᵀ      rank(A)=#{σᵢ>0}',
              explanation: 'U 和 V 不改变长度和夹角，真正改变尺度的是奇异值对角阵 Σ。',
              example: 'Aₖ=Σᵢ₌₁ᵏ σᵢuᵢvᵢᵀ 保留最大的 k 个奇异方向，用于图像压缩、降维与去噪。',
            },
          },
        },
      ],
    },
    {
      id: 'matrix-space',
      title: '矩阵空间',
      subtitle: 'Matrix as Vector',
      summary: 'm×n 矩阵在加法与数乘下构成 mn 维线性空间',
      accent: '#7D8981',
      details: {
        vector: {
          eyebrow: '工具本身也是对象',
          statement: '矩阵不仅表示向量间的映射，它自身也可被当作高维向量。',
          formula: 'Fᵐˣⁿ 是线性空间      dim Fᵐˣⁿ = mn',
          explanation: '矩阵没有像实数那样的天然全序。要讨论对称矩阵的“正与负”，需要转向二次型与正定性。',
        },
      },
    },
  ],
}

const invariantGeometryRoot: KnowledgeNodeData = {
  id: 'invariant-geometry-root',
  title: '不变几何',
  subtitle: 'Volume · Direction · Energy',
  summary: '坐标可以更换，映射的体积效应、不变方向与能量结构仍可被揭示',
  accent: '#13254F',
  children: [
    {
      id: 'determinant',
      title: '行列式',
      subtitle: 'Oriented Volume',
      summary: '线性自映射的有向 n 维体积缩放因子',
      accent: '#624F6B',
      details: {
        volume: {
          eyebrow: '体积问题',
          statement: 'det A 同时记录体积缩放幅度与空间定向是否翻转。',
          formula: 'Vol(AΩ)=|det A| Vol(Ω)      det A=0 ⇔ A 不可逆',
          bullets: ['|det A|：普通意义的体积缩放比', 'det A>0：保持定向', 'det A<0：发生定向翻转'],
          explanation: '行列式为零意味着 n 维单位超立方体被压到更低维，因而丢失可逆性。',
        },
      },
    },
    {
      id: 'eigenstructure',
      title: '特征结构',
      subtitle: 'Invariant Directions',
      summary: '在变换中保持方向的向量与子空间',
      accent: '#163F6F',
      details: {
        direction: {
          eyebrow: '方向问题',
          statement: '特征向量经过变换后仍留在原来的直线上，只是按 λ 缩放并可能反向。',
          formula: 'Av=λv, v≠0      det(A-λI)=0',
          explanation: '对每个特征值，Eλ=ker(A-λI) 是不变子空间：A(Eλ)⊆Eλ。特征向量是最简单的一维不变子空间。',
        },
      },
      children: [
        {
          id: 'spectral-theorem',
          title: '谱定理',
          subtitle: 'A = QΛQᵀ',
          summary: '实对称矩阵总有一组正交特征基',
          accent: '#9AAE8F',
          details: {
            diagonalize: {
              eyebrow: '对称性带来的秩序',
              statement: '实对称矩阵可以被正交对角化，复杂矩阵问题因而变成一组实数特征值问题。',
              formula: 'A=Aᵀ  ⇒  A=QΛQᵀ,  QᵀQ=I',
              explanation: 'Q 的列是一组两两正交的特征向量，Λ=diag(λ₁,…,λₙ)。优化、统计与控制中的许多问题因此可以按主方向分解。',
            },
          },
        },
      ],
    },
    {
      id: 'quadratic-form',
      title: '二次型',
      subtitle: 'Quadratic Form',
      summary: '用对称矩阵将向量方向映为标量能量',
      accent: '#396D80',
      details: {
        energy: {
          eyebrow: '能量问题',
          statement: 'xᵀAx 把一个方向上的伸缩与相互作用汇总成一个标量。',
          formula: 'q(x)=xᵀAx',
          explanation: '它是标量 ax² 的矩阵推广。在几何上，它描述不同方向被赋予的长度或能量；在优化中，它决定局部曲率。',
        },
      },
      children: [
        {
          id: 'symmetric-part',
          title: '对称部分',
          subtitle: 'Symmetrization',
          summary: '任意实二次型都由矩阵的对称部分唯一决定',
          accent: '#ACA6BF',
          details: {
            vanish: {
              eyebrow: '为什么只研究对称矩阵',
              statement: '反对称部分对 xᵀAx 的贡献恒为零，因此二次型只“看见”对称部分。',
              formula: 'A=(A+Aᵀ)/2 + (A-Aᵀ)/2      xᵀKx=0',
              explanation: '令 S=(A+Aᵀ)/2、K=(A-Aᵀ)/2，则 xᵀAx=xᵀSx。所以 S 是该实二次型唯一的对称矩阵代表。',
            },
          },
        },
        {
          id: 'positive-definite',
          title: '正定性',
          subtitle: 'Positive Definiteness',
          summary: '沿每个非零方向的二次能量都严格为正',
          accent: '#644A56',
          details: {
            eigenvalues: {
              eyebrow: '特征值与二次型合流',
              statement: '对称矩阵的正定性完全取决于它的特征值符号。',
              formula: 'xᵀAx=Σ λᵢyᵢ²      A≻0 ⇔ λᵢ>0 ∀i',
              bullets: ['A≽0 ⇔ 所有特征值非负', '既有正特征值又有负特征值 ⇒ 二次型不定', 'A≽B ⇔ A-B≽0，定义 Loewner 偏序'],
              footnote: 'Loewner 关系是偏序：并非任意两个对称矩阵都可比。',
            },
          },
        },
      ],
    },
  ],
}

export const linearLanguage: KnowledgeMapData = {
  id: 'linear-language',
  title: '线性语言',
  subtitle: '从代数结构到矩阵表示',
  layout: 'tree',
  root: linearLanguageRoot,
  relations: [
    { id: 'r-algebra-space', source: 'algebra', target: 'vector-space', label: '特化为', type: 'defines' },
    { id: 'r-basis-coordinates', source: 'basis-system', target: 'coordinates', label: '唯一编码', type: 'derives' },
    { id: 'r-coordinates-matrix', source: 'coordinates', target: 'matrix-representation', label: '坐标化', type: 'represents' },
    { id: 'r-map-matrix', source: 'linear-map', target: 'matrix-representation', label: '由基决定', type: 'represents' },
  ],
}

export const matrixPerspectives: KnowledgeMapData = {
  id: 'matrix-perspectives',
  title: '矩阵视角',
  subtitle: '对象在动，坐标系在变，能力被测量',
  layout: 'tree',
  root: matrixPerspectivesRoot,
  relations: [
    { id: 'r-active-passive', source: 'active-transform', target: 'passive-basis', label: '对偶视角', type: 'represents' },
    { id: 'r-composition-similarity', source: 'composition', target: 'similarity', label: '表示与复合', type: 'derives' },
    { id: 'r-orthogonal-svd', source: 'orthogonal', target: 'svd', label: '拆出旋转', type: 'preserves' },
    { id: 'r-rank-svd', source: 'rank', target: 'svd', label: '非零奇异值', type: 'measures' },
  ],
}

export const invariantGeometry: KnowledgeMapData = {
  id: 'invariant-geometry',
  title: '不变几何',
  subtitle: '体积、方向与能量',
  layout: 'tree',
  root: invariantGeometryRoot,
  relations: [
    { id: 'r-det-eigen', source: 'determinant', target: 'eigenstructure', label: '特征值之积', type: 'measures' },
    { id: 'r-spectral-positive', source: 'spectral-theorem', target: 'positive-definite', label: '特征值判符号', type: 'derives' },
    { id: 'r-symmetric-positive', source: 'symmetric-part', target: 'positive-definite', label: '唯一对称代表', type: 'defines' },
  ],
}

export const knowledgeMaps = {
  [linearLanguage.id]: linearLanguage,
  [matrixPerspectives.id]: matrixPerspectives,
  [invariantGeometry.id]: invariantGeometry,
}
