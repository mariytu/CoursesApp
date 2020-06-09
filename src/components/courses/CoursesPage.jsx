import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { loadCourses } from '../../redux/actions/courseActions'
import { loadAuthors } from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseList from './CourseList'
import { Redirect } from 'react-router-dom'

function CoursesPage({ courses, authors, loadCourses, loadAuthors }) {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false)

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('Loading courses failed' + error)
      })
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert('Loading authors failed' + error)
      })
    }
  }, [])

  return (
    <>
      {redirectToAddCoursePage && <Redirect to="/course" />}
      <h2>Courses</h2>

      <button
        style={{ marginBottom: 20 }}
        className="btn btn-primary add-course"
        onClick={() => setRedirectToAddCoursePage(true)}
      >
        Add Course
      </button>

      <CourseList courses={courses} />
    </>
  )
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
}

function mapStateToProps({ authors, courses }) {
  return {
    courses:
      authors.length === 0
        ? []
        : courses.map((course) => {
            return {
              ...course,
              authorName: authors.find((a) => a.id === course.authorId).name,
            }
          }),
    authors,
  }
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
