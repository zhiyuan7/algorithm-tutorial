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
    <div class="morph-node morph-domain">
      <span class="morph-source">非空论域 M</span>
      <span class="morph-target">候选对象空间</span>
      <small>变量从哪里取值</small>
    </div>
    <div class="morph-node morph-assignment">
      <span class="morph-source">变量赋值 s</span>
      <span class="morph-target">依次选择 x、y</span>
      <small>对象怎样交给变量</small>
    </div>
    <div class="morph-node morph-satisfaction">
      <span class="morph-source">满足 𝓜,s ⊨ φ</span>
      <span class="morph-target">量化命题成立</span>
      <small>所有选择是否通过检验</small>
    </div>
    <div class="morph-flow morph-flow-a">遍历</div>
    <div class="morph-flow morph-flow-b">依赖</div>
    <div class="morph-title">语义规则展开为选择顺序</div>
    <div class="morph-caption">保留“论域—赋值—真值”，改变观察尺度</div>
  </div>
</template>
