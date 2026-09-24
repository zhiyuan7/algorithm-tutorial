import type { KnowledgeMapData, KnowledgeNodeData, MorphMapping } from './types'

const valueRoot: KnowledgeNodeData = {
  id: 'value-root', title: '值的构造', subtitle: 'Operations · Functions',
  summary: '运算与函数构造值；类型与状态规定求值方式', accent: 'var(--ink)',
  details: { opening: { eyebrow: '核心问题', statement: '为什么 a + b 和 add(a, b) 可以放在同一张图里？', formula: '输入 → 运算／函数 → 值', explanation: '它们都根据输入构造结果。运算符是常见计算的特殊写法；函数把已有操作组织成新的计算。' } },
  children: [
    { id: 'term', title: '项与运算', subtitle: 'Term', summary: '变量、常量和函数应用构成表示值的项', accent: 'var(--blue)',
      details: { meaning: { eyebrow: '借用数理逻辑的视角', statement: '项表示对象；更复杂的项由函数作用于已有项得到。', formula: 'x，3 → f(x) → g(x, y)', explanation: '这只是理解 C/C++ 表达式构造的类比；求值还受类型和程序状态影响。' } },
      children: [
        { id: 'operator', title: '运算符', subtitle: 'Operator', summary: '常见函数式计算的简洁语法', accent: 'var(--teal)', details: { binary: { eyebrow: '特殊语法', statement: 'a + b 可以看作二元运算 +(a, b) 的中缀写法。', formula: 'a + b  ≈  add(a, b)', explanation: '加、减、乘、除都接收操作数；具体结果还要看操作数类型。', example: 'int c = a + b;  // 两个 int 相加' } } },
        { id: 'types', title: '类型约束', subtitle: 'Type rules', summary: '同一符号在不同类型下遵循不同规则', accent: 'var(--ochre)', details: {
          division: { eyebrow: '类型改变计算规则', statement: '整数除法和浮点除法使用不同语义。', formula: '5 / 2 → 2\n5.0 / 2.0 → 2.5', explanation: '5 / 2.0 也得到浮点结果，因为整数操作数参与类型转换。' },
          power: { eyebrow: '容易混淆的符号', statement: 'C/C++ 中的 ^ 是按位异或，不是乘方。', formula: '2 ^ 3 → 1\nstd::pow(2.0, 3.0) → 8.0', explanation: '数学运算不一定要有专门的运算符；乘方通常通过 <cmath> 中的函数表示。' },
        } },
      ] },
    { id: 'functions', title: '函数组合', subtitle: 'Composition', summary: '把已有运算封装成新操作', accent: 'var(--plum)', details: { composition: { eyebrow: '从基本操作到新映射', statement: '函数把乘法、加法等运算组合起来，形成新的计算。', formula: 'f(x) = x² + 2x + 1', explanation: 'C++ 可写为 double f(double x) { return x*x + 2*x + 1; }。double 只有有限精度，并不等于整个实数集。' } }, children: [
      { id: 'definition', title: '函数定义', subtitle: 'Signature & body', summary: '返回类型、名称、参数、函数体与 return', accent: 'var(--lavender)', details: { add: { eyebrow: '读懂一次调用', statement: '参数提供输入，return 把结果交给调用者。', formula: 'int add(int a, int b) { return a + b; }', explanation: '调用 int x = add(3, 5); 后，x 得到 8。返回类型 int、名称 add 和两个 int 参数描述接口。' } } },
      { id: 'effects', title: '副作用', subtitle: 'Side effect', summary: '函数可以改变外部状态，即使返回 void', accent: 'var(--wine)', details: { state: { eyebrow: '程序函数超出数学映射', statement: 'void 函数可以不返回值，却仍产生可观察行为。', formula: 'void increase() { count++; }', explanation: '输出、修改对象或改变外部变量都是副作用。因此程序函数不能总被等同于纯数学函数。' } } },
      { id: 'scope', title: '局部作用域', subtitle: 'Local scope', summary: '参数和局部变量的名字封装在函数内', accent: 'var(--sage)', details: { names: { eyebrow: '函数也是组织边界', statement: '函数内部定义的 result 不能在 main 中直接使用。', formula: 'int add(int a,int b) { int result=a+b; return result; }', explanation: 'a、b 和 result 属于 add 的局部作用域。函数不仅封装运算，也封装名字和局部状态。' } } },
    ] },
    { id: 'reuse', title: '输出与复用', subtitle: 'Result & overload', summary: '聚合结果或修改外部对象；同名函数适配不同输入', accent: 'var(--green)', children: [
      { id: 'multi-output', title: '多值输出', subtitle: 'Multiple results', summary: '返回复合对象，或经指针／引用写入调用者对象', accent: 'var(--teal)', details: { methods: { eyebrow: '两条路径', statement: '“多个值”可以打包为一个对象，也可以写入调用者给出的对象。', formula: 'return {min, max}\n或 getMinMax(a,b,&min,&max)', explanation: '结构体、std::pair 与结构化绑定属于聚合返回；C 的指针和 C++ 的引用属于输出参数，依赖可变状态。', footnote: '原文示例处理的是两个整数，并非整个数组。' } } },
      { id: 'overload', title: '函数重载', subtitle: 'Overload', summary: '按参数列表选择同名函数的版本', accent: 'var(--blue)', details: { selection: { eyebrow: '同一概念，不同输入', statement: 'C++ 根据参数的数量、类型与顺序选择重载。', formula: 'absolute(int)     absolute(double)', explanation: '返回值类型单独变化不能形成重载；接近的转换可能造成调用歧义。', footnote: '原文 absolute(int) 示例对 INT_MIN 不安全；这里只用于说明版本选择。' } } },
    ] },
  ],
}

