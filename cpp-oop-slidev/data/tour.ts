import { knowledgeMaps } from './knowledge'
import type { KnowledgeNodeData, MapId, TourScene } from './types'

function edgesFor(map: MapId, visible: string[]) {
  const ids = new Set(visible)
  const result: string[] = []
  function walk(node: KnowledgeNodeData) {
    node.children?.forEach(child => {
      if (ids.has(node.id) && ids.has(child.id)) result.push(`h-${node.id}-${child.id}`)
      walk(child)
    })
  }
  walk(knowledgeMaps[map].root)
  knowledgeMaps[map].relations.forEach(edge => {
    if (ids.has(edge.source) && ids.has(edge.target)) result.push(edge.id)
  })
  return result
}
function s(id:string,map:MapId,focus:string,mode:TourScene['mode'],chapter:string,headline:string,visibleNodes:string[],detailKey?:string,framing:TourScene['framing']='node'):TourScene {
  return { id,map,focus,mode,chapter,headline,visibleNodes,visibleEdges:edgesFor(map,visibleNodes),detailKey,framing }
}
const o=['object-root']
const oc=[...o,'construction']
const oi=[...oc,'initialization']
const ol=[...oi,'lifetime']
const od=[...ol,'defaults']
const oe=[...od,'encapsulation']
const ov=[...oe,'invariant']
const oa=[...ov,'stable-interface']
const t=['types-root']
const ti=[...t,'inheritance']
const tc=[...ti,'composition']
const tr=[...tc,'reuse']
const tk=[...tr,'contract']
const td=[...tk,'dispatch']
const tf=[...td,'factory']
const ta=[...tf,'virtual-dtor']
export const tour: TourScene[] = [
  s('opening','object','object-root','detail','对象','让负责的对象管理状态与行为',o,'opening'),
  s('construct','object','construction','detail','构造','存储空间怎样成为合法对象',oc,'main'),
  s('init-direct','object','initialization','detail','初始化列表','建立成员与修改成员是两件事',oi,'direct'),
  s('init-required','object','initialization','detail','初始化列表','有些成员只能在建立时初始化',oi,'required'),
  s('lifetime','object','lifetime','detail','生命周期','析构负责对象离开时的收尾',ol,'destruction'),
  s('raii','object','lifetime','detail','RAII','让资源随对象生命周期收放',ol,'raii'),
  s('defaults','object','defaults','detail','特殊成员','明确默认实现，也可禁止操作',od,'policy'),
  s('boundary','object','encapsulation','detail','封装','公开能力，隐藏内部状态',oe,'boundary'),
  s('invariant','object','invariant','detail','不变量','合法状态要由每个入口共同守住',ov,'balance'),
  s('stable-api','object','stable-interface','detail','稳定接口','存储结构可变，使用方式保持稳定',oa,'representation'),
  s('branch-summary','object','encapsulation','summary','封装完成','对象自己维护状态边界',oa,undefined,'subtree'),
  s('object-overview','object','object-root','overview','第一张知识图谱','构造、生命周期与封装共同守护对象',oa,undefined,'all'),
  s('before-morph','object','object-root','concept','视角转换','从一个对象，走向一类对象',oa,undefined,'all'),
  { id:'object-to-types',map:'morph',focus:'types-root',framing:'all',mode:'overview',visibleNodes:[],visibleEdges:[],chapter:'概念变形',headline:'单个对象的责任扩展为类型家族的契约' },
  s('types-overview','types','types-root','overview','第二张知识图谱','类型关系、函数契约与运行时行为',ta,undefined,'all'),
  s('inheritance','types','inheritance','detail','继承','is-a 才是公有继承的理由',ti,'is_a'),
  s('composition','types','composition','detail','组合','has-a 应当成为成员对象',tc,'has_a'),
  s('reuse','types','reuse','detail','派生类能力','复用、扩展，同时尊重基类边界',tr,'extension'),
  s('nonvirtual','types','contract','detail','函数契约 ①','非虚函数规定共同实现',tk,'nonvirtual'),
  s('virtual','types','contract','detail','函数契约 ②','虚函数允许明确重写',tk,'virtual'),
  s('pure','types','contract','detail','函数契约 ③','纯虚函数规定必须具备的能力',tk,'pure'),
  s('dispatch','types','dispatch','detail','多态','相同接口按实际对象选择行为',td,'attack'),
  s('factory','types','factory','detail','工厂函数','创建时也隐藏具体类型',tf,'creation'),
  s('virtual-dtor','types','virtual-dtor','detail','虚析构','通过基类指针完整销毁派生对象',ta,'deletion'),
  s('destruction-order','types','virtual-dtor','detail','构造与析构','基类先构造，派生类先析构',ta,'order'),
  s('types-final','types','types-root','overview','完整知识图谱','用稳定契约连接不同类型的对象',ta,undefined,'all'),
]
export function getScene(step:number):TourScene { return tour[Math.min(Math.max(0,step),tour.length-1)] }
