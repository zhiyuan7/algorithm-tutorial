import type { KnowledgeMapData, KnowledgeNodeData } from './types'

const existenceRoot: KnowledgeNodeData = {
  id: 'existence-root', title: '存在的边界', subtitle: 'From Paradox to Axioms',
  summary: '集合的存在不再来自一句性质，而来自公理许可', accent: '#13254F',
  details: { opening: { eyebrow: '核心问题', statement: '是不是任意一个性质，都能确定一个集合？', explanation: '集合看似只是“把对象收集起来”，但一旦允许性质无条件地产生集合，自指就会把直觉推向矛盾。' } },
  children: [
    {
      id: 'naive', title: '朴素概括', subtitle: 'Naive Comprehension', summary: String.raw`把任意性质 $P(x)$ 直接变成集合`, accent: '#B5855F',
      details: { intuition: { eyebrow: '看似自然的规则', statement: '只要能说出一个性质，就假定所有满足它的对象组成集合。', formula: String.raw`P(x)\quad\Longrightarrow\quad\{x\mid P(x)\}`, explanation: '自然数、方程的解、曲线上的点都强化了这种直觉；危险藏在“任意”二字里。' } },
      children: [
        {
          id: 'russell', title: '罗素悖论', subtitle: 'Russell’s Paradox', summary: '自指让成员关系同时成立又不成立', accent: '#644A56',
          details: { contradiction: { eyebrow: '1901 · 自指危机', statement: String.raw`令 $R$ 收集所有“不属于自身”的集合，再问 $R$ 是否属于自己。`, formula: String.raw`\begin{gathered}R=\{x\mid x\notin x\}\\R\in R\iff R\notin R\end{gathered}`, bullets: [String.raw`若 $R\in R$，定义要求 $R\notin R$。`, String.raw`若 $R\notin R$，它满足条件，故 $R\in R$。`], footnote: '问题不在某个奇怪集合，而在无约束的集合形成规则。' } },
        },
        {
          id: 'universal', title: '全体集合不是集合', subtitle: 'No Universal Set', summary: '“所有集合”若成集合，分离会重建悖论', accent: '#7D665C',
          details: { noUniversal: { eyebrow: '同一危机的另一面', statement: String.raw`假设 $V$ 包含所有集合，在其中取出不属于自身的成员，矛盾仍然出现。`, formula: String.raw`\begin{gathered}R=\{x\in V\mid x\notin x\}\\R\in R\iff R\notin R\end{gathered}`, explanation: '因此集合论中不能存在“所有集合组成的集合”；集合宇宙不是它自己的一个普通成员。' } },
        },
      ],
    },
    {
      id: 'zfc', title: 'ZF / ZFC', subtitle: 'Axiomatic Set Theory', summary: '把“存在什么集合”交给明确的公理与模式', accent: '#163F6F',
      details: { overview: { eyebrow: '从悖论到公理', statement: '能描述一个集合，不等于已经证明它存在。', explanation: 'ZF 将集合的存在与性质写成明确的公理。接下来，我们先看这些规则怎样判断集合相同，以及怎样从已有集合中得到子集。', footnote: '在 ZF 中加入选择公理，就得到 ZFC。' } },
      children: [
        {
          id: 'extensionality', title: '外延公理', subtitle: 'Extensionality', summary: '集合只由它有哪些元素决定', accent: '#396D80',
          details: { identity: { eyebrow: '集合的同一性', statement: '两个集合拥有完全相同的元素，当且仅当它们是同一个集合。', formula: String.raw`\forall z\,(z\in x\iff z\in y)\iff x=y`, example: String.raw`$\{1,2,3\}=\{3,2,1\}$；$x^2=1$ 与 $|x|=1$ 的描述不同，解集都为 $\{-1,1\}$。` } },
        },
        {
          id: 'separation', title: '分离公理模式', subtitle: 'Separation', summary: '只能从一个已经存在的集合中筛选', accent: '#624F6B',
          details: { bounded: { eyebrow: '关键限制', statement: String.raw`性质只能从一个已经存在的集合 $A$ 中筛选出子集。`, formula: String.raw`\underbrace{\{x\mid P(x)\}}_{\text{无范围约束}}\qquad\underbrace{\{x\in A\mid P(x)\}}_{\text{在集合内筛选}}`, explanation: String.raw`多出来的 $x\in A$ 限定了筛选范围，从而避开罗素悖论中的无约束概括。` } },
        },
      ],
    },
  ],
}

