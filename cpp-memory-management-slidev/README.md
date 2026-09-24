# Cpp：内存管理 · 知识图谱演示

根据仓库根目录的《Cpp——内存管理》改编为可交互的 Slidev 演示。原文副本保存在 `content/source.md`，未修改原文章。

## 运行

需要 Node.js 22 及以上和 pnpm：

```bash
pnpm install
pnpm dev
```

浏览器打开 `http://localhost:3045/`，用方向键或空格键从封面推进至结尾。

Windows PowerShell 也可运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run.ps1 dev
```

检查：

```bash
pnpm run typecheck
pnpm run build
```

演示包含两张独立图谱：地址与存储期、动态资源所有权。两图之间设有语义变形镜头。内容对应关系见 `content-analysis.md`，逐步镜头与讲述目标见 `storyboard.md`，颜色与排版规则见 `DESIGN_SYSTEM.md`。
