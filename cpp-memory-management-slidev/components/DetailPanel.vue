<script setup lang="ts">
import type { KnowledgeDetail, KnowledgeNodeData } from '../data/types'
import MathText from './MathText.vue'
import CodeBlock from './CodeBlock.vue'
import MemoryDiagram from './MemoryDiagram.vue'
defineProps<{ node?: KnowledgeNodeData; detail?: KnowledgeDetail; visible: boolean }>()
</script>

<template>
  <aside class="detail-panel" :class="{ visible, 'has-table': !!detail?.table }">
    <template v-if="node && detail">
      <p v-if="detail.eyebrow" class="detail-eyebrow">{{ detail.eyebrow }}</p>
      <h2>{{ detail.title ?? node.title }}</h2>
      <p class="detail-statement">{{ detail.statement }}</p>
      <table v-if="detail.table" class="detail-table">
        <thead><tr><th v-for="heading in detail.table.headers" :key="heading">{{ heading }}</th></tr></thead>
        <tbody><tr v-for="(row, index) in detail.table.rows" :key="index"><td v-for="(cell, column) in row" :key="column">{{ cell }}</td></tr></tbody>
      </table>
      <CodeBlock v-if="detail.code" :key="detail.code" :name="detail.code" />
      <div v-if="detail.formula" class="detail-formula"><MathText :text="detail.formula" latex display /></div>
      <MemoryDiagram v-if="detail.diagram" :kind="detail.diagram" />
      <p v-if="detail.explanation" class="detail-explanation">{{ detail.explanation }}</p>
      <ul v-if="detail.bullets?.length" class="detail-list"><li v-for="item in detail.bullets" :key="item">{{ item }}</li></ul>
      <p v-if="detail.example" class="detail-example">{{ detail.example }}</p>
      <p v-if="detail.footnote" class="detail-footnote">{{ detail.footnote }}</p>
    </template>
  </aside>
</template>
