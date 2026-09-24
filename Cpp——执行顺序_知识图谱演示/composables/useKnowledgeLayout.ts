import { hierarchy } from 'd3'
import type { KnowledgeMapData, KnowledgeNodeData, LayoutEdge, LayoutNode } from '../data/types'

export function layoutKnowledgeMap(map: KnowledgeMapData) {
  const root = hierarchy(map.root)
  const leaves = root.leaves()
  const leafX = new Map(leaves.map((item, index) => [item.data.id, 220 + index * 230]))
  function xFor(item: typeof root): number {
    if (!item.children?.length) return leafX.get(item.data.id)!
    return item.children.reduce((sum, child) => sum + xFor(child), 0) / item.children.length
  }
  const nodes: LayoutNode[] = root.descendants().map(item => ({
    id: item.data.id, data: item.data, x: xFor(item), y: 170 + item.depth * 325,
    width: item.depth === 0 ? 320 : item.depth === 1 ? 250 : 205,
    height: item.depth === 0 ? 112 : item.depth === 1 ? 105 : 94,
    depth: item.depth, parentId: item.parent?.data.id,
  }))
  const byId = new Map(nodes.map(node => [node.id, node]))
  const hierarchyEdges: LayoutEdge[] = nodes.filter(node => node.parentId).map(node => ({
    id: `h-${node.parentId}-${node.id}`,
    source: byId.get(node.parentId!)!, target: node, type: 'hierarchy' as const,
  }))
  const relationEdges: LayoutEdge[] = map.relations.map(relation => ({
    id: relation.id, source: byId.get(relation.source)!, target: byId.get(relation.target)!,
    label: relation.label, type: relation.type,
  }))
  return { nodes, edges: [...hierarchyEdges, ...relationEdges], width: 1800, height: 1000 }
}

export function descendantIds(nodes: LayoutNode[], rootId: string): string[] {
  const result = new Set([rootId])
  let changed = true
  while (changed) {
    changed = false
    nodes.forEach(node => {
      if (node.parentId && result.has(node.parentId) && !result.has(node.id)) {
        result.add(node.id)
        changed = true
      }
    })
  }
  return [...result]
}
