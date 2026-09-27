<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import MathText from './MathText.vue'

const entered = ref(false)
onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => requestAnimationFrame(() => { entered.value = true }))
})
</script>

<template>
  <div class="morph-stage morph-bc" :class="{ entered }">
    <div class="morph-question morph-question-source">求解与验证，要付出怎样的代价？</div>
    <div class="morph-card morph-source morph-bc-decidable"><strong>可判定任务</strong><small>研究求解与验证的代价</small></div>
    <div class="morph-card morph-source morph-bc-np"><strong><MathText text="$\mathrm{NP}$" /></strong><small>验证代价</small></div>
    <div class="morph-card morph-source morph-bc-p"><strong><MathText text="$\mathrm P$" /></strong><small>求解代价</small></div>
    <div class="morph-card morph-source morph-bc-sat"><strong><MathText text="$\mathrm{SAT}$" /></strong><small>具体问题</small></div>

    <div class="morph-question morph-question-target">这个系统能表达哪些计算？</div>
    <div class="morph-ring morph-ring-outer"><span>可计算任务</span></div>
    <div class="morph-ring morph-ring-inner"><span>时间 · 存储</span></div>
    <div class="morph-card morph-target morph-turing"><strong>图灵完备系统</strong><small>模拟任意图灵机</small></div>
    <div class="morph-limit-line">停机问题仍然无法被通用算法判定</div>
  </div>
</template>
