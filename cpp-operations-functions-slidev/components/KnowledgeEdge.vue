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
  const lane = Math.max(startY, endY) + (props.edge.type === 'application' ? 160 : 110)
  if (Math.abs(source.x - target.x) < Math.max(source.width, target.width)) {
    const left = Math.min(source.x - source.width / 2, target.x - target.width / 2) - 85
    return `M ${source.x - source.width / 2} ${source.y} H ${left} V ${target.y} H ${target.x - target.width / 2}`
  }
  return `M ${source.x} ${startY} V ${lane} H ${target.x} V ${endY}`
})
const labelPosition = computed(() => {
  const { source, target } = props.edge
  if (Math.abs(source.x - target.x) < Math.max(source.width, target.width)) {
    return { x: Math.min(source.x - source.width / 2, target.x - target.width / 2) - 115, y: (source.y + target.y) / 2 }
  }
  return { x: (source.x + target.x) / 2,
    y: Math.max(source.y + source.height / 2, target.y + target.height / 2) + (props.edge.type === 'application' ? 160 : 110) - 14 }
})
</script>

<template>
  <g class="knowledge-edge" :class="{ visible, active, relation: edge.type !== 'hierarchy' }">
    <path :d="path" marker-end="url(#edge-arrow)" />
    <text v-if="edge.label && visible" :x="labelPosition.x" :y="labelPosition.y">{{ edge.label }}</text>
  </g>
</template>
