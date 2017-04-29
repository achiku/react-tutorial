// @flow
import { combineReducers } from 'redux'
import { 
  VisibilityFilters,
  ADD_TODO,
  SET_VISIBILITY_FILTER,
  TOGGLE_TODO,
} from '../actions'
import type { TodoAction, FilterAction } from '../actions'

const { SHOW_ALL } = VisibilityFilters

type VisibilityFilerState = string

function visibilityFilter(state: VisibilityFilerState = SHOW_ALL, action: FilterAction): VisibilityFilerState {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

type TodosState = Array<{
  +id: number,
  +text: string,
  +completed: bool,
}>

function todos(state: TodosState = [], action: TodoAction): TodosState {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo) => {
        if (todo.id === action.id) {
          return Object.assign({}, todo, {
            completed: !todo.completed,
          })
        }
        return todo
      })
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos,
})

export default todoApp
