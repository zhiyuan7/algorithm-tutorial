# Agent Rules

1. 不要把所有内容放进 `slides.md`。
2. 先阅读 `data/knowledge.ts`，理解知识是什么。
3. 再阅读 `data/tour.ts`，理解知识怎么讲。
4. 视觉修改必须遵守 `DESIGN_SYSTEM.md`。
5. 不要在组件里随机创建新颜色、字号、圆角、阴影或 easing。
6. `KnowledgeStage` 是持续存在的知识世界，不要把每个知识点拆成独立 slide。
7. Camera 是用户观察知识世界的视角。优先使用 `node`、`subtree`、`all` framing，不在 scene 中硬编码镜头坐标。
8. 动画必须表达语义。禁止为了“酷”破坏教学清晰度。
9. 两张知识图谱的数据保持独立。`ParadigmMorph.vue` 只是过渡镜头，不得把两张图连成一张大图。
10. 修改后必须运行 `typecheck`、`build`和 PNG Visual QA。
11. 检查详细场景、收缩场景、跨分支镜头、morph 与最终 fitAll，不只检查封面。
12. Windows 上的系统 Node 版本可能低于 Slidev 要求。优先使用 `scripts/run.ps1`，不要覆盖用户的系统 Node。
