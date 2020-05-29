import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import CourseList from './CourseList'

class CoursesPage extends Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props //destructuring

    // Con esta validacion solo llamamos una vez a la API para obtener los cursos.. se pasa por este metodo cada vez que se navega hasta esta pagina
    if (courses.length === 0) {
      // Let's call our API to get a list of courses. We'll load the courses by dispatching and action via Redux.
      actions.loadCourses().catch((error) => {
        alert('Loading courses failed' + error)
      })
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert('Loading authors failed' + error)
      })
    }
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        {/*
          Esto teniamos antes
            {this.props.courses.map((course) => (
              <div key={course.title}>{course.title}</div>
            ))}

          y lo vamos a cambiar por el nuevo Presentation Component
            <CourseList courses={this.props.courses} />
        */}
        <CourseList courses={this.props.courses} />
      </>
    )
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0 // Con esto checamos que los autores esten cargados antes de buscar el nombre del autor
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name, // Add a new property to Course Object
            }
          }),
    authors: state.authors,
  }
}

// bindActionCreators to dispatch actions
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
