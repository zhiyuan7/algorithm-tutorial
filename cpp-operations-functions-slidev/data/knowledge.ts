import type { KnowledgeMapData, KnowledgeNodeData, MorphMapping } from './types'

const valueRoot: KnowledgeNodeData = {
  id: 'value-root', title: '值的构造', subtitle: 'Operations · Functions',
  summary: '运算与函数构造值；类型与状态规定求值方式', accent: 'var(--ink)',
  details: { opening: { eyebrow: '核心问题', statement: 'a + b 与 add(a, b)，都能根据输入得到结果。', formula: String.raw`\text{输入}\xrightarrow{\text{运算或函数}}\text{值}`, explanation: '它们都根据输入构造结果。运算符是常见计算的特殊写法；函数把已有操作组织成新的计算。' } },
  children: [
    { id: 'term', title: '项与运算', subtitle: 'Term', summary: '变量、常量和函数应用构成表示值的项', accent: 'var(--blue)',
      details: { meaning: { eyebrow: '借用数理逻辑的视角', statement: '项表示对象；更复杂的项由函数作用于已有项得到。', formula: String.raw`x,\;3,\;f(x),\;g(x,y)`, explanation: '这只是理解 C/C++ 表达式构造的类比；求值还受类型和程序状态影响。' } },
      children: [
        { id: 'operator', title: '运算符', subtitle: 'Operator', summary: '常见函数式计算的简洁语法', accent: 'var(--teal)', details: { binary: { eyebrow: '特殊语法', statement: 'a + b 可以看作二元运算 +(a, b) 的中缀写法。', formula: String.raw`a+b\;\longleftrightarrow\;\operatorname{add}(a,b)`, code: 'operator', explanation: '加、减、乘、除都接收操作数；具体结果还要看操作数类型。' } } },
        { id: 'types', title: '类型约束', subtitle: 'Type rules', summary: '同一符号在不同类型下遵循不同规则', accent: 'var(--ochre)', details: {
          division: { eyebrow: '类型改变计算规则', statement: '整数除法和浮点除法使用不同语义。', code: 'division', explanation: '5 / 2.0 也得到浮点结果，因为整数操作数参与类型转换。' },
          power: { eyebrow: '容易混淆的符号', statement: 'C/C++ 中的 ^ 是按位异或，不是乘方。', code: 'power', explanation: '数学运算不一定要有专门的运算符；乘方通常通过 <cmath> 中的函数表示。' },
        } },
      ] },
    { id: 'functions', title: '函数组合', subtitle: 'Composition', summary: '把已有运算封装成新操作', accent: 'var(--plum)', details: { composition: { eyebrow: '从基本操作到新映射', statement: '函数把乘法、加法等运算组合起来，形成新的计算。', formula: String.raw`f(x)=x^2+2x+1`, code: 'composition', explanation: '先乘法，再加法，就得到一个新函数。double 只有有限精度，这里只是与实数函数作结构上的类比。' } }, children: [
      { id: 'definition', title: '函数定义', subtitle: 'Signature & body', summary: '返回类型、名称、参数、函数体与 return', accent: 'var(--lavender)', details: { add: { eyebrow: '读懂一次调用', statement: '参数提供输入，return 把结果交给调用者。', code: 'definition', explanation: '最前面的 int 是返回类型；a、b 是输入参数。调用 add(3, 5) 时，return 把 8 交回调用者。' } } },
      { id: 'effects', title: '副作用', subtitle: 'Side effect', summary: '函数可以改变外部状态，即使返回 void', accent: 'var(--wine)', details: { state: { eyebrow: '程序函数超出数学映射', statement: 'void 函数可以不返回值，却仍产生可观察行为。', code: 'effects', explanation: '输出、修改对象或改变外部变量都是副作用。因此程序函数不能总被等同于纯数学函数。' } } },
      { id: 'scope', title: '局部作用域', subtitle: 'Local scope', summary: '参数和局部变量的名字封装在函数内', accent: 'var(--sage)', details: { names: { eyebrow: '函数也是组织边界', statement: '函数内部定义的 result 不能在 main 中直接使用。', code: 'scope', explanation: 'a、b 和 result 属于 add 的局部作用域。函数不仅封装运算，也封装名字和局部状态。' } } },
    ] },
    { id: 'reuse', title: '输出与复用', subtitle: 'Result & overload', summary: '聚合结果或修改外部对象；同名函数适配不同输入', accent: 'var(--green)', children: [
      { id: 'multi-output', title: '多值输出', subtitle: 'Multiple results', summary: '返回复合对象，或经指针／引用写入调用者对象', accent: 'var(--teal)', details: {
        aggregate: { title: '把多个值打包返回', eyebrow: '多值输出 · 返回一个对象', statement: 'return 仍然返回一个对象，但这个对象可以装下多个值。', code: 'multi-return', explanation: '结构体把最小值与最大值放在一起。调用者拿到整个结果，再用结构化绑定取出 lo 与 hi；也可以用 std::pair 打包。', footnote: '这里比较两个整数。std::min / std::max 来自 <algorithm>，结构化绑定需要 C++17。' },
        output: { title: '让函数修改外部变量', eyebrow: '多值输出 · 输出参数', statement: '另一种做法是把变量交给函数，让它直接写入结果。', code: 'multi-reference', explanation: 'int& 让 lo、hi 成为调用者变量的别名。给它们赋值，会直接修改外部变量；这属于副作用。', footnote: 'C 中传入 &lo、&hi；函数内用 *lo、*hi 写入。指针必须指向可写对象。' },
      } },
      { id: 'overload', title: '函数重载', subtitle: 'Overload', summary: '按参数列表选择同名函数的版本', accent: 'var(--blue)', details: { selection: { eyebrow: '同一概念，不同输入', statement: 'C++ 根据参数的数量、类型与顺序选择重载。', code: 'overload', explanation: '返回值类型单独变化不能形成重载；接近的转换可能造成调用歧义。', footnote: '这些声明只用于展示版本选择；运行前需要补上各版本的函数定义。' } } },
    ] },
  ],
}

const judgmentRoot: KnowledgeNodeData = {
  id: 'judgment-root', title: '判断与表达式', subtitle: 'Relation · Logic · Expression',
  summary: '关系构造原子公式，逻辑联结构造复合公式，C++ 用表达式容纳它们', accent: 'var(--ink)', children: [
    { id: 'atomic', title: '原子公式', subtitle: 'Atomic formula', summary: '关系连接项，形成一个基本判断', accent: 'var(--blue)', details: {
      relation: { eyebrow: '从值到真假', statement: '把两个项放进关系里，就得到一个可以判断真假的陈述。', formula: String.raw`\underbrace{x+1}_{\text{项}}<\underbrace{2y}_{\text{项}}`, explanation: '先算出左右两侧的值，再判断是否满足“小于”关系。这个判断还没有使用逻辑联结词，是一个原子公式。' },
    }, children: [
      { id: 'term-input', title: '项作为输入', subtitle: 'Term', summary: '运算和函数先提供可比较的值', accent: 'var(--teal)', details: {
        bridge: { eyebrow: '先有值，再比较', statement: '比较之前，左右两侧都要先算出一个值。', code: 'bridge', explanation: 'x + 1 与 y * 2 可以各自独立求值。把它们作为关系的输入，才会得到真假结果。' },
      } },
      { id: 'relation-group', title: '关系', subtitle: 'Relation', summary: '规定项之间需要满足的条件', accent: 'var(--plum)', details: {
        meaning: { statement: '“小于”“等于”等关系把项连接成原子公式。', formula: String.raw`R(t_1,t_2)`, explanation: '项提供对象，关系提出关于这些对象的判断。' },
      }, children: [
        { id: 'comparison', title: '关系运算', subtitle: 'Comparison', summary: 'C++ 用比较运算符得到 bool 值', accent: 'var(--ochre)', details: {
          operators: { eyebrow: '用 C++ 写出关系', statement: '<、>、<=、>=、==、!= 都能检验两个值之间的关系。', code: 'comparison', explanation: '原子公式是判断的结构；关系运算符是 C++ 中实现这类比较的写法，结果的类型是 bool。', footnote: 'C 语言的关系与逻辑运算产生 int，用 0 与 1 表示假与真。' },
        } },
      ] },
    ] },
    { id: 'logic-group', title: '复合公式', subtitle: 'Compound formula', summary: '用逻辑联结词组合已有公式', accent: 'var(--plum)', children: [
      { id: 'connectives', title: '逻辑组合', subtitle: '&& · || · !', summary: '与、或、非构造更复杂的判断', accent: 'var(--lavender)', details: {
        combine: { eyebrow: '从基本判断到复合条件', statement: '“大于 0”与“小于 10”可以组合成一个范围判断。', formula: String.raw`(x>0)\land(x<10)`, code: 'connectives', explanation: '&& 表示两者都成立，|| 表示至少一个成立，! 表示取反。复合公式与原子公式并列，是公式的另一种结构。' },
      } },
      { id: 'short-circuit', title: '短路求值', subtitle: 'Short circuit', summary: '左侧结果可能阻止右侧执行', accent: 'var(--wine)', details: {
        safety: { eyebrow: '真假还决定执行顺序', statement: '&& 的左侧为 false 时，右侧就不需要执行了。', code: 'short-circuit', explanation: '这能避免解引用空指针。|| 的左侧为 true 时也会跳过右侧，因为整体结果已经确定。', footnote: '这里讨论内置 && 与 ||。非空指针仍可能悬空，不能仅凭非空判断它是否有效。' },
      } },
    ] },
    { id: 'language-group', title: '表达式语法', subtitle: 'C/C++ expression', summary: '值与真假判断都可以写成表达式', accent: 'var(--green)', children: [
      { id: 'expression', title: '表达式', subtitle: 'Expression', summary: '运算、判断、调用与赋值都可以求值', accent: 'var(--blue)', details: {
        unified: { eyebrow: '回到程序语言', statement: '在 C/C++ 中，这些可求值的结构都叫表达式。', code: 'expression', explanation: '运算可以产生数值，比较和逻辑组合可以产生 bool。函数调用也是表达式；赋值还会改变状态。' },
      } },
      { id: 'bool-conversion', title: '布尔转换', subtitle: 'Contextual bool', summary: '条件上下文允许整数或指针转换为真假', accent: 'var(--ochre)', details: {
        context: { eyebrow: '不是 bool，也能作条件', statement: '整数或指针用在条件中时，会转换成布尔值。', code: 'bool-conversion', explanation: '整数 0 转为 false，非零转为 true；空指针转为 false，非空转为 true。这是程序语言的类型转换规则。', footnote: '布尔转换只检查指针是否为空，不能检查它是否仍指向有效对象。' },
      } },
    ] },
  ],
}

