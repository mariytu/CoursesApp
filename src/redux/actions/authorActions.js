import * as types from './actionTypes'
import * as authorApi from '../../api/authorApi'

// Actions Creators
export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors }
}

// Thunks
export function loadAuthors() {
  return function (dispatch) {
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors))
      })
      .catch((error) => {
        throw error
      })
  }
}
