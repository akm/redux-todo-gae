import { combineReducers } from 'redux';
import byId, * as fromById from './byId'

const createList = (filter) => {
  return (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
    }
  };
};

const idsByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const todos = combineReducers({
  byId,
  idsByFilter,
});

export default todos

// Selector functions

export const getVisibleTodos = (state, filter) => {
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.byId[id]);
}
