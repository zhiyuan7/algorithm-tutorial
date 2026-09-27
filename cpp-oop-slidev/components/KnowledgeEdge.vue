<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutEdge, LayoutNode } from '../data/types'
const props = defineProps<{ edge: LayoutEdge; visible: boolean; active: boolean; mapLayout: 'tree'; nodes: LayoutNode[] }>()
const route = computed(() => {
  const { source, target, type } = props.edge
  if (type === 'hierarchy') {
    const sy = source.y + source.height / 2, ty = target.y - target.height / 2, mid = (sy + ty) / 2
    return { path: `M ${source.x} ${sy} C ${source.x} ${mid}, ${target.x} ${mid}, ${target.x} ${ty}`, label: { x: (source.x + target.x) / 2, y: (source.y + target.y) / 2 - 9 } }
  }
  // Keep relation routes in the empty gutters below and beside every card.
  const y = Math.max(...props.nodes.map(node => node.y + node.height / 2)) + 85
  if (source.y === target.y) {
    return {
      path: `M ${source.x} ${source.y + source.height / 2} V ${y} H ${target.x} V ${target.y + target.height / 2}`,
      label: { x: (source.x + target.x) / 2, y: y - 12 },
    }
  }
  const x = Math.max(...props.nodes.map(node => node.x + node.width / 2)) + 65
  return {
    path: `M ${source.x} ${source.y + source.height / 2} V ${y} H ${x} V ${target.y} H ${target.x + target.width / 2}`,
    label: { x: (source.x + x) / 2, y: y - 12 },
  }
})
</script>
<template>
  <g class="knowledge-edge" :class="{ visible, active, relation: edge.type !== 'hierarchy' }">
    <path :d="route.path" marker-end="url(#edge-arrow)" />
    <text v-if="edge.label && visible" :x="route.label.x" :y="route.label.y">{{ edge.label }}</text>
  </g>
</template>
