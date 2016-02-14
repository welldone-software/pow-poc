import React from 'react';
import {bindActionCreators, compose} from 'redux'
import {connect} from 'react-redux'
import Sidebar  from 'react-sidebar'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import InlineEdit from 'react-edit-inline'
import * as actions from '../store/actions'
import Slides from './slides/Slides'
import SlideEditor from './editor/SlideEditor'
import Toolbox from './toolbox/Toolbox'


class App extends React.Component {


    render() {
        const {title, sidebars, actions} = this.props

        const onCloseLeft = () => actions.setSidebarOpen('left', false);
        const onOpenLeft = () => actions.setSidebarOpen('left', true);
        const onCloseRight = () => actions.setSidebarOpen('right', false);
        const onTiltleChange = (data) => actions.setDocTitle(data.title);

        const leftContent = <Slides onClose={onCloseLeft}/>
        const rightContent = <Toolbox onClose={onCloseRight}/>
        const closeButton = sidebars.left ? '' :
            <button className="sidebar-button sidebar-button-open" onClick={onOpenLeft}><i className="fi-list"></i></button>;

        return (
            <Sidebar sidebar={leftContent} open={sidebars.left} docked={sidebars.left}
                     onSetOpen={onCloseLeft}>
                <div>
                    {closeButton}
                    <Sidebar sidebar={rightContent} open={sidebars.right} pullRight={true} docked={true}
                             onSetOpen={onCloseRight}>
                        <div>
                            <h1><InlineEdit text={title} paramName="title" change={onTiltleChange}/></h1>
                            <SlideEditor/>
                        </div>
                    </Sidebar>
                </div>
            </Sidebar>

        )
    }
}

//
// redux and dnd intializtion
//


function mapStateToProps(state) {
    return {
        title: state.title,
        sidebars: state.sidebars
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}


const DndRedux = compose(
    DragDropContext(HTML5Backend),
    connect(mapStateToProps, mapDispatchToProps)
)

export default DndRedux(App);
