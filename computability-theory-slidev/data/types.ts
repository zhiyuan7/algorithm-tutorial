export type SemanticMode = 'overview' | 'concept' | 'summary' | 'detail'
export type MapId = 'computability' | 'complexity' | 'universality'
export type SceneMapId = MapId | 'morph-a-b' | 'morph-b-c'

export interface KnowledgeDetail {
  eyebrow?: string
  statement: string
  explanation?: string
  formula?: string
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
  details?: Record<string, KnowledgeDetail>
  children?: KnowledgeNodeData[]
}

export interface KnowledgeRelation {
  id: string
  source: string
  target: string
  label?: string
  type: 'flow' | 'subset' | 'tests' | 'limits' | 'example' | 'supports'
}

export interface KnowledgeMapData {
  id: MapId
  title: string
  subtitle: string
  layout: 'tree'
  root: KnowledgeNodeData
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
  label?: string
  type: KnowledgeRelation['type'] | 'hierarchy'
}

export interface TourScene {
  id: string
  map: SceneMapId
  focus?: string
  framing: 'node' | 'subtree' | 'all'
  mode: SemanticMode
  detailKey?: string
  visibleNodes: string[] | 'all'
  visibleEdges: string[] | 'all'
  dimNodes?: string[]
  headline: string
  chapter: string
  cameraPadding?: number
}
