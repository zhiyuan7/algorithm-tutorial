# 集合论：从悖论到无限

由 `../集合论.md` 改编的电影式 Slidev 知识图谱演示。原文副本保存在 `content/source.md`，内容分析、技术修正和覆盖矩阵见 `content-analysis.md`，逐镜分镜见 `storyboard.md`。

## 运行

Linux / macOS：

```bash
pnpm install
pnpm dev
```

Windows PowerShell：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run.ps1 dev
```

默认地址：<http://localhost:3030>

## 验证

```bash
pnpm run typecheck
pnpm run build
```

项目包含三张独立图谱与两次显式语义 morph；推进演示共需 33 次点击（34 个场景）。数学公式统一由 KaTeX 渲染，包括正文、节点与过渡。

在自然数与归纳原则之后，新第 19 页加入多元组：一个函数 `f:n→A` 表示一个元组，全部这样的函数组成 `A^n`。文章新增第五节第 4 小节，并说明三元组、空元组、有序对的对应与各位置取值不同的有限积。

此前删去的构造公理详情保持删除，第 16 页保留 Jerry Bona 英文引言。加入多元组后，原第 19 页起顺延一页；戴德金分割现在位于第 23 页，可数构造位于第 30 页。

引言出处：[Eric Schechter · Axiom of Choice](https://math.vanderbilt.edu/schectex/ccc/choice.html)。

需要导出逐步画面时，可运行：

```bash
pnpm exec playwright install chromium
pnpm exec slidev export slides.md --format png --with-clicks --output output/slides
```
