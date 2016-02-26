import React from 'react'
import {DropTarget} from 'react-dnd'
import {playTrash, playBuzzer} from '../../serivces/sounds'


const dropTarget = {
  drop(props, monitor, component) {
    const {actions} = props
    const {id, isCurrent} = monitor.getItem()
    const action = monitor.getItemType() === 'Slide' ?'removeSlide' : 'removeItem'
    if(isCurrent){
      playBuzzer()
      return
    }
    actions[action](id)
    playTrash()
  }
}


const dropTargetMapping = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isDragging: monitor.isOver({shallow: true})
})


/**
 *
 * The recycle bin at the bottom of the app.
 *
 * The bin waits for items to be dragged into it, it grows when it feels and item might be dropped on it.
 * When an editor item or a slide are dropped into the recycle bin, they are deleted.
 *
 */
@DropTarget(['SlideEditorItem', 'Slide'], dropTarget, dropTargetMapping)
export default class RecycleBin extends React.Component {

    componentWillReceiveProps(nextProps){
      if(nextProps.isDragging !== this.props.isDragging){
        nextProps.onHot(nextProps.isDragging)
      }
    }

    render() {

      const {connectDropTarget, isDragging} = this.props
      const className = `recycle-bin ${isDragging ? 'is-dragging' : ''}`

      return connectDropTarget(
            <div className={className}><i className="fi-trash"/><div>drop to delete</div></div>
        )
    }
}

//
// dnd callbacks
//




