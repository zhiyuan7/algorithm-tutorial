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
clicks: 24
class: knowledge-slide
---

<KnowledgeStage :step="$clicks" />

<!--
开场：让机器人自己管理坐标、电量和移动操作。
[click]不声明构造函数，编译器会隐式声明默认构造；自己声明后就不再自动提供无参版本。不是先有一个函数再覆盖它。
[click]初始化列表直接构造成员，避免类成员先默认构造再赋值的额外工作；简单类型优化后未必有速度区别。
[click]引用、const 和没有默认构造的成员要在建立时处理。顺序由声明顺序决定。
[click]局部对象离开作用域，析构自动收尾。
[click]RAII 让资源跟随对象生命周期；优先使用标准库类型。
[click]= default 请求默认实现，= delete 禁止指定调用。
[click]封装的两个原因：复用过程，以及控制接口、方便扩展。
[click]把检查金额和修改余额封装成取款过程，所有调用者复用同一套步骤。
[click]外部依赖稳定操作，内部可以更换余额表示、添加冻结余额。
[click]收起详情，只回顾封装的两种用途。
[click]恢复整图：构造、生命周期、封装怎样一起照顾对象。
[click]转到类型协作：选择关系，声明接口，调用不同的实现。
[click]把继承与组合放在一起辨别：步兵是一种机器人，机器人有一块电池。
[click]派生类沿用 move，再增加 shoot；仍尊重基类 private 边界。
[click]函数契约归在继承下，这里先看非虚函数的声明形式。
[click]普通虚函数加 virtual，派生类重写加 override；不在这里展开内部机制。
[click]纯虚函数末尾加 = 0，具体派生类提供实现。
[click]通过基类引用或指针调用虚函数，实际对象决定行为；栈上对象同样可以多态。
[click]常见单继承实现：对象中的 vptr 指向相应虚函数表，表内有虚函数实现入口。同类对象通常共享表。
[click]沿 vptr 找表，再取 attack 的表项并调用。具体 ABI 布局可能不同；编译器也可能去虚化。
[click]工厂隐藏创建细节，unique_ptr 管理生命周期。
[click]通过基类指针 delete 派生对象，需要虚析构才能正确清理。
[click]构造先基类后派生类，析构反过来。
[click]恢复整图，回顾继承下的函数声明与动态分派下的实现、创建和销毁。
-->

---
layout: full
class: end-slide
---

<div class="end-stage">
  <p class="end-kicker">C++ · 面向对象</p>
  <h1>对象维护合法状态<br><span>接口连接不同类型</span></h1>
</div>
