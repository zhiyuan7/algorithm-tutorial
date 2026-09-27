import type { KnowledgeMapData } from './types'

export const storageMap: KnowledgeMapData = {
  id: 'storage', title: '对象在哪里、存在多久', subtitle: '地址、布局与存储期', layout: 'tree',
  root: {
    id: 'memory-root', title: '内存中的对象', subtitle: '地址与生命期',
    summary: '如何访问它？它能存在多久？', accent: '#13254F',
    details: { opening: { statement: '写下一个变量时，我们也创建了一个有地址、有生命期的对象。', explanation: '先看看数据占多少空间、怎样排列，再讨论它什么时候创建和销毁。' } },
    children: [
      {
        id: 'representation', title: '地址与布局', subtitle: '数据怎样排列',
        summary: '类型决定需要的空间，地址告诉我们对象在哪里', accent: '#396D80',
        details: {
          address: { title: '常见类型占多大？', statement: '类型不同，通常需要的字节数也不同。', table: {
            headers: ['类型', '常见大小（字节）'],
            rows: [['char / unsigned char', '1'], ['bool', '1'], ['short / unsigned short', '2'], ['int / unsigned int', '4'], ['long / unsigned long', '4（Windows）／8（Linux）'], ['long long / unsigned long long', '8'], ['float', '4'], ['double', '8'], ['long double', '8／12／16，依实现而定'], ['指针（如 int*）', '64 位通常 8；32 位通常 4']],
          }, code: 'address', footnote: '表中是常见平台的取值，实际以 sizeof 为准。sizeof(char) 恒为 1；常见平台 1 字节 = 8 位。' },
        },
        children: [
          { id: 'array', title: '数组', subtitle: '同类型 · 连续排列', summary: '每个元素大小相同，按下标定位', accent: '#396D80', details: {
            layout: { statement: '数组把同类型的元素紧挨着放，下标就是偏移的依据。', code: 'array', formula: String.raw`\operatorname{addr}(a_i)=\operatorname{addr}(a_0)+i\cdot\operatorname{sizeof}(T)`, diagram: 'array', footnote: '数组名在多数表达式中会转换为首元素指针；sizeof(a) 取得整个数组的大小。' },
          } },
          { id: 'struct', title: '结构体', subtitle: '不同成员 · 对齐布局', summary: '成员之间可能有填充，整体大小也要满足对齐', accent: '#74A0BA', details: {
            layout: { statement: '结构体可以放不同类型的成员。为了对齐，成员之间可能留出空隙。', code: 'struct', diagram: 'struct', explanation: '这个例子中，成员合计 5 字节，结构体通常占 8 字节。', footnote: '示意假设 int 为 4 字节且按 4 字节对齐；实际布局以 sizeof、alignof 为准。' },
          } },
        ],
      },
      {
        id: 'lifetime', title: '存储期选择', subtitle: '对象能存在多久', summary: '按实际需要选择生命期', accent: '#163F6F',
        details: {
          choice: { statement: '如果大小和使用范围都已确定，通常让语言安排存储就够了。', bullets: ['静态存储期：对象保留到程序结束', '自动存储期：普通局部对象随作用域结束', '动态存储期：由程序决定何时释放'], explanation: '接下来分别看这三种常见情况。', footnote: '这里聚焦三类；C++ 还提供 thread_local 对应的线程存储期。' },
          distinction: { title: '作用域与存储期', statement: '“在哪里能用这个名字”和“对象能存在多久”，是两个问题。', code: 'scope', bullets: ['作用域看名字：函数外不能使用 count', '存储期看对象：离开函数后 count 仍保留'], footnote: '离开作用域不一定销毁对象；局部 static 就是一个例子。' },
        },
        children: [
          { id: 'static', title: '静态存储期', subtitle: '保留到程序结束', summary: '局部 static 只初始化一次', accent: '#624F6B', details: {
            behavior: { statement: '每次调用都需要保留上次的结果时，可以使用局部 static。', code: 'static', explanation: '函数返回后 count 不会销毁，下一次调用会继续使用同一个对象。', footnote: '函数局部 static 首次执行到声明时初始化；全局对象也具有静态存储期。' },
          } },
          { id: 'automatic', title: '自动存储期', subtitle: '作用域结束时清理', summary: '内层先结束，外层继续存在', accent: '#B5855F', details: {
            behavior: { statement: '内层结束时，inner 销毁，outer 会继续存在。', code: 'automatic', diagram: 'scope', footnote: '类对象也会析构。自动存储期是语言规则，栈只是典型实现。' },
          } },
          { id: 'dynamic', title: '动态存储期', subtitle: '运行时决定大小和释放时机', summary: '不受创建处的作用域限制', accent: '#7D8981', details: {
            need: { title: '什么时候需要 new？', statement: '运行时才知道数量，或对象需要在创建处之外继续存在时，动态存储就派上用场了。', code: 'dynamic', bullets: ['new[] 可以按输入数量创建数组', 'new 会初始化对象，类对象还会调用构造函数', '对象可跨作用域存在，释放责任需要明确'], footnote: '此处用于说明机制；实际代码通常优先用 vector 或智能指针管理。' },
          }, children: [
            { id: 'pointer', title: '指针保存地址', subtitle: '指针与对象分开理解', summary: '指针变量和被指向对象各有自己的存储期', accent: '#74A0BA', details: {
              address: { statement: '指针存的是地址；解引用后，才访问地址处的对象。', code: 'pointer', bullets: ['p 是一个变量，*p 是被指向的对象', 'delete p 释放对象，不会销毁指针变量 p'], footnote: '普通指针离开作用域，不会自动释放它指向的动态对象。' },
            } },
          ] },
        ],
      },
    ],
  },
  relations: [{ id: 'r-automatic-dynamic', source: 'automatic', target: 'dynamic', label: '需要更灵活的生命期', type: 'limits' }],
}

