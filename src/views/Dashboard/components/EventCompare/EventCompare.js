import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { ChartCard, PieChart } from '../../../../components'
import { getAggCount, makeChartProp } from '../../../../utils/parser'
import { AGGREGATE_TABLE, TOOL_LAUNCH_EVENT, TOOL_USE_EVENT } from '../../../../utils/constants'

const GET_TOOL_COUNT = tool => gql`
{
  ${AGGREGATE_TABLE}(where: {type: {_eq: "${tool}"}}) {
    aggregate {
      count
    }
  }
}
`

const PieChartCard = ChartCard(PieChart)

function EventCompare (props) {
  const { classes } = props

  const { loading: launchLoad, error: launchError, data: launchData } = useQuery(GET_TOOL_COUNT(TOOL_LAUNCH_EVENT))
  const { loading: useLoad, error: useError, data: useData } = useQuery(GET_TOOL_COUNT(TOOL_USE_EVENT))

  const error = useError || launchError
  const loading = useLoad || launchLoad

  const eventData = loading ? [] : makeChartProp([
    { toolLaunch: getAggCount(launchData) },
    { toolUse: getAggCount(useData) }
  ])

  return (
    <PieChartCard
      classes={classes}
      data={eventData}
      error={error}
      loading={loading}
      title='Tool use vs tool launch events'
    />
  )
}

EventCompare.propTypes = {
  classes: PropTypes.object
}

export default EventCompare
