import React from 'react';

import Footer from './Footer'
import VisibleTodoList from './VisibleTodoList'
import AddTodo from './AddTodo'

import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div style={styles.container}>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  </MuiThemeProvider>
);

export default App
