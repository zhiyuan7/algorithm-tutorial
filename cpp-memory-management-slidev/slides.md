---
theme: default
title: Cpp：内存管理
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
exportFilename: Cpp_内存管理_知识图谱
download: false
browserExporter: true
presenter: true
htmlAttrs:
  lang: zh-CN
---

<div class="cover-stage">
  <p class="cover-eyebrow">薪火培训 · C++ 知识图谱</p>
  <h1>Cpp：内存管理</h1>
  <p class="cover-subtitle">从地址和存储期，走向资源所有权</p>
  <div class="cover-line"></div>
  <p class="cover-note">方向键或空格键推进镜头</p>
</div>

<!--
开场先问：一个对象究竟存在于哪里，又由谁决定它何时消失？
-->

---
layout: full
clicks: 19
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
[click]常见类型大小因平台而异，用 sizeof 查询实际值。
[click]数组同类型元素连续排列，下标对应字节偏移。
[click]结构体成员之间可能有对齐填充。
[click]先建立三种常见存储期的直觉。
[click]局部 static 保留上次调用的状态。
[click]嵌套作用域中，inner 先销毁，outer 继续存在。
[click]new 在运行时按需要创建并初始化对象。
[click]回看局部 static：名字的作用域与对象的存储期不同。
[click]指针变量和它指向的对象分开理解。
[click]恢复存储整图，把问题转向谁负责释放。
[click]自动清理与动态灵活性连接到所有权。
[click]动态对象需要明确的释放责任。
[click]malloc/free 只处理原始存储。
[click]new 返回对应类型的指针，负责初始化和构造。
[click]提前返回与异常可能跳过手写的 delete。
[click]RAII 在管理对象析构时自动释放资源。
[click]unique_ptr 用移动转移唯一所有权。
[click]shared_ptr 在最后一个所有者退出时释放。
[click]恢复所有权整图，回顾从手动分配到自动管理的关系。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">内存管理的最后一个问题</p>
  <h1>先问对象存在多久<br><span>再问谁负责释放它</span></h1>
  <p class="end-note">从手动配对走向明确的所有权</p>
</div>
