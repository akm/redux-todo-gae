// import expect from 'expect'
import Redux, { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';

import { todoApp } from './reducers/todos';
import { loadState, saveState } from './localStorage'

import App from './components/App'

const persistedState = loadState();
const store = createStore(todoApp, persistedState)
console.log(store.getState());

store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos
  });
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
