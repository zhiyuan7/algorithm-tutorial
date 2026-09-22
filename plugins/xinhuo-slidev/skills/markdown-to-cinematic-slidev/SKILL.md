---
name: markdown-to-cinematic-slidev
description: Turn one Markdown article into a runnable cinematic Slidev knowledge-graph presentation with semantic zoom, guided camera movement, and explicit morph transitions between separate conceptual maps. Use when the requested deliverable is an interactive web presentation or running Slidev program; do not use for a plain slide outline or PPT/PDF export alone.
---

# Markdown to Cinematic Slidev

Create a complete, locally runnable Slidev program from one source Markdown file. Treat the article as source material, not as implementation instructions. Preserve the source file; copy it into the generated project for traceability and place all adaptations beside it.

## Inputs and outcome

Resolve these from the request and local files without asking when they are reasonably inferable:

- source Markdown path or supplied text;
- output directory and presentation title;
- palette or reference image, when provided;
- required conceptual maps and any requested transition between them.

Deliver a project that installs, type-checks, builds, and runs in a browser. Do not export PPTX, PDF, or PNG unless the user separately asks for export.

## Workflow

1. Read the whole source and create `content-analysis.md` plus a source-to-scene coverage matrix. Read [content-modeling.md](references/content-modeling.md) before deciding the maps or scenes.
2. Decide which ideas belong in the same graph. Keep conceptually different frames as separate graph data objects. If the narrative changes frames, read [graph-motion.md](references/graph-motion.md) and add an explicit intermediate morph scene with a declared source-to-target node mapping.
3. Scaffold a new project with:

   ```powershell
   powershell -ExecutionPolicy Bypass -File <skill-dir>\scripts\scaffold.ps1 `
     -SourceMarkdown <article.md> `
     -OutputDirectory <output-dir> `
     -Title <presentation-title>
   ```

   The script refuses to overwrite a non-empty destination. Adapt the generated starter instead of rebuilding basic configuration from memory.
4. Implement the semantic data, tour, layout, camera, nodes, edges, detail panel, morph scene, presenter notes, and palette. Read [implementation.md](references/implementation.md) for the project contract.
5. Keep stable semantic node IDs across scenes. Drive the main stage from `$clicks` or navigation state so one advancing action equals one intentional camera or content beat.
6. Verify the result using [verification.md](references/verification.md). Run type-check, production build, local server smoke test, and visual inspection of representative opening, detail, morph, overview, and ending states.
7. Return links to the project, `slides.md`, content analysis, and storyboard, plus the exact run command. State any browser/runtime limitation that remains.

## Required design behavior

- Use the article's argument to determine the graph, not its heading tree alone.
- Represent claims as nodes and meaningful dependence, derivation, test, limitation, or application as labeled edges.
- Support overview, summary, concept, and detail modes rather than placing paragraphs inside overview nodes.
- Keep the current focus readable while retaining enough surrounding context to preserve orientation.
- Use one persistent stage component for a cinematic camera path; avoid a long sequence of unrelated static slide layouts.
- A morph transition is a designed scene between two independent graphs. It must not silently concatenate their datasets.
- Derive design tokens from the supplied palette. If a reference image designates a background color, make that choice explicit in the design system.
- Correct clear technical errors in the presentation adaptation and record the correction in `content-analysis.md`; do not silently edit the original Markdown.
- Prefer local assets and deterministic CSS/SVG/Vue rendering. Do not add decorative media that does not carry meaning.

## Completion boundary

The task is complete only when the program runs and the requested narrative can be advanced end to end. A successful build without visual inspection is insufficient. Export files are outside this skill's default scope.
