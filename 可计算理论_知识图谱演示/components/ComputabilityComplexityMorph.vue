<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const entered = ref(false)
onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => requestAnimationFrame(() => { entered.value = true }))
})
</script>

<template>
  <div class="morph-stage morph-ab" :class="{ entered }">
    <div class="morph-question morph-question-source">对所有输入，算法会结束吗？</div>
    <div class="morph-card morph-source morph-recognizable"><strong>Recognizable</strong><small>YES 终会被看见</small></div>
    <div class="morph-card morph-source morph-decidable"><strong>Decidable</strong><small>YES / NO 都会结束</small></div>
    <div class="morph-card morph-source morph-atm"><strong>A_TM</strong><small>停在边界之外</small></div>
    <div class="morph-boundary">不可判定边界</div>

    <div class="morph-question morph-question-target">既然会结束，需要多少资源？</div>
    <div class="morph-card morph-target morph-target-decidable"><strong>Decidable</strong><small>复杂度研究的任务域</small></div>
    <div class="morph-card morph-target morph-np"><strong>NP</strong><small>证据可快速验证</small></div>
    <div class="morph-card morph-target morph-p"><strong>P</strong><small>可以快速求解</small></div>
  </div>
</template>
