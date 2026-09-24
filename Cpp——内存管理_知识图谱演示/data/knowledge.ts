import type { KnowledgeMapData } from './types'

export const storageMap: KnowledgeMapData = {
  id: 'storage',
  title: '对象在哪里、存在多久',
  subtitle: '地址、布局与三种存储期',
  layout: 'tree',
  root: {
    id: 'memory-root', title: '内存中的对象', subtitle: 'Address · Lifetime',
    summary: '同一个问题的两面：如何访问，存在多久', accent: '#13254F',
    details: { opening: { eyebrow: '核心问题', statement: '一份数据怎样落在地址上，又由谁决定它何时消失？', explanation: '先看对象的表示与布局，再用存储期解释不同的生命周期。' } },
    children: [
      {
        id: 'representation', title: '地址与布局', subtitle: 'Representation',
        summary: '名字、数组、结构体最终都对应内存中的字节', accent: '#396D80',
        details: {
          address: { eyebrow: '变量名是抽象', statement: '访问对象最终依赖地址；变量名让我们不必手写具体地址。', formula: 'int x = 10;    &x → x 的地址', explanation: '整型、浮点型和 bool 描述值的类型；类型决定对象需要的存储及可进行的操作。' },
          layout: { eyebrow: '连续与对齐', statement: '数组元素连续排列；结构体成员依声明顺序布局，但可插入对齐填充。', formula: 'address(a[i]) = address(a[0]) + i × sizeof(T)', bullets: ['数组名在多数表达式中转换为首元素指针', '结构体 sizeof 可能大于成员大小之和', '通信协议须明确布局与字节序'], footnote: '#pragma pack 是编译器扩展；紧凑布局可能带来未对齐访问。' },
        },
      },
      {
        id: 'lifetime', title: '存储期选择', subtitle: 'Storage Duration',
        summary: '已知的规模和生命期无需次次调用动态分配器', accent: '#163F6F',
        details: {
          choice: { eyebrow: '为什么不全部动态分配', statement: '大小和生存范围已知时，让语言自动安排存储更简单。', explanation: '动态分配需要查找、登记和回收不规则空闲块；自动对象可随作用域清理。', formula: '静态存储期 · 自动存储期 · 动态存储期' },
          distinction: { eyebrow: '两个不同的问题', statement: '作用域决定名字在哪里可见；存储期决定对象存在多久。', example: '函数内的 static count：名字只在函数内可见，对象却持续到程序结束。' },
        },
        children: [
          { id: 'static', title: '静态存储期', subtitle: 'Static', summary: '贯穿程序运行，局部 static 仅初始化一次', accent: '#624F6B', details: {
            behavior: { eyebrow: '全局与局部 static', statement: '对象持续到程序结束；局部 static 的名字仍受局部作用域限制。', example: '连续三次调用含 static int count 的函数，可依次得到 1、2、3。', footnote: '初始化时机依对象种类而异；函数局部 static 首次执行到声明时初始化。' },
          } },
          { id: 'automatic', title: '自动存储期', subtitle: 'Automatic', summary: '普通局部对象随作用域进入和离开', accent: '#B5855F', details: {
            behavior: { eyebrow: '作用域负责收尾', statement: '普通局部对象在作用域结束时自动销毁，类对象的析构函数也随之执行。', explanation: '典型实现使用调用栈；嵌套调用符合后进先出，分配通常只需调整栈指针。', footnote: '“自动存储期”是语言概念；优化后对象不一定实际占用栈空间。' },
          } },
          { id: 'dynamic', title: '动态存储期', subtitle: 'Dynamic', summary: '规模与释放时机都可以在运行时确定', accent: '#7D8981', details: {
            need: { eyebrow: '灵活性的来源', statement: '运行时才知道规模，或希望对象独立于创建处的作用域继续存在时，动态存储提供一种选择。', example: '用户输入 count 后才创建 count 个 Image；释放时机由程序控制。', explanation: '分配器管理大小不一、释放顺序不规则的空闲块。' },
          }, children: [
            { id: 'pointer', title: '指针保存地址', subtitle: 'Pointer', summary: '动态对象的地址在运行时产生，需要被保存', accent: '#74A0BA', details: {
              address: { eyebrow: '地址与对象分开', statement: '指针保存地址；解引用才访问该地址处的对象。', formula: 'p → 地址；*p → 地址处的对象', explanation: '指针本身也有自己的存储期：局部、全局，或作为动态对象的成员。' },
            } },
          ] },
        ],
      },
    ],
  },
  relations: [
    { id: 'r-automatic-dynamic', source: 'automatic', target: 'dynamic', label: '需要更灵活的生命期', type: 'limits' },
  ],
}

export const ownershipMap: KnowledgeMapData = {
  id: 'ownership',
  title: '谁负责释放动态对象',
  subtitle: '原始分配 → 对象语义 → 所有权',
  layout: 'tree',
  root: {
    id: 'ownership-root', title: '动态资源所有权', subtitle: 'Ownership · RAII',
    summary: '关键问题从“在哪里申请”转向“谁负责释放”', accent: '#13254F',
    details: { opening: { eyebrow: '问题转换', statement: '动态对象不会因指针变量离开作用域就自动消失。', explanation: '必须把创建、使用、释放连接成可信的生命周期。' } },
    children: [
      { id: 'malloc', title: 'malloc / free', subtitle: 'C · raw bytes', summary: '按字节申请和释放，返回 void*', accent: '#396D80', details: {
        mechanism: { eyebrow: 'C 的接口', statement: 'malloc(size) 申请至少 size 个字节；free 释放这块空间。', formula: 'int* p = malloc(n × sizeof(int));    free(p);', explanation: 'C 中 void* 可转换为对象指针；申请结果应检查，规模乘法也需防溢出。', footnote: '示意代码为 C 语法；C++ 中 void* 不能隐式转为 int*。' },
      } },
      { id: 'new', title: 'new / delete', subtitle: 'C++ · objects', summary: '分配并构造对象，销毁并释放对象', accent: '#624F6B', details: {
        mechanism: { eyebrow: '对象语义', statement: 'new Robot 先取得存储再构造 Robot；delete 先析构再释放存储。', formula: 'Robot* p = new Robot;    delete p;', explanation: '数组用 new[] 与 delete[] 成对；不能把 malloc/free 与 new/delete 混用。' },
      } },
      { id: 'risk', title: '手动释放风险', subtitle: 'Leak · Early Return', summary: '提前返回、异常与所有权转移易漏掉释放', accent: '#644A56', details: {
        leak: { eyebrow: '失去最后一个可达地址', statement: '申请后若没有正确释放，程序可能持续占用不再可用的内存。', example: 'new Robot 后遇到提前 return，末尾的 delete 不会执行。', explanation: '多个出口、异常和复杂控制流使人工配对越来越难可靠。' },
      } },
      { id: 'raii', title: 'RAII', subtitle: 'Resource Acquisition Is Initialization', summary: '把资源责任绑定到对象的析构', accent: '#B5855F', details: {
        principle: { eyebrow: '生命周期重新自动化', statement: '让管理者对象负责释放资源，离开作用域时调用其析构函数。', formula: '资源获取 → 管理对象 → 作用域结束 → 析构释放', explanation: 'RAII 不只用于内存，也适用于文件、锁和其他资源。' },
      }, children: [
        { id: 'unique', title: 'unique_ptr', subtitle: 'Exclusive ownership', summary: '唯一所有权，可移动但不可复制', accent: '#163F6F', details: {
          transfer: { eyebrow: '默认选择', statement: 'make_unique 创建对象并交给一个管理者；移动可转移所有权。', formula: 'auto p = std::make_unique<Robot>();', example: 'auto q = std::move(p) 后，q 负责对象；p 不再拥有它。', footnote: '需要唯一所有者时，优先选择 unique_ptr。' },
        } },
        { id: 'shared', title: 'shared_ptr', subtitle: 'Shared ownership', summary: '共享所有权，最后一个所有者消失时释放', accent: '#7D8981', details: {
          count: { eyebrow: '确实需要共享时', statement: '复制 shared_ptr 会增加共享所有者；最后一个所有者消失才释放对象。', formula: 'use_count: 3 → 2 → 1 → 0 → 析构对象', explanation: '引用计数有成本；循环持有会使计数无法归零，必要时用 weak_ptr 打破环。' },
        } },
      ] },
    ],
  },
  relations: [
    { id: 'r-malloc-new', source: 'malloc', target: 'new', label: '从字节到对象', type: 'flow' },
    { id: 'r-new-risk', source: 'new', target: 'risk', label: '手工配对易遗漏', type: 'limits' },
    { id: 'r-risk-raii', source: 'risk', target: 'raii', label: '绑定释放责任', type: 'supports' },
  ],
}

export const knowledgeMaps = { storage: storageMap, ownership: ownershipMap }
