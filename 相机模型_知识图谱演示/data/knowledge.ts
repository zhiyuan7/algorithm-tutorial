import type { KnowledgeMapData, KnowledgeNodeData, KnowledgeRelation } from './types'

const geometry: KnowledgeNodeData = {
  id: 'g-root', title: '三维点怎样变成像素', subtitle: 'Forward camera model', summary: '外参、透视、畸变与内参确定落点', accent: '#13254F',
  details: { opening: { eyebrow: '核心问题 · 几何', statement: '一个三维点最终落在图像的哪个像素？', formula: 'P_w → P_c → (x,y) → (x_d,y_d) → (u,v)' } },
  children: [
    { id: 'g-world', title: '世界点', summary: '世界坐标中的被观察点', accent: '#163F6F', details: { point: { eyebrow: '起点', statement: '同一个空间点可以由不同坐标系描述。', formula: 'P_w=[X_w,Y_w,Z_w]ᵀ', explanation: '相机先要知道点相对自身的位置。' } } },
    { id: 'g-extrinsic', title: '外参 R,t', summary: '世界坐标到相机坐标', accent: '#163F6F', details: { transform: { eyebrow: '刚体变换', statement: '外参描述相机与被观察坐标系的空间关系。', formula: 'P_c=R P_w+t', explanation: 't 是世界坐标系原点在相机坐标系中的坐标；相机运动时外参变化。' } } },
    { id: 'g-perspective', title: '透视除法', summary: '按深度缩放得到归一化坐标', accent: '#396D80', details: { division: { eyebrow: '相似三角形', statement: '深度越大，归一化像面坐标越靠近光轴。', formula: 'x=X_c/Z_c   ·   y=Y_c/Z_c', explanation: '欧氏坐标中的透视投影并非线性；齐次矩阵写法最后仍需归一化。', footnote: '要求 Z_c≠0；成像点通常位于相机前方。' } } },
    { id: 'g-distortion', title: '镜头畸变', summary: '真实镜头使理想落点偏移', accent: '#396D80', details: { five: { eyebrow: '径向 + 切向', statement: '径向项随离轴半径变化；切向项反映偏心和装配误差。', formula: 'r²=x²+y²   ·   D=[k₁,k₂,p₁,p₂,k₃]', explanation: '五参数 Brown–Conrady 模型将 (x,y) 变为 (x_d,y_d)。广角或高精度情况还可用有理径向、薄棱镜与倾斜项。', footnote: 'OpenCV 针孔模型可扩展至 14 个畸变参数。' } } },
    { id: 'g-intrinsic', title: '内参 K', summary: '焦距、主点和轴耦合映射到像素', accent: '#624F6B', details: { matrix: { eyebrow: '归一化 → 像素', statement: '内参描述相机自身如何把归一化坐标变为像素。', formula: 'u=fₓx_d+s y_d+cₓ   ·   v=fᵧy_d+cᵧ', explanation: 'fₓ=f/pₓ、fᵧ=f/pᵧ 是像素单位焦距；(cₓ,cᵧ) 是主点；s 与轴夹角和像素尺度有关，常简化为 0。' } } },
    { id: 'g-pixel', title: '像素位置', summary: '几何投影的最终 (u,v)', accent: '#B5855F', details: { synthesis: { eyebrow: '完整流程', statement: '齐次投影式概括无畸变针孔模型；真实镜头需插入畸变。', formula: 'λ[u,v,1]ᵀ=K[R|t][X_w,Y_w,Z_w,1]ᵀ', explanation: '含畸变时，先透视除法，再得到 (x_d,y_d)，最后应用 K。' } } },
  ],
}

