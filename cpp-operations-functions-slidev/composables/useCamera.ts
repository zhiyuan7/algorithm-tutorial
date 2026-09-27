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
    const focusNode = nodes.value.find(node => node.id === current.focus) ?? nodes.value[0]
    let framed = nodes.value
    if (current.framing === 'node' && focusNode) {
      const lineage = new Set([focusNode.id])
      let cursor: LayoutNode | undefined = focusNode
      while (cursor?.parentId) {
        lineage.add(cursor.parentId)
        cursor = nodes.value.find(node => node.id === cursor?.parentId)
      }
      framed = nodes.value.filter(node => lineage.has(node.id))
    }
    else if (current.framing === 'subtree' && focusNode) {
      const ids = new Set(descendantIds(nodes.value, focusNode.id))
      let cursor: LayoutNode | undefined = focusNode
      while (cursor?.parentId) {
        ids.add(cursor.parentId)
        cursor = nodes.value.find(node => node.id === cursor?.parentId)
      }
      framed = nodes.value.filter(node => ids.has(node.id))
    }

    if (!framed.length) return { transform: '', scale: 1 }
    const box = boundsFor(framed)
    // Dashed relation routes run in gutters below and beside the visible tree.
    if (current.framing === 'all') {
      box.left -= 140
      box.width = box.right - box.left
      box.bottom += 180
      box.height = box.bottom - box.top
    }
    const detail = current.mode === 'detail'
    const padding = current.cameraPadding ?? 100
    const availableWidth = detail ? 790 : VIEW_WIDTH - padding * 2
    const availableHeight = detail ? 560 : 610
    const fitScale = Math.min(availableWidth / Math.max(box.width, 1), availableHeight / Math.max(box.height, 1))
    const scale = Math.min(current.framing === 'all' ? 0.9 : 1.05, fitScale)
    const targetX = box.left + box.width / 2
    const targetY = box.top + box.height / 2
    const viewX = detail ? 475 : VIEW_WIDTH / 2
    const viewY = detail ? 495 : 475
    return {
      transform: `translate(${viewX} ${viewY}) scale(${scale}) translate(${-targetX} ${-targetY})`,
      scale,
    }
  })
}
