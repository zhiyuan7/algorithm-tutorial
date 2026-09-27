# 简明数学分析：从极限到矩阵微积分

从仓库根目录 `简明数学分析.md` 改编的电影式 Slidev 知识图谱。原文原样保存在 `content/source.md`；改编说明和覆盖矩阵在 `content-analysis.md`，逐镜计划在 `storyboard.md`。

## 运行

Node.js 22 或更新版本。在本目录执行：

```bash
pnpm install
pnpm run dev
```

浏览器访问 <http://localhost:3047/>。方向键或空格键推进。Windows 也可使用 `powershell -ExecutionPolicy Bypass -File .\scripts\run.ps1 dev`。

## 验证

```bash
pnpm run typecheck
pnpm run build
```

主舞台共有 38 个讲解状态，加封面和结尾。已移除原状态 11–14、25–28 的两组过渡动画与章节开场总览。每章回顾会恢复整图。

公式统一使用 LaTeX，由 KaTeX 渲染；讲解时收起其他分支，虚线关系线用直角折线，实线保留平滑曲线。

公式统一使用 LaTeX，由 KaTeX 渲染；讲解时收起其他分支，虚线关系线用直角折线，实线保留平滑曲线。
