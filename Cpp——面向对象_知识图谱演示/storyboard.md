# 分镜：从单个对象到对象家族

主舞台是同一个 `KnowledgeStage`。封面后每按一次空格或方向键推进一个状态。Detail 模式保留已出现的图谱坐标，并在右侧展示解释。

| Step | 活跃图谱 | 焦点 | 镜头 | 可见上下文 | 讲述目标 |
|---:|---|---|---|---|---|
| 0 | A | 对象 | node / Detail | 根节点 | 为什么让机器人自己管理状态和行为 |
| 1 | A | 构造 | node / Detail | 对象、构造 | 存储空间如何成为有效对象 |
| 2 | A | 初始化列表 | node / Detail | 构造路径 | 直接初始化与构造函数体赋值区别 |
| 3 | A | 初始化列表 | node / Detail | 构造路径 | const、引用、无默认构造成员与顺序 |
| 4 | A | 生命周期 | node / Detail | 已出现的对象路径 | 析构与自动收尾 |
| 5 | A | 生命周期 | node / Detail | 构造和析构 | RAII 与标准库资源管理 |
| 6 | A | 默认／删除 | node / Detail | 生命周期分支 | `= default` 与 `= delete` |
| 7 | A | 封装 | node / Detail | 对象、封装 | public 接口与 private 状态的边界 |
| 8 | A | 不变量 | node / Detail | 封装分支 | `balance ≥ 0` 的真正保证条件 |
| 9 | A | 稳定接口 | node / Detail | 封装分支 | 内部存储变化时外部调用不变 |
| 10 | A | 封装 | subtree / Summary | 整个封装分支 | 收缩详情，保留路径 |
| 11 | A | 对象 | all / Overview | 完整 A 图 | 合法对象的三条支柱 |
| 12 | A | 对象 | all / Concept | 完整 A 图 | 转换问题：一个对象 → 一类对象 |
| 13 | 中间镜头 | 显式映射 | all / Overview | 三组来源与目标 | 封装→契约，生命周期→虚析构，对象行为→动态分派 |
| 14 | B | 类型系统 | all / Overview | 完整 B 图 | 类型家族由哪些关系组成 |
| 15 | B | 继承 | node / Detail | 根与继承 | is-a 与可替代性 |
| 16 | B | 组合 | node / Detail | 继承分支 | has-a 的电池例子 |
| 17 | B | 派生类能力 | node / Detail | 继承分支 | 复用、增加能力、尊重 private |
| 18 | B | 函数契约 | node / Detail | 根与契约 | 非虚函数固定共同实现 |
| 19 | B | 函数契约 | node / Detail | 根与契约 | 虚函数有默认实现并可 override |
| 20 | B | 函数契约 | node / Detail | 根与契约 | 纯虚函数要求具体类实现 |
| 21 | B | 动态分派 | node / Detail | 根与多态 | 相同接口如何得到不同攻击行为 |
| 22 | B | 工厂函数 | node / Detail | 多态分支 | 创建时隐藏具体类型 |
| 23 | B | 虚析构 | node / Detail | 多态分支 | 通过基类指针销毁对象的正确性 |
| 24 | B | 虚析构 | node / Detail | 多态分支 | 基类先构造、派生类先析构 |
| 25 | B | 类型系统 | all / Overview | 完整 B 图 | 用稳定契约组织多种对象 |

结尾独立一页只给出一句总结：对象维护合法状态，接口连接不同类型。
