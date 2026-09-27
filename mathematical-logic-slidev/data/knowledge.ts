import type { KnowledgeMapData, KnowledgeNodeData } from './types'

const syntaxSemanticsRoot: KnowledgeNodeData = {
  id: 'logic-root',
  title: '形式如何获得意义',
  subtitle: 'Syntax · Semantics · Correspondence',
  summary: '语法给出结构，语义给出解释，健全性与完备性连接二者',
  accent: '#13254F',
  details: {
    opening: {
      eyebrow: '从一个公式说起',
      statement: '写下一个公式以后，还需要知道什么，才能判断它说了什么、是真是假？',
      formula: String.raw`P(a)\to Q(a)`,
      explanation: '答案分成两层：语法先判断它是否是合法公式；语义再在某个结构与赋值下判断它表达什么、是否为真。',
    },
    'same-formula': {
      eyebrow: '同一语法，两种解释',
      statement: '公式的结构不变，但 $P$、$Q$、$a$ 的解释一换，它说的事情和真假就可能改变。',
      formula: String.raw`\begin{gathered}\text{学生}(a)\to\text{会编程}(a)\\\text{偶数}(4)\to(4>10)\end{gathered}`,
      bullets: ['左侧可以谈“小明是否会编程”', '右侧在整数结构中是假命题', '变化发生在解释，不发生在语法'],
    },
  },
  children: [
    {
      id: 'syntax',
      title: '语法',
      subtitle: 'Syntax',
      summary: '规定哪些符号串是合法的项与公式',
      accent: '#163F6F',
      details: {
        truth: {
          eyebrow: '合法性不是真值',
          statement: '语法检查的是表达式写得对不对。公式在某个结构中是否为真，还要看它的解释。',
          formula: String.raw`\begin{gathered}\text{语法检查通过}\not\Rightarrow\text{求值成功}\\\text{公式合法}\not\Rightarrow\text{公式为真}\end{gathered}`,
          example: '例如，某些程序中的除零表达式可以通过语法检查，却在求值时出错。逻辑公式也可以写得合法，却在某个结构中为假。',
        },
      },
      children: [
        {
          id: 'signature',
          title: '符号表',
          subtitle: 'Signature',
          summary: '先声明常元、函数、关系与逻辑符号',
          accent: '#163F6F',
          details: {
            symbols: {
              eyebrow: '语法层 1 · 声明角色',
              statement: '在语言 $L$ 中，我们先约定符号的角色，再通过解释赋予它具体意义。',
              formula: String.raw`\begin{aligned}0&:\text{常元}\\+&:\text{二元函数符号}\\<&:\text{二元关系符号}\end{aligned}`,
              bullets: ['变量：$x,y,z,\\ldots$', '逻辑符号：$\\neg,\\land,\\lor,\\to,\\forall,\\exists,=$', '解释将在语义阶段给出'],
            },
          },
        },
        {
          id: 'term',
          title: '项',
          subtitle: 'Term',
          summary: '用来指称论域中对象的表达式',
          accent: '#163F6F',
          details: {
            term: {
              eyebrow: '语法层 2 · 指称对象',
              statement: '变量、常元以及把函数符号应用到已有项所得的表达式都是项。',
              formula: String.raw`\begin{gathered}x,\quad 0,\quad(x+0)+y\quad\text{是项}\\x<y\quad\text{不是项}\end{gathered}`,
              explanation: '$x<y$ 在陈述对象之间的关系，并不是用来指称一个对象的项。',
            },
          },
        },
        {
          id: 'formula',
          title: '公式',
          subtitle: 'Formula',
          summary: '由原子公式与联结词递归构造',
          accent: '#163F6F',
          details: {
            construction: {
              eyebrow: '语法层 3 · 形成陈述',
              statement: '关系符号作用于项先形成原子公式；联结词和量词再从已有公式递归生成复杂公式。',
              formula: String.raw`\begin{gathered}R(t_1,t_2)\quad\text{是原子公式}\\\neg\varphi,\quad(\varphi\land\psi),\\(\varphi\lor\psi),\quad(\varphi\to\psi)\end{gathered}`,
              bullets: ['$x<y$ 是原子公式', '$x+1=y$ 也是原子公式', '递归规则定义全部良构公式'],
            },
          },
        },
      ],
    },
    {
      id: 'semantics',
      title: '语义',
      subtitle: 'Semantics',
      summary: '在结构与赋值中解释符号并定义满足',
      accent: '#396D80',
      details: {
        setup: {
          eyebrow: '从形式到意义',
          statement: '要判断公式是否成立，需要先说明有哪些对象、符号怎样解释，以及变量取什么值。',
          formula: String.raw`\mathcal{M},s\models\varphi`,
        },
      },
      children: [
        {
          id: 'structure',
          title: '结构与解释',
          subtitle: 'Structure',
          summary: '非空论域加上常元、函数与关系的解释',
          accent: '#396D80',
          details: {
            model: {
              eyebrow: '严格的一阶结构',
              statement: '结构不只是一个集合：它还必须把语言中的每类非逻辑符号解释到这个论域上。',
              formula: String.raw`\begin{aligned}|\mathcal{M}|&=\mathbb{Z}\\0^{\mathcal{M}}&=0\\+^{\mathcal{M}}&=\text{整数加法}\\<^{\mathcal{M}}&=\text{整数小于关系}\end{aligned}`,
              footnote: '$\\mathbb{Z}$ 是论域；结构 $\\mathcal{M}$ 还包含符号的解释。',
            },
          },
        },
        {
          id: 'satisfaction',
          title: '赋值与满足',
          subtitle: 'Assignment & Satisfaction',
          summary: '变量取得对象后，递归判断公式何时为真',
          accent: '#396D80',
          details: {
            interpretations: {
              eyebrow: '同一公式，不同模型',
              statement: '结构解释 $P$、$Q$、$a$，赋值确定自由变量的取值，再按公式的结构判断真假。',
              formula: String.raw`\mathcal{M},s\models\varphi`,
              bullets: ['$P$ 可解释为“是学生”，也可解释为“是偶数”', '$a$ 可指小明，也可指整数 $4$', '语法树保持不动，满足结果可以改变'],
            },
          },
        },
      ],
    },
    {
      id: 'correspondence',
      title: '语法—语义对应',
      subtitle: 'Soundness & Completeness',
      summary: '可证明性与逻辑后承在经典一阶逻辑中吻合',
      accent: '#624F6B',
      details: {
        soundness: {
          eyebrow: '健全性 · Soundness',
          statement: '如果能从前提 $\\Gamma$ 证明 $\\varphi$，那么凡是使前提成立的模型，也都会使结论成立。',
          formula: String.raw`\Gamma\vdash\varphi\quad\Longrightarrow\quad\Gamma\models\varphi`,
          explanation: '这保证了：从成立的前提出发，按证明规则得到的结论也成立。',
        },
        completeness: {
          eyebrow: '完备性 · Completeness',
          statement: '在经典一阶逻辑中，如果 $\\varphi$ 在所有满足 $\\Gamma$ 的模型中都成立，就能从 $\\Gamma$ 给出形式证明。',
          formula: String.raw`\Gamma\models\varphi\quad\Longrightarrow\quad\Gamma\vdash\varphi`,
          explanation: '两个方向合起来：$\\Gamma\\vdash\\varphi\\iff\\Gamma\\models\\varphi$。',
        },
      },
      children: [
        {
          id: 'proof',
          title: '可证明性 $\\vdash$',
          subtitle: 'Syntactic Derivability',
          summary: '按形式规则从前提推到结论',
          accent: '#624F6B',
          details: {
            proof: {
              eyebrow: '句法关系',
              statement: '$\\Gamma\\vdash\\varphi$ 表示：从 $\\Gamma$ 中的前提出发，可以按规则经过有限步推导得到 $\\varphi$。',
              formula: String.raw`\Gamma\vdash\varphi`,
              explanation: '判断证明是否合规，只需检查公式、规则和推导步骤，不必先知道 $P$、$Q$ 具体指什么。',
            },
          },
        },
        {
          id: 'consequence',
          title: '逻辑后承 $\\models$',
          subtitle: 'Semantic Consequence',
          summary: '所有满足前提的模型也满足结论',
          accent: '#624F6B',
          details: {
            consequence: {
              eyebrow: '语义关系',
              statement: '$\\Gamma\\models\\varphi$ 表示：无论怎样解释符号、怎样给自由变量赋值，只要前提都成立，结论就成立。',
              formula: String.raw`\begin{gathered}\forall\mathcal{M},s:\\(\mathcal{M},s\models\Gamma)\Rightarrow(\mathcal{M},s\models\varphi)\end{gathered}`,
              explanation: '这里看的是所有满足前提的模型，而不是某一条推导过程。',
            },
          },
        },
      ],
    },
  ],
}

