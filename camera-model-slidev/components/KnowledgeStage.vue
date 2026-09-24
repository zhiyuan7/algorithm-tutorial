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
import MorphBridge from './MorphBridge.vue'
import type { MapId } from '../data/types'

const props=defineProps<{step:number}>()
const scene=computed(()=>getScene(toRef(props,'step').value))
const layouts=Object.fromEntries(Object.entries(knowledgeMaps).map(([id,map])=>[id,layoutKnowledgeMap(map)])) as Record<MapId,ReturnType<typeof layoutKnowledgeMap>>
const activeMap=computed(()=>knowledgeMaps[scene.value.map==='morph'?(scene.value.morphKind==='inverse'?'inference':'color'):scene.value.map])
const layout=computed(()=>layouts[activeMap.value.id])
const nodes=computed(()=>layout.value.nodes)
const edges=computed(()=>layout.value.edges)
const camera=useCamera(scene,nodes)
const visibleNodeIds=computed(()=>scene.value.visibleNodes==='all'?new Set(nodes.value.map(node=>node.id)):new Set(scene.value.visibleNodes))
const visibleEdgeIds=computed(()=>scene.value.visibleEdges==='all'?new Set(edges.value.map(edge=>edge.id)):new Set(scene.value.visibleEdges))
const activeNode=computed(()=>nodes.value.find(node=>node.id===scene.value.focus))
const activeDetail=computed(()=>activeNode.value?.data.details?.[scene.value.detailKey??''])
const isActiveEdge=(id:string)=>{const e=edges.value.find(edge=>edge.id===id);return !!e&&(e.source.id===scene.value.focus||e.target.id===scene.value.focus)}
</script>
<template>
  <main class="knowledge-stage">
    <KnowledgeOverview :chapter="scene.chapter" :headline="scene.headline" :step="step" :total="tour.length" />
    <MorphBridge v-if="scene.map==='morph'" :key="scene.morphKind" :kind="scene.morphKind!" :phase="scene.morphPhase!" />
    <svg v-else class="knowledge-world" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet">
      <defs><marker id="edge-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="edge-arrow-shape" /></marker></defs>
      <g class="camera" :transform="camera.transform">
        <KnowledgeEdge v-for="edge in edges" :key="edge.id" :edge="edge" :visible="visibleEdgeIds.has(edge.id)" :active="isActiveEdge(edge.id)" />
        <KnowledgeNode v-for="node in nodes" :key="node.id" :node="node" :visible="visibleNodeIds.has(node.id)" :active="node.id===scene.focus" :dimmed="false" :mode="scene.mode" />
      </g>
    </svg>
    <DetailPanel :node="activeNode?.data" :detail="activeDetail" :visible="scene.mode==='detail'&&!!activeDetail" />
    <div class="stage-corner-label">相机模型 · Knowledge Map</div>
  </main>
</template>
