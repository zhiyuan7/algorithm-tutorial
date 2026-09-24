---
theme: default
title: Cpp——面向对象
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
  <p class="cover-eyebrow">薪火培训 · C++ 知识图谱</p>
  <h1>面向对象</h1>
  <p class="cover-subtitle">从合法对象，到稳定接口与多态协作</p>
  <div class="cover-line"></div>
  <p class="cover-note">使用方向键或空格键推进镜头</p>
</div>

<!--
先讲机器人案例：函数、坐标、朝向和电量若散落各处，调用者要自行维护状态。对象把责任聚合起来。
-->

---
layout: full
clicks: 25
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
[click]构造函数将存储空间初始化为满足类要求的有效对象。
[click]初始化列表在成员建立时初始化；构造函数体里的赋值是之后的修改。
[click]const、引用和无默认构造的成员需要在建立时处理；真实顺序按声明顺序。
[click]对象离开作用域时，析构函数自动运行。
[click]RAII 把资源责任绑定到对象生命周期，优先使用标准库封装。
[click]默认函数可以显式请求，也可以删除某个不允许的操作。
[click]封装让外部提出操作请求，对象自己管理私有状态。
[click]银行账户的不变量要求检查构造入口和每次取款；原文示例代码没有完整做到。
[click]公开接口的含义稳定，内部可以改变余额的存储方式。
[click]详情收缩后，封装分支仍留在地图里。
[click]第一张图合成：构造、生命周期、封装共同守护合法对象。
[click]现在从单个对象转向多种对象之间的关系。
[click]三条显式映射：封装成为共同契约，生命周期延伸为虚析构，对象行为变成动态分派。
[click]第二张图展示类型关系、接口契约与运行时行为。
[click]公有继承必须表达真实 is-a 和可替代性。
[click]Robot 有 Battery，所以应使用组合。
[click]派生类可复用 move、增加 shoot，但不能绕过基类 private 边界。
[click]非虚函数提供共同接口和固定实现。
[click]虚函数提供默认实现，派生类可 override。
[click]纯虚函数规定具体类必须实现的能力。
[click]通过 Robot& 调用虚函数，实际对象决定执行哪个版本。
[click]工厂函数隐藏具体构造，返回受 unique_ptr 管理的接口对象。
[click]可能通过基类指针销毁对象时，基类析构必须是 virtual。
[click]构造先基类后派生类，析构顺序相反。
[click]拉远镜头，完整看到类型协作的知识结构。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">C++ · 面向对象</p>
  <h1>对象维护合法状态<br><span>接口连接不同类型</span></h1>
</div>
