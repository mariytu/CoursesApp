import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/*
Every functional component receives props as an argument... So I could choose to destructure props on a separate line within this component ({ courses })

Its equivalent:
const CourseList = (props) => {
  const { courses } = props
  return (
    <table className="table">
      ...
    </table>
  )
}
*/
const CourseList = ({ courses }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {courses.map((course) => {
        return (
          <tr key={course.id}>
            <td>
              {/* If you need to create an anchor for non-router-paths, such as an outside website, then use normal anchor tags as usual. For more information, see the documentation for IndexRoute and Link. */}
              <a
                className="btn btn-light"
                href={'http://pluralsight.com/courses/' + course.slug}
              >
                Watch
              </a>
            </td>
            <td>
              {/* When creating anchors for your routes, you’ll need to use <Link to=""> instead of <a href="">. Don’t worry though, when using the <Link> component, React Router will ultimately give you an ordinary anchor in the DOM. Using <Link> though is necessary for React Router to do some of its routing magic. */}
              <Link to={'/course/' + course.slug}>{course.title}</Link>
            </td>
            <td>{course.authorName}</td>
            <td>{course.category}</td>
          </tr>
        )
      })}
    </tbody>
  </table>
)

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
}

export default CourseList
