import React from 'react'
import {DragSource} from 'react-dnd'



//
// dnd callbacks
//
const dragSource = {
  beginDrag(props, monitor, component) {
    return {id: props.id}
  }
}

function dragSourceMapping(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

/**
 * The slide editor item.
 *
 * An item on slide editor that can be manipulated (e.g circle, rect).
 */
@DragSource(
  'SlideEditorItem',
  dragSource,
  dragSourceMapping
)
export default class SlideEditorItem extends React.Component {

  render() {

    const {
      x,
      y,
      r,
      w,
      h,
      kind,
      connectDragSource,
      isDragging
      } = this.props

    const width = kind === 'circle' ? r * 2 : w
    const height = kind === 'circle' ? r * 2 : h
    const className = `slideeditor-slide-item kind-${kind} opaque-${!isDragging}`

    return connectDragSource(
      <div className={className} style={{left: x, top: y, height, width}}></div>
    )
  }
}


