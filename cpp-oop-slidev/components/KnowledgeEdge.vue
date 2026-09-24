<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutEdge } from '../data/types'
const props=defineProps<{edge:LayoutEdge;visible:boolean;active:boolean;mapLayout:'tree'}>()
const path=computed(()=>{
  const {source,target,type}=props.edge
  if(type==='hierarchy') {
    const sy=source.y+source.height/2, ty=target.y-target.height/2, mid=(sy+ty)/2
    return `M ${source.x} ${sy} C ${source.x} ${mid}, ${target.x} ${mid}, ${target.x} ${ty}`
  }
  const right=source.x<target.x
  const sx=source.x+(right?source.width/2:-source.width/2),tx=target.x+(right?-target.width/2:target.width/2)
  const y=Math.max(source.y,target.y)+source.height/2+76
  return `M ${sx} ${source.y} C ${sx} ${y}, ${tx} ${y}, ${tx} ${target.y}`
})
const labelPosition=computed(()=>{
  const {source,target,type}=props.edge
  if(type==='hierarchy') return {x:(source.x+target.x)/2,y:(source.y+target.y)/2-9}
  return {x:(source.x+target.x)/2,y:Math.max(source.y,target.y)+source.height/2+70}
})
</script>
<template>
  <g class="knowledge-edge" :class="{visible,active,relation:edge.type!=='hierarchy'}">
    <path :d="path" marker-end="url(#edge-arrow)" />
    <text v-if="edge.label && visible" :x="labelPosition.x" :y="labelPosition.y">{{ edge.label }}</text>
  </g>
</template>