const inference: KnowledgeNodeData = {
  id: 'i-root', title: '从观测反求参数', subtitle: 'Calibration & pose', summary: '图像观测约束未知的相机参数和位姿', accent: '#13254F',
  details: { opening: { eyebrow: '反问题', statement: '有了模型，怎样从 3D–2D 对应求未知参数？', explanation: '标定求 K,D；PnP 在 K,D 已知时求 R,t。' } },
  children: [
    { id: 'i-target', title: '标定目标', summary: '共享 K,D，逐图 Rᵢ,tᵢ', accent: '#624F6B', details: { target: { eyebrow: '未知量', statement: '多张标定板图共享相机参数，每张图有独立位姿。', formula: '共享：K,D   ·   逐图：Rᵢ,tᵢ', explanation: '棋盘格尺寸和角点位置给出已知 3D–2D 对应。' } } },
    { id: 'i-homography', title: '平面单应 H', summary: 'Z=0 让平面点与像素由 H 相连', accent: '#396D80', details: { plane: { eyebrow: '张正友方法', statement: '把世界坐标系放在标定板上，Z_w=0 消去第三列旋转项。', formula: 'λm̃=HM̃   ·   H≃K[r₁ r₂ t]', explanation: '至少四个非共线对应点确定 H；多角点可用 DLT/SVD 稳定估计。' } } },
    { id: 'i-constraint', title: '正交约束', summary: '旋转列正交等长，线性约束 B', accent: '#624F6B', details: { orthogonality: { eyebrow: 'H 怎样约束 K', statement: '把未知内参合成 B，约束变成关于 B 的线性方程。', formula: 'B=K⁻ᵀK⁻¹   ·   h₁ᵀBh₂=0', explanation: '还有 h₁ᵀBh₁=h₂ᵀBh₂。B 有六个独立元素；多姿态约束叠成 Vb=0。一般五内参模型至少需三个非退化姿态。' } } },
    { id: 'i-recover', title: '恢复 K 与姿态', summary: '由 B 求 K，再由 H 求每图 R,t', accent: '#163F6F', details: { recover: { eyebrow: '闭式初值', statement: '分解 B 并消除尺度得到 K；再恢复每张图的外参。', formula: 'r₁=λK⁻¹h₁   ·   r₂=λK⁻¹h₂   ·   t=λK⁻¹h₃', explanation: 'r₃=r₁×r₂。噪声会破坏严格正交，通常投影回 SO(3)。' } } },
    { id: 'i-refine', title: '重投影优化', summary: '最小化预测与观测的像素误差', accent: '#B5855F', details: { optimize: { eyebrow: '精修', statement: '闭式求解只是初值；最终直接优化像素误差。', formula: 'min Σᵢⱼ ‖pᵢⱼ−π(K,D,Rᵢ,tᵢ,Pⱼ)‖²', explanation: '角点噪声、H 误差和畸变在这里一起调整。' } } },
    { id: 'i-pnp', title: 'PnP 位姿', summary: 'K,D 已知，由 3D–2D 对应求 R,t', accent: '#163F6F', details: { pose: { eyebrow: '另一种反问题', statement: '相机标定完成后，PnP 求物体相对于相机的当前位姿。', formula: 'P_c=R P_object+t', explanation: 'solvePnP 的 R,t 把物体坐标点变到相机坐标；需要正确处理图像畸变。' } } },
    { id: 'i-p3p', title: 'P3P 最小问题', summary: '三条视线求距离，再刚体配准', accent: '#B5855F', details: { rays: { eyebrow: '三点几何', statement: '去畸变像素得到单位视线；沿视线的三个距离仍未知。', formula: 'Qᵢ=sᵢbᵢ   ·   a²=s₂²+s₃²−2s₂s₃ cosα', explanation: '三组余弦定理方程求 s₁,s₂,s₃，然后配准两个三角形恢复 R,t。' }, ambiguity: { eyebrow: '多解与消歧', statement: '消元得到四次方程，P3P 最多可能有四个合法候选位姿。', formula: '三点求候选 → 第四点以重投影误差选解', explanation: 'solveP3P 可返回多个三点解；solvePnP 的 P3P 模式通常用第四点消歧。' } } },
  ],
}

