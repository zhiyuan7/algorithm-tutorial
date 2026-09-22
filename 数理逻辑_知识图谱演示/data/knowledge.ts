import type { KnowledgeMapData, KnowledgeNodeData } from './types'

const syntaxSemanticsRoot: KnowledgeNodeData = {
  id: 'logic-root',
  title: '形式如何获得意义',
  subtitle: 'Syntax · Semantics · Correspondence',
  summary: '语法给出结构，语义给出解释，健全性与完备性连接二者',
  accent: '#13254F',
  details: {
    opening: {
      eyebrow: '第一张知识图 · 根问题',
      statement: '写下一个公式时，我们究竟只是在排列符号，还是已经说出了一个真或假的命题？',
      formula: 'P(a) → Q(a)',
      explanation: '答案分成两层：语法先判断它是否是合法公式；语义再在某个结构与赋值下判断它表达什么、是否为真。',
    },
    'same-formula': {
      eyebrow: '同一语法，两种解释',
      statement: '公式的树形结构完全不变，但 P、Q、a 的解释一换，命题内容与真假都可能改变。',
      formula: '学生(a) → 会编程(a)    |    偶数(4) → 4>10',
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
          statement: '语法只检查表达式是否按规则构造，不负责保证它为真、可满足或能成功运行。',
          formula: 'grammar 合法  ≠  运行成功    |    公式合法  ≠  公式为真',
          example: '`x = 1 / 0` 可以通过语言语法检查，却在求值时失败；逻辑公式也可能完全合法却在某个模型中为假。',
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
              statement: '在语言 L 中，符号先只有“角色”，还没有具体对象或运算的意义。',
              formula: '0：常元    +：二元函数    <：二元关系',
              bullets: ['变量：x, y, z, …', '逻辑符号：¬, ∧, ∨, →, ∀, ∃, =', '解释将在语义阶段给出'],
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
              formula: 'x，0，(x+0)+y  是项    |    x<y  不是项',
              explanation: '`x<y` 不指称一个对象，而是在陈述两个对象之间的小于关系。',
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
              formula: 'R(t₁,t₂)  →  ¬φ，(φ∧ψ)，(φ∨ψ)，(φ→ψ)',
              bullets: ['x<y 是原子公式', 'x+1=y 也是原子公式', '递归规则定义全部良构公式'],
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
          statement: '语义不是给公式贴一句自然语言翻译，而是系统地指定论域、符号解释、变量赋值和满足关系。',
          formula: '结构 𝓜  +  赋值 s  ⟹  𝓜,s ⊨ φ',
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
              formula: '|𝓜|=ℤ，0^𝓜=0，+^𝓜=整数加法，<^𝓜=整数小于',
              footnote: '把“𝓜=ℤ”当作简写可以，但严格说 ℤ 只是结构的论域。',
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
              statement: '模型解释 P、Q、a，赋值解释自由变量；满足关系再按公式结构递归给出真假。',
              formula: '𝓜,s ⊨ φ',
              bullets: ['P 可解释为“是学生”，也可解释为“是偶数”', 'a 可指小明，也可指整数 4', '语法树保持不动，满足结果可以改变'],
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
          statement: '如果存在从 Γ 到 φ 的形式证明，那么 φ 在每个满足 Γ 的模型中都为真。',
          formula: 'Γ ⊢ φ  ⟹  Γ ⊨ φ',
          explanation: '证明系统不会把语义上错误的结论认证为定理。',
        },
        completeness: {
          eyebrow: '完备性 · Completeness',
          statement: '如果 φ 在所有满足 Γ 的模型中都为真，那么经典一阶逻辑能从 Γ 形式地证明 φ。',
          formula: 'Γ ⊨ φ  ⟹  Γ ⊢ φ',
          explanation: '两条方向合在一起得到 Γ ⊢ φ ⇔ Γ ⊨ φ。',
        },
      },
      children: [
        {
          id: 'proof',
          title: '可证明性 ⊢',
          subtitle: 'Syntactic Derivability',
          summary: '按形式规则从前提推到结论',
          accent: '#624F6B',
          details: {
            proof: {
              eyebrow: '句法关系',
              statement: '`Γ ⊢ φ` 表示存在一条有限形式推导，把 Γ 中的前提按规则变成 φ。',
              formula: 'Γ ⊢ φ',
              explanation: '这条关系只检查公式、规则与推导步骤，不需要先知道 P 或 Q 在现实中代表什么。',
            },
          },
        },
        {
          id: 'consequence',
          title: '逻辑后承 ⊨',
          subtitle: 'Semantic Consequence',
          summary: '所有满足前提的模型也满足结论',
          accent: '#624F6B',
          details: {
            consequence: {
              eyebrow: '语义关系',
              statement: '`Γ ⊨ φ` 同时考察所有使 Γ 为真的结构与赋值，要求它们也都使 φ 为真。',
              formula: '对每个 𝓜,s：若 𝓜,s ⊨ Γ，则 𝓜,s ⊨ φ',
              explanation: '它不是一条具体证明，而是一项跨越所有模型的真值要求。',
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
      eyebrow: '第二张知识图 · 一阶边界',
      statement: '一阶逻辑的量词直接遍历论域中的对象；若把谓词、集合或关系也作为量化对象，就进入更高阶的框架。',
      formula: '∀x，∃x：x 在论域 |𝓜| 中取值',
    },
    forall: {
      eyebrow: '全称量词 · 对所有对象',
      statement: '不管从论域中取哪个对象 a，把 x 的赋值改成 a 后，φ 都必须成立。',
      formula: '𝓜,s ⊨ ∀x φ  ⇔  对每个 a∈|𝓜|，𝓜,s[x↦a] ⊨ φ',
    },
    exists: {
      eyebrow: '存在量词 · 找到一个见证',
      statement: '只要论域中至少有一个对象 a，使更新 x 的赋值后 φ 成立，存在命题就为真。',
      formula: '𝓜,s ⊨ ∃x φ  ⇔  存在 a∈|𝓜|，𝓜,s[x↦a] ⊨ φ',
    },
  },
  children: [
    {
      id: 'dependent-choice',
      title: '逐个选择',
      subtitle: '∀x ∃y',
      summary: '先给 x，再允许为这个 x 选择 y',
      accent: '#B5855F',
      details: {
        order: {
          eyebrow: '依赖选择',
          statement: '对每个 x，都可以单独找一个 y；不同 x 对应的见证可以不同。',
          formula: '∀x ∃y P(x,y)    即    y 可以依赖 x',
          example: '在整数的通常小于关系中，给定任意 x，可取 y=x+1。但在有限严格序中，最大元可能让命题失败。',
        },
      },
      children: [
        {
          id: 'pointwise-continuity',
          title: '普通连续',
          subtitle: 'Pointwise Continuity',
          summary: 'δ 可以随位置 x 与 ε 一起改变',
          accent: '#B5855F',
          details: {
            pointwise: {
              eyebrow: '分析中的逐点选择',
              statement: '先固定位置 x 和精度 ε，再寻找适合这个位置的 δ；换位置时可以重新选择。',
              formula: '∀x ∀ε>0 ∃δ>0 ∀y：|x−y|<δ ⇒ |f(x)−f(y)|<ε',
              explanation: '依赖关系是 δ=δ(x,ε)。',
            },
          },
          children: [
            {
              id: 'x2-counterexample',
              title: 'x² 的反例',
              subtitle: 'Continuous, not uniform',
              summary: '在 R 上连续，但没有全局通用的 δ',
              accent: '#644A56',
              details: {
                counterexample: {
                  eyebrow: '连续不推出一致连续',
                  statement: '对任何固定的正 δ，走到足够大的 x 处，横向移动 δ 会造成任意大的函数值变化。',
                  formula: '|(x+δ)²−x²| = |2xδ+δ²|',
                  explanation: 'x 增大时斜率 2x 不断增大，所以为了控制同一个 ε，δ 必须随位置越来越小。',
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
      subtitle: '∃y ∀x',
      summary: '先选定一个 y，再让它同时应付所有 x',
      accent: '#9AAE8F',
      details: {
        order: {
          eyebrow: '统一见证',
          statement: '存在一个固定 y，使所有 x 都满足 P(x,y)；这个 y 不能在看见 x 后再改变。',
          formula: '∃y ∀x P(x,y)    即    y 不依赖 x',
          explanation: '因此它通常比 ∀x∃y P(x,y) 更强。',
        },
        implication: {
          eyebrow: '量词顺序与命题强弱',
          statement: '一个能应付所有 x 的统一见证，当然也能在逐个问题中反复使用；反过来则未必。',
          formula: '∃y∀x P(x,y)  ⟹  ∀x∃y P(x,y)',
          footnote: '箭头不能一般地反向：逐个选择得到的 y 可能随 x 改变。',
        },
      },
      children: [
        {
          id: 'uniform-continuity',
          title: '一致连续',
          subtitle: 'Uniform Continuity',
          summary: '给定 ε 后，一个 δ 对整个定义域通用',
          accent: '#9AAE8F',
          details: {
            uniform: {
              eyebrow: '分析中的统一选择',
              statement: '先给精度 ε，就要选出一个对定义域里所有位置 x、y 都有效的 δ。',
              formula: '∀ε>0 ∃δ>0 ∀x,y：|x−y|<δ ⇒ |f(x)−f(y)|<ε',
              explanation: '依赖关系是 δ=δ(ε)，不能再依赖具体位置 x。',
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
    { id: 'r-proof-correspondence', source: 'proof', target: 'correspondence', label: '健全', type: 'supports' },
    { id: 'r-consequence-correspondence', source: 'consequence', target: 'correspondence', label: '完备', type: 'supports' },
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
