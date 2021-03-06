import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';

import sessionReducer from './session'
import eventReducer from './events'
import currentEventReducer from './currentEvent'


const rootReducer = combineReducers({
    session: sessionReducer,
    events: eventReducer,
    currentEvent: currentEventReducer
})


let enhancer

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancer(applyMiddleware(thunk, logger))
}

const configureStore = () => {
    return createStore(rootReducer, enhancer);
}

export default configureStore