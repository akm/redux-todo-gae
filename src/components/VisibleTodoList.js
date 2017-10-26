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

const mapSateToTodoListProps = (state, ownProps) => ({
  todos: getVisibleTodos(
    state.todos,
    ownProps.match.params.filter || 'all'
  )
});
const mapDispatchToTodoListProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id))
  }
});
const VisibleTodoList = withRouter(connect(
  mapSateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList));

export default VisibleTodoList
