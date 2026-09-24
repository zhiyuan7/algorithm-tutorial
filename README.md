# 薪火培训学习资料

本仓库包含 14 篇中文教程，以及各教程对应的 Slidev 交互演示。演示源码位于下表链接的工程目录。

## 教程与演示

| 教程 | Slidev 演示 |
| --- | --- |
| [总纲](./总纲.md) | [总纲知识图谱演示](./course-overview-slidev/) |
| [Cpp——面向对象](./Cpp——面向对象.md) | [面向对象知识图谱演示](./cpp-oop-slidev/) |
| [Cpp——内存管理](./Cpp——内存管理.md) | [内存管理知识图谱演示](./cpp-memory-management-slidev/) |
| [Cpp——运算与函数](./Cpp——运算与函数.md) | [运算与函数知识图谱演示](./cpp-operations-functions-slidev/) |
| [Cpp——执行顺序](./Cpp——执行顺序.md) | [执行顺序知识图谱演示](./cpp-execution-order-slidev/) |
| [集合论](./集合论.md) | [集合论知识图谱演示](./set-theory-slidev/) |
| [数理逻辑](./数理逻辑.md) | [数理逻辑知识图谱演示](./mathematical-logic-slidev/) |
| [线性代数](./线性代数.md) | [线性代数知识图谱演示](./linear-algebra-slidev/) |
| [简明数学分析](./简明数学分析.md) | [简明数学分析知识图谱演示](./mathematical-analysis-slidev/) |
| [可计算理论](./可计算理论.md) | [可计算理论知识图谱演示](./computability-theory-slidev/) |
| [简明机器人学](./简明机器人学.md) | [简明机器人学知识图谱演示](./robotics-slidev/) |
| [相机模型](./相机模型.md) | [相机模型知识图谱演示](./camera-model-slidev/) |
| [OpenCV](./OpenCV.md) | [OpenCV 知识图谱演示](./opencv-slidev/) |
| [ROS 2](./ROS%202.md) | [ROS 2 知识图谱演示](./ros2-slidev/) |

## 运行演示

需要 Node.js 22.12.0 或更新版本，以及 pnpm。从仓库根目录进入要运行的工程，例如：

```bash
cd course-overview-slidev
pnpm install --frozen-lockfile
pnpm run dev
```

在浏览器中打开终端显示的地址。其他演示的运行方式相同，具体内容和补充说明见各工程的 README。

## 检查与构建

在演示工程目录中运行：

```bash
pnpm run typecheck
pnpm run build
```

构建结果位于当前工程的 `dist/` 目录。`node_modules/`、`dist/` 和 `.slidev/` 是本地安装或生成的文件，不应提交到仓库。
