<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutEdge } from '../data/types'

const props = defineProps<{ edge: LayoutEdge; visible: boolean; active: boolean }>()
const isRelation = computed(() => props.edge.type === 'implies')
const geometry = computed(() => {
  const { source: a, target: b, id } = props.edge
  const bottom = (n: typeof a) => n.y + n.height / 2 + 10
  const top = (n: typeof a) => n.y - n.height / 2 - 10
  if (isRelation.value) {
    const y = id === 'one-equivalence' ? 750 : 810
    return { path: `M ${a.x} ${bottom(a)} V ${y} H ${b.x} V ${bottom(b)}`, x: (a.x + b.x) / 2, y: y - 14 }
  }
  if ((id === 'class-hessian' || id === 'class-matrix-functions') && Math.abs(a.x - b.x) > 1) {
    const sign = id === 'class-hessian' ? -1 : 1
    const sx = a.x + sign * (a.width / 2 + 10)
    const tx = b.x + sign * (b.width / 2 + 10)
    const x = sign < 0 ? Math.min(sx, tx) - 55 : Math.max(sx, tx) + 5
    const radius = Math.min(20, Math.abs(x - tx))
    return {
      path: `M ${sx} ${a.y} H ${x - sign * radius} Q ${x} ${a.y} ${x} ${a.y + radius} V ${b.y - radius} Q ${x} ${b.y} ${x - sign * radius} ${b.y} H ${tx}`,
      x, y: (a.y + b.y) / 2,
    }
  }
  if (id === 'complex-holo') {
    const x = a.x + a.width / 2 + 65
    return {
      path: `M ${a.x + a.width / 2 + 10} ${a.y} H ${x - 20} Q ${x} ${a.y} ${x} ${a.y + 20} V ${b.y - 20} Q ${x} ${b.y} ${x - 20} ${b.y} H ${b.x + b.width / 2 + 10}`,
      x: x + 12, y: (a.y + b.y) / 2, side: true,
    }
  }
  const sy = bottom(a), ty = top(b), mid = (sy + ty) / 2
  if (Math.abs(a.x - b.x) < 1) return { path: `M ${a.x} ${sy} V ${ty}`, x: a.x + 25, y: mid + 5, side: true }
  return { path: `M ${a.x} ${sy} C ${a.x} ${mid}, ${b.x} ${mid}, ${b.x} ${ty}`, x: (a.x + b.x) / 2, y: mid - 13 }
})
</script>

<template>
  <g class="knowledge-edge" :data-edge-id="edge.id" :class="{ visible, active, relation: isRelation }">
    <path :d="geometry.path" marker-end="url(#edge-arrow)" :marker-start="edge.id === 'one-equivalence' ? 'url(#edge-arrow)' : undefined" />
    <text v-if="visible && edge.label" :x="geometry.x" :y="geometry.y" :style="geometry.side ? { textAnchor: 'start' } : undefined">{{ edge.label }}</text>
  </g>
</template>
