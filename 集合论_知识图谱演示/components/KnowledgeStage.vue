<script setup lang="ts">
import { computed, toRef } from 'vue'
import { knowledgeMaps } from '../data/knowledge'
import { getScene, tour } from '../data/tour'
import { layoutKnowledgeMap } from '../composables/useKnowledgeLayout'
import { useCamera } from '../composables/useCamera'
import KnowledgeNode from './KnowledgeNode.vue'
import KnowledgeEdge from './KnowledgeEdge.vue'
import DetailPanel from './DetailPanel.vue'
import KnowledgeOverview from './KnowledgeOverview.vue'
import SetTheoryMorph from './SetTheoryMorph.vue'

const props = defineProps<{ step: number }>()
const stepRef = toRef(props, 'step')
const scene = computed(() => getScene(stepRef.value))

const layouts = Object.fromEntries(
  Object.entries(knowledgeMaps).map(([id, map]) => [id, layoutKnowledgeMap(map)]),
) as Record<keyof typeof knowledgeMaps, ReturnType<typeof layoutKnowledgeMap>>

const isMorph = computed(() => scene.value.map.startsWith('morph-'))
const morphPhase = computed(() => scene.value.map === 'morph-foundation-construction'
  ? 'foundation-construction'
  : 'construction-infinity')
const activeMap = computed(() => {
  if (scene.value.map === 'morph-foundation-construction') return knowledgeMaps['construction-ladder']
  if (scene.value.map === 'morph-construction-infinity') return knowledgeMaps['infinity-ladder']
  return knowledgeMaps[scene.value.map]
})
const layout = computed(() => layouts[activeMap.value.id])
const nodes = computed(() => layout.value.nodes)
const edges = computed(() => layout.value.edges)
const camera = useCamera(scene, nodes)

const visibleNodeIds = computed(() => {
  const requested = scene.value.visibleNodes === 'all'
    ? new Set(nodes.value.map(node => node.id))
    : new Set(scene.value.visibleNodes)
  if (scene.value.mode !== 'detail' || scene.value.framing !== 'node') return requested

  const lineage = new Set<string>()
  let cursor = nodes.value.find(node => node.id === scene.value.focus)
  while (cursor) {
    lineage.add(cursor.id)
    cursor = cursor.parentId ? nodes.value.find(node => node.id === cursor?.parentId) : undefined
  }
  return new Set([...requested].filter(id => lineage.has(id)))
})
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

    <SetTheoryMorph v-if="isMorph" :key="scene.id" :phase="morphPhase" />

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
        />
      </g>
    </svg>

    <DetailPanel
      :node="activeNode?.data"
      :detail="activeDetail"
      :visible="scene.mode === 'detail' && !!activeDetail"
    />

    <div class="stage-corner-label">集合论 · Knowledge Map</div>
  </main>
</template>
