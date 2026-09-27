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
初始画面：运算符和函数都能根据输入构造值。
[click]借数理逻辑中的项理解变量、常量与函数应用。
[click]加法运算符是二元运算的中缀写法。
[click]整数除法说明类型改变运算规则。
[click]乘方没有专门运算符；^ 在 C/C++ 中是异或。
[click]基本运算可以复合成新函数，浮点数只是实数的有限精度近似。
[click]从返回类型、参数、函数体和 return 读懂函数定义。
[click]程序函数可以有副作用，因而比纯数学映射更宽。
[click]函数还限制名字的可见范围。
[click]回顾函数：计算、状态和名字是三条线索。
[click]把最小值与最大值打包进结构体，通过 return 返回；结构化绑定取出两个成员。
[click]用引用把调用者变量交给函数直接修改；C 的指针输出参数采用同一思路。
[click]重载按参数列表选择版本，返回类型不能单独区分。
[click]回顾值的构造、封装与复用。
[click]转换问题：这些值如何成为可判断真假的条件？
[click]三组对应关系保持同时可见：值成为关系输入、函数调用属于表达式、类型规则影响布尔转换。
[click]先算出两个值，再把它们交给关系进行比较。
[click]关系连接项，形成原子公式；关系与关系运算都属于原子公式这一分支。
[click]关系运算在 C++ 中产生 bool 值；C 语言用 int 的 0 或 1 表示真假。
[click]原子公式与复合公式并列；逻辑联结词把已有判断组合成复合条件。
[click]短路求值也是程序的执行规则。
[click]C/C++ 用表达式容纳数值、判断、函数调用和赋值。
[click]条件上下文允许整数或指针转换为 bool，但非空不保证指针有效。
[click]恢复整图，回顾构造值、建立判断和表达式之间的连接。
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
