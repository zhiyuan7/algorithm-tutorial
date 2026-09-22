# Content modeling

Read this before choosing graph boundaries, node labels, or scene order.

## Extract the argument

Read the complete article, including code, formulas, captions, tables, examples, and links. Record:

- the central question and final thesis;
- major concepts and definitions;
- causal, logical, temporal, evidential, and dependency relations;
- examples that make an abstraction concrete;
- formulas or quotations that deserve a detail scene;
- caveats, limitations, counterexamples, and corrections.

Do not map headings one-to-one to nodes. A heading may contain several claims, while several headings may support one concept.

## Create a coverage matrix

Add a table to `content-analysis.md` with at least:

| Source anchor | Core idea | Graph/node or scene | Treatment | Notes |
|---|---|---|---|---|

`Treatment` should distinguish overview node, detail panel, narration, example, formula, or intentionally omitted material. Every substantive source section needs a destination or an explicit omission reason.

## Split conceptual frames

Use separate maps when the article changes any of these:

- the root question;
- the meaning of an edge;
- the organizing axis or hierarchy;
- the scale of analysis;
- the scientific or explanatory paradigm.

Do not merge maps merely to make one impressive overview. The transition can explain their relationship without erasing the boundary.

## Layer the explanation

For each important concept, prepare four possible representations:

1. overview: short label and visual role;
2. summary: one-sentence meaning;
3. concept: mechanism and relationship to neighbors;
4. detail: derivation, formula, example, or limitation.

Only use the depth the source supports. Place long prose in a detail panel or presenter notes, not inside a graph node.

## Plan the tour

Create `storyboard.md` with one row per click state:

| Step | Active map | Focus | Camera framing | Visible context | Narration goal |
|---:|---|---|---|---|---|

The tour should normally move from question to local detail, assemble an overview, transition to the next frame, then end on synthesis. Do not impose this sequence when the article's argument needs another order.