export const ownershipMap: KnowledgeMapData = {
  id: 'ownership', title: '谁负责释放动态对象', subtitle: '从分配接口走向所有权', layout: 'tree',
  root: {
    id: 'ownership-root', title: '动态资源所有权', subtitle: '创建、使用与释放', summary: '确定谁负责释放资源', accent: '#13254F',
    details: { opening: { statement: '拿到对象的地址之后，还要确定谁负责释放它。', explanation: '普通指针不会替我们收尾。先看手动分配怎样工作，再把释放责任交给管理者。' } },
    children: [
      { id: 'malloc', title: 'malloc / free', subtitle: '申请原始字节', summary: '只管理存储，不调用构造与析构', accent: '#396D80', details: {
        mechanism: { statement: 'malloc 按字节申请空间，free 把空间归还。它们不调用类的构造和析构。', code: 'malloc', explanation: '申请后先检查是否成功，再使用这块空间。', footnote: '这里是 C 代码；C++ 不能把 void* 隐式转为 int*。数量来自外部时，还要检查乘法溢出。' },
      } },
      { id: 'new', title: 'new / delete', subtitle: '创建与销毁对象', summary: '分配并构造，析构并释放', accent: '#624F6B', details: {
        mechanism: { title: 'new 帮我们做了什么？', statement: 'new 直接创建指定类型的对象，把分配空间和初始化连在一起。', code: 'new', bullets: ['返回对应类型的指针，不必手算对象字节数', '调用构造函数，让类对象完成初始化', '普通 new 分配失败时抛出 std::bad_alloc'], footnote: 'delete 会先析构再释放；new[] 对应 delete[]。不要与 malloc/free 混用。' },
      } },
      { id: 'risk', title: '手动释放风险', subtitle: '提前返回与异常', summary: '多个出口容易遗漏释放', accent: '#644A56', details: {
        leak: { statement: '函数不一定会走到最后一行，手写的 delete 因此可能被跳过。', code: 'risk', explanation: '提前返回或异常发生后，失去释放机会的动态对象就可能造成内存泄漏。' },
      } },
      { id: 'raii', title: 'RAII', subtitle: '由管理者自动清理', summary: '管理者析构时释放资源', accent: '#B5855F', details: {
        principle: { statement: '把资源交给管理对象，让它在析构时释放。函数怎样退出，都有对象负责收尾。', code: 'raii', explanation: '这里 p 在正常返回、提前返回或异常展开时析构，随后释放 Robot。', footnote: 'RAII：Resource Acquisition Is Initialization；同样适用于文件、锁等资源。' },
      }, children: [
        { id: 'unique', title: 'unique_ptr', subtitle: '唯一所有权', summary: '可以移动，不能复制', accent: '#163F6F', details: {
          transfer: { statement: '只需要一个所有者时，优先使用 unique_ptr。移动可以把责任交给另一个管理者。', code: 'unique', explanation: 'std::move(p) 后，q 接管对象，p 不再拥有它。' },
        } },
        { id: 'shared', title: 'shared_ptr', subtitle: '共享所有权', summary: '最后一个所有者退出时释放', accent: '#7D8981', details: {
          count: { statement: '确实需要多个所有者时，可以使用 shared_ptr。最后一个所有者退出，才释放对象。', code: 'shared', explanation: '复制会增加共享计数；销毁或 reset 会减少计数。', footnote: '引用计数有成本；循环持有时可用 weak_ptr 打破环。' },
        } },
      ] },
    ],
  },
  relations: [
    { id: 'r-malloc-new', source: 'malloc', target: 'new', label: '从字节到对象', type: 'flow' },
    { id: 'r-new-risk', source: 'new', target: 'risk', label: '手动配对易遗漏', type: 'limits' },
    { id: 'r-risk-raii', source: 'risk', target: 'raii', label: '交给管理者释放', type: 'supports' },
  ],
}

export const knowledgeMaps = { storage: storageMap, ownership: ownershipMap }