const color: KnowledgeNodeData = {
  id: 'c-root', title: '像素怎样拥有颜色', subtitle: 'Spectrum → RGB', summary: '感光、采样、重建与处理决定像素值', accent: '#13254F',
  details: { opening: { eyebrow: '第二个问题 · 颜色', statement: '几何给出 (u,v)，这个位置应该记录什么颜色？', formula: 'I(u,v)=[R(u,v),G(u,v),B(u,v)]ᵀ' } },
  children: [
    { id: 'c-spectrum', title: '光谱与视觉', summary: '三通道近似颜色感觉，而非完整光谱', accent: '#624F6B', details: { vision: { eyebrow: '三刺激', statement: '明视觉主要比较 L、M、S 三类视锥细胞的响应。', explanation: '不同光谱可能产生相同颜色感觉。相机 RGB 响应不等于人眼，需要颜色校正。', footnote: 'RGB 是颜色坐标，不是物理光谱。' } } },
    { id: 'c-sensor', title: '感光单元', summary: '光子积累电荷，读出一个数', accent: '#396D80', details: { charge: { eyebrow: '光到电', statement: '无滤片的感光单元输出一个光谱加权的强度值。', formula: 'q ∝ ∫ E(λ)S(λ)dλ', explanation: '单个标量无法区分所有颜色，必须按波段分开采样。' } } },
    { id: 'c-cfa', title: '拜耳阵列', summary: 'R/G/B 滤片在空间分别采样', accent: '#7D8981', details: { mosaic: { eyebrow: 'CFA RAW', statement: '典型 RGGB 单元有一个红、两个绿、一个蓝采样位置。', formula: '[ R  G ; G  B ]  →  单通道马赛克 RAW', explanation: '绿色采样较多利于亮度细节；设备也可能使用 BGGR、GRBG、GBRG。' } } },
    { id: 'c-demosaic', title: '去马赛克', summary: '估计每个像素缺失的两通道', accent: '#9AAE8F', details: { interpolate: { eyebrow: '测量与推断', statement: '最终 RGB 像素通常仅一个通道来自本位置的直接测量。', formula: 'Ĝ₀=(G上+G下+G左+G右)/4', explanation: '双线性插值能补齐通道，但跨物体边缘会造成伪色；实际算法考虑边缘方向。' } } },
    { id: 'c-process', title: '颜色与亮度处理', summary: '白平衡、颜色矩阵、色调、降噪', accent: '#B5855F', details: { pipeline: { eyebrow: 'RAW 还不是照片', statement: '重建 RGB 后还需映射到可显示的颜色和亮度。', formula: '黑电平 → 白平衡 → 颜色校正 → 色调/伽马', explanation: '还常包含坏点修复、降噪和曝光调整；JPEG 会进一步转换与压缩。' } } },
    { id: 'c-image', title: '彩色图像', summary: '每个位置拥有处理后的三通道值', accent: '#163F6F', details: { ending: { eyebrow: '两条主线汇合', statement: '相机模型决定光落在哪里；传感器和处理决定那里是什么颜色。', formula: '(u,v)+RGB → I(u,v)', explanation: '屏幕上的三个值并非由单个感光井直接读出。' } } },
  ],
}

const chain = (prefix: string, ids: string[], labels: string[]) => ids.slice(1).map((id, index) => ({
  id: `${prefix}-${index + 1}`, source: ids[index], target: id, label: labels[index], type: 'flow' as const,
}))

export const knowledgeMaps: Record<KnowledgeMapData['id'], KnowledgeMapData> = {
  geometry: { id: 'geometry', title: '正向几何成像', subtitle: '世界点到像素位置', layout: 'pipeline', root: geometry, relations: chain('g', ['g-world','g-extrinsic','g-perspective','g-distortion','g-intrinsic','g-pixel'], ['坐标变换','透视投影','镜头偏移','像素尺度','得出坐标']) },
  inference: { id: 'inference', title: '逆向参数推断', subtitle: '标定与位姿估计', layout: 'pipeline', root: inference, relations: chain('i', ['i-target','i-homography','i-constraint','i-recover','i-refine','i-pnp','i-p3p'], ['平面对应','旋转约束','闭式求解','优化初值','已知 K,D','最小情形']).map((edge,index)=>({ ...edge,type:(index===1||index===5?'supports':index===4?'application':'flow') as KnowledgeRelation['type'] })) },
  color: { id: 'color', title: '彩色图像形成', subtitle: '光谱到 RGB', layout: 'pipeline', root: color, relations: chain('c', ['c-spectrum','c-sensor','c-cfa','c-demosaic','c-process','c-image'], ['入射光','分色采样','补齐通道','校正','输出']) },
}
