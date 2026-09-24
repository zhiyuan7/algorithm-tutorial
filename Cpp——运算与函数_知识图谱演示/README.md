# Cpp——运算与函数 · 知识图谱演示

以原文 `content/source.md` 为依据制作的电影式 Slidev 演示。主舞台为一张持续存在的幻灯片，方向键或空格键按 24 个语义状态推进。两张独立图谱之间有明确的三路语义映射过渡，过渡后先展示新图谱全貌。

## 运行

```bash
pnpm install
pnpm dev
```

浏览器打开 `http://localhost:3030/`。构建验证：`pnpm typecheck && pnpm build`。

若 3030 端口已被占用，可运行 `pnpm exec slidev slides.md --port 3032`，然后打开 `http://localhost:3032/`。

原文覆盖与技术修正见 `content-analysis.md`；逐步镜头与讲述目标见 `storyboard.md`；视觉 token 见 `DESIGN_SYSTEM.md`。
