# 线性代数：从结构到不变量

这是从 `线性代数.md` 改编的电影式 Slidev 知识图谱演示。原文已原样复制到 `content/source.md`。

## 运行

Windows PowerShell：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run.ps1 dev
```

Linux/macOS：

```bash
cd /home/abel/Desktop/codes/algorithm-tutorial/线性代数_知识图谱演示
npm run dev
```

本机项目依赖已安装；`pnpm` 只存在于 Codex 的工具环境，普通终端可直接使用 `npm run dev`。启动后访问 <http://localhost:3030/>。若将项目复制到尚未安装依赖的机器，先使用 Node.js 22 或更新版本运行 `npm install`。

## 验证

```bash
npm run typecheck
npm run build
```

内容边界、技术性修正与覆盖矩阵见 `content-analysis.md`，逐镜叙事见 `storyboard.md`。
