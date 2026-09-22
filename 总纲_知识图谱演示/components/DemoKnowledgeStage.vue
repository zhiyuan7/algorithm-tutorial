<script setup lang="ts">
import { computed } from 'vue'
import { layoutKnowledgeMap } from '../composables/useKnowledgeLayout'
import KnowledgeNode from './KnowledgeNode.vue'
import KnowledgeEdge from './KnowledgeEdge.vue'
import type { KnowledgeMapData } from '../data/types'

const props = defineProps<{ step: number }>()

const demo: KnowledgeMapData = {
  id: 'scientific-paradigms',
  title: 'Demo',
  subtitle: 'Reusable camera and node states',
  layout: 'tree',
  root: {
    id: 'demo-root', title: 'Demo', summary: '一个最小知识舞台', accent: '#13254F', children: [
      { id: 'concept-a', title: 'Concept A', summary: '第一个概念', accent: '#163F6F', children: [
        { id: 'a1', title: 'A1', summary: '详情收缩后成为节点', accent: '#396D80' },
        { id: 'a2', title: 'A2', summary: '镜头平滑移向下一点', accent: '#396D80' },
      ] },
      { id: 'concept-b', title: 'Concept B', summary: '第二个概念', accent: '#624F6B', children: [
        { id: 'b1', title: 'B1', summary: '新知识出现', accent: '#B5855F' },
        { id: 'b2', title: 'B2', summary: '最终拉远查看全图', accent: '#B5855F' },
      ] },
    ],
  },
  relations: [{ id: 'demo-cross', source: 'a2', target: 'b1', label: '横向联系', type: 'supports' }],
}

const layout = layoutKnowledgeMap(demo)
const order = ['demo-root', 'concept-a', 'a1', 'a2', 'concept-b', 'b1', 'b2']
const focus = computed(() => order[Math.min(props.step, order.length - 1)])
const visible = computed(() => new Set(order.slice(0, Math.min(props.step + 1, order.length))))
const allVisible = computed(() => props.step >= 7)
const cameraTransform = computed(() => {
  if (allVisible.value) return 'translate(800 450) scale(.86) translate(-800 -440)'
  const node = layout.nodes.find(item => item.id === focus.value)!
  return `translate(800 450) scale(1.18) translate(${-node.x} ${-node.y})`
})
</script>

<template>
  <main class="knowledge-stage demo-stage">
    <header class="stage-header">
      <div><p class="stage-chapter">MINIMUM DEMO</p><h1>同一个世界，不同的镜头状态</h1></div>
    </header>
    <svg class="knowledge-world" viewBox="0 0 1600 900">
      <defs><marker id="edge-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" class="edge-arrow-shape" /></marker></defs>
      <g class="camera" :transform="cameraTransform">
        <KnowledgeEdge v-for="edge in layout.edges" :key="edge.id" :edge="edge" :visible="allVisible || visible.has(edge.target.id)" :active="edge.target.id === focus" map-layout="tree" />
        <KnowledgeNode v-for="node in layout.nodes" :key="node.id" :node="node" :visible="allVisible || visible.has(node.id)" :active="node.id === focus" :dimmed="false" :mode="node.id === focus && !allVisible ? 'detail' : 'concept'" />
      </g>
    </svg>
  </main>
</template>
