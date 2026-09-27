# Cpp——面向对象 · 电影式知识图谱

原文副本见 `content/source.md`；原文件保持不变。内容取舍与技术修正见 `content-analysis.md`，逐步讲述见 `storyboard.md`，配色与动画见 `DESIGN_SYSTEM.md`。

## 运行

在此目录执行：

```bash
pnpm install
pnpm dev
```

默认打开 `http://localhost:3060/`。用空格或方向键推进：封面 → 25 个主场景状态 → 结尾。执行 `pnpm typecheck` 与 `pnpm build` 检查项目。Windows 也可用 `powershell -ExecutionPolicy Bypass -File .\\scripts\\run.ps1 dev`。


讲解时放大当前路径，回顾时恢复整图。代码来自 `content/examples/*.md` 的标准代码围栏，由 Shiki 高亮；数学公式由 KaTeX 渲染。封装下分为“复用过程”和“控制接口，方便扩展”；继承中一起比较组合，再介绍函数声明；虚函数表与指针在动态分派部分展开。

## 本次验证

`pnpm typecheck`、`pnpm build` 与本地 HTTP 检查均通过。在 1280×720 浏览器中逐步检查了全部 25 个状态：详情面板未截断，代码未横向溢出；查看了封面、公式和代码、虚函数表示意、两组整图与结束页，并确认方向键能够前进、回退和进入结束页。
