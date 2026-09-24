# 相机模型 · 电影式知识图谱

从《相机模型.md》生成的 Slidev 演示。原文副本位于 `content/source.md`；演示改写和技术修正记录在 `content-analysis.md`。

## 运行

需要 Node.js 22+ 和 pnpm。在本目录执行：

```bash
pnpm install
pnpm run dev
```

浏览器打开 `http://localhost:3038/`，使用方向键或空格键推进。演示包含封面、一个持续的知识图舞台（35 个点击状态）和结束页。

Windows PowerShell 也可运行 `powershell -ExecutionPolicy Bypass -File .\scripts\run.ps1 dev`。

## 验证

```bash
pnpm run typecheck
pnpm run build
```

`storyboard.md` 列出全部镜头；`DESIGN_SYSTEM.md` 记录沿用《总纲》的配色和排版。三张图分别讲正向几何成像、逆向参数推断和彩色图像形成，两段三拍变形负责切换解释框架。
