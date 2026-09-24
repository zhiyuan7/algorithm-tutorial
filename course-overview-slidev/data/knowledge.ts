import type { KnowledgeMapData, KnowledgeNodeData } from './types'

const cycleRoot: KnowledgeNodeData = {
  id: 'cycle-root',
  title: '科学认识循环',
  subtitle: 'Reality · Model · Theory · Experiment',
  summary: '从现实出发，经过建模与演绎，再回到现实检验',
  accent: '#13254F',
  details: {
    opening: {
      eyebrow: '核心问题',
      statement: '我们如何从混杂的现实中，得到可检验、可修正的知识？',
      explanation: '这不是一条从数据直通真理的直线，而是一个不断往返的循环。',
    },
  },
  children: [
    {
      id: 'reality',
      title: '现实',
      subtitle: 'Reality',
      summary: '问题切割出的现实片段',
      accent: '#163F6F',
      details: {
        complexity: {
          eyebrow: '第一部分 · 现实世界',
          statement: '科学面对的从来不是“整个现实”，而是研究问题切割出的某一方面。',
          explanation: '机器人运动同时受到摩擦、齿隙、温度、电流波动、机械弹性和传感器噪声影响。任何一种描述都只能保留其中一部分。',
          bullets: ['研究问题决定看见什么', '观测工具决定记录什么', '抽象决定保留什么'],
        },
      },
    },
    {
      id: 'induction',
      title: '第一座桥',
      subtitle: '归纳与建模',
      summary: '把观测压缩为可操作的模型',
      accent: '#396D80',
      details: {
        pipeline: {
          eyebrow: 'Induction & Modeling',
          statement: '建模的每一步都在选择信息，抽象因此总是相对的。',
          formula: '观测  →  数据处理  →  变量选择  →  模型构建',
          explanation: '原始图像不直接告诉我们距离。图像处理先提取像素高度，建模再把像素量连到物理量。',
        },
        monocular: {
          eyebrow: '具体范例 · 单目测距',
          statement: '已知装甲板真实高度 H，从图像中测得像素高度 h，就可用针孔模型估计距离 Z。',
          formula: 'h / f = H / Z    ⇒    Z = fH / h',
          bullets: ['图像处理产生观测量 h', '焦距 f 和已知高度 H 提供尺度', '模型建立 h 与 Z 的关系'],
          footnote: '理想针孔模型是对成像过程的抽象。',
        },
      },
    },
    {
      id: 'theory',
      title: '理论',
      subtitle: 'Theory',
      summary: '对一类现象的一般规律',
      accent: '#624F6B',
      details: {
        distinction: {
          eyebrow: '第三部分 · 理论与模型',
          statement: '理论描述一般规律，模型描述某个具体系统如何组织。',
          explanation: '经典力学的 F = ma 不直接告诉我们一个具体单摆怎样运动。还需要给出长度、质量、角度与约束。',
        },
        pendulum: {
          eyebrow: '从一般规律到具体方程',
          statement: '单摆模型选择角度 θ 作为状态，再把牛顿力学施加到模型上。',
          formula: 'F = ma    ⇒    θ̈ = −(g/l) sinθ    ⇒    θ̈ + (g/l) sinθ = 0',
          bullets: ['理论提供演绎规则', '模型提供对象结构', '初始条件决定具体轨迹'],
        },
      },
    },
    {
      id: 'deduction',
      title: '第二座桥',
      subtitle: '演绎与实验',
      summary: '从假说推出预测，再用现实检验',
      accent: '#B5855F',
      details: {
        method: {
          eyebrow: 'Hypothetico-Deductive Method',
          statement: '一个科学假说必须能推出可观测后果，实验结果再反过来约束假说。',
          formula: 'H ⇒ P      ¬P ⇒ ¬H      P ⇏ H',
          explanation: '否定预测可以迫使我们检查假说或辅助条件，但预测成立并不能独占性地证明假说。',
        },
        yolo: {
          eyebrow: '具体范例 · 目标检测',
          statement: '如果目标像素面积越小，YOLO 的检测性能越低，那么只改变距离就应该得到可重复的性能下降。',
          formula: '1m  ·  2m  ·  3m  ·  4m  ·  5m',
          bullets: ['保持光照与目标类别尽量不变', '统计 mAP 或 recall', '结果支持假说，或迫使修改假说'],
        },
      },
    },
  ],
}

