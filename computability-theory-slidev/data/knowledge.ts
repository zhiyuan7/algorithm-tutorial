import type { KnowledgeMapData, KnowledgeNodeData } from './types'

const computabilityRoot: KnowledgeNodeData = {
  id: 'computability-root', title: '能不能算？', subtitle: '可计算性',
  summary: '先看算法能给出什么保证，再谈速度', accent: '#13254F',
  details: {
    opening: {
      eyebrow: '从一个简单的要求出发',
      statement: '给程序一个问题，我们希望它最终能告诉我们答案。这样的要求总能实现吗？',
      explanation: '先分清两种保证：能认出“是”，和无论“是”还是“不是”都能回答。',
    },
  },
  children: [
    {
      id: 'recognizable', title: '可识别', subtitle: 'Recognizable',
      summary: '答案是 YES 时，一定能认出来', accent: '#396D80',
      details: {
        promise: {
          eyebrow: '先看一种较弱的保证',
          statement: '答案是“是”时，程序最终一定接受；答案是“不是”时，它可以拒绝，也可能一直运行。',
          formula: String.raw`\begin{aligned}x\in L&\Rightarrow\text{最终接受}\\x\notin L&\Rightarrow\text{拒绝或一直运行}\end{aligned}`,
          explanation: '所以，暂时没有等到答案，还不能当作“不是”的证据。',
        },
      },
      children: [
        {
          id: 'halting', title: '停机问题', subtitle: '$\\mathrm{HALT}_{\\mathrm{TM}}$',
          summary: '能认出停机，却不能总是提前判定', accent: '#624F6B',
          details: {
            question: {
              eyebrow: '顺着图灵的思路再问一步',
              statement: '能否写出一个通用程序，判断任意程序在给定输入上，最终会不会停下来？',
              formula: String.raw`\mathrm{HALT}_{\mathrm{TM}}=\{\langle M,w\rangle\mid M(w)\text{ 停机}\}`,
              explanation: '这里，$M$ 表示程序，$w$ 表示输入。“停机”只要求计算结束，接受或拒绝都算。',
            },
            simulate: {
              eyebrow: '为什么能识别停机',
              statement: '直接模拟这个程序。只要它停下来，我们就能确认：这是一份会停机的输入。',
              formula: String.raw`M(w)\text{ 停机}\Rightarrow\text{模拟器最终接受}`,
              explanation: '如果原程序一直运行，模拟器也可以一直等。因此停机问题是可识别的。',
            },
            waiting: {
              eyebrow: '等待为什么不能解决全部问题',
              statement: '等了一分钟、一年，甚至更久，都无法据此断定程序永远不会停下来。',
              explanation: '它可能下一步就结束，也可能一直循环。模拟给了 YES 的保证，却没有给 NO 的保证。',
              example: '但这还不是不可判定的证明。接下来要排除所有可能的通用判定算法。',
            },
          },
          children: [
            {
              id: 'diagonal', title: '对角线反证', subtitle: '反设 → 反转 → 输入自身',
              summary: '让程序反转关于自身的停机预测', accent: '#B5855F',
              details: {
                assume: {
                  eyebrow: '假设这样的程序存在',
                  statement: '假设判定器 H 总能停机，而且能正确预测任意程序是否会停机。',
                  formula: String.raw`H(\langle M,w\rangle)=\begin{cases}\mathrm{YES},&M(w)\text{ 停机}\\\mathrm{NO},&M(w)\text{ 不停机}\end{cases}`,
                  explanation: '有了 H，我们就可以让另一个程序根据它的预测，选择接下来做什么。',
                },
                invert: {
                  eyebrow: '故意与预测反着来',
                  statement: '构造程序 D：让 H 预测 M 读取自身编码时会不会停机，再做相反的事。',
                  formula: String.raw`D(\langle M\rangle):\begin{cases}\text{一直循环},&H(\langle M,\langle M\rangle\rangle)=\mathrm{YES}\\\text{立即停机},&H(\langle M,\langle M\rangle\rangle)=\mathrm{NO}\end{cases}`,
                  explanation: 'H 说会停，D 就一直循环；H 说不会停，D 就立即结束。',
                },
                self: {
                  eyebrow: '现在，让 D 读自己的编码',
                  statement: '把 D 自己交给 D。无论 H 怎样预测，D 都会让这个预测出错。',
                  formula: String.raw`D(\langle D\rangle)\text{ 停机}\iff D(\langle D\rangle)\text{ 不停机}`,
                  explanation: '矛盾来自假设中的 H，所以这样的判定器不存在：停机问题不可判定。',
                },
              },
            },
          ],
        },
      ],
    },
    {
      id: 'decidable', title: '可判定', subtitle: 'Decidable',
      summary: 'YES 和 NO 都能在有限时间内回答', accent: '#163F6F',
      details: {
        guarantee: {
          eyebrow: '再看一种更强的保证',
          statement: '无论答案是“是”还是“不是”，程序都必须在有限时间内停机，并给出正确答案。',
          formula: String.raw`M(x)=\begin{cases}\mathrm{YES},&x\in L\\\mathrm{NO},&x\notin L\end{cases}`,
          explanation: '可判定一定可识别。两者的区别在于：面对 NO，程序也必须结束等待。',
        },
      },
    },
  ],
}

