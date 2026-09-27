import type { KnowledgeMapData, KnowledgeNodeData, LayoutEdge, LayoutNode } from '../data/types'
const placements: Record<string, Record<string, [number,number,number,number]>> = {
  object: {
    'object-root':[800,145,330,110],
    construction:[250,390,250,106], initialization:[250,655,275,106],
    lifetime:[740,390,260,106], defaults:[740,655,270,106],
    encapsulation:[1250,390,300,128], 'process-reuse':[1060,655,245,106], 'stable-interface':[1400,655,310,106],
  },
  types: {
    'types-root':[800,145,330,110],
    inheritance:[390,390,280,106], reuse:[170,655,260,106], contract:[500,655,270,106],
    dispatch:[1150,390,275,106], 'virtual-table':[850,655,300,106], factory:[1190,655,240,106], 'virtual-dtor':[1500,655,255,106],
  },
}
export function layoutKnowledgeMap(map: KnowledgeMapData) {
  const nodes:LayoutNode[]=[]
  function walk(data:KnowledgeNodeData,depth:number,parentId?:string) {
    const place=placements[map.id][data.id]
    if (!place) throw new Error(`Missing placement: ${data.id}`)
    const [x,y,width,height]=place
    nodes.push({id:data.id,data,x,y,width,height,depth,parentId})
    data.children?.forEach(child=>walk(child,depth+1,data.id))
  }
  walk(map.root,0)
  const byId=new Map(nodes.map(node=>[node.id,node]))
  const hierarchyEdges:LayoutEdge[]=nodes.filter(node=>node.parentId).map(node=>({
    id:`h-${node.parentId}-${node.id}`,source:byId.get(node.parentId!)!,target:node,label:node.data.parentLabel,type:'hierarchy' as const,
  }))
  const relationEdges:LayoutEdge[]=map.relations.map(edge=>({id:edge.id,source:byId.get(edge.source)!,target:byId.get(edge.target)!,label:edge.label,type:edge.type}))
  return {nodes,edges:[...hierarchyEdges,...relationEdges],width:1600,height:900}
}
export function descendantIds(nodes:LayoutNode[],rootId:string):string[] {
  const result=new Set([rootId]);let changed=true
  while(changed) {changed=false;nodes.forEach(node=>{if(node.parentId&&result.has(node.parentId)&&!result.has(node.id)){result.add(node.id);changed=true}})}
  return [...result]
}
