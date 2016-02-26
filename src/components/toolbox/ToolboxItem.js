import React, {PropTypes} from 'react'
import {DragSource} from 'react-dnd'

/**
 * A toolbox item.
 *
 * Represents an item in the toolbox that can be dragged into the editor to create a new item on the current slide.
 */
class ToolboxItem extends React.Component {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    kind: PropTypes.string.isRequired
  };

  render() {

    const {
        connectDragSource,
        isDragging,
        kind
     } = this.props

    const itemClassName = `toolbox-item opaque-${!isDragging}` // ${isDragging ? 'is-dragging' : ''}
    const shapeClassName = `toolbox-item-shape kind-${kind}`


    return connectDragSource(
      <li key={kind} className={itemClassName}>
        <div className={shapeClassName}></div>
      </li>
    )
  }
}


//
// Drag source mapping and aspects
//

const dragSource = {
  beginDrag(props) {
    return {
      kind: props.kind
    }
  }
}

function dragSourceMapping(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource('ToolboxItem', dragSource, dragSourceMapping)(ToolboxItem)