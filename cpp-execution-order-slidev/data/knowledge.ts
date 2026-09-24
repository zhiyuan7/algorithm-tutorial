import type { KnowledgeMapData, KnowledgeNodeData, MorphMapping } from './types'

const controlRoot: KnowledgeNodeData = {
  id: 'flow-root', title: '控制下一步', subtitle: 'Sequence · Choice · Loop',
  summary: '顺序推进、条件分流、循环回跳共同决定执行路径', accent: 'var(--ink)',
  details: { opening: { eyebrow: '核心问题', statement: '程序执行完当前语句后，下一步去哪里？', formula: '顺序 → 分叉 → 回跳', explanation: '控制流描述执行路径。三种基本结构决定语句的先后、条件下的分支，以及重复执行。' } },
  children: [
    {
      id: 'sequence', title: '顺序执行', subtitle: 'Sequence', summary: '语句按出现次序推进，状态随时间改变', accent: 'var(--blue)',
      details: { meaning: { eyebrow: '默认路径', statement: '没有额外控制结构时，语句依次执行。', formula: 'S₁ → S₂ → S₃ → …', explanation: '这一层讲的是单线程语句级控制流；先做什么、后做什么，会影响后续计算使用的状态。' } },
      children: [
        { id: 'default-order', title: '默认次序', subtitle: 'Next statement', summary: '定义、计算、输出排成一条时间链', accent: 'var(--teal)',
          details: { trace: { eyebrow: '一条直线', statement: '前一条语句完成，才进入下一条。', code: 'int a = 10;\nint b = 20;\nint c = a + b;\nstd::cout << c;', explanation: '这个示例依次定义 a、定义 b、计算 c、输出 c。最终显示 30。' } } },
        { id: 'state-order', title: '状态更新', subtitle: 'State & time', summary: '赋值次序改变最终结果', accent: 'var(--ochre)',
          details: { reorder: { eyebrow: '顺序改变结果', statement: '同样两条更新语句，交换次序就得到不同结果。', formula: 'x=1 → +2 → ×3：9\nx=1 → ×3 → +2：5', explanation: '程序不是一组同时成立的方程；赋值会在时间中修改变量状态。' } } },
      ],
    },
    {
      id: 'choice', title: '选择执行', subtitle: 'Branch', summary: '条件判断让路径分叉，完成后再汇合', accent: 'var(--plum)',
      details: { meaning: { eyebrow: '条件改变路径', statement: '先求条件真假，再决定进入哪一段程序。', formula: '条件？ → true 路径 / false 路径', explanation: '选择结构不会把两个分支同时执行。分支完成后，控制流继续走向后续程序。' } },
      children: [
        { id: 'if-branch', title: '条件分流', subtitle: 'if · if/else', summary: '真则执行；二选一时另一支被跳过', accent: 'var(--blue)', details: {
          one: { eyebrow: '简单 if', statement: '条件为真才执行大括号内的语句。', code: 'if (score >= 60)\n    std::cout << "pass";', explanation: '条件为假时直接跳过这段输出。`score >= 60` 在 C++ 中产生 bool 值。' },
          two: { eyebrow: 'if...else', statement: '两个分支恰好执行其中一个，之后重新汇合。', code: 'if (score >= 60)\n    std::cout << "pass";\nelse\n    std::cout << "fail";', explanation: '例如 score=80 时只输出 pass，不会再输出 fail。' },
        } },
        { id: 'first-match', title: '首个匹配', subtitle: 'else if chain', summary: '自上而下测试，命中后停止后续判断', accent: 'var(--lavender)',
          details: { grades: { eyebrow: '多分支', statement: '条件顺序决定哪个分支被选中。', formula: '85 ≥ 90？否\n85 ≥ 80？是 → B', explanation: '一旦执行 B 分支，后面的 else if 不再判断。范围分级应按阈值从高到低排列。' } } },
        { id: 'switch', title: '离散分派', subtitle: 'switch · case', summary: '依据离散值进入对应 case', accent: 'var(--wine)',
          details: { menu: { eyebrow: '按值选择', statement: 'switch 适合菜单、枚举或状态编号。', code: 'switch (choice) {\n  case 2: std::cout << "Save"; break;\n  default: std::cout << "Unknown";\n}', explanation: 'choice 为 2 时进入 Save 分支。它适合离散值，不能直接把区间条件写成 case。', footnote: '没有 break 时，执行可能继续贯穿后续 case。' } } },
      ],
    },
    {
      id: 'loop', title: '循环执行', subtitle: 'Iteration', summary: '条件与回跳让同一段程序重复执行', accent: 'var(--teal)',
      details: { meaning: { eyebrow: '把重复写成结构', statement: '循环用少量语句表达多次状态更新。', formula: 'sum ← sum + i；然后回到条件', explanation: '循环可以看成条件判断加回跳：满足条件就执行并返回判断，不满足就退出。' } },
      children: [
        { id: 'while', title: '条件回跳', subtitle: 'while', summary: '判断、执行循环体、回跳、再次判断', accent: 'var(--blue)', details: {
          mechanism: { eyebrow: 'while 的路径', statement: '每一轮都先检查条件；真则执行并回到条件。', formula: '判断 → true → body ↶\n判断 → false → 退出', code: 'while (i <= 5) {\n    std::cout << i;\n    i++;\n}', explanation: '示例依次输出 1 到 5。' },
          termination: { eyebrow: '状态推动循环', statement: '循环变量必须按预期变化，条件才可能转为假。', formula: 'i：1 → 2 → 3 → … → 6（退出）', explanation: '漏掉 i++ 时，这个条件会一直成立；但 while(true) 也可用于持续读取传感器的控制程序。', footnote: '持续循环应有明确的停止或外部终止机制。' },
        } },
        { id: 'for', title: '三段循环', subtitle: 'for', summary: '初始化、条件与更新写在同一处', accent: 'var(--green)', details: {
          anatomy: { eyebrow: 'for 的三个位置', statement: '初始化一次；每轮先判断；循环体后更新。', code: 'for (int i = 1; i <= 5; i++) {\n    std::cout << i;\n}', explanation: '这个例子也输出 1 到 5。次数明确时，for 把循环变量的生命周期与推进方式放在一起。' },
          equivalence: { eyebrow: '与 while 的关系', statement: '两者都能表达迭代；选择取决于哪个写法更清楚。', formula: '次数明确 → 常用 for\n终止依赖状态 → 常用 while', explanation: 'for 的初始化、条件、更新通常能展开成 while 风格的写法。', footnote: '机械改写时留意 continue：for 仍会执行更新表达式，while 中体尾的手工更新可能被跳过。' },
        } },
        { id: 'escape', title: '局部改道', subtitle: 'break · continue', summary: '提前离开循环，或跳过本轮剩余语句', accent: 'var(--wine)', details: {
          break: { eyebrow: 'break', statement: '满足特殊条件时，直接退出当前循环。', code: 'if (i == 10) break;', explanation: '原文 1 到 100 的示例会在 10 处退出，因此只输出 1 到 9。' },
          continue: { eyebrow: 'continue', statement: '跳过本轮剩余语句，进入下一轮。', code: 'if (i % 2 == 0) continue;', explanation: '在原文 1 到 10 的 for 循环中，偶数轮不输出，最终得到 1、3、5、7、9。' },
        } },
      ],
    },
  ],
}

