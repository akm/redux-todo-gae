import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TodoList from './TodoList'
import * as actions from '../actions/TodoActions'
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, receiveTodos } = this.props
    fetchTodos(filter).then(todos =>
      receiveTodos(filter, todos)
    );
  }

  render() {
    return <TodoList {...this.props} />;
  }
}

const mapSateToTodoListProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  };
}

VisibleTodoList = withRouter(connect(
  mapSateToTodoListProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList
