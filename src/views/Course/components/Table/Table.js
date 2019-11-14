import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { isEmpty } from 'ramda'

import { TableCard } from '../../../../components'
import { TOOL, TABLE } from '../../../../utils/constants'
import { aggregateToolUsageCount } from '../../../../utils/utilities'
import { extractQuery, getValue } from '../../../../utils/parser'

const GET_TOOLS_BY_COURSE = (courseId, startDate, endDate) => gql`
{
  ${TABLE}(where: {group_coursenumber: {_eq: "${courseId}", _is_null: false}, eventtime: {_gte: "${startDate}", _lte: "${endDate}"}}) {
    object_id
  }
}
`

function Table (props) {
  const { startDate, endDate, searchValue } = props

  const { loading, error, data } = useQuery(GET_TOOLS_BY_COURSE(searchValue, startDate, endDate), { skip: !searchValue })

  const tools = aggregateToolUsageCount(extractQuery(TABLE, data).map(tool => ({
    Tool: getValue(TOOL, tool)
  })))

  return (
    <TableCard
      data={tools}
      error={error}
      headers={searchValue ? [`Tools being used by ${searchValue}`, 'Count'] : ['Tools', 'Count']}
      loading={loading ? isEmpty(tools) : loading}
    />
  )
}

Table.propTypes = {
  endDate: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired
}

export default Table
