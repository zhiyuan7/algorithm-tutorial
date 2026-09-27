<script setup lang="ts">
import { computed } from 'vue'
import type { KnowledgeMapData, LayoutEdge } from '../data/types'

const props = defineProps<{ edge: LayoutEdge; visible: boolean; active: boolean; mapLayout: KnowledgeMapData['layout'] }>()
const geometry = computed(() => {
  const { source: a, target: b, id } = props.edge
  const gap = 18
  const bottom = (n: typeof a) => n.y + n.height / 2 + gap
  const top = (n: typeof a) => n.y - n.height / 2 - gap
  const left = (n: typeof a) => n.x - n.width / 2 - gap
  const right = (n: typeof a) => n.x + n.width / 2 + gap
  const viaBelow = (y: number) => ({
    path: `M ${a.x} ${bottom(a)} L ${a.x} ${y - 20} Q ${a.x} ${y} ${a.x + Math.sign(b.x-a.x)*20} ${y} L ${b.x - Math.sign(b.x-a.x)*20} ${y} Q ${b.x} ${y} ${b.x} ${y - 20} L ${b.x} ${bottom(b)}`,
    x: (a.x + b.x) / 2, y: y - 12,
  })
  if (id === 'r-separation-russell') return viaBelow(680)
  if (id === 'r-equivalence-integers') return {
    // Enter the integer card from its left side, leaving its downward number-chain edge clear.
    path: `M ${a.x} ${bottom(a)} L ${a.x} 515 Q ${a.x} 535 ${a.x+20} 535 L 1070 535 Q 1090 535 1090 515 L 1090 ${b.y+20} Q 1090 ${b.y} 1110 ${b.y} L ${left(b)} ${b.y}`,
    x: 748, y: 523,
  }
  if (id === 'r-countable-diagonal') return {
    path: `M ${right(a)} ${a.y} L ${left(b)} ${b.y}`,
    x: (right(a)+left(b))/2, y: a.y - 18,
  }
  if (id === 'r-universal-zfc') return {
    path: `M ${right(a)} ${a.y} L 740 ${a.y} Q 760 ${a.y} 760 ${a.y-20} L 760 ${b.y+20} Q 760 ${b.y} 780 ${b.y} L ${left(b)} ${b.y}`,
    x: 830, y: b.y - 18,
  }
  if (id === 'r-order-naturals' || id === 'r-diagonal-cantor') {
    const x = id === 'r-order-naturals' ? 825 : 820
    return {
      path: `M ${right(a)} ${a.y} L ${x-20} ${a.y} Q ${x} ${a.y} ${x} ${a.y-20} L ${x} ${b.y+20} Q ${x} ${b.y} ${x+20} ${b.y} L ${left(b)} ${b.y}`,
      x: x + 86, y: (a.y+b.y)/2 - 8,
    }
  }
  if (id === 'r-cantor-independence') {
    const x = 1380
    return {
      path: `M ${right(a)} ${a.y} L ${x-20} ${a.y} Q ${x} ${a.y} ${x} ${a.y+20} L ${x} ${b.y-20} Q ${x} ${b.y} ${x-20} ${b.y} L ${right(b)} ${b.y}`,
      x: x+12, y: (a.y+b.y)/2,
    }
  }
  if (Math.abs(b.y-a.y) < 1) {
    const sx=right(a), tx=left(b)
    return { path: `M ${sx} ${a.y} L ${tx} ${b.y}`, x:(sx+tx)/2, y:a.y-18 }
  }
  const sy=bottom(a), ty=top(b), mid=(sy+ty)/2
  return { path: `M ${a.x} ${sy} C ${a.x} ${mid}, ${b.x} ${mid}, ${b.x} ${ty}`, x:(a.x+b.x)/2, y:mid-12 }
})
</script>

<template>
  <g class="knowledge-edge" :data-edge-id="edge.id" :class="{ visible, active, relation: edge.type !== 'hierarchy' }">
    <path :d="geometry.path" marker-end="url(#edge-arrow)" />
    <text v-if="edge.label && visible" :x="geometry.x" :y="geometry.y">{{ edge.label }}</text>
  </g>
</template>
