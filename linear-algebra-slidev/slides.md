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
clicks: 35
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
开始先提出空间、表示与不变量的主线。
[click]从加法和乘法认识群、环与域。
[click]向量空间需要向量加法、标量乘法和八条公理。
[click]非空子集对加法与数乘封闭，就能继承向量空间结构。
[click]张成空间收集所有线性组合。
[click]线性无关意味着没有多余的生成向量。
[click]基既够用又无冗余，维数是基中向量的个数。
[click]选定基，向量就得到唯一坐标。
[click]坐标向量可以看成有限指标集上的函数；抽象空间通过基与这个函数空间同构。
[click]保持线性组合，所以给出基向量的像就确定整个映射。
[click]第 j 列是 T(b_j) 在目标基下的坐标；这些像不一定构成基。
[click]展开 T(v)，得到输出坐标 y_i 是 a_ij x_j 的和，也就是矩阵乘向量。
[click]矩阵也常用来整理方程、图像与关系数据。
[click]回看从运算结构到坐标计算的路径。
[click]将对象、基与映射转成对象在动、坐标系在变两种视角。
[click]主动变换固定坐标系，看向量运动；先只展示这个概念。
[click]被动换基固定向量，在不同坐标之间翻译。
[click]复合与迹和主动变换并列：先 T 再 S，对应 BA。
[click]输入输出分别换基得到 Q^{-1}AP，同步换基得到相似矩阵。
[click]正交矩阵保留内积、长度与夹角。
[click]矩阵自身也构成一个向量空间。
[click]原本相关的向量仍相关，无关组可能变相关；独立信息只能减少。
[click]单射等价于零空间只有零，也等价于矩阵的列线性无关。
[click]再定义秩为列空间维数；行化简的主元个数给出行秩等于列秩。
[click]秩数独立方向，奇异值描述每个方向的强弱，非零奇异值个数就是秩。
[click]截断 SVD 保留较强方向，尾部奇异值平方和量化舍弃误差。
[click]把作用、观察框架与传递信息的能力连起来。
[click]接着看变换留下的体积、方向与能量。
[click]把矩阵的作用转向三个几何问题。
[click]行列式描述体积缩放和定向。
[click]特征向量留在原来的直线上。
[click]实对称矩阵有一组标准正交特征基。
[click]二次型给每个向量一个标量能量。
[click]反对称部分取转置后成为相反数，所以对二次型没有贡献。
[click]特征值符号决定正定性，并给出 Loewner 偏序。
[click]拉远回看：空间、表示与不变量是一条相连的思路。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">坐标会改变，结构仍然可见</p>
  <h1>选一组好的基<br><span>让变换说出它的几何</span></h1>
</div>
