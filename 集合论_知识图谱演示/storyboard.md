# 《集合论》电影式知识图谱分镜

## 演示结构

- 封面：1 张。
- 核心 `KnowledgeStage`：1 张持续存在的 Slidev 页面，33 个点击状态（`0–32`）。
- 结尾：1 张。
- 三张知识图谱彼此独立，两次 morph 仅承担概念重组。

## 分镜表

| Step | Active map | Focus | Camera framing | Visible context | Narration goal |
| ---: | --- | --- | --- | --- | --- |
| 00 | 存在的边界 | `existence-root` | node | 根问题 | 任意性质都能形成集合吗 |
| 01 | 存在的边界 | `naive` | node | 根 + 朴素概括 | 直觉为何诱人 |
| 02 | 存在的边界 | `russell` | node | 危机路径 | 自指导出双向矛盾 |
| 03 | 存在的边界 | `universal` | node | 危机路径 | “全体集合”也不能成为集合 |
| 04 | 存在的边界 | `zfc` | subtree | 公理分支 | ZF/ZFC 把存在变成受控许可 |
| 05 | 存在的边界 | `extensionality` | node | ZFC + 同一性 | 集合由元素决定 |
| 06 | 存在的边界 | `separation` | node | ZFC + 筛选 | 从任意概括退到集合内筛选 |
| 07 | 存在的边界 | `constructors` | node | ZFC + 构造 | 公理如何提供新集合 |
| 08 | 存在的边界 | `existence-root` | all | 完整图 A | 危机被转化为明确规则 |
| 09 | Morph A→B | 映射组 | all | A 的三类公理能力 | 存在规则重组为构造材料 |
| 10 | 结构的生长 | `construction-root` | node | 构造根 | 无序集合如何长出数学结构 |
| 11 | 结构的生长 | `ordered-pair` | node | 根 + 有序对 | Kuratowski 编码顺序 |
| 12 | 结构的生长 | `relation` | node | 结构起点 | 关系是笛卡尔积的子集 |
| 13 | 结构的生长 | `relation` | node | 同上 | 函数是满足唯一性的关系 |
| 14 | 结构的生长 | `equivalence` | node | 关系分支 | 等价关系与划分互相生成 |
| 15 | 结构的生长 | `order` | node | 关系分支 | 偏序、全序、良序层层加强 |
| 16 | 结构的生长 | `naturals` | node | 自然数分支 | 空集与后继构造自然数 |
| 17 | 结构的生长 | `naturals` | node | 同上 | Peano 结构与归纳原则 |
| 18 | 结构的生长 | `recursion` | node | 自然数 + 递归 | 加法乘法由递归定义 |
| 19 | 结构的生长 | `integers` | node | 数系链 | 等价类构造整数 |
| 20 | 结构的生长 | `rationals` | node | 数系链 | 再次用等价类构造有理数 |
| 21 | 结构的生长 | `reals` | node | 数系链 | Dedekind 分割填补有理数空隙 |
| 22 | 结构的生长 | `reals` | node | 同上 | 完备性的多种面向与限制 |
| 23 | 结构的生长 | `extensions` | node | 完整数系链 | 扩张能力同时丢失代数性质 |
| 24 | 结构的生长 | `construction-root` | all | 完整图 B | 集合成为数学对象的构造语言 |
| 25 | Morph B→C | 映射组 | all | 可数链、实数、函数、幂集 | 构造对象转为大小比较对象 |
| 26 | 无限的阶梯 | `infinity-root` | node | 根问题 | 无限集合怎样比较大小 |
| 27 | 无限的阶梯 | `bijection` | node | 比较工具 | 双射取代逐个数完 |
| 28 | 无限的阶梯 | `countable` | node | N/Z/Q | 不同外观仍可同基数 |
| 29 | 无限的阶梯 | `diagonal` | node | 可数/不可数分界 | 构造永远漏掉的新实数 |
| 30 | 无限的阶梯 | `cantor` | node | 幂集阶梯 | 任意集合都有更大的幂集 |
| 31 | 无限的阶梯 | `ch` | node | Cantor 阶梯 + CH | 询问 ℵ₀ 与连续统之间是否存在中间基数 |
| 32 | 无限的阶梯 | `independence` | all | CH + Gödel + Cohen | ZFC 无法决定连续统假设，边界回到公理本身 |

## Morph A→B 映射节奏

1. 保持“外延、分离、构造公理”三个节点，其他危机节点退场。
2. `extensionality` 移向“编码可验证”；`separation` 移向“关系/等价类”；`constructors` 移向“自然数/数系”。
3. 目标标签在节点接近目标位置时改写。
4. 目标图的依赖边最后出现，下一状态进入独立的构造图。

## Morph B→C 映射节奏

1. 完整数系链短暂停留。
2. `ordered-pair + relation` 聚合为“双射”；`N/Z/Q` 聚合为“可数”；`R` 移向“不可数”；幂集能力显影为“更大无限”。
3. 原构造边先退场，比较箭头后出现。
4. 下一状态只渲染无限图数据。

## 视觉验收关键状态

- 封面与 Step 00。
- Step 02（罗素公式密集详情）。
- Step 08（第一图总览）。
- Step 09 的动画开始、中段、结束。
- Step 16 与 Step 21（自然数、实数详情）。
- Step 24（第二图总览）。
- Step 25 的动画开始、中段、结束。
- Step 29（对角线详情）。
- Step 31（CH 问题）、Step 32（最终总览/独立性结论）与结尾。
