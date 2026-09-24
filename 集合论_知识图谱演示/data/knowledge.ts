import type { KnowledgeMapData, KnowledgeNodeData } from './types'

const existenceRoot: KnowledgeNodeData = {
  id: 'existence-root', title: '存在的边界', subtitle: 'From Paradox to Axioms',
  summary: '集合的存在不再来自一句性质，而来自公理许可', accent: '#13254F',
  details: { opening: { eyebrow: '核心问题', statement: '是不是任意一个性质，都能确定一个集合？', explanation: '集合看似只是“把对象收集起来”，但一旦允许性质无条件地产生集合，自指就会把直觉推向矛盾。' } },
  children: [
    {
      id: 'naive', title: '朴素概括', subtitle: 'Naive Comprehension', summary: '把任意性质 P(x) 直接变成集合', accent: '#B5855F',
      details: { intuition: { eyebrow: '看似自然的规则', statement: '只要能说出一个性质，就假定所有满足它的对象组成集合。', formula: 'P(x)  ⟹  { x | P(x) }', explanation: '自然数、方程的解、曲线上的点都强化了这种直觉；危险藏在“任意”二字里。' } },
      children: [
        {
          id: 'russell', title: '罗素悖论', subtitle: 'Russell’s Paradox', summary: '自指让成员关系同时成立又不成立', accent: '#644A56',
          details: { contradiction: { eyebrow: '1901 · 自指危机', statement: '令 R 收集所有“不属于自身”的集合，再问 R 是否属于 R。', formula: 'R = {x | x ∉ x}    ⇒    R ∈ R ⇔ R ∉ R', bullets: ['若 R∈R，定义要求 R∉R', '若 R∉R，R 又满足条件，故 R∈R'], footnote: '问题不在某个奇怪集合，而在无约束的集合形成规则。' } },
        },
        {
          id: 'universal', title: '全体集合不是集合', subtitle: 'No Universal Set', summary: '“所有集合”若成集合，分离会重建悖论', accent: '#7D665C',
          details: { noUniversal: { eyebrow: '同一危机的另一面', statement: '假设 V 包含所有集合，在 V 内分离出不属于自身的成员，矛盾仍然出现。', formula: 'R = {x ∈ V | x ∉ x}    ⇒    R ∈ R ⇔ R ∉ R', explanation: '因此集合论中不能存在“所有集合组成的集合”；集合宇宙不是它自己的一个普通成员。' } },
        },
      ],
    },
    {
      id: 'zfc', title: 'ZF / ZFC', subtitle: 'Axiomatic Set Theory', summary: '把“存在什么集合”交给明确的公理与模式', accent: '#163F6F',
      details: { overview: { eyebrow: '1908 以后 · 公理化转向', statement: '集合不再因为“可以描述”就存在，而要由公理给出存在与构造许可证。', bullets: ['外延：怎样识别同一集合', '分离：怎样在既有集合内筛选', '构造公理：怎样得到新集合', '无穷与正则：保证结构并约束成员链', 'ZF 加选择公理得到 ZFC'] } },
      children: [
        {
          id: 'extensionality', title: '外延公理', subtitle: 'Extensionality', summary: '集合只由它有哪些元素决定', accent: '#396D80',
          details: { identity: { eyebrow: '集合的同一性', statement: '两个集合拥有完全相同的元素，当且仅当它们是同一个集合。', formula: '∀z(z∈x ↔ z∈y)  ⇒  x=y', example: '{1,2,3}={3,2,1}；描述“x²=1”与“|x|=1”内涵不同，外延同为 {−1,1}。' } },
        },
        {
          id: 'separation', title: '分离公理模式', subtitle: 'Separation', summary: '只能从一个已经存在的集合中筛选', accent: '#624F6B',
          details: { bounded: { eyebrow: '关键限制', statement: '性质不再从“所有对象”中造集合；它只能切出既有集合 A 的一部分。', formula: '{x | P(x)}   ✕      {x ∈ A | P(x)}   ✓', explanation: '多出来的“x∈A”就是现代公理化集合论避开 Russell 型悖论的核心约束。' } },
        },
        {
          id: 'constructors', title: '受控构造', subtitle: 'Set Constructors', summary: '空集、配对、并、幂集、替换与无穷逐步扩展宇宙', accent: '#9AAE8F',
          details: { toolkit: { eyebrow: '公理工具箱', statement: '公理不是一张任意集合的清单，而是一组可重复使用的构造动作。', bullets: ['空集与配对提供起点', '并集与幂集扩展已有集合', '替换沿函数像生成新集合', '无穷公理保证归纳集合存在', '正则公理排除恶性成员环'], footnote: '下一张图将展示这些动作如何长出熟悉的数学对象。' } },
        },
      ],
    },
  ],
}

