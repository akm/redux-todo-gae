import React from 'react';

import Todo from './Todo'

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <div style={styles.wrapper}>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </div>
);

export default TodoList
