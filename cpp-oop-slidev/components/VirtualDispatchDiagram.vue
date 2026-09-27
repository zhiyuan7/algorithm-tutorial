<script setup lang="ts">
defineProps<{ phase: 'layout' | 'call' }>()
const robots = [
  { name: '步兵对象', type: 'InfantryRobot', action: '开步枪' },
  { name: '英雄对象', type: 'HeroRobot', action: '开炮' },
]
</script>

<template>
  <figure class="dispatch-diagram" :class="phase" aria-label="虚函数表与虚函数指针的单继承示意">
    <div v-if="phase === 'call'" class="dispatch-call"><code>robot.attack()</code><span>同一个调用入口</span></div>
    <div v-for="robot in robots" :key="robot.type" class="dispatch-row">
      <div class="dispatch-object"><strong>{{ robot.name }}</strong><code>vptr</code></div>
      <span class="dispatch-arrow">→</span>
      <div class="dispatch-table"><strong>{{ robot.type }} 的表</strong><code>attack 表项</code></div>
      <div class="dispatch-function"><span>↓</span><code>{{ robot.type }}::attack()</code><strong>{{ robot.action }}</strong></div>
    </div>
    <figcaption>只展示 attack 表项，省略其他成员与表项</figcaption>
  </figure>
</template>
