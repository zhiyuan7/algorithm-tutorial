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
clicks: 22
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
先问：这一句执行完，下一步去哪儿？顺序、选择和循环，就是三种基本走法。
[click]没有额外的控制结构时，就按语句出现的次序往下执行。
[click]先定义 a 和 b，再计算 c，最后输出 c。跟着四行代码走一遍，得到 30。
[click]看看两种计算次序：先加后乘得到 9，先乘后加得到 5。变量的状态一步步改变。
[click]到了条件判断处，路径开始分叉；分支执行完，还会继续后面的程序。
[click]分数达到 60 才输出 pass；否则就直接跳过。
[click]加上 else 后，两条路恰好走一条。80 分输出 pass，不会再输出 fail。
[click]85 分不满足第一个条件，但满足第二个，于是输出 B，后面不用再看。
[click]switch 按选项进入 case。这里选 2 就输出 Save，break 防止继续走到后面的 case。
[click]如果同一段操作要反复做，就把它放进循环。看看 while、for 和提前改道的用法。
[click]从 i=1 开始，先判断再输出、更新，回到条件。输出 1 到 5 后，i=6，循环结束。
[click]更新 i 是让循环停下来的关键。漏掉更新就会一直重复；while(true) 也可以用在持续读取传感器的程序中。
[click]for 把起点、继续条件和每轮更新放在一起，读起来就能看出如何从 1 走到 5。
[click]次数明确时，for 往往更清楚；等待状态变化时，while 往往更直接。改写时要留意 continue 后的更新。
[click]跟着完整代码看：i 到 10 时 break，所以输出只有 1 到 9。break 只离开当前这一层循环。
[click]偶数轮遇到 continue 就跳过输出；for 仍然更新 i，于是输出 1、3、5、7、9。
[click]回头看整条路径：顺序往下走，选择走一条支路，循环回到条件。这时把所有分支恢复出来。
[click]这些基本走法可以放在一起。接下来看看，它们怎样组成一个有用的程序。
[click]三种对应关系一起看：顺序组织阶段，选择实现分段，循环完成求和。两侧卡片都保留，方便对照。
[click]用一个数正数的完整例子讲结构嵌套：外层先初始化，再循环，最后输出；循环里读入一个数，用 if 决定是否计数。输入 3、-2、0、7、1，结果是 3。
[click]绝对值根据输入的符号分成两种情况。程序先判断，再返回对应表达式。用 int 时要注意 INT_MIN 的取负边界。
[click]求和就是每轮把一项加入 sum。对照求和公式和代码，看看循环怎样给出每一步计算。很大的 n 需要考虑整型范围。
[click]最后恢复完整关系：结构能嵌套，也能实现分段和求和。数学写出要算什么，程序写出一步步怎样算。
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
