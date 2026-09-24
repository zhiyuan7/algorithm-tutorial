import type { KnowledgeMapData, LayoutEdge, LayoutNode } from '../data/types'

export function layoutKnowledgeMap(map: KnowledgeMapData) {
  const nodes: LayoutNode[] = map.nodes.map(data => ({
    id: data.id,
    data,
    x: data.x,
    y: data.y,
    width: data.width ?? 220,
    height: data.height ?? 102,
    depth: data.parentId ? 1 : data.id.endsWith('root') ? 0 : 1,
    parentId: data.parentId,
  }))
  const byId = new Map(nodes.map(node => [node.id, node]))
  const edges: LayoutEdge[] = map.relations.map(relation => ({
    id: relation.id,
    source: byId.get(relation.source)!,
    target: byId.get(relation.target)!,
    label: relation.label,
    type: relation.type,
  }))
  return { nodes, edges }
}

export function descendantIds(nodes: LayoutNode[], rootId: string): string[] {
  const result = new Set([rootId])
  let changed = true
  while (changed) {
    changed = false
    for (const node of nodes) {
      if (node.parentId && result.has(node.parentId) && !result.has(node.id)) {
        result.add(node.id)
        changed = true
      }
    }
  }
  return [...result]
}
