# 《ROS 2》内容分析

## 中心问题与结论

文章以两个起点组织 ROS 2：**Node 决定功能如何拆分，Callback 决定工作何时进入执行流程**。由此推出两层互补的图谱：逻辑通信图说明谁与谁协作、通过什么契约连接；运行时图说明这些逻辑单元部署在哪些进程、受什么并发约束、由谁调度并如何整体启动。结论是同一 ROS Graph 可以对应不同运行时部署，性能、隔离和时序结果也会不同。

## 图谱边界

- **通信图 `communication`**：Node、Callback、Topic、Service、名称/类型/QoS。边表示逻辑创建、消息触发或连接约束。
- **执行图 `execution`**：Process、Composition、Callback Group、Executor、Wait Set、优先级、Launch。边表示部署权衡、并发约束或启动配置。
- 两张图的根问题和边语义不同，因此保持为独立数据对象。过渡仅负责解释概念映射，不把两图拼成一张树。

## 过渡映射

| 来源节点或组 | 过渡动作 | 目标节点或组 | 保留的语义 |
|---|---|---|---|
| Node | 移到进程位置后改名 | Process / Component | 逻辑功能要落到部署容器中；并非一对一等同 |
| Callback | 移到执行位置后改名 | Callback Group / Executor | 待执行工作需要并发约束与调度者 |
| Topic / Service | 移到就绪位置后改名 | Ready Entity / Wait Set | 通信实体产生可被执行器观察的事件 |
| 通信匹配 | 移到配置位置后改名 | Launch 配置 | 命名空间、重映射和参数等在部署时配置；QoS 还需实体自身正确设置 |

三个点击状态分别保留源锚点、移动锚点、重写目标标签。目标图在过渡结束后独立出现。

## 源文到场景覆盖矩阵

| 源文位置 | 核心观点 | 图谱节点或场景 | 处理方式 | 备注 |
|---|---|---|---|---|
| 一 / 1 Node 的动机 | 机器人功能应拆成独立计算单元 | `node` / 1 | 详情、例子 | 相机→检测→规划→控制 |
| 一 / 1.1 分布式计算 | Node 是逻辑边界，可跨设备通信 | `node` / 1,2 | 讲述、详情 | 保留 Node ≠ Process |
| 一 / 1.2 故障隔离 | 多进程隔离与通信成本形成权衡 | `node`, `process`, `composition` / 2,18–20 | 详情、关系线 | 分配到两张图讲解 |
| 一 / 2 Callback | 何时执行是第二个起点 | `callback` / 3–4 | 详情 | 与 Node 形成逻辑关联 |
| 一 / 2.1 事件驱动 | 新图像到来后触发处理 | `callback` / 3 | 例子 | Subscription Callback |
| 一 / 2.2 时间驱动 | Timer 周期触发但不保证精确时刻 | `callback` / 4 | 详情、边界 | 1 ms / 1000 Hz 为目标频率 |
| 二 / 1 Topic | Publish/Subscribe 用于连续流 | `topic` / 5 | 详情、例子 | 多订阅者示例 |
| 二 / 2 Service | Request/Response 对应关系 | `service` / 6 | 详情 | 保留异步客户端 caveat |
| 二 / 2.1 Service 语义 | API 可异步；区别在交互模式 | `service` / 6–7 | 详情、边界 | 加入 Action 的长任务语义 |
| 三 / 1 QoS | 传输策略控制交付行为 | `qos` / 8–9 | 详情 | Reliability / Durability |
| 三 / 1.1 Reliability | Reliable 与 Best Effort | `qos` / 9 | 详情 | 用兼容矩阵口述 |
| 三 / 1.2 Durability | Volatile 与 Transient Local | `qos` / 9 | 详情 | 历史样本受具体配置限制 |
| 三 / 1.3 兼容模型 | Offered 满足 Requested | `qos` / 9 | 核心句 | 不说“两端必须相同” |
| 三 / 2 接口类型 | Topic 用 .msg；Service 用 .srv | `interface` / 10 | 详情、例子 | 自定义 RobotStatus.msg 示例 |
| 三 / 3 名称 | 匹配解析后的名称 | `name` / 11 | 详情 | namespace 与 remapping |
| 四 / 进程与线程 | Process 隔离，Thread 执行 | `process`, `executor` / 18,23 | 讲述、详情 | 为运行时图奠基 |
| 四 / 1.1 一个 Node 一个进程 | 隔离强，大消息跨进程有成本 | `process` / 18 | 详情 | 图像、点云例子概括 |
| 四 / 1.2 Composition | 多 Node 可共进程 | `composition` / 19 | 详情 | Component Container |
| 四 / 1.2.1 进程内通信 | 可减少序列化/复制，不等于自动零拷贝 | `composition` / 20 | 详情、边界 | 记录配置与所有权条件 |
| 四 / 2.1 互斥组 | 同组回调不可并行 | `group` / 21 | 详情 | 默认组亦为互斥 |
| 四 / 2.2 可重入组 | 组内回调可以并发 | `group` / 22 | 详情 | 包括同一回调的多个实例 |
| 四 / 3 Executor | 把 ready 回调交给线程 | `executor` / 23 | 详情、关系线 | 运行时图中心 |
| 四 / 3.1 单线程 | 一条线程执行回调 | `executor` / 24 | 对照讲述 | `rclcpp::spin` 例子 |
| 四 / 3.2 多线程 | 多工作线程仍受 Group 约束 | `executor` / 24 | 详情 | 不等于自动并行 |
| 四 / 4 Wait Set | 阻塞等待，醒来检查 ready | `waitset` / 25 | 详情 | 避免 busy polling |
| 四 / 4 调度顺序 | 积压时不保证全局 FIFO | `waitset` / 26 | 边界说明 | 不把快照示意图当成逐项强制实现 |
| 四 / 5 优先级 | Group 分配到不同 Executor，再结合 OS 调度 | `priority` / 27 | 详情、例子 | SCHED_FIFO 等留给讲稿 |
| 五 / Launch | 描述整个系统部署和配置 | `launch` / 28–29 | 详情、结论 | Node、Container、参数、重映射 |

文章的代码片段、ASCII 图和重复铺垫用于支持对应详情场景与讲稿；不逐字放进总览节点，以维持可读性。原文完整复制在 `content/source.md`，根目录原文件未修改。

## 技术澄清

1. 原文 Service 示例将“移动到这里”写成请求，并用 `success` / `error_code` 表示返回。若指长期移动任务且需要过程反馈或取消，ROS 2 的 **Action** 更合适。演示在 Service 详情中明确限制其适用范围。依据：[ROS 2 官方接口比较](https://docs.ros.org/en/rolling/Concepts/Basic/Interfaces-Topics-Services-Actions.html)。
2. 原文把一次 `wait()` 后的 ready 状态画成依次取 A、B、C 再重新等待的流程。这是教学近似，不应当被理解为所有发行版与执行器都严格执行该固定顺序。演示仅保留“等待就绪、醒来检查、拥塞时无全局 FIFO 保证”的结论。依据：[ROS 2 官方 Executor 文档](https://docs.ros.org/en/rolling/Concepts/Intermediate/About-Executors.html)。
3. 原文自身已经正确指出 Timer 不保证精确 1 ms、Composition 不自动等于零拷贝、MultiThreadedExecutor 不保证回调一定并行。这三处作为边界条件保留。
