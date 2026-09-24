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
    <div class="morph-column-label left">图谱 A · 控制下一步</div>
    <div class="morph-column-label right">图谱 B · 结构构造算法</div>
    <div v-for="mapping in morphMapping" :key="mapping.sourceId" class="morph-lane" :style="{ '--morph-accent': mapping.accent }">
      <div class="morph-source">{{ mapping.sourceLabel }}</div>
      <div class="morph-track"><span class="morph-moving-dot"></span></div>
      <div class="morph-target">{{ mapping.targetLabel }}</div>
      <p class="morph-meaning">{{ mapping.meaning }}</p>
    </div>
    <div class="morph-conclusion">从局部控制路径，走向完整算法</div>
  </div>
</template>
