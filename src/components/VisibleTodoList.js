import React from 'react';
import { connect } from 'react-redux';

import TodoList from './TodoList'
import { toggleTodo } from '../actions/TodoActions'

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

const mapSateToTodoListProps = (state) => ({
  todos: getVisibleTodos(
    state.todos,
    state.visibilityFilter
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
