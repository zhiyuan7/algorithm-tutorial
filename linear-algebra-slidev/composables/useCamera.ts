import { computed, type Ref } from 'vue'
import type { LayoutNode, TourScene } from '../data/types'

const VIEW_WIDTH = 1600

function boundsFor(nodes: LayoutNode[]) {
  const left = Math.min(...nodes.map(node => node.x - node.width / 2))
  const right = Math.max(...nodes.map(node => node.x + node.width / 2))
  const top = Math.min(...nodes.map(node => node.y - node.height / 2))
  const bottom = Math.max(...nodes.map(node => node.y + node.height / 2))
  return { left, right, top, bottom, width: right - left, height: bottom - top }
}

export function useCamera(scene: Ref<TourScene>, nodes: Ref<LayoutNode[]>) {
  return computed(() => {
    const current = scene.value
    // Visibility is resolved once by the stage so framing and rendered content agree.
    const box = boundsFor(nodes.value)
    // CSS uses a 1280 × 720 canvas; SVG coordinates are 1600 × 900.
    // Reserve the actual panel/header/footer rectangles before fitting nodes.
    const unit = VIEW_WIDTH / 1280
    const padding = current.cameraPadding ?? 24
    const left = 54 * unit + padding
    const right = (current.mode === 'detail' ? 670 : 1226) * unit - padding
    const top = 142 * unit + padding
    const bottom = 656 * unit - padding
    const availableWidth = right - left
    const availableHeight = bottom - top
    // Include the active card's small lift and its border in the fit.
    const fitScale = Math.min(availableWidth / (box.width + 20), availableHeight / (box.height + 20))
    const scale = Math.min(current.framing === 'all' ? 0.86 : 1, fitScale)
    const targetX = box.left + box.width / 2
    const targetY = box.top + box.height / 2
    const viewX = (left + right) / 2
    const viewY = (top + bottom) / 2
    return {
      transform: `translate(${viewX} ${viewY}) scale(${scale}) translate(${-targetX} ${-targetY})`,
      scale,
    }
  })
}
