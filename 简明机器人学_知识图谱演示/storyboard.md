# 《简明机器人学》分镜

封面之后的主舞台持续存在。下表的 Step 从 `$clicks = 0` 开始；每次推进只有一个主要概念或镜头变化。

| Step | Active map | Focus | Camera framing | Visible context | Narration goal |
|---:|---|---|---|---|---|
| 0 | 表示 | 中心 | node + detail | 根节点 | 提出如何无歧义描述运动 |
| 1 | 表示 | 坐标语义 | node + detail | 根、坐标 | 位置的对象和表达基 |
| 2 | 表示 | 坐标语义 | node + detail | 同上 | 速度多了相对参考系 |
| 3 | 表示 | 坐标语义 | node + detail | 同上 | 转动参考系的运输定理 |
| 4 | 表示 | 坐标语义 | subtree | 同上 | 将三层信息收成地图锚点 |
| 5 | 表示 | SO(3) | node + detail | 根、坐标、旋转 | 正交性与行列式 |
| 6 | 表示 | SO(3) | node + detail | 同上 | 矩阵列描述姿态 |
| 7 | 表示 | SO(3) | node + detail | 同上 | 同一向量的被动换系 |
| 8 | 表示 | SO(3) | node + detail | 同上 | 向量主动旋转 |
| 9 | 表示 | SO(3) | node + detail | 同上 | 左右乘及共轭 |
| 10 | 表示 | SE(3) | node + detail | 加入 SE(3) | 旋转与平移合为齐次变换 |
| 11 | 表示 | SE(3) | node + detail | 同上 | 位姿、换系、算子三用途 |
| 12 | 表示 | 紧凑表示 | node + detail | 四节点 | 轴角与指数坐标 |
| 13 | 表示 | 紧凑表示 | node + detail | 四节点 | Rodrigues 闭式 |
| 14 | 表示 | 紧凑表示 | node + detail | 四节点 | 螺旋运动与 `se(3)` |
| 15 | 表示 | 紧凑表示 | node + detail | 四节点 | 欧拉角的轴序歧义 |
| 16 | 表示 | 中心 | all | 全部节点和关系 | 一览表示工具的推导关系 |
| 17 | 表示 | 中心 | all | 全图 | 从表示问题转向求解问题 |
| 18 | Morph | 映射 | all | 四源概念向三目标汇合 | 明确每个工具怎样进入正运动学 |
| 19 | 求解 | 中心 | all | 根与三分支 | 展示两种方法的共同目标 |
| 20 | 求解 | 中心 | node + detail | 根与三分支 | 定义 `q → T` |
| 21 | 求解 | DH | node + detail | 根、DH、目标 | 相邻换系链 |
| 22 | 求解 | DH | node + detail | 同上 | 紧凑性与坐标系布置成本 |
| 23 | 求解 | PoE | node + detail | 根、两法、目标 | 统一空间系的指数积 |
| 24 | 求解 | PoE | node + detail | 同上 | `M` 与螺旋轴 `S_i` 的含义 |
| 25 | 求解 | 末端位姿 | node + detail | 全图 | 两种路径都求 `SE(3)` 位姿 |
| 26 | 求解 | 中心 | all | 完整求解图 | 最终综合 |

## Morph 对应

| Source node/group | Transition action | Target node/group | Meaning preserved |
|---|---|---|---|
| 坐标语义 | 移向左侧方法 | DH 局部坐标链 | 每个变换必须说明参照系 |
| `SO(3)` | 移向上方公共节点 | 两法共有的“关节旋转” | 关节变化包含旋转 |
| `SE(3)` | 移向末端 | `T₀ₙ` | 位姿是计算结果 |
| 螺旋 / 指数 | 移向右侧方法 | PoE 空间螺旋轴 | 指数映射成为关节运动因子 |

Morph 先保留来源，再移动对应概念，最后显示公共关节旋转、DH、PoE 与末端目标。未参与的轴角、欧拉角细节随来源节点收束，不伪装成一一对应。
