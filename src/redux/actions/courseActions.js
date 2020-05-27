import * as types from './actionTypes'

// Esto es un ACTION CREATOR
// { type: types.CREATE_COURSE, course } // ESTO ES EL ACTION.. donde el type es obligatorio!!
export function createCourse(course) {
  // Si no manejamos actions types se puede escribir el tipo directamente asi
  //return { type: 'CREATE_COURSE', course: course }
  // Esto se puede mejorar
  //return { type: 'CREATE_COURSE', course }
  return { type: types.CREATE_COURSE, course }
}
