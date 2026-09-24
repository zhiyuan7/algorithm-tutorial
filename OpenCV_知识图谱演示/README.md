# OpenCV · 知识图谱演示

以 `../OpenCV.md` 为原始内容，制作的可运行 Slidev / Vue / SVG 知识图谱演示。原文原样保存在 `content/source.md`。演示包含两张独立图谱和一段“信号线索 → 处理操作”的概念映射过渡。

## 运行

需要 Node.js 22+ 与 pnpm。

```bash
cd OpenCV_知识图谱演示
pnpm install --frozen-lockfile
pnpm run dev
```

浏览器打开 `http://localhost:3032/`，用方向键或空格键逐次推进。演讲者视图在 `http://localhost:3032/presenter/`。

## 检查

```bash
pnpm run typecheck
pnpm run build
```

## 文件

- `slides.md`：封面、持续舞台、逐次点击讲稿和结尾。
- `data/knowledge.ts`：两张语义图及过渡映射。
- `data/tour.ts`：28 个舞台状态。
- `components/KnowledgeStage.vue`：图谱、镜头和详情舞台。
- `components/PipelineMorph.vue`：独立图谱之间的概念映射。
- `content-analysis.md`：文章分析、覆盖矩阵、技术修正。
- `storyboard.md`：逐次点击分镜。
- `DESIGN_SYSTEM.md`：参考总纲的视觉规则。

`dist/` 由构建命令生成。原文不因演示中的准确性调整而改写。
