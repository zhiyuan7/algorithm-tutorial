import { hierarchy } from 'd3'
import type { KnowledgeMapData, LayoutEdge, LayoutNode } from '../data/types'

type Placement = [number, number, number, number]

// Stable positions let a collapsed branch reopen at the same place during review.
const placements: Record<KnowledgeMapData['id'], Record<string, Placement>> = {
  computability: {
    'computability-root': [800, 115, 350, 116],
    recognizable: [420, 335, 300, 108],
    decidable: [1120, 335, 300, 108],
    halting: [420, 550, 310, 112],
    diagonal: [420, 765, 310, 108],
  },
  complexity: {
    'complexity-root': [800, 100, 350, 116],
    decidable: [800, 280, 310, 108],
    p: [420, 475, 300, 108],
    np: [1110, 475, 310, 108],
    sat: [1110, 680, 310, 108],
    'open-question': [1110, 885, 310, 108],
  },
  universality: {
    'universality-root': [800, 110, 370, 116],
    'turing-complete': [800, 305, 340, 108],
    resources: [480, 510, 340, 108],
    boundary: [1140, 510, 340, 108],
    control: [265, 725, 370, 112],
    memory: [700, 725, 310, 108],
  },
}

export function layoutKnowledgeMap(map: KnowledgeMapData) {
  const root = hierarchy(map.root)
  const nodes: LayoutNode[] = root.descendants().map(item => {
    const [x, y, width, height] = placements[map.id][item.data.id]
    return { id: item.data.id, data: item.data, x, y, width, height,
      depth: item.depth, parentId: item.parent?.data.id }
  })
  const byId = new Map(nodes.map(node => [node.id, node]))
  const hierarchyEdges: LayoutEdge[] = nodes.filter(node => node.parentId).map(node => ({
    id: `h-${node.parentId}-${node.id}`, source: byId.get(node.parentId!)!, target: node, type: 'hierarchy',
  }))
  const relationEdges: LayoutEdge[] = map.relations.map(relation => ({
    id: relation.id, source: byId.get(relation.source)!, target: byId.get(relation.target)!,
    label: relation.label, type: relation.type,
  }))
  return { nodes, edges: [...hierarchyEdges, ...relationEdges], width: 1600, height: 900 }
}
