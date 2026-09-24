import { computed, type Ref } from 'vue'
import type { LayoutNode, TourScene } from '../data/types'
import { descendantIds } from './useKnowledgeLayout'
const VIEW_WIDTH=1600, VIEW_HEIGHT=900
function boundsFor(nodes:LayoutNode[]) {
  const left=Math.min(...nodes.map(n=>n.x-n.width/2)),right=Math.max(...nodes.map(n=>n.x+n.width/2))
  const top=Math.min(...nodes.map(n=>n.y-n.height/2)),bottom=Math.max(...nodes.map(n=>n.y+n.height/2))
  return {left,right,top,bottom,width:right-left,height:bottom-top}
}
export function useCamera(scene:Ref<TourScene>,nodes:Ref<LayoutNode[]>) {
  return computed(()=>{
    const current=scene.value
    const focus=nodes.value.find(n=>n.id===current.focus)??nodes.value[0]
    let framed=nodes.value
    if(current.framing!=='all'&&focus) {
      const ids=new Set(current.framing==='subtree'?descendantIds(nodes.value,focus.id):[focus.id])
      let cursor:LayoutNode|undefined=focus
      while(cursor?.parentId){ids.add(cursor.parentId);cursor=nodes.value.find(n=>n.id===cursor?.parentId)}
      framed=nodes.value.filter(n=>ids.has(n.id))
    }
    const box=boundsFor(framed)
    const detail=current.mode==='detail', padding=current.cameraPadding??(current.framing==='all'?115:160)
    const width=detail?870:VIEW_WIDTH-padding*2, height=VIEW_HEIGHT-padding*2
    const fit=Math.min(width/Math.max(box.width,1),height/Math.max(box.height,1))
    const scale=current.framing==='all'?Math.min(.9,fit):Math.min(1.05,Math.max(.64,fit))
    const viewX=VIEW_WIDTH/2+(detail?-325:0),viewY=VIEW_HEIGHT/2+(detail?38:0)
    return {transform:`translate(${viewX} ${viewY}) scale(${scale}) translate(${-box.left-box.width/2} ${-box.top-box.height/2})`,scale}
  })
}
