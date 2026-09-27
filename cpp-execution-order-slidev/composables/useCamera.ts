import { computed, type Ref } from 'vue'
import { edgeGeometry } from './edgeGeometry'
import type { LayoutEdge, LayoutNode, TourScene } from '../data/types'

export function useCamera(scene: Ref<TourScene>, nodes: Ref<LayoutNode[]>, edges: Ref<LayoutEdge[]>) {
  return computed(() => {
    const current = scene.value
    const framed = nodes.value
    if (!framed.length) return { transform: '', scale: 1 }
    let left = Math.min(...framed.map(node => node.x - node.width / 2)) - 16
    let right = Math.max(...framed.map(node => node.x + node.width / 2)) + 16
    let top = Math.min(...framed.map(node => node.y - node.height / 2)) - 16
    let bottom = Math.max(...framed.map(node => node.y + node.height / 2)) + 16
    for (const edge of edges.value) {
      const { bounds } = edgeGeometry(edge)
      left = Math.min(left, bounds.left - 20)
      right = Math.max(right, bounds.right + 20)
      top = Math.min(top, bounds.top - 20)
      bottom = Math.max(bottom, bounds.bottom + 20)
    }
    const detail = current.mode === 'detail'
    const availableWidth = detail ? 790 : 1440
    const availableHeight = detail ? 590 : 650
    const scale = Math.min(current.framing === 'all' ? 0.92 : 1.05,
      availableWidth / (right - left), availableHeight / (bottom - top))
    const viewX = detail ? 445 : 800
    const viewY = detail ? 495 : 490
    return {
      transform: `translate(${viewX} ${viewY}) scale(${scale}) translate(${-(left + right) / 2} ${-(top + bottom) / 2})`,
      scale,
    }
  })
}
