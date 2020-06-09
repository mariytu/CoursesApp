import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadCourses, saveCourse } from '../../redux/actions/courseActions'
import { loadAuthors } from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseForm from './CourseForm'
import { newCourse } from '../../../tools/mockData'
import Spinner from '../common/Spinner'
import { toast } from 'react-toastify'

function ManageCoursePage({ history, ...props }) {
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const dispatch = useDispatch()

  const courses = useSelector((state) => state.courses)
  const authors = useSelector((state) => state.authors)

  const slug = props.match.params.slug
  const courseFromStore = useSelector((state) =>
    slug && courses.length > 0 ? getCourseBySlug(courses, slug) : newCourse
  )
  const [course, setCourse] = useState({ ...courseFromStore })

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(loadCourses()).catch((error) => {
        alert('Loading courses failed' + error)
      })
    } else {
      setCourse({ ...courseFromStore })
    }

    if (authors.length === 0) {
      dispatch(loadAuthors()).catch((error) => {
        alert('Loading authors failed' + error)
      })
    }
  }, [courseFromStore])

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
      await dispatch(saveCourse(course))
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
  history: PropTypes.object.isRequired,
}

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null
}

export default ManageCoursePage
