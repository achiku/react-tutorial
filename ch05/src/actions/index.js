// @flow

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

type AddTodoAction = {
  type: "ADD_TODO",
  id: number,
  text: string
}

let nextTodoId :number = 0
export function addTodo(text: string) :AddTodoAction {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text,
  }
}

type ToggleTodoAction = {
  type: "TOGGLE_TODO",
  id: number,
}

export function toggleTodo(id: number) :ToggleTodoAction {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

type TodoAction =
  | AddTodoAction
  | ToggleTodoAction

type SetVisibilityFilterAction = {
  type: "SET_VISIBILITY_FILTER",
  filter: string,
}

export function setVisibilityFilter(filter: string) :SetVisibilityFilterAction {
  return {
    type: SET_VISIBILITY_FILTER,
    filter,
  }
}

type FilterAction =
  | SetVisibilityFilterAction

export type { TodoAction, FilterAction }
