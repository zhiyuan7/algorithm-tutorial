<script setup lang="ts">
import { computed, toRef } from 'vue'
import { knowledgeMaps } from '../data/knowledge'
import { getScene, tour } from '../data/tour'
import type { MapId, TourScene } from '../data/types'
import { descendantIds, layoutKnowledgeMap } from '../composables/useKnowledgeLayout'
import { useCamera } from '../composables/useCamera'
import KnowledgeNode from './KnowledgeNode.vue'
import KnowledgeEdge from './KnowledgeEdge.vue'
import DetailPanel from './DetailPanel.vue'
import KnowledgeOverview from './KnowledgeOverview.vue'
import RepresentationMorph from './RepresentationMorph.vue'
import InvariantMorph from './InvariantMorph.vue'

const props = defineProps<{ step: number }>()
const stepRef = toRef(props, 'step')
const scene = computed(() => getScene(stepRef.value))

const layouts = Object.fromEntries(
  Object.entries(knowledgeMaps).map(([id, map]) => [id, layoutKnowledgeMap(map)]),
) as Record<MapId, ReturnType<typeof layoutKnowledgeMap>>

function targetMapId(map: TourScene['map']): MapId {
  if (map === 'morph-representation') return 'matrix-perspectives'
  if (map === 'morph-invariants') return 'invariant-geometry'
  return map
}

const activeMap = computed(() => knowledgeMaps[targetMapId(scene.value.map)])
const layout = computed(() => layouts[activeMap.value.id])
const nodes = computed(() => layout.value.nodes)
const edges = computed(() => layout.value.edges)
const visibleNodeIds = computed(() => {
  const current = scene.value
  const requested = current.visibleNodes === 'all'
    ? new Set(nodes.value.map(node => node.id))
    : new Set(current.visibleNodes)
  if (current.mode !== 'detail' || current.framing === 'all') return requested

  // Keep the current branch in view, following the set-theory deck's approach.
  const branch = new Set(current.contextNodes ?? [])
  let cursor = nodes.value.find(node => node.id === current.focus)
  if (current.framing === 'subtree' && cursor) {
    descendantIds(nodes.value, cursor.id).forEach(id => branch.add(id))
  }
  while (cursor) {
    branch.add(cursor.id)
    cursor = cursor.parentId ? nodes.value.find(node => node.id === cursor?.parentId) : undefined
  }
  return new Set([...requested].filter(id => branch.has(id)))
})
const framedNodes = computed(() => nodes.value.filter(node => visibleNodeIds.value.has(node.id)))
const camera = useCamera(scene, framedNodes)
const visibleEdgeIds = computed(() => {
  const requested = scene.value.visibleEdges === 'all'
    ? new Set(edges.value.map(edge => edge.id))
    : new Set(scene.value.visibleEdges)
  return new Set(edges.value
    .filter(edge => requested.has(edge.id) && visibleNodeIds.value.has(edge.source.id) && visibleNodeIds.value.has(edge.target.id))
    .map(edge => edge.id))
})
const dimNodeIds = computed(() => new Set(scene.value.dimNodes ?? []))
const activeNode = computed(() => nodes.value.find(node => node.id === scene.value.focus))
const activeDetail = computed(() => {
  if (!activeNode.value || !scene.value.detailKey) return undefined
  return activeNode.value.data.details?.[scene.value.detailKey]
})

function isActiveEdge(id: string) {
  const edge = edges.value.find(item => item.id === id)
  return !!edge && (edge.source.id === scene.value.focus || edge.target.id === scene.value.focus)
}
</script>

<template>
  <main class="knowledge-stage">
    <KnowledgeOverview
      :chapter="scene.chapter"
      :headline="scene.headline"
      :step="step"
      :total="tour.length"
    />

    <RepresentationMorph v-if="scene.map === 'morph-representation'" :key="scene.id" />
    <InvariantMorph v-else-if="scene.map === 'morph-invariants'" :key="scene.id" />

    <svg v-else class="knowledge-world" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="edge-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" class="edge-arrow-shape" />
        </marker>
      </defs>
      <g class="camera" :transform="camera.transform">
        <KnowledgeEdge
          v-for="edge in edges"
          :key="edge.id"
          :edge="edge"
          :visible="visibleEdgeIds.has(edge.id)"
          :active="isActiveEdge(edge.id)"
          :map-layout="activeMap.layout"
        />
        <KnowledgeNode
          v-for="node in nodes"
          :key="node.id"
          :node="node"
          :visible="visibleNodeIds.has(node.id)"
          :active="node.id === scene.focus"
          :dimmed="dimNodeIds.has(node.id)"
          :mode="scene.mode"
          :display-title="node.id === scene.focus ? activeDetail?.title : undefined"
        />
      </g>
    </svg>

    <DetailPanel
      :node="activeNode?.data"
      :detail="activeDetail"
      :visible="scene.mode === 'detail' && !!activeDetail"
    />

    <div class="stage-corner-label">线性代数 · Knowledge Map</div>
  </main>
</template>
