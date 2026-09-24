import type { KnowledgeMapData, KnowledgeNodeData, LayoutEdge, LayoutNode } from '../data/types'

const WORLD_WIDTH = 1600
const WORLD_HEIGHT = 900

function treeLayout(map: KnowledgeMapData): LayoutNode[] {
  const placements: Record<string, [number, number, number, number]> = map.id === 'storage'
    ? {
        'memory-root': [800, 190, 360, 116],
        representation: [400, 380, 290, 110],
        lifetime: [960, 380, 290, 110],
        static: [650, 570, 225, 100],
        automatic: [930, 570, 225, 100],
        dynamic: [1210, 570, 225, 100],
        pointer: [1210, 750, 235, 100],
      }
    : {
        'ownership-root': [800, 190, 360, 116],
        malloc: [230, 440, 260, 110],
        new: [590, 440, 260, 110],
        risk: [950, 440, 260, 110],
        raii: [1310, 440, 260, 110],
        unique: [1125, 680, 245, 100],
        shared: [1450, 680, 245, 100],
      }
  const nodes: LayoutNode[] = []
  const walk = (data: KnowledgeNodeData, depth: number, parentId?: string) => {
    const [x, y, width, height] = placements[data.id]
    nodes.push({ id: data.id, data, x, y, width, height, depth, parentId })
    data.children?.forEach(child => walk(child, depth + 1, data.id))
  }
  walk(map.root, 0)
  return nodes
}

export function layoutKnowledgeMap(map: KnowledgeMapData) {
  const nodes = treeLayout(map)
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
