<script setup lang="ts">
import { computed } from 'vue'
import type { KnowledgeMapData, LayoutEdge } from '../data/types'

const props = defineProps<{
  edge: LayoutEdge
  visible: boolean
  active: boolean
  mapLayout: KnowledgeMapData['layout']
}>()

const relationGeometry = computed(() => {
  const { source, target } = props.edge
  const dx = target.x - source.x
  const dy = target.y - source.y
  if (Math.abs(dx) >= Math.abs(dy)) {
    const direction = Math.sign(dx) || 1
    const sx = source.x + direction * source.width / 2
    const tx = target.x - direction * target.width / 2
    const curveY = (source.y + target.y) / 2 + (props.edge.id === 'r-equivalence-integers' ? 105 : 58)
    return {
      path: `M ${sx} ${source.y} C ${(sx + tx) / 2} ${curveY}, ${(sx + tx) / 2} ${curveY}, ${tx} ${target.y}`,
      x: (sx + tx) / 2,
      y: curveY - 10,
    }
  }
  const direction = Math.sign(dy) || 1
  const sy = source.y + direction * source.height / 2
  const ty = target.y - direction * target.height / 2
  const curveX = (source.x + target.x) / 2 + 70
  return {
    path: `M ${source.x} ${sy} C ${curveX} ${(sy + ty) / 2}, ${curveX} ${(sy + ty) / 2}, ${target.x} ${ty}`,
    x: curveX,
    y: (sy + ty) / 2 - 10,
  }
})

const path = computed(() => {
  const { source, target } = props.edge
  if (props.edge.type === 'hierarchy') {
    const vertical = Math.abs(target.y - source.y) >= Math.abs(target.x - source.x)
    if (vertical) {
      const startY = source.y + source.height / 2
      const endY = target.y - target.height / 2
      const midY = (startY + endY) / 2
      return `M ${source.x} ${startY} C ${source.x} ${midY}, ${target.x} ${midY}, ${target.x} ${endY}`
    }
    const direction = Math.sign(target.x - source.x) || 1
    const startX = source.x + direction * source.width / 2
    const endX = target.x - direction * target.width / 2
    const midX = (startX + endX) / 2
    return `M ${startX} ${source.y} C ${midX} ${source.y}, ${midX} ${target.y}, ${endX} ${target.y}`
  }
  return relationGeometry.value.path
})

const labelPosition = computed(() => relationGeometry.value)
</script>

<template>
  <g class="knowledge-edge" :class="{ visible, active, relation: edge.type !== 'hierarchy' }">
    <path :d="path" marker-end="url(#edge-arrow)" />
    <text v-if="edge.label && visible" :x="labelPosition.x" :y="labelPosition.y">{{ edge.label }}</text>
  </g>
</template>
