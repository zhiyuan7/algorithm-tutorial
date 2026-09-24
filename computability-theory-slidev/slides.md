---
theme: default
title: 可计算理论：能力、代价与边界
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
download: false
browserExporter: true
htmlAttrs:
  lang: zh-CN
---

<div class="cover-stage">
  <p class="cover-eyebrow">薪火培训 · 理论计算机科学</p>
  <h1>可计算理论</h1>
  <p class="cover-subtitle">从“能不能算”，走到“要算多久”与“机器能表达什么”</p>
  <div class="cover-line"></div>
  <p class="cover-note">请使用方向键或空格键推进镜头</p>
</div>

<!--
开场先建立三个问题的区分：可计算性、复杂度和计算系统的通用能力。
-->

---
layout: full
clicks: 27
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
[click]可识别只承诺 YES 实例最终被接受。
[click]可判定要求 YES 与 NO 都在有限时间内给出答案。
[click]两者形成严格包含，而不是同义词。
[click]A_TM 可以靠模拟识别。
[click]识别 A_TM 时，只有真正接受才接受；仅仅停机对应的是 HALT。
[click]假设存在 A_TM 判定器 H。
[click]构造 D，让它对 H 的预测采取相反行为。
[click]把 D 的编码交给 D，自指产生矛盾。
[click]拉远镜头，看到可计算性的完整边界。
[click]问题一旦可判定，下一问才是资源增长。
[click]从“是否终止”变形成“终止需要多少资源”。
[click]多项式时间由固定常数次幂刻画。
[click]找最大值只需线性扫描。
[click]指数枚举会随输入规模迅速失控，但仍会结束。
[click]NP 的 YES 实例有可多项式时间验证的证据。
[click]SAT 的赋值就是证据。
[click]P 中能快速求解的问题当然也能快速验证。
[click]P 是否等于 NP 仍是开放问题。
[click]NP 可通过有限证据枚举判定，因此 NP 包含在 Decidable 中。
[click]拉远镜头，完整看到 P、NP 与 Decidable 的包含关系。
[click]现在从问题的资源分类转向计算系统本身的表达能力。
[click]复杂度地图变形为图灵完备系统的能力结构。
[click]图灵完备的核心是能够模拟任意图灵机。
[click]条件分支、可扩展存储与无固定上限的循环共同支持通用计算。
[click]阶乘展示了数据规模和步骤数为何都不能预先设死上限。
[click]图灵完备只覆盖可计算任务，不能越过不可判定边界。
[click]最终把能力、代价与边界放回同一张认识框架。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">先问边界，再谈效率</p>
  <h1>能算，是能力<br><span>算得快，是代价</span></h1>
  <p class="end-note">图灵完备不会让不可计算的问题消失</p>
</div>
