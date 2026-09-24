<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { morphMapping } from '../data/knowledge'
const entered=ref(false)
onMounted(async()=>{ await nextTick(); requestAnimationFrame(()=>requestAnimationFrame(()=>{entered.value=true})) })
</script>
<template>
  <div class="morph-stage object-types-morph" :class="{entered}">
    <div v-for="pair in morphMapping" :key="pair.from" class="morph-row">
      <div class="morph-source"><strong>{{ pair.fromTitle }}</strong><small>单个对象 · {{ pair.from }}</small></div>
      <div class="morph-bridge"></div>
      <div class="morph-target"><strong>{{ pair.toTitle }}</strong><small>类型家族 · {{ pair.to }}</small></div>
      <div class="morph-reason">{{ pair.reason }}</div>
    </div>
    <p class="morph-caption">三条语义映射连接两张独立图谱</p>
  </div>
</template>
