<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const entered = ref(false)
onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => requestAnimationFrame(() => { entered.value = true }))
})
</script>

<template>
  <div class="robot-morph" :class="{ entered }">
    <p class="robot-morph-caption">从“怎样表示”转向“怎样求解”</p>
    <div class="robot-morph-source source-frame"><strong>坐标语义</strong><small>参考系 → DH</small></div>
    <div class="robot-morph-source source-rotation"><strong>SO(3)</strong><small>关节旋转</small></div>
    <div class="robot-morph-source source-pose"><strong>SE(3)</strong><small>末端位姿</small></div>
    <div class="robot-morph-source source-screw"><strong>螺旋指数</strong><small>关节运动 → PoE</small></div>
    <svg class="robot-morph-links" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
      <path d="M 500 170 Q 360 210 280 310" />
      <path d="M 500 170 Q 640 210 720 310" />
      <path d="M 280 310 Q 330 460 500 485" />
      <path d="M 720 310 Q 670 460 500 485" />
    </svg>
    <div class="robot-morph-target target-rotation"><strong>关节旋转</strong><small>两种方法共有的 SO(3) 基础</small></div>
    <div class="robot-morph-target target-dh"><strong>DH</strong><small>局部坐标系链</small></div>
    <div class="robot-morph-target target-poe"><strong>PoE</strong><small>统一空间螺旋轴</small></div>
    <div class="robot-morph-target target-pose"><strong>T(q) ∈ SE(3)</strong><small>同一个末端位姿</small></div>
  </div>
</template>
