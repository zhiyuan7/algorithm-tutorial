import type { KnowledgeMapData, KnowledgeNodeData } from './types'

const taskRoot: KnowledgeNodeData = {
  id: 'task', title: '任务决定信息', subtitle: 'Task → Signal', summary: '目标先于算法；有用与无关由任务规定', accent: '#13254F',
  details: { opening: { eyebrow: '核心问题', statement: '面对同一张图像，我们究竟想保留什么？', explanation: '找苹果时苹果是前景，找桌面时桌面是前景。处理流程必须从目标定义出发。' } },
  children: [
    { id: 'foreground', title: '前景', subtitle: 'Foreground', summary: '当前任务要寻找或测量的目标', accent: '#163F6F', details: {
      role: { eyebrow: '任务角色', statement: '前景不是物体的固有属性，而是当前任务关心的对象。', example: '检测苹果：苹果是前景；检测桌面：桌面成为前景。', bullets: ['保留位置、颜色、轮廓和形状中真正有用的线索', '任务改变时，前景的定义也会改变'] },
    } },
    { id: 'background', title: '背景', subtitle: 'Background', summary: '当前任务不作为主要目标的结构', accent: '#7D8981', details: {
      role: { eyebrow: '任务角色', statement: '背景是相对于目标定义的其他区域，不等于“没有信息”。', explanation: '桌面和墙壁可作为苹果检测的背景；若研究桌面，它们的角色会重排。', bullets: ['背景与前景都可能具有稳定空间结构', '能否分离取决于位置、亮度、颜色或边界差异'] },
    } },
    { id: 'interference', title: '噪声与退化', subtitle: 'Noise · Degradation', summary: '随机扰动、模糊及处理伪影干扰判断', accent: '#B5855F', details: {
      sources: { eyebrow: '干扰来源', statement: '随机噪声、成像退化和处理伪影需要区分。', explanation: '热噪声和椒盐噪声是随机扰动；失焦、运动模糊及 JPEG 块效应属于不同类型的退化。', bullets: ['采集时可能引入噪声', '重采样、压缩、过强锐化也可能留下伪影', '清理过度会抹掉目标细节'] },
    } },
    { id: 'pixel', title: '像素信号', subtitle: 'I(x, y)', summary: '图像是二维离散网格上的数值函数', accent: '#396D80', details: {
      function: { eyebrow: '信号表达', statement: '灰度图每个位置是一个数；彩色图每个位置是一组通道值。', formula: '灰度 I(x,y) ∈ [0,255]   ·   彩色 I(x,y) = (B,G,R)', explanation: 'OpenCV 读取彩色图像时通常按 BGR 顺序存储。' },
    } },
    { id: 'color', title: '颜色坐标', subtitle: 'BGR · HSV · Lab', summary: '选择更能暴露目标差异的颜色参数化', accent: '#624F6B', details: {
      coordinates: { eyebrow: '颜色表达', statement: 'HSV 将色相、饱和度、明度分开，常便于做颜色掩膜。', formula: 'hsv = cv.cvtColor(img, cv.COLOR_BGR2HSV)', explanation: 'RGB/BGR 到 HSV 包含最大值、最小值、除法和分段处理，并非简单的线性换基。uint8 反复转换也可能产生量化误差。', footnote: '8 位 OpenCV HSV 的 H 通常为 0–179；红色跨两端，完整筛选需要两段范围。' },
    } },
    { id: 'frequency', title: '空间频率', subtitle: 'Spatial Frequency', summary: '观察图像变化的尺度，而非逐点位置', accent: '#396D80', details: {
      spectrum: { eyebrow: '空间域 → 频率域', statement: '低频对应缓慢变化，高频对应快速变化。', formula: 'F(u,v) = Σx Σy f(x,y) · exp[-j2π(ux/M + vy/N)]', explanation: '平坦区域多为低频；边缘、文字、细纹理与随机噪声都可能含高频。', footnote: '高频不等于噪声；一刀切低通会让真实边缘变模糊。' },
    } },
  ],
}

