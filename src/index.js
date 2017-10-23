// import expect from 'expect'
import Redux, { createStore } from 'redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {todo, todos, visibilityFilter, todoApp, store} from './todos';

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    return (
      <div>
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: 'Test',
            id: nextTodoId++
          });
        }}>
          Add Todo
        </button>
        <ul>
          {this.props.todos.map(todo => (
            <li key={todo.id}>
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
