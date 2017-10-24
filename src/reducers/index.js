import { combineReducers } from 'redux';

import { todos, visibilityFilter } from './todos';

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp
