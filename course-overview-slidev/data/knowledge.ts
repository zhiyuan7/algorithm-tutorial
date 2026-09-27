import type { KnowledgeMapData, KnowledgeNodeData } from './types'

const scienceRoot: KnowledgeNodeData = {
  id: 'science-root',
  title: '科学',
  subtitle: '从认识论讨论科学',
  summary: '如何获得知识，如何检查认识的可靠性与边界',
  accent: '#13254F',
  details: {
    opening: {
      eyebrow: '本体论与认识论',
      statement: '本体论问“世界存在什么”，认识论问“我们如何认识世界”。',
      explanation: '科学面对独立于我们认识而存在的现实。本文从认识论出发，讨论科学如何形成知识、检验知识，以及理解认识的边界。',
      bullets: ['本体论：存在什么，现实如何构成', '认识论：如何认识，凭什么相信', '科学：通过观测、建模、推理与实验获得认识'],
    },
  },
  children: [
    {
      id: 'reality', title: '现实', subtitle: 'Reality',
      summary: '问题切割出的现实片段', accent: '#163F6F',
      details: {
        complexity: {
          eyebrow: '现实世界',
          statement: '科学面对的是研究问题选定的现实侧面。',
          explanation: '机器人运动同时受到摩擦、齿隙、温度、电流波动、机械弹性和传感器噪声影响。任何一种描述都只能保留其中一部分。',
          bullets: ['研究问题决定看见什么', '观测工具决定记录什么', '抽象决定保留什么'],
        },
      },
    },
    {
      id: 'induction', title: '归纳与建模', subtitle: 'Induction & Modeling',
      summary: '把观测组织为可操作的模型', accent: '#396D80',
      details: {
        pipeline: {
          eyebrow: '从观测到模型',
          statement: '建模的每一步都在选择信息，抽象因此总是相对的。',
          formula: String.raw`\begin{aligned}\text{观测}&\to\text{数据处理}\\&\to\text{变量选择}\to\text{模型构建}\end{aligned}`,
          explanation: '原始图像不直接告诉我们距离。图像处理先提取像素高度，建模再把像素量连到物理量。',
        },
        monocular: {
          eyebrow: '具体范例 · 单目测距',
          statement: '已知真实高度 $H$，测得像素高度 $h$，用针孔模型估计距离 $Z$。',
          formula: String.raw`\frac{h}{f}=\frac{H}{Z}\quad\Longrightarrow\quad Z=\frac{fH}{h}`,
          bullets: ['图像处理产生观测量 $h$', '焦距 $f$ 和已知高度 $H$ 提供尺度', '模型建立 $h$ 与 $Z$ 的关系'],
          footnote: '正对相机、忽略畸变的理想近似；焦距与图像高度均用像素单位。',
        },
      },
    },
    {
      id: 'theory', title: '理论', subtitle: 'Theory',
      summary: '对一类现象的一般规律', accent: '#624F6B',
      details: {
        distinction: {
          eyebrow: '一般规律与解释体系',
          statement: '理论把一类现象的一般规律组织成可以解释和推理的体系。',
          explanation: '理论使我们能够从已知条件推出结论。要讨论某个具体对象，还需要模型明确它的结构、变量与约束。',
          bullets: ['理论说明一般规律', '模型表示具体系统', '理论与模型共同产生预测'],
        },
        pendulum: {
          eyebrow: '牛顿第二定律与单摆模型',
          statement: '一般规律与具体结构共同给出单摆方程。',
          formula: String.raw`\begin{aligned}\sum\mathbf{F}&=m\mathbf{a}\\ml\ddot\theta&=-mg\sin\theta\\\ddot\theta+\frac{g}{l}\sin\theta&=0\end{aligned}`,
          explanation: '模型取摆球为质点，摆线无质量且不可伸长，忽略阻力与摩擦。沿切向应用牛顿第二定律，初始条件再确定轨迹。',
          footnote: '在惯性参考系中，$l$ 为摆长，$m$ 为质量，$\\theta$ 为偏离竖直方向的角度。',
        },
      },
    },
    {
      id: 'deduction', title: '演绎与实验', subtitle: 'Deduction & Experiment',
      summary: '从假说推出预测，再用现实检验', accent: '#B5855F',
      details: {
        method: {
          eyebrow: '假说—演绎方法',
          statement: '从假说推出可观测后果，再用实验结果约束假说。',
          formula: String.raw`\begin{gathered}H\Rightarrow P\\\neg P\Rightarrow\neg H\qquad P\nRightarrow H\end{gathered}`,
          explanation: '预测失败时，需要检查假说或辅助条件；预测成立也不能独占性地证明假说。',
          footnote: '逆否推理要求其他前提保持成立；支持不等于绝对证明。',
        },
        yolo: {
          eyebrow: '具体范例 · 目标检测',
          statement: '假设目标像素面积越小，检测性能越低：只增加距离，应当观察到性能下降。',
          formula: String.raw`1\,\mathrm{m},\ 2\,\mathrm{m},\ 3\,\mathrm{m},\ 4\,\mathrm{m},\ 5\,\mathrm{m}`,
          bullets: ['保持光照与目标类别尽量不变', '用大量图片统计 mAP 或 recall', '结果支持假说，或促使重新检查假说'],
        },
      },
    },
  ],
}

