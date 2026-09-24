# 演示工程维护约定

1. 原文保持在 `content/source.md`；改编或技术澄清写进 `content-analysis.md`。
2. 先修改 `data/knowledge.ts` 的概念与关系，再修改 `data/tour.ts` 的镜头顺序。
3. 两张图谱始终独立。`RuntimeMorph.vue` 只解释从逻辑图到运行时图的映射。
4. 持续舞台由 `KnowledgeStage` 和 `$clicks` 驱动；每次点击只完成一个清晰的叙述节拍。
5. 颜色、字体、卡片与运动时长遵循 `DESIGN_SYSTEM.md`，新增设计 token 时先记录语义。
6. 修改后运行 `pnpm run typecheck`、`pnpm run build`，并检查详情、两张全图、过渡三态和结尾的浏览器画面。
