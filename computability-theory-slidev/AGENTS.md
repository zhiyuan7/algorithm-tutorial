# Agent Rules

1. 不要把内容数据堆进 `slides.md`。
2. 先读 `data/knowledge.ts` 理解三张独立图谱，再读 `data/tour.ts` 理解镜头顺序。
3. 视觉修改必须遵守 `DESIGN_SYSTEM.md`，不得临时发明颜色、阴影或 easing。
4. `KnowledgeStage` 是持续存在的知识世界，局部知识用 camera 和 detail panel 展开。
5. 两段 morph 只解释视角转换，不得把三张图谱拼成一张伪图谱。
6. 技术表述以 `content-analysis.md` 的修正为准，原文副本不改。
7. 修改后必须通过 typecheck、build、HTTP smoke test 和 16:9 视觉检查。
