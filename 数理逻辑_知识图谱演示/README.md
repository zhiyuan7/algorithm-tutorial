# 数理逻辑 · 电影式知识图谱

这是从 `content/source.md` 改编的交互式 Slidev 演示，主题是“从符号到模型，从量词到一致性”。演示使用持续存在的知识舞台组织两张独立图谱，并通过 `QuantifierMorph` 把论域、赋值与满足关系重组为量词选择过程。

原文副本保存在 `content/source.md`；演示适配、技术修正和覆盖矩阵记录在 `content-analysis.md`；完整讲解顺序记录在 `storyboard.md`。

## 环境要求

- Node.js 22.12.0 或更高版本
- pnpm

如果尚未安装 pnpm：

```bash
npm install --global pnpm
```

## 安装与运行

从仓库根目录进入本工程：

```bash
cd 数理逻辑_知识图谱演示
pnpm install --frozen-lockfile
pnpm run dev
```

默认地址：

- 演示：<http://localhost:3030/>
- 演讲者模式：<http://localhost:3030/presenter/>
- 总览：<http://localhost:3030/overview/>
- 浏览器导出器：<http://localhost:3030/export/>

## 检查与构建

```bash
pnpm run typecheck
pnpm run build
```

生产构建输出到 `dist/`。可以使用任意静态文件服务器部署该目录。

若部署到 GitHub Pages 的仓库子路径：

```bash
pnpm exec slidev build slides.md --out dist --base /你的仓库名/
```

## 跨平台说明

以下命令可在 Windows、macOS 和 Linux 上运行：

```bash
pnpm install --frozen-lockfile
pnpm run dev
pnpm run typecheck
pnpm run build
```

`scripts/run.ps1` 和 `scripts/verify.ps1` 是 Windows PowerShell 辅助脚本，其中包含当前开发机的可选 Node.js 路径。它们不是其他平台的必需入口。

不同系统的中文字体可能造成轻微换行差异。若需要像素级一致，请在演示机器上统一安装微软雅黑或 Noto Sans CJK SC。

## 工程结构

```text
slides.md                      Slidev 入口，只负责挂载持续舞台
content/source.md              原始文章副本
content-analysis.md            内容分析、修正与覆盖矩阵
data/knowledge.ts              两张独立知识图谱
data/tour.ts                   点击场景和讲解顺序
components/KnowledgeStage.vue  持续知识舞台
components/QuantifierMorph.vue 量词语义变形
composables/                   D3 布局和镜头 framing
styles/index.css               设计 Token 与全局样式
storyboard.md                  分镜与源文映射
DESIGN_SYSTEM.md               视觉系统
```

知识数据和镜头顺序应分别维护：修改概念结构时优先编辑 `data/knowledge.ts`，修改演讲顺序时优先编辑 `data/tour.ts`，不要在组件中堆叠针对点击序号的临时判断。

## 版本控制

应提交源码、`package.json` 和 `pnpm-lock.yaml`。不要提交：

```text
node_modules/
dist/
.slidev/
```

## 参考资料

- [Slidev 快速开始](https://sli.dev/guide/)
- [Slidev 构建与部署](https://sli.dev/guide/hosting)
- [Slidev 导出](https://sli.dev/guide/exporting)