const pipelineRoot: KnowledgeNodeData = {
  id: 'pipeline', title: '处理与验证', subtitle: 'Selection → Inspection', summary: '按任务选择处理，并检查每个中间结果', accent: '#13254F',
  children: [
    { id: 'roi', title: 'ROI 裁剪', subtitle: 'Position prior', summary: '用位置先验缩小搜索范围', accent: '#163F6F', details: {
      select: { eyebrow: '位置线索', statement: '已知目标只在某一区域时，直接裁剪往往最稳健。', formula: 'roi = img[y1:y2, x1:x2]', explanation: '先验知识可替代不必要的复杂识别，也减少计算量。' },
    } },
    { id: 'threshold', title: '亮度阈值', subtitle: 'Gray · Binary', summary: '舍弃颜色后，把亮暗差异变成掩膜', accent: '#396D80', details: {
      fixed: { eyebrow: '固定阈值', statement: '亮度差稳定时，灰度化和二值化让目标位置清晰。', formula: 'g(x,y) = 255 if I(x,y) > T else 0', explanation: '从三个颜色通道到一个灰度，再到黑白两类，是有目的的信息压缩。', footnote: '一旦颜色比亮度更有区分力，灰度化可能丢失关键线索。' },
      adaptive: { eyebrow: '光照不均', statement: '局部阈值让判定标准随位置变化。', formula: 'T(x,y) = local statistic(x,y) − C', explanation: 'MEAN_C 使用邻域均值，GAUSSIAN_C 使用高斯加权和。它们适合处理缓慢变化的照明。', example: '左侧目标 80、背景 30；右侧目标 210、背景 150。全局 T=100 会漏掉左侧目标。' },
      otsu: { eyebrow: '自动全局阈值', statement: 'Otsu 在灰度直方图中自动寻找全局阈值。', formula: 'T* = arg max(T) σ²_between(T)', explanation: '直观上希望类内更集中、类间更分离；当两类可较好分开时尤其有用。', footnote: 'Otsu 选择的是阈值，不是另一种二值图定义。' },
    } },
    { id: 'hsv', title: 'HSV 掩膜', subtitle: 'Color cue', summary: '利用色相、饱和度、明度联合筛选', accent: '#624F6B', details: {
      mask: { eyebrow: '颜色线索', statement: '当前景与背景亮度接近、颜色不同，HSV 更适合分离。', formula: 'mask = cv.inRange(hsv, lower, upper)', explanation: 'H 描述颜色，S 可排除灰白，V 可排除过暗；对红色通常要合并 H 首尾两段掩膜。', footnote: '光源、曝光、阴影和白平衡变化会影响颜色阈值的稳定性。' },
    } },
    { id: 'filter', title: '滤波', subtitle: 'Neighborhood', summary: '利用邻域抑制扰动，同时保留重要边缘', accent: '#74A0BA', details: {
      choices: { eyebrow: '局部邻域', statement: '不同噪声和目标细节，需要不同滤波器。', bullets: ['均值：简单快速，但容易模糊边缘', '高斯：中心权重大，平滑随机扰动', '中值：对椒盐噪声有效，且不是线性卷积', '双边：结合空间与颜色相似度，较能保边但更耗时'], formula: 'g(x,y) = Σi Σj K(i,j) f(x−i,y−j)' },
      frequency: { eyebrow: '频域视角', statement: '低通抑制快速变化，但真实边缘也属于高频。', formula: 'F_filtered(u,v) = H(u,v) · F(u,v)', explanation: '平滑的频率响应通常比生硬截断更少振铃；过度低通会损失文字、纹理与边界。' },
    } },
    { id: 'morphology', title: '形态学', subtitle: 'Mask geometry', summary: '按白色前景的几何结构清理二值掩膜', accent: '#9AAE8F', details: {
      openclose: { eyebrow: '二值结构', statement: '开运算去小白点；闭运算填小黑洞。', formula: 'Open = Erode → Dilate    ·    Close = Dilate → Erode', explanation: '腐蚀缩小白区，膨胀扩大白区。结构元素大小必须与目标尺寸相称。', footnote: '这里默认白色是前景；黑白角色反转时解释也要反转。' },
      basics: { eyebrow: '结构元素', statement: '形态学处理的是区域形状，而非邻域数值平均。', explanation: '孤立小点、细小连接、小孔和狭窄裂缝可由不同操作处理，但强操作也可能破坏目标。' },
    } },
    { id: 'gradient', title: '梯度与边缘', subtitle: 'Sobel · Canny', summary: '定位强度突变，而非直接提取轮廓', accent: '#B5855F', details: {
      derivatives: { eyebrow: '离散导数', statement: 'Sobel 估计一阶梯度；Laplacian 估计二阶变化。', formula: '|∇I| = √(Ix² + Iy²)    ·    ∇²I = Ixx + Iyy', explanation: '像素网格中的导数是离散近似。二阶导数对噪声更敏感，通常先平滑。' },
      canny: { eyebrow: 'Canny 五阶段', statement: 'Canny 输出细而连续的二值边缘图。', formula: 'Gaussian → Gradient → NMS → 双阈值 → 滞后连接', explanation: 'NMS 压细边缘，强弱阈值区分候选，滞后连接保留与强边缘相连的弱边缘。', footnote: 'Canny 是边缘检测器；轮廓由 findContours 等步骤组织。' },
    } },
    { id: 'contour', title: '轮廓', subtitle: 'Boundary curve', summary: '从二值图组织连续边界点', accent: '#396D80', details: {
      curves: { eyebrow: '边缘 → 轮廓', statement: '边缘是局部强度变化；轮廓是有顺序的边界点曲线。', formula: 'contours, hierarchy = cv.findContours(binary, ...)', explanation: '输入可以是清理后的目标掩膜，也可以是二值边缘图，取决于要提取的对象。', footnote: 'RETR_EXTERNAL 只取最外层轮廓；CHAIN_APPROX_SIMPLE 压缩共线点。' },
    } },
    { id: 'shape', title: '形状筛选', subtitle: 'Contour geometry', summary: '用面积、周长、外接形状筛选候选', accent: '#624F6B', details: {
      geometry: { eyebrow: '候选过滤', statement: '轮廓变成可比较的几何量。', bullets: ['contourArea 与 arcLength：尺寸与周长', 'boundingRect / minAreaRect：轴对齐或旋转外接框', 'approxPolyDP：近似顶点数'], footnote: '四个顶点不必然是正方形，还要看边长、角度、比例与凸性。' },
      circularity: { eyebrow: '圆与椭圆', statement: '圆度和拟合曲线提供更精细的形状证据。', formula: 'C = 4πA / P²    （理想圆 C = 1）', explanation: 'minEnclosingCircle 求最小包围圆；fitEllipse 从足够多的轮廓点拟合椭圆。' },
    } },
    { id: 'debug', title: '可视化调试', subtitle: 'Inspect every stage', summary: '定位错误从哪一步开始出现', accent: '#163F6F', details: {
      stages: { eyebrow: '可观察的流水线', statement: '不能只看最终结果，要显示关键中间图。', formula: 'Original → Mask → Morphology → Edge → Contour → Result', explanation: '每层结果对应一个可检验假设：阈值是否正确、目标是否被腐蚀、边缘是否断裂、面积条件是否过严。' },
      drawing: { eyebrow: '标注输出', statement: '将检测结果画回图像，使判断可以复核。', example: 'imshow 查看中间图；rectangle、circle、drawContours、putText 标注结果。', footnote: 'OpenCV 绘图颜色通常也是 BGR，例如 (0,0,255) 是红色。' },
    } },
  ],
}

