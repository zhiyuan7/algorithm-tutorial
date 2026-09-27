import type { KnowledgeDetail, KnowledgeMapData, KnowledgeNodeData } from './types'
const d = (detail: KnowledgeDetail) => detail
const n = (id: string, title: string, subtitle: string, accent: string, summary: string, parentLabel?: string, details?: KnowledgeNodeData['details'], children?: KnowledgeNodeData[]): KnowledgeNodeData => ({ id, title, subtitle, accent: `var(--${accent})`, summary, parentLabel, details, children })

const objectRoot = n('object-root', '合法对象', 'Object & State', 'ink', '把数据和行为交给负责的对象。', undefined, {
  opening: d({ eyebrow: '从机器人说起', statement: '把状态和操作放在一起，让对象自己照顾自己。', explanation: '机器人把坐标、朝向和电量与移动操作放在一起。使用者只需要说“向前走”，不用每次手动更新这些数据。', bullets: ['构造：给对象一个合适的起点。', '生命周期：在结束时清理资源。', '封装：把可复用过程和可控接口组织起来。'] }),
}, [
  n('construction', '构造', 'Construction', 'teal', '可以使用编译器提供的构造，也可以自己写。', '建立', {
    main: d({ eyebrow: '对象怎样开始', statement: '不声明构造函数时，编译器会隐式声明无参的默认构造函数。', code: 'construction', explanation: '也可以自己写。只要声明了构造函数，编译器就不再自动提供那个无参版本；还想无参创建，就需要自己补上。', footnote: '准确说是“不再自动提供”，不是覆盖一个已有函数。隐式默认构造也可能因成员无法默认构造而被删除；它不保证数值成员自动为 0。' }),
  }, [
    n('initialization', '初始化列表', 'Member Initialization', 'sky', '直接建立成员，通常省去先构造再赋值的额外工作。', '直接初始化', {
      direct: d({ eyebrow: '少做一次多余的工作', statement: '初始化列表直接构造成员，通常比先默认构造再赋值更高效。', code: 'initialization', explanation: '对 string 等类成员，上面只构造一次；下面先构造空字符串，再执行赋值，可能增加分配或复制的工作。', footnote: '这是避免额外操作的优势，不能保证所有代码都更快；对 int、double 等简单类型，优化后可能没有区别。' }),
      required: d({ eyebrow: '有些成员必须在建立时处理', statement: '引用需要绑定，const 需要初值，有些类成员还没有默认构造函数。', code: 'required', bullets: ['这些成员要通过初始化列表或可用的类内初值完成初始化。', '实际初始化顺序由成员的声明顺序决定。'], footnote: '初始化列表也按声明顺序写，读起来更清楚。' }),
    }),
  ]),
  n('lifetime', '生命周期', 'Lifetime & RAII', 'ochre', '构造让对象开始，析构在结束时收尾。', '收尾', {
    destruction: d({ eyebrow: '离开时自动收尾', statement: '局部对象离开作用域时，析构函数会自动执行。', code: 'destruction', explanation: '~Robot() 没有参数，一个类至多有一个析构函数。成员会自动销毁，通常不用手写清理逻辑。' }),
    raii: d({ eyebrow: '资源跟着对象走', statement: '把资源交给对象管理，就不用在每条退出路径上手动释放。', code: 'raii', explanation: 'vector、string、unique_ptr 和文件流都在使用这个思路：取得资源，持有资源，析构时释放。' }),
  }, [
    n('defaults', '默认与禁用', '= default / = delete', 'tan', '请求默认实现，或禁止不合适的操作。', '声明策略', {
      policy: d({ eyebrow: '把你的选择写清楚', statement: '= default 请编译器生成实现，= delete 禁止调用指定函数。', code: 'defaults', explanation: '声明带参构造后，可以用 Robot() = default 补回无参版本。Task 禁用无参构造，但仍能用 Task(1) 创建。' }),
    }),
  ]),
  n('encapsulation', '封装', 'Encapsulation', 'plum', '复用处理过程，控制对外接口。', '组织', {
    boundary: d({ eyebrow: '为什么要封装', statement: '把经常一起做的事打包，并让外部通过合适的入口使用它。', code: 'encapsulation', bullets: ['复用过程：调用一次，就完成一组相关操作。', '控制接口：决定外部能做什么，后续也方便扩展。'], explanation: 'public 给出可用的能力，private 留下内部细节；封装的价值来自这两种需要。' }),
  }, [
    n('process-reuse', '复用过程', 'Reuse a Process', 'wine', '把反复出现的一组处理步骤封装成操作。', '原因一', {
      process: d({ eyebrow: '同样的步骤，不用到处重写', statement: '一次取款包含检查和更新，把完整过程放进 withdraw()。', code: 'process-reuse', explanation: '每个调用者都能复用这套流程。构造时也检查初始余额，才能让余额始终非负。', formula: String.raw`\mathrm{balance} \ge 0` }),
    }),
    n('stable-interface', '控制接口，方便扩展', 'Control the Interface', 'lavender', '外部依赖稳定操作，内部可以逐步改进。', '原因二', {
      representation: d({ eyebrow: '只开放合适的入口', statement: '让外部调用存款、取款和查询，内部实现就更容易调整。', code: 'stable-interface', explanation: '余额可以从浮点数改成以“分”为单位的整数，也可以增加冻结余额。只要操作含义保持一致，调用方通常不用跟着改。', footnote: '只装简单数据、没有约束的 struct，也可以直接公开字段。' }),
    }),
  ]),
])

