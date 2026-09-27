# Cpp——执行顺序 · 知识图谱演示

依据 `content/source.md` 制作的电影式 Slidev 演示。主舞台持续存在，通过方向键或空格键推进 23 个讲解画面。两张独立图谱分别解释“程序下一步去哪里”和“三种结构怎样组成算法”，中间用三组对应关系连接讲述。

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

## 本次调整

页码按修改前右上角的 1–29 计数，不含封面与结束页。已删除原第 5、11、20、23 个画面；原第 24–26 个画面合为“结构嵌套”。现在主舞台共有 23 个画面，点击状态为 0–22。

讲解时放大当前分支，收起无关节点；两次回顾恢复当前完整图。虚线关系使用直角折线，实线归属关系保留曲线。转换画面保留两侧卡片，方便逐条对照。

代码示例保存在 `content/examples/*.md`，使用标准的 `cpp` Markdown 代码块，由 MarkdownIt 和 Shiki 渲染。数学公式使用 KaTeX；执行步骤使用独立的列表。