const quantifierRoot: KnowledgeNodeData = {
  id: 'quantifiers-root',
  title: '量词就是选择规则',
  subtitle: 'Order · Dependency · Uniformity',
  summary: '谁先选、谁后选，决定后一个对象能否依赖前一个对象',
  accent: '#13254F',
  details: {
    'first-order': {
      eyebrow: '一阶量词能选择什么',
      statement: '一阶量词选择的是论域中的对象，不直接量化谓词或关系。若要直接量化谓词或关系，就需要更高阶的逻辑框架。',
      formula: String.raw`\forall x,\ \exists x\quad\text{中的 }x\in|\mathcal{M}|`,
    },
    forall: {
      eyebrow: '全称量词 · 对所有对象',
      statement: '无论从论域中取哪个对象 $a$，把 $x$ 的值换成 $a$ 后，$\\varphi$ 都要成立。',
      formula: String.raw`\begin{gathered}\mathcal{M},s\models\forall x\,\varphi\\\iff\forall a\in|\mathcal{M}|:\ \mathcal{M},s[x\mapsto a]\models\varphi\end{gathered}`,
    },
    exists: {
      eyebrow: '存在量词 · 找到一个见证',
      statement: '只要能找到一个对象 $a$，使 $x$ 取这个值时 $\\varphi$ 成立，存在命题就成立。',
      formula: String.raw`\begin{gathered}\mathcal{M},s\models\exists x\,\varphi\\\iff\exists a\in|\mathcal{M}|:\ \mathcal{M},s[x\mapsto a]\models\varphi\end{gathered}`,
    },
  },
  children: [
    {
      id: 'dependent-choice',
      title: '逐个选择',
      subtitle: '$\\forall x\\,\\exists y$',
      summary: '先给定 $x$，再为它选择 $y$',
      accent: '#B5855F',
      details: {
        order: {
          eyebrow: '依赖选择',
          statement: '每给定一个 $x$，都可以重新找一个 $y$。不同的 $x$，可以对应不同的选择。',
          formula: String.raw`\forall x\,\exists y\,P(x,y)`,
          example: '例如在整数中，对任意 $x$ 可取 $y=x+1$，使 $x<y$。但有限非空全序中有最大元，同样的命题就不成立。',
        },
      },
      children: [
        {
          id: 'pointwise-continuity',
          title: '普通连续',
          subtitle: 'Pointwise Continuity',
          summary: '$\\delta$ 可以随位置 $x$ 和精度 $\\varepsilon$ 改变',
          accent: '#B5855F',
          details: {
            pointwise: {
              eyebrow: '分析中的逐点选择',
              statement: '先固定位置 $x$ 和精度 $\\varepsilon$，再找适合它们的 $\\delta$；换一个位置，可以重新选择。',
              formula: String.raw`\begin{gathered}\forall x\in D\ \forall\varepsilon>0\ \exists\delta>0\ \forall y\in D:\\\lvert x-y\rvert<\delta\Rightarrow\lvert f(x)-f(y)\rvert<\varepsilon\end{gathered}`,
              explanation: '这里允许 $\\delta=\\delta(x,\\varepsilon)$，所以它可以随位置改变。',
            },
          },
          children: [
            {
              id: 'x2-counterexample',
              title: '$x^2$ 的反例',
              subtitle: 'Continuous, not uniform',
              summary: '在 $\\mathbb{R}$ 上连续，却没有对所有位置通用的 $\\delta$',
              accent: '#644A56',
              details: {
                counterexample: {
                  eyebrow: '连续不推出一致连续',
                  statement: '固定精度 $\\varepsilon=1$。无论选多小的 $\\delta>0$，取 $y=x+\\delta/2$，都能在足够大的 $x$ 处使函数值差超过 $1$。',
                  formula: String.raw`\left|\left(x+\frac{\delta}{2}\right)^2-x^2\right|=\left|x\delta+\frac{\delta^2}{4}\right|`,
                  explanation: '这里 $|y-x|=\\delta/2<\\delta$，但函数值差仍可超过固定精度。因此 $f(x)=x^2$ 在 $\\mathbb{R}$ 上不一致连续。',
                },
              },
            },
          ],
        },
      ],
    },
    {
      id: 'uniform-choice',
      title: '统一选择',
      subtitle: '$\\exists y\\,\\forall x$',
      summary: '先选定一个 $y$，再让它适用于所有 $x$',
      accent: '#9AAE8F',
      details: {
        order: {
          eyebrow: '统一见证',
          statement: '先找到一个固定的 $y$，使每个 $x$ 都满足 $P(x,y)$。这个 $y$ 不能随着 $x$ 改变。',
          formula: String.raw`\exists y\,\forall x\,P(x,y)`,
          explanation: '所以这比 $\\forall x\\exists y\\,P(x,y)$ 的要求更强。',
        },
        implication: {
          eyebrow: '量词顺序与命题强弱',
          statement: '如果一个 $y$ 对所有 $x$ 都有效，当然也能逐个使用它。反过来，每次都能找到的 $y$ 未必是同一个。',
          formula: String.raw`\begin{gathered}\exists y\forall x\,P(x,y)\\\Longrightarrow\quad\forall x\exists y\,P(x,y)\end{gathered}`,
          footnote: '一般不能反向推出，因为逐个选择的 $y$ 可以依赖 $x$。',
        },
      },
      children: [
        {
          id: 'uniform-continuity',
          title: '一致连续',
          subtitle: 'Uniform Continuity',
          summary: '给定 $\\varepsilon$ 后，同一个 $\\delta$ 对整个定义域有效',
          accent: '#9AAE8F',
          details: {
            uniform: {
              eyebrow: '分析中的统一选择',
              statement: '给定精度 $\\varepsilon$ 后，就要找一个 $\\delta$，让它对定义域中的每一对位置 $x,y$ 都有效。',
              formula: String.raw`\begin{gathered}\forall\varepsilon>0\ \exists\delta>0\ \forall x,y\in D:\\\lvert x-y\rvert<\delta\Rightarrow\lvert f(x)-f(y)\rvert<\varepsilon\end{gathered}`,
              explanation: '这里要求 $\\delta=\\delta(\\varepsilon)$，它不能再依赖位置 $x$。',
            },
          },
        },
      ],
    },
  ],
}

