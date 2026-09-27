# 线性代数：从结构到不变量

这是从仓库根目录的《线性代数》改编的 Slidev 知识图谱演示。原文副本保存在 `content/source.md`。

## 运行

需要 Node.js 22.12.0 或更新版本，以及 pnpm。从仓库根目录执行：

```bash
cd linear-algebra-slidev
pnpm install --frozen-lockfile
pnpm run dev
```

在浏览器中打开终端显示的地址。

## 验证

```bash
pnpm run typecheck
pnpm run build
```

内容边界、技术性修正与覆盖矩阵见 `content-analysis.md`，逐镜叙事见 `storyboard.md`。


本次修订包含 36 个连续镜头。页面编号对应镜头进度；原页码与修改后的对应关系见 `storyboard.md`。所有公式使用 LaTeX / KaTeX 渲染；`output/visual-qa/` 存放本地生成的 PNG 与边界检查报告。

详情页采用分支放大取景：讲解当前分支时暂时收起其他分支，回顾时恢复整图。此次取景修订的 PNG 验收见 `output/branch-visual-qa/`。
