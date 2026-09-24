---
theme: default
title: Knowledge Stage Demo
aspectRatio: 16/9
canvasWidth: 1280
fonts:
  sans: Microsoft YaHei
  provider: none
---

# Knowledge Stage Demo

这个页面用于验证节点展开、收缩、镜头移动和连线绘制。

---
layout: full
clicks: 8
---

<DemoKnowledgeStage :step="$clicks" />