const paradigmRoot: KnowledgeNodeData = {
  id: 'paradigms-root', title: '科学的两种范式',
  subtitle: '形式科学与自然科学',
  summary: '区分研究方式，再讨论形式科学的现实来源与边界', accent: '#13254F',
  children: [
    {
      id: 'formal', title: '形式科学', subtitle: 'Formal Sciences',
      summary: '接受一组规则，研究它们能推出什么', accent: '#624F6B',
      details: {
        paradigm: {
          eyebrow: '形式科学的问法',
          statement: '如果接受某些基本规则，哪些结论必然随之成立？',
          explanation: '数学、逻辑与理论计算机科学可以研究多套形式体系，无需先判定哪一套就是现实空间。',
        },
      },
      children: [
        {
          id: 'axiom', title: '公理', subtitle: '形式系统的起点',
          summary: '基本前提；一致性与独立性需要分别检查', accent: '#ACA6BF',
          details: {
            meaning: {
              eyebrow: '什么是公理',
              statement: '公理是形式体系要求接受的基本前提，在该体系中不以证明作为起点。',
              explanation: 'αἴτημα原意接近“被要求接受的内容”。公理可以作不同选择；系统是否推出矛盾，与某条公理是否冗余，是两种问题。',
            },
            euclid: {
              eyebrow: '《几何原本》 · 五条公设',
              statement: '前四条规定直线、延长、圆与直角，第五条约束平行结构。',
              bullets: ['任意两点可连成直线', '有限线段可继续延长', '任意圆心和半径可作圆', '所有直角相等', '平行结构由第五公设约束'],
            },
            independence: {
              eyebrow: '第五公设的独立性',
              statement: '构造满足其余公理、却违反第五公设的模型，就能说明第五公设不能由其余公理推出。',
              formula: String.raw`\begin{gathered}\mathcal{M}\models\Sigma,\quad\mathcal{M}\models\neg P\\\Longrightarrow\quad\Sigma\nvdash P\end{gathered}`,
              example: '庞加莱圆盘模型实现双曲几何：过直线外一点，可有多条与已知直线不相交的测地线。',
              footnote: '$\\Sigma$ 包含中立几何所需公理；$\\vdash$ 表示句法可证，$\\models$ 表示语义满足。',
            },
          },
        },
        {
          id: 'materiality', title: '唯物性', subtitle: '形式科学与现实',
          summary: '认识的来源、现实的广阔性、形式的边界', accent: '#396D80',
          details: {
            overview: {
              eyebrow: '形式科学的唯物性如何体现',
              statement: '形式能够独立推演，但人的形式认识仍然与现实相连。',
              bullets: ['认识过程：形式的理解始于现实经验', '现实的广阔性：形式可能找到现实原型', '公理体系的边界：形式揭示现实的侧面'],
            },
          },
          children: [
            {
              id: 'origin', title: '认识的起点', subtitle: '现实经验与抽象',
              summary: '从具体对象中抽象出数量和关系', accent: '#163F6F',
              details: {
                learning: {
                  eyebrow: '第一点 · 认识的过程',
                  statement: '人们最初理解形式，往往从现实对象与操作开始。',
                  formula: '1+1=2',
                  explanation: '一个苹果加一个苹果，数出两个苹果；抽去颜色、材质和用途，留下数量关系。',
                  footnote: '这说明形式理解的来源；公理化算术中的证明仍依赖定义与规则。',
                },
              },
            },
            {
              id: 'prototype', title: '现实的广阔性', subtitle: '形式可能找到原型',
              summary: '暂时无用，不等于没有认识价值', accent: '#9AAE8F',
              details: {
                transfer: {
                  eyebrow: '第二点 · 现实的广阔性',
                  statement: '现实超出当下的经验，形式可能在其中找到原型。',
                  explanation: '双曲几何研究负曲率空间；钩织实物可展示相关结构。非欧几何也拓展了描述现实的语言。',
                  bullets: ['形式研究可以先于实际用途', '研究信念鼓励寻找新的对应关系'],
                  footnote: '实物是有限近似；广义相对论采用伪黎曼几何，并非简单的双曲平面。',
                },
              },
            },
            {
              id: 'godel', title: '不完备性', subtitle: 'Gödel',
              summary: '满足条件的公理体系存在证明能力的边界', accent: '#644A56',
              details: {
                first: {
                  eyebrow: '第三点 · 第一不完备定理',
                  statement: '一致、有效公理化且足以表达基本算术的系统 $T$，存在内部不可判定命题。',
                  formula: String.raw`T\nvdash G\quad\text{且}\quad T\nvdash\neg G`,
                  explanation: '有些命题在这套规则内既不能证明，也不能否定。在更强系统中可能解决，但满足条件的扩展仍然不完备。',
                  footnote: '采用哥德尔—罗瑟表述；“不可判定”相对于指定系统。',
                },
                second: {
                  eyebrow: '第三点 · 第二不完备定理',
                  statement: '一致且满足通常条件的算术系统，不能在内部证明自身的一致性。',
                  formula: String.raw`T\nvdash\operatorname{Con}(T)`,
                  explanation: '更强理论可能证明较弱理论的一致性，但仍需考察更强理论自身的依据。',
                  footnote: '系统需有效公理化、足够强，并使用标准的一致性表达与可证明性条件。',
                },
                perspective: {
                  eyebrow: '从形式边界到认识边界',
                  statement: '认识现实时，形式应当被理解为揭示结构与侧面的工具。',
                  explanation: '不完备性严格讨论系统内部的可证明性。本文由此反思形式的边界；现实模型是否适用，仍需检查对象、假设与经验。',
                  footnote: '这是哲学层面的认识态度，不能仅由数学定理推出关于全部物理现实的结论。',
                },
              },
            },
          ],
        },
        {
          id: 'fallibilism', title: '可谬论', subtitle: 'Fallibilism',
          summary: '检查证明、前提和应用，保留修正的可能', accent: '#B5855F',
          details: {
            synthesis: {
              eyebrow: '认识形式科学的态度',
              statement: '保有严格证明，也保有检查与修正自身认识的余地。',
              explanation: '形式理解有现实来源，未知现实使研究保持开放，体系边界要求认识保持谦逊。',
              bullets: ['检查证明与前提是否有遗漏', '反思概念与公理的选择', '检验形式应用于现实时是否适切'],
              footnote: '可谬论不取消给定前提下正确证明的演绎必然性。',
            },
          },
        },
      ],
    },
    {
      id: 'natural', title: '自然科学', subtitle: 'Natural Sciences',
      summary: '理论与模型需要接受经验检验', accent: '#396D80',
      details: {
        paradigm: {
          eyebrow: '自然科学的问法',
          statement: '理论与模型能否解释和预测我们实际观测到的世界？',
          explanation: '自然科学不仅考察推理是否成立，还通过可观测后果检验模型的现实意义与适用范围。',
          footnote: '经验支持提供接受理论的理由，也保留修正它的可能。',
        },
      },
    },
  ],
}

