# ROS 2 · 电影式知识图谱演示

本项目把仓库根目录《ROS 2》文章改编为可运行的 Slidev Web 演示，继承 `总纲_知识图谱演示` 的配置、配色、字体、纸面节点和镜头风格。

## 运行

要求 Node.js 22.12+ 和 pnpm。在本目录执行：

```bash
pnpm install
pnpm run dev
```

打开 `http://localhost:3030/`，用方向键或空格键依次推进。Presenter 页面为 `http://localhost:3030/presenter/`。

## 验证

```bash
pnpm run typecheck
pnpm run build
```

`slides.md` 包含封面、一个由 31 个点击状态驱动的持续舞台，以及结束页。`data/knowledge.ts` 存放两张独立知识图谱，`data/tour.ts` 存放镜头状态；`components/RuntimeMorph.vue` 是三步过渡。源文原样复制在 `content/source.md`。`content-analysis.md` 记录源文覆盖和技术澄清，`storyboard.md` 记录逐步镜头。

生产构建写入 `dist/`。主交付物是浏览器演示，不包含导出文件。
