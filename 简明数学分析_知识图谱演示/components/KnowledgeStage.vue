<script setup lang="ts">
import { computed } from 'vue'
import { knowledgeMaps } from '../data/knowledge'
import { getScene, tour } from '../data/tour'
import type { MapId } from '../data/types'
import { layoutKnowledgeMap } from '../composables/useKnowledgeLayout'
import { useCamera } from '../composables/useCamera'
import KnowledgeOverview from './KnowledgeOverview.vue'
import KnowledgeEdge from './KnowledgeEdge.vue'
import KnowledgeNode from './KnowledgeNode.vue'
import DetailPanel from './DetailPanel.vue'
import ConceptMorph from './ConceptMorph.vue'

const props = defineProps<{ step: number }>()
const scene = computed(() => getScene(props.step))
const layouts = Object.fromEntries(
  Object.entries(knowledgeMaps).map(([id, map]) => [id, layoutKnowledgeMap(map)]),
) as Record<MapId, ReturnType<typeof layoutKnowledgeMap>>

const activeMapId = computed<MapId>(() => scene.value.map === 'morph' ? 'one-variable' : scene.value.map)
const nodes = computed(() => layouts[activeMapId.value].nodes)
const edges = computed(() => layouts[activeMapId.value].edges)
const camera = useCamera(scene, nodes)
const visibleNodeIds = computed(() => {
  const declared = scene.value.visibleNodes === 'all'
    ? new Set(nodes.value.map(node => node.id))
    : new Set(scene.value.visibleNodes)
  if (scene.value.mode !== 'detail' || scene.value.map === 'one-variable' || !scene.value.focus)
    return declared
  const local = new Set([scene.value.focus])
  for (const edge of edges.value) {
    const distance = Math.hypot(edge.target.x - edge.source.x, edge.target.y - edge.source.y)
    if (distance > 520) continue
    if (edge.source.id === scene.value.focus) local.add(edge.target.id)
    if (edge.target.id === scene.value.focus) local.add(edge.source.id)
  }
  return new Set([...declared].filter(id => local.has(id)))
})
const visibleEdgeIds = computed(() => {
  const declared = scene.value.visibleEdges === 'all'
    ? new Set(edges.value.map(edge => edge.id))
    : new Set(scene.value.visibleEdges)
  return new Set(edges.value
    .filter(edge => declared.has(edge.id) && visibleNodeIds.value.has(edge.source.id) && visibleNodeIds.value.has(edge.target.id))
    .map(edge => edge.id))
})
const activeNode = computed(() => nodes.value.find(node => node.id === scene.value.focus))
const activeDetail = computed(() => scene.value.detailKey
  ? activeNode.value?.data.details?.[scene.value.detailKey]
  : undefined)

function isActiveEdge(id: string) {
  const edge = edges.value.find(item => item.id === id)
  return !!edge && (edge.source.id === scene.value.focus || edge.target.id === scene.value.focus)
}
</script>

<template>
  <main class="knowledge-stage">
    <KnowledgeOverview :chapter="scene.chapter" :headline="scene.headline" :step="step" :total="tour.length" />

    <ConceptMorph
      v-if="scene.map === 'morph' && scene.morphId && scene.morphPhase !== undefined"
      :key="scene.morphId"
      :morph-id="scene.morphId"
      :phase="scene.morphPhase"
    />

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
        />
        <KnowledgeNode
          v-for="node in nodes"
          :key="node.id"
          :node="node"
          :visible="visibleNodeIds.has(node.id)"
          :active="node.id === scene.focus"
          :dimmed="false"
          :mode="scene.mode"
        />
      </g>
    </svg>

    <DetailPanel
      :node="activeNode?.data"
      :detail="activeDetail"
      :visible="scene.mode === 'detail' && !!activeDetail && scene.map !== 'morph'"
    />
    <div class="stage-corner-label">简明数学分析 · Knowledge Map</div>
  </main>
</template>
