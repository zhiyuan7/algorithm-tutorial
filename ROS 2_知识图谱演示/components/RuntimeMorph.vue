<script setup lang="ts">
defineProps<{ phase: 0 | 1 | 2 }>()

const mappings = [
  { id: 'node', source: 'Node', target: '进程 / 组件', hint: '逻辑边界 → 部署边界' },
  { id: 'callback', source: 'Callback', target: '回调组 / 执行器', hint: '待执行函数 → 并发与线程' },
  { id: 'interface', source: 'Topic / Service', target: 'Ready Entity', hint: '通信端点 → 就绪事件' },
  { id: 'matching', source: '通信匹配', target: 'Launch 配置', hint: '名称与接口 → 系统配置' },
] as const
</script>

<template>
  <div class="runtime-morph" :class="`phase-${phase}`">
    <div class="morph-guide morph-guide-top">ROS GRAPH · 逻辑关系</div>
    <div class="morph-guide morph-guide-bottom">RUNTIME · 执行与部署</div>
    <div class="morph-connector"></div>
    <div v-for="item in mappings" :key="item.id" class="morph-card" :class="`morph-${item.id}`">
      <span>{{ phase === 2 ? item.target : item.source }}</span>
      <small>{{ phase === 2 ? item.hint : '逻辑图谱中的锚点' }}</small>
    </div>
    <div class="morph-result">同一套逻辑图，可以有不同的运行与部署方式</div>
  </div>
</template>
