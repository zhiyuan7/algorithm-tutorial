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
  <div class="morph-stage morph-ab" :class="{ entered }">
    <div class="morph-question morph-question-source">程序能保证给出答案吗？</div>
    <div class="morph-card morph-source morph-recognizable"><strong>可识别</strong><small>YES 总会被认出</small></div>
    <div class="morph-card morph-source morph-decidable"><strong>可判定</strong><small>YES / NO 都会结束</small></div>
    <div class="morph-card morph-source morph-halting"><strong>停机问题</strong><small>可识别，却不可判定</small></div>

    <div class="morph-question morph-question-target">既然会结束，求解与验证需要多大代价？</div>
    <div class="morph-domain"><span>可判定的范围</span></div>
    <div class="morph-card morph-target morph-target-decidable"><strong>可判定任务</strong><small>先保证结束，再比较代价</small></div>
    <div class="morph-card morph-target morph-p"><strong><MathText text="$\mathrm P$" /></strong><small>可以快速求解</small></div>
    <div class="morph-card morph-target morph-np"><strong><MathText text="$\mathrm{NP}$" /></strong><small>证据可快速验证</small></div>
    <div class="morph-inclusion"><MathText text="$\mathrm P\subseteq\mathrm{NP}\subseteq\mathrm{Decidable}$" /></div>
    <div class="morph-boundary"><span>不可判定问题<br>在范围之外</span></div>
    <div class="morph-card morph-target morph-outside"><strong>停机问题</strong><small><MathText text="$\mathrm{HALT}_{\mathrm{TM}}$" /></small></div>
  </div>
</template>
