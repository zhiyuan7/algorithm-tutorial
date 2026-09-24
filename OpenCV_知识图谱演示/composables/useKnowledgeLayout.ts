import type { KnowledgeMapData, KnowledgeNodeData, LayoutEdge, LayoutNode } from '../data/types'

const WORLD_WIDTH = 1600
const WORLD_HEIGHT = 900
const positions: Record<string, Record<string, [number, number]>> = {
  'task-signal': {
    task: [800, 138], foreground: [310, 360], background: [800, 360], interference: [1290, 360],
    pixel: [310, 660], color: [800, 660], frequency: [1290, 660],
  },
  'processing-pipeline': {
    pipeline: [800, 112], roi: [300, 310], threshold: [800, 310], hsv: [1300, 310],
    filter: [300, 520], morphology: [800, 520], gradient: [1300, 520],
    contour: [1300, 730], shape: [800, 730], debug: [300, 730],
  },
}
function flatten(root: KnowledgeNodeData): KnowledgeNodeData[] {
  return [root, ...(root.children ?? []).flatMap(flatten)]
}
export function layoutKnowledgeMap(map: KnowledgeMapData) {
  const nodes: LayoutNode[] = flatten(map.root).map((data, index) => {
    const [x, y] = positions[map.id][data.id]
    return { id: data.id, data, x, y, width: index === 0 ? 360 : 255, height: index === 0 ? 108 : 104, depth: index === 0 ? 0 : 1, parentId: index === 0 ? undefined : map.root.id }
  })
  const byId = new Map(nodes.map(node => [node.id, node]))
  const edges: LayoutEdge[] = map.relations.map(relation => ({
    id: relation.id, source: byId.get(relation.source)!, target: byId.get(relation.target)!, label: relation.label, type: relation.type,
  }))
  return { nodes, edges, width: WORLD_WIDTH, height: WORLD_HEIGHT }
}
export function descendantIds(nodes: LayoutNode[], rootId: string): string[] {
  const result = new Set([rootId])
  let changed = true
  while (changed) {
    changed = false
    nodes.forEach(node => {
      if (node.parentId && result.has(node.parentId) && !result.has(node.id)) { result.add(node.id); changed = true }
    })
  }
  return [...result]
}
