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
clicks: 21
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
[click]变量名背后，最终是某段内存中的二进制位。
[click]数组连续排列；结构体布局还要考虑对齐。
[click]大小和生存范围已知的对象，不需要每次动态分配。
[click]作用域回答名字在哪里可见，存储期回答对象存在多久。
[click]局部 static 名字局部可见，对象却持续到程序结束。
[click]普通局部对象随作用域退出而销毁。
[click]运行时规模和跨作用域生命期带来动态存储。
[click]指针保存地址，但指针本身也有自己的存储期。
[click]收拢三种存储期。
[click]拉远看第一张完整图谱。
[click]问题转向动态资源由谁释放。
[click]保留自动清理和动态灵活性，转入所有权图谱。
[click]动态对象不会随着一个普通指针离开作用域而自动消失。
[click]C 的 malloc/free 只处理原始字节空间。
[click]C++ 的 new/delete 增加对象构造与析构。
[click]手动配对在提前返回和异常路径上容易遗漏。
[click]RAII 把资源责任绑定到管理者对象。
[click]unique_ptr 用移动表达唯一所有权。
[click]shared_ptr 以引用计数表达共享所有权。
[click]两类智能指针汇入所有权模型。
[click]拉远看完整图谱：默认独占，确实需要时共享。
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
