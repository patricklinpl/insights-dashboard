import React from 'react'
import PropTypes from 'prop-types'
import { VictoryLegend } from 'victory'

function Legend (props) {
  const { colors, courses } = props
  const courseData = Object.keys(courses).map((course, i) => (
    {
      name: course,
      symbol: { fill: colors[i] }
    }
  ))
  return (
    <VictoryLegend
      title='Courses'
      centerTitle
      gutter={20}
      data={courseData}
    />
  )
}

Legend.propTypes = {
  colors: PropTypes.array.isRequired,
  courses: PropTypes.object.isRequired
}

export default Legend
