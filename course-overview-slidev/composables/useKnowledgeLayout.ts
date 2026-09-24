import { hierarchy, tree } from 'd3'
import type { KnowledgeMapData, KnowledgeNodeData, LayoutEdge, LayoutNode } from '../data/types'

const WORLD_WIDTH = 1600
const WORLD_HEIGHT = 900

function flatten(root: KnowledgeNodeData): KnowledgeNodeData[] {
  const result: KnowledgeNodeData[] = []
  const walk = (node: KnowledgeNodeData) => {
    result.push(node)
    node.children?.forEach(walk)
  }
  walk(root)
  return result
}

function cycleLayout(map: KnowledgeMapData): LayoutNode[] {
  const byId = new Map(flatten(map.root).map(node => [node.id, node]))
  const placements: Record<string, [number, number, number, number, number]> = {
    'cycle-root': [800, 450, 330, 116, 0],
    reality: [800, 145, 260, 110, 1],
    induction: [1215, 450, 280, 116, 1],
    theory: [800, 755, 260, 110, 1],
    deduction: [385, 450, 280, 116, 1],
  }
  return Object.entries(placements).map(([id, [x, y, width, height, depth]]) => ({
    id,
    data: byId.get(id)!,
    x,
    y,
    width,
    height,
    depth,
    parentId: id === 'cycle-root' ? undefined : 'cycle-root',
  }))
}

function treeLayout(map: KnowledgeMapData): LayoutNode[] {
  const root = hierarchy(map.root)
  const engine = tree<KnowledgeNodeData>().size([1120, 520])
  engine(root)
  return root.descendants().map(item => ({
    id: item.data.id,
    data: item.data,
    x: item.x! + 240,
    y: item.y! + 120,
    width: item.depth === 0 ? 350 : item.depth === 1 ? 270 : 190,
    height: item.depth === 0 ? 116 : item.depth === 1 ? 108 : 98,
    depth: item.depth,
    parentId: item.parent?.data.id,
  }))
}

export function layoutKnowledgeMap(map: KnowledgeMapData) {
  const nodes = map.layout === 'cycle' ? cycleLayout(map) : treeLayout(map)
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
