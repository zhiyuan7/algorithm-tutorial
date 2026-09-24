---
theme: default
title: OpenCV：从像素到可检查的结果
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
htmlAttrs:
  lang: zh-CN
---

<div class="cover-stage">
  <p class="cover-eyebrow">薪火培训 · OpenCV 知识图谱</p>
  <h1>从像素到<br>可检查的结果</h1>
  <p class="cover-subtitle">任务定义、信号表示、选择性筛选与逐步调试</p>
  <div class="cover-line"></div>
  <p class="cover-note">使用方向键或空格键推进镜头</p>
</div>

<!--
开场：不要先报算法名称。问观众“要在图像里找什么”，让任务带出方法。
-->

---
layout: full
clicks: 27
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
[click]检测苹果时苹果是前景，检测桌面时角色互换。
[click]背景不是绝对分类，仍然可能有稳定结构。
[click]区分随机噪声、成像退化与前序处理伪影。
[click]灰度像素是标量，彩色像素是通道向量；OpenCV 通常读入 BGR。
[click]HSV 改变的是颜色参数化，不是简单线性换基；红色可能跨 H 的首尾。
[click]高频包括边缘、细节和噪声，不能全部删掉。
[click]把任务角色与信号表达放在同一张图上。
[click]从“什么值得保留”过渡到“如何处理”。
[click]前景与背景导向分离，像素与颜色导向测量，干扰导向清理。
[click]第二张图是一条可选择、可检查的处理链。
[click]已知目标位置时，ROI 裁剪最直接。
[click]灰度和固定阈值是有目的的信息压缩。
[click]局部阈值处理缓慢变化的照明；Gaussian_C 使用加权和。
[click]Otsu 自动选择全局阈值，适合较清晰的灰度分布分离。
[click]颜色差异更强时，使用 HSV 的 H、S、V 联合筛选。
[click]均值、高斯、中值、双边滤波各有代价。
[click]低通会影响真实高频细节，矩形频域截断还可能振铃。
[click]白色为前景时，开运算去小白点，闭运算填小黑洞。
[click]Sobel 与 Laplacian 是离散导数的一阶与二阶视角。
[click]Canny 经过平滑、梯度、NMS、双阈值和滞后连接。
[click]边缘是局部突变，轮廓是有序边界曲线。
[click]面积、周长、外接矩形和多边形给候选打分。
[click]圆度与椭圆拟合是进一步的形状证据。
[click]显示每层中间图，找出错误最先出现的阶段。
[click]把结果画回原图；OpenCV 绘图颜色也按 BGR。
[click]拉远镜头，回看处理链上的分离、清理、提取与检查。
[click]最后记住：任务、表示、筛选、验证形成闭环。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">图像处理的核心问题</p>
  <h1>保留目标证据<br><span>让每一步都能被检查</span></h1>
</div>
