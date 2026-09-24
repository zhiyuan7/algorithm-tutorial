export type MapId = 'one-variable' | 'many-directions' | 'matrix-calculus'
export type SemanticMode = 'overview' | 'concept' | 'summary' | 'detail'

export interface KnowledgeDetail {
  eyebrow?: string
  statement: string
  formula?: string
  explanation?: string
  bullets?: string[]
  example?: string
  footnote?: string
}

export interface KnowledgeNodeData {
  id: string
  title: string
  subtitle?: string
  summary: string
  accent: string
  x: number
  y: number
  width?: number
  height?: number
  parentId?: string
  details?: Record<string, KnowledgeDetail>
}

export interface KnowledgeRelation {
  id: string
  source: string
  target: string
  label: string
  type: 'defines' | 'implies' | 'limits' | 'extends' | 'computes' | 'applies'
}

export interface KnowledgeMapData {
  id: MapId
  title: string
  subtitle: string
  nodes: KnowledgeNodeData[]
  relations: KnowledgeRelation[]
}

export interface LayoutNode {
  id: string
  data: KnowledgeNodeData
  x: number
  y: number
  width: number
  height: number
  depth: number
  parentId?: string
}

export interface LayoutEdge {
  id: string
  source: LayoutNode
  target: LayoutNode
  label: string
  type: KnowledgeRelation['type']
}

export interface TourScene {
  id: string
  map: MapId | 'morph'
  focus?: string
  framing: 'node' | 'subtree' | 'all'
  mode: SemanticMode
  detailKey?: string
  visibleNodes: string[] | 'all'
  visibleEdges: string[] | 'all'
  chapter: string
  headline: string
  morphId?: 'one-to-many' | 'many-to-matrix'
  morphPhase?: 0 | 1 | 2
}
