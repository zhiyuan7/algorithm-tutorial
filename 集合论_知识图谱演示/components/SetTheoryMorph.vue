<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const props = defineProps<{ phase: 'foundation-construction' | 'construction-infinity' }>()
const entered = ref(false)

onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => requestAnimationFrame(() => { entered.value = true }))
})
</script>

<template>
  <div class="set-morph" :class="[phase, { entered }]">
    <template v-if="props.phase === 'foundation-construction'">
      <div class="morph-card source source-a"><strong>外延</strong><small>识别集合</small></div>
      <div class="morph-card source source-b"><strong>分离</strong><small>受控筛选</small></div>
      <div class="morph-card source source-c"><strong>构造公理</strong><small>生成新集合</small></div>
      <div class="morph-card target target-a"><strong>有序对</strong><small>可验证的编码</small></div>
      <div class="morph-card target target-b"><strong>关系与等价类</strong><small>在既有集合内组织</small></div>
      <div class="morph-card target target-c"><strong>自然数与数系</strong><small>公理工具逐级构造</small></div>
      <div class="morph-caption">存在规则 → 构造语言</div>
    </template>

    <template v-else>
      <div class="morph-card source source-a"><strong>有序对与函数</strong><small>建立对应</small></div>
      <div class="morph-card source source-b"><strong>ℕ → ℤ → ℚ</strong><small>可枚举对象</small></div>
      <div class="morph-card source source-c"><strong>ℝ 与幂集</strong><small>完备化与扩张</small></div>
      <div class="morph-card target target-a"><strong>双射</strong><small>大小比较工具</small></div>
      <div class="morph-card target target-b"><strong>可数无限</strong><small>ℵ₀</small></div>
      <div class="morph-card target target-c"><strong>不可数与更大无限</strong><small>2^ℵ₀ · 𝒫(A)</small></div>
      <div class="morph-caption">构造对象 → 比较基数</div>
    </template>

    <svg class="morph-links" viewBox="0 0 1120 560" aria-hidden="true">
      <path d="M 185 125 C 340 210, 335 330, 185 435" />
      <path d="M 560 125 C 560 220, 560 330, 560 435" />
      <path d="M 935 125 C 780 210, 785 330, 935 435" />
    </svg>
  </div>
</template>
