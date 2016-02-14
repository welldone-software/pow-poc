import React from 'react'
import ToolboxItem from './ToolboxItem'

const ToolboxItemKinds = ['circle', 'rect']

/**
 * The toolbox holding the items to drag
 */
export default class Toolbox extends React.Component {

    render() {
        return (
            <div className="toolbox">
                <ul>
                    {ToolboxItemKinds.map(k => <ToolboxItem key={k} kind={k}/>)}
                </ul>
            </div>
        )
    }
}

