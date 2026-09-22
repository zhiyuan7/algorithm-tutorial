# Verification

Read this before declaring the generated program complete.

## Automated checks

Run from the generated project:

```powershell
pnpm install
pnpm run typecheck
pnpm run build
```

Then start the development server and confirm an HTTP 200 response from the local URL. If the configured port is busy, use `scripts/run.ps1 dev -Port <free-port>` and report the tested port.

## Narrative audit

Check that:

- every substantive source section is represented in the coverage matrix;
- node and edge labels match the source's claims;
- any technical corrections are recorded;
- each click state has one clear narration goal;
- separate conceptual maps remain separate in both data and rendering;
- the morph mapping is semantically defensible.

## Visual audit

Inspect at least:

- cover/opening question;
- first graph overview;
- a dense detail state;
- the start, middle, and end of each morph;
- second graph overview;
- final synthesis.

At each state check clipping, overlap, contrast, edge-label collisions, camera context, font fallback, and animation continuity. Inspect at the intended 16:9 viewport rather than relying on source code alone.

## Completion report

Report the output path, run command, build result, tested browser URL, map boundaries, and morph behavior. Do not create or mention an export artifact unless export was requested.
