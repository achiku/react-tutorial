// @flow

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

let nextTodoId :number = 0
export function addTodo(text: string) {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text,
  }
}

export function toggleTodo(id: number) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

export function setVisibilityFilter(filter: string) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter,
  }
}
