import type { KnowledgeMapData, KnowledgeNodeData, MorphMapping } from './types'

const controlRoot: KnowledgeNodeData = {
  id: 'flow-root', title: '控制下一步', subtitle: 'Sequence · Choice · Loop',
  summary: '顺序推进、条件分流、循环回跳共同决定执行路径', accent: 'var(--ink)',
  details: { opening: { eyebrow: '核心问题', statement: '这一句执行完，接下来去哪儿？', flow: ['顺序往下走', '条件选分支', '循环再来一轮'], explanation: '顺序、选择和循环决定程序下一步去哪儿，也决定哪些语句会重复。' } },
  children: [
    {
      id: 'sequence', title: '顺序执行', subtitle: 'Sequence', summary: '语句按出现次序推进，状态随时间改变', accent: 'var(--blue)',
      details: { meaning: { eyebrow: '默认路径', statement: '没有额外控制结构时，语句依次执行。', formula: String.raw`S_1 \longrightarrow S_2 \longrightarrow S_3 \longrightarrow \cdots`, explanation: '变量的值会随着语句执行而改变，所以先做哪一步会影响后面的计算。' } },
      children: [
        { id: 'default-order', title: '默认次序', subtitle: 'Next statement', summary: '定义、计算、输出排成一条时间链', accent: 'var(--teal)',
          details: { trace: { eyebrow: '一条直线', statement: '前一条语句完成，才进入下一条。', codeExample: 'sequence', explanation: '这个示例依次定义 a、定义 b、计算 c、输出 c。最终显示 30。' } } },
        { id: 'state-order', title: '状态更新', subtitle: 'State & time', summary: '赋值次序改变最终结果', accent: 'var(--ochre)',
          details: { reorder: { eyebrow: '顺序改变结果', statement: '同样两条更新语句，交换次序就得到不同结果。', formula: String.raw`\begin{aligned}(1+2)\times 3 &= 9 \\ 1\times 3+2 &= 5\end{aligned}`, explanation: '程序不是一组同时成立的方程；赋值会在时间中修改变量状态。' } } },
      ],
    },
    {
      id: 'choice', title: '选择执行', subtitle: 'Branch', summary: '条件判断让路径分叉，完成后再汇合', accent: 'var(--plum)',
      details: { meaning: { eyebrow: '条件改变路径', statement: '先看看条件是否成立，再决定走哪条路。', flow: ['检查条件', '成立走这一支；否则走另一支', '继续后面的语句'], explanation: '分支执行完，就继续后面的语句。' } },
      children: [
        { id: 'if-branch', title: '条件分流', subtitle: 'if · if/else', summary: '真则执行；二选一时另一支被跳过', accent: 'var(--blue)', details: {
          one: { eyebrow: '简单 if', statement: '条件为真才执行大括号内的语句。', codeExample: 'if', explanation: '如果分数不到 60，就跳过输出；达到 60 才会显示 pass。' },
          two: { eyebrow: 'if...else', statement: '条件成立走 if，否则走 else；之后继续往下。', codeExample: 'if-else', explanation: '例如 score=80 时只输出 pass，不会再输出 fail。' },
        } },
        { id: 'first-match', title: '首个匹配', subtitle: 'else if chain', summary: '自上而下测试，命中后停止后续判断', accent: 'var(--lavender)',
          details: { grades: { eyebrow: '多分支', statement: '条件顺序决定哪个分支被选中。', formula: String.raw`\begin{aligned}85 \ge 90 &\quad \text{不成立} \\ 85 \ge 80 &\quad \text{成立，输出 B}\end{aligned}`, explanation: '一旦执行 B 分支，后面的 else if 不再判断。范围分级应按阈值从高到低排列。' } } },
        { id: 'switch', title: '离散分派', subtitle: 'switch · case', summary: '依据离散值进入对应 case', accent: 'var(--wine)',
          details: { menu: { eyebrow: '按值选择', statement: 'switch 适合菜单、枚举或状态编号。', codeExample: 'switch', explanation: 'choice 为 2 时进入 Save 分支。它适合离散值，不能直接把区间条件写成 case。', footnote: '没有 break 时，执行可能继续贯穿后续 case。' } } },
      ],
    },
    {
      id: 'loop', title: '循环执行', subtitle: 'Iteration', summary: '条件与回跳让同一段程序重复执行', accent: 'var(--teal)',
      details: { meaning: { eyebrow: '把重复写成结构', statement: '把要重复做的操作，写进循环里。', flow: ['检查条件', '执行并更新状态', '回到条件，决定是否继续'], explanation: '只要条件还成立，就再做一轮；不成立时，继续循环后面的语句。' } },
      children: [
        { id: 'while', title: 'while 循环', subtitle: '先判断，再执行', summary: '判断、执行循环体、回跳、再次判断', accent: 'var(--blue)', details: {
          mechanism: { eyebrow: 'while 的路径', statement: '条件成立就执行一轮，然后回到条件处。', flow: ['条件成立：执行循环体，再判断', '条件不成立：退出循环'], codeExample: 'while', explanation: '示例依次输出 1 到 5。' },
          termination: { eyebrow: '状态推动循环', statement: '看看 i 怎样变化，就能知道循环何时结束。', formula: String.raw`i: 1 \to 2 \to 3 \to \cdots \to 6`, example: 'i 变成 6 时，i <= 5 不成立，循环结束。', explanation: '漏掉 i++ 时，这个条件会一直成立；但 while(true) 也可用于持续读取传感器的控制程序。', footnote: '持续循环应有明确的停止或外部终止机制。' },
        } },
        { id: 'for', title: 'for 循环', subtitle: '初始化 · 条件 · 更新', summary: '初始化、条件与更新写在同一处', accent: 'var(--green)', details: {
          anatomy: { eyebrow: 'for 的三个位置', statement: '先设好起点，每轮检查条件，做完再更新。', codeExample: 'for', explanation: '这个例子也输出 1 到 5。看 for 的第一行，就能知道从哪开始、何时停下、怎样更新。' },
          equivalence: { eyebrow: '与 while 的关系', statement: '两种写法都能重复操作，选读起来更清楚的。', flow: ['次数明确时，常用 for', '等待状态变化时，常用 while'], explanation: 'for 的初始化、条件、更新通常能展开成 while 风格的写法。', footnote: '改写时要留意 continue：for 仍会更新；while 放在循环体末尾的更新可能被跳过。' },
        } },
        { id: 'escape', title: '局部改道', subtitle: 'break · continue', summary: '提前离开循环，或跳过本轮剩余语句', accent: 'var(--wine)', details: {
          break: { eyebrow: 'break', statement: '遇到需要停下的情况，就退出当前循环。', codeExample: 'break', explanation: 'i 到 10 时退出，所以只输出 1 到 9。' },
          continue: { eyebrow: 'continue', statement: '跳过本轮剩余语句，进入下一轮。', codeExample: 'continue', explanation: '遍历 1 到 10 时跳过偶数，最后输出 1、3、5、7、9。' },
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
      details: { nesting: { eyebrow: '三种结构共同工作', statement: '循环里嵌入 if，就能边输入边统计正数。', codeExample: 'nesting', explanation: '先初始化 count，再读入五个数；每轮用 if 判断，最后输出计数。', example: '输入 3、−2、0、7、1，最后输出 3。' } },
      children: [
        { id: 'outer-order', title: '外层顺序', subtitle: 'Initialize · Run · Report', summary: '初始化、主体、输出仍有明确次序', accent: 'var(--teal)',
          details: { flow: { eyebrow: '框架不变', statement: '选择和循环可以嵌在顺序执行的外壳里。', flow: ['初始化 count', '重复处理五个输入', '输出正数的个数'], explanation: '外层语句依次发生。循环完成后，才读取最终 count 并输出。' } } },
        { id: 'positive-count', title: '正数计数', subtitle: 'Five inputs', summary: '每轮输入一个数；若为正，则累加计数', accent: 'var(--ochre)',
          details: { example: { eyebrow: '完整例子', statement: '循环管重复，if 管是否计数。', codeExample: 'nesting', explanation: '五轮输入之后，只输出正数的个数。顺序、选择和循环各有明确职责。' } } },
      ] },
    { id: 'math', title: '数学对应', subtitle: 'From relation to execution', summary: '数学关系只给出结果；程序补上求值路径', accent: 'var(--plum)',
      children: [
        { id: 'piecewise', title: '分段函数', subtitle: 'Piecewise function', summary: '条件选择实现分段定义', accent: 'var(--blue)',
          details: { absolute: { eyebrow: '选择对应分段', statement: '先看 x 的符号，再决定返回 x 还是 −x。', formula: String.raw`|x| = \begin{cases} x, & x \ge 0 \\ -x, & x < 0 \end{cases}`, codeExample: 'absolute', explanation: 'x 非负时直接返回；x 为负时取相反数。', footnote: '若类型为 int，x=INT_MIN 时 -x 溢出；此代码仅作结构示意。' } } },
        { id: 'summation', title: '有限求和', subtitle: 'Finite sum', summary: '循环累积实现逐项求和', accent: 'var(--teal)',
          details: { accumulate: { eyebrow: '迭代对应求和', statement: '每轮把当前项加入已有的和。', formula: String.raw`S_n = \sum_{i=1}^{n} i`, codeExample: 'summation', explanation: '从 1 开始，一项项加到 n；每轮更新 sum，最后得到总和。', footnote: '大 n 下 int sum 可能溢出，需要按范围选取类型。' } } },
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
