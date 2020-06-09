import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { loadCourses, saveCourse } from '../../redux/actions/courseActions'
import { loadAuthors } from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseForm from './CourseForm'
import { newCourse } from '../../../tools/mockData'

/**
 * The function scope takes precedence over the module scope, so our calls to loadCourses and loadAuthor action creators are properly bound
 *
 * Any component loaded via <Route> gets history passed in on props from React Router
 */
function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  /**
   * Avoid using Redux for all state. Use plain React state for data only on few components use (such as form state).
   * To choose Redux vs local state, ask: "Who cares about this data?
   * If only a few closely related components use the data, prefer plain React state.
   * If I have a form with multiple steps, maybe is preferable manage the form in Redux
   */
  const [course, setCourse] = useState({ ...props.course })
  const [errors, setErrors] = useState({})

  /**
   * This replace componentDidMount..
   *
   * useEffect(() => {}) --> this effect rerun every time that the component renders
   * useEffect(() => {}, []) --> The empty array as a second argument to effect means the effect will run once when the component mounts
   *
   * If something changes on that array, useEffect it will perform
   */
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('Loading courses failed' + error)
      })
    } else {
      // This will copy the course passed in on props to state anytime a new course is passed in
      // This is for refresh!
      setCourse({ ...props.course })
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert('Loading authors failed' + error)
      })
    }
  }, [props.course])
  // [props.course] This is for refresh! it's means when course is updated.. rerun the useEffect

  // [name]: this is Javascript computed property syntax. It allows us to reference a property via a variable.
  const handleChange = (event) => {
    const { name, value } = event.target
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }))
  }

  const handleSave = (event) => {
    event.preventDefault()
    saveCourse(course).then(() => {
      // This allows to redirect to courses page
      history.push('/courses')
    })
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  )
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

/**
 * This is a selector. It selects data from the Redux store. You could declare this in the course reducer for easy reuse. For performance you could memoize using reselect.
 * https://redux.js.org/recipes/computing-derived-data
 */
export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null
}

/**
 * With slug and course const we determine if is a new course or if I have to populate the current course before editing
 * https://react-redux.js.org/api/hooks#useselector
 */
function mapStateToProps({ courses, authors }, ownProps) {
  // This works because in App.js we defined a pathg of the type /course/:slug
  const slug = ownProps.match.params.slug
  const course =
    slug && courses.length > 0 ? getCourseBySlug(courses, slug) : newCourse
  return {
    course,
    courses,
    authors,
  }
}

// mapDispatchToProps as an Object
// https://react-redux.js.org/api/hooks#usedispatch
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)
