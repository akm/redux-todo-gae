// import expect from 'expect'
import Redux, { createStore } from 'redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';

import {todo, todos, visibilityFilter, todoApp} from './todos';

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
      >
      {children}
    </a>
  );
};

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWilUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();

    return (
      <Link
        active={props.filter ===state.visibilityFilter}
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}
FilterLink.contextTypes = {
  store: PropTypes.object
}

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
    >
      All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE'
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED'
    >
      Completed
    </FilterLink>
  </p>
);


const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:
      completed ?
        'line-through' :
        'none'
    }}
  >
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

let nextTodoId = 0;
let AddTodo = ({ dispatch }) => {
  let input;

  return (
      <div>
        <input ref={node => {
            input = node;
        }} />
      <button onClick={() => {
        dispatch({
          type: 'ADD_TODO',
          text: input.value,
          id: nextTodoId++
        });
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};
AddTodo = connect(
  null,
  null
)(AddTodo);

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
  case 'SHOW_ALL':
    return todos;
  case 'SHOW_COMPLETED':
    return todos.filter(t => t.completed);
  case 'SHOW_ACTIVE':
    return todos.filter(t => !t.completed);
  }
}

const mapSateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
  };
}
const VisibleTodoList = connect(
  mapSateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);


ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
