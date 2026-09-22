# 薪火培训学习资料

本仓库整理了 C/C++、数学基础、机器人学、ROS 2、计算机视觉与理论计算机科学等方向的中文学习材料，并提供部分文章对应的交互式 Slidev 知识图谱演示。

## 内容导航

### Markdown 教程

- C/C++：`Cpp——面向对象.md`、`Cpp——内存管理.md`、`Cpp——运算与函数.md`、`Cpp——执行顺序.md`
- 数学与理论计算机科学：`集合论.md`、`数理逻辑.md`、`线性代数.md`、`简明数学分析.md`、`可计算理论.md`
- 机器人与视觉：`简明机器人学.md`、`相机模型.md`、`OpenCV.md`、`ROS 2.md`
- 课程总览：`总纲.md`

### Slidev 交互演示

| 工程 | 内容 | 特点 |
| --- | --- | --- |
| [总纲知识图谱演示](./总纲_知识图谱演示/) | 在现实与形式之间 | 两张知识图谱、持续舞台、语义变形、镜头导览 |
| [数理逻辑知识图谱演示](./数理逻辑_知识图谱演示/) | 从符号到模型，从量词到一致性 | 两张图谱与量词语义变形 |
| [可计算理论知识图谱演示](./可计算理论_知识图谱演示/) | 能力、代价与边界 | 三张图谱、两次语义变形、28 个点击场景 |

这些演示不是一组互不相关的静态幻灯片，而是由 Vue、SVG、D3 和 Slidev 共同构成的持续知识舞台。点击推进时，镜头会在节点、分支和全图之间移动，并按教学顺序建立关系。

## 运行 Slidev 演示

### 环境要求

- Git
- Node.js 22.12.0 或更高版本
- pnpm

如果尚未安装 pnpm：

```bash
npm install --global pnpm
```

### 克隆并启动

```bash
git clone https://github.com/zhiyuan7/algorithm-tutorial.git
cd algorithm-tutorial/总纲_知识图谱演示
pnpm install --frozen-lockfile
pnpm run dev
```

默认地址：

- 演示：<http://localhost:3030/>
- 演讲者模式：<http://localhost:3030/presenter/>
- 总览：<http://localhost:3030/overview/>
- 浏览器导出器：<http://localhost:3030/export/>

运行另外两个演示时，只需进入相应工程目录并执行同样的安装和启动命令。

## 检查与生产构建

在所选演示工程目录中执行：

```bash
pnpm run typecheck
pnpm run build
```

生产构建输出到该工程的 `dist/` 目录。`dist/` 是静态单页应用，可以部署到 GitHub Pages、Netlify、Vercel 或任意静态文件服务器。

若部署到 GitHub Pages 的仓库子路径，需要设置 base path：

```bash
pnpm exec slidev build slides.md --out dist --base /你的仓库名/
```

## 跨平台说明

核心开发和构建命令可以在 Windows、macOS 与 Linux 上运行：

```bash
pnpm install --frozen-lockfile
pnpm run dev
pnpm run typecheck
pnpm run build
```

各工程中的 `scripts/*.ps1` 是为当前 Windows 环境准备的辅助脚本，不是跨平台入口；其他系统直接使用上面的 pnpm 命令即可。

总纲工程的部分命令行导出脚本使用本机 Microsoft Edge 路径，因此当前只适用于相同的 Windows 环境。跨平台导出建议启动开发服务器后使用浏览器导出器：

```text
http://localhost:3030/export/
```

中文字体在不同操作系统上的字形和宽度可能略有差异。工程会依次尝试微软雅黑、Noto Sans CJK SC 和系统无衬线字体；若需要像素级一致，应在所有机器上安装相同字体，或将可再分发字体作为项目资源统一加载。

## 工程结构

每个 Slidev 工程大致包含：

```text
slides.md                 Slidev 入口
package.json              依赖和命令
pnpm-lock.yaml            锁定依赖版本
components/               Vue 舞台、节点、连线、详情与 morph 组件
composables/              镜头与图谱布局逻辑
data/                     知识数据、关系和点击场景
styles/                   全局设计 Token 与样式
public/                   图片、视频、字体等静态资源
content/source.md         原始文章副本
content-analysis.md       内容建模与覆盖检查
storyboard.md             教学顺序和动画分镜
DESIGN_SYSTEM.md          视觉与动效规范
scripts/                  本地辅助脚本
```

`node_modules/`、`dist/`、`.slidev/` 和本地导出结果属于安装或构建产物，不应提交到仓库。

## 参考资料

- [Slidev 官方文档](https://sli.dev/)
- [Slidev 快速开始](https://sli.dev/guide/)
- [Slidev 构建与部署](https://sli.dev/guide/hosting)
- [Slidev 导出](https://sli.dev/guide/exporting)
