---
theme: default
title: 集合论：从悖论到无限
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
exportFilename: 集合论_电影式知识图谱
download: false
browserExporter: true
presenter: true
htmlAttrs:
  lang: zh-CN
---

<div class="cover-stage">
  <p class="cover-eyebrow">薪火培训 · 数学基础</p>
  <h1>从悖论到无限</h1>
  <p class="cover-subtitle">集合如何获得存在许可、构造数学结构，并抵达公理的边界</p>
  <div class="cover-line"></div>
  <p class="cover-note">请使用方向键或空格键推进镜头</p>
</div>

<!--
开场先保留最朴素、也最危险的问题：只要能描述一个性质，就一定有对应的集合吗？
-->

---
layout: full
clicks: 33
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
[click]朴素概括把语言直接当成存在许可证。
[click]罗素把这条规则用于自身，矛盾出现。
[click]即使退到“所有集合的集合”，分离仍会重建同一悖论。
[click]ZF/ZFC 把“存在什么”改写成公理化问题。
[click]外延公理回答集合怎样相同。
[click]分离公理限制性质只能在既有集合内筛选。
[click]回看悖论：我们为什么需要明确规则。
[click]这些规则现在重组为数学结构的构造材料。
[click]第二问：无序集合如何长出顺序、运算与数系？
[click]Kuratowski 构造把第一与第二位置编码进集合。
[click]关系成为笛卡尔积的子集。
[click]再加“存在且唯一”，关系就收紧为函数。
[click]明确等价关系的三个条件，以及划分的非空、互斥与覆盖条件。
[click]偏序、全序、良序逐层增加条件。实数的通常次序没有最小元。
[click]Jerry Bona 的英文引言：选择公理、良序定理与佐恩引理的等价性。
[click]从空集出发，后继把所有更小自然数收进当前自然数。
[click]Peano 结构与归纳原则由此出现。
[click]自然数 $n$ 本身是位置集合：一个 $n$ 元组是函数 $f:n\to A$，全部这样的函数组成 $A^n$。三元组允许重复取值，二元组与有序对一一对应。
[click]加法和乘法也不是预装的，而由递归定义。
[click]整数把自然数有序对按形式差取等价类。
[click]有理数再次把不同分数表示压成等价类。
[click]戴德金分割是非空真子集，向下封闭，并且没有最大元。
[click]确界、收敛、区间套、聚点与紧致呈现实数完备性的不同面向。
[click]数系继续扩张时，新能力与旧性质的丢失同时发生。
[click]集合怎样构造了这些熟悉的数学对象。
[click]同一批对象现在从“怎样构造”转向“到底多大”。
[click]第三问：无法数完的集合怎样比较大小？
[click]Cantor 用双射把计数问题改写成对应关系。
[click]先写出整数的双射，再沿对角线枚举可数个可数集合的并，重复项只保留第一次。
[click]对角线构造出任何列表都会漏掉的新实数。
[click]Cantor 定理把对角思想推广到任意幂集，因此不存在最大的无限。
[click]连续统假设追问可数无限与连续统之间是否还存在第三种基数。
[click]最后，连续统假设把集合论带回公理选择：ZFC 无法独自决定它。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">集合论既提供地基，也标出地基的边界</p>
  <h1>从“哪些对象存在”出发<br><span>抵达“哪些命题可被决定”</span></h1>
  <p class="end-note">PARADOX · CONSTRUCTION · INFINITY</p>
</div>
