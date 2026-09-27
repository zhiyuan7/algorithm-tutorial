# Design System

沿用总纲配色：背景 #D6BF88、纸面 #DED7CA、文字 #13254F。16:9，canvasWidth 1280；中文优先 Microsoft YaHei / Noto Sans CJK SC，代码用 Consolas / Noto Sans Mono。

同一个 KnowledgeStage 承载 25 个状态。讲解时只显示当前节点与祖先路径，按可见节点取景；封装回顾恢复分支，对象和类型回顾恢复各自整图。Camera 900ms、Expand 520ms、Collapse 420ms。两组语义数据保持独立，原视角转换与概念变形场景已删除。

实线保留原有的贝塞尔曲线；虚线经过节点外侧的空白通道，使用水平、垂直直角折线，方形端点和连接。箭头大小采用固定世界坐标，避免随线宽放大。

代码源是 content/examples 中的 Markdown 代码围栏，使用 MarkdownIt + Shiki 高亮。公式由 KaTeX 渲染。右侧详情面板适配 16:9，高亮代码保留换行与缩进；虚函数表图用单继承示意，明确对象指针、表项和实际函数的关联。