const assemblyRoot: KnowledgeNodeData = {
  id: 'assembly-root', title: '结构构造算法', subtitle: 'Composition · Mathematics',
  summary: '基本控制路径可以嵌套，并实现数学中的分段与求和', accent: 'var(--ink)',
  children: [
    { id: 'program', title: '结构嵌套', subtitle: 'A complete program', summary: '外层顺序容纳循环，循环内部继续选择', accent: 'var(--blue)',
      details: { nesting: { eyebrow: '三种结构共同工作', statement: '复杂程序由基本结构一层层嵌套而成。', formula: '顺序 { 初始化 → 循环 { 输入 → 选择 } → 输出 }', explanation: '从外向内观察：先初始化计数器，再循环五次；每轮读入一个数并用 if 判断；最后输出计数。' } },
      children: [
        { id: 'outer-order', title: '外层顺序', subtitle: 'Initialize · Run · Report', summary: '初始化、主体、输出仍有明确次序', accent: 'var(--teal)',
          details: { flow: { eyebrow: '框架不变', statement: '选择和循环可以嵌在顺序执行的外壳里。', formula: 'count=0 → 五轮处理 → 输出 count', explanation: '外层语句依次发生。循环完成后，才读取最终 count 并输出。' } } },
        { id: 'positive-count', title: '正数计数', subtitle: 'Five inputs', summary: '每轮输入一个数；若为正，则累加计数', accent: 'var(--ochre)',
          details: { example: { eyebrow: '完整例子', statement: '循环管重复，if 管是否计数。', code: 'int count = 0;\nfor (int i = 0; i < 5; i++) {\n    int x; std::cin >> x;\n    if (x > 0) count++;\n}\nstd::cout << count;', explanation: '五轮输入之后，只输出正数的个数。顺序、选择和循环各有明确职责。' } } },
      ] },
    { id: 'math', title: '数学对应', subtitle: 'From relation to execution', summary: '数学关系只给出结果；程序补上求值路径', accent: 'var(--plum)',
      children: [
        { id: 'piecewise', title: '分段函数', subtitle: 'Piecewise function', summary: '条件选择实现分段定义', accent: 'var(--blue)',
          details: { absolute: { eyebrow: '选择对应分段', statement: '数学中的两段定义，在程序里成为两条路径。', formula: '|x| = x（x≥0）\n|x| = −x（x<0）', code: 'if (x >= 0) return x;\nelse return -x;', explanation: '给定输入，程序先判断符号，再选择返回哪个表达式。', footnote: '若类型为 int，x=INT_MIN 时 -x 溢出；此代码仅作结构示意。' } } },
        { id: 'summation', title: '有限求和', subtitle: 'Finite sum', summary: '循环累积实现逐项求和', accent: 'var(--teal)',
          details: { accumulate: { eyebrow: '迭代对应求和', statement: '每轮把当前项加入已有的和。', formula: 'Σᵢ₌₁ⁿ i   ↔   sum ← sum + i', code: 'int sum = 0;\nfor (int i = 1; i <= n; i++)\n    sum += i;', explanation: '数学记号省略计算路径；循环显式给出每一轮的状态更新。', footnote: '大 n 下 int sum 可能溢出，需要按范围选取类型。' } } },
      ] },
  ],
}

