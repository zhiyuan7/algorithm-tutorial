# Graph and motion design

Read this when the presentation contains more than one graph, semantic zoom, or a requested morph transition.

## Graph contract

Each graph should have its own data object containing:

- stable node IDs and concise labels;
- optional nested children;
- explicit relations with semantic edge types;
- a layout strategy appropriate to the argument, such as cycle, tree, radial, timeline, or custom coordinates.

Store narrative states separately from graph data. A tour scene selects a map, focus, framing, semantic depth, visible nodes/edges, and optional detail key.

## Keep maps independent

Two maps are independent when users should be able to inspect either map without loading the other. Never create a synthetic root only to connect unrelated maps.

For a transition, write a mapping table before coding:

| Source node/group | Transition action | Target node/group | Meaning preserved |
|---|---|---|---|

Unmapped nodes may fade, collapse into a group, or remain as contextual residue. Make the semantic reason visible through motion, labels, or narration.

## Morph scene

Implement the morph as its own component or explicit scene state:

1. hold the completed source graph briefly;
2. dim non-participating detail;
3. move or scale mapped nodes along comprehensible paths;
4. rewrite labels only near their target positions;
5. reveal target edges after target nodes settle;
6. complete the transition on the target graph's own overview state.

Reuse stable DOM keys for elements that are meant to feel continuous. Use separate keys for concepts that only crossfade. Motion must explain the conceptual remapping, not merely decorate it.

## Camera rules

- `node`: frame the focused node plus immediate relations.
- `subtree`: frame a branch and its descendants.
- `all`: frame the entire current graph.
- Add enough padding for edge labels and detail panels.
- Do not zoom so far that the audience loses all location cues.
- Keep animation duration and easing consistent across the deck; use slower movement for map changes than for local focus changes.

Avoid simultaneous camera movement, label rewriting, large content reveals, and edge rerouting unless the transition is intentionally staged over multiple click states.
