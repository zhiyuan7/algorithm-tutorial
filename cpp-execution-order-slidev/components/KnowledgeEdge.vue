<script setup lang="ts">
import { computed } from 'vue'
import { edgeGeometry } from '../composables/edgeGeometry'
import type { LayoutEdge } from '../data/types'

const props = defineProps<{ edge: LayoutEdge; visible: boolean; active: boolean }>()
const geometry = computed(() => edgeGeometry(props.edge))
</script>

<template>
  <g class="knowledge-edge" :class="{ visible, active, relation: edge.type !== 'hierarchy' }">
    <path :d="geometry.path" marker-end="url(#edge-arrow)" />
    <text v-if="edge.label && visible" :x="geometry.label.x" :y="geometry.label.y">{{ edge.label }}</text>
  </g>
</template>
