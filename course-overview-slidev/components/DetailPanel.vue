<script setup lang="ts">
import MathText from './MathText.vue'
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
      <p v-if="detail.eyebrow" class="detail-eyebrow"><MathText :text="detail.eyebrow" /></p>
      <h2>{{ node.title }}</h2>
      <p class="detail-statement"><MathText :text="detail.statement" /></p>
      <div v-if="detail.formula" class="detail-formula"><MathText :text="detail.formula" latex display /></div>
      <p v-if="detail.explanation" class="detail-explanation"><MathText :text="detail.explanation" /></p>
      <ul v-if="detail.bullets?.length" class="detail-list">
        <li v-for="item in detail.bullets" :key="item"><MathText :text="item" /></li>
      </ul>
      <p v-if="detail.example" class="detail-example"><MathText :text="detail.example" /></p>
      <p v-if="detail.footnote" class="detail-footnote"><MathText :text="detail.footnote" /></p>
    </template>
  </aside>
</template>
