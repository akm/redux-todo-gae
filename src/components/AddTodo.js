import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions'

import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styles = {
  button: {
    marginRight: 20,
  },
};

let AddTodo = ({ dispatch }) => {
  let input;

  return (
      <div>
        <TextField id="AddTodoField" ref={node => {
            input = node.input;
        }} />
      <FloatingActionButton style={styles.button} onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  );
};
AddTodo = connect()(AddTodo);

export default AddTodo
