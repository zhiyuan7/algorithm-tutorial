---
theme: default
title: 简明数学分析：从极限到矩阵微积分
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
presenter: true
htmlAttrs:
  lang: zh-CN
---

<div class="cover-stage">
  <p class="cover-eyebrow">薪火培训 · 数学分析</p>
  <h1>从极限到<br>矩阵微积分</h1>
  <p class="cover-subtitle">从局部变化出发，理解极限、微分与矩阵求导</p>
  <div class="cover-line"></div>
  <p class="cover-note">方向键或空格键推进镜头</p>
</div>

<!--
先提出问题：如果“很接近”只是一次计算，我们怎样保证任意精度？全篇都在回答局部变化怎样被控制和表达。
-->

---
layout: full
clicks: 37
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
先从输入的小变化开始，观察输出如何响应。
[click]函数与数列，都在描述趋近。
[click]把“足够接近”说得精确。
[click]附近的趋势接上函数值。
[click]把连续写成一个增量关系。
[click]从变化中提取变化率。
[click]用线性项抓住主要变化。
[click]沿着关系线，连起连续、可导与可微。
[click]多个变量，可以分开看，也可以一起看。
[click]先把其他变量当作参数。
[click]用距离描述整个输入的变化。
[click]固定参数，或按顺序逐次趋近。
[click]整个邻域一起接受精度检验。
[click]每个一元切片都连续。
[click]整个输入趋近时，输出也接上。
[click]逐变量地提取变化率。
[click]让一个线性映射照顾所有小增量。
[click]复数乘法带来更强的要求。
[click]实部与虚部的变化需要相互配合。
[click]开集上的复可导，带来更强的光滑性。
[click]从两种观察方式，走到各自的定义。
[click]向量输入，仍是多元函数的微分。
[click]向量输出，让各个分量并行计算。
[click]系数给出映射，增量带来响应。
[click]标量输出的一阶导，排成梯度。
[click]向量输出的一阶导，排成 Jacobian。
[click]再求一次导数，得到 Hessian。
[click]矩阵输入的梯度，保持输入的形状。
[click]矩阵输出，用线性算子接收增量。
[click]展开微分，保留矩阵乘法的次序。
[click]内层变化，继续传到外层。
[click]利用线性与循环性，整理迹的微分。
[click]把微分整理好，梯度就能读出来。
[click]用平方范数，完整走一遍推导。
[click]线性函数与二次型，先微分再读梯度。
[click]残差的平方，连接到最小二乘。
[click]从恒等式，推出逆矩阵的微分。
[click]分类、规则与例子，都在表达局部变化。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">从定义到计算</p>
  <h1>极限让变化可控<br><span>微分让变化可算</span></h1>
  <p class="end-note">同一个思想，穿过不同维度</p>
</div>
