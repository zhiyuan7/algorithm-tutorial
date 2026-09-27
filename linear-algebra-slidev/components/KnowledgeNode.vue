<script setup lang="ts">
import MathText from './MathText.vue'
import { computed } from 'vue'
import type { LayoutNode, SemanticMode } from '../data/types'

const props = defineProps<{
  node: LayoutNode
  visible: boolean
  active: boolean
  dimmed: boolean
  mode: SemanticMode
  displayTitle?: string
}>()

const semanticClass = computed(() => {
  if (props.active && props.mode === 'detail') return 'detail'
  if (props.active && props.mode === 'summary') return 'summary'
  if (props.node.depth === 0) return 'overview'
  return 'concept'
})
</script>

<template>
  <g
    class="knowledge-node"
    :class="[semanticClass, { visible, active, dimmed }]"
    :transform="`translate(${node.x - node.width / 2} ${node.y - node.height / 2})`"
  >
    <foreignObject :width="node.width" :height="node.height">
      <div
        class="node-card"
        :style="{ '--node-accent': node.data.accent }"
      >
        <span class="node-dot"></span>
        <div class="node-copy">
          <div class="node-title">{{ displayTitle ?? node.data.title }}</div>
          <div v-if="semanticClass !== 'concept' && !displayTitle && node.data.subtitle" class="node-subtitle"><MathText :text="node.data.subtitle" /></div>
          <div v-if="semanticClass === 'summary'" class="node-summary"><MathText :text="node.data.summary" /></div>
        </div>
      </div>
    </foreignObject>
  </g>
</template>
