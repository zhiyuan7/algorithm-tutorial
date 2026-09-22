# 《可计算理论》电影式演示分镜

## 演示结构

- 封面：1 张。
- 持续 KnowledgeStage：1 张 Slidev slide，28 个 click scene（0–27）。
- 结尾：1 张。
- 三张独立图谱：可计算性、复杂度、图灵完备。
- 两段显式 morph：A→B、B→C。

## 分镜表

| Step | Active map | Focus | Camera framing | Visible context | Narration goal |
| ---: | --- | --- | --- | --- | --- |
| 0 | computability | computability-root | node | 根问题 | 建立“算法承诺什么” |
| 1 | computability | recognizable | subtree | Recognizable 分支 | YES 可识别，NO 可等待 |
| 2 | computability | decidable | node | 祖先路径 | YES/NO 都保证停机 |
| 3 | computability | recognizable | all | 全包含结构 | `Decidable ⊊ Recognizable` |
| 4 | computability | atm | node | Recognizable 与 `A_TM` | 通过模拟识别接受 |
| 5 | computability | atm | node | 同上 | 区分 `A_TM` 与 `HALT_TM` |
| 6 | computability | diagonal | node | `A_TM` 证明分支 | 反设判定器 H |
| 7 | computability | diagonal | node | 同上 | 构造反转预测的 D |
| 8 | computability | diagonal | node | 同上 | 自指得到矛盾 |
| 9 | computability | computability-root | all | 图谱 A 全貌 | 形成可计算性边界 |
| 10 | computability | decidable | all | 图谱 A 全貌 | 将 Decidable 作为复杂度入口 |
| 11 | morph-a-b | decidable | all | A→B 映射 | “是否结束”转为“要多久” |
| 12 | complexity | complexity-root | node | 复杂度根问题 | 资源增长而非秒表数字 |
| 13 | complexity | p | node | P 与祖先 | 固定次幂的多项式时间 |
| 14 | complexity | p | node | 同上 | 最大值线性扫描 |
| 15 | complexity | exponential | node | SAT 暴力分支 | 指数很慢但有限 |
| 16 | complexity | np | subtree | NP 分支 | certificate 与验证器 |
| 17 | complexity | sat | node | NP、SAT | 布尔赋值作为证据 |
| 18 | complexity | p | all | P、NP、Decidable | 快速求解必然可快速验证 |
| 19 | complexity | open-question | node | P 与 NP | `P = NP?` 仍未知 |
| 20 | complexity | decidable | all | 图谱 B 全貌 | `P ⊆ NP ⊆ Decidable` |
| 21 | complexity | complexity-root | all | 图谱 B 全貌 | 从问题分类转向机器能力 |
| 22 | morph-b-c | turing-complete | all | B→C 映射 | 资源类别折叠为计算系统 |
| 23 | universality | turing-complete | subtree | 图谱 C 主干 | 模拟任意图灵机 |
| 24 | universality | resources | subtree | 资源与三个构件 | 通用计算的直观构件 |
| 25 | universality | factorial | node | 资源分支 | `n!` 解释无固定上限 |
| 26 | universality | boundary | node | 能力与边界 | 图灵完备不越过不可计算性 |
| 27 | universality | universality-root | all | 图谱 C 全貌 | 能力、代价、边界综合 |

## 视觉审计关键状态

- 封面：标题与右侧圆环不可重叠。
- Step 3：Decidable、Recognizable 的包含关系及边标签可读。
- Step 8：对角线证明详情卡不溢出。
- Step 9：图谱 A overview 无节点重叠。
- Step 11：A→B morph 的来源、问题重写与目标结构均清楚。
- Step 17：SAT 详情卡、公式和周边节点同时可辨。
- Step 20：图谱 B 全貌能读出 `P ⊆ NP ⊆ Decidable`。
- Step 22：B→C morph 保留“可计算任务”与“资源刻度”的语义。
- Step 25：阶乘详情卡无裁切。
- Step 27：最终 overview 与结尾页保持总纲配色一致。
