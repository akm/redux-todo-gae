import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TodoList from './TodoList'
import { toggleTodo } from '../actions/TodoActions'

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
  case 'all':
    return todos;
  case 'completed':
    return todos.filter(t => t.completed);
  case 'active':
    return todos.filter(t => !t.completed);
  }
}

const mapSateToTodoListProps = (state, { match }) => ({
  todos: getVisibleTodos(state.todos, match.params.filter || 'all')
});
const VisibleTodoList = withRouter(connect(
  mapSateToTodoListProps,
  { onTodoClick: toggleTodo },
)(TodoList));

export default VisibleTodoList
