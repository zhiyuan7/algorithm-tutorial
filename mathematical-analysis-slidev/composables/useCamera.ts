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
    if (current.framing === 'node' && focus) framed = [focus]
    if (current.framing === 'subtree' && focus) {
      const ids = new Set(descendantIds(nodes.value, focus.id))
      framed = nodes.value.filter(node => ids.has(node.id))
    }
    const box = boundsFor(framed)
    const detail = current.mode === 'detail'
    const padding = current.framing === 'all' ? 95 : 140
    const availableWidth = detail ? 890 : VIEW_WIDTH - padding * 2
    const availableHeight = detail ? 610 : VIEW_HEIGHT - 200
    const fit = Math.min(availableWidth / Math.max(box.width, 1), availableHeight / Math.max(box.height, 1))
    const scale = current.framing === 'all' ? Math.min(.88, fit) : Math.min(1.06, fit)
    const targetX = box.left + box.width / 2
    const targetY = box.top + box.height / 2
    const viewX = detail ? 480 : VIEW_WIDTH / 2
    const viewY = detail ? 480 : VIEW_HEIGHT / 2 + 35
    return { transform: `translate(${viewX} ${viewY}) scale(${scale}) translate(${-targetX} ${-targetY})`, scale }
  })
}
