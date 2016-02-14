import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers'
import DevTools from '../components/DevTools';
import thunk from 'redux-thunk';
import documentService from '../serivces/document';
import {observeStore} from './utils'


function autoSaveStoreListener(state){
    //console.log('store updated', state);
    documentService.updateFromState(state);
}


const finalCreateStore = compose(
    applyMiddleware(thunk),
    DevTools.instrument()
)(createStore);

function configureStore() {
    const initialState = documentService.getInitialState();
    const store = finalCreateStore(rootReducer, initialState);

    observeStore(store, s => s, autoSaveStoreListener);

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('./reducers', () =>
            store.replaceReducer('./reducers'/*.default if you use Babel 6+ */)
        );
    }

    return store;
}


const store = configureStore();

export default store;