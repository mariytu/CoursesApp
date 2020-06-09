import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { loadCourses, saveCourse } from '../../redux/actions/courseActions'
import { loadAuthors } from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseForm from './CourseForm'
import { newCourse } from '../../../tools/mockData'
import Spinner from '../common/Spinner'
import { toast } from 'react-toastify'

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('Loading courses failed' + error)
      })
    } else {
      setCourse({ ...props.course })
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert('Loading authors failed' + error)
      })
    }
  }, [props.course])

  const handleChange = (event) => {
    const { name, value } = event.target
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }))
  }

  // Client-Side validation
  const formIsValid = () => {
    const { title, authorId, category } = course
    const errors = {}

    if (!title) errors.title = 'Title is required.'
    if (!authorId) errors.author = 'Author is required'
    if (!category) errors.category = 'Category is required'

    setErrors(errors)
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0
  }

  const handleSave = async (event) => {
    event.preventDefault()
    if (!formIsValid()) return

    setSaving(true)
    try {
      await saveCourse(course)
      toast.success('Course saved.')
      history.push('/courses')
    } catch (error) {
      setSaving(false)
      setErrors({ onSave: error.message }) // Server-Side errors
    }
    /*saveCourse(course)
      .then(() => {
        toast.success('Course saved.')
        history.push('/courses')
      })
      .catch((error) => {
        setSaving(false)
        setErrors({ onSave: error.message }) // Server-Side errors
      })*/
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
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

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null
}

function mapStateToProps({ courses, authors }, ownProps) {
  const slug = ownProps.match.params.slug
  const course =
    slug && courses.length > 0 ? getCourseBySlug(courses, slug) : newCourse
  return {
    course,
    courses,
    authors,
  }
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)
