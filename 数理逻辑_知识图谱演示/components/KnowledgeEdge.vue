<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutEdge } from '../data/types'

const props = defineProps<{
  edge: LayoutEdge
  visible: boolean
  active: boolean
}>()

const path = computed(() => {
  const { source, target } = props.edge
  if (props.edge.type === 'hierarchy') {
    const startY = source.y + source.height / 2
    const endY = target.y - target.height / 2
    const midY = (startY + endY) / 2
    return `M ${source.x} ${startY} C ${source.x} ${midY}, ${target.x} ${midY}, ${target.x} ${endY}`
  }
  if (Math.abs(source.y - target.y) < 20) {
    const arc = source.x < target.x ? -115 : 115
    return `M ${source.x} ${source.y} C ${(source.x + target.x) / 2} ${source.y + arc}, ${(source.x + target.x) / 2} ${target.y + arc}, ${target.x} ${target.y}`
  }
  const bendY = (source.y + target.y) / 2
  return `M ${source.x} ${source.y} C ${source.x} ${bendY}, ${target.x} ${bendY}, ${target.x} ${target.y}`
})

const labelPosition = computed(() => {
  const { source, target } = props.edge
  const sameRow = Math.abs(source.y - target.y) < 20
  return {
    x: (source.x + target.x) / 2,
    y: sameRow ? source.y + (source.x < target.x ? -86 : 105) : (source.y + target.y) / 2 - 12,
  }
})
</script>

<template>
  <g class="knowledge-edge" :class="{ visible, active, relation: edge.type !== 'hierarchy' }">
    <path :d="path" marker-end="url(#edge-arrow)" />
    <text v-if="edge.label && visible" :x="labelPosition.x" :y="labelPosition.y">{{ edge.label }}</text>
  </g>
</template>
