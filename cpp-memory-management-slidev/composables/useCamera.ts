import { computed, type Ref } from 'vue'
import type { LayoutNode, TourScene } from '../data/types'

const VIEW_WIDTH = 1600
const VIEW_HEIGHT = 900

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
    if (!nodes.value.length) return { transform: '', scale: 1 }
    // Visibility is decided by the scene; fit its remaining branch and context together.
    const box = boundsFor(nodes.value)
    if (current.framing === 'all') {
      box.bottom += 130 // Reserve room for the orthogonal relation lanes and labels.
      box.height += 130
    }
    const detail = current.mode === 'detail'
    const padding = current.cameraPadding ?? 100
    const availableWidth = detail ? 770 : VIEW_WIDTH - padding * 2
    const availableHeight = detail ? 540 : 610
    const fitScale = Math.min(availableWidth / box.width, availableHeight / box.height)
    const scale = Math.min(current.framing === 'all' ? 0.9 : 1.1, fitScale)
    const targetX = box.left + box.width / 2
    const targetY = box.top + box.height / 2
    const viewX = detail ? 440 : VIEW_WIDTH / 2
    const viewY = detail ? 495 : 485
    return {
      transform: `translate(${viewX} ${viewY}) scale(${scale}) translate(${-targetX} ${-targetY})`,
      scale,
    }
  })
}
