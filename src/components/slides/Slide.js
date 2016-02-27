import React, {PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {DropTarget as dropTargetDecorator, DragSource as dragSourceDecorator} from 'react-dnd'
import InlineEdit from 'react-edit-inline'



/**
 * A slide item on the slides sidebar.
 *
 * Represents a slide header information in the list of slides on the left side bar.
 * Ths slide is both a drag source and a drop target as it is responsible for dnd reordering of the slides inside the
 * list of slides.
 *
 * It can also be dragged to the editor, to make it the 'current' slide and to the recycle bin to delete it.
 *
 */

class Slide extends React.Component {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    isCurrent: PropTypes.bool.isRequired,
    repositionSlide: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  render() {

    const {
      id,
      title,
      snapshot,
      connectDragSource,
      connectDropTarget,
      isDragging,
      isCurrent,
      onSelect,
      onTitleChange
      } = this.props

    const className = `slide ${isCurrent ? 'current' : ''} opaque-${!isDragging}`
    const onInlineEditChange = obj => onTitleChange(id, obj.title)

    return connectDragSource(connectDropTarget(
      <li className={className} onDoubleClick={onSelect.bind(this, id)} style={{backgroundSize: 'contain', backgroundImage: `url(${snapshot})`}}>
        <div><InlineEdit text={title} paramName="title" change={onInlineEditChange}/></div>
      </li>
    ))
  }
}


const dropTarget = {
  hover(props, monitor, component) {

    const dragItem = monitor.getItem()
    const dragId = dragItem.id
    const dragIndex = dragItem.index
    const hoverIndex = props.index

    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.repositionSlide(dragId, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally bad idea but ok here to avoid expensive index searches.
    dragItem.index = hoverIndex
  }
}

const dropTargetWrapper = dropTargetDecorator(
  'Slide',
  dropTarget,
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)

const dragSourceWrapper = dragSourceDecorator(
  'Slide',
  {
    beginDrag: (props) => ({
      id: props.id,
      index: props.index,
      isCurrent: props.isCurrent
    })
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)


const dndSlide = dragSourceWrapper(dropTargetWrapper(Slide))

export default dndSlide