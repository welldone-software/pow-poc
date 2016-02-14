import React from 'react'
import {DropTarget} from 'react-dnd'
import $ from 'jquery';
import SlideEditorItem from './SlideEditorItem'
import {playHighBloop, playLowBloop} from '../../serivces/sounds'
import {findDOMNode} from 'react-dom'

/**
 *
 * The slide editor's slide editing area.
 *
 * This is the editor's internal area representing the edited slide content.
 * It shows and allows to manipulated the current slide items.
 *
 */
class SlideEditorSlide extends React.Component{

    render() {
        const {connectDropTarget, slide} = this.props;
        return connectDropTarget(
            <div className="slideeditor-slide">
                {slide.items.map(i=><SlideEditorItem key={i.id} {...i} />)}
            </div>
        );
    }
}

//
// dnd callbacks
//


const dropTarget = {

    drop(props, monitor, component){
        const itemType = monitor.getItemType();
        const dropItem = monitor.getItem();
        const {addItem, changeItem, selectSlide} = props.actions;

        if(itemType === 'Slide'){
            selectSlide(dropItem.id);
            playLowBloop();
            return;
        }

        const offset = monitor.getClientOffset();
        const editoryOffset = $(findDOMNode(component)).offset();
        const mouseOffset = {
            x: monitor.getInitialClientOffset().x - monitor.getInitialSourceClientOffset().x,
            y: monitor.getInitialClientOffset().y - monitor.getInitialSourceClientOffset().y
        };

        const x = offset.x - editoryOffset.left - mouseOffset.x;
        const y = offset.y - editoryOffset.top - mouseOffset.y;

        const isNewItem = !dropItem.id;

        if(isNewItem){
            addItem(dropItem.kind, x, y);
            playHighBloop();
        }
        else{
            changeItem(dropItem.id, {x, y});
            playLowBloop();
        }
    }
}


const dropTargetMapping = connect => ({
    connectDropTarget: connect.dropTarget()
});

const DndSlideEditorSlide = DropTarget(['ToolboxItem', 'SlideEditorItem', 'Slide'], dropTarget, dropTargetMapping)(SlideEditorSlide);

export default DndSlideEditorSlide;