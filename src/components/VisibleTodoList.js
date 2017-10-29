import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TodoList from './TodoList'
import { toggleTodo } from '../actions/TodoActions'
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';

class VisibleTodoList extends Component {
  render() {
    return <TodoList {...this.props} />;
  }
}

const mapSateToTodoListProps = (state, { match }) => ({
  todos: getVisibleTodos(state, match.params.filter || 'all')
});
VisibleTodoList = withRouter(connect(
  mapSateToTodoListProps,
  { onTodoClick: toggleTodo },
)(VisibleTodoList));

export default VisibleTodoList
