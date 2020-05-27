import * as types from '../actions/actionTypes'

export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      //return state.push(action.course) //don't do this
      // En Javascript los objects, arrays & functions son mutables por defecto, por tanto la linea anterior es totalmente valida..
      return [...state, { ...action.course }]

    // Para otra accion agregamos otro case

    default:
      // Siempre un default!! NO OLVIDAR!
      return state
  }
}

/*
// Si no les gusta usar switch
const actionsMap = {
  [types.CREATE_COURSE]: (state, action) => {
    return [...state, { ...action.course }]
  },

  // Aqui agregariamos otra accion
}

export default (state = initialState, action = {}) => {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
*/
