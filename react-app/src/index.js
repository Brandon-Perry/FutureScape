import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import './index.css';
import App from './App';
import configureStore from './store'

const preloadedState = {
  test: 'test'
}

let store = configureStore(preloadedState)

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
