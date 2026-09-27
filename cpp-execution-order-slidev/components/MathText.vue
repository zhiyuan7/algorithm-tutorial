<script setup lang="ts">
import { computed } from 'vue'
import { renderToString } from 'katex'
import 'katex/dist/katex.min.css'

const props = withDefaults(defineProps<{
  text: string
  latex?: boolean
  display?: boolean
}>(), { latex: false, display: false })

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]!)
}

function renderMath(expression: string, displayMode: boolean) {
  return renderToString(expression, { displayMode, throwOnError: true, strict: 'ignore', trust: false })
}

const markup = computed(() => {
  if (props.latex) return renderMath(props.text, props.display)
  return props.text.split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g).map(part => {
    if (part.startsWith('$$') && part.endsWith('$$')) return renderMath(part.slice(2, -2), true)
    if (part.startsWith('$') && part.endsWith('$')) return renderMath(part.slice(1, -1), false)
    return escapeHtml(part)
  }).join('')
})
</script>

<template>
  <span class="math-text" v-html="markup"></span>
</template>
