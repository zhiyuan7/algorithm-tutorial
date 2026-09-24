# Storyboard · 相机模型

每一行对应一次点击状态。详情状态聚焦当前节点及邻接上下文；总览状态 fit 全图。变形的 0/1/2 三拍分别保留源、移动并改写映射、稳定目标。

| Step | Active map | Focus | Camera framing | Visible context | Narration goal |
|---:|---|---|---|---|---|
| 0 | geometry | g-root | node | 已讲过的节点与流程边 | 一个三维点怎样变成像素 |
| 1 | geometry | g-world | node | 已讲过的节点与流程边 | 先明确被观察的三维点 |
| 2 | geometry | g-extrinsic | node | 已讲过的节点与流程边 | 把世界点变到相机眼中 |
| 3 | geometry | g-perspective | node | 已讲过的节点与流程边 | 透视除法产生归一化坐标 |
| 4 | geometry | g-distortion | node | 已讲过的节点与流程边 | 畸变把理想位置推开 |
| 5 | geometry | g-intrinsic | node | 已讲过的节点与流程边 | 把归一化坐标换成像素 |
| 6 | geometry | g-pixel | node | 已讲过的节点与流程边 | 分清齐次式与真实畸变链 |
| 7 | geometry | g-pixel | all | 节点收缩，全图保留 | 像素坐标收束为图上的一个结果 |
| 8 | geometry | 整图 | all | 全部节点与关系 | 外参、投影、畸变、内参组成正向链 |
| 9 | morph | inverse / 0 | all | 保留来源概念 | 保留正向投影：参数走向像素 |
| 10 | morph | inverse / 1 | all | 移动映射并换标签 | 交换已知与未知：像素约束参数 |
| 11 | morph | inverse / 2 | all | 目标概念稳定 | 进入标定与位姿估计 |
| 12 | inference | i-root | node | 已讲过的节点与流程边 | 同一模型，未知量改变 |
| 13 | inference | i-target | node | 已讲过的节点与流程边 | 求共同的 K,D 和逐图姿态 |
| 14 | inference | i-homography | node | 已讲过的节点与流程边 | 一个姿态给出一个 H |
| 15 | inference | i-constraint | node | 已讲过的节点与流程边 | 旋转正交让内参可解 |
| 16 | inference | i-recover | node | 已讲过的节点与流程边 | 从 B 回到 K、R、t |
| 17 | inference | i-refine | node | 已讲过的节点与流程边 | 直接压低重投影误差 |
| 18 | inference | i-pnp | node | 已讲过的节点与流程边 | 已知 K,D 后求 R,t |
| 19 | inference | i-p3p | node | 已讲过的节点与流程边 | 三条视线与三个未知深度 |
| 20 | inference | i-p3p | node | 已讲过的节点与流程边 | 多个候选需额外点消歧 |
| 21 | inference | i-p3p | all | 节点收缩，全图保留 | P3P 是位姿估计的一个最小情形 |
| 22 | inference | 整图 | all | 全部节点与关系 | 标定和 PnP 是两种反问题 |
| 23 | morph | color / 0 | all | 保留来源概念 | 几何问题已给出像素位置 |
| 24 | morph | color / 1 | all | 移动映射并换标签 | 保持 (u,v)，转而追问记录值 |
| 25 | morph | color / 2 | all | 目标概念稳定 | 进入光谱、采样与 RGB 重建 |
| 26 | color | c-root | node | 已讲过的节点与流程边 | 像素位置还需要颜色值 |
| 27 | color | c-spectrum | node | 已讲过的节点与流程边 | RGB 近似颜色感觉 |
| 28 | color | c-sensor | node | 已讲过的节点与流程边 | 每个感光单元先读出一个数 |
| 29 | color | c-cfa | node | 已讲过的节点与流程边 | 拜耳阵列分色采样 |
| 30 | color | c-demosaic | node | 已讲过的节点与流程边 | 邻域信息补齐两条颜色通道 |
| 31 | color | c-process | node | 已讲过的节点与流程边 | 从相机 RGB 变到可显示图像 |
| 32 | color | c-image | node | 已讲过的节点与流程边 | 位置与颜色合成彩色图像 |
| 33 | color | c-image | all | 节点收缩，全图保留 | 彩色像素成为完整处理链的结果 |
| 34 | color | 整图 | all | 全部节点与关系 | 从光谱到最终 RGB 图像 |
