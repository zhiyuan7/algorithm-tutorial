<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutEdge } from '../data/types'

const props = defineProps<{
  edge: LayoutEdge
  visible: boolean
  active: boolean
}>()

const geometry = computed(() => {
  const { source, target } = props.edge
  const labelX = (source.x + target.x) / 2
  if (props.edge.type === 'hierarchy') {
    const startY = source.y + source.height / 2
    const endY = target.y - target.height / 2
    const midY = (startY + endY) / 2
    return {
      path: `M ${source.x} ${startY} C ${source.x} ${midY}, ${target.x} ${midY}, ${target.x} ${endY}`,
      label: { x: labelX, y: midY - 12 },
    }
  }
  if (Math.abs(source.y - target.y) < 20) {
    // Forward implication goes above the cards; the converse goes below.
    const direction = source.x < target.x ? -1 : 1
    const startY = source.y + direction * source.height / 2
    const endY = target.y + direction * target.height / 2
    const controlY = (startY + endY) / 2 + direction * 90
    const middleY = (startY + endY) / 2 + direction * 67.5
    return {
      path: `M ${source.x} ${startY} C ${source.x} ${controlY}, ${target.x} ${controlY}, ${target.x} ${endY}`,
      label: { x: labelX, y: middleY + direction * 18 },
    }
  }
  const direction = Math.sign(target.y - source.y)
  const startY = source.y + direction * source.height / 2
  const endY = target.y - direction * target.height / 2
  const bendY = (startY + endY) / 2
  return {
    path: `M ${source.x} ${startY} C ${source.x} ${bendY}, ${target.x} ${bendY}, ${target.x} ${endY}`,
    label: { x: labelX, y: bendY - 12 },
  }
})
</script>

<template>
  <g class="knowledge-edge" :class="{ visible, active, relation: edge.type !== 'hierarchy' }">
    <path :d="geometry.path" marker-end="url(#edge-arrow)" />
    <text v-if="edge.label && visible" :x="geometry.label.x" :y="geometry.label.y">{{ edge.label }}</text>
  </g>
</template>
