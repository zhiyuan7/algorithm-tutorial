<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const entered = ref(false)
onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => requestAnimationFrame(() => { entered.value = true }))
})
</script>

<template>
  <div class="morph-stage morph-bc" :class="{ entered }">
    <div class="morph-question morph-question-source">问题属于哪一个资源类别？</div>
    <div class="morph-card morph-source morph-bc-decidable"><strong>Decidable</strong><small>可计算任务</small></div>
    <div class="morph-card morph-source morph-bc-np"><strong>NP</strong><small>验证代价</small></div>
    <div class="morph-card morph-source morph-bc-p"><strong>P</strong><small>求解代价</small></div>
    <div class="morph-card morph-source morph-bc-sat"><strong>SAT</strong><small>具体问题</small></div>

    <div class="morph-question morph-question-target">这个系统能模拟哪些计算？</div>
    <div class="morph-ring morph-ring-outer"><span>可计算任务</span></div>
    <div class="morph-ring morph-ring-inner"><span>时间 · 存储</span></div>
    <div class="morph-card morph-target morph-turing"><strong>图灵完备系统</strong><small>模拟任意图灵机</small></div>
    <div class="morph-limit-line">不可计算问题仍在边界之外</div>
  </div>
</template>
