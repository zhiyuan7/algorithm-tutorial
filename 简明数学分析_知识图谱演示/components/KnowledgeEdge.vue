<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutEdge } from '../data/types'

const props = defineProps<{ edge: LayoutEdge; visible: boolean; active: boolean }>()

const geometry = computed(() => {
  const { source, target } = props.edge
  const dx = target.x - source.x
  const dy = target.y - source.y
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const sourceRadius = Math.min(source.width, source.height) * .45
  const targetRadius = Math.min(target.width, target.height) * .45
  const sx = source.x + ux * sourceRadius
  const sy = source.y + uy * sourceRadius
  const tx = target.x - ux * targetRadius
  const ty = target.y - uy * targetRadius
  const bend = props.edge.id === 'one-r4' ? -90 : props.edge.id === 'many-r8' ? -75 : 0
  const mx = (sx + tx) / 2 - uy * bend
  const my = (sy + ty) / 2 + ux * bend
  return {
    path: `M ${sx} ${sy} Q ${mx} ${my} ${tx} ${ty}`,
    labelX: mx,
    labelY: my - 11,
  }
})
</script>

<template>
  <g class="knowledge-edge" :class="{ visible, active, relation: edge.type === 'limits' || edge.type === 'applies' }">
    <path :d="geometry.path" marker-end="url(#edge-arrow)" :marker-start="edge.id === 'one-r3' ? 'url(#edge-arrow)' : undefined" />
    <text v-if="visible" :x="geometry.labelX" :y="geometry.labelY">{{ edge.label }}</text>
  </g>
</template>
