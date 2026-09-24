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

主舞台共有 39 个知识状态，加封面和结尾。两次跨图变形均有独立的来源、移动、目标状态。
