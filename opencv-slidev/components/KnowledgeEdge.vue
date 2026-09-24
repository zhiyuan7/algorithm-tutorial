<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutEdge } from '../data/types'
const props = defineProps<{ edge: LayoutEdge; visible: boolean; active: boolean; mapLayout: 'grid' }>()
const geometry = computed(() => {
  const { source, target } = props.edge
  if (props.edge.id === 'p-roi-hsv' || props.edge.id === 'p-filter-gradient') {
    const top = source.y - source.height / 2
    const arch = props.edge.id === 'p-roi-hsv' ? 215 : 425
    return {
      d: `M ${source.x} ${top} C ${source.x} ${arch}, ${target.x} ${arch}, ${target.x} ${top}`,
      x: props.edge.id === 'p-roi-hsv' ? 800 : 1070,
      y: arch - 7,
    }
  }
  const dx = target.x - source.x
  const dy = target.y - source.y
  const horizontal = Math.abs(dx) > Math.abs(dy) * 1.25
  const sx = source.x + (horizontal ? Math.sign(dx) * source.width / 2 : 0)
  const sy = source.y + (horizontal ? 0 : Math.sign(dy) * source.height / 2)
  const tx = target.x - (horizontal ? Math.sign(dx) * target.width / 2 : 0)
  const ty = target.y - (horizontal ? 0 : Math.sign(dy) * target.height / 2)
  const d = horizontal
    ? `M ${sx} ${sy} C ${(sx + tx) / 2} ${sy}, ${(sx + tx) / 2} ${ty}, ${tx} ${ty}`
    : `M ${sx} ${sy} C ${sx} ${(sy + ty) / 2}, ${tx} ${(sy + ty) / 2}, ${tx} ${ty}`
  if (props.edge.id === 'p-hsv-morph') return { d, x: 1120, y: 382 }
  return { d, x: (sx + tx) / 2, y: (sy + ty) / 2 - 12 }
})
</script>
<template>
  <g class="knowledge-edge" :class="{ visible, active, relation: true }">
    <path :d="geometry.d" marker-end="url(#edge-arrow)" />
    <text v-if="edge.label && visible" :x="geometry.x" :y="geometry.y">{{ edge.label }}</text>
  </g>
</template>
