<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutEdge } from '../data/types'

const props = defineProps<{
  edge: LayoutEdge
  visible: boolean
  active: boolean
  mapLayout: 'cycle' | 'tree'
}>()

const path = computed(() => {
  const { source, target } = props.edge
  if (props.edge.type === 'hierarchy') {
    const startY = source.y + source.height / 2
    const endY = target.y - target.height / 2
    const midY = (startY + endY) / 2
    return `M ${source.x} ${startY} C ${source.x} ${midY}, ${target.x} ${midY}, ${target.x} ${endY}`
  }
  const gap = 18
  const startY = source.y + source.height / 2 + gap
  const endY = target.y + target.height / 2 + gap
  const laneY = Math.max(startY, endY) + 54
  return `M ${source.x} ${startY} L ${source.x} ${laneY} L ${target.x} ${laneY} L ${target.x} ${endY}`
})

const labelPosition = computed(() => ({
  x: (props.edge.source.x + props.edge.target.x) / 2,
  y: props.edge.type === 'hierarchy'
    ? (props.edge.source.y + props.edge.target.y) / 2 - 10
    : Math.max(
        props.edge.source.y + props.edge.source.height / 2,
        props.edge.target.y + props.edge.target.height / 2,
      ) + 18 + 54 + 26,
}))
</script>

<template>
  <g class="knowledge-edge" :data-edge-id="edge.id" :class="{ visible, active, relation: edge.type !== 'hierarchy' }">
    <path :d="path" :marker-end="edge.type === 'hierarchy' ? 'url(#edge-arrow)' : 'url(#edge-arrow-relation)'" />
    <text v-if="edge.label && visible" :x="labelPosition.x" :y="labelPosition.y">{{ edge.label }}</text>
  </g>
</template>
