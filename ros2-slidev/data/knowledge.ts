import type { KnowledgeMapData } from './types'

export const knowledgeMaps: Record<'communication' | 'execution', KnowledgeMapData> = {
  communication: {
    id: 'communication', title: 'ROS Graph：组织与通信', subtitle: '功能边界 · 回调触发 · 通信契约', layout: 'tree',
    root: {
      id: 'ros-graph', title: 'ROS Graph', subtitle: '逻辑计算图', summary: 'Node 按功能拆分，通信端点把它们连接起来。', accent: '#13254F',
      details: { opening: { eyebrow: '核心问题', statement: '复杂机器人怎样拆分，并让各部分正确协作？', explanation: '从 Node 的功能边界出发，再看 Callback 何时触发、消息如何传递、通信双方怎样匹配。' } },
      children: [
        { id: 'node', title: 'Node', subtitle: '功能边界', summary: '一个 Node 承担一个相对独立的逻辑功能。', accent: '#163F6F', details: {
          responsibility: { eyebrow: '功能划分', statement: '把相机、检测、定位、规划、控制拆成独立计算单元。', explanation: 'Node 是 ROS graph 的参与者，可以与同进程、跨进程或其他机器上的 Node 通信。', example: 'camera_node → detector_node → planner_node → controller_node' },
          process: { eyebrow: '关键边界', statement: 'Node 是逻辑划分；它不等于操作系统进程。', explanation: '一个 Node 可以独占进程，也可与多个 Node 组合进同一进程。跨进程隔离故障，但大型消息传输通常更昂贵。' },
        } },
        { id: 'callback', title: 'Callback', subtitle: '执行入口', summary: '事件或定时器就绪后，函数才成为待执行工作。', accent: '#396D80', details: {
          event: { eyebrow: '事件驱动', statement: '新图像到来，才安排图像处理回调。', explanation: 'Subscription、Service、Action 等实体产生事件。回调不是持续忙等的 while 循环。', example: '新图像 → Subscription Callback → detect(image)' },
          timer: { eyebrow: '时间驱动', statement: 'Timer 到期让控制回调变为 ready。', explanation: '例如设置 1 ms 周期，对应约 1000 Hz 的目标频率；实际执行时刻仍取决于 Executor、线程调度与负载。', footnote: '定时器周期不是硬实时保证。' },
        } },
        { id: 'topic', title: 'Topic', subtitle: 'Publish / Subscribe', summary: '连续数据流；发布者不等待特定订阅者答复。', accent: '#74A0BA', details: {
          stream: { eyebrow: '连续数据流', statement: '发布者写入 Topic，多个订阅者可以各取所需。', explanation: '相机、雷达、IMU、状态等适合异步发布订阅。消息到达后由 Subscription Callback 处理。', example: '/camera/image → detector 与 recorder' },
        } },
        { id: 'service', title: 'Service', subtitle: 'Request / Response', summary: '一次请求对应一次结果；客户端调用本身可异步。', accent: '#624F6B', details: {
          request: { eyebrow: '明确的请求与结果', statement: 'Client 发请求，Server 返回对应的 Response。', explanation: '适合短时间完成的查询或操作，例如重置里程计、获取一次计算结果。async_send_request 表明客户端无需阻塞等待。', footnote: '长时间执行且需要反馈、取消的移动目标，宜使用 Action。' },
          contrast: { eyebrow: '三种通信语义', statement: 'Topic 是数据流；Service 是短请求；Action 是长任务。', explanation: 'Action 在 Goal 与 Result 之间还能提供 Feedback，并支持取消。选择接口时先判断交互的时间尺度与反馈需求。' },
        } },
        { id: 'matching', title: '通信匹配', subtitle: '通信契约', summary: '最终名称、接口类型和兼容 QoS 一起决定端点能否通信。', accent: '#B5855F', details: {
          contract: { eyebrow: '端点契约', statement: '同名仍可能无法通信；还要检查类型与 QoS。', explanation: '对 Topic：最终解析的名称一致、消息类型一致、QoS 可兼容。Service 至少需要名称与服务类型对应。' },
        }, children: [
          { id: 'qos', title: 'QoS', subtitle: 'Request / Offered', summary: '发送方提供的服务应满足接收方请求。', accent: '#B5855F', details: {
            policy: { eyebrow: '可靠性与持久性', statement: 'QoS 要兼容，而不要求两端逐项完全相同。', explanation: 'Reliable 发布者可满足 Best Effort 订阅者；反向不行。Transient Local 可让后加入者在条件允许时取得历史样本。', formula: 'Offered QoS satisfies Requested QoS' },
          } },
          { id: 'interface', title: '接口类型', subtitle: '.msg / .srv', summary: 'Topic 用同一消息类型，Service 用同一服务类型。', accent: '#7D8981', details: {
            schema: { eyebrow: '数据契约', statement: '名称相同但接口类型不同，也无法正确连接。', explanation: 'Topic 如 sensor_msgs/msg/Image；Service 如 std_srvs/srv/Empty。业务字段不足时可自定义 .msg 或 .srv。', example: 'RobotStatus.msg：robot_id、battery_voltage、is_charging' },
          } },
          { id: 'name', title: '名称', subtitle: 'Resolved Name', summary: '匹配的是命名空间与重映射处理后的最终名称。', accent: '#7D665C', details: {
            resolution: { eyebrow: '解析后的端点', statement: '源码里的字符串不一定就是最终通信名称。', explanation: '相对名称会受 namespace 与 remapping 影响；/camera/image 与 /front_camera/image 是不同端点。' },
          } },
        ] },
      ],
    },
    relations: [
      { id: 'r-node-callback', source: 'node', target: 'callback', label: '创建回调实体', type: 'supports' },
      { id: 'r-topic-callback', source: 'topic', target: 'callback', label: '消息触发', type: 'flow' },
      { id: 'r-matching-topic', source: 'matching', target: 'topic', label: '约束连接', type: 'limits' },
    ],
  },
  execution: {
    id: 'execution', title: '运行时：执行与部署', subtitle: '进程边界 · 并发约束 · 调度与启动', layout: 'tree',
    root: {
      id: 'runtime', title: 'ROS 2 运行时', subtitle: '从 ready 到 CPU', summary: 'Process 容纳 Node；Group 约束并发；Executor 用线程执行 ready Callback；Launch 描述部署。', accent: '#13254F',
      details: { opening: { eyebrow: '第二个问题', statement: '回调已经 ready，究竟是谁让它运行？', explanation: '观察视角从逻辑连接切换到进程、线程与启动配置。' } },
      children: [
        { id: 'process', title: 'Process', subtitle: '隔离边界', summary: '独立地址空间带来故障隔离，也有跨进程通信成本。', accent: '#163F6F', details: {
          isolation: { eyebrow: '部署选择', statement: '一个 Node 一个进程，通常隔离更强。', explanation: '不同进程有独立虚拟地址空间；某个节点崩溃通常不会直接破坏其他进程内存。跨进程传输图像、点云等大消息可能增加开销。' },
        } },
        { id: 'composition', title: '组件组合', subtitle: 'Composition', summary: '多个逻辑独立的 Node 可部署在同一进程。', accent: '#396D80', details: {
          container: { eyebrow: '同进程组合', statement: 'Component 让多个 Node 共享一个进程。', explanation: '相机、检测、跟踪可加载到同一个 Container；仍保留 Node 的逻辑边界，并改变故障隔离与数据传递的权衡。' },
          ipc: { eyebrow: '进程内通信', statement: '同进程提供优化条件；是否零拷贝取决于配置与所有权。', explanation: 'Intra-process Communication 可避免序列化并减少复制；效果取决于 use_intra_process_comms、消息所有权、订阅者数量等条件。', footnote: 'Composition 本身不等于零拷贝。' },
        } },
        { id: 'group', title: '回调组', subtitle: 'Callback Group', summary: '互斥组禁止组内并行；可重入组允许。', accent: '#624F6B', details: {
          exclusive: { eyebrow: 'Mutually Exclusive', statement: '同一互斥组中，一次最多运行一个 Callback。', explanation: '可用来保护共同修改的状态。默认 Callback Group 也是互斥的，因此仅换成 MultiThreadedExecutor 未必出现并行。' },
          reentrant: { eyebrow: 'Reentrant', statement: '可重入组允许组内 Callback 并发。', explanation: '同一个 Callback 的多个实例也可能同时运行。真正并行还需要多个 ready 工作、可用线程与适当的组分配。' },
        } },
        { id: 'executor', title: 'Executor', subtitle: 'ready → thread', summary: '发现可执行实体，按回调组约束交给线程运行。', accent: '#B5855F', details: {
          dispatch: { eyebrow: '调度核心', statement: 'Callback 不会自行获得 CPU；Executor 调用它。', explanation: 'SingleThreadedExecutor 只有一个执行线程；MultiThreadedExecutor 使用多个线程，仍受 Callback Group 约束。' },
          comparison: { eyebrow: '单线程与多线程', statement: '线程数、Group 约束、ready 工作共同决定并发。', explanation: 'rclcpp::spin(node) 可理解为使用单线程执行器；多线程执行器并不自动保证所有回调同时运行。', formula: '并发 ≈ ready 工作 × 可用线程 × Group 许可' },
        }, children: [
          { id: 'waitset', title: 'Wait Set', subtitle: '阻塞等待', summary: '等待实体 ready；唤醒后检查并取出可执行工作。', accent: '#74A0BA', details: {
            wake: { eyebrow: '避免忙等', statement: '没有事件就等待；有事件才醒来检查 ready 实体。', explanation: 'Subscription、Timer、Service 等加入 Wait Set。Executor 通过底层等待机制获知就绪状态，而非无休止地空转检查。' },
            scheduling: { eyebrow: '拥塞时的顺序', statement: '就绪标志并不提供全局消息到达顺序。', explanation: '积压时经典 Executor 的处理更接近轮转，而不是跨所有 Topic 的严格 FIFO；具体行为受实现与版本影响。', footnote: 'Wait Set 表示就绪状态，不提供每个队列的完整长度。' },
          } },
          { id: 'priority', title: '优先级', subtitle: 'OS Scheduler', summary: '不同 Group 可交给不同 Executor，再设置线程调度策略。', accent: '#7D8981', details: {
            assign: { eyebrow: '控制优先', statement: '将控制与感知回调组分配给不同 Executor。', explanation: '再结合操作系统线程优先级与 CPU affinity，可让控制环获得更明确的调度待遇。一个 Group 同时只能关联一个 Executor。', example: 'Control Group → Executor A → 高优先级线程' },
          } },
        ] },
        { id: 'launch', title: 'Launch', subtitle: '系统部署描述', summary: '一次启动多个 Node 与组件，并配置参数、命名空间和重映射。', accent: '#7D665C', details: {
          system: { eyebrow: '从图到系统', statement: 'Launch 描述整个机器人怎样启动和配置。', explanation: 'Launch File 可以创建 Node、Component Container，设置参数、namespace、remapping 与环境。', example: 'ros2 launch my_package robot.launch.py' },
          synthesis: { eyebrow: '完整链条', statement: '逻辑边界、通信契约、调度约束与部署配置共同决定系统行为。', explanation: '修改 Launch 中的进程组合或参数时，ROS Graph 的逻辑结构可保持，故障隔离、延迟与回调执行方式却会改变。' },
        } },
      ],
    },
    relations: [
      { id: 'r-process-composition', source: 'process', target: 'composition', label: '隔离与效率权衡', type: 'limits' },
      { id: 'r-group-executor', source: 'group', target: 'executor', label: '约束并行', type: 'supports' },
    ],
  },
}
