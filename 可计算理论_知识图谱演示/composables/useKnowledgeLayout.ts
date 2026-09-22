import { hierarchy, tree } from 'd3'
import type { KnowledgeMapData, LayoutEdge, LayoutNode } from '../data/types'

const WORLD_WIDTH = 1600
const WORLD_HEIGHT = 900

export function layoutKnowledgeMap(map: KnowledgeMapData) {
  const root = hierarchy(map.root)
  const engine = tree<typeof map.root>()
    .size([1180, map.id === 'complexity' ? 650 : 610])
    .separation((a, b) => a.parent === b.parent ? 1.15 : 1.45)
  engine(root)

  const nodes: LayoutNode[] = root.descendants().map(item => ({
    id: item.data.id,
    data: item.data,
    x: item.x! + 210,
    y: item.y! + 120,
    width: item.depth === 0 ? 350 : item.depth === 1 ? 290 : item.depth === 2 ? 248 : 210,
    height: item.depth === 0 ? 116 : item.depth < 3 ? 108 : 96,
    depth: item.depth,
    parentId: item.parent?.data.id,
  }))

  const byId = new Map(nodes.map(node => [node.id, node]))
  const hierarchyEdges: LayoutEdge[] = nodes
    .filter(node => node.parentId)
    .map(node => ({
      id: `h-${node.parentId}-${node.id}`,
      source: byId.get(node.parentId!)!,
      target: node,
      type: 'hierarchy' as const,
    }))
  const relationEdges: LayoutEdge[] = map.relations.map(relation => ({
    id: relation.id,
    source: byId.get(relation.source)!,
    target: byId.get(relation.target)!,
    label: relation.label,
    type: relation.type,
  }))
  return { nodes, edges: [...hierarchyEdges, ...relationEdges], width: WORLD_WIDTH, height: WORLD_HEIGHT }
}

export function descendantIds(nodes: LayoutNode[], rootId: string): string[] {
  const result = new Set([rootId])
  let changed = true
  while (changed) {
    changed = false
    nodes.forEach((node) => {
      if (node.parentId && result.has(node.parentId) && !result.has(node.id)) {
        result.add(node.id)
        changed = true
      }
    })
  }
  return [...result]
}
