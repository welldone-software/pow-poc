import React from 'react'
import {DropTarget} from 'react-dnd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../store/actions' //{addItem, removeItem, changeItem, setCurrSlideTitle}
//import $ from 'jquery'
import InlineEdit from 'react-edit-inline'
import SlideEditorItem from './SlideEditorItem'
import SlideEditorSlide from './SlideEditorSlide'
import RecycleBin from './RecycleBin'


/**
 * The slide editor area.
 *
 * This is where slide editor items are manipulated.
 * Dropping a toolbox item on it results in creating a new slide item at the place of the drop.
 * Dropping a slide onto the editor will make it the active (currently edited) slide.
 */
@connect(
  state => ({currentSlide: state.currentSlide}),
  dispatch => ({actions: bindActionCreators(actions, dispatch)})
)
export default class SlideEditor extends React.Component {

    state = {
      isRecycleBinHot: false
    };

    onRecycleBinHot = (isRecycleBinHot) => {
      this.setState({isRecycleBinHot})
    };

    render() {

      const {currentSlide, actions} = this.props
      const {id, title} = currentSlide
      const onTiltleChange = (data) => actions.setSlideTitle(id, data.title)
      const {isRecycleBinHot} = this.state || {}
      const recycleBinWrapClassName = `recycle-bin-wrap ${isRecycleBinHot? 'is-hot' : ''}`

      return (
            <div className="slideeditor">
                <h3><InlineEdit text={title} paramName="title" change={onTiltleChange}/></h3>
                <SlideEditorSlide slide={currentSlide} actions={actions}/>
                <div className={recycleBinWrapClassName}>
                    <RecycleBin onHot={this.onRecycleBinHot} actions={actions}/>
                </div>
            </div>
       )
    }
}

