# 设计系统

参照同目录级《总纲_知识图谱演示》的设计规范与实际 CSS。演示沿用其 Minimal / Academic / Technical / Cinematic 风格与 16:9 舞台。

## 颜色

| Token | 色值 | 本演示用途 |
|---|---|---|
| `--bg` | `#D6BF88` | 全部画布背景 |
| `--paper` | `#DED7CA` | 节点及详情面板 |
| `--ink` | `#13254F` | 主要标题、公式与连接 |
| `--blue` | `#163F6F` | 坐标语义、DH、焦点 |
| `--teal` | `#396D80` | 旋转矩阵、PoE |
| `--plum` | `#624F6B` | 位姿与求解结果 |
| `--ochre` | `#B5855F` | 紧凑表示、螺旋 |
| `--brown` | `#7D665C` | 页角与脚注 |

其余辅助 Token、字体与动画时长直接沿用 `styles/index.css` 中的参考值，不在组件中另建颜色体系。主字体为 Microsoft YaHei / Noto Sans CJK SC，公式采用 Cambria / Times New Roman。

## 组件与运动

节点左色条表示语义类别。Detail 时节点充当空间锚点，完整解释进入右侧面板；收束后回到 Summary 或 Concept。关系线用文字标注“定义表达”“加入平移”“参数化”，求解图的三条分支标注“局部换系”“空间螺旋轴”“计算目标”。

镜头使用 `node / subtree / all` framing，从节点范围计算位置。每次点击只推进一个教学状态。Morph 先显示表示图的四个概念，再移动到公共的关节旋转、DH、PoE 与末端位姿的位置，最后显现目标连接；两张图谱的数据不合并。
