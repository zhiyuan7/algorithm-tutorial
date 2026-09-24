# Design System

## 1. 视觉目标

整套演示使用 `Minimal / Academic / Technical / Cinematic` 风格。信息层级优先于装饰，镜头运动服务于空间记忆与知识关系。

颜色、字体、间距、镜头和动效参考项目 `course-overview-slidev`。主背景沿用暖黄 `#D6BF88`，金黄 `#D7B662` 只用于小面积辅助。

## 2. 颜色 Token

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--bg` | `#D6BF88` | 所有演示画布的黄色背景 |
| `--paper` | `#DED7CA` | 节点与详情面板 |
| `--ink` | `#13254F` | 主标题、公式、重点连线 |
| `--blue` | `#163F6F` | 当前知识点、线性空间与特征结构 |
| `--teal` | `#396D80` | 坐标、表示、秩与二次型 |
| `--sky` | `#74A0BA` | 辅助蓝 |
| `--cyan` | `#83D0E3` | 封面环线 |
| `--sage` | `#7D8981` | 次级文本与非当前边 |
| `--green` | `#9AAE8F` | 保持性、正交结构与谱定理 |
| `--plum` | `#624F6B` | 线性映射、主动变换与行列式 |
| `--wine` | `#644A56` | 限制、退化与正定性 |
| `--tan` | `#BA9A7E` | 辅助注释 |
| `--ochre` | `#B5855F` | 实验、可谬论、列表点 |
| `--lavender` | `#ACA6BF` | 基、换基与对称化 |
| `--brown` | `#7D665C` | 脚注与页角文字 |

禁止在组件内新增未记录的颜色。如需新色，先在本文档中说明它的语义。

## 3. Typography

- 主字体：`Microsoft YaHei`，确保 Windows 和 PowerPoint 中的中文一致性。
- 公式：`Cambria` 或 `Times New Roman`。
- 封面标题：66 px。
- 场景标题：31 px。
- Detail 标题：33 px。
- Detail 核心句：21 px。
- Detail 解释：16 px。
- Node 标题：24 px。
- 注释：13 px。

标题直接指出主题，不使用营销口号。一屏只保留一个主结论、一个主要公式或一组必要证据。

## 4. 知识节点

节点的左侧色条表示所属知识分支。节点的四种语义层级如下：

- `Detail`：节点本体作为空间锚点，完整解释放在右侧 Detail Panel。
- `Summary`：显示标题、英文名和两行概要。
- `Concept`：只显示概念标题。
- `Overview`：根节点显示整张图谱的名称。

节点完成讲解后收缩成 Summary 或 Concept，不从地图中消失。

## 5. 关系线

- 实线：层级归属。
- 虚线：横向关系、应用、边界或可修正性。
- 新关系线通过 `stroke-dashoffset` 绘制出现。
- 连线标签必须表达关系语义，不作装饰。

## 6. Motion Token

| 动画 | 时长 | Easing | 语义 |
| --- | --- | --- | --- |
| Camera | 900 ms | `cubic-bezier(.16,1,.3,1)` | 讨论对象发生转移 |
| Expand | 520 ms | 同上 | 开始深入知识点 |
| Collapse | 420 ms | ease | 讲解完成并回到地图 |
| Appear | 320 ms | ease | 新知识出现 |
| Edge Draw | 520 ms | 同上 | 新关系建立 |
| Graph Morph | 1200 ms | 同上 | 提问框架从结构转向表示，再转向不变几何 |

禁止 bounce、flash、无意义旋转、粒子和反复 pulse。

## 7. Camera

- `node`：聚焦当前节点，但保留已可见的上下文。
- `subtree`：显示当前分支和其祖先路径。
- `all`：自动缩放到完整图谱。

Detail 场景将知识世界向左偏移，右侧预留 482 px Detail Panel。目标分辨率是 16:9，同时根据 viewport 计算 framing。

## 8. 变形过渡

三张知识图谱在数据上保持独立。`RepresentationMorph.vue` 和 `InvariantMorph.vue` 只是中间镜头：

- 线性空间、基、映射与矩阵重组为“对象在动”和“观察框架在变”。
- 秩/SVD、主动变换/相似与正交结构分别转入体积、方向与能量问题。
- 源图的边退场后，目标图的节点和边才进入。

不得把三张图谱连成一张超大树。
