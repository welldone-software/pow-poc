import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {DropTarget, DragSource} from 'react-dnd'
import {bindActionCreators} from 'redux'
import * as actions from '../../store/actions'
import Slide from './Slide'
import SlidesToolbar from './SlidesToolbar'

/**
 * The slides bar, holding the list of current slides
 *
 * Connected to the redux store.
 */
@connect(
  state => ({
    isOpen: state.sidebars.left,
    slides: state.slides,
    currentSlideId: state.currentSlide.id
  }),
  dispatch => ({actions: bindActionCreators(actions, dispatch)})
)
export default class Slides extends React.Component {

    render() {

      const {
            slides,
            currentSlideId,
            actions,
            onClose,
            isOpen
        } = this.props

      const {
            selectSlide,
            repositionSlide,
            addSlide,
            setSlideTitle
        } = actions

      return (
            <div className="slides">
                <SlidesToolbar addSlide={addSlide} isOpen={isOpen} onClose={onClose}/>
                <ul>
                    {slides.map((s, i) =>
                        <Slide
                            onSelect={selectSlide}
                            onTitleChange={setSlideTitle}
                            index={i}
                            isCurrent={s.id === currentSlideId}
                            repositionSlide={repositionSlide}
                            key={s.id}
                            {...s}
                        />)
                    }
                </ul>
            </div>
        )
    }
}