export const valueConstruction: KnowledgeMapData = { id: 'value-construction', title: '值如何被构造', subtitle: '从运算符到函数', root: valueRoot, relations: [
  { id: 'r-operator-definition', source: 'operator', target: 'definition', label: '封装', type: 'supports' },
  { id: 'r-types-overload', source: 'types', target: 'overload', label: '选择', type: 'application' },
  { id: 'r-effects-multi', source: 'effects', target: 'multi-output', label: '可变状态', type: 'supports' },
] }
export const judgmentExpression: KnowledgeMapData = { id: 'judgment-expression', title: '判断如何被构造', subtitle: '从项到表达式', root: judgmentRoot, relations: [
  { id: 'r-term-atomic', source: 'term-input', target: 'atomic', label: '比较', type: 'flow' },
  { id: 'r-atomic-connectives', source: 'atomic', target: 'connectives', label: '组合', type: 'supports' },
  { id: 'r-connectives-short', source: 'connectives', target: 'short-circuit', label: '求值', type: 'limits' },
  { id: 'r-comparison-expression', source: 'comparison', target: 'expression', label: '归入', type: 'application' },
  { id: 'r-bool-context', source: 'expression', target: 'bool-conversion', label: '条件转换', type: 'application' },
] }
export const knowledgeMaps = { [valueConstruction.id]: valueConstruction, [judgmentExpression.id]: judgmentExpression }

export const morphMapping: MorphMapping[] = [
  { sourceId: 'term', targetId: 'term-input', sourceLabel: '项与运算', targetLabel: '项作为输入', meaning: '构造出的值成为关系的操作数', accent: 'var(--teal)' },
  { sourceId: 'functions', targetId: 'expression', sourceLabel: '函数组合', targetLabel: '表达式', meaning: '调用 f(x) 也是可求值的表达式', accent: 'var(--blue)' },
  { sourceId: 'types', targetId: 'bool-conversion', sourceLabel: '类型约束', targetLabel: '布尔转换', meaning: '类型规则继续影响条件判断', accent: 'var(--ochre)' },
]
