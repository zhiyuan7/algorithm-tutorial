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
  <p class="cover-subtitle">语法规定什么能写，语义决定它何时为真；量词顺序则决定谁可以依赖谁。</p>
  <div class="cover-line"></div>
  <p class="cover-note">请使用方向键或空格键推进镜头</p>
</div>

<!--
开场先提出整篇文章的主问题：同一串符号为什么能有不同意义，而量词顺序为什么会改变命题强弱？
-->

---
layout: full
clicks: 25
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
[click]同一个 P(a)→Q(a) 可以在不同结构中说完全不同的事情。
[click]Γ ⊢ φ 表示存在形式证明，推导过程只按规则操作符号。
[click]Γ ⊨ φ 表示每个满足 Γ 的模型也满足 φ。
[click]健全性保证证明系统不会推出语义上错误的结论。
[click]完备性保证一阶逻辑中所有语义后承都能被形式证明捕捉。
[click]拉远镜头：语法与语义由健全性和完备性精确对齐。
[click]接下来把语义中的论域与赋值放大，观察量词如何依次选择对象。
[click]结构、赋值与满足关系重组为一张“选择依赖”图。
[click]一阶逻辑的量词只直接量化对象。
[click]全称量词更新赋值并遍历论域。
[click]存在量词寻找一个见证。
[click]∀x∃y 允许 y 依赖已经选定的 x，因此是逐个应对。
[click]∃y∀x 必须先选一个固定 y，再应付所有 x，因此是统一选择。
[click]统一选择一定能给出逐个选择，反过来通常不成立。
[click]普通连续允许 δ 随位置 x 改变，是逐点选择。
[click]一致连续要求对给定 ε 选出一个对所有位置通用的 δ。
[click]x² 在实数上越走越陡，需要的 δ 越来越小，因此不一致连续。
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
