<script setup lang="ts">
import MathText from './MathText.vue'
defineProps<{
  chapter?: string
  headline?: string
  step: number
  total: number
}>()
</script>

<template>
  <header class="stage-header">
    <div>
      <p class="stage-chapter"><MathText :text="chapter ?? ''" /></p>
      <h1><MathText :text="headline ?? ''" /></h1>
    </div>
    <div class="stage-progress">
      <span>{{ String(step + 1).padStart(2, '0') }}</span>
      <i></i>
      <span>{{ String(total).padStart(2, '0') }}</span>
    </div>
  </header>
</template>
