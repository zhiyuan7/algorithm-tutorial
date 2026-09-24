# 薪火培训学习资料

本仓库整理了 C/C++、数学基础、机器人学、ROS 2、计算机视觉与理论计算机科学等方向的中文学习材料，并为全部 14 篇教程提供对应的交互式 Slidev 知识图谱演示。

## 内容导航

### Markdown 教程

- C/C++：`Cpp——面向对象.md`、`Cpp——内存管理.md`、`Cpp——运算与函数.md`、`Cpp——执行顺序.md`
- 数学与理论计算机科学：`集合论.md`、`数理逻辑.md`、`线性代数.md`、`简明数学分析.md`、`可计算理论.md`
- 机器人与视觉：`简明机器人学.md`、`相机模型.md`、`OpenCV.md`、`ROS 2.md`
- 课程总览：`总纲.md`

### Slidev 交互演示

| Markdown 教程 | Slidev 工程 | `pnpm run dev` 端口 |
| --- | --- | --- |
| [总纲](./总纲.md) | [总纲知识图谱演示](./总纲_知识图谱演示/) | 3030 |
| [Cpp——面向对象](./Cpp——面向对象.md) | [面向对象知识图谱演示](./Cpp——面向对象_知识图谱演示/) | 3060 |
| [Cpp——内存管理](./Cpp——内存管理.md) | [内存管理知识图谱演示](./Cpp——内存管理_知识图谱演示/) | 3045 |
| [Cpp——运算与函数](./Cpp——运算与函数.md) | [运算与函数知识图谱演示](./Cpp——运算与函数_知识图谱演示/) | 3030 |
| [Cpp——执行顺序](./Cpp——执行顺序.md) | [执行顺序知识图谱演示](./Cpp——执行顺序_知识图谱演示/) | 3030 |
| [集合论](./集合论.md) | [集合论知识图谱演示](./集合论_知识图谱演示/) | 3030 |
| [数理逻辑](./数理逻辑.md) | [数理逻辑知识图谱演示](./数理逻辑_知识图谱演示/) | 3030 |
| [线性代数](./线性代数.md) | [线性代数知识图谱演示](./线性代数_知识图谱演示/) | 3030 |
| [简明数学分析](./简明数学分析.md) | [简明数学分析知识图谱演示](./简明数学分析_知识图谱演示/) | 3047 |
| [可计算理论](./可计算理论.md) | [可计算理论知识图谱演示](./可计算理论_知识图谱演示/) | 3030 |
| [简明机器人学](./简明机器人学.md) | [简明机器人学知识图谱演示](./简明机器人学_知识图谱演示/) | 3047 |
| [相机模型](./相机模型.md) | [相机模型知识图谱演示](./相机模型_知识图谱演示/) | 3038 |
| [OpenCV](./OpenCV.md) | [OpenCV 知识图谱演示](./OpenCV_知识图谱演示/) | 3032 |
| [ROS 2](./ROS%202.md) | [ROS 2 知识图谱演示](./ROS%202_知识图谱演示/) | 3030 |

这些演示使用 Slidev、Vue 和 SVG 展示知识图谱。点击推进时，镜头会在节点、分支和全图之间移动，并按教学顺序建立关系。各工程的内容与运行细节见其 README。

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

以上总纲工程的默认地址：

- 演示：<http://localhost:3030/>
- 演讲者模式：<http://localhost:3030/presenter/>
- 总览：<http://localhost:3030/overview/>
- 浏览器导出器：<http://localhost:3030/export/>

运行其他演示时，进入上表对应的工程目录并执行同样的安装和启动命令。访问地址中的端口以上表为准；同时运行多个使用相同端口的工程时，需要为其中一个指定其他端口。

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
