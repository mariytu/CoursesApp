// { Component } from ... aqui se uso el destructuring
import React, { Component } from 'react'
import { connect } from 'react-redux' // Para conectar este componente al store
import * as courseActions from '../../redux/actions/courseActions' // Se requiere para poder llamar a las acciones del store
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux' // Cuando se usa el mapDispatchToProps como bindActionCreators o as Object se requiere este import

class CoursesPage extends Component {
  /*constructor(props) { // first approach with constructor
    super(props)

    this.state = {
      course: {
        title: '',
      },
    }

    // Es necesario hacer el binding cuando se utiliza una funcion... se podria reemplazar la funcion por un arrow function y se podria omitir este binding
    //this.handleChange = this.handleChange.bind(this)
  }*/

  state = {
    course: {
      title: '',
    },
  }

  /*
  // Como funcion.. se puede transformar en un arrow function
  handleChange(event) {
    const course = { ...this.state.course, title: event.target.value }
    //this.setState({ course: course })
    this.setState({ course }) // Forma mas resumida para escribir lo mismo
  }*/

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value }
    this.setState({ course })
  }

  handleSubmit = (event) => {
    event.preventDefault() // Esto es necesario para evitar el postBack

    //this.props.dispatch(courseActions.createCourse(this.state.course)) // Use dispatch directly
    //this.props.createCourse(this.state.course) // Wrap manually
    //this.props.createCourse(this.state.course) // mapDispatchToProps as Object
    this.props.actions.createCourse(this.state.course) // bindActionCreators
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          //onChange={this.handleChange.bind(this)} // Cuando se usa una funcion.. y se hace el binding aquí... es mas optimo si se hace una vez en el construtor.. y mejor aun si se transforma en un arrow function
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />

        {/* Aqui pintamos el arreglo de cursos que viene desde el store de redux */}
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    )
  }
}

/*
// Definicion de propTypes con arreglo de cursos que viene del store y dispatch (cuando se utiliza directamente)
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}*/

/*
// Definicion de propTypes con arreglo de cursos que viene del store y createCourse como accion cuando se utiliza el mapDispatchToProps como wrap manually
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  createCourse: PropTypes.func.isRequired,
}*/

// Definicion de propTypes con arreglo de cursos que viene del store y actions como objeto que almacena todas las acciones cuando se utiliza el mapDispatchToProps como bindActionCreators
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

// This func determnine what state is passed to our component via props
// What part of the state we expose to our component
// function mapStateToProps({ courses }) { // Podria usar un destructuring aqui
function mapStateToProps(state) {
  // Aca omito el segundo parametro ownProps, porque no se utiliza
  // Be specific. Request only the data your component needs...
  // If you expose the entire Redux store, then the component will rerender when any data changes in the redux store

  // const { courses } = state // Se podria usar el destructuring aca tambien
  return {
    courses: state.courses,
    // courses, // asi quedaria si usara destructuring
  }
}

/*
// 1. Use dispatch directly
// No requiere enviar el segundo parametro
// but we have a dispatch in the props injected automatically
export default connect(mapStateToProps)(CoursesPage)
*/

/*
// 2. Wrap manually
function mapDispatchToProps(dispatch) {
  return {
    createCourse: (course) => dispatch(courseActions.createCourse(course)),
  }
}*/

// what actions we want to expose to our component!! its optional
// 3. bindActionCreators
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  }
}

/*
// 4. mapDispatchToProps as Object
const mapDispatchToProps = {
  createCourse: courseActions.createCourse,
}
*/

// connect retorna una funcion!
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)

/*
// El mismo resultado que la linea de arriba.. aqui queda mas claro que es una funcion
const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps)
export default connectedStateAndProps(CoursesPage)
*/
