<script setup lang="ts">
import { computed } from 'vue'
import MathText from './MathText.vue'
import { edgeGeometry } from '../composables/edgeGeometry'
import type { LayoutEdge } from '../data/types'

const props = defineProps<{ edge: LayoutEdge; visible: boolean; active: boolean }>()
const geometry = computed(() => edgeGeometry(props.edge))
</script>

<template>
  <g class="knowledge-edge" :data-edge-id="edge.id" :class="[{ visible, active }, edge.type]">
    <path :d="geometry.path" marker-end="url(#edge-arrow)" />
    <foreignObject v-if="edge.label && visible" :x="geometry.x - 145" :y="geometry.y - 15" width="290" height="32">
      <div class="edge-label"><MathText :text="edge.label" /></div>
    </foreignObject>
  </g>
</template>
