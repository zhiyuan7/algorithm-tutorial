import type { KnowledgeMapData, KnowledgeNodeData } from './types'
const d = (eyebrow: string, statement: string, formula?: string, explanation?: string, footnote?: string, bullets?: string[]) => ({ eyebrow, statement, formula, explanation, footnote, bullets })
const n = (id: string, title: string, subtitle: string, accent: string, summary: string, parentLabel?: string, details?: KnowledgeNodeData['details'], children?: KnowledgeNodeData[]): KnowledgeNodeData => ({ id, title, subtitle, accent: `var(--${accent})`, summary, parentLabel, details, children })

const objectRoot = n('object-root','合法对象','Object & State','ink','数据和行为由负责的对象聚合，对象自己维护合法状态。',undefined,{
  opening: d('从扁平函数走向对象','先找到负责问题的对象，再调用它提供的能力。','状态 + 行为 + 约束 → 对象','机器人对象把移动操作与坐标、朝向、电量放在一起；使用者只提出动作请求，不在外部拼接内部状态。','面向对象是一种组织责任的方式，不意味着每个问题都必须使用继承。')
},[
  n('construction','构造','Construction','teal','构造函数让取得存储空间后的对象进入合法初始状态。','建立',{
    main:d('对象的起点','构造函数负责建立满足类设计要求的对象。','存储空间 → Robot(10,20) → 有效对象','对象创建不只是取得一块内存；Robot(double,double) 还给坐标初值，使后续成员函数可以依赖它们。')
  },[
    n('initialization','初始化列表','Member Initialization','sky','成员建立时取得初值；顺序按声明顺序，而非列表顺序。','直接初始化',{
      direct:d('建立与修改不同','初始化列表在成员形成时直接提供构造参数。','Robot(...) : x(init_x), y(init_y) {}','对 Name 这样的类成员，name(text) 直接构造；构造函数体中的 name = text 通常先默认构造，再赋值。','无类内初值的 double 等标量默认初始化后值不确定；不能把它理解成已被赋为 0。'),
      required:d('必须使用的情况','const、引用和无默认构造函数的成员必须在建立时处理。','Task(...) : id(task_id), owner(task_owner) {}',undefined,'初始化列表按成员声明顺序写，能减少误读和编译器警告。',['const 成员在建立时给值；引用成员在建立时绑定。','成员真实初始化顺序始终是类中的声明顺序。'])
    })
  ]),
  n('lifetime','生命周期','Lifetime & RAII','ochre','构造使对象出现，析构在生命周期结束时自动收尾。','离开',{
    destruction:d('对象的终点','对象离开作用域时，析构函数自动执行收尾。','进入作用域 → 构造；离开作用域 → 析构','~Robot() 不能带参数；类至多有一个析构函数。普通成员通常不需要手写析构逻辑。'),
    raii:d('资源跟随对象','RAII 把资源取得与释放交给对象生命周期管理。','取得资源 → 对象拥有 → 析构时释放','Buffer 的析构可释放动态数组。实际工程优先用 vector、string、unique_ptr 和文件流等现成 RAII 类型。','这样每条退出路径都不必重复手动清理。')
  },[
    n('defaults','默认与禁用','= default / = delete','tan','需要编译器生成时用 default；不允许调用时用 delete。','声明策略',{
      policy:d('特殊成员函数','= default 请求默认实现，= delete 禁止特定调用。','Robot() = default;    Task() = delete;','自己声明带参构造函数后，不会自动再有无参默认构造。删除默认构造仍可保留 Task(int)。','未提供类内初值的简单类型成员，不应假定默认构造后自动为零。')
    })
  ]),
  n('encapsulation','封装','Encapsulation','plum','公开能力，守住内部状态。','保护',{
    boundary:d('接口与实现','外部提出操作请求，对象决定怎样修改内部数据。','外部代码 → public 接口 → private 状态','存款、取款和查余额是能力；余额的存储结构是实现细节。private 只是实现这条边界的语法手段。','Temperature 可以拒绝低于 −273.15°C 的状态。')
  },[
    n('invariant','不变量','Invariant','wine','构造及每个公开操作都要维护对象应始终满足的规则。','维护约束',{
      balance:d('银行账户例子','如果规则是余额非负，所有入口都必须维护它。','balance ≥ 0',undefined,'原文示例构造与取款检查不完整；仅把 balance 设为 private 不足以保证不变量。',['构造时拒绝负的初始余额。','取款时要求 amount > 0 且 amount ≤ balance。'])
    }),
    n('stable-interface','稳定接口','Stable API','lavender','内部表示可变，外部依赖的操作含义保持稳定。','隔离实现',{
      representation:d('低耦合演化','公开接口稳定，内部存储方式就能独立演进。','double balance → long long cents','余额可从浮点数改为“分”的整数，甚至拆为可用与冻结余额；调用方仍使用 withdraw() 和 getBalance()。','只装简单数据、没有不变量的 struct 可以公开字段。')
    })
  ])
])

