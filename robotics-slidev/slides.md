---
theme: default
title: 简明机器人学：从坐标到正运动学
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
  <p class="cover-eyebrow">薪火培训 · 简明机器人学</p>
  <h1>从坐标到正运动学</h1>
  <p class="cover-subtitle">如何描述一个刚体的运动，又如何计算机械臂的末端位姿</p>
  <div class="cover-line"></div>
  <p class="cover-note">使用方向键或空格键推进镜头</p>
</div>

<!--
开场提出两个相连的问题：运动如何表示？给定关节变量后，末端位姿如何计算？
-->

---
layout: full
clicks: 26
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
[click]位置先分对象与表达基。
[click]速度还要问相对于哪个参考系。
[click]转动参考系的求导由运输定理联系。
[click]将坐标语义收成第一个地图锚点。
[click]SO(3) 满足正交性与正向保持。
[click]矩阵的列描述一个坐标系的轴。
[click]被动换系只改变坐标数字。
[click]主动旋转使向量真的改变。
[click]左乘和右乘对应空间轴和本体轴。
[click]旋转加平移构成 SE(3)。
[click]位姿、换系、主动位移要区分。
[click]轴角用三个自由度表达旋转。
[click]Rodrigues 公式把指数写成闭式。
[click]螺旋把旋转与平移统一。
[click]欧拉角需要轴序和固定轴或运动轴约定。
[click]拉远，看第一张表示图谱。
[click]把“表示”转为“求解”。
[click]坐标系、旋转、位姿与螺旋分别进入正运动学。
[click]第二张图谱展示 DH、PoE 和共同目标。
[click]正运动学把关节变量映到末端位姿。
[click]DH 逐段连乘相邻坐标系变换。
[click]DH 参数紧凑，但布置坐标系需要仔细。
[click]PoE 把关节轴统一表示在空间系。
[click]PoE 需要零位构型 M 和各螺旋轴 Sᵢ。
[click]两种路线得到同一个 SE(3) 位姿。
[click]最终拉远，看到完整计算路线。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">简明机器人学 · 知识收束</p>
  <h1>先说清坐标与参考系<br><span>再计算关节到末端的运动</span></h1>
</div>
