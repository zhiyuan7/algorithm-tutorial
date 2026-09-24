import type { KnowledgeMapData, KnowledgeNodeData, LayoutEdge, LayoutNode, MapId } from '../data/types'

const WORLD_WIDTH = 1600
const WORLD_HEIGHT = 900

const placements: Record<MapId, Record<string, [number, number]>> = {
  'linear-language': {
    'linear-language-root': [800, 132],
    algebra: [250, 392],
    'vector-space': [650, 392],
    'linear-map': [1150, 392],
    'basis-system': [520, 652],
    coordinates: [780, 652],
    'matrix-representation': [1150, 652],
  },
  'matrix-perspectives': {
    'matrix-perspectives-root': [800, 132],
    'active-transform': [230, 392],
    'passive-basis': [600, 392],
    'matrix-capability': [1000, 392],
    'matrix-space': [1380, 392],
    composition: [110, 652],
    orthogonal: [350, 652],
    similarity: [600, 652],
    rank: [900, 652],
    svd: [1100, 652],
  },
  'invariant-geometry': {
    'invariant-geometry-root': [800, 132],
    determinant: [260, 392],
    eigenstructure: [720, 392],
    'quadratic-form': [1180, 392],
    'spectral-theorem': [720, 652],
    'symmetric-part': [1060, 652],
    'positive-definite': [1300, 652],
  },
}

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

function customLayout(map: KnowledgeMapData): LayoutNode[] {
  return flatten(map.root).map(item => {
    const [x, y] = placements[map.id][item.data.id]
    return {
      id: item.data.id,
      data: item.data,
      x,
      y,
      width: item.depth === 0 ? 350 : item.depth === 1 ? 248 : 188,
      height: item.depth === 0 ? 116 : item.depth === 1 ? 108 : 108,
      depth: item.depth,
      parentId: item.parentId,
    }
  })
}

export function layoutKnowledgeMap(map: KnowledgeMapData) {
  const nodes = customLayout(map)
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