const typesRoot = n('types-root', '类型协作', 'Type & Behavior', 'ink', '用合适的关系和共同接口连接不同对象。', undefined, undefined, [
  n('inheritance', '继承与组合', 'is-a / has-a', 'teal', '是一种时用继承，有一个时用组合。', '选择关系', {
    is_a: d({ eyebrow: '是一种，还是有一个', statement: '步兵机器人是一种机器人；机器人有一块电池。', code: 'inheritance', bullets: ['is-a：公有继承，派生类应能合理替代基类。', 'has-a：组合，把部件作为成员对象。'], footnote: '复用代码是好处，但不能为了少写几行就建立不真实的继承关系。' }),
  }, [
    n('reuse', '派生类能力', 'Reuse & Extend', 'sky', '沿用已有能力，再添加自己的能力。', '继承并扩展', {
      extension: d({ eyebrow: '先沿用，再扩展', statement: '步兵机器人可以沿用 move，再增加 shoot。', code: 'reuse', explanation: '派生类能使用可访问的基类成员，也能添加自己的成员。基类的 private 数据仍要通过基类接口访问。' }),
    }),
    n('contract', '函数契约', 'Function Declarations', 'plum', '先看非虚、虚、纯虚三种函数怎么写。', '声明方式', {
      nonvirtual: d({ eyebrow: '非虚函数怎么写', statement: '普通成员函数不加 virtual，派生类可以直接沿用。', code: 'nonvirtual', explanation: '这里先记住声明形式。派生类写同名非虚函数叫“隐藏”，不能写 override。', footnote: '调用时怎样选择实现，留到后面的动态分派一起看。' }),
      virtual: d({ eyebrow: '虚函数怎么写', statement: '基类写 virtual，派生类重写时写 override。', code: 'virtual', explanation: '基类可以给默认版本，派生类可以沿用，也可以重写。override 会检查签名是否匹配，帮助发现写错的参数或 const。' }),
      pure: d({ eyebrow: '纯虚函数怎么写', statement: '声明末尾加 = 0，要求具体派生类提供实现。', code: 'pure', explanation: '含纯虚函数的类是抽象类，不能直接创建对象。派生类实现所有纯虚函数后，才能成为具体类。', footnote: '纯虚函数也可以另有定义；这里先掌握 = 0 与 override 的写法。' }),
    }),
  ]),
  n('dispatch', '动态分派', 'Polymorphism', 'blue', '同一接口，根据实际对象执行不同实现。', '运行时行为', {
    attack: d({ eyebrow: '同一句调用，不同的动作', statement: '通过 Robot& 或 Robot* 调用虚函数，实际对象决定执行哪个版本。', code: 'dispatch', explanation: '传入步兵机器人就开步枪，传入英雄机器人就开炮。调用方只需要写 robot.attack()。', footnote: '多态也能用于栈上的对象，不需要先动态分配内存。非虚函数则按表达式的静态类型选择。' }),
  }, [
    n('virtual-table', '虚函数表与指针', 'vtable & vptr', 'sky', '对象中的指针关联到表，再找到对应的函数。', '常见实现', {
      layout: d({ eyebrow: '对象怎样找到自己的版本', statement: '常见实现会在对象中保存 vptr，指向对应的虚函数表。', diagram: 'layout', bullets: ['vptr：虚函数表指针，通常由编译器自动维护。', 'vtable：表项指向该类型对应的虚函数实现；同类对象通常共享表。'], footnote: '这是常见的实现模型，C++ 标准不规定必须用这种布局。这里只画单继承与 attack 表项；多继承可能涉及多个指针和表。' }),
      lookup: d({ eyebrow: '一次虚调用怎么走', statement: '调用 robot.attack() 时，沿对象的 vptr 找到 attack 对应表项，再调用它。', diagram: 'call', explanation: '步兵和英雄对象关联的表不同，同一个表项就能指向不同的 attack()。派生类没有重写的函数，可以沿用基类实现。', footnote: '通常多了一次间接调用，也占用指针和表的空间；编译器若能确定实际类型，可能把调用直接优化掉。' }),
    }),
    n('factory', '工厂函数', 'Factory', 'ochre', '创建细节留在内部，外部拿到共同接口。', '隐藏创建', {
      creation: d({ eyebrow: '创建时也只依赖接口', statement: '工厂选择具体机器人，调用者拿到 Robot 接口。', code: 'factory', explanation: 'unique_ptr 负责生命周期，调用者仍用 attack()。以后增加一种机器人时，可以把创建选择集中在工厂里。' }),
    }),
    n('virtual-dtor', '虚析构', 'Virtual Destructor', 'wine', '通过基类指针销毁时，完整清理派生对象。', '完整销毁', {
      deletion: d({ eyebrow: '多态对象怎样收尾', statement: '要通过基类指针删除派生对象，基类析构函数应声明为 virtual。', code: 'virtual-dtor', explanation: '这样会先清理派生部分，再清理基类部分。如果这种 delete 使用了非虚的基类析构函数，就会产生未定义行为。' }),
      order: d({ eyebrow: '先建立依赖，再逐层收尾', statement: '构造先基类、后派生类；析构按相反顺序进行。', code: 'order', explanation: '步兵机器人建立前，基类部分要先建立好；结束时先清理步兵自己的成员，再结束基类部分。' }),
    }),
  ]),
])

export const knowledgeMaps: Record<'object' | 'types', KnowledgeMapData> = {
  object: { id: 'object', title: '合法对象', subtitle: '建立、维护并结束一个对象', layout: 'tree', root: objectRoot, relations: [
    { id: 'r-init-process', source: 'initialization', target: 'process-reuse', label: '从起点维护约束', type: 'supports' },
  ] },
  types: { id: 'types', title: '类型协作', subtitle: '关系、声明与运行时行为', layout: 'tree', root: typesRoot, relations: [
    { id: 'r-contract-dispatch', source: 'contract', target: 'dispatch', label: '虚函数参与分派', type: 'flow' },
  ] },
}
