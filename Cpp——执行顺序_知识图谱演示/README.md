# Cpp——执行顺序 · 知识图谱演示

依据 `content/source.md` 制作的电影式 Slidev 演示。主舞台持续存在，通过方向键或空格键推进 29 个语义状态。两张独立图谱分别解释“程序下一步去哪里”和“三种结构怎样组成算法”，中间有明确的三路语义映射。

## 运行

需要 Node.js 22 或更新版本与 pnpm。在本目录运行：

```bash
pnpm install --frozen-lockfile
pnpm dev
```

默认地址为 `http://localhost:3030/`。如果 3030 已被占用，可运行 `pnpm exec slidev slides.md --port 3033` 并打开 `http://localhost:3033/`。

类型检查与构建：

```bash
pnpm run typecheck
pnpm run build
```

`slides.md` 是演示入口；`data/knowledge.ts` 保存语义节点、关系与过渡映射；`data/tour.ts` 保存逐步镜头。原文覆盖及技术限定见 `content-analysis.md`，逐步讲述目标见 `storyboard.md`，视觉规则见 `DESIGN_SYSTEM.md`。
