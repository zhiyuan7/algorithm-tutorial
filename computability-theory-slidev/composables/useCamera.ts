import { computed, type Ref } from 'vue'
import type { LayoutNode, TourScene } from '../data/types'
import { descendantIds } from './useKnowledgeLayout'

const VIEW_WIDTH = 1600
const VIEW_HEIGHT = 900

function boundsFor(nodes: LayoutNode[]) {
  if (!nodes.length) return { left: 0, right: VIEW_WIDTH, top: 0, bottom: VIEW_HEIGHT, width: VIEW_WIDTH, height: VIEW_HEIGHT }
  const left = Math.min(...nodes.map(node => node.x - node.width / 2))
  const right = Math.max(...nodes.map(node => node.x + node.width / 2))
  const top = Math.min(...nodes.map(node => node.y - node.height / 2))
  const bottom = Math.max(...nodes.map(node => node.y + node.height / 2))
  return { left, right, top, bottom, width: right - left, height: bottom - top }
}

function lineage(nodes: LayoutNode[], start?: LayoutNode) {
  const ids = new Set<string>()
  let cursor = start
  while (cursor) {
    ids.add(cursor.id)
    cursor = cursor.parentId ? nodes.find(node => node.id === cursor?.parentId) : undefined
  }
  return ids
}

export function useCamera(scene: Ref<TourScene>, nodes: Ref<LayoutNode[]>) {
  return computed(() => {
    const current = scene.value
    const focusNode = nodes.value.find(node => node.id === current.focus) ?? nodes.value[0]
    let framed = nodes.value

    if (current.framing === 'node' && focusNode) {
      const ids = lineage(nodes.value, focusNode)
      nodes.value.filter(node => node.parentId === focusNode.id).forEach(node => ids.add(node.id))
      framed = nodes.value.filter(node => ids.has(node.id))
    }
    else if (current.framing === 'subtree' && focusNode) {
      const ids = new Set(descendantIds(nodes.value, focusNode.id))
      lineage(nodes.value, focusNode).forEach(id => ids.add(id))
      framed = nodes.value.filter(node => ids.has(node.id))
    }

    const visibleIds = current.visibleNodes === 'all' ? undefined : new Set(current.visibleNodes)
    framed = framed.filter(node => !visibleIds || visibleIds.has(node.id))
    if (!framed.length && focusNode) framed = [focusNode]

    const box = boundsFor(framed)
    const padding = current.cameraPadding ?? (current.framing === 'all' ? 110 : 150)
    const detail = current.mode === 'detail'
    const availableWidth = detail ? 850 : VIEW_WIDTH - padding * 2
    const availableHeight = VIEW_HEIGHT - padding * 2
    const fitScale = Math.min(availableWidth / Math.max(box.width, 1), availableHeight / Math.max(box.height, 1))
    const scale = current.framing === 'all'
      ? Math.min(0.9, Math.max(0.63, fitScale))
      : current.framing === 'subtree'
        ? Math.min(0.96, Math.max(0.69, fitScale))
        : Math.min(1.04, Math.max(0.72, fitScale))
    const targetX = box.left + box.width / 2
    const targetY = box.top + box.height / 2
    const viewX = detail ? 535 : VIEW_WIDTH / 2
    const viewY = VIEW_HEIGHT / 2 + (detail ? 42 : 34)
    return {
      transform: `translate(${viewX} ${viewY}) scale(${scale}) translate(${-targetX} ${-targetY})`,
      scale,
    }
  })
}
