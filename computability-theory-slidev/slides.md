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
从根问题出发：程序能给出怎样的答案？
[click]先讲可识别：YES 一定被接受，NO 可以一直等待。这时不引入具体难题。
[click]并排比较可判定与可识别。可判定要求 YES 和 NO 都在有限步内回答；包含关系用虚线表达。
[click]接着提出停机问题：能否提前判断任意程序在给定输入上最终会不会停下来？介绍 HALT_TM 的定义。停机包括接受与拒绝。
[click]模拟程序，观察实际发生的停机。这给出一个识别器。
[click]解释长时间等待为何不能当作 NO；这只是直觉，下面才排除所有判定算法。
[click]反设有一个总能结束且总能正确预测停机的 H。
[click]构造 D：H 预测会停机就一直循环，预测不停机就立即停机。
[click]让 D 读取自身编码，两个预测都出错，推出停机问题不可判定。
[click]恢复可计算性整图。停机问题给出了可识别与可判定的严格区别。
[click]暂时收起已讲分支，只保留可判定这个复杂度入口。
[click]从能否保证给出答案转向代价。停机问题放在可判定范围的右侧之外，P 与 NP 在范围之内并列。
[click]输入规模增长时，时间与存储如何增长？
[click]并排介绍 P 与 NP：快速求解，和快速验证 YES 证据。
[click]先讲 P 的多项式时间，幂次必须是固定常数。
[click]用一次扫描找最大值说明线性增长；对应的阈值判定属于 P。
[click]再讲 NP 的多项式长度证据与验证。指数枚举在这里作为寻找证据的有限方法，不能把 NP 理解为“只能指数求解”。
[click]下属引入 SAT。SAT 是 Satisfiability 的缩写，完整名称为 Boolean Satisfiability，中文为布尔可满足性。
[click]给定赋值后，代入公式即可快速验证。说明 SAT 的 NP 完全地位，不展开归约证明。
[click]进一步问 P 是否等于 NP。快速求解蕴含快速验证，但反向是否成立仍未知。
[click]恢复复杂度整图。NP 的证据长度有多项式上界，有限枚举总能结束，所以 NP 包含在可判定类中。
[click]从问题的代价转向系统表达计算的能力。
[click]P、NP 与 SAT 收束成资源视角，转向图灵完备系统。
[click]图灵完备的核心是模拟任意图灵机。
[click]保存状态需要可扩展存储；推动计算需要条件分支和循环或递归。这些构件属于直观构造说明。
[click]把条件分支、循环与递归放在一起：根据状态选择下一步，再按需要重复。次数无固定上限不意味着每次都无限运行。
[click]图灵完备仍然不能判定停机问题。
[click]恢复通用计算整图，回顾能力、代价与边界的区别。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">先问边界，再谈效率</p>
  <h1>能算，是能力<br><span>算得快，是代价</span></h1>
  <p class="end-note">图灵完备也无法判定停机问题</p>
</div>
