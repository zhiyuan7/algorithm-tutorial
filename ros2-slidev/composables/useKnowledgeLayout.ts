import { hierarchy } from 'd3'
import type { KnowledgeMapData, LayoutEdge, LayoutNode } from '../data/types'

const WORLD_WIDTH = 1600
const WORLD_HEIGHT = 900

export function layoutKnowledgeMap(map: KnowledgeMapData) {
  const root = hierarchy(map.root)
  // Both maps have one main row and a small second row. Explicit slots keep
  // card gaps stable; D3 still supplies hierarchy depth and parent relations.
  const slots: Record<KnowledgeMapData['id'], Record<string, [number, number]>> = {
    communication: {
      'ros-graph': [800, 180], node: [220, 450], callback: [480, 450],
      topic: [740, 450], service: [1000, 450], matching: [1300, 450],
      qos: [1100, 720], interface: [1300, 720], name: [1500, 720],
    },
    execution: {
      runtime: [800, 180], process: [240, 450], composition: [500, 450],
      group: [760, 450], executor: [1020, 450], launch: [1280, 450],
      waitset: [920, 720], priority: [1120, 720],
    },
  }
  const nodes: LayoutNode[] = root.descendants().map(item => ({
    id: item.data.id,
    data: item.data,
    x: slots[map.id][item.data.id]?.[0] ?? 800,
    y: slots[map.id][item.data.id]?.[1] ?? 450,
    width: item.depth === 0 ? 330 : item.depth === 1 ? 225 : 180,
    height: item.depth === 0 ? 112 : item.depth === 1 ? 104 : 96,
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
    nodes.forEach(node => {
      if (node.parentId && result.has(node.parentId) && !result.has(node.id)) {
        result.add(node.id)
        changed = true
      }
    })
  }
  return [...result]
}
