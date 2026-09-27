# 《线性代数》演示分镜

## 演示结构

封面、持续存在的知识世界、结尾各占一张 Slidev slide。知识世界包含 36 个镜头状态（step 0–35），进度条中的页码按镜头计数。三组概念图数据保持独立，通过两次语义过渡连接。

## 逐镜叙述

| 页码 | Step | 场景 ID | 聚焦 | 取景 | 本页要讲清楚 |
| ---: | ---: | --- | --- | --- | --- |
| 1 | 00 | `opening` | linear-language-root | node / detail | 坐标会改变，什么仍然保持？ |
| 2 | 01 | `algebra-structure` | algebra | node / detail | 不问对象由什么做成，先问它满足什么规律 |
| 3 | 02 | `space-axioms` | vector-space | node / detail | 加法与数乘定义了内部结构 |
| 4 | 03 | `space-subspace` | vector-space | node / detail | 相加和数乘后还留在其中，就是子空间 |
| 5 | 04 | `basis-span` | basis-system | node / detail | 所有线性组合能够到达哪里 |
| 6 | 05 | `basis-independence` | basis-system | node / detail | 这些向量里，有没有多余的成员 |
| 7 | 06 | `basis-dimension` | basis-system | node / detail | 一组基既能生成全部向量，又没有冗余 |
| 8 | 07 | `coordinates-meaning` | coordinates | node / detail | 向量不是那串数字，数字只是所选基下的编码 |
| 9 | 08 | `space-functions` | vector-space | node / detail | 选定基后，向量也能看作一份函数取值表 |
| 10 | 09 | `map-definition` | linear-map | node / detail | 知道基向量去了哪里，就知道整个映射 |
| 11 | 10 | `matrix-columns` | matrix-representation | node / detail | 把基向量的像写成坐标，排成矩阵的列 |
| 12 | 11 | `matrix-multiply` | matrix-representation | node / detail | 用输入坐标组合矩阵的列，就得到输出坐标 |
| 13 | 12 | `matrix-data` | matrix-representation | node / detail | 矩阵也可以直接组织方程、图像与关系 |
| 14 | 13 | `language-overview` | linear-language-root | all / overview | 基是抽象结构通往坐标计算的桥 |
| 15 | 14 | `representation-morph` | 视角过渡 | all / overview | 同一矩阵，两种几何读法 |
| 16 | 15 | `active-motion` | active-transform | node / detail | 坐标系不动，向量按线性规则运动 |
| 17 | 16 | `passive-duality` | passive-basis | subtree / detail | 向量不动，观察它的坐标系在变 |
| 18 | 17 | `composition-product` | composition | node / detail | 把两次映射合起来，就得到矩阵乘法 |
| 19 | 18 | `similarity-change` | similarity | node / detail | 相似矩阵是同一变换的不同观察窗口 |
| 20 | 19 | `orthogonal-geometry` | orthogonal | node / detail | 保持内积，就同时保持长度、夹角与距离 |
| 21 | 20 | `matrix-space-vector` | matrix-space | node / detail | 矩阵本身也组成一个向量空间 |
| 22 | 21 | `rank-image` | rank | node / detail | 线性映射可能让独立方向减少 |
| 23 | 22 | `rank-maps` | rank | node / detail | 零空间只有零，才不会把不同输入混在一起 |
| 24 | 23 | `rank-dimension` | rank | node / detail | 用张成空间的维数，数出保留的独立方向 |
| 25 | 24 | `svd-decomposition` | svd | node / detail | 秩数方向，奇异值看每个方向的强弱 |
| 26 | 25 | `svd-approximation` | svd | node / detail | 留下较强的方向，用奇异值量化舍弃的代价 |
| 27 | 26 | `matrix-overview` | matrix-perspectives-root | all / overview | 矩阵同时记录作用、观察框架与映射能力 |
| 28 | 27 | `before-invariant-morph` | matrix-perspectives-root | all / concept | 从“矩阵如何作用”转向“变换保留什么” |
| 29 | 28 | `invariant-morph` | 视角过渡 | all / overview | 映射能力重组为体积、方向与能量 |
| 30 | 29 | `determinant-volume` | determinant | node / detail | 一个数，压缩了整个变换的体积效应 |
| 31 | 30 | `eigen-direction` | eigenstructure | node / detail | 在所有改变中，找到方向不变的子空间 |
| 32 | 31 | `spectral-diagonalize` | spectral-theorem | node / detail | 对称性保证一组正交特征基 |
| 33 | 32 | `quadratic-energy` | quadratic-form | node / detail | 把向量方向汇总成一个标量能量 |
| 34 | 33 | `symmetric-vanish` | symmetric-part | node / detail | 二次型只看矩阵的对称部分 |
| 35 | 34 | `positive-eigenvalues` | positive-definite | node / detail | 特征值符号决定每个方向的能量正负 |
| 36 | 35 | `invariant-overview` | invariant-geometry-root | all / overview | 结构、表示与不变几何，构成一种统一语言 |

## 本次修改与原页码对应

| 原页码 | 当前页码 | 修改内容 |
| ---: | --- | --- |
| 2 | 2 | 已补群、环、域定义；“循环域”的含义待用户确认 |
| 10 | 11–12 | 用两页推导基的像、输出坐标与矩阵乘向量 |
| 11 | 13 | 修复与右侧面板的遮挡 |
| 13 | 已删除 | 删除这一过渡镜头 |
| 15 | 16 | 主动变换初次出现时只展示当前概念 |
| 17 | 18 | 复合与迹改为主动变换的并列分支 |
| 20 | 21 | 修复与右侧面板的遮挡 |
| 21 | 22 | 先讲相关关系与信息方向的减少 |
| 22 | 23–24 | 先讲单射与零空间，再独立引出秩及行列秩相等 |
| 23 | 25–26 | 从秩进入奇异值强弱，增加低秩近似和误差 |
| 30 | 33 | 修复二次型镜头遮挡 |
| 32 | 35 | 修复正定性镜头遮挡 |

另外，在原第 8 页与第 9 页之间新增了“向量与函数”（现第 9 页）：坐标向量是有限指标集上的函数，选定基后，抽象有限维空间与该函数空间同构。

## 视觉验收

运行 `pnpm run typecheck` 与 `pnpm run build`；对全部 36 个镜头及封面、结尾生成 PNG。检查面板内容和公式边界、可见节点与面板/页眉/页脚的重叠；另查看两次过渡的开始、中间与结束，以及最终整图取景。截图与几何检查报告保存在 `output/visual-qa/`。

## 分支放大取景

参考集合论的呈现方式，详情页只显示当前知识点、祖先路径和必要的关联节点。已讲过的其他分支暂时收起；所有节点仍保存在同一知识世界，整图回顾时恢复。

- 坐标页保留基节点，向量与函数页保留基和坐标。
- 矩阵表示与乘向量页保留坐标节点，收起左侧代数与基分支。
- 单射与秩只展示映射能力路径；SVD 额外保留秩作为关联节点。
- 二次型及正定性只展示能量分支，收起体积与特征分支。
- 每条可见连线的两端节点都必须可见，镜头也只拟合这组节点。

此次验收截图与边界检查报告保存在 `output/branch-visual-qa/`。
