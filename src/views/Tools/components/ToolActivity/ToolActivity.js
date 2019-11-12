import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { isEmpty } from 'ramda'

import GroupChart from './GroupChart'
import getDataProp from './data'
import { ChartCard } from '../../../../components'
import { extractQuery } from '../../../../utils/parser'
import { TABLE } from '../../../../utils/constants'

const GET_TOOL_ACTIVITY = (tool, startDate, endDate) => gql`
{
    ${TABLE}(where: {eventtime: {_gte: "${startDate}", _lte: "${endDate}"}, object_id: {_eq: "${tool}"}}) {
        object_id
        eventtime
        group_coursenumber
    }
}
`

const GroupChartCard = ChartCard(GroupChart)

function ToolActivity (props) {
  const { classes, startDate, endDate, searchValue } = props
  const [chartData, setChartData] = useState({})

  const { loading, error, data } = useQuery(GET_TOOL_ACTIVITY(searchValue, startDate, endDate), { skip: !searchValue })

  useEffect(() => {
    const eventData = getDataProp(extractQuery(TABLE, data))
    if (eventData) {
      setChartData(eventData)
    }
  }, [data])

  return (
    <GroupChartCard
      classes={classes}
      data={chartData}
      error={error}
      loading={loading ? isEmpty(chartData) : loading}
      title='Course Activity'
      sm={false}
      md={false}
      xs={12}
    />
  )
}

ToolActivity.propTypes = {
  classes: PropTypes.object,
  endDate: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired
}

export default ToolActivity