export const knowledgeMaps: Record<'task-signal' | 'processing-pipeline', KnowledgeMapData> = {
  'task-signal': {
    id: 'task-signal', title: '任务与信号', subtitle: 'What matters in an image?', layout: 'grid', root: taskRoot,
    relations: [
      { id: 't-foreground', source: 'task', target: 'foreground', label: '定义目标', type: 'flow' },
      { id: 't-background', source: 'task', target: 'background', label: '划定其他区域', type: 'flow' },
      { id: 't-interference', source: 'task', target: 'interference', label: '识别干扰', type: 'limits' },
      { id: 'pixel-color', source: 'pixel', target: 'color', label: '参数化通道', type: 'supports' },
      { id: 'pixel-frequency', source: 'pixel', target: 'frequency', label: '转向变化尺度', type: 'supports' },
    ],
  },
  'processing-pipeline': {
    id: 'processing-pipeline', title: '处理与验证', subtitle: 'How to select and inspect?', layout: 'grid', root: pipelineRoot,
    relations: [
      { id: 'p-roi-threshold', source: 'roi', target: 'threshold', label: '缩小范围', type: 'flow' },
      { id: 'p-roi-hsv', source: 'roi', target: 'hsv', label: '限定搜索', type: 'flow' },
      { id: 'p-threshold-morph', source: 'threshold', target: 'morphology', label: '清理掩膜', type: 'flow' },
      { id: 'p-hsv-morph', source: 'hsv', target: 'morphology', label: '清理掩膜', type: 'flow' },
      { id: 'p-filter-gradient', source: 'filter', target: 'gradient', label: '抑制伪边缘', type: 'supports' },
      { id: 'p-morph-contour', source: 'morphology', target: 'contour', label: '提供区域边界', type: 'flow' },
      { id: 'p-gradient-contour', source: 'gradient', target: 'contour', label: '提供边缘图', type: 'flow' },
      { id: 'p-contour-shape', source: 'contour', target: 'shape', label: '计算几何量', type: 'flow' },
      { id: 'p-shape-debug', source: 'shape', target: 'debug', label: '验证候选', type: 'tests' },
    ],
  },
}

export const morphGroups = [
  { id: 'role', source: '前景 / 背景', target: 'ROI / 掩膜', meaning: '定义要分离的区域' },
  { id: 'measure', source: '像素 / 颜色', target: '阈值 / HSV', meaning: '选择可测量线索' },
  { id: 'disturbance', source: '噪声 / 频率', target: '滤波 / 形态学', meaning: '抑制干扰、保留结构' },
  { id: 'verification', source: '中间信号', target: '可视化调试', meaning: '逐步验证处理结果' },
] as const
