<script setup lang="ts">
import { computed } from 'vue'
const props=defineProps<{ kind:'inverse'|'color'; phase:0|1|2 }>()
const data=computed(()=>props.kind==='inverse' ? {
  label:'正向几何 → 逆向求解',
  source:['外参 R,t','内参 K / 畸变 D','像素 (u,v)'],
  target:['逐图位姿 / PnP','标定目标 K,D','角点观测 / 重投影'],
  note:'同一投影模型，交换参数与观测的角色',
  left:'正向参数', right:'逆向未知量',
} : {
  label:'像素位置 → 彩色像素',
  source:['入射光线','位置 (u,v)','几何投影'],
  target:['光谱与感光','I(u,v) 的 RGB','采样与重建'],
  note:'保留图像位置，接着解释信号如何变成颜色',
  left:'几何位置', right:'颜色响应',
})
</script>
<template>
  <section class="bridge-stage" :class="[`bridge-phase-${phase}`,`bridge-${kind}`]">
    <h2>{{ data.label }}</h2>
    <div class="bridge-cards">
      <div v-for="(item,index) in data.source" :key="index" class="bridge-card" :class="`bridge-card-${index}`">
        <span class="bridge-source">{{ item }}</span>
        <span class="bridge-target">{{ data.target[index] }}</span>
      </div>
    </div>
    <div class="bridge-rule"><span>{{ data.left }}</span><i></i><span>{{ data.right }}</span></div>
    <p class="bridge-note">{{ data.note }}</p>
  </section>
</template>
