<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const entered = ref(false)

onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => requestAnimationFrame(() => { entered.value = true }))
})
</script>

<template>
  <div class="morph-stage" :class="{ entered }">
    <div class="morph-origin morph-reality">
      <span>现实</span>
      <small>Reality</small>
    </div>
    <div class="morph-origin morph-induction">
      <span>归纳与建模</span>
      <small>Induction</small>
    </div>
    <div class="morph-origin morph-theory">
      <span>理论</span>
      <small>Theory</small>
    </div>
    <div class="morph-origin morph-deduction">
      <span>演绎与实验</span>
      <small>Deduction</small>
    </div>
    <div class="morph-axis"></div>
    <div class="morph-destination morph-formal">
      <span>形式科学</span>
      <small>研究规则能够推出什么</small>
    </div>
    <div class="morph-destination morph-natural">
      <span>自然科学</span>
      <small>研究世界实际如何</small>
    </div>
    <div class="morph-title">科学的两种范式</div>
  </div>
</template>
