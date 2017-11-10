import React from 'react';

import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
};

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <Chip
    onClick={onClick}
    style={{
      margin: 4,
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    {text}
  </Chip>
);

export default Todo
