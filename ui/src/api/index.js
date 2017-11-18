import { v4 } from 'node-uuid';
import 'whatwg-fetch'

export const fetchTodos = (filter) =>
  fetch(`/api/todos?q=${filter}`).
  then((response) => response.json())

export const addTodo = (text) =>
  fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text,
    })
  }).
  then((response) => response.json())

export const toggleTodo = (id) =>
  fetch(`/api/todos/${id}/toggle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: ''
  }).
  then((response) => response.json())