const typesRoot = n('types-root','类型协作','Type & Behavior','ink','通过真实的类型关系和稳定契约，让多种对象被一致地使用。',undefined,undefined,[
  n('inheritance','继承','is-a','teal','公有继承表达“一种”，要求派生类可合理地用作基类。','类型关系',{
    is_a:d('类型而非代码捷径','InfantryRobot 是一种 Robot，才适合公有继承。','class InfantryRobot : public Robot','在需要 Robot 的地方，步兵机器人应仍合理可用。复用代码是结果，不是建立虚假 is-a 关系的理由。')
  },[
    n('reuse','派生类能力','Reuse & Extend','sky','复用基类功能、添加能力，并按虚函数契约改变行为。','继承并扩展',{
      extension:d('派生类能做什么','步兵机器人沿用 move，同时新增 shoot。','infantry.move(1,2);  infantry.shoot();','派生类可以使用可访问的基类成员，也可新增自身能力；基类 private 数据仍需经基类接口处理。')
    }),
    n('composition','组合','has-a','green','拥有部件时用成员对象：机器人有电池，但不是电池。','辨别关系',{
      has_a:d('与继承的分界','Robot has-a Battery，通常应使用组合。','class Robot { Battery battery; };','电池、武器、传感器是机器人拥有的部件；问“是不是一种”与“有没有一个”能帮助选关系。','不要只为少写重复代码而建立不真实的继承层次。')
    })
  ]),
  n('contract','函数契约','Interface Policy','plum','非虚、虚、纯虚函数向派生类授予不同实现自由度。','接口约定',{
    nonvirtual:d('非虚函数','基类提供共同接口和固定实现。','int id() const;','派生类写同名函数只是隐藏，不是动态重写；经 Robot& 或 Robot* 调用仍使用基类版本。'),
    virtual:d('普通虚函数','基类给默认实现，派生类可以明确 override。','virtual void move(...);  // override','派生类可沿用，也可重写。写上 override 后，参数或 const 不匹配会在编译期暴露。'),
    pure:d('纯虚函数','基类规定能力，具体派生类必须给出实现。','virtual void attack() = 0;','Robot 因此成为抽象类。未实现 attack 的派生类仍是抽象类；调用方依赖共同的接口契约。','纯虚函数技术上可以有函数定义，但仍要求具体派生类重写。')
  }),
  n('dispatch','动态分派','Polymorphism','blue','经基类引用或指针调用虚函数，按实际对象类型选择实现。','运行时行为',{
    attack:d('同一接口，不同行为','Robot& 接收不同机器人，attack() 执行各自版本。','void executeAttack(Robot& r) { r.attack(); }','传入 InfantryRobot 会开步枪，传入 HeroRobot 会开炮；调用方无需写一长串类型判断。','关键是通过基类引用或指针调用虚函数。')
  },[
    n('factory','工厂函数','Factory','ochre','返回稳定接口指针，具体类型由函数内部选择。','隐藏创建',{
      creation:d('创建也面向接口','工厂函数隔离具体机器人的构造选择。','std::unique_ptr<Robot> makeRobot(type)','调用方取得 Robot 接口并调用 attack()；unique_ptr 管理对象生命周期。创建一组配套产品时才考虑抽象工厂。')
    }),
    n('virtual-dtor','虚析构','Virtual Destructor','wine','通过基类指针删除派生对象时，先析构派生部分，再析构基类。','完整销毁',{
      deletion:d('多态对象的收尾','可能经基类指针销毁时，基类析构函数必须是 virtual。','virtual ~Robot() = default;','Robot* 实际指向 InfantryRobot 时，虚析构保证先清理派生部分再清理基类；非虚析构的这种 delete 会产生未定义行为。'),
      order:d('完整对象的顺序','先构造基类，再构造派生类；析构次序相反。','构造：Robot → Infantry；析构：Infantry → Robot','派生对象建立前，基类部分要先有效；销毁时先结束派生部分，再结束其所依赖的基类部分。')
    })
  ])
])

export const knowledgeMaps: Record<'object'|'types', KnowledgeMapData> = {
  object: { id:'object', title:'合法对象', subtitle:'建立、维护并结束一个对象', layout:'tree', root:objectRoot, relations:[
    { id:'r-init-invariant', source:'initialization', target:'invariant', label:'初始即合法', type:'supports' },
  ] },
  types: { id:'types', title:'类型协作', subtitle:'关系、契约与运行时行为', layout:'tree', root:typesRoot, relations:[
    { id:'r-inheritance-contract', source:'inheritance', target:'contract', label:'遵守基类约定', type:'supports' },
    { id:'r-contract-dispatch', source:'contract', target:'dispatch', label:'虚调用触发', type:'flow' },
  ] },
}
export const morphMapping = [
  { from:'encapsulation', fromTitle:'封装', to:'contract', toTitle:'函数契约', reason:'单个对象的公开边界，推广为类型家族的共同接口' },
  { from:'lifetime', fromTitle:'生命周期', to:'virtual-dtor', toTitle:'虚析构', reason:'对象清理责任，延伸到通过基类指针完整销毁' },
  { from:'object-root', fromTitle:'对象行为', to:'dispatch', toTitle:'动态分派', reason:'对象提供能力，发展为同一接口下的不同行为' },
] as const
