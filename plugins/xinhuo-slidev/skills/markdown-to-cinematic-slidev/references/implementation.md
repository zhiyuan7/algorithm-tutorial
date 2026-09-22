# Implementation contract

Read this after the content model and storyboard exist.

## Recommended structure

```text
project/
|-- slides.md
|-- style.css
|-- styles/index.css
|-- content/source.md
|-- content-analysis.md
|-- storyboard.md
|-- DESIGN_SYSTEM.md
|-- data/types.ts
|-- data/knowledge.ts
|-- data/tour.ts
|-- components/KnowledgeStage.vue
|-- components/KnowledgeNode.vue
|-- components/KnowledgeEdge.vue
|-- components/DetailPanel.vue
|-- components/<TransitionName>.vue
|-- composables/useKnowledgeLayout.ts
|-- composables/useCamera.ts
`-- scripts/
    |-- run.ps1
    `-- verify.ps1
```

Adjust filenames when the chosen visualization is not a graph, but preserve separation between semantic data, layout, camera state, and rendering.

## Data and rendering

- Put article-specific content in `data/knowledge.ts` and `data/tour.ts`, not inside Vue templates.
- Use TypeScript interfaces for nodes, relations, layout nodes, and tour scenes.
- Use D3 for hierarchy/layout calculations when useful; render with Vue and SVG so styling and transitions remain controllable.
- Compute camera framing from visible node bounds. Keep all world coordinates in a single scene coordinate system.
- Use a persistent `<KnowledgeStage :step="$clicks" />` on the main Slidev slide when a continuous camera path is required.
- Put direct narration in Slidev presenter notes and align `[click]` markers with the tour states.

## Palette and typography

Record semantic tokens in `DESIGN_SYSTEM.md` and CSS custom properties:

- background and elevated surface;
- primary text and muted text;
- one accent per semantic category;
- edge colors for relation types;
- focus, dimmed, and warning states.

Check contrast on the actual requested background. Use a restrained type scale and short node labels. Do not use color as the only distinction between edge meanings.

## Runtime

Use Node.js 22 or newer for current Slidev unless the installed version explicitly supports another range. Prefer `pnpm` and include only runtime dependencies the project uses. The starter intentionally contains no export dependency.

The final run command should be simple and local, normally:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run.ps1 dev
```

If MCP access is useful for iterative editing, expose the running Slidev server's `/__mcp` endpoint or the Slidev stdio MCP command, but do not make MCP registration a prerequisite for the presentation to run.
