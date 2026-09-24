<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const entered = ref(false)

onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => requestAnimationFrame(() => { entered.value = true }))
})
</script>

<template>
  <div class="morph-stage invariant-morph" :class="{ entered }">
    <div class="morph-origin inv-capability"><span>秩 · SVD</span><small>降维与尺度</small></div>
    <div class="morph-origin inv-action"><span>变换 · 相似</span><small>作用与观察窗口</small></div>
    <div class="morph-origin inv-orthogonal"><span>正交结构</span><small>保持内积</small></div>

    <div class="morph-destination inv-volume"><span>体积</span><small>行列式</small></div>
    <div class="morph-destination inv-direction"><span>方向</span><small>特征结构</small></div>
    <div class="morph-destination inv-energy"><span>能量</span><small>二次型</small></div>
    <div class="morph-title">坐标之下，映射留下的几何</div>
  </div>
</template>