export const syntaxSemantics: KnowledgeMapData = {
  id: 'syntax-semantics',
  title: '形式与解释',
  subtitle: '从良构公式到逻辑后承',
  layout: 'syntax-grid',
  root: syntaxSemanticsRoot,
  relations: [
    { id: 'r-formula-proof', source: 'formula', target: 'proof', label: '按规则推导', type: 'flow' },
    { id: 'r-structure-satisfaction', source: 'structure', target: 'satisfaction', label: '给出解释', type: 'supports' },
    { id: 'r-satisfaction-consequence', source: 'satisfaction', target: 'consequence', label: '遍历模型', type: 'flow' },
    { id: 'r-proof-consequence', source: 'proof', target: 'consequence', label: '健全性', type: 'supports' },
    { id: 'r-consequence-proof', source: 'consequence', target: 'proof', label: '完备性', type: 'supports' },
  ],
}

export const quantifierDependency: KnowledgeMapData = {
  id: 'quantifier-dependency',
  title: '选择与依赖',
  subtitle: '量词顺序怎样改变命题强度',
  layout: 'dependency',
  root: quantifierRoot,
  relations: [
    { id: 'r-uniform-dependent', source: 'uniform-choice', target: 'dependent-choice', label: '蕴含', type: 'supports' },
    { id: 'r-dependent-pointwise', source: 'dependent-choice', target: 'pointwise-continuity', label: '逐点应用', type: 'application' },
    { id: 'r-uniform-uniformity', source: 'uniform-choice', target: 'uniform-continuity', label: '一致应用', type: 'application' },
    { id: 'r-pointwise-not-uniform', source: 'pointwise-continuity', target: 'uniform-continuity', label: '通常不推出', type: 'limits' },
  ],
}

export const knowledgeMaps = {
  [syntaxSemantics.id]: syntaxSemantics,
  [quantifierDependency.id]: quantifierDependency,
}
