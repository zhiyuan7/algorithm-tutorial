<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const entered = ref(false)

onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => requestAnimationFrame(() => { entered.value = true }))
})
</script>

<template>
  <div class="morph-stage representation-morph" :class="{ entered }">
    <div class="morph-origin rep-space"><span>线性空间</span><small>抽象对象</small></div>
    <div class="morph-origin rep-basis"><span>基与坐标</span><small>观察框架</small></div>
    <div class="morph-origin rep-map"><span>线性映射</span><small>结构保持</small></div>
    <div class="morph-origin rep-matrix"><span>矩阵表示</span><small>坐标语法</small></div>

    <div class="morph-axis"></div>
    <div class="morph-destination rep-active"><span>对象在动</span><small>固定坐标系 · 主动变换</small></div>
    <div class="morph-destination rep-passive"><span>框架在变</span><small>固定向量 · 被动换基</small></div>
    <div class="morph-title">矩阵的两种几何读法</div>
  </div>
</template>
