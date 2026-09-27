# 《集合论》分镜

封面、持续存在的 `KnowledgeStage`、结尾；核心部分为 34 个场景，33 次点击。
三份知识地图彼此独立，两次过渡衔接不同主题。

删除原 P8 后，原 P9–P16 顺次前移；英文引言页位于 P16。多元组新增为 P19，原 P19 起顺延一页。

| 页 | 场景 | 当前节点 | 镜头 | 讲解重点 |
| ---: | --- | --- | --- | --- |
| 01 | `opening` | `existence-root` | node | 任意性质都能形成集合吗？ |
| 02 | `naive-detail` | `naive` | node | 从性质直接跳到存在 |
| 03 | `russell-detail` | `russell` | node | 自指让成员关系同时成立又不成立 |
| 04 | `universal-detail` | `universal` | node | “所有集合”本身不能是一个集合 |
| 05 | `zfc-overview` | `zfc` | subtree | 集合的存在需要公理依据 |
| 06 | `extensionality-detail` | `extensionality` | node | 集合由它有哪些元素决定 |
| 07 | `separation-detail` | `separation` | node | 只允许在既有集合内部筛选 |
| 08 | `existence-overview` | `existence-root` | all | 悖论把直觉改造成明确规则 |
| 09 | `morph-foundation-construction` | `—` | all | 怎样用集合表达数学结构 |
| 10 | `construction-opening` | `construction-root` | node | 无序集合如何长出数学结构？ |
| 11 | `pair-detail` | `ordered-pair` | node | 用无序集合保存第一与第二位置 |
| 12 | `relation-detail` | `relation` | node | 关系只是笛卡尔积的一个子集 |
| 13 | `relation-function` | `relation` | node | 每个输入都恰好有一个输出 |
| 14 | `equivalence-detail` | `equivalence` | node | 关系把集合切成互不重叠的类 |
| 15 | `order-detail` | `order` | node | 偏序、全序、良序逐层加强 |
| 16 | `choice-quotation` | `order` | node | 三种说法，三种直觉 |
| 17 | `naturals-detail` | `naturals` | node | 从空集与后继长出自然数 |
| 18 | `naturals-induction` | `naturals` | node | 归纳原则覆盖整个 $\mathbb N$ |
| 19 | `tuples-detail` | `tuples` | node | 用函数记录各个位置的值 |
| 20 | `recursion-detail` | `recursion` | node | 加法与乘法也需要被定义 |
| 21 | `integers-detail` | `integers` | node | 用有序对的等价类构造整数 |
| 22 | `rationals-detail` | `rationals` | node | 同一个比值的不同表示归为一类 |
| 23 | `reals-detail` | `reals` | node | 用有理数集合填补有理数轴的空隙 |
| 24 | `completeness-detail` | `reals` | node | 确界、收敛、紧致与 Cauchy 的联系 |
| 25 | `extensions-detail` | `extensions` | node | 获得新能力，也失去旧性质 |
| 26 | `construction-overview` | `construction-root` | all | 集合成为编码数学结构的通用材料 |
| 27 | `morph-construction-infinity` | `—` | all | 从“怎样构造”转向“到底多大” |
| 28 | `infinity-opening` | `infinity-root` | node | 无法数完时，怎样比较大小？ |
| 29 | `bijection-detail` | `bijection` | node | 用一一对应代替逐个数完 |
| 30 | `countable-detail` | `countable` | node | 整数怎样编号，可数并怎样枚举？ |
| 31 | `diagonal-detail` | `diagonal` | node | 对角线构造永远逃出列表 |
| 32 | `cantor-detail` | `cantor` | node | 幂集总能制造更大的无限 |
| 33 | `ch-detail` | `ch` | node | $\aleph_0$ 与连续统之间还有第三种基数吗？ |
| 34 | `independence-detail` | `independence` | all | 若 ZFC 一致，它就无法决定连续统假设 |

所有数学内容由 `MathText.vue` 渲染；公式数据用 LaTeX，正文内数学用 `$…$`。
P3 的朴素概括与罗素悖论只保留一条关系线；P5 只显示公理化分支起点。
P14 明确等价关系与划分的定义；P15 用实数集自身说明通常次序不是良序。
P16 引用 Jerry Bona 的英文原句，附署名、来源及三个原则在 ZF 中等价的说明。
P19 用自然数位置集与函数定义多元组。P23 给出戴德金分割的全部条件；P30 写出整数双射与可数并的对角枚举，包括空集和重复项的处理。

视觉检查覆盖全部场景、封面、结尾，重点包括 P3、P5、P8–P9、P14–P16、P19、P23、P26–P27、P30、P34。
