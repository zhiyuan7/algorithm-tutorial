import type { LayoutEdge } from '../data/types'

export function edgeGeometry(edge: LayoutEdge) {
  const { source, target } = edge
  const startY = source.y + source.height / 2
  if (edge.type === 'hierarchy') {
    const endY = target.y - target.height / 2
    const midY = (startY + endY) / 2
    return {
      path: `M ${source.x} ${startY} C ${source.x} ${midY}, ${target.x} ${midY}, ${target.x} ${endY}`,
      label: { x: (source.x + target.x) / 2, y: midY },
      bounds: { left: Math.min(source.x, target.x), right: Math.max(source.x, target.x), top: Math.min(startY, endY), bottom: Math.max(startY, endY) },
    }
  }
  if (source.id === target.id) {
    const top = source.y - source.height / 2
    const turnY = top - 120
    return {
      path: `M ${source.x + 52} ${top} V ${turnY} H ${source.x - 52} V ${top}`,
      label: { x: source.x, y: turnY - 18 },
      bounds: { left: source.x - 60, right: source.x + 60, top: turnY - 42, bottom: top },
    }
  }
  const endY = target.y + target.height / 2
  const lane = edge.id === 'r-state-loop' || edge.id === 'r-sum-count' ? 175 : 90
  const turnY = Math.max(startY, endY) + lane
  return {
    path: `M ${source.x} ${startY} V ${turnY} H ${target.x} V ${endY}`,
    label: { x: (source.x + target.x) / 2, y: turnY + 25 },
    bounds: { left: Math.min(source.x, target.x), right: Math.max(source.x, target.x), top: Math.min(startY, endY), bottom: turnY + 42 },
  }
}
