<script setup lang="ts">
defineProps<{ kind: 'array' | 'struct' | 'scope' }>()
</script>

<template>
  <figure class="memory-diagram" :class="kind">
    <template v-if="kind === 'array'">
      <figcaption>假设每个 int 占 4 字节</figcaption>
      <div class="memory-cells"><div>a[0] = 10<small>偏移 0</small></div><div>a[1] = 20<small>偏移 4</small></div><div>a[2] = 30<small>偏移 8</small></div></div>
    </template>
    <template v-else-if="kind === 'struct'">
      <figcaption>Sample 的 8 字节布局示意</figcaption>
      <div class="memory-cells struct-cells"><div>tag<small>1 字节</small></div><div class="padding-cell">填充<small>3 字节</small></div><div>value<small>4 字节</small></div></div>
    </template>
    <template v-else>
      <figcaption>时间从左向右 →</figcaption>
      <div class="scope-timeline"><div class="outer-life">outer：外层声明后一直存在<div class="inner-life">inner：只在内层存在</div></div></div>
      <div class="scope-events"><span>进入内层</span><span>inner 销毁</span><span>outer 销毁</span></div>
    </template>
  </figure>
</template>
