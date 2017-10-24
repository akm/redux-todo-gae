import React from 'react';

import Footer from './Footer'
import VisibleTodoList from './VisibleTodoList'
import AddTodo from './AddTodo'

const App = ({ match }) => (
  <div>
    <AddTodo />
    <VisibleTodoList
      filter={match.params.filter || 'all'}
    />
    <Footer />
  </div>
);

export default App
