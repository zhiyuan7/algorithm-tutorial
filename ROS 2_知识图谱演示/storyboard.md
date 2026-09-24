# 分镜与镜头路径

主舞台是一张持续存在的 Slidev 页面。`$clicks` 从 0 到 30，每次前进只完成一个明确的概念或镜头节拍；封面与收尾各为独立页面。地图节点即使讲解完也保留为简短空间坐标。

| 步 | 活跃图谱 | 焦点 | 镜头 framing | 可见上下文 | 讲述目标 |
|---:|---|---|---|---|---|
| 0 | 通信图 | ROS Graph | node + detail | 根节点 | 提出拆分与协作问题 |
| 1 | 通信图 | Node | node + detail | 根与 Node | 说明功能边界 |
| 2 | 通信图 | Node | node + detail | 根与 Node | 区分 Node 与 Process |
| 3 | 通信图 | Callback | node + detail | Node、Callback | 新事件使回调 ready |
| 4 | 通信图 | Callback | node + detail | Node、Callback | Timer 周期不是实时保证 |
| 5 | 通信图 | Topic | node + detail | Node、Callback、Topic | 连续数据流触发订阅回调 |
| 6 | 通信图 | Service | node + detail | Topic、Service | 请求与结果对应 |
| 7 | 通信图 | Service | node + detail | Topic、Service | 区分 Topic、Service、Action |
| 8 | 通信图 | 通信匹配 | node + detail | Topic、Service、契约 | 三项匹配条件 |
| 9 | 通信图 | QoS | node + detail | 契约、QoS | Offered 满足 Requested |
| 10 | 通信图 | 接口类型 | node + detail | 契约、QoS、类型 | `.msg` 与 `.srv` |
| 11 | 通信图 | 名称 | node + detail | 契约三项 | 最终解析名称 |
| 12 | 通信图 | 通信匹配 | all + concept | 第一张图全部节点 | 收缩详情，回看契约 |
| 13 | 通信图 | ROS Graph | all + overview | 第一张图全部节点和边 | 装配完整逻辑图 |
| 14 | 过渡 | 四个源锚点 | all | Node、Callback、接口、匹配 | 保留源图概念 |
| 15 | 过渡 | 映射中的卡片 | all | 同一 DOM 卡片移动 | 改变观察尺度 |
| 16 | 过渡 | 四个目标锚点 | all | 目标标签和横向关系 | 显露运行时问题 |
| 17 | 执行图 | 运行时根节点 | node + detail | 根节点 | 问谁给 ready Callback CPU |
| 18 | 执行图 | Process | node + detail | 根与 Process | 隔离与通信成本 |
| 19 | 执行图 | Composition | node + detail | Process、Composition | 多 Node 同进程 |
| 20 | 执行图 | Composition | node + detail | Process、Composition | 同进程不自动零拷贝 |
| 21 | 执行图 | 回调组 | node + detail | Composition、Group | 互斥约束 |
| 22 | 执行图 | 回调组 | node + detail | Composition、Group | 可重入许可 |
| 23 | 执行图 | Executor | node + detail | Group、Executor | 谁调度回调 |
| 24 | 执行图 | Executor | node + detail | Group、Executor | 单线程与多线程的条件 |
| 25 | 执行图 | Wait Set | node + detail | Executor、Wait Set | 阻塞等待与醒来检查 |
| 26 | 执行图 | Wait Set | node + detail | Executor、Wait Set | 拥塞时不保证全局 FIFO |
| 27 | 执行图 | 优先级 | node + detail | Group、Executor、Wait Set | Group 到 Executor 到 OS 调度 |
| 28 | 执行图 | Launch | node + detail | 部署相关节点 | 描述整套系统的启动 |
| 29 | 执行图 | Launch | node + detail | 第二张图全部节点 | 合成逻辑与运行配置 |
| 30 | 执行图 | 运行时根节点 | all + overview | 第二张图全部节点和边 | 收束运行时全图 |

## 视觉检查帧

- 封面及 0：中文标题、右侧留白、背景与纸面反差。
- 9、11：最深层节点与详情面板是否同时可读。
- 13：通信图全景节点与连线标签。
- 14、15、16：过渡起点、中点、终点，映射是否清楚。
- 20、26：技术边界详情是否溢出面板。
- 30 与结束页：运行时全图和最终两句结论。
