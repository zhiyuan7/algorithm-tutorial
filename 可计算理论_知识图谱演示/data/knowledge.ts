import type { KnowledgeMapData, KnowledgeNodeData } from './types'

const computabilityRoot: KnowledgeNodeData = {
  id: 'computability-root',
  title: '能不能算？',
  subtitle: 'Computability',
  summary: '算法对 YES、NO 与停机分别能作出什么保证',
  accent: '#13254F',
  details: {
    opening: {
      eyebrow: '第一问 · 能力边界',
      statement: '先不问快不快，只问：是否存在一个算法，能对所有输入给出所需保证？',
      explanation: 'Recognizable 和 Decidable 的差别，不在某台电脑的速度，而在算法是否必须对 NO 实例停下来。',
    },
  },
  children: [
    {
      id: 'recognizable',
      title: 'Recognizable',
      subtitle: '可识别',
      summary: 'YES 一定被接受；NO 可以拒绝，也可以永不停止',
      accent: '#396D80',
      details: {
        promise: {
          eyebrow: '单边保证',
          statement: '如果 x ∈ L，识别器最终一定接受；如果 x ∉ L，它可以停机拒绝，也可以一直运行。',
          formula: 'x ∈ L ⇒ 接受并停机　　x ∉ L ⇒ 拒绝或不停机',
          explanation: '可识别给的是“YES 终会被看见”的承诺，而不是完整的 YES / NO 决策程序。',
        },
        inclusion: {
          eyebrow: '严格包含',
          statement: '所有可判定语言都可识别，但有些可识别语言无法被任何判定器解决。',
          formula: 'Decidable ⊊ Recognizable',
          example: 'A_TM 正是“可识别但不可判定”的典型例子。',
        },
      },
      children: [
        {
          id: 'decidable',
          title: 'Decidable',
          subtitle: '可判定',
          summary: 'YES 与 NO 都在有限时间内给出正确答案',
          accent: '#163F6F',
          details: {
            guarantee: {
              eyebrow: '双边保证',
              statement: '判定器面对每一个输入都必须停机，并正确回答 YES 或 NO。',
              formula: 'x ∈ L ⇒ YES　　x ∉ L ⇒ NO　　且两者都有限步停机',
              explanation: '这比“能认出 YES”更强，因为等待本身不能成为 NO 的答案。',
            },
          },
        },
        {
          id: 'atm',
          title: 'A_TM',
          subtitle: '图灵机接受问题',
          summary: '模拟能看见接受，却无法统一判定不接受',
          accent: '#624F6B',
          details: {
            simulate: {
              eyebrow: '为什么可识别',
              statement: '在输入 ⟨M,w⟩ 上模拟 M(w)；只有当模拟真正进入接受状态时，识别器才接受。',
              formula: 'A_TM = { ⟨M,w⟩ | M 接受 w }',
              explanation: '若 M 接受，有限时间后就能看到；若 M 拒绝或不停机，A_TM 识别器不需要给出统一的停机保证。',
            },
            haltCorrection: {
              eyebrow: '关键区分',
              statement: '“只要 M(w) 停机就接受”识别的是 HALT_TM，不是 A_TM。',
              formula: 'A_TM：看到接受才接受　　HALT_TM：看到停机就接受',
              footnote: '两者都可识别、都不可判定，但语言定义不同。',
            },
          },
        },
        {
          id: 'diagonal',
          title: '对角线反证',
          subtitle: '假设 H · 构造 D · 输入自身',
          summary: '让机器反转关于自身的预测，逼出逻辑矛盾',
          accent: '#B5855F',
          details: {
            assume: {
              eyebrow: '步骤 1 · 反设',
              statement: '假设存在总能停机的判定器 H，能判断任意 M 是否接受 w。',
              formula: 'H(⟨M,w⟩) = YES ⇔ M 接受 w',
              explanation: '只要 H 存在，我们就可以把“另一个程序的接受行为”当成可调用的子程序。',
            },
            invert: {
              eyebrow: '步骤 2 · 构造 D',
              statement: 'D 把机器编码交给 H，并故意对 H 的预测采取相反行为。',
              formula: 'H(⟨M,⟨M⟩⟩)=YES ⇒ D 拒绝；否则 D 接受',
              explanation: 'D 的设计没有矛盾；矛盾只会在它读取自己的编码时出现。',
            },
            self: {
              eyebrow: '步骤 3 · 自指冲突',
              statement: '把 ⟨D⟩ 交给 D：它接受，当且仅当 H 预测它不接受。',
              formula: 'D 接受 ⟨D⟩ ⇔ D 不接受 ⟨D⟩',
              explanation: '无论 H 怎样回答都会错，因此 H 不可能存在，A_TM 不可判定。',
            },
          },
        },
      ],
    },
  ],
}

