import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TodoList from './TodoList'
import { toggleTodo } from '../actions/TodoActions'
import { getVisibleTodos } from '../reducers';

const mapSateToTodoListProps = (state, { match }) => ({
  todos: getVisibleTodos(state, match.params.filter || 'all')
});
const VisibleTodoList = withRouter(connect(
  mapSateToTodoListProps,
  { onTodoClick: toggleTodo },
)(TodoList));

export default VisibleTodoList
