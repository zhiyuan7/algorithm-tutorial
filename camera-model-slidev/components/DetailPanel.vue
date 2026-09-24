<script setup lang="ts">
import type { KnowledgeDetail, KnowledgeNodeData } from '../data/types'

defineProps<{
  node?: KnowledgeNodeData
  detail?: KnowledgeDetail
  visible: boolean
}>()
</script>

<template>
  <aside class="detail-panel" :class="{ visible }">
    <template v-if="node && detail">
      <p v-if="detail.eyebrow" class="detail-eyebrow">{{ detail.eyebrow }}</p>
      <h2>{{ node.title }}</h2>
      <p class="detail-statement">{{ detail.statement }}</p>
      <p v-if="detail.formula" class="detail-formula">{{ detail.formula }}</p>
      <p v-if="detail.explanation" class="detail-explanation">{{ detail.explanation }}</p>
      <ul v-if="detail.bullets?.length" class="detail-list">
        <li v-for="item in detail.bullets" :key="item">{{ item }}</li>
      </ul>
      <p v-if="detail.example" class="detail-example">{{ detail.example }}</p>
      <p v-if="detail.footnote" class="detail-footnote">{{ detail.footnote }}</p>
    </template>
  </aside>
</template>