const complexityRoot: KnowledgeNodeData = {
  id: 'complexity-root',
  title: '要算多久？',
  subtitle: 'Computational Complexity',
  summary: '在算法会结束的前提下，研究时间与空间怎样随 n 增长',
  accent: '#13254F',
  details: {
    opening: {
      eyebrow: '第二问 · 资源代价',
      statement: '复杂度关心的不是这台电脑跑 0.1 秒还是 1 秒，而是输入规模 n 增大时资源怎样增长。',
      formula: 'T(n) 随 n 的增长率',
      explanation: '多项式增长通常相对温和；指数增长即使保证结束，也可能很快失去实用性。',
    },
  },
  children: [
    {
      id: 'decidable',
      title: 'Decidable',
      subtitle: '有限时间内总会结束',
      summary: '复杂度分类所在的可判定任务域',
      accent: '#163F6F',
      details: {
        finite: {
          eyebrow: '先有终点，才比较路程',
          statement: 'NP 中的问题即使没有已知快速算法，也可以有限枚举证据，因此仍属于 Decidable。',
          formula: 'P ⊆ NP ⊆ Decidable',
          explanation: '“非常慢”与“不可计算”之间隔着一个关键条件：算法最终是否保证停机。',
        },
      },
      children: [
        {
          id: 'np',
          title: 'NP',
          subtitle: 'YES 证据可快速验证',
          summary: '不是 Non-Polynomial，而是 Nondeterministic Polynomial Time',
          accent: '#396D80',
          details: {
            certificate: {
              eyebrow: '验证视角',
              statement: '对于 YES 实例，只要给出合适的 certificate，就能在多项式时间内验证。',
              formula: '给定 x 与证据 c：V(x,c) 在 poly(|x|) 时间内运行',
              explanation: 'NP 的定义关注证据验证；它不等于“所有只能指数时间求解的问题”。',
            },
          },
          children: [
            {
              id: 'p',
              title: 'P',
              subtitle: '可快速求解',
              summary: '确定性算法在固定次幂的多项式时间内判定',
              accent: '#74A0BA',
              details: {
                polynomial: {
                  eyebrow: 'Polynomial Time',
                  statement: '只要指数 k 是与输入无关的固定常数，O(n^k) 就属于多项式时间。',
                  formula: 'T(n) = O(n^k),　k 为固定常数',
                  bullets: ['O(n)、O(n²)、O(n³) 都属于 P 的增长尺度', '固定层数的 n 次循环通常产生 n^k', '多项式不等于一定实用，但它定义了经典的“高效”边界'],
                },
                maximum: {
                  eyebrow: '例子 · 找最大值',
                  statement: '从左到右扫描 n 个数，每个数只比较一次，就能找到最大值。',
                  formula: '3 → 8 → 8 → 10 → 10　　T(n)=O(n)',
                  explanation: '双重循环大约执行 n² 次，仍是多项式；关键不是循环本身，而是层数不随 n 增长。',
                },
                subset: {
                  eyebrow: '为什么 P ⊆ NP',
                  statement: '如果能在多项式时间内直接算出答案，当然也能在多项式时间内验证答案。',
                  formula: '快速求解 ⇒ 快速验证',
                },
              },
            },
            {
              id: 'sat',
              title: 'SAT',
              subtitle: 'NP-complete 代表问题',
              summary: '给出布尔赋值后，可快速检查公式是否为真',
              accent: '#9AAE8F',
              details: {
                witness: {
                  eyebrow: 'Certificate',
                  statement: '一组 TRUE / FALSE 赋值就是 SAT 的证据；代入公式即可快速验证。',
                  formula: '(x₁∨x₂) ∧ (¬x₁∨x₃) ∧ …',
                  example: '寻找赋值可能困难，但检查一份给定赋值只需逐个计算子句。',
                },
              },
              children: [
                {
                  id: 'exponential',
                  title: '指数枚举',
                  subtitle: '慢，但会结束',
                  summary: 'n 个布尔变量有 2^n 种赋值',
                  accent: '#B5855F',
                  details: {
                    bruteForce: {
                      eyebrow: 'Brute Force',
                      statement: '把全部 2^n 种赋值逐一尝试，时间会迅速爆炸，但搜索空间仍是有限的。',
                      formula: 'T(n)=O(2^n)',
                      explanation: '这说明 SAT 可判定；它不说明指数枚举就是最优算法，也不说明 NP 的定义是指数时间。',
                    },
                  },
                },
              ],
            },
            {
              id: 'open-question',
              title: 'P = NP ?',
              subtitle: '尚未解决',
              summary: '快速验证是否必然意味着快速找到',
              accent: '#624F6B',
              details: {
                question: {
                  eyebrow: '开放问题',
                  statement: '我们仍不知道：每个能快速验证 YES 证据的问题，是否都能快速求解。',
                  formula: 'P ⊆ NP　　但 P = NP ? 未知',
                  explanation: 'P 与 NP 的包含是已知事实；它们是否严格分开仍没有答案。',
                },
              },
            },
          ],
        },
      ],
    },
  ],
}

