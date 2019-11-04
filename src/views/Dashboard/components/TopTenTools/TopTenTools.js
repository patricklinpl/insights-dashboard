import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { VictoryChart, VictoryGroup, VictoryLine, VictoryLegend } from 'victory'

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

const getDataProp = data => {
  let toolTable = {}
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
  return toolTable
}

function GroupChart ({ toolTable }) {
  const toolNames = Object.keys(toolTable)
  return (
    <VictoryChart scale={{ x: 'time' }} width={1200}>
      <VictoryLegend x={125} y={50}
        title='Tools'
        gutter={20}
        style={{ border: { stroke: 'black' }, title: { fontSize: 20 } }}
        data={
          toolNames.map(toolName => (
            {
              name: toolName,
              symbol: { fill: toolTable[toolName].color }
            })
          )
        }
      />
      {
        toolNames.map(toolId => (
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
  const eventData = getDataProp(extractQuery(TOP_TOOLS_EVENT_COUNT_TABLE, data))
  const [toolTableData, setToolTableData] = useState({})

  useEffect(() => {
    if (eventData) {
      setToolTableData(eventData)
    }
  }, [loading])

  return (
    <GroupChartCard
      classes={classes}
      error={error}
      loading={Object.keys(toolTableData).length === 0}
      title={'Top 10 tool event activity'}
      sm={false}
      md={false}
      xs={12}
      toolTable={toolTableData}
    />
  )
}

TopTenTools.propTypes = {
  classes: PropTypes.object
}

export default TopTenTools
