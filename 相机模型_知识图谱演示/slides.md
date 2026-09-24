---
theme: default
title: 相机模型：从光线到像素
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
exportFilename: 相机模型_电影式知识图谱
browserExporter: true
presenter: true
htmlAttrs:
  lang: zh-CN
---

<div class="cover-stage">
  <p class="cover-eyebrow">薪火培训 · 相机模型</p>
  <h1>从光线到像素</h1>
  <p class="cover-subtitle">空间点落在哪里？传感器怎样把它记录成彩色图像？</p>
  <div class="cover-line"></div>
  <p class="cover-note">使用方向键或空格键推进知识图</p>
</div>

<!--
把本讲分成两个问题：像素位置由几何模型确定，颜色值由光谱采样和图像处理确定。
-->

---
layout: full
clicks: 34
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
[click]世界点是坐标变换的起点。
[click]外参把世界点变到相机坐标系。
[click]针孔模型按深度做透视除法。
[click]真实镜头会偏移理想落点。
[click]内参把归一化坐标映射到像素。像素焦距由物理焦距与像素尺寸相除；1920×1080 图像的主点常靠近 (960,540)，但不一定恰在中心。
[click]把针孔齐次式与畸变流程分开理解。
[click]像素坐标收束成图上的一个节点。
[click]拉远看完整的正向几何链。
[click]保留参数与像素的正向关系。
[click]调换已知与未知，观测开始约束参数。
[click]进入独立的标定与位姿图谱。
[click]标定与 PnP 共享模型，但求解目标不同。
[click]多张图共享 K、D，每张有独立外参。
[click]平面棋盘格把问题转成单应矩阵。
[click]旋转正交产生关于 B 的线性约束。
[click]恢复内参与每张图的初始姿态。
[click]用重投影误差共同精修参数。
[click]已标定相机用 PnP 估计当前位姿。
[click]P3P 从三条视线求三段距离。
[click]候选位姿可能多解，需第四点消歧。
[click]P3P 收缩为位姿估计的一种最小情形。
[click]拉远看标定与位姿估计的分工。
[click]几何链到此给出了像素位置。
[click]保持像素索引，改问那里是什么颜色。
[click]进入独立的颜色形成图谱。
[click]最终图像在每个位置记录 RGB 值。
[click]三通道近似颜色感觉，不等于光谱。
[click]一个感光单元原本只测出一个值。
[click]拜耳阵列让不同位置分别采样颜色。
[click]去马赛克补齐每个位置缺失的通道。
[click]白平衡与颜色校正之后才成为照片。
[click]几何位置与颜色值合成彩色图像。
[click]彩色像素收束为处理链的结果。
[click]拉远回顾光谱到 RGB 的完整链。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">相机模型 · 三张知识图</p>
  <h1>几何决定落点<br><span>采样与处理决定颜色</span></h1>
</div>