export const scienceKnowledge: KnowledgeMapData = {
  id: 'science-knowledge', title: '科学：认识现实',
  subtitle: '现实、归纳与建模、理论、演绎与实验', layout: 'cycle', root: scienceRoot,
  relations: [
    { id: 'r-reality-induction', source: 'reality', target: 'induction', label: '抽象', type: 'flow' },
    { id: 'r-induction-theory', source: 'induction', target: 'theory', label: '概括', type: 'supports' },
    { id: 'r-theory-deduction', source: 'theory', target: 'deduction', label: '预测', type: 'flow' },
    { id: 'r-deduction-reality', source: 'deduction', target: 'reality', label: '检验', type: 'tests' },
  ],
}

export const scientificParadigms: KnowledgeMapData = {
  id: 'scientific-paradigms', title: '形式科学与自然科学',
  subtitle: '形式科学的现实来源与认识边界', layout: 'tree', root: paradigmRoot,
  relations: [
    { id: 'r-axiom-godel', source: 'axiom', target: 'godel', label: '证明边界', type: 'limits' },
    { id: 'r-prototype-natural', source: 'prototype', target: 'natural', label: '现实原型', type: 'application' },
    { id: 'r-godel-fallibilism', source: 'godel', target: 'fallibilism', label: '反思边界', type: 'supports' },
  ],
}

export const knowledgeMaps = {
  [scienceKnowledge.id]: scienceKnowledge,
  [scientificParadigms.id]: scientificParadigms,
}
