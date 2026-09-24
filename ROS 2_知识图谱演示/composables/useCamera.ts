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

    if (current.mode === 'detail') {
      const visibleIds = current.visibleNodes === 'all'
        ? new Set(nodes.value.map(node => node.id))
        : new Set(current.visibleNodes)
      framed = nodes.value.filter(node => visibleIds.has(node.id))
    }

    const box = boundsFor(framed)
    const padding = current.cameraPadding ?? (current.framing === 'all' ? 120 : 180)
    const detailOffset = current.mode === 'detail' ? -260 : 0
    const availableWidth = current.mode === 'detail' ? 900 : VIEW_WIDTH - padding * 2
    const availableHeight = VIEW_HEIGHT - padding * 2
    const fitScale = Math.min(availableWidth / Math.max(box.width, 1), availableHeight / Math.max(box.height, 1))
    const scale = current.framing === 'node'
      ? Math.min(1, Math.max(0.64, fitScale))
      : current.framing === 'subtree'
        ? Math.min(0.98, Math.max(0.74, fitScale))
        : current.map === 'execution'
          ? Math.min(0.82, Math.max(0.66, fitScale))
          : Math.min(0.95, Math.max(0.68, fitScale))
    const targetX = box.left + box.width / 2
    const targetY = box.top + box.height / 2
    const viewX = VIEW_WIDTH / 2 + detailOffset
    const viewY = VIEW_HEIGHT / 2 + (current.mode === 'detail' ? 38 : 0)
    return {
      transform: `translate(${viewX} ${viewY}) scale(${scale}) translate(${-targetX} ${-targetY})`,
      scale,
    }
  })
}