const universalityRoot: KnowledgeNodeData = {
  id: 'universality-root',
  title: '机器能表达什么？',
  subtitle: 'Computational Universality',
  summary: '从问题分类转向计算系统本身的模拟能力',
  accent: '#13254F',
  details: {
    synthesis: {
      eyebrow: '三问合流',
      statement: '图灵完备说明系统能表达所有可计算过程；复杂度说明代价；可计算性说明永远不能越过的边界。',
      formula: '能力 ≠ 效率 ≠ 无边界',
      explanation: '一个系统可以图灵完备，却仍然运行很慢，也仍然无法判定 A_TM。',
    },
  },
  children: [
    {
      id: 'turing-complete',
      title: 'Turing Complete',
      subtitle: '图灵完备',
      summary: '能够模拟任意图灵机的计算过程',
      accent: '#163F6F',
      details: {
        simulation: {
          eyebrow: '定义核心',
          statement: '如果一个系统能够模拟任意图灵机，就具有通用计算能力。',
          formula: 'Turing Complete = 能模拟任意图灵机',
          explanation: '普通编程语言和 Conway 生命游戏的载体完全不同，却都可以实现通用计算。',
        },
      },
      children: [
        {
          id: 'resources',
          title: '无固定资源上限',
          subtitle: '时间与存储原则上可扩展',
          summary: '模型不预先规定最多数据量或最多步骤数',
          accent: '#396D80',
          details: {
            ingredients: {
              eyebrow: '命令式系统的直观构件',
              statement: '条件分支、可扩展存储和无固定上限的循环或递归，通常足以构造通用计算。',
              formula: '分支 + 可扩展存储 + 无固定上限循环/递归',
              footnote: '这是直观构造条件；图灵完备的形式定义仍是模拟任意图灵机。',
            },
          },
          children: [
            { id: 'branching', title: '条件分支', subtitle: '根据状态选择', summary: '让控制流响应中间结果', accent: '#74A0BA' },
            { id: 'memory', title: '可扩展存储', subtitle: '保存不断增长的状态', summary: '理论模型不设固定容量上限', accent: '#9AAE8F' },
            { id: 'unbounded-loop', title: '无界循环 / 递归', subtitle: '步骤数不设固定上限', summary: '允许计算过程随输入继续展开', accent: '#B5855F' },
            {
              id: 'factorial',
              title: 'n! 示例',
              subtitle: '数据与步骤同时增长',
              summary: '输入越大，中间结果与计算过程越长',
              accent: '#D7B662',
              details: {
                growth: {
                  eyebrow: '为什么不能预设上限',
                  statement: '从 100! 推广到 n! 后，n 可以继续增大，中间数值和乘法步骤都会继续增长。',
                  formula: 'n! = n × (n−1) × … × 1',
                  explanation: '若系统硬性规定 n≤10000 或最多运行 10⁹ 步，总能构造超出限制的输入；那是有限设备限制，不是通用模型。',
                },
              },
            },
          ],
        },
        {
          id: 'boundary',
          title: '只覆盖可计算任务',
          subtitle: 'Universality has a boundary',
          summary: '图灵完备不等于任何问题都能解决',
          accent: '#624F6B',
          details: {
            limit: {
              eyebrow: '能力边界',
              statement: '图灵完备系统能完成任何存在算法的计算，却不能让不存在判定算法的问题突然可判定。',
              formula: '图灵完备 = 所有可计算过程　≠　所有问题',
              example: '它可以模拟识别 A_TM 的机器，但仍不能构造一个总能停机的 A_TM 判定器。',
            },
          },
        },
      ],
    },
  ],
}

export const knowledgeMaps: Record<string, KnowledgeMapData> = {
  computability: {
    id: 'computability',
    title: '可计算性的停机承诺',
    subtitle: 'Recognizable · Decidable · A_TM',
    layout: 'tree',
    root: computabilityRoot,
    relations: [
      { id: 'r-decidable-recognizable', source: 'decidable', target: 'recognizable', label: '严格包含', type: 'subset' },
      { id: 'r-atm-diagonal', source: 'atm', target: 'diagonal', label: '不可判定证明', type: 'limits' },
    ],
  },
  complexity: {
    id: 'complexity',
    title: '可判定域中的资源层级',
    subtitle: 'P · NP · Decidable',
    layout: 'tree',
    root: complexityRoot,
    relations: [
      { id: 'r-p-np', source: 'p', target: 'np', label: '快速求解 ⇒ 快速验证', type: 'subset' },
      { id: 'r-sat-exponential', source: 'sat', target: 'exponential', label: '有限枚举', type: 'example' },
      { id: 'r-open-p', source: 'open-question', target: 'p', label: '是否相等？', type: 'tests' },
    ],
  },
  universality: {
    id: 'universality',
    title: '图灵完备系统的能力结构',
    subtitle: 'Simulation · Resources · Boundary',
    layout: 'tree',
    root: universalityRoot,
    relations: [
      { id: 'r-resources-factorial', source: 'resources', target: 'factorial', label: '随输入扩展', type: 'example' },
      { id: 'r-complete-boundary', source: 'turing-complete', target: 'boundary', label: '不能越界', type: 'limits' },
    ],
  },
}
