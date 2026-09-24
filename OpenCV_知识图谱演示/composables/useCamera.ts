import { computed, type Ref } from 'vue'
import type { LayoutNode, TourScene } from '../data/types'
import { descendantIds } from './useKnowledgeLayout'

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
    const focus = nodes.value.find(node => node.id === current.focus) ?? nodes.value[0]
    let framed = nodes.value
    if (current.cameraNodes?.length) framed = nodes.value.filter(node => current.cameraNodes!.includes(node.id))
    else if (current.framing === 'node') framed = [focus]
    else if (current.framing === 'subtree') {
      const ids = new Set(descendantIds(nodes.value, focus.id))
      framed = nodes.value.filter(node => ids.has(node.id))
    }
    const box = boundsFor(framed.length ? framed : [focus])
    const padding = current.cameraPadding ?? (current.framing === 'all' ? 132 : 180)
    const availableWidth = current.mode === 'detail' ? 840 : VIEW_WIDTH - padding * 2
    const availableHeight = VIEW_HEIGHT - padding * 2
    const fit = Math.min(availableWidth / Math.max(box.width, 1), availableHeight / Math.max(box.height, 1))
    const scale = current.mode === 'detail' ? Math.min(1.04, fit) : Math.min(.91, fit)
    const targetX = box.left + box.width / 2
    const targetY = box.top + box.height / 2
    const viewX = current.mode === 'detail' ? 498 : VIEW_WIDTH / 2
    const viewY = current.mode === 'detail' ? 475 : VIEW_HEIGHT / 2 + 35
    return { transform: `translate(${viewX} ${viewY}) scale(${scale}) translate(${-targetX} ${-targetY})`, scale }
  })
}
