import type { LayoutEdge } from '../data/types'

export function edgeGeometry(edge: LayoutEdge) {
  const { source: a, target: b, id, type } = edge
  if (type === 'hierarchy') {
    // Keep the original smooth solid connectors.
    const sy = a.y + a.height / 2, ty = b.y - b.height / 2, mid = (sy + ty) / 2
    return { path: `M ${a.x} ${sy} C ${a.x} ${mid}, ${b.x} ${mid}, ${b.x} ${ty}`,
      x: (a.x + b.x) / 2, y: mid - 16 }
  }
  const bottom = (n: typeof a) => n.y + n.height / 2 + 12
  if (id === 'r-decidable-recognizable' || id === 'r-p-np') {
    const y = Math.max(bottom(a), bottom(b)) + 42
    const side = a.x > b.x ? 1 : -1
    const tx = b.x + side * (b.width / 2 + 12)
    const gutter = tx + side * 60
    // Enter the sibling from its side, leaving its downward solid branch clear.
    return { path: `M ${a.x} ${bottom(a)} L ${a.x} ${y} L ${gutter} ${y} L ${gutter} ${b.y} L ${tx} ${b.y}`,
      x: (a.x + gutter) / 2, y: y - 14 }
  }
  if (id === 'r-open-p') {
    const sx = a.x - a.width / 2 - 12, tx = b.x - b.width / 2 - 12, x = 185
    return { path: `M ${sx} ${a.y} L ${x} ${a.y} L ${x} ${b.y} L ${tx} ${b.y}`,
      x: x + 30, y: (a.y + b.y) / 2 }
  }
  // Other relation lines use the outer right gutter, with square right-angle bends.
  const sx = a.x + a.width / 2 + 12, tx = b.x + b.width / 2 + 12
  const x = Math.max(sx, tx) + 60
  return { path: `M ${sx} ${a.y} L ${x} ${a.y} L ${x} ${b.y} L ${tx} ${b.y}`,
    x: x + 30, y: (a.y + b.y) / 2 }
}
