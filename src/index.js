// import expect from 'expect'
import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './configureStore'
import { fetchTodos } from './api'
import Root from './components/Root'

fetchTodos('all').then(todos =>
  console.log(todos)
);

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
