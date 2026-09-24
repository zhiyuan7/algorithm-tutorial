<script setup lang="ts">
defineProps<{
  chapter: string
  headline: string
  step: number
  total: number
}>()
</script>

<template>
  <header class="stage-header">
    <div>
      <p class="stage-chapter">{{ chapter }}</p>
      <h1>{{ headline }}</h1>
    </div>
    <div class="stage-progress">
      <span>{{ String(step + 1).padStart(2, '0') }}</span>
      <i></i>
      <span>{{ String(total).padStart(2, '0') }}</span>
    </div>
  </header>
</template>
