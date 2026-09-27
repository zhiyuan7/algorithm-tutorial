# 分镜与点击状态

知识舞台共 25 个场景（24 次点击），加上封面与结尾，带点击导出共 27 个画面。P12、P13 指舞台第 12、13 个场景；原 P15（`before-morph`）已删除。

健全性沿两节点上方从“可证明性”指向“逻辑后承”；完备性沿下方反向连接。讲解哪一个方向，就高亮对应连线。

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
| 11 | 形式与解释 | `correspondence` | subtree | `⊢`、`⊨` | 健全性连线直接从可证明性指向逻辑后承 |
| 12 | 形式与解释 | `correspondence` | subtree | `⊢`、`⊨` | 完备性连线直接从逻辑后承返回可证明性 |
| 13 | 形式与解释 | `logic-root` | all | 图谱 A 全貌 | 两条路径在一阶逻辑中吻合 |
| 14 | morph | mapped groups | all | A 与 B 的映射节点 | 论域和赋值重组为选择依赖 |
| 15 | 选择与依赖 | `quantifiers-root` | node | 图谱 B 根问题 | 一阶量词只直接量化对象 |
| 16 | 选择与依赖 | `quantifiers-root` | node | 图谱 B 根问题 | 全称量词更新赋值并遍历论域 |
| 17 | 选择与依赖 | `quantifiers-root` | node | 图谱 B 根问题 | 存在量词寻找一个见证 |
| 18 | 选择与依赖 | `dependent-choice` | node | 依赖选择 | `y` 可以依赖先选的 `x` |
| 19 | 选择与依赖 | `uniform-choice` | node | 两种量词顺序 | 固定 `y` 必须应付全部 `x` |
| 20 | 选择与依赖 | `uniform-choice` | all | 蕴含边 | 统一选择蕴含逐个选择 |
| 21 | 选择与依赖 | `pointwise-continuity` | node | 分析应用 | 普通连续允许位置相关的 `δ` |
| 22 | 选择与依赖 | `uniform-continuity` | all | 两种连续性 | 一致连续要求通用 `δ` |
| 23 | 选择与依赖 | `x2-counterexample` | node | 逐点分支 | 取 `δ/2` 位移满足距离条件，函数值差仍可失控 |
| 24 | 选择与依赖 | `quantifiers-root` | all | 图谱 B 全貌 | 量词顺序就是依赖关系的语法 |

## 视觉检查关键帧

- Step 0：开场问题与根节点上下文。
- Step 4：公式构造的密集详情状态。
- Step 13：语法与语义全景，检查 11 个节点及连线标签。
- Step 14：morph 起始、中段、结束，检查标签改写与路径连续性。
- Step 20：强弱蕴含边，确认箭头方向为统一到逐个。
- Step 22：一致连续公式详情，检查长公式不溢出。
- Step 24：量词与选择全景与最终空间方向。
