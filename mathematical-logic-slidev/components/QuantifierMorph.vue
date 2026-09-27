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
  <div class="morph-stage" :class="{ entered }">
    <div class="morph-node morph-domain">
      <span class="morph-source"><MathText text="非空论域 $|\mathcal{M}|$" /></span>
      <span class="morph-target">候选对象空间</span>
      <small>变量从哪里取值</small>
    </div>
    <div class="morph-node morph-assignment">
      <span class="morph-source"><MathText text="变量赋值 $s$" /></span>
      <span class="morph-target"><MathText text="依次选择 $x$、$y$" /></span>
      <small>对象怎样交给变量</small>
    </div>
    <div class="morph-node morph-satisfaction">
      <span class="morph-source"><MathText text="满足 $\mathcal{M},s\models\varphi$" /></span>
      <span class="morph-target">量化命题成立</span>
      <small>所有选择是否通过检验</small>
    </div>
    <div class="morph-flow morph-flow-a">遍历</div>
    <div class="morph-flow morph-flow-b">依赖</div>
    <div class="morph-title">量词怎样选择对象</div>
    <div class="morph-caption">在同一个论域里，看看选择的先后顺序</div>
  </div>
</template>
