<script setup lang="ts">
import { computed } from 'vue'
import { morphs } from '../data/morphs'

const props = defineProps<{ morphId: 'one-to-many' | 'many-to-matrix'; phase: 0 | 1 | 2 }>()
const definition = computed(() => morphs[props.morphId])
const positions = computed(() => new Map([
  ...definition.value.cards.map(card => [card.id, card.to] as const),
  ...definition.value.arrivals.map(item => [item.id, item.at] as const),
]))

function linePath(from: string, to: string) {
  const a = positions.value.get(from)
  const b = positions.value.get(to)
  if (!a || !b) return ''
  return `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`
}

function lineLabel(from: string, to: string): [number, number] {
  const a = positions.value.get(from) ?? [0, 0]
  const b = positions.value.get(to) ?? [0, 0]
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 20]
}
</script>

<template>
  <div class="morph-stage cinematic-morph" :class="`phase-${phase}`">
    <div class="morph-caption">{{ phase === 2 ? definition.targetCaption : definition.sourceCaption }}</div>
    <div class="morph-title">{{ definition.title }}</div>
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" aria-label="概念图谱变形过渡">
      <g class="morph-links" :class="{ visible: phase === 2 }">
        <g v-for="link in definition.links" :key="`${link.from}-${link.to}`">
          <path :d="linePath(link.from, link.to)" />
          <text :x="lineLabel(link.from, link.to)[0]" :y="lineLabel(link.from, link.to)[1]">{{ link.label }}</text>
        </g>
      </g>
      <g
        v-for="card in definition.cards"
        :key="card.id"
        class="morph-card"
        :class="{ vanished: phase >= 1 && !card.targetLabel }"
        :transform="`translate(${phase === 0 ? card.from[0] : card.to[0]} ${phase === 0 ? card.from[1] : card.to[1]})`"
        :style="{ '--morph-accent': card.accent }"
      >
        <rect x="-129" y="-53" width="258" height="106" rx="18" />
        <path d="M -121 -45 L -121 45" class="morph-card-accent" />
        <text class="morph-card-title" text-anchor="middle" dominant-baseline="middle">{{ phase === 2 ? card.targetLabel : card.sourceLabel }}</text>
      </g>
      <g
        v-for="item in definition.arrivals"
        :key="item.id"
        class="morph-card morph-arrival"
        :class="{ visible: phase === 2 }"
        :transform="`translate(${item.at[0]} ${item.at[1]})`"
        :style="{ '--morph-accent': item.accent }"
      >
        <rect x="-129" y="-53" width="258" height="106" rx="18" />
        <path d="M -121 -45 L -121 45" class="morph-card-accent" />
        <text class="morph-card-title" text-anchor="middle" dominant-baseline="middle">{{ item.label }}</text>
      </g>
    </svg>
  </div>
</template>
