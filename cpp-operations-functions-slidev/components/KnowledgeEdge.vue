<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutEdge } from '../data/types'

const props = defineProps<{ edge: LayoutEdge; visible: boolean; active: boolean }>()
const path = computed(() => {
  const { source, target } = props.edge
  if (props.edge.type === 'hierarchy') {
    const startY = source.y + source.height / 2
    const endY = target.y - target.height / 2
    const midY = (startY + endY) / 2
    return `M ${source.x} ${startY} C ${source.x} ${midY}, ${target.x} ${midY}, ${target.x} ${endY}`
  }
  const startY = source.y + source.height / 2
  const endY = target.y + target.height / 2
  const dip = props.edge.type === 'application' ? 145 : 110
  return `M ${source.x} ${startY} C ${source.x} ${startY + dip}, ${target.x} ${endY + dip}, ${target.x} ${endY}`
})
const labelPosition = computed(() => ({
  x: (props.edge.source.x + props.edge.target.x) / 2,
  y: Math.max(props.edge.source.y + props.edge.source.height / 2, props.edge.target.y + props.edge.target.height / 2) + (props.edge.type === 'application' ? 112 : 82),
}))
</script>

<template>
  <g class="knowledge-edge" :class="{ visible, active, relation: edge.type !== 'hierarchy' }">
    <path :d="path" marker-end="url(#edge-arrow)" />
    <text v-if="edge.label && visible" :x="labelPosition.x" :y="labelPosition.y">{{ edge.label }}</text>
  </g>
</template>
