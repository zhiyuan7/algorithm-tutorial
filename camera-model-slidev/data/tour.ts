import type { MapId, TourScene } from './types'

const g = ['g-root','g-world','g-extrinsic','g-perspective','g-distortion','g-intrinsic','g-pixel']
const i = ['i-root','i-target','i-homography','i-constraint','i-recover','i-refine','i-pnp','i-p3p']
const c = ['c-root','c-spectrum','c-sensor','c-cfa','c-demosaic','c-process','c-image']
const detail = (id: string, map: MapId, focus: string, key: string, visible: string[], prefix: string, chapter: string, headline: string): TourScene => ({ id,map,focus,framing:'node',mode:'detail',detailKey:key,visibleNodes:visible,visibleEdges:Array.from({length:Math.max(0,visible.length-2)},(_,n)=>`${prefix}-${n+1}`),chapter,headline })
const overview = (id: string, map: MapId, nodes: string[], prefix: string, headline: string): TourScene => ({ id,map,focus:nodes[0],framing:'all',mode:'overview',visibleNodes:'all',visibleEdges:Array.from({length:nodes.length-2},(_,n)=>`${prefix}-${n+1}`),chapter:'完整知识图',headline })
const summary = (id: string, map: MapId, focus: string, headline: string): TourScene => ({ id,map,focus,framing:'all',mode:'summary',visibleNodes:'all',visibleEdges:'all',chapter:'阶段小结',headline })
const morph = (kind: 'inverse'|'color', phase: 0|1|2, headline: string): TourScene => ({ id:`${kind}-${phase}`,map:'morph',framing:'all',mode:'concept',visibleNodes:[],visibleEdges:[],chapter:kind==='inverse'?'变形一 · 正向到逆向':'变形二 · 位置到颜色',headline,morphKind:kind,morphPhase:phase })

export const tour: TourScene[] = [
  detail('g-opening','geometry','g-root','opening',g.slice(0,1),'g','几何成像','一个三维点怎样变成像素'),
  detail('g-world','geometry','g-world','point',g.slice(0,2),'g','世界坐标','先明确被观察的三维点'),
  detail('g-extrinsic','geometry','g-extrinsic','transform',g.slice(0,3),'g','外参','把世界点变到相机眼中'),
  detail('g-perspective','geometry','g-perspective','division',g.slice(0,4),'g','针孔模型','透视除法产生归一化坐标'),
  detail('g-distortion','geometry','g-distortion','five',g.slice(0,5),'g','真实镜头','畸变把理想位置推开'),
  detail('g-intrinsic','geometry','g-intrinsic','matrix',g.slice(0,6),'g','内参','把归一化坐标换成像素'),
  detail('g-pixel','geometry','g-pixel','synthesis',g,'g','几何收束','分清齐次式与真实畸变链'),
  summary('g-summary','geometry','g-pixel','像素坐标收束为图上的一个结果'),
  overview('g-overview','geometry',g,'g','外参、投影、畸变、内参组成正向链'),
  morph('inverse',0,'保留正向投影：参数走向像素'),
  morph('inverse',1,'交换已知与未知：像素约束参数'),
  morph('inverse',2,'进入标定与位姿估计'),
  detail('i-opening','inference','i-root','opening',i.slice(0,1),'i','逆向推断','同一模型，未知量改变'),
  detail('i-target','inference','i-target','target',i.slice(0,2),'i','相机标定','求共同的 K,D 和逐图姿态'),
  detail('i-homography','inference','i-homography','plane',i.slice(0,3),'i','平面棋盘格','一个姿态给出一个 H'),
  detail('i-constraint','inference','i-constraint','orthogonality',i.slice(0,4),'i','关键约束','旋转正交让内参可解'),
  detail('i-recover','inference','i-recover','recover',i.slice(0,5),'i','闭式初始化','从 B 回到 K、R、t'),
  detail('i-refine','inference','i-refine','optimize',i.slice(0,6),'i','精修','直接压低重投影误差'),
  detail('i-pnp','inference','i-pnp','pose',i.slice(0,7),'i','位姿估计','已知 K,D 后求 R,t'),
  detail('i-p3p-rays','inference','i-p3p','rays',i,'i','P3P','三条视线与三个未知深度'),
  detail('i-p3p-ambiguity','inference','i-p3p','ambiguity',i,'i','P3P','多个候选需额外点消歧'),
  summary('i-summary','inference','i-p3p','P3P 是位姿估计的一个最小情形'),
  overview('i-overview','inference',i,'i','标定和 PnP 是两种反问题'),
  morph('color',0,'几何问题已给出像素位置'),
  morph('color',1,'保持 (u,v)，转而追问记录值'),
  morph('color',2,'进入光谱、采样与 RGB 重建'),
  detail('c-opening','color','c-root','opening',c.slice(0,1),'c','颜色形成','像素位置还需要颜色值'),
  detail('c-spectrum','color','c-spectrum','vision',c.slice(0,2),'c','三通道','RGB 近似颜色感觉'),
  detail('c-sensor','color','c-sensor','charge',c.slice(0,3),'c','感光元件','每个感光单元先读出一个数'),
  detail('c-cfa','color','c-cfa','mosaic',c.slice(0,4),'c','CFA RAW','拜耳阵列分色采样'),
  detail('c-demosaic','color','c-demosaic','interpolate',c.slice(0,5),'c','去马赛克','邻域信息补齐两条颜色通道'),
  detail('c-process','color','c-process','pipeline',c.slice(0,6),'c','图像处理','从相机 RGB 变到可显示图像'),
  detail('c-image','color','c-image','ending',c,'c','结论','位置与颜色合成彩色图像'),
  summary('c-summary','color','c-image','彩色像素成为完整处理链的结果'),
  overview('c-overview','color',c,'c','从光谱到最终 RGB 图像'),
]
export const getScene = (step: number): TourScene => tour[Math.min(Math.max(0,step),tour.length-1)]
