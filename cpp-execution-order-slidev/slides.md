---
theme: default
title: Cpp——执行顺序
author: 薪火培训
aspectRatio: 16/9
canvasWidth: 1280
colorSchema: light
transition: fade
fonts:
  sans: Microsoft YaHei
  serif: SimSun
  mono: Consolas
  provider: none
presenter: true
htmlAttrs:
  lang: zh-CN
---

<div class="cover-stage">
  <p class="cover-eyebrow">薪火培训 · C++ 基础</p>
  <h1>执行顺序</h1>
  <p class="cover-subtitle">顺序、选择、循环如何组成程序</p>
  <div class="cover-line"></div>
  <p class="cover-note">方向键或空格键推进镜头</p>
</div>

<!--
开场：数学式子告诉我们输入和输出；这一讲要追踪程序中每一步实际走过的路径。
-->

---
layout: full
clicks: 28
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
初始画面：提出“当前语句结束之后，程序下一步去哪里？”
[click]先看顺序执行：没有额外控制结构时，语句按次序推进。
[click]定义 a 和 b、计算 c、输出 c，组成一条时间链。
[click]调换更新语句会把结果 9 改成 5，因为程序状态逐步改变。
[click]把顺序分支收起，记住次序与状态两个要点。
[click]选择执行让直线分叉，但分支最终会回到后续程序。
[click]简单 if：条件为真才执行，大括号内语句在假时被跳过。
[click]if...else：两个分支恰好执行其中一个。
[click]else if 自上而下找第一个成立条件，85 分的例子会输出 B。
[click]switch 适合离散值；说明 case 中 break 的作用。
[click]收起选择分支：单路、二路、多路都是条件分派。
[click]循环把重复操作压缩为条件判断与回跳。
[click]沿着 while 的路径走一遍：判断、执行、回跳、再判断。
[click]状态更新决定循环是否终止；无限循环既可能是错误也可能有意设计。
[click]for 把初始化、条件和更新放在同一处。
[click]for 与 while 能表达相近的迭代；机械改写时要留意 continue 的更新语义。
[click]break 立即离开当前循环，例子只输出 1 到 9。
[click]continue 跳过本轮剩余语句，例子只输出奇数。
[click]收起循环分支：条件回跳、三段结构和局部改道。
[click]拉远，比较顺序、选择、循环的三种路径形状。
[click]转向新问题：这些局部结构如何嵌套成完整程序？
[click]三条语义映射：顺序变成外层次序，选择对应分段，循环对应求和。
[click]先看第二张图的全貌，建立程序组合与数学对应的方位。
[click]完整程序仍按初始化、处理、输出的外层顺序运行。
[click]循环内部还能嵌入选择，构成更复杂的算法。
[click]在五个输入的例子里，循环管重复，if 管计数条件。
[click]绝对值的分段定义对应条件分支；说明 INT_MIN 边界。
[click]有限求和对应循环中的逐项累积；说明 int 溢出边界。
[click]最后拉远：数学描述结果，程序写出产生结果的执行路径。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">执行顺序</p>
  <h1>控制路径<br><span>让计算发生</span></h1>
  <p class="end-note">顺序推进 · 条件分流 · 循环回跳</p>
</div>
