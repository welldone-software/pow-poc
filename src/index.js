import React, { PropTypes } from 'react'
import {render} from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import DevTools from './components/DevTools'
import App from './components/App'

import './style.less'

render(
    <Provider store={store}>
        <div className="content">
            <App />
            <DevTools/>
        </div>
    </Provider>,
    document.getElementById('root')
)