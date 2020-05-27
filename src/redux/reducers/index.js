import { combineReducers } from 'redux'
import courses from './courseReducer' // Aca puedo nombrar el reducer con el nombre que quiera... esto lo puedo hacer gracias a que la funcion tiene un export default

const rootReducer = combineReducers({
  courses, // Esto es la forma resumida de //courses: courses,
  // Si tuviesemos mas reducers aqui los agregariamos
})

export default rootReducer
