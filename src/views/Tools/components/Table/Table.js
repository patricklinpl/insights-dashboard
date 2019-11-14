import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { isEmpty } from 'ramda'

import { TableCard } from '../../../../components'
import { COURSE, TABLE } from '../../../../utils/constants'
import { extractQuery, getValue } from '../../../../utils/parser'

const GET_COURSES_BY_TOOL = (tool, startDate, endDate) => gql`
{
  ${TABLE}(distinct_on: group_coursenumber, where: {eventtime: {_gte: "${startDate}", _lte: "${endDate}"}, object_id: {_eq: "${tool}"}, group_coursenumber: {_is_null: false}}) {
    group_coursenumber
  }
}
`

function Table (props) {
  const { startDate, endDate, searchValue } = props

  const { loading, error, data } = useQuery(GET_COURSES_BY_TOOL(searchValue, startDate, endDate), { skip: !searchValue })

  const courses = extractQuery(TABLE, data).map(tool => ({
    Courses: getValue(COURSE, tool)
  }))

  return (
    <TableCard
      data={courses}
      error={error}
      label={searchValue ? `Courses using ${searchValue}` : ''}
      loading={loading ? isEmpty(courses) : loading}
    />
  )
}

Table.propTypes = {
  endDate: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired
}

export default Table
