# 总纲 · 电影式知识图谱演示

这是一套基于 Slidev 53、Vue 3、SVG 和 D3 的电影式知识图谱演示工程。当前正式内容来自 `content/source.md`，即《总纲》。

动态 Slidev Web Presentation 是主产品。PPTX 是按 click scene 导出的关键帧备用版。

## 当前交付物

- `slides.md`：封面、持续 KnowledgeStage 和结尾。
- `content/source.md`：原始文章。
- `content-analysis.md`：文章结构、关系、公式与准确性调整。
- `data/knowledge.ts`：两张独立知识图谱。
- `data/tour.ts`：25 个点击场景的演示状态机。
- `storyboard.md`：分镜、镜头、语义动画与源文映射。
- `components/KnowledgeStage.vue`：核心舞台。
- `components/ParadigmMorph.vue`：两张图谱之间的变形过渡。
- `composables/useKnowledgeLayout.ts`：D3 hierarchy 布局与循环布局。
- `composables/useCamera.ts`：`node / subtree / all` 镜头 framing。
- `DESIGN_SYSTEM.md`：配色、字体、节点、镜头和动画 Token。
- `demo.md`：最小 Demo。
- `output/visual-qa/`：所有 click scene 的 PNG 关键帧。
- `dist/`：可部署的静态 SPA。

## 运行环境

Slidev 当前要求 Node.js 22.12 或更高版本。本工程使用 pnpm 管理依赖；Windows、macOS 与 Linux 均可直接运行标准 pnpm 命令。

### 安装依赖

```bash
npm install --global pnpm
cd course-overview-slidev
pnpm install --frozen-lockfile
```

`pnpm-lock.yaml` 锁定了当前验证过的依赖版本。使用 `--frozen-lockfile` 可以避免不同机器安装出不同版本。

## 启动

```bash
pnpm run dev
```

启动后可用：

- 演示：`http://localhost:3030/`
- Presenter：`http://localhost:3030/presenter/`
- Overview：`http://localhost:3030/overview/`
- Browser Exporter：`http://localhost:3030/export/`
- Slidev HTTP MCP：`http://localhost:3030/__mcp`

## 最小 Demo

```bash
pnpm run dev:demo
```

Demo 验证以下行为：

- 前进与后退都由 scene 决定，不依赖不可逆状态。
- Camera 能在节点、分支和全图之间平滑转换。
- 连线在关系建立后绘制。
- Detail 收缩后，节点继续留在知识地图中。

## 更换 `source.md`

1. 把新文章放到 `content/source.md`。
2. 先重写 `content-analysis.md`，列出一级概念、子概念、横向关系、公式、图示和需要独立动画的内容。
3. 把文章结构写入 `data/knowledge.ts`。不在这个文件中保存镜头坐标。
4. 先在 `storyboard.md` 中确认教学顺序、镜头和收缩终态。
5. 再把分镜转换为 `data/tour.ts`。
6. 仅在普通 Detail Panel 不足以表达专业内容时，才新增独立 Vue 组件。
7. 运行完整验证。

## `knowledge.ts`

每个节点至少包含：

```ts
{
  id,
  title,
  summary,
  details,
  children,
}
```

横向关系放在 `relations`：

```ts
{
  source,
  target,
  type,
  label,
}
```

知识节点不保存 `x / y / scale`。主要树结构使用 D3 hierarchy 自动布局，循环结构由可复用布局策略计算。

## `tour.ts`

每个 scene 描述：

```ts
{
  map,
  focus,
  framing,
  mode,
  detailKey,
  visibleNodes,
  visibleEdges,
  headline,
}
```

`slides.md` 只把 `$clicks` 传入 `KnowledgeStage`：

```html
<KnowledgeStage :step="$clicks" />
```

改变演讲顺序时，优先修改 `tour.ts`，不要在组件中堆叠 `if (step === n)`。

## 设计系统

颜色、字体、节点、关系线、镜头和动画的规则全部在 `DESIGN_SYSTEM.md` 中。实际 Token 位于 `styles/index.css`。

当前主背景是用户指定的黄色 `#D6BF88`。组件不得绕过 Token 随机新增颜色。

## 跨平台说明

核心开发、类型检查和 Web 构建均可在 Windows、macOS 与 Linux 上运行：

```bash
pnpm run dev
pnpm run typecheck
pnpm run build
```

`scripts/run.ps1` 与 `scripts/verify.ps1` 是当前 Windows 开发机的辅助脚本，其中包含可选的本机 Node.js 路径。其他平台不需要运行这些脚本。

启动开发服务器后，Slidev HTTP MCP 位于：

```text
http://localhost:3030/__mcp
```

## 验证和视觉 QA

基础的跨平台验证命令是：

```bash
pnpm run typecheck
pnpm run build:demo
pnpm run build
```

Windows 维护者还可以运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\verify.ps1
```

该脚本会额外导出带所有 click scene 的 PNG。

重点审计帧列在 `storyboard.md`。必须检查文字溢出、裁切、节点重叠、连线穿字、当前焦点和颜色一致性。

## 生产构建

```bash
pnpm run build
```

产物位于 `dist/`。可将该目录作为静态站点部署。

若部署到 GitHub Pages 的仓库子路径，需要提供 base path：

```bash
pnpm exec slidev build slides.md --out dist --base /你的仓库名/
```

## 导出

跨平台导出优先使用浏览器导出器：

```text
http://localhost:3030/export/
```

下面的命令行脚本指定了当前 Windows 机器上的 Microsoft Edge 路径，因此不属于跨平台入口。

### PNG Visual QA

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run.ps1 'export:png'
```

### 视觉保真 PPTX

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run.ps1 'export:pptx'
```

该模式把每个 click scene 导出为一页图像，可保留浏览器视觉，但 Vue / D3 动画不会变成 PowerPoint 原生动画。

### 尝试可编辑 PPTX

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run.ps1 'export:pptx-editable'
```

SVG、CSS 效果和无法安全重建的元素仍可能以图片形式存在。正式动态演示应使用 Slidev Web Presentation。

## 参考

- [Slidev Getting Started](https://sli.dev/guide/)
- [Slidev Work with AI](https://sli.dev/guide/work-with-ai)
- [Slidev Exporting](https://sli.dev/guide/exporting)
