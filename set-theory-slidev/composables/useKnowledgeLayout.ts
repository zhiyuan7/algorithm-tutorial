import type { KnowledgeMapData, KnowledgeNodeData, LayoutEdge, LayoutNode } from '../data/types'

const WORLD_WIDTH = 1600
const WORLD_HEIGHT = 900

type Placement = [number, number, number, number, number]

function flatten(root: KnowledgeNodeData): KnowledgeNodeData[] {
  const result: KnowledgeNodeData[] = []
  const walk = (node: KnowledgeNodeData) => {
    result.push(node)
    node.children?.forEach(walk)
  }
  walk(root)
  return result
}

const placements: Record<KnowledgeMapData['layout'], Record<string, Placement>> = {
  foundation: {
    'existence-root': [800, 105, 340, 108, 0],
    naive: [420, 290, 250, 104, 1],
    russell: [245, 510, 230, 100, 2],
    universal: [565, 510, 270, 100, 2],
    zfc: [1120, 290, 270, 104, 1],
    extensionality: [855, 535, 230, 100, 2],
    separation: [1120, 535, 250, 100, 2],
    constructors: [1390, 535, 250, 100, 2],
  },
  construction: {
    'construction-root': [800, 92, 350, 104, 0],
    'ordered-pair': [405, 250, 230, 96, 1],
    relation: [155, 430, 220, 92, 2],
    equivalence: [405, 430, 235, 92, 2],
    order: [655, 430, 220, 92, 2],
    naturals: [1050, 250, 245, 96, 1],
    recursion: [840, 430, 220, 92, 2],
    integers: [1110, 430, 210, 92, 2],
    rationals: [1110, 585, 205, 92, 3],
    reals: [1110, 730, 205, 92, 4],
    extensions: [1390, 730, 245, 92, 5],
  },
  infinity: {
    'infinity-root': [800, 100, 350, 108, 0],
    bijection: [455, 290, 245, 102, 1],
    countable: [250, 515, 230, 98, 2],
    diagonal: [610, 515, 245, 98, 2],
    cantor: [1120, 290, 250, 102, 1],
    ch: [1120, 515, 250, 98, 2],
    independence: [1120, 735, 270, 100, 3],
  },
}

function parentMap(root: KnowledgeNodeData) {
  const parents = new Map<string, string>()
  const walk = (node: KnowledgeNodeData) => {
    node.children?.forEach((child) => {
      parents.set(child.id, node.id)
      walk(child)
    })
  }
  walk(root)
  return parents
}

export function layoutKnowledgeMap(map: KnowledgeMapData) {
  const data = new Map(flatten(map.root).map(node => [node.id, node]))
  const parents = parentMap(map.root)
  const nodes: LayoutNode[] = Object.entries(placements[map.layout]).map(([id, [x, y, width, height, depth]]) => ({
    id,
    data: data.get(id)!,
    x,
    y,
    width,
    height,
    depth,
    parentId: parents.get(id),
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
