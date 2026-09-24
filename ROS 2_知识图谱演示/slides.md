---
theme: default
title: ROS 2：从通信图到执行模型
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
exportFilename: ROS2_电影式知识图谱
download: false
browserExporter: true
presenter: true
htmlAttrs:
  lang: zh-CN
---

<div class="cover-stage">
  <p class="cover-eyebrow">薪火培训 · ROS 2</p>
  <h1>从通信图<br>到执行模型</h1>
  <p class="cover-subtitle">Node 怎样协作，Callback 又怎样获得 CPU</p>
  <div class="cover-line"></div>
  <p class="cover-note">请使用方向键或空格键推进镜头</p>
</div>

<!--
开场问题：一台机器人同时处理相机、定位、规划与控制。我们如何划分功能，并说明这些功能何时运行？
-->

---
layout: full
clicks: 30
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
[click]Node 把机器人拆成逻辑单元。
[click]Node 不等于 Process。
[click]事件到来，Callback 才 ready。
[click]Timer 周期不等于硬实时保证。
[click]Topic 传递连续数据流。
[click]Service 让一次请求对应一次结果。
[click]Topic、Service、Action 各有时间尺度。
[click]名称、类型、QoS 共同决定连接。
[click]双方 QoS 兼容即可。
[click]端点要理解同一种接口。
[click]匹配的是最终解析后的名称。
[click]从功能拆分到通信契约。
[click]逻辑连接已经建立。
[click]先保留逻辑连接的四个锚点。
[click]把逻辑单元映射到运行时。
[click]进程、约束、就绪与部署出现。
[click]回调 ready 后，谁让它获得 CPU？。
[click]隔离提高韧性，也增加通信成本。
[click]多个 Node 可以共享一个进程。
[click]同进程提供优化条件。
[click]互斥组限制组内并行。
[click]可重入组允许并发。
[click]Executor 把 ready 工作交给线程。
[click]多线程仍受回调组约束。
[click]Wait Set 避免无事件时忙等。
[click]积压时没有全局 FIFO 保证。
[click]分配 Group 后再配置线程调度。
[click]Launch 描述整个机器人的部署。
[click]逻辑结构与运行配置共同决定行为。
[click]从 ready 到 CPU，再到系统启动。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">ROS 2 · 两张知识图谱</p>
  <h1>逻辑图决定谁与谁协作<br><span>运行时决定何时、在哪里执行</span></h1>
</div>
