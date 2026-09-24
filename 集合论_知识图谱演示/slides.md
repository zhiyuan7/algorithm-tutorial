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
clicks: 32
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
[click]其余公理提供空集、配对、并、幂集、替换与无穷等受控动作。
[click]第一张图完成：危机被转化为明确规则。
[click]这些规则现在重组为数学结构的构造材料。
[click]第二问：无序集合如何长出顺序、运算与数系？
[click]Kuratowski 构造把第一与第二位置编码进集合。
[click]关系成为笛卡尔积的子集。
[click]再加“存在且唯一”，关系就收紧为函数。
[click]等价关系把集合切成等价类，也为商构造提供语言。
[click]偏序、全序、良序只是对关系逐层增加条件。
[click]从空集出发，后继把所有更小自然数收进当前自然数。
[click]Peano 结构与归纳原则由此出现。
[click]加法和乘法也不是预装的，而由递归定义。
[click]整数把自然数有序对按形式差取等价类。
[click]有理数再次把不同分数表示压成等价类。
[click]Dedekind 分割用有理数集合填补有理数轴的空隙。
[click]确界、收敛、区间套、聚点与紧致呈现实数完备性的不同面向。
[click]数系继续扩张时，新能力与旧性质的丢失同时发生。
[click]第二张图完成：集合成为构造数学对象的通用材料。
[click]同一批对象现在从“怎样构造”转向“到底多大”。
[click]第三问：无法数完的集合怎样比较大小？
[click]Cantor 用双射把计数问题改写成对应关系。
[click]整数和有理数虽然更稠密，仍然与自然数一样可数。
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