export const controlFlow: KnowledgeMapData = {
  id: 'control-flow', title: '控制下一步', subtitle: '顺序、选择与循环', root: controlRoot,
  relations: [
    { id: 'r-while-back', source: 'while', target: 'while', label: '条件回跳', type: 'flow' },
    { id: 'r-state-loop', source: 'state-order', target: 'while', label: '更新推动', type: 'supports' },
    { id: 'r-choice-while', source: 'if-branch', target: 'while', label: '条件复用', type: 'application' },
    { id: 'r-while-for', source: 'while', target: 'for', label: '同类迭代', type: 'application' },
    { id: 'r-for-escape', source: 'for', target: 'escape', label: '局部改道', type: 'limits' },
  ],
}
export const algorithmAssembly: KnowledgeMapData = {
  id: 'algorithm-assembly', title: '结构构造算法', subtitle: '嵌套与数学对应', root: assemblyRoot,
  relations: [
    { id: 'r-piecewise-count', source: 'piecewise', target: 'positive-count', label: '选择路径', type: 'application' },
    { id: 'r-sum-count', source: 'summation', target: 'positive-count', label: '重复累积', type: 'application' },
  ],
}
export const knowledgeMaps = { [controlFlow.id]: controlFlow, [algorithmAssembly.id]: algorithmAssembly }

export const morphMapping: MorphMapping[] = [
  { sourceId: 'sequence', targetId: 'outer-order', sourceLabel: '顺序执行', targetLabel: '外层顺序', meaning: '初始化、处理、输出依次发生', accent: 'var(--blue)' },
  { sourceId: 'choice', targetId: 'piecewise', sourceLabel: '选择执行', targetLabel: '分段函数', meaning: '条件决定采用哪条计算路径', accent: 'var(--plum)' },
  { sourceId: 'loop', targetId: 'summation', sourceLabel: '循环执行', targetLabel: '有限求和', meaning: '重复更新累积状态', accent: 'var(--teal)' },
]
