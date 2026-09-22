# 分镜与点击状态

| Step | Active map | Focus | Camera framing | Visible context | Narration goal |
| ---: | --- | --- | --- | --- | --- |
| 0 | 形式与解释 | `logic-root` | node | 根问题 | 语法与语义回答不同问题 |
| 1 | 形式与解释 | `logic-root` | node | 根问题 | 同一公式保留结构却改变意义 |
| 2 | 形式与解释 | `signature` | node | 语法路径 | 符号表先规定角色，不规定现实含义 |
| 3 | 形式与解释 | `term` | node | 符号表、项 | 项指称对象，关系式陈述事实 |
| 4 | 形式与解释 | `formula` | node | 完整语法路径 | 原子公式与递归构造 |
| 5 | 形式与解释 | `syntax` | subtree | 语法分支 | 合法与真假彼此独立 |
| 6 | 形式与解释 | `semantics` | subtree | 语义分支 | 语义由论域、解释、赋值建立 |
| 7 | 形式与解释 | `structure` | node | 语义路径 | 结构不只是论域集合 |
| 8 | 形式与解释 | `satisfaction` | node | 语义路径 | 模型与赋值共同决定满足 |
| 9 | 形式与解释 | `proof` | node | 对应分支 | `⊢` 是符号规则中的可推导性 |
| 10 | 形式与解释 | `consequence` | node | 对应分支 | `⊨` 量化所有满足前提的模型 |
| 11 | 形式与解释 | `correspondence` | node | `⊢`、`⊨` | 健全性从证明走向语义 |
| 12 | 形式与解释 | `correspondence` | node | `⊢`、`⊨` | 完备性从语义后承返回证明 |
| 13 | 形式与解释 | `logic-root` | all | 图谱 A 全貌 | 两条路径在一阶逻辑中吻合 |
| 14 | 形式与解释 | `semantics` | subtree | 论域、赋值、满足 | 为量词视角转换保留语义骨架 |
| 15 | morph | mapped groups | all | A 与 B 的映射节点 | 论域和赋值重组为选择依赖 |
| 16 | 选择与依赖 | `quantifiers-root` | node | 图谱 B 根问题 | 一阶量词只直接量化对象 |
| 17 | 选择与依赖 | `quantifiers-root` | node | 图谱 B 根问题 | 全称量词更新赋值并遍历论域 |
| 18 | 选择与依赖 | `quantifiers-root` | node | 图谱 B 根问题 | 存在量词寻找一个见证 |
| 19 | 选择与依赖 | `dependent-choice` | node | 依赖选择 | `y` 可以依赖先选的 `x` |
| 20 | 选择与依赖 | `uniform-choice` | node | 两种量词顺序 | 固定 `y` 必须应付全部 `x` |
| 21 | 选择与依赖 | `uniform-choice` | subtree | 蕴含边 | 统一选择蕴含逐个选择 |
| 22 | 选择与依赖 | `pointwise-continuity` | node | 分析应用 | 普通连续允许位置相关的 `δ` |
| 23 | 选择与依赖 | `uniform-continuity` | node | 两种连续性 | 一致连续要求通用 `δ` |
| 24 | 选择与依赖 | `x2-counterexample` | node | 逐点分支 | `x²` 的斜率增长破坏一致性 |
| 25 | 选择与依赖 | `quantifiers-root` | all | 图谱 B 全貌 | 量词顺序就是依赖关系的语法 |

## 视觉检查关键帧

- Step 0：开场问题与根节点上下文。
- Step 4：公式构造的密集详情状态。
- Step 13：第一张图全景，检查 11 个节点及连线标签。
- Step 15：morph 起始、中段、结束，检查标签改写与路径连续性。
- Step 21：强弱蕴含边，确认箭头方向为统一到逐个。
- Step 23：一致连续公式详情，检查长公式不溢出。
- Step 25：第二张图全景与最终空间方向。
