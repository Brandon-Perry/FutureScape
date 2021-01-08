import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import './index.css';
import App from './App';
import configureStore from './store'
import { createStore } from 'redux';

// const preloadedState = {
//   user: null
// }

const store = configureStore()

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
