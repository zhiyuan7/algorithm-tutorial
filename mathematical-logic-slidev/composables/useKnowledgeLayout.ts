import type { KnowledgeMapData, KnowledgeNodeData, LayoutEdge, LayoutNode } from '../data/types'

const WORLD_WIDTH = 1600
const WORLD_HEIGHT = 900

interface FlatNode {
  data: KnowledgeNodeData
  depth: number
  parentId?: string
}

function flatten(root: KnowledgeNodeData): FlatNode[] {
  const result: FlatNode[] = []
  const walk = (data: KnowledgeNodeData, depth: number, parentId?: string) => {
    result.push({ data, depth, parentId })
    data.children?.forEach(child => walk(child, depth + 1, data.id))
  }
  walk(root, 0)
  return result
}

const syntaxPlacements: Record<string, [number, number, number, number]> = {
  'logic-root': [800, 112, 340, 106],
  syntax: [270, 310, 230, 104],
  signature: [90, 570, 170, 98],
  term: [290, 570, 170, 98],
  formula: [490, 570, 170, 98],
  semantics: [800, 310, 230, 104],
  structure: [685, 570, 190, 98],
  satisfaction: [915, 570, 190, 98],
  correspondence: [1330, 310, 250, 104],
  proof: [1195, 570, 205, 98],
  consequence: [1465, 570, 205, 98],
}

const dependencyPlacements: Record<string, [number, number, number, number]> = {
  'quantifiers-root': [800, 108, 360, 106],
  'dependent-choice': [330, 340, 290, 108],
  'uniform-choice': [1270, 340, 290, 108],
  'pointwise-continuity': [330, 620, 290, 108],
  'uniform-continuity': [1270, 620, 290, 108],
  'x2-counterexample': [330, 820, 250, 98],
}

export function layoutKnowledgeMap(map: KnowledgeMapData) {
  const flat = flatten(map.root)
  const placements = map.layout === 'syntax-grid' ? syntaxPlacements : dependencyPlacements
  const nodes: LayoutNode[] = flat.map(({ data, depth, parentId }) => {
    const placement = placements[data.id]
    if (!placement) throw new Error(`Missing layout placement for ${data.id}`)
    const [x, y, width, height] = placement
    return { id: data.id, data, x, y, width, height, depth, parentId }
  })
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
