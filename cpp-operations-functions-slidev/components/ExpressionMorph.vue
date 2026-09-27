<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { morphMapping } from '../data/knowledge'

const entered = ref(false)
onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => requestAnimationFrame(() => { entered.value = true }))
})
</script>

<template>
  <div class="expression-morph" :class="{ entered }">
    <div class="morph-column-label left">怎样构造值</div>
    <div class="morph-column-label right">怎样构造判断</div>
    <div v-for="mapping in morphMapping" :key="mapping.sourceId" class="morph-lane" :style="{ '--morph-accent': mapping.accent }">
      <div class="morph-source">{{ mapping.sourceLabel }}</div>
      <div class="morph-track"><span class="morph-moving-dot"></span></div>
      <div class="morph-target">{{ mapping.targetLabel }}</div>
      <p class="morph-meaning">{{ mapping.meaning }}</p>
    </div>
    <div class="morph-conclusion">先算出值，再写出条件</div>
  </div>
</template>
