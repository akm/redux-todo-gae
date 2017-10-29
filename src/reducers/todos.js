export const todo = (state, action) => {
  switch (action.type) {
  case 'ADD_TODO':
    return {
      id: action.id,
      text: action.text,
      completed: false
    };
  case 'TOGGLE_TODO':
    if (state.id !== action.id) {
      return state;
    }

    return {
      ...state,
      completed: !state.completed
    }
  default:
    return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
  case 'ADD_TODO':
  case 'TOGGLE_TODO':
    return {
      ...state,
      [action.id]: todo(state[action.id], action),
    };
  default:
    return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
  case 'ADD_TODO':
    return [...state, action.id];
  default:
    return state;
  }
};

export default todos

// Selector function
export const getVisibleTodos = (state, filter) => {
  switch (filter) {
  case 'all':
    return state;
  case 'completed':
    return state.filter(t => t.completed);
  case 'active':
    return state.filter(t => !t.completed);
  default:
    throw new Error(`Unknown filter: ${filter}.`)
  }
}
