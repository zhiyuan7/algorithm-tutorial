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

项目包含三张独立图谱与两次显式语义 morph；推进演示共需 32 次点击。
