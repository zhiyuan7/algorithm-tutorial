<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { morphGroups } from '../data/knowledge'
const entered = ref(false)
onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => requestAnimationFrame(() => { entered.value = true }))
})
</script>
<template>
  <div class="pipeline-morph" :class="{ entered }">
    <div class="morph-column morph-column-left">图像中有什么</div>
    <div class="morph-column morph-column-right">选择怎样处理</div>
    <div v-for="(group, index) in morphGroups" :key="group.id" class="morph-row" :style="{ '--morph-index': index }">
      <div class="morph-source">{{ group.source }}</div>
      <div class="morph-trace"></div>
      <div class="morph-target">
        <strong>{{ group.target }}</strong>
        <small>{{ group.meaning }}</small>
      </div>
    </div>
    <div class="morph-conclusion">从信号线索，走向可验证的操作</div>
  </div>
</template>
