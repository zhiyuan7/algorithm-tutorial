# Design System

视觉格式遵循 [总纲_知识图谱演示](../总纲_知识图谱演示/DESIGN_SYSTEM.md)。

## 色彩与语义

沿用总纲的背景 `#D6BF88`、纸面 `#DED7CA`、深蓝文字 `#13254F` 及其全部辅助色 token。构造与继承为 teal，生命周期与工厂为 ochre，封装与函数契约为 plum，动态分派为 blue，不变量与虚析构为 wine。颜色辅助分组，关系仍通过文字和虚实线区分；组件中不新增未登记颜色。

## 字体、尺寸与运动

16:9，`canvasWidth: 1280`，中文 `Microsoft YaHei`；封面 66px、场景标题 31px、详情标题 33px、节点标题 22–26px。沿用总纲的 Camera 900ms、Expand 520ms、Collapse 420ms、Graph Morph 1200ms 和 `cubic-bezier(.16,1,.3,1)`。C++ 代码片段使用 Consolas 等宽字，18px。

## 地图与镜头

同一 `KnowledgeStage` 承载 26 个主场景状态。节点有 Overview、Concept、Summary、Detail 四层；详细解释在右侧 482px 面板。`node`、`subtree`、`all` 通过可见节点边界计算镜头，不写固定镜头坐标。实线表示概念层级，虚线表示跨分支依赖。

## 变形

两张图在语义数据上独立。`ObjectTypesMorph.vue` 从 `morphMapping` 读取三组源目标节点 ID，先展示源概念，再绘制映射并显现目标概念。它说明关注点从单个对象扩展到类型家族；不会把两组节点接成一张地图。