const constructionRoot: KnowledgeNodeData = {
  id: 'construction-root', title: '结构的生长', subtitle: 'Sets Encode Mathematics', summary: '顺序、关系、自然数与数系都能由集合编码', accent: '#13254F',
  details: { opening: { eyebrow: '第二张图谱', statement: '集合本身无序，却能编码顺序；集合只有成员关系，却能长出函数、算术与数系。', explanation: '关键不在宣称“对象本质上就是集合”，而在构造满足该对象所需的结构性质。' } },
  children: [
    {
      id: 'ordered-pair', title: '有序对', subtitle: 'Ordered Pair', summary: '用无序集合编码第一与第二位置', accent: '#396D80',
      details: { kuratowski: { eyebrow: 'Kuratowski 构造', statement: '这个集合构造精确实现了有序对的判等规则。', formula: '(a,b)={{a},{a,b}}    且    (a,b)=(c,d) ⇔ a=c ∧ b=d', explanation: '构造的价值在于保存位置，而不是断言有序对只能以这一种方式存在。' } },
      children: [
        {
          id: 'relation', title: '关系与函数', subtitle: 'Relations & Functions', summary: '关系是有序对的集合，函数是特殊关系', accent: '#74A0BA',
          details: {
            relation: { eyebrow: '从笛卡尔积到关系', statement: '先收集所有可能的有序对，再用子集挑出真正相关的那些对。', formula: 'A×B={(a,b)|a∈A,b∈B}      R⊆A×B', explanation: '关系不需要成为新的原始对象；它仍是集合。' },
            function: { eyebrow: '函数也是关系', statement: '从 A 到 B 的函数，是每个输入都恰好对应一个输出的关系。', formula: 'f⊆A×B    且    ∀x∈A, ∃!y∈B : (x,y)∈f', explanation: '“存在且唯一”把普通关系收紧为函数。这个视角稍后会变成比较基数的双射工具。' },
          },
        },
        {
          id: 'equivalence', title: '等价类与划分', subtitle: 'Equivalence Classes', summary: '自反、对称、传递把集合切成互不重叠的块', accent: '#ACA6BF',
          details: { partition: { eyebrow: '关系产生新对象', statement: '等价关系与集合划分互相生成；一个“数”可以是一整类等价表示。', formula: 'a∼b ⇔ a−b 为偶数      ℤ=[0] ⊔ [1]', example: '偶数类与奇数类互不相交，合起来覆盖所有整数。' } },
        },
        {
          id: 'order', title: '序关系', subtitle: 'Partial · Total · Well-order', summary: '在关系上逐层增加可比性与最小元条件', accent: '#624F6B',
          details: { hierarchy: { eyebrow: '从偏序到良序', statement: '序也是二元关系；不同公理决定它能组织对象到什么程度。', bullets: ['偏序：自反、反对称、传递', '全序：再要求任意两元素可比', '良序：再要求每个非空子集有最小元'], example: '(ℕ,≤) 良序；(ℝ,≤) 不是，因为 (0,1) 没有最小元。' } },
        },
      ],
    },
    {
      id: 'naturals', title: '自然数', subtitle: 'Von Neumann Ordinals', summary: '每个自然数就是所有更小自然数的集合', accent: '#B5855F',
      details: {
        construction: { eyebrow: '从空集开始', statement: '0 是空集，后继把 n 自身加入 n，于是序与成员关系重合。', formula: '0=∅    S(n)=n∪{n}    n={0,1,…,n−1}', bullets: ['1={0}', '2={0,1}', 'm<n ⇔ m∈n', 'm≤n 可由 m⊆n 体现'] },
        induction: { eyebrow: 'Peano 结构', statement: '0、后继与归纳原则把这些集合组织成熟悉的自然数系统。', formula: '0∈A  且  n∈A⇒S(n)∈A    ⟹    A=ℕ', explanation: '归纳法说：任何包含起点并对后继封闭的自然数子集，只能是整个自然数集。' },
      },
      children: [
        {
          id: 'recursion', title: '递归算术', subtitle: 'Recursive Arithmetic', summary: '加法与乘法由基例和后继步骤定义', accent: '#D7B662',
          details: { arithmetic: { eyebrow: '运算不是天生存在', statement: '有了自然数，还要用递归规则定义加法，再用加法定义乘法。', formula: 'm+0=m    m+S(n)=S(m+n)    ⇒    1+1=2', bullets: ['m·0=0', 'm·S(n)=m·n+m', '交换律与结合律再由归纳证明'] } },
        },
        {
          id: 'integers', title: '整数', subtitle: 'ℤ', summary: '自然数有序对按“差相同”取等价类', accent: '#396D80',
          details: { quotient: { eyebrow: '第一次数系扩张', statement: '把 (a,b) 看成形式差 a−b；代表同一差的有序对归为一个整数。', formula: '(a,b)∼(c,d) ⇔ a+d=b+c      ℤ=(ℕ×ℕ)/∼', example: '(3,1) 与 (4,2) 都代表整数 2。' } },
          children: [
            {
              id: 'rationals', title: '有理数', subtitle: 'ℚ', summary: '整数对按交叉乘积相等取等价类', accent: '#74A0BA',
              details: { quotient: { eyebrow: '第二次等价类构造', statement: '同一个比值有许多表示；等价关系把它们压成一个有理数。', formula: '(a,b)∼(c,d) ⇔ ad=bc      b,d≠0', example: '(1,2)∼(2,4)∼(3,6)。数再次成为某种集合的等价类。' } },
              children: [
                {
                  id: 'reals', title: '实数', subtitle: 'ℝ', summary: '用 Dedekind 分割填补有理数轴的空隙', accent: '#624F6B',
                  details: {
                    cut: { eyebrow: '从稠密到完备', statement: '即使 √2 不是有理数，所有位于它左边的有理数组成的集合仍可代表它。', formula: 'A={q∈ℚ | q<0 或 q²<2}      A ↔ √2', explanation: '实数由“怎样切开有理数”确定，空隙被集合本身填补。' },
                    completeness: { eyebrow: '完备性的多种面孔', statement: '在实数或阿基米德完备有序域的语境中，确界、单调收敛、区间套、聚点、紧致与 Cauchy 收敛彼此紧密相连。', bullets: ['上确界给单调有界序列极限', '区间套支撑二分法与聚点', 'Heine–Borel 刻画闭区间紧致性', 'Cauchy 完备单独不排除非阿基米德有序域'], footnote: '一般有序域中需额外区分 Dedekind 完备、度量完备与 Archimedean 性。' },
                  },
                  children: [
                    {
                      id: 'extensions', title: '复数与更远扩张', subtitle: 'ℂ · ℍ · 𝕆', summary: '扩张获得新能力，也依次失去原有性质', accent: '#9AAE8F',
                      details: { losses: { eyebrow: '数系构造链', statement: '复数可由实数有序对构造；继续扩张时，结构能力增加，代数性质逐步减少。', formula: 'ℕ → ℤ → ℚ → ℝ → ℂ → ℍ → 𝕆', bullets: ['ℂ≅ℝ×ℝ，并规定加法与乘法', 'ℝ→ℂ：失去兼容通常全序', 'ℂ→ℍ：失去乘法交换律', 'ℍ→𝕆：一般失去乘法结合律'] } },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const infinityRoot: KnowledgeNodeData = {
  id: 'infinity-root', title: '无限的阶梯', subtitle: 'Cardinality & Independence', summary: '双射比较大小，幂集不断产生更大的无限', accent: '#13254F',
  details: { opening: { eyebrow: '第三张图谱', statement: '面对无法“数完”的集合，大小应该怎样比较？', explanation: 'Cantor 把问题从计数转成对应关系，由此发现无限不止一种，而且没有最大的无限。' } },
  children: [
    {
      id: 'bijection', title: '双射', subtitle: 'Bijection', summary: '一一对应定义相同基数', accent: '#396D80',
      details: { compare: { eyebrow: 'Cantor 的关键转向', statement: '不要试图数完无限集合；为两个集合的元素建立一一对应。', formula: '存在双射 f:A→B    ⇔    |A|=|B|', explanation: '函数从“结构构造工具”变成“集合大小比较工具”。' } },
      children: [
        {
          id: 'countable', title: '可数无限', subtitle: 'ℵ₀', summary: 'ℕ、ℤ、ℚ 外观不同却能逐个编号', accent: '#74A0BA',
          details: { enumerate: { eyebrow: '无穷也可以一样大', statement: '整数交替排列，有理数沿网格对角线去重枚举，它们都与自然数等势。', formula: '|ℤ|=|ℚ|=|ℕ|=ℵ₀', example: '0,1,−1,2,−2,3,−3,… 给出整数的一种枚举。', footnote: '“可数多个可数集合之并可数”的一般形式涉及可数选择；ZFC 中可直接使用。' } },
        },
        {
          id: 'diagonal', title: '实数不可数', subtitle: 'Diagonal Argument', summary: '对角线构造逃出任何声称完整的列表', accent: '#644A56',
          details: { escape: { eyebrow: 'Cantor 对角线', statement: '假设 (0,1) 的实数已排成列表，逐行改变第 n 个数的第 n 位，就得到不在列表中的新实数。', formula: 'bₙ=2（若 aₙₙ=1），否则 bₙ=1    ⇒    r≠rₙ', bullets: ['与 r₁ 在第 1 位不同', '与 r₂ 在第 2 位不同', '与每个 rₙ 都至少一位不同'], footnote: '只选数字 1 与 2，避开 0.4999…=0.5000… 的双重表示问题。' } },
        },
      ],
    },
    {
      id: 'cantor', title: 'Cantor 定理', subtitle: 'Power Set Theorem', summary: '任意集合的幂集都严格更大', accent: '#624F6B',
      details: { theorem: { eyebrow: '不存在最大的无穷', statement: '假设 A 能满射到它的幂集，构造“没有被自己映像包含”的对角集合就会矛盾。', formula: 'D={x∈A | x∉f(x)}    ⇒    |A|<|𝒫(A)|', explanation: '对角线结构与罗素悖论遥相呼应，但这里 D 被安全地限制在既有集合 A 内。' } },
      children: [
        {
          id: 'ch', title: '连续统假设', subtitle: 'Continuum Hypothesis', summary: 'ℵ₀ 与连续统之间是否存在中间基数', accent: '#B5855F',
          details: { question: { eyebrow: 'Hilbert 第一问题', statement: '自然数的无限与实数的无限之间，还有没有第三种基数？', formula: '2^{ℵ₀}=ℵ₁ ?      是否存在 ℵ₀<|A|<|ℝ| ?', explanation: 'Cantor 猜测不存在中间基数；问题最终没有在 ZFC 内得到真或假的判决。' } },
          children: [
            {
              id: 'independence', title: '独立于 ZFC', subtitle: 'Gödel · Cohen', summary: '在一致性假设下，CH 与其否定都可与 ZFC 相容', accent: '#9AAE8F',
              details: { result: { eyebrow: '公理系统的边界', statement: 'Gödel 与 Cohen 的结果合起来表明：只凭 ZFC，既不能证明 CH，也不能证明 ¬CH。', formula: 'ZFC ⊬ CH      且      ZFC ⊬ ¬CH', bullets: ['Gödel：可构造宇宙支持 ZFC+CH 的相对一致性方向', 'Cohen：forcing 构造 ZFC+¬CH 的模型方向', '结论依赖相应的一致性假设'], footnote: '集合论从“哪些集合存在”出发，最终发现：答案也取决于我们选择哪些公理。' } },
            },
          ],
        },
      ],
    },
  ],
}

export const existenceBoundary: KnowledgeMapData = {
  id: 'existence-boundary', title: '从悖论到公理', subtitle: '哪些集合被允许存在', layout: 'foundation', root: existenceRoot,
  relations: [
    { id: 'r-naive-russell', source: 'naive', target: 'russell', label: '自指击穿', type: 'limits' },
    { id: 'r-universal-zfc', source: 'universal', target: 'zfc', label: '迫使重建', type: 'flow' },
    { id: 'r-separation-russell', source: 'separation', target: 'russell', label: '限制来源', type: 'tests' },
  ],
}

export const constructionLadder: KnowledgeMapData = {
  id: 'construction-ladder', title: '从集合到数学结构', subtitle: '编码、商集、递归与完备化', layout: 'construction', root: constructionRoot,
  relations: [
    { id: 'r-equivalence-integers', source: 'equivalence', target: 'integers', label: '商构造', type: 'application' },
    { id: 'r-order-naturals', source: 'order', target: 'naturals', label: '成员即次序', type: 'application' },
  ],
}

export const infinityLadder: KnowledgeMapData = {
  id: 'infinity-ladder', title: '无限、幂集与独立性', subtitle: '从双射到 ZFC 的判定边界', layout: 'infinity', root: infinityRoot,
  relations: [
    { id: 'r-countable-diagonal', source: 'countable', target: 'diagonal', label: '对角分界', type: 'limits' },
    { id: 'r-diagonal-cantor', source: 'diagonal', target: 'cantor', label: '推广方法', type: 'supports' },
    { id: 'r-cantor-independence', source: 'cantor', target: 'independence', label: '逼近边界', type: 'flow' },
  ],
}

export const knowledgeMaps = {
  [existenceBoundary.id]: existenceBoundary,
  [constructionLadder.id]: constructionLadder,
  [infinityLadder.id]: infinityLadder,
}
