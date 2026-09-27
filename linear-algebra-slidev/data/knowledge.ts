import type { KnowledgeMapData, KnowledgeNodeData } from './types'

const linearLanguageRoot: KnowledgeNodeData = {
  id: 'linear-language-root',
  title: '线性语言',
  subtitle: 'Structure · Basis · Representation',
  summary: '从运算规律出发，用基和坐标将抽象结构变成可计算表示',
  accent: '#13254F',
  details: {
    opening: {
      eyebrow: String.raw`从一个问题开始`,
      statement: String.raw`换一组坐标，怎样还能认出同一个空间、同一个变换？`,
      explanation: String.raw`先看加法和数乘的规律，再选一组基，把空间和映射写成可计算的数字。`,
      bullets: [String.raw`空间与映射：我们研究什么`, String.raw`基、坐标与矩阵：怎样把它写下来`, String.raw`秩、体积与能量：变换保留了什么`],
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
          eyebrow: String.raw`从运算认识对象`,
          statement: String.raw`代数关心对象之间能做什么运算，以及这些运算遵守什么规律。`,
          formula: String.raw`G\times G\longrightarrow G`,
          explanation: String.raw`实数加法、平面旋转、矩阵乘法看起来不同。若运算满足相同规律，我们就能用同一套语言研究它们。`,
          bullets: [String.raw`群：运算封闭、满足结合律，有单位元，每个元素都有逆元。`, String.raw`环：加法构成交换群，乘法满足结合律，两种运算满足分配律。`, String.raw`域：乘法可交换的含幺环，$1\ne0$，每个非零元素都有乘法逆元。`],
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
          eyebrow: String.raw`加法与数乘`,
          statement: String.raw`向量空间中的对象可以相加，也可以乘以域 $F$ 中的标量；两种运算满足八条公理。`,
          formula: String.raw`V\times V\to V,\qquad F\times V\to V`,
          bullets: [String.raw`加法满足交换律、结合律，有零向量与加法逆元`, String.raw`数乘满足 $1v=v$、$(ab)v=a(bv)$`, String.raw`分配律：$a(u+v)=au+av$，$(a+b)v=av+bv$`],
          example: String.raw`在 $F^n$ 中逐坐标相加、数乘，这些规律就继承自 $F$。`,
        },
        functions: {
          eyebrow: '坐标也可以看成函数',
          statement: '一个 $n$ 维坐标向量，就是在 $n$ 个位置上取值的函数。',
          formulas: [String.raw`I=\{1,\ldots,n\},\quad f_x:I\to F`, String.raw`f_x(j)=x_j,\qquad F^n\cong F^I`],
          explanation: String.raw`函数逐点相加、数乘，正好就是向量的逐坐标运算。选定基 $\mathcal B$ 后，任意有限维空间 $V$ 都可通过坐标与这样的函数空间对应。`,
          example: String.raw`更一般地，实值连续函数、次数不超过 $d$ 的多项式也组成向量空间；其中的“向量”可以是一整个函数。`,
          footnote: '这里的对应依赖所选的基；抽象向量与它的坐标表示仍需区分。',
        },
        subspace: {
          eyebrow: String.raw`从大空间中取一部分`,
          statement: String.raw`在向量空间 $V$ 中，非空子集 $W$ 若对加法和数乘封闭，它本身也是向量空间。`,
          formula: String.raw`u,v\in W,\ a,b\in F\ \Longrightarrow\ au+bv\in W`,
          explanation: String.raw`其他运算规律已经在 $V$ 中成立，$W$ 可以直接继承。`,
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
              eyebrow: String.raw`这些向量能生成什么`,
              statement: String.raw`把一组向量任意加权相加，所有可能的结果组成它们的张成空间。`,
              formula: String.raw`\operatorname{span}(v_1,\ldots,v_k)\! =\!\left\{\sum_{i=1}^{k}a_iv_i:a_i\in F\right\}`,
              explanation: String.raw`张成关心“能否到达整个空间”；这组向量里仍然可能有多余的成员。`,
            },
            independence: {
              eyebrow: String.raw`有没有多余的向量`,
              statement: String.raw`若只有把所有系数都设为零，才能组合出零向量，这组向量就是线性无关的。`,
              formula: String.raw`\sum_{i=1}^{k}a_iv_i=0\ \Longrightarrow\ a_1=\cdots=a_k=0`,
              example: String.raw`若 $v_3=2v_1+v_2$，第三个向量就带来了冗余：删去它，张成空间不变。`,
            },
            basis: {
              eyebrow: String.raw`既够用，也没有冗余`,
              statement: String.raw`一组基既能张成整个空间，又线性无关。基中向量的个数，就是空间的维数。`,
              formula: String.raw`\#\{\text{无关组}\}\leq\dim V\leq\#\{\text{张成组}\}`,
              explanation: String.raw`在 $n$ 维空间里，无关组至多有 $n$ 个向量，张成组至少有 $n$ 个；基恰好有 $n$ 个。`,
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
              eyebrow: String.raw`给向量一份坐标表`,
              statement: String.raw`选定一组基后，每个向量都能用一组唯一的系数表示。`,
              formulas: [String.raw`v=\sum_{j=1}^{n}x_jb_j`, String.raw`[v]_{\mathcal B}=\begin{pmatrix}x_1\\\vdots\\x_n\end{pmatrix}`],
              explanation: String.raw`向量 $v$ 是对象本身；$[v]_{\mathcal B}$ 是它在基 $\mathcal B$ 下的坐标。换一组基，坐标会变，对象没有变。`,
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
          eyebrow: String.raw`把线性组合一起送过去`,
          statement: String.raw`线性映射保留加法与数乘，所以也保留任意线性组合。`,
          formulas: [String.raw`T(au+bv)=aT(u)+bT(v)`, String.raw`T\!\left(\sum_{j=1}^{n}x_jb_j\right)=\sum_{j=1}^{n}x_jT(b_j)`],
          explanation: String.raw`每个向量都是基向量的唯一线性组合。只要给出每个基向量的像，就确定了整个线性映射。`,
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
              eyebrow: String.raw`先记录每个基向量的去向`,
              statement: String.raw`矩阵的第 $j$ 列，是定义域第 $j$ 个基向量的像在目标空间中的坐标。`,
              formulas: [String.raw`T(b_j)=\sum_{i=1}^{m}a_{ij}c_i`, String.raw`A=\bigl([T(b_1)]_{\mathcal C}\ \cdots\ [T(b_n)]_{\mathcal C}\bigr)`],
              explanation: String.raw`这里 $\mathcal B=(b_1,\ldots,b_n)$ 是定义域的基，$\mathcal C=(c_1,\ldots,c_m)$ 是目标空间的基。`,
              footnote: String.raw`列向量记录的是基向量的像的坐标；这些像可能相关，也可能为零，不一定构成基。`,
            },
            multiply: {
              eyebrow: '从基的像，算出任意向量的像',
              statement: '输入坐标给出各基向量的权重；用这些权重组合矩阵的列，就得到输出坐标。',
              formulas: [String.raw`\begin{aligned}T(v)&=\sum_{j=1}^{n}x_jT(b_j)\\&=\sum_{i=1}^{m}\left(\sum_{j=1}^{n}a_{ij}x_j\right)c_i\end{aligned}`, String.raw`[T(v)]_{\mathcal C}=A[v]_{\mathcal B},\quad y_i=\sum_{j=1}^{n}a_{ij}x_j`],
              example: String.raw`$\begin{pmatrix}1&2\\3&4\end{pmatrix}\begin{pmatrix}x_1\\x_2\end{pmatrix}=\begin{pmatrix}x_1+2x_2\\3x_1+4x_2\end{pmatrix}$`,
            },
            data: {
              eyebrow: String.raw`把多个量放在同一张表里`,
              statement: String.raw`矩阵也常用来整理数据：行和列分别对应不同对象、变量或位置。`,
              formula: String.raw`A=(a_{ij})\in F^{m\times n},\qquad Ax=b`,
              bullets: [String.raw`方程组：每行对应一个方程，每列对应一个未知数`, String.raw`灰度图：行列定位像素，元素表示亮度`, String.raw`协方差与邻接矩阵：记录变量或节点间的关系`],
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
          eyebrow: String.raw`固定坐标系，看向量运动`,
          statement: String.raw`在同一空间、同一组基中，矩阵可以描述向量怎样移动和变形。`,
          formula: String.raw`x\longmapsto Ax`,
          bullets: [String.raw`旋转改变方向，保持长度`, String.raw`缩放改变不同方向上的尺度`, String.raw`反射、剪切也都可以是线性变换`],
          footnote: String.raw`这里讨论的是线性自映射 $T:V	o V$。`,
        },
      },
      children: [
        {
          id: 'orthogonal',
          title: '正交结构',
          subtitle: 'Orthogonal Group',
          summary: '保持内积、长度、夹角和距离的变换',
          accent: '#9AAE8F',
          details: {
            geometry: {
              eyebrow: String.raw`长度与夹角都保持`,
              statement: String.raw`正交矩阵的列构成标准正交基；它保留内积，因此也保留长度、夹角和距离。`,
              formulas: [String.raw`Q^{\mathsf T}Q=I,\qquad Q^{-1}=Q^{\mathsf T}`, String.raw`\langle Qx,Qy\rangle=\langle x,y\rangle`],
              bullets: [String.raw`$\det Q=1$：保持定向，属于旋转`, String.raw`$\det Q=-1$：改变定向，含有反射`, String.raw`$n$ 维旋转有 $n(n-1)/2$ 个自由度`],
            },
          },
        },
      ],
    },
    {
      id: 'composition',
      title: '复合与迹',
      subtitle: 'Composition & Trace',
      summary: '矩阵乘法就是线性映射复合的坐标形式',
      accent: '#B5855F',
      details: {
        product: {
          eyebrow: String.raw`先做一次映射，再做另一次`,
          statement: String.raw`矩阵乘法要把两次线性映射合起来，因此自然得到行乘列的规则。`,
          formula: String.raw`[S\circ T]=BA,\qquad (BA)_{ij}=\sum_k b_{ik}a_{kj}`,
          explanation: String.raw`先作用 $T$，再作用 $S$，在坐标中就是先乘 $A$、再乘 $B$。改变顺序，结果通常也会改变。`,
          example: String.raw`迹满足 $\operatorname{tr}(AB)=\operatorname{tr}(BA)$ 和循环换位；这并不意味着 $AB=BA$。`,
        },
      },
    },
    {
      id: 'passive-basis',
      title: '被动换基',
      subtitle: 'Frame Moves',
      summary: '向量不动，改变用于描述它的基与坐标',
      accent: '#396D80',
      details: {
        duality: {
          eyebrow: String.raw`固定向量，换一组坐标`,
          statement: String.raw`换基是在不同坐标系之间，翻译同一个向量的坐标。`,
          formula: String.raw`[v]_{\mathcal B}=P[v]_{\mathcal B\prime}`,
          explanation: String.raw`主动变换固定坐标系，改变向量；被动换基固定向量，改变描述它的基。看清什么保持不动，才能读懂矩阵的几何意义。`,
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
              eyebrow: String.raw`同一个映射，换一种表示`,
              statement: String.raw`输入与输出可以各自换基；若同一空间的两端使用相同的换基，就得到相似矩阵。`,
              formulas: [String.raw`A\prime=Q^{-1}AP`, String.raw`V=W,\ P=Q\ \Longrightarrow\ A\prime=P^{-1}AP`],
              explanation: String.raw`$P$ 把输入的新坐标转成旧坐标，$A$ 完成映射，$Q^{-1}$ 再把输出转成新坐标。相似矩阵描述的是同一个线性变换。`,
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
              title: '线性相关性',
              eyebrow: String.raw`先看相关关系会怎样变化`,
              statement: String.raw`线性映射不会消除已有的线性相关关系，还可能让原本无关的向量变得相关。`,
              formula: String.raw`\sum_j a_jv_j=0\ \Longrightarrow\ \sum_j a_jT(v_j)=0`,
              explanation: String.raw`对原来的关系式作用 $T$ 即可得到右侧关系，系数仍不全为零。新增的相关关系意味着更少的独立方向；这里用独立方向的数量理解“信息量”。`,
              example: String.raw`投影 $T(x,y)=(x,0)$ 把无关组 $e_1,e_2$ 变成 $e_1,0$，第二个方向的信息丢失了。`,
            },
            dimension: {
              eyebrow: '用维数数一数留下的方向',
              statement: '矩阵的秩，就是列向量张成空间的维数，也就是映射保留下来的独立方向数。',
              formula: String.raw`\operatorname{rank}A=\dim\operatorname{span}(a_1,\ldots,a_n)`,
              explanation: String.raw`列向量是基向量的像，所以列空间就是像空间。行化简保留列间关系；主元个数既是最大无关列数，也是最大无关行数，因此行秩等于列秩。`,
              example: String.raw`$\dim\ker T+\operatorname{rank}A=n$。满列秩对应单射，满行秩对应满射，方阵满秩才可逆。`,
            },
            maps: {
              title: '单射',
              eyebrow: String.raw`什么情况下不会把输入混在一起`,
              statement: String.raw`单射意味着不同输入得到不同输出；对线性映射，这等价于零空间里只有零向量。`,
              formulas: [String.raw`T\text{ 单射}\ \Longleftrightarrow\ \ker T=\{0\}`, String.raw`\ker T=\{0\}\ \Longleftrightarrow\ A\text{ 的列向量线性无关}`],
              explanation: String.raw`$T(u)=T(v)$ 等价于 $T(u-v)=0$。而 $Ax=\sum_j x_ja_j=0$ 只有零解，恰好是列向量线性无关的定义。`,
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
            approximation: {
              eyebrow: '保留主要方向，需要付出什么代价',
              statement: '按奇异值从大到小保留前 $k$ 个方向，就得到秩至多为 $k$ 的近似。',
              formulas: [String.raw`A_k=\sum_{i=1}^{k}\sigma_i u_i v_i^{\mathsf T}`, String.raw`\|A-A_k\|_F^2=\sum_{i>k}\sigma_i^2`],
              explanation: '秩只区分方向是否存在，奇异值还描述其强弱。尾部奇异值的平方和，精确给出舍弃这些方向带来的平方误差。',
              example: '图像压缩、降维与去噪据此在保留主要结构和减少数据量之间取舍。',
            },
            decomposition: {
              eyebrow: String.raw`从有多少方向，到各方向有多强`,
              statement: String.raw`秩数出保留了多少个独立方向；奇异值进一步告诉我们，每个方向被放大或缩小了多少。`,
              formulas: [String.raw`A=U\Sigma V^{\mathsf T},\qquad Av_i=\sigma_i u_i`, String.raw`\operatorname{rank}A=\#\{i:\sigma_i>0\}`],
              explanation: String.raw`$U,V$ 是正交矩阵；$\Sigma$ 是以奇异值为对角元的矩形对角阵。先用 $V^{\mathsf T}$ 换到主方向，再按 $\sigma_i$ 缩放，最后由 $U$ 转到输出方向。零奇异值对应完全丢失的方向。`,
              example: String.raw`$\sigma_i^2$ 是相应奇异分量的平方 Frobenius 范数。用这些平方值，就能量化保留各方向得到的能量。`,
            },
          },
        },
      ],
    },
    {
      id: 'matrix-space',
      title: '矩阵空间',
      subtitle: 'Matrix as Vector',
      summary: String.raw`$m\times n$ 矩阵在加法与数乘下构成 $mn$ 维线性空间`,
      accent: '#7D8981',
      details: {
        vector: {
          eyebrow: String.raw`矩阵本身也是向量`,
          statement: String.raw`两个同尺寸矩阵可以逐项相加，也可以数乘，因此矩阵本身组成一个向量空间。`,
          formula: String.raw`F^{m\times n},\qquad\dim F^{m\times n}=mn`,
          explanation: String.raw`把 $mn$ 个元素排成一列，就得到一份坐标。每个位置上只放一个 $1$、其他位置都放 $0$ 的矩阵，组成这个空间的一组基。`,
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
      summary: '线性自映射的有向体积缩放因子',
      accent: '#624F6B',
      details: {
        volume: {
          eyebrow: String.raw`空间的体积怎样改变`,
          statement: String.raw`行列式同时告诉我们体积缩放的幅度，以及空间的定向是否翻转。`,
          formula: String.raw`\operatorname{Vol}(A\Omega)=|\det A|\operatorname{Vol}(\Omega)`,
          bullets: [String.raw`$|\det A|$ 是体积缩放的比例`, String.raw`$\det A>0$ 保持定向，$\det A<0$ 翻转定向`, String.raw`$\det A=0$ 把空间压到更低维，方阵不可逆`],
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
          eyebrow: String.raw`哪些方向留在原来的直线上`,
          statement: String.raw`特征向量经过变换后仍在原来的直线上，只改变尺度，并可能反向。`,
          formulas: [String.raw`Av=\lambda v,\quad v\ne0`, String.raw`\det(A-\lambda I)=0`],
          explanation: String.raw`特征空间 $E_\lambda=\ker(A-\lambda I)$ 是不变子空间，满足 $A(E_\lambda)\subseteq E_\lambda$。`,
        },
      },
      children: [
        {
          id: 'spectral-theorem',
          title: '谱定理',
          subtitle: String.raw`$A=Q\Lambda Q^{\mathsf T}$`,
          summary: '实对称矩阵总有一组正交特征基',
          accent: '#9AAE8F',
          details: {
            diagonalize: {
              eyebrow: String.raw`对称矩阵有一组特别好用的基`,
              statement: String.raw`实对称矩阵总能找到一组标准正交的特征向量，让变换变成沿各方向独立缩放。`,
              formula: String.raw`A=A^{\mathsf T}\ \Longrightarrow\ A=Q\Lambda Q^{\mathsf T}`,
              explanation: String.raw`$Q$ 的列是标准正交特征向量，$\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)$。矩阵问题由此分成一组实数特征值问题。`,
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
          eyebrow: String.raw`给每个方向一个能量值`,
          statement: String.raw`二次型把一个向量变成标量，汇总不同方向上的权重与相互作用。`,
          formula: String.raw`q(x)=x^{\mathsf T}Ax=\sum_{i,j}a_{ij}x_ix_j`,
          explanation: String.raw`这是标量 $ax^2$ 的矩阵推广。在几何中，它可以描述长度的平方；在优化中，它描述局部曲率。`,
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
              eyebrow: String.raw`为什么二次型只需要对称矩阵`,
              statement: String.raw`矩阵的反对称部分对二次型没有贡献，所以只需保留对称部分。`,
              formulas: [String.raw`S=\frac{A+A^{\mathsf T}}2,\quad K=\frac{A-A^{\mathsf T}}2`, String.raw`x^{\mathsf T}Kx=-x^{\mathsf T}Kx=0,\quad x^{\mathsf T}Ax=x^{\mathsf T}Sx`],
              explanation: String.raw`因为 $K^{\mathsf T}=-K$，对标量 $x^{\mathsf T}Kx$ 取转置，值不变，却等于它的相反数，因此只能为零。`,
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
              eyebrow: String.raw`沿每个非零方向，能量都为正吗`,
              statement: String.raw`在正交特征基中，实对称矩阵的二次型分成各方向的平方项。正定性就由特征值符号决定。`,
              formulas: [String.raw`x^{\mathsf T}Ax=\sum_i\lambda_i y_i^2,\quad y=Q^{\mathsf T}x`, String.raw`A\succ0\ \Longleftrightarrow\ \lambda_i>0\quad\forall i`],
              bullets: [String.raw`所有特征值非负，则 $A\succeq0$（半正定）`, String.raw`同时有正、负特征值，则二次型不定`, String.raw`$A\succeq B\iff A-B\succeq0$ 定义 Loewner 偏序`],
              footnote: String.raw`偏序意味着并非任意两个实对称矩阵都可以比较。`,
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
