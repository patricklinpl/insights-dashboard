import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { VictoryChart, VictoryGroup, VictoryLine } from 'victory'

import { ChartCard } from '../../../../components'
import { extractQuery } from '../../../../utils/parser'
import { TOP_TOOLS_EVENT_COUNT_TABLE } from '../../../../utils/constants'

const GET_TOOL_EVENT_COUNT = gql`
{
  ${TOP_TOOLS_EVENT_COUNT_TABLE}(where: {date: {_gt: "2019-01-01"}}) {
    count
    date
    object_id
  }
}
`

const getRandomColor = () => `#${Math.floor(Math.random() * 16777216).toString(16)}`

let toolTable = {}

const getDataProp = data => {
  if (data.length > 0) {
    data.forEach(event => {
      const { date, object_id: objectId, count } = event

      const chartProp = {
        x: new Date(date),
        y: count
      }

      if (!toolTable[objectId]) {
        toolTable[objectId] = { data: [], color: getRandomColor() }
      }

      toolTable[objectId]['data'].push(chartProp)
    })
  }
}

function GroupChart () {
  return (
    <VictoryChart scale={{ x: 'time' }} width={1200}>
      {
        Object.keys(toolTable).map(toolId => (
          <VictoryGroup
            color={toolTable[toolId]['color']}
            key={toolId}
            data={toolTable[toolId]['data']}
          >
            <VictoryLine />
          </VictoryGroup>
        ))
      }
    </VictoryChart>
  )
}

const GroupChartCard = ChartCard(GroupChart)

function TopTenTools (props) {
  const { classes } = props

  const { loading, error, data } = useQuery(GET_TOOL_EVENT_COUNT)
  const eventData = extractQuery(TOP_TOOLS_EVENT_COUNT_TABLE, data)

  getDataProp(eventData)

  return (
    <GroupChartCard
      classes={classes}
      error={error}
      loading={loading}
      title={'Top Tool"s Event Activity 2019'}
      sm={false}
      md={false}
      xs={12}
    />
  )
}

TopTenTools.propTypes = {
  classes: PropTypes.object
}

export default TopTenTools
