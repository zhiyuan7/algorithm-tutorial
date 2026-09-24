import { computed, type Ref } from 'vue'
import type { LayoutNode, TourScene } from '../data/types'

function bounds(nodes: LayoutNode[]) {
  const left=Math.min(...nodes.map(node=>node.x-node.width/2))
  const right=Math.max(...nodes.map(node=>node.x+node.width/2))
  const top=Math.min(...nodes.map(node=>node.y-node.height/2))
  const bottom=Math.max(...nodes.map(node=>node.y+node.height/2))
  return { x:(left+right)/2,y:(top+bottom)/2,width:right-left,height:bottom-top }
}
export function useCamera(scene: Ref<TourScene>, nodes: Ref<LayoutNode[]>) {
  return computed(()=>{
    const current=scene.value
    const focusIndex=nodes.value.findIndex(node=>node.id===current.focus)
    let framed=nodes.value
    if (current.mode==='detail' && focusIndex>0) framed=nodes.value.slice(Math.max(1,focusIndex-1),Math.min(nodes.value.length,focusIndex+2))
    else if (current.mode==='detail') framed=nodes.value.slice(0,2)
    const box=bounds(framed)
    const detail=current.mode==='detail'
    const scale=Math.min(detail?1.05:0.94,(detail?850:1430)/box.width,(detail?620:690)/box.height)
    return { transform:`translate(${detail?530:800} ${detail?600:470}) scale(${scale}) translate(${-box.x} ${-box.y})`,scale }
  })
}
