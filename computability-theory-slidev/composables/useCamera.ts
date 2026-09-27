import { computed, type Ref } from 'vue'
import type { LayoutEdge, LayoutNode, TourScene } from '../data/types'
import { edgeGeometry } from './edgeGeometry'

export function useCamera(scene: Ref<TourScene>, nodes: Ref<LayoutNode[]>, edges: Ref<LayoutEdge[]>) {
  return computed(() => {
    const framed = nodes.value
    if (!framed.length) return { transform: '', scale: 1 }
    const xs = framed.flatMap(node => [node.x - node.width / 2, node.x + node.width / 2])
    const ys = framed.flatMap(node => [node.y - node.height / 2, node.y + node.height / 2])
    for (const edge of edges.value) {
      const geometry = edgeGeometry(edge)
      const coordinates = geometry.path.match(/-?\d+(?:\.\d+)?/g)!.map(Number)
      coordinates.forEach((value, index) => (index % 2 === 0 ? xs : ys).push(value))
      if (edge.label) {
        xs.push(geometry.x - 145, geometry.x + 145)
        ys.push(geometry.y - 15, geometry.y + 17)
      }
    }
    const left = Math.min(...xs) - 24
    const right = Math.max(...xs) + 24
    const top = Math.min(...ys) - 24
    const bottom = Math.max(...ys) + 24
    const detail = scene.value.mode === 'detail'
    // SVG coordinates: the right panel starts at x=930; the heading ends at y=130.
    // Never clamp the fit scale upwards: a tall branch must fit inside this safe area.
    const width = detail ? 790 : 1400
    const height = detail ? 550 : 640
    const scale = Math.min(scene.value.framing === 'all' ? 0.88 : 1.12,
      width / (right - left), height / (bottom - top))
    const centerX = detail ? 475 : 800
    const centerY = detail ? 485 : 485
    return {
      transform: `translate(${centerX} ${centerY}) scale(${scale}) translate(${-(left + right) / 2} ${-(top + bottom) / 2})`,
      scale,
    }
  })
}
