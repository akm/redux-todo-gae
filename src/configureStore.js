import Redux, { createStore } from 'redux';
import throttle from 'lodash/throttle';
import todoApp from './reducers/index';

import { loadState, saveState } from './localStorage'

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(todoApp, persistedState)
  console.log(store.getState());

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  }, 1000));

  return store;
}

export default configureStore
