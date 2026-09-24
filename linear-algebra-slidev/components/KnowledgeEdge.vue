<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutEdge } from '../data/types'

const props = defineProps<{
  edge: LayoutEdge
  visible: boolean
  active: boolean
  mapLayout: 'tree'
}>()

const path = computed(() => {
  const { source, target } = props.edge
  if (props.edge.type === 'hierarchy') {
    const startY = source.y + source.height / 2
    const endY = target.y - target.height / 2
    const midY = (startY + endY) / 2
    return `M ${source.x} ${startY} C ${source.x} ${midY}, ${target.x} ${midY}, ${target.x} ${endY}`
  }
  const offset = source.y === target.y ? 110 : 85
  const direction = source.y <= target.y ? 1 : -1
  return `M ${source.x} ${source.y} C ${source.x} ${source.y + offset * direction}, ${target.x} ${target.y + offset * direction}, ${target.x} ${target.y}`
})

const labelPosition = computed(() => ({
  x: (props.edge.source.x + props.edge.target.x) / 2,
  y: props.edge.type !== 'hierarchy' && props.edge.source.y === props.edge.target.y
    ? props.edge.source.y + 112
    : (props.edge.source.y + props.edge.target.y) / 2 - 10,
}))
</script>

<template>
  <g class="knowledge-edge" :class="{ visible, active, relation: edge.type !== 'hierarchy' }">
    <path :d="path" marker-end="url(#edge-arrow)" />
    <text v-if="edge.label && visible" :x="labelPosition.x" :y="labelPosition.y">{{ edge.label }}</text>
  </g>
</template>
