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

const props = defineProps<{ step: number }>()
const scene = computed(() => getScene(props.step))
const layouts = Object.fromEntries(
  Object.entries(knowledgeMaps).map(([id, map]) => [id, layoutKnowledgeMap(map)]),
) as Record<MapId, ReturnType<typeof layoutKnowledgeMap>>

const activeMapId = computed<MapId>(() => scene.value.map)
const mapNodes = computed(() => layouts[activeMapId.value].nodes)
const visibleNodeIds = computed(() => {
  if (scene.value.visibleNodes === 'all') return new Set(mapNodes.value.map(node => node.id))
  const ids = new Set(scene.value.visibleNodes)
  // Keep only the current branch and its ancestors; siblings return at review.
  for (const id of [...ids]) {
    let cursor = mapNodes.value.find(node => node.id === id)
    while (cursor?.parentId) {
      ids.add(cursor.parentId)
      cursor = mapNodes.value.find(node => node.id === cursor?.parentId)
    }
  }
  return ids
})
// Compact the displayed branch so keeping its lineage still enlarges the focus.
// Overview keeps the authored coordinates and restores the complete graph.
const nodes = computed(() => {
  if (scene.value.mode !== 'detail') return mapNodes.value
  const local = mapNodes.value.filter(node => visibleNodeIds.value.has(node.id)).sort((a, b) => a.y - b.y)
  const order = new Map(local.map((node, index) => [node.id, index]))
  return mapNodes.value.map(node => order.has(node.id) ? {
    ...node, x: 800, y: 160 + order.get(node.id)! * 150,
    width: Math.max(node.id === scene.value.focus ? 360 : 300, node.width),
    height: node.id === scene.value.focus ? 105 : 85,
  } : node)
})
const edges = computed(() => {
  const byId = new Map(nodes.value.map(node => [node.id, node]))
  return layouts[activeMapId.value].edges.map(edge => ({ ...edge, source: byId.get(edge.source.id)!, target: byId.get(edge.target.id)! }))
})
const framedNodes = computed(() => nodes.value.filter(node => visibleNodeIds.value.has(node.id)))
const camera = useCamera(scene, framedNodes)
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
  <main class="knowledge-stage" :data-scene="scene.id">
    <KnowledgeOverview :chapter="scene.chapter" :headline="scene.headline" :step="step" :total="tour.length" />

    <svg class="knowledge-world" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="edge-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
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
      :visible="scene.mode === 'detail' && !!activeDetail"
    />
    <div class="stage-corner-label">数学分析 · 从局部变化到计算</div>
  </main>
</template>
