<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutEdge, LayoutNode } from '../data/types'

const props = defineProps<{
  edge: LayoutEdge
  visible: boolean
  active: boolean
  nodes?: LayoutNode[]
  mapLayout: 'cycle' | 'tree'
}>()

// Keep cross-branch routes outside the knowledge cards, using layout bounds.
const outerRoute = computed(() => {
  if (props.mapLayout !== 'tree' || props.edge.type === 'hierarchy' || !props.nodes?.length) return undefined
  const { source, target, type } = props.edge
  const left = Math.min(...props.nodes.map(node => node.x - node.width / 2)) - 50
  const right = Math.max(...props.nodes.map(node => node.x + node.width / 2)) + 50
  const bottom = Math.max(...props.nodes.map(node => node.y + node.height / 2))
  if (type === 'limits') {
    const below = bottom + 40
    const sx = source.x - source.width / 2
    const ty = target.y + target.height / 2
    return {
      path: `M ${sx} ${source.y} H ${left} V ${below} H ${target.x} V ${ty}`,
      label: { x: (left + target.x) / 2, y: below - 10 },
    }
  }
  if (type === 'application') {
    const below = bottom + 90
    const sy = source.y + source.height / 2
    const tx = target.x + target.width / 2
    return {
      path: `M ${source.x} ${sy} V ${below} H ${right} V ${target.y} H ${tx}`,
      label: { x: right + 8, y: (below + target.y) / 2, anchor: 'start' as const },
    }
  }
  // Same-column relationships terminate at the card boundaries.
  if (source.x === target.x) {
    const direction = Math.sign(target.y - source.y)
    const sy = source.y + direction * source.height / 2
    const ty = target.y - direction * target.height / 2
    return {
      path: `M ${source.x} ${sy} V ${ty}`,
      label: { x: source.x + 16, y: (sy + ty) / 2, anchor: 'start' as const },
    }
  }
  return undefined
})

const path = computed(() => {
  if (outerRoute.value) return outerRoute.value.path
  const { source, target } = props.edge
  if (props.mapLayout === 'cycle' && props.edge.type !== 'hierarchy') {
    const controls: Record<string, [number, number]> = {
      'r-reality-induction': [1215, 145],
      'r-induction-theory': [1215, 755],
      'r-theory-deduction': [385, 755],
      'r-deduction-reality': [385, 145],
    }
    const [cornerX, cornerY] = controls[props.edge.id] ?? [(source.x + target.x) / 2, (source.y + target.y) / 2]
    const sx = source.x + Math.sign(target.x - source.x) * source.width * 0.38
    const sy = source.y + Math.sign(target.y - source.y) * source.height * 0.38
    const tx = target.x - Math.sign(target.x - source.x) * target.width * 0.38
    const ty = target.y - Math.sign(target.y - source.y) * target.height * 0.38
    return `M ${sx} ${sy} Q ${cornerX} ${cornerY} ${tx} ${ty}`
  }
  if (props.edge.type === 'hierarchy') {
    const startY = source.y + source.height / 2
    const endY = target.y - target.height / 2
    const midY = (startY + endY) / 2
    return `M ${source.x} ${startY} C ${source.x} ${midY}, ${target.x} ${midY}, ${target.x} ${endY}`
  }
  const offset = source.y === target.y ? 110 : 85
  const direction = source.y <= target.y ? 1 : -1
  return `M ${source.x} ${source.y} C ${source.x} ${source.y + offset * direction}, ${target.x} ${target.y + offset * direction}, ${target.x} ${target.y}`
})

const labelPosition = computed(() => outerRoute.value?.label ?? ({
  x: (props.edge.source.x + props.edge.target.x) / 2,
  y: props.edge.type !== 'hierarchy' && props.edge.source.y === props.edge.target.y
    ? props.edge.source.y + 112
    : (props.edge.source.y + props.edge.target.y) / 2 - 10,
}))
</script>

<template>
  <g class="knowledge-edge" :class="{ visible, active, relation: edge.type !== 'hierarchy' }">
    <path :d="path" marker-end="url(#edge-arrow)" />
    <text v-if="edge.label && visible" :x="labelPosition.x" :y="labelPosition.y" :style="{ textAnchor: outerRoute?.label.anchor ?? 'middle' }">{{ edge.label }}</text>
  </g>
</template>