const judgmentRoot: KnowledgeNodeData = {
  id: 'judgment-root', title: '判断与表达式', subtitle: 'Relation · Logic · Expression', summary: '关系把项变成判断；逻辑组合判断；表达式容纳两者', accent: 'var(--ink)', children: [
    { id: 'relation-group', title: '关系形成判断', subtitle: 'From terms to truth', summary: '把已有的值放进关系，得到真假结果', accent: 'var(--blue)', children: [
      { id: 'term-input', title: '项作为输入', subtitle: 'Term', summary: '运算和函数先构造可被比较的值', accent: 'var(--teal)', details: { bridge: { eyebrow: '延续上一张图', statement: 'x + 1 和 y * 2 先各自构造一个值。', formula: '(x + 1)   与   (y * 2)', explanation: '关系运算的两个操作数可以是复杂表达式；它们在逻辑类比中扮演“项”的角色。' } } },
      { id: 'atomic', title: '原子公式', subtitle: 'Atomic formula', summary: '关系连接项，形成可判断真假的陈述', accent: 'var(--plum)', details: { relation: { eyebrow: '从对象到真假', statement: 'x + 1 < y * 2 不再只表示数值，而是在检验关系。', formula: '(x + 1) < (y * 2)', explanation: '左右两侧先求值，再用小于关系判断；在数理逻辑的类比中，这接近原子公式。' } } },
      { id: 'comparison', title: '关系运算', subtitle: 'Comparison', summary: 'C++ 比较的结果是 bool 值', accent: 'var(--ochre)', details: { operators: { eyebrow: 'C++ 的比较', statement: '<、>、<=、>=、==、!= 都给出真假结果。', formula: '3 < 5 → true\n5 != 5 → false', explanation: '它们像二元关系，同时也是实际执行并生成 bool 值的运算符。', footnote: 'C 语言中的关系与逻辑运算结果是 int，以 0 或 1 表示真假。' } } },
    ] },
    { id: 'logic-group', title: '逻辑组合', subtitle: 'Connectives', summary: '从简单判断构造复合条件', accent: 'var(--plum)', children: [
      { id: 'connectives', title: '逻辑联结', subtitle: '&& · || · !', summary: '与、或、非把判断组织起来', accent: 'var(--lavender)', details: { combine: { eyebrow: '组合公式', statement: '两个比较可以合成一个范围条件。', formula: 'x > 0 && x < 10', explanation: '&& 对应“与”，|| 对应“或”，! 对应“非”。例如 age >= 18 && hasTicket 同时要求成年与持票。' } } },
      { id: 'short-circuit', title: '短路求值', subtitle: 'Short circuit', summary: '左侧结果可能阻止右侧执行', accent: 'var(--wine)', details: { safety: { eyebrow: '逻辑也是执行规则', statement: '若 p 为空，&& 的右侧不会求值。', formula: 'p != nullptr && *p > 0', explanation: '左侧为 false 时，整体必为 false，程序因此不执行 *p。|| 在左侧为 true 时也会短路。', footnote: '非空只说明不为 nullptr，不能证明指针没有悬空。' } } },
    ] },
    { id: 'language-group', title: '语言统一', subtitle: 'C/C++ expression', summary: '项型与公式型结构都进入表达式语法', accent: 'var(--green)', children: [
      { id: 'expression', title: '表达式', subtitle: 'Expression', summary: '运算、判断、函数调用与赋值都可求值', accent: 'var(--blue)', details: { unified: { eyebrow: '比“项／公式”更宽', statement: 'C/C++ 把多种可求值结构统一称为表达式。', formula: 'x + 1\nx < 10\nf(x)\nx = 10', explanation: '项型表达式可得到数值；C++ 的比较和逻辑表达式得到 bool。赋值本身也是表达式，还可能改变状态。' } } },
      { id: 'bool-conversion', title: '布尔转换', subtitle: 'Contextual bool', summary: '条件上下文可把整数或指针转为真假', accent: 'var(--ochre)', details: { context: { eyebrow: '类型与判断相遇', statement: 'if (5) 可以成立，因为非零整数在条件中转换为 true。', formula: '0 → false\n非零 → true\nnullptr → false', explanation: 'if (p) 通常用于检查 p 是否非空；这是类型转换，不等于数学逻辑中的“项就是公式”。', footnote: '布尔转换不能检查指针是否仍指向有效对象。' } } },
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