const paradigmRoot: KnowledgeNodeData = {
  id: 'paradigms-root',
  title: '科学的两种范式',
  subtitle: 'Formal Sciences & Natural Sciences',
  summary: '一边研究规则可以推出什么，一边检验世界实际如何',
  accent: '#13254F',
  children: [
    {
      id: 'formal',
      title: '形式科学',
      subtitle: 'Formal Sciences',
      summary: '接受一组规则，研究它们能推出什么',
      accent: '#624F6B',
      details: {
        paradigm: {
          eyebrow: '范式 A',
          statement: '形式科学首先追问：如果接受某些基本规则，哪些结论必然随之成立？',
          explanation: '数学、逻辑和理论计算机科学可以研究多套形式体系，而无需先判定哪一套就是现实空间。',
        },
      },
      children: [
        {
          id: 'axiom',
          title: '公理',
          subtitle: '系统请求接受的起点',
          summary: '明确的基本前提，重点在于一致性与独立性',
          accent: '#ACA6BF',
          details: {
            meaning: {
              eyebrow: '什么是公理',
              statement: 'αἴτημα原意接近“被要求接受的内容”。在形式系统中，公理不需依靠直觉或经验作为证明。',
              explanation: '公理可以做不同选择，但系统需要检查一致性，还要辨别某条公理是否能从其他公理推出。',
            },
            euclid: {
              eyebrow: '《几何原本》 · 五条公设',
              statement: '前四条规定直线、延长、圆与直角，第五条公设则规定平行结构。',
              bullets: ['任意两点可连成直线', '有限线段可继续延长', '任意圆心和半径可作圆', '所有直角相等', '平行结构由第五公设约束'],
            },
            independence: {
              eyebrow: '第五公设的独立性',
              statement: '只要构造一个满足前四条、却违反第五条的模型，就说明第五公设无法由前四条推出。',
              formula: 'M ⊨ Σ   且   M ⊨ ¬P    ⇒    Σ ⊬ P',
              example: '庞加莱圆盘模型用欧氏圆盘内的测地线实现双曲几何。过直线外一点，可有多条与已知直线不相交的测地线。',
              footnote: '⊢ 表示句法可证，⊨ 表示语义满足。',
            },
          },
        },
        {
          id: 'godel',
          title: '不完备性',
          subtitle: 'Gödel',
          summary: '足够强的一致形式系统存在内在边界',
          accent: '#644A56',
          details: {
            first: {
              eyebrow: '第一不完备定理',
              statement: '对能表达基本算术的、有效公理化且一致的形式系统 T，存在 T 内既不能证明也不能否定的命题。',
              formula: 'G ≈ “G 在系统 T 中不可证明”',
              explanation: '哥德尔编码把符号、公式与证明对应到自然数，使算术能够在系统内谈论“可证明性”。',
            },
            second: {
              eyebrow: '第二不完备定理',
              statement: '如果 T 一致、有效公理化且足够强，那么 T 无法在自身内部证明自己的一致性。',
              formula: 'T 一致    ⇒    T ⊬ Con(T)',
              explanation: '更强的理论可以证明较弱理论的一致性，但问题会继续向上移动。',
            },
          },
        },
      ],
    },
    {
      id: 'natural',
      title: '自然科学',
      subtitle: 'Natural Sciences',
      summary: '理论需要具有现实意义，并持续接受经验检验',
      accent: '#396D80',
      details: {
        paradigm: {
          eyebrow: '范式 B',
          statement: '自然科学始终站在现实中，在理论、模型、预测与实验之间循环。',
          explanation: '它不只问一组规则内部能推出什么，还要问这套结构是否能解释与预测我们所观测的世界。',
        },
      },
      children: [
        {
          id: 'usefulness',
          title: '形式与现实',
          subtitle: '用与无用',
          summary: '形式体系可能在未知的现实中找到原型',
          accent: '#9AAE8F',
          details: {
            transfer: {
              eyebrow: '一个体系的价值可以晚于它的诞生',
              statement: '非欧几何先作为形式体系被研究，后来成为广义相对论描述时空的重要工具。',
              explanation: '对自然科学，形式体系可以成为候选模型。对形式科学，“有用”只是从当前现实需求出发的一种评价。',
            },
          },
        },
        {
          id: 'fallibilism',
          title: '可谬论',
          subtitle: 'Fallibilism',
          summary: '知识宣称始终保留被修正的可能',
          accent: '#B5855F',
          details: {
            synthesis: {
              eyebrow: '开放的结局',
              statement: '知识的力量来自它能够被检查、反驳、修改和扩展。',
              explanation: '数学的发展经历猜想、证明、反例、概念修改与定理推广。自然科学也会在新证据出现时重新评估模型。',
              footnote: '永远留有下一个问题，并不削弱知识；它使研究保持活力。',
            },
          },
        },
      ],
    },
  ],
}

export const scientificCycle: KnowledgeMapData = {
  id: 'scientific-cycle',
  title: '现实、理论与两座桥',
  subtitle: '从现实到理论，再回到现实',
  layout: 'cycle',
  root: cycleRoot,
  relations: [
    { id: 'r-reality-induction', source: 'reality', target: 'induction', label: '抽象', type: 'flow' },
    { id: 'r-induction-theory', source: 'induction', target: 'theory', label: '概括', type: 'supports' },
    { id: 'r-theory-deduction', source: 'theory', target: 'deduction', label: '预测', type: 'flow' },
    { id: 'r-deduction-reality', source: 'deduction', target: 'reality', label: '检验', type: 'tests' },
  ],
}

export const scientificParadigms: KnowledgeMapData = {
  id: 'scientific-paradigms',
  title: '形式科学与自然科学',
  subtitle: '两种问法，一种开放的知识实践',
  layout: 'tree',
  root: paradigmRoot,
  relations: [
    { id: 'r-axiom-godel', source: 'axiom', target: 'godel', label: '边界', type: 'limits' },
    { id: 'r-axiom-usefulness', source: 'axiom', target: 'usefulness', label: '应用', type: 'application' },
    { id: 'r-godel-fallibilism', source: 'godel', target: 'fallibilism', label: '可修正', type: 'supports' },
  ],
}

export const knowledgeMaps = {
  [scientificCycle.id]: scientificCycle,
  [scientificParadigms.id]: scientificParadigms,
}
