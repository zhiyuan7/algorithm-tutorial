import type { KnowledgeMapData, LayoutEdge, LayoutNode } from '../data/types'

const positions: Record<KnowledgeMapData['id'], [number, number][]> = {
  geometry: [[235,345],[800,345],[1365,345],[1365,650],[800,650],[235,650]],
  inference: [[195,345],[595,345],[995,345],[1395,345],[1395,650],[995,650],[595,650]],
  color: [[235,345],[800,345],[1365,345],[1365,650],[800,650],[235,650]],
}
export function layoutKnowledgeMap(map: KnowledgeMapData) {
  const nodes: LayoutNode[] = [
    { id:map.root.id,data:map.root,x:800,y:125,width:380,height:112,depth:0 },
    ...map.root.children!.map((data,index)=>({ id:data.id,data,x:positions[map.id][index][0],y:positions[map.id][index][1],width:map.id==='inference'?260:285,height:112,depth:1,parentId:map.root.id })),
  ]
  const byId = new Map(nodes.map(node=>[node.id,node]))
  const edges: LayoutEdge[] = map.relations.map(relation=>({ id:relation.id,source:byId.get(relation.source)!,target:byId.get(relation.target)!,label:relation.label,type:relation.type }))
  return { nodes,edges,width:1600,height:900 }
}
