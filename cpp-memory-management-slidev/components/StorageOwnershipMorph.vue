<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const entered = ref(false)
onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => requestAnimationFrame(() => { entered.value = true }))
})
</script>

<template>
  <div class="morph-stage memory-morph" :class="{ entered }">
    <div class="morph-origin morph-static"><span>静态存储期</span><small>程序运行期间持续存在</small></div>
    <div class="morph-origin morph-automatic"><span>自动存储期</span><small>作用域结束即清理</small></div>
    <div class="morph-origin morph-dynamic"><span>动态存储期</span><small>运行时决定释放时机</small></div>
    <div class="morph-axis"></div>
    <div class="morph-destination morph-raw"><span>手动分配</span><small>malloc / new</small></div>
    <div class="morph-destination morph-raii"><span>RAII</span><small>由管理者析构释放</small></div>
    <div class="morph-title">从“存在多久”到“谁负责释放”</div>
  </div>
</template>
