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
  const side = props.edge.type === 'limits'
    ? -1
    : props.edge.type === 'subset' && source.x < target.x
      ? -1
      : 1
  const bendX = Math.max(120, Math.abs(target.y - source.y) * 0.34) * side
  const sx = source.x + side * source.width * 0.42
  const sy = source.y
  const tx = target.x + side * target.width * 0.42
  const ty = target.y
  return `M ${sx} ${sy} C ${sx + bendX} ${sy}, ${tx + bendX} ${ty}, ${tx} ${ty}`
})

const labelPosition = computed(() => {
  const { source, target } = props.edge
  if (props.edge.type === 'hierarchy') return { x: (source.x + target.x) / 2, y: (source.y + target.y) / 2 }
  const side = props.edge.type === 'limits'
    ? -1
    : props.edge.type === 'subset' && source.x < target.x
      ? -1
      : 1
  return {
    x: (source.x + target.x) / 2 + side * 145,
    y: (source.y + target.y) / 2 - 8,
  }
})
</script>

<template>
  <g class="knowledge-edge" :class="[{ visible, active }, edge.type]">
    <path :d="path" marker-end="url(#edge-arrow)" />
    <text v-if="edge.label && visible" :x="labelPosition.x" :y="labelPosition.y">{{ edge.label }}</text>
  </g>
</template>
