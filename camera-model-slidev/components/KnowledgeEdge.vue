<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutEdge } from '../data/types'
const props=defineProps<{ edge:LayoutEdge; visible:boolean; active:boolean }>()
const endpoints=computed(()=>{
  const {source,target}=props.edge
  const dx=target.x-source.x, dy=target.y-source.y
  if (Math.abs(dx)>=Math.abs(dy)) {
    const sign=Math.sign(dx)
    return { sx:source.x+sign*source.width/2,sy:source.y,tx:target.x-sign*target.width/2,ty:target.y }
  }
  const sign=Math.sign(dy)
  return { sx:source.x,sy:source.y+sign*source.height/2,tx:target.x,ty:target.y-sign*target.height/2 }
})
const path=computed(()=>{
  const {sx,sy,tx,ty}=endpoints.value
  if (Math.abs(sy-ty)<10) return `M ${sx} ${sy} L ${tx} ${ty}`
  return `M ${sx} ${sy} C ${sx} ${(sy+ty)/2}, ${tx} ${(sy+ty)/2}, ${tx} ${ty}`
})
const label=computed(()=>({ x:(endpoints.value.sx+endpoints.value.tx)/2,y:(endpoints.value.sy+endpoints.value.ty)/2-16 }))
</script>
<template>
  <g class="knowledge-edge" :class="{visible,active,relation:edge.type!=='flow'}">
    <path :d="path" marker-end="url(#edge-arrow)" />
    <text v-if="edge.label && visible" :x="label.x" :y="label.y">{{ edge.label }}</text>
  </g>
</template>
