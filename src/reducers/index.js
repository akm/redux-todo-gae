import { combineReducers } from 'redux';
import byId, * as fromById from './byId'
import createList, * as fromList from './createList';

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const todos = combineReducers({
  byId,
  listByFilter,
});

export default todos

// Selector functions

export const getVisibleTodos = (state, filter) => {
  const ids = state.listByFilter[filter];
  return ids.map(id => state.byId[id]);
}
