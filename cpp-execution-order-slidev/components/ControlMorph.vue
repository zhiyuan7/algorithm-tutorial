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
  <div class="control-morph" :class="{ entered }">
    <div class="morph-column-label left">基本走法</div>
    <div class="morph-column-label right">用在计算里</div>
    <div v-for="mapping in morphMapping" :key="mapping.sourceId" class="morph-lane" :style="{ '--morph-accent': mapping.accent }">
      <div class="morph-source">{{ mapping.sourceLabel }}</div>
      <div class="morph-track"><span class="morph-moving-dot"></span><span class="morph-arrow">→</span></div>
      <div class="morph-target">{{ mapping.targetLabel }}</div>
      <p class="morph-meaning">{{ mapping.meaning }}</p>
    </div>
    <div class="morph-conclusion">三种基本走法，组合成完整程序</div>
  </div>
</template>