const constructionRoot: KnowledgeNodeData = {
  id: 'construction-root', title: '结构的生长', subtitle: 'Sets Encode Mathematics', summary: '顺序、关系、自然数与数系都能由集合编码', accent: '#13254F',
  details: { opening: { eyebrow: '集合怎样表达结构', statement: '集合本身无序，却能编码顺序；集合只有成员关系，却能长出函数、算术与数系。', explanation: '关键不在宣称“对象本质上就是集合”，而在构造满足该对象所需的结构性质。' } },
  children: [
    {
      id: 'ordered-pair', title: '有序对', subtitle: 'Ordered Pair', summary: '用无序集合编码第一与第二位置', accent: '#396D80',
      details: { kuratowski: { eyebrow: 'Kuratowski 构造', statement: '这个集合构造精确实现了有序对的判等规则。', formula: String.raw`\begin{gathered}(a,b)=\{\{a\},\{a,b\}\}\\(a,b)=(c,d)\iff a=c\land b=d\end{gathered}`, explanation: '构造的价值在于保存位置，而不是断言有序对只能以这一种方式存在。' } },
      children: [
        {
          id: 'relation', title: '关系与函数', subtitle: 'Relations & Functions', summary: '关系是有序对的集合，函数是特殊关系', accent: '#74A0BA',
          details: {
            relation: { eyebrow: '从笛卡尔积到关系', statement: '先收集所有可能的有序对，再用子集挑出真正相关的那些对。', formula: String.raw`\begin{gathered}A\times B=\{(a,b)\mid a\in A,b\in B\}\\R\subseteq A\times B\end{gathered}`, explanation: '关系不需要成为新的原始对象；它仍是集合。' },
            function: { eyebrow: '函数也是关系', statement: String.raw`从 $A$ 到 $B$ 的函数，是每个输入都恰好对应一个输出的关系。`, formula: String.raw`\begin{gathered}f\subseteq A\times B\\\forall x\in A\;\exists!y\in B:\;(x,y)\in f\end{gathered}`, explanation: '“存在且唯一”把普通关系收紧为函数。这个视角稍后会变成比较基数的双射工具。' },
          },
          children: [
            {
              id: 'tuples', title: '多元组', subtitle: 'Finite Tuples',
              summary: String.raw`用函数 $f:n\to A$ 保存每个位置的取值`, accent: '#74A0BA',
              details: { finite: {
                eyebrow: '自然数是位置集合',
                statement: String.raw`一个 $n$ 元组就是函数 $f:n\to A$；输入是位置，输出是该位置的值。`,
                formula: String.raw`\begin{gathered}n=\{0,1,\ldots,n-1\}\\A^n=\{f\mid f:n\to A\}\end{gathered}`,
                bullets: [
                  String.raw`$f(i)=a_i$ 表示第 $i$ 个位置；顺序固定，取值可以重复。`,
                  String.raw`三元组 $(a,b,a)$：$f(0)=f(2)=a$，$f(1)=b$。`,
                  String.raw`一个函数对应一个元组；$A^n$ 收集所有这样的函数。`,
                ],
                footnote: String.raw`$n=2$ 时，与有序对一一对应；$n=0$ 时，唯一的空函数就是空元组。`,
              } },
            },
          ],
        },
        {
          id: 'equivalence', title: '等价类与划分', subtitle: 'Equivalence Classes', summary: '自反、对称、传递把集合切成互不重叠的块', accent: '#ACA6BF',
          details: { partition: {
            eyebrow: '等价关系与划分的定义',
            statement: String.raw`$A$ 上的等价关系，是二元关系 $\sim$，对任意 $a,b,c\in A$ 满足以下三条。`,
            formula: String.raw`\begin{aligned}\text{自反：}\;&a\sim a\\\text{对称：}\;&a\sim b\Rightarrow b\sim a\\\text{传递：}\;&a\sim b\land b\sim c\Rightarrow a\sim c\end{aligned}`,
            bullets: [
              String.raw`等价类：$[a]=\{x\in A\mid x\sim a\}$。`,
              String.raw`划分 $\Pi\subseteq\mathcal P(A)$：每一块非空，不同块互不相交，且 $\bigcup\Pi=A$。`,
              String.raw`等价类组成划分；反过来，定义 $a\sim b$ 当且仅当二者属于同一块。`,
            ],
            example: String.raw`按奇偶划分整数：$\mathbb Z=[0]\sqcup[1]$。`,
          } },
        },
        {
          id: 'order', title: '序关系', subtitle: 'Partial · Total · Well-order', summary: '在关系上逐层增加可比性与最小元条件', accent: '#624F6B',
          details: {
            hierarchy: { eyebrow: '从偏序到良序', statement: '在偏序上增加条件，就得到全序和良序。', bullets: ['偏序：自反、反对称、传递。', '全序：任意两个元素都可以比较。', '良序：每个非空子集都有最小元。'], example: String.raw`$(\mathbb N,\le)$ 是良序。$(\mathbb R,\le)$ 不是：非空子集 $\mathbb R$ 自身没有最小元，因为对任意 $r\in\mathbb R$，都有 $r-1<r$。`, footnote: '这里讨论的是实数的通常次序；良序定理说可以另选一种良序。' },
            choice: {
              title: '选择与直觉', eyebrow: 'Jerry Bona',
              quote: "The Axiom of Choice is obviously true; the Well Ordering Principle is obviously false; and who can tell about Zorn's Lemma?",
              statement: '同样的数学内容，换一种说法，直觉就可能完全不同。',
              formula: String.raw`\mathrm{AC}\iff\text{良序定理}\iff\text{佐恩引理}`,
              explanation: '这是一句玩笑：在 ZF 中，这三个命题彼此等价。良序定理保证每个集合可以配备某种良序，并不是说它原来的次序就是良序。',
              source: { label: '出处：Eric Schechter · Axiom of Choice', url: 'https://math.vanderbilt.edu/schectex/ccc/choice.html' },
            },
          },
        },
      ],
    },
    {
      id: 'naturals', title: '自然数', subtitle: 'Von Neumann Ordinals', summary: '每个自然数就是所有更小自然数的集合', accent: '#B5855F',
      details: {
        construction: { eyebrow: '从空集开始', statement: String.raw`$0$ 是空集，后继将 $n$ 自身加入 $n$，于是次序可以用成员关系表示。`, formula: String.raw`\begin{gathered}0=\varnothing,\quad S(n)=n\cup\{n\}\\n=\{0,1,\ldots,n-1\}\end{gathered}`, bullets: [String.raw`$1=\{0\}$`, String.raw`$2=\{0,1\}$`, String.raw`$m<n\iff m\in n$`, String.raw`$m\le n\iff m\subseteq n$`] },
        induction: { eyebrow: 'Peano 结构', statement: String.raw`$0$、后继与归纳原则把这些集合组织成熟悉的自然数系统。`, formula: String.raw`\begin{gathered}A\subseteq\mathbb N,\quad0\in A\\\forall n\in A,\;S(n)\in A\quad\Longrightarrow\quad A=\mathbb N\end{gathered}`, explanation: '归纳法说：任何包含起点并对后继封闭的自然数子集，只能是整个自然数集。' },
      },
      children: [
        {
          id: 'recursion', title: '递归算术', subtitle: 'Recursive Arithmetic', summary: '加法与乘法由基例和后继步骤定义', accent: '#D7B662',
          details: { arithmetic: { eyebrow: '运算不是天生存在', statement: '有了自然数，还要用递归规则定义加法，再用加法定义乘法。', formula: String.raw`\begin{aligned}m+0&=m\\m+S(n)&=S(m+n)\\1+1&=2\end{aligned}`, bullets: [String.raw`$m\cdot0=0$`, String.raw`$m\cdot S(n)=m\cdot n+m$`, '交换律与结合律再由归纳证明'] } },
        },
        {
          id: 'integers', title: '整数', subtitle: String.raw`$\mathbb Z$`, summary: '自然数有序对按“差相同”取等价类', accent: '#396D80',
          details: { quotient: { eyebrow: '第一次数系扩张', statement: String.raw`把 $(a,b)$ 看成形式差 $a-b$；代表同一差的有序对归为一个整数。`, formula: String.raw`\begin{gathered}(a,b)\sim(c,d)\iff a+d=b+c\\\mathbb Z=(\mathbb N\times\mathbb N)/{\sim}\end{gathered}`, example: String.raw`$(3,1)$ 与 $(4,2)$ 都代表整数 $2$。` } },
          children: [
            {
              id: 'rationals', title: '有理数', subtitle: String.raw`$\mathbb Q$`, summary: '整数对按交叉乘积相等取等价类', accent: '#74A0BA',
              details: { quotient: { eyebrow: '第二次等价类构造', statement: '同一个比值有许多表示；等价关系把它们压成一个有理数。', formula: String.raw`\begin{gathered}(a,b)\sim(c,d)\iff ad=bc\\a,c\in\mathbb Z,\quad b,d\in\mathbb Z\setminus\{0\}\end{gathered}`, example: String.raw`$(1,2)\sim(2,4)\sim(3,6)$。每个有理数都由一类分数表示。` } },
              children: [
                {
                  id: 'reals', title: '实数', subtitle: String.raw`$\mathbb R$`, summary: '用 Dedekind 分割填补有理数轴的空隙', accent: '#624F6B',
                  details: {
                    cut: {
                      title: '戴德金分割', eyebrow: '用有理数定义实数',
                      statement: String.raw`戴德金分割可以用一个集合 $A\subseteq\mathbb Q$ 表示，它满足以下条件。`,
                      bullets: [
                        String.raw`非空且不取遍有理数：$\varnothing\ne A\ne\mathbb Q$。`,
                        String.raw`向下封闭：若 $q\in A$、$p\in\mathbb Q$ 且 $p<q$，则 $p\in A$。`,
                        String.raw`没有最大元：对每个 $q\in A$，存在 $r\in A$ 使 $q<r$。`,
                      ],
                      formula: String.raw`A=\{q\in\mathbb Q\mid q<0\lor q^2<2\}`,
                      example: String.raw`这个分割代表 $\sqrt2$。令 $B=\mathbb Q\setminus A$，则 $(A,B)$ 将有理数分为左右两部分，并且任意 $a\in A,b\in B$ 都满足 $a<b$。`,
                      footnote: '这里采用左侧不含端点的约定；实数就是所有满足这些条件的分割。',
                    },
                    completeness: { eyebrow: '完备性的多种面孔', statement: '在实数或阿基米德完备有序域的语境中，确界、单调收敛、区间套、聚点、紧致与 Cauchy 收敛彼此紧密相连。', bullets: ['上确界给单调有界序列极限', '区间套支撑二分法与聚点', 'Heine–Borel 刻画闭区间紧致性', 'Cauchy 完备单独不排除非阿基米德有序域'], footnote: '一般有序域中需额外区分 Dedekind 完备、度量完备与 Archimedean 性。' },
                  },
                  children: [
                    {
                      id: 'extensions', title: '复数与更远扩张', subtitle: String.raw`$\mathbb C\;\cdot\;\mathbb H\;\cdot\;\mathbb O$`, summary: '扩张获得新能力，也依次失去原有性质', accent: '#9AAE8F',
                      details: { losses: { eyebrow: '数系构造链', statement: '复数可由实数有序对构造；继续扩张时，结构能力增加，代数性质逐步减少。', formula: String.raw`\begin{gathered}\mathbb N\longrightarrow\mathbb Z\longrightarrow\mathbb Q\longrightarrow\mathbb R\\\longrightarrow\mathbb C\longrightarrow\mathbb H\longrightarrow\mathbb O\end{gathered}`, bullets: [String.raw`$\mathbb C$ 可在 $\mathbb R\times\mathbb R$ 上规定加法与乘法来构造。`, String.raw`$\mathbb R\to\mathbb C$：无法保留与域运算兼容的全序。`, String.raw`$\mathbb C\to\mathbb H$：失去乘法交换律。`, String.raw`$\mathbb H\to\mathbb O$：失去乘法结合律。`] } },
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
  details: { opening: { eyebrow: '比较无限集合', statement: '面对无法“数完”的集合，大小应该怎样比较？', explanation: 'Cantor 把问题从计数转成对应关系，由此发现无限不止一种，而且没有最大的无限。' } },
  children: [
    {
      id: 'bijection', title: '双射', subtitle: 'Bijection', summary: '一一对应定义相同基数', accent: '#396D80',
      details: { compare: { eyebrow: 'Cantor 的关键转向', statement: '不要试图数完无限集合；为两个集合的元素建立一一对应。', formula: String.raw`\exists\text{双射 }f:A\to B\quad\iff\quad|A|=|B|`, explanation: '函数从“结构构造工具”变成“集合大小比较工具”。' } },
      children: [
        {
          id: 'countable', title: '可数无限', subtitle: String.raw`$\aleph_0$`, summary: String.raw`$\mathbb N$、$\mathbb Z$、$\mathbb Q$ 都能逐个编号`, accent: '#74A0BA',
          details: { enumerate: {
            eyebrow: '把可数性写成具体构造',
            statement: String.raw`取 $\mathbb N=\{0,1,2,\ldots\}$，分别构造整数和可数并的编号。`,
            formula: String.raw`f(n)=\begin{cases}-n/2,&n\text{ 为偶数}\\(n+1)/2,&n\text{ 为奇数}\end{cases}`,
            bullets: [
              String.raw`整数双射 $f:\mathbb N\to\mathbb Z$：$0,1,-1,2,-2,\ldots$。`,
              String.raw`枚举每个非空可数集：$A_n=\{a_{n,m}\mid m\in\mathbb N\}$。`,
              String.raw`按 $n+m$ 逐层读取：$(0,0);(0,1),(1,0);(0,2),(1,1),(2,0);\ldots$。`,
              String.raw`输出 $a_{n,m}$，跳过空集、删除重复，就列出 $\bigcup_{n\in\mathbb N}A_n$。`,
            ],
            footnote: '有限集的枚举允许重复；并集至多可数。同时选定全部枚举一般需要可数选择，ZFC 保证此步骤。',
          } },
        },
        {
          id: 'diagonal', title: '实数不可数', subtitle: 'Diagonal Argument', summary: '对角线构造逃出任何声称完整的列表', accent: '#644A56',
          details: { escape: { eyebrow: 'Cantor 对角线', statement: String.raw`假设 $(0,1)$ 中的实数已排成列表，改变第 $n$ 个数的第 $n$ 位，就得到列表之外的新实数。`, formula: String.raw`\begin{gathered}b_n=\begin{cases}2,&a_{nn}=1\\1,&a_{nn}\ne1\end{cases}\\r=0.b_1b_2\ldots\ne r_n\quad(\forall n)\end{gathered}`, bullets: [String.raw`与 $r_1$ 在第 $1$ 位不同。`, String.raw`与 $r_2$ 在第 $2$ 位不同。`, String.raw`与每个 $r_n$ 都至少一位不同。`], footnote: String.raw`只选数字 $1$ 与 $2$，避开 $0.4999\ldots=0.5000\ldots$ 的双重表示问题。` } },
        },
      ],
    },
    {
      id: 'cantor', title: 'Cantor 定理', subtitle: 'Power Set Theorem', summary: '任意集合的幂集都严格更大', accent: '#624F6B',
      details: { theorem: { eyebrow: '不存在最大的无穷', statement: String.raw`假设 $A$ 能满射到它的幂集，构造对角集合 $D$ 就会得到矛盾。`, formula: String.raw`\begin{gathered}D=\{x\in A\mid x\notin f(x)\}\\|A|<|\mathcal P(A)|\end{gathered}`, explanation: String.raw`若 $f(a)=D$，就有 $a\in D\iff a\notin D$。这里的 $D$ 在集合 $A$ 内构造，矛盾否定的是满射的存在。` } },
      children: [
        {
          id: 'ch', title: '连续统假设', subtitle: 'Continuum Hypothesis', summary: String.raw`$\aleph_0$ 与连续统之间是否存在中间基数`, accent: '#B5855F',
          details: { question: { eyebrow: 'Hilbert 第一问题', statement: '自然数的无限与实数的无限之间，还有没有第三种基数？', formula: String.raw`\begin{gathered}\mathrm{CH}:\;2^{\aleph_0}=\aleph_1\\\text{是否存在 }\aleph_0<|A|<|\mathbb R|\;?\end{gathered}`, explanation: 'Cantor 猜测不存在中间基数；问题最终没有在 ZFC 内得到真或假的判决。' } },
          children: [
            {
              id: 'independence', title: '独立于 ZFC', subtitle: 'Gödel · Cohen', summary: '在一致性假设下，CH 与其否定都可与 ZFC 相容', accent: '#9AAE8F',
              details: { result: { eyebrow: '公理系统的边界', statement: String.raw`若 ZFC 一致，连续统假设 $\mathrm{CH}$ 及其否定，都无法由 ZFC 证明。`, formula: String.raw`\begin{gathered}\mathrm{ZFC}\nvdash\mathrm{CH}\\\mathrm{ZFC}\nvdash\neg\mathrm{CH}\end{gathered}`, bullets: [String.raw`Gödel：若 ZFC 一致，$\mathrm{ZFC}+\mathrm{CH}$ 也一致。`, String.raw`Cohen：若 ZFC 一致，$\mathrm{ZFC}+\neg\mathrm{CH}$ 也一致。`, '结论依赖相应的一致性假设'], footnote: '集合论从“哪些集合存在”出发，最终发现：答案也取决于我们选择哪些公理。' } },
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
    { id: 'r-naive-russell', source: 'naive', target: 'russell', label: '导致矛盾', type: 'limits' },
    { id: 'r-universal-zfc', source: 'universal', target: 'zfc', label: '转向公理', type: 'flow' },
    { id: 'r-separation-russell', source: 'separation', target: 'russell', label: '限制概括范围', type: 'tests' },
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
