---
theme: default
title: Cpp——运算与函数
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
  <h1>运算与函数</h1>
  <p class="cover-subtitle">从构造值，到构造判断</p>
  <div class="cover-line"></div>
  <p class="cover-note">方向键或空格键推进镜头</p>
</div>

<!--
开场：先请听众把 a+b 与 add(a,b) 放在一起观察。它们的共同点是根据输入得到一个值。
-->

---
layout: full
clicks: 23
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
初始画面：运算符和函数都能构造值。这是第一张图谱的问题。
[click]借数理逻辑中的项理解变量、常量与函数应用。
[click]加法运算符是二元运算的中缀写法。
[click]整数除法说明类型改变运算规则。
[click]乘方没有专门运算符；^ 在 C/C++ 中是异或。
[click]基本运算可以复合成新函数，浮点数只是实数的有限精度近似。
[click]从返回类型、参数、函数体和 return 读懂函数定义。
[click]程序函数可以有副作用，因而比纯数学映射更宽。
[click]函数还限制名字的可见范围。
[click]函数分支收缩为一组可复用的概念，保留计算、状态和名字三条线索。
[click]多值输出有聚合返回和输出参数两种思路。
[click]重载按参数列表选择版本，返回类型不能单独区分。
[click]拉远，看见值的构造、封装与复用。
[click]转换问题：这些值如何成为可判断真假的条件？
[click]三条语义映射带我们从值的图谱进入判断的图谱。
[click]先看第二张图谱全貌：关系形成判断，逻辑组合判断，语言用表达式统一这些结构。
[click]运算表达式先为关系提供操作数。
[click]关系把两个项连接成原子判断。
[click]关系运算在 C++ 中产生 bool 值；C 语言用 int 的 0 或 1 表示真假。
[click]&&、||、! 把简单判断组合起来。
[click]短路求值也是程序的执行规则。
[click]C/C++ 用表达式这个语法概念容纳数值、判断、函数调用和赋值。
[click]条件上下文允许整数或指针转换为 bool，但非空不保证指针有效。
[click]拉远，总结两张图谱的连接：构造值、建立判断、统一为表达式。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">运算与函数</p>
  <h1>先构造值<br><span>再构造判断</span></h1>
  <p class="end-note">类型决定规则 · 表达式连接两者</p>
</div>
