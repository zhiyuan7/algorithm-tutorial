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
  <p class="cover-subtitle">用局部线性近似，连接一元、多元、复变与矩阵求导</p>
  <div class="cover-line"></div>
  <p class="cover-note">方向键或空格键推进镜头</p>
</div>

<!--
先提出问题：如果“很接近”只是一次计算，我们怎样保证任意精度？全篇都在回答局部变化怎样被控制和表达。
-->

---
layout: full
clicks: 38
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
[click]函数在 1 处无定义，附近趋势仍可趋于 2。
[click]ε 先给出，δ 后选择；这是任意精度的控制。
[click]数列极限用 N 表达相同的量词结构。
[click]连续要求极限落在函数值上。
[click]o(1) 是趋零的余量，不是一个固定小数。
[click]导数是差商的极限。
[click]可微将变化拆为线性主部与更高阶的余项。
[click]|x| 在 0 连续却不可导；一元可导与可微等价。
[click]第一张地图收束为可导⇔可微⇒连续。
[click]保持一元地图，准备切换问题框架。
[click]绝对值控制延展为范数与所有路径的控制。
[click]局部线性概念保留，但方向变多。
[click]第二张地图先给全局视角。
[click]联合连续要求从所有路径靠近。
[click]轴向极限都为 0，但斜线极限为 1/2。
[click]偏导每次只看一个坐标方向。
[click]Fréchet 可微要求同一个线性映射近似所有方向。
[click]各输出分量的一阶系数组成 Jacobian。
[click]一阶偏导在邻域存在并在点处连续是可微的充分条件。
[click]复差商可以沿任意复方向趋近。
[click]Cauchy–Riemann 是复线性的必要结构，单点成立不充分。
[click]开集上处处复可导即全纯，进一步有任意阶导数。
[click]回看第二张完整地图，实线性与复线性分支清晰分开。
[click]保留线性映射的定义，准备进入计算语言。
[click]偏导系数与线性映射移动到矩阵化位置。
[click]梯度、Jacobian 和矩阵值微分接收原有概念；Hessian 与规则出现。
[click]第三张地图展现整体计算结构。
[click]标量函数的一阶系数列是梯度。
[click]向量函数的 Jacobian 记录一阶线性响应。
[click]梯度再求 Jacobian 得到 Hessian。
[click]矩阵梯度用迹把逐元素求和压缩表达。
[click]矩阵值函数使用 DF(X)[H] 保留线性算子。
[click]矩阵乘积法则必须保留因子的顺序。
[click]复合函数的 Jacobian 按顺序相乘。
[click]用微分导出线性函数与二次型的梯度。
[click]最小二乘梯度为零得到正规方程，解可能不唯一。
[click]逆矩阵公式来自对 XX⁻¹=I 求微分。
[click]最后拉远：所有公式都是局部变化的语言。
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
