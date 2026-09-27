<script lang="ts">
import MarkdownIt from 'markdown-it'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import cpp from 'shiki/langs/cpp.mjs'
import c from 'shiki/langs/c.mjs'
import githubLight from 'shiki/themes/github-light.mjs'

// These are ordinary fenced Markdown examples, kept separate from the graph data.
import { examples } from '../content/examples'
const renderer = createHighlighterCore({ themes: [githubLight], langs: [cpp, c], engine: createJavaScriptRegexEngine() }).then(highlighter => new MarkdownIt({
  html: false,
  highlight: (code, language) => highlighter.codeToHtml(code, { lang: language, theme: 'github-light' }),
}))
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{ name: string }>()
const markup = ref('')
watch(() => props.name, async (name, _, onCleanup) => {
  let cancelled = false
  onCleanup(() => { cancelled = true })
  const markdown = await renderer
  if (!cancelled) markup.value = markdown.render(examples[name] ?? '')
}, { immediate: true })
</script>

<template>
  <div class="detail-code" v-html="markup"></div>
</template>
