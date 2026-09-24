---
theme: default
title: 线性代数：从结构到不变量
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
exportFilename: 线性代数_电影式知识图谱
download: false
browserExporter: true
presenter: true
htmlAttrs:
  lang: zh-CN
---

<div class="cover-stage">
  <p class="cover-eyebrow">薪火培训 · 数学基础</p>
  <h1>从结构到不变量</h1>
  <p class="cover-subtitle">线性代数如何用基与矩阵，把抽象变换变成可计算、可解释的几何</p>
  <div class="cover-line"></div>
  <p class="cover-note">请使用方向键或空格键推进镜头</p>
</div>

<!--
开场先不从行列式或矩阵运算出发，而是追问：线性代数究竟在保存什么？
-->

---
layout: full
clicks: 32
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
[click]代数把具体对象提炼为“对象、运算与规律”。
[click]线性空间用加法和数乘建立内部结构。
[click]子空间无须重新检查八条公理，关键是对两种运算封闭。
[click]张成告诉我们能否到达整个空间。
[click]线性无关排除了生成系统中的冗余。
[click]基同时满足张成与无关，维数记录最小生成规模。
[click]选定基之后，抽象向量获得唯一坐标。
[click]线性映射保持加法与数乘，因而由一组基上的像完全决定。
[click]矩阵的每一列，就是一个基向量的像在值域基下的坐标。
[click]矩阵也可以直接组织方程、图像、协方差与邻接关系。
[click]拉远镜头，看见从抽象结构到坐标表示的完整路径。
[click]现在将视角从“对象是什么”切换到“矩阵如何作用”。
[click]抽象对象、基与映射重组成矩阵世界的两种视角。
[click]固定坐标系时，矩阵表示向量在运动。
[click]固定向量时，矩阵也可以表示坐标系的更换。
[click]矩阵乘法表示映射复合，迹在循环换位下保持不变。
[click]一般换基给出 Q⁻¹AP，同一线性变换的换基则得到相似矩阵。
[click]正交矩阵保持内积、长度和夹角，行列式区分旋转与反射。
[click]矩阵自身也是 mn 维线性空间中的向量。
[click]秩是映射像空间的维数。
[click]满行秩对应满射，满列秩对应单射，方阵满秩才可逆。
[click]SVD 把一般线性映射拆成正交变换、尺度改变与正交变换。
[click]第二张图展示矩阵的作用、坐标视角和能力测量。
[click]接下来不再只问矩阵“怎样算”，而问它“保留什么”。
[click]矩阵的能力与分解重组为体积、方向与能量三类几何问题。
[click]行列式是有向 n 维体积的缩放因子，为零意味着降维与不可逆。
[click]特征向量找到变换下方向不变的一维子空间。
[click]实对称矩阵可以用一组正交特征向量完全对角化。
[click]二次型用 xᵀAx 把向量方向变成标量能量。
[click]反对称部分对 xᵀAx 的贡献始终为零，二次型只看对称部分。
[click]对称矩阵的正定性完全由特征值符号决定，并诱导出 Loewner 偏序。
[click]最后拉远：结构、表示与不变量构成线性代数的统一语言。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">坐标会改变，结构仍然可见</p>
  <h1>选一组好的基<br><span>让变换说出它的几何</span></h1>
</div>
