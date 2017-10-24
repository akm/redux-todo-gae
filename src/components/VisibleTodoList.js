import React from 'react';
import { connect } from 'react-redux';

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
    ownProps.filter
  )
});
const mapDispatchToTodoListProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id))
  }
});
const VisibleTodoList = connect(
  mapSateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

export default VisibleTodoList
