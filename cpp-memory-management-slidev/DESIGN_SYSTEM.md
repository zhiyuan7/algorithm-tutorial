# Design System

视觉格式遵循 [course-overview-slidev](../course-overview-slidev/DESIGN_SYSTEM.md)。

## 色彩与语义

沿用总纲的暖黄背景 `#D6BF88`、纸面 `#DED7CA`、深蓝文字 `#13254F` 和同一组辅助色。实际 CSS Token 见 `styles/index.css`。内存图谱的节点色条采用原调色板：地址与 C 接口为 teal，静态期和 C++ 对象为 plum，自动期与 RAII 为 ochre，风险为 wine，所有权重点为 blue。颜色只作分组提示，关系线仍有文字标签和虚实区分。

## 版式与镜头

- 16:9，`canvasWidth: 1280`，中文 `Microsoft YaHei`，与总纲配置一致。
- 封面 66 px、场景标题 31 px、详情标题 33 px、节点标题 24 px。
- 同一持久 `KnowledgeStage` 承载全部 22 个主场景状态。
- `node`、`subtree`、`all` 镜头从布局边界计算；详情面板位于右侧。
- Camera 900 ms、展开 520 ms、收缩 420 ms、图谱变形 1200 ms，使用总纲的 easing。

## 过渡

存储图和所有权图各自独立。中间镜头先保留“静态／自动／动态”三种存储期，再将自动清理映向 RAII、动态灵活性映向手动分配。静态存储期收拢淡出。变形完成后由第二张图谱接管。
