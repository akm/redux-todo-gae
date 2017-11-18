import React from 'react';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';

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
    style={{margin: 4}}
    >
      <Avatar icon={
        <FontIcon className="material-icons">{ completed ? 'check' : '' }</FontIcon>
      } />
    {text}
  </Chip>
);

export default Todo
