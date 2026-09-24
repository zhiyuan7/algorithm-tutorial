# 简明机器人学 · 电影式知识图谱演示

基于《简明机器人学.md》制作的 Slidev Web 演示。演示包含两张独立图谱、27 个点击状态，以及从运动表示到正运动学的显式变形过渡。源文保存在 [content/source.md](content/source.md)，未修改。

## 运行

需要 Node.js 22 或更新版本、pnpm。

```bash
cd robotics-slidev
pnpm install --frozen-lockfile
pnpm run dev
```

打开 `http://localhost:3047/`；用方向键或空格推进。Presenter 页面位于 `http://localhost:3047/presenter/`。本机的 3030 端口已有其他演示，因此本项目默认使用 3047。

## 验证

```bash
pnpm run typecheck
pnpm run build
```

## 结构

- `content-analysis.md`：内容分析、技术澄清与源文覆盖矩阵。
- `storyboard.md`：逐点击分镜与图谱过渡映射。
- `data/knowledge.ts`：两张独立图谱的概念和关系。
- `data/tour.ts`：27 个场景的状态。
- `components/KnowledgeStage.vue`：持续存在的图谱舞台。
- `components/KinematicsMorph.vue`：从表示图到求解图的过渡。
- `DESIGN_SYSTEM.md`：继承《course-overview-slidev》的视觉规范。
