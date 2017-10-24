// import expect from 'expect'
import Redux, { createStore } from 'redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import throttle from 'lodash/throttle';

import {todo, todos, visibilityFilter, todoApp} from './reducers/todos';
import { addTodo, setVisibilityFilter, toggleTodo } from './actions/TodoActions';
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