const complexityRoot: KnowledgeNodeData = {
  id: 'complexity-root', title: '要算多久？', subtitle: '计算复杂度',
  summary: '输入越来越大时，时间与存储怎样增长', accent: '#13254F',
  details: {
    opening: {
      eyebrow: '有了算法，还要看代价',
      statement: '知道程序最终会结束后，我们还想知道：输入变大时，需要付出多少时间和存储？',
      formula: String.raw`T(n)\quad\text{随输入规模 }n\text{ 的增长}`,
      explanation: '重点是增长规律，而不是某台电脑这一次用了几秒。',
    },
  },
  children: [
    {
      id: 'decidable', title: '可判定任务', subtitle: '总能在有限时间内结束',
      summary: 'P 与 NP 都在这个范围内', accent: '#163F6F',
      details: {
        compare: {
          eyebrow: '两种看待“快”的方式',
          title: '$\\mathrm{P}$ 与 $\\mathrm{NP}$',
          statement: 'P 关心能否快速求解；NP 关心给出一份 YES 证据后，能否快速验证。',
          formula: String.raw`\begin{aligned}\mathrm P&:\text{多项式时间求解}\\\mathrm{NP}&:\text{多项式时间验证证据}\end{aligned}`,
          explanation: '验证一份现成证据，与从头寻找答案，是不同的任务。这里的“快”指多项式时间。',
        },
        finite: {
          eyebrow: '把关系放回一起看',
          title: '慢，也仍然能算',
          statement: 'NP 的证据长度有多项式上界。把候选证据有限枚举完，总能得到 YES 或 NO。',
          formula: String.raw`\mathrm P\subseteq\mathrm{NP}\subseteq\mathrm{Decidable}`,
          explanation: '因此，搜索很慢并不等于不可判定。停机问题则在这片可判定范围之外。',
        },
      },
      children: [
        {
          id: 'p', title: '$\\mathrm P$', subtitle: '能快速求解',
          summary: '确定性多项式时间', accent: '#74A0BA',
          details: {
            polynomial: {
              eyebrow: 'Polynomial Time',
              statement: '如果运行时间由输入规模的某个固定次幂控制，就称为多项式时间。',
              formula: String.raw`T(n)=O(n^k),\qquad k\text{ 为固定常数}`,
              bullets: ['例如 $O(n)$、$O(n^2)$、$O(n^3)$。', '固定层数的循环常常产生这样的增长。', '多项式也可能很慢；这里讨论的是理论分类。'],
            },
            maximum: {
              eyebrow: '从熟悉的例子看起',
              title: '一次扫描找到最大值',
              statement: '从左到右检查每个数，并保存当前最大值，扫完一次就有答案。',
              formula: String.raw`3\to8\to8\to10\to10\qquad T(n)=O(n)`,
              explanation: '严格说，找最大值是求值任务；相应的“最大值是否至少为给定阈值”是 P 中的判定问题。',
            },
          },
        },
        {
          id: 'np', title: '$\\mathrm{NP}$', subtitle: '能快速验证 YES 证据',
          summary: 'Nondeterministic Polynomial Time', accent: '#396D80',
          details: {
            certificate: {
              eyebrow: '给一份证据，我来检查',
              statement: '对 YES 实例，存在一份长度受多项式限制的证据，可以在多项式时间内验证。',
              formula: String.raw`x\in L\iff\exists c:\ |c|\le p(|x|),\ V(x,c)=1`,
              bullets: ['NP 是 Nondeterministic Polynomial Time 的缩写。', '找证据可以先逐一枚举：代价可能很大，但候选总数有限。', '例如 $n$ 个布尔变量有 $2^n$ 种赋值。指数枚举是一种方法，并不是 NP 的定义。'],
            },
          },
          children: [
            {
              id: 'sat', title: '$\\mathrm{SAT}$', subtitle: '布尔可满足性问题',
              summary: '有没有一种赋值，让公式为真？', accent: '#9AAE8F',
              details: {
                meaning: {
                  eyebrow: 'Boolean Satisfiability',
                  title: 'SAT 在问什么？',
                  statement: 'SAT 是 Satisfiability 的缩写，指布尔可满足性：是否存在一组真、假赋值，让整个布尔公式为真？',
                  formula: String.raw`\varphi=(x_1\lor x_2)\land(\neg x_1\lor x_3)`,
                  explanation: '例如取三个变量都为真，就能让这个公式为真。所以这一实例的答案是 YES。',
                },
                witness: {
                  eyebrow: '把赋值当作证据',
                  title: '为什么 SAT 属于 NP？',
                  statement: '给出一组赋值后，直接代入公式，就能快速检查它是否真的让公式为真。',
                  formula: String.raw`x_1=x_2=x_3=\mathrm{TRUE}\quad\Rightarrow\quad\varphi=\mathrm{TRUE}`,
                  explanation: '找赋值与检查赋值是两回事。SAT 还是 NP 完全问题：若 SAT 能在多项式时间内求解，所有 NP 问题都能。',
                },
              },
              children: [
                {
                  id: 'open-question', title: '$\\mathrm P\\stackrel{?}{=}\\mathrm{NP}$', subtitle: '快速验证，能否快速找到？',
                  summary: '仍未解决的开放问题', accent: '#624F6B',
                  details: {
                    question: {
                      eyebrow: '从 SAT 回到更大的问题',
                      statement: '能快速验证一份证据，是否就一定能快速找到答案？这正是 P 与 NP 的问题。',
                      formula: String.raw`\mathrm P\subseteq\mathrm{NP}\qquad\mathrm P\stackrel{?}{=}\mathrm{NP}`,
                      explanation: '快速求解当然能快速验证，所以包含关系已知。它们是否相等，仍然没有答案。',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const universalityRoot: KnowledgeNodeData = {
  id: 'universality-root', title: '机器能表达什么？', subtitle: '通用计算能力',
  summary: '把目光从问题移向计算系统', accent: '#13254F',
  children: [
    {
      id: 'turing-complete', title: '图灵完备', subtitle: 'Turing Complete',
      summary: '能够模拟任意图灵机', accent: '#163F6F',
      details: {
        simulation: {
          eyebrow: '只要存在算法，就能表达',
          statement: '一个系统如果能模拟任意图灵机，就具有通用计算能力，也就是图灵完备。',
          explanation: '普通编程语言与 Conway 生命游戏形式很不同，但都能表达通用计算。这里默认时间与存储原则上可扩展。',
        },
      },
      children: [
        {
          id: 'resources', title: '时间与存储可扩展', subtitle: '不预设固定的资源上限',
          summary: '让计算过程能随输入继续展开', accent: '#396D80',
          details: {
            ingredients: {
              eyebrow: '看看程序需要哪些构件',
              statement: '在普通命令式系统中，我们用可扩展存储保存状态，再用条件分支与循环或递归推动计算。',
              bullets: ['存储：保存输入和不断变化的中间状态。', '控制：根据当前状态选择下一步，允许过程继续展开。'],
              footnote: '这是直观的构造方式。正式定义仍是能模拟任意图灵机。',
            },
          },
          children: [
            {
              id: 'control', title: '条件分支与循环', subtitle: '也可用递归展开',
              summary: '选择下一步，并按需要反复执行', accent: '#B5855F',
              details: {
                flow: {
                  eyebrow: '选择与重复，一起构成控制流',
                  title: '分支、循环与递归',
                  statement: '条件分支决定“下一步做什么”；循环或递归让这些步骤继续执行，直到满足结束条件。',
                  explanation: '计算次数不预设固定上限，并不意味着每次都要无限运行。有些程序会停机，有些会一直循环。',
                  example: '这也连接回停机问题：系统能够表达循环，不代表它能预先判断每段循环是否结束。',
                },
              },
            },
            { id: 'memory', title: '可扩展存储', subtitle: '保存不断变化的状态',
              summary: '理论模型不设固定容量上限', accent: '#9AAE8F' },
          ],
        },
        {
          id: 'boundary', title: '仍有无法判定的问题', subtitle: '通用计算也有边界',
          summary: '图灵完备不等于无所不能', accent: '#624F6B',
          details: {
            limit: {
              eyebrow: '回到停机问题',
              statement: '图灵完备能表达所有可计算过程，却不能凭空创造不存在的判定算法。',
              explanation: '它可以模拟程序，并识别实际发生的停机；但仍无法对所有程序提前给出正确的停机判断。',
              example: '能力回答“能表达什么”，复杂度回答“要付出多少代价”，可计算性则告诉我们哪里没有通用算法。',
            },
          },
        },
      ],
    },
  ],
}

export const knowledgeMaps: Record<string, KnowledgeMapData> = {
  computability: {
    id: 'computability', title: '算法能给出什么保证', subtitle: '可识别 · 可判定 · 停机问题',
    layout: 'tree', root: computabilityRoot,
    relations: [
      { id: 'r-decidable-recognizable', source: 'decidable', target: 'recognizable',
        label: '$\\mathrm{Decidable}\\subsetneq\\mathrm{Recognizable}$', type: 'subset' },
    ],
  },
  complexity: {
    id: 'complexity', title: '求解与验证的代价', subtitle: 'P · NP · SAT',
    layout: 'tree', root: complexityRoot,
    relations: [
      { id: 'r-p-np', source: 'p', target: 'np', label: '$\\mathrm P\\subseteq\\mathrm{NP}$', type: 'subset' },
      { id: 'r-open-p', source: 'open-question', target: 'p', label: '是否一样快？', type: 'tests' },
    ],
  },
  universality: {
    id: 'universality', title: '通用计算与它的边界', subtitle: '模拟 · 存储 · 控制流',
    layout: 'tree', root: universalityRoot,
    relations: [],
  },
}
