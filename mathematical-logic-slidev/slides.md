---
theme: default
title: 数理逻辑：从符号到模型，从量词到一致性
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
download: false
browserExporter: true
presenter: true
htmlAttrs:
  lang: zh-CN
---

<div class="cover-stage">
  <p class="cover-eyebrow">薪火培训 · 数理逻辑</p>
  <h1>从符号到模型<br>从量词到一致性</h1>
  <p class="cover-subtitle">先读懂公式怎样写、怎样解释，再看量词的先后顺序如何改变意思。</p>
  <div class="cover-line"></div>
  <p class="cover-note">请使用方向键或空格键推进镜头</p>
</div>

<!--
开场先提出整篇文章的主问题：同一串符号为什么能有不同意义，而量词顺序为什么会改变命题强弱？
-->

---
layout: full
clicks: 24
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
[click]先看同一个公式：结构没变，解释一换，命题内容就变了。
[click]语法的第一层是符号表，它只规定符号扮演什么角色。
[click]项用来指称对象；关系式不是项，而是在陈述对象之间的关系。
[click]原子公式从项与关系产生，复杂公式再由逻辑联结词递归构造。
[click]语法合法不等于命题为真，就像程序通过 grammar 也可能运行失败。
[click]语义从非空论域、符号解释与变量赋值开始。
[click]结构不只是一个集合，还要把常元、函数和关系解释到论域上。
[click]同一个 $P(a)\to Q(a)$ 可以在不同结构中说完全不同的事情。
[click]$\Gamma\vdash\varphi$ 表示存在形式证明，推导过程只按规则操作符号。
[click]$\Gamma\models\varphi$ 表示每个满足 Γ 的模型也满足 φ。
[click]健全性从可证明性指向逻辑后承：能证明的结论在满足前提的模型中都成立。
[click]完备性从逻辑后承指向可证明性：经典一阶逻辑中的所有语义后承都能给出证明。
[click]拉远镜头：可证明性与逻辑后承通过健全性、完备性联系起来。
[click]结构、赋值与满足关系帮助我们理解量词的选择顺序。
[click]一阶逻辑的量词只直接量化对象。
[click]全称量词更新赋值并遍历论域。
[click]存在量词寻找一个见证。
[click]$\forall x\exists y$ 允许 y 依赖已经选定的 x，因此是逐个应对。
[click]$\exists y\forall x$ 必须先选一个固定 y，再应付所有 x，因此是统一选择。
[click]统一选择一定能给出逐个选择，反过来通常不成立。
[click]普通连续允许 δ 随位置 x 改变，是逐点选择。
[click]一致连续要求对给定 ε 选出一个对所有位置通用的 δ。
[click]$x^2$ 的反例取位移 $\delta/2$，满足严格的距离条件，但函数值差仍能超过固定精度。
[click]最后拉远：量词顺序把一句话变成一张依赖关系图。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">读懂逻辑，就是同时看见结构与解释</p>
  <h1>符号规定推理的形状<br><span>模型与量词决定它说了什么</span></h1>
</div>
