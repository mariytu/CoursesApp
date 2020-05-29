import * as types from '../actions/actionTypes'
import initialState from './initialState'

// initialState just of the portion of state that this reducer manages
export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors
    default:
      return state
  }
}
