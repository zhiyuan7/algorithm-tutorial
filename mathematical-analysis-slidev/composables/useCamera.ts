import { computed, type Ref } from 'vue'
import type { LayoutNode, TourScene } from '../data/types'

export function useCamera(scene: Ref<TourScene>, nodes: Ref<LayoutNode[]>) {
  return computed(() => {
    if (!nodes.value.length) return { transform: '', scale: 1 }
    // Fit only what is on screen. Hidden branches cannot shrink the current view.
    const left = Math.min(...nodes.value.map(n => n.x - n.width / 2)) - 35
    const right = Math.max(...nodes.value.map(n => n.x + n.width / 2)) + 35
    const top = Math.min(...nodes.value.map(n => n.y - n.height / 2)) - 30
    const bottom = Math.max(...nodes.value.map(n => n.y + n.height / 2)) + (scene.value.map === 'one-variable' && scene.value.mode === 'overview' ? 200 : scene.value.mode === 'detail' ? 80 : 110)
    const detail = scene.value.mode === 'detail'
    const scale = Math.min(detail ? 1.1 : 1, (detail ? 800 : 1460) / (right - left), (detail ? 570 : 650) / (bottom - top))
    const viewX = detail ? 480 : 800
    const viewY = 500
    return { transform: `translate(${viewX} ${viewY}) scale(${scale}) translate(${-(left + right) / 2} ${-(top + bottom) / 2})`, scale }
  })
}
