import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Grid } from '@material-ui/core'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryLegend } from 'victory'
import { isEmpty, sortBy, prop } from 'ramda'

import { ChartCard } from '../../../../components'
import { extractQuery } from '../../../../utils/parser'
import { TABLE } from '../../../../utils/constants'
import { getRandomColor } from '../../../../utils/utilities'

const GET_TOOL_ACTIVITY = (tool, startDate, endDate) => gql`
{
    ${TABLE}(where: {eventtime: {_gte: "${startDate}", _lte: "${endDate}"}, object_id: {_eq: "${tool}"}}) {
        object_id
        eventtime
        group_coursenumber
    }
}
`

const groupByMonth = data => {
  const dataStore = {
    chartNumber: [],
    chartPercent: [],
    colors: [],
    courses: {},
    totals: {}
  }

  const { chartNumber, colors, courses, totals } = dataStore

  data.forEach(event => {
    const { eventtime, group_coursenumber } = event // eslint-disable-line camelcase
    const date = new Date(eventtime)
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}`

    totals[dateKey] ? totals[dateKey]++ : totals[dateKey] = 1

    if (!courses[group_coursenumber]) {
      courses[group_coursenumber] = {}
      chartNumber[group_coursenumber] = []
      colors.push(getRandomColor())
    }

    if (courses[group_coursenumber][dateKey]) {
      courses[group_coursenumber][dateKey].y++
    } else {
      courses[group_coursenumber][dateKey] = {
        x: dateKey,
        y: 1
      }
    }
  })

  return normalizeDateRanges(dataStore)
}

const normalizeDateRanges = dataStore => {
  const { courses, totals } = dataStore

  const sortByDate = sortBy(prop('x'))

  Object.keys(courses).forEach(course => {
    Object.keys(totals).forEach(date => {
      if (!courses[course][date]) {
        courses[course][date] = {
          x: date,
          y: 0
        }
      }
    })
    dataStore.chartNumber.push(sortByDate(Object.values(courses[course])))
  })

  return Object.keys(courses).length >= 3 ? calculatePercentage(dataStore) : dataStore
}

const calculatePercentage = dataStore => {
  const sortByDate = sortBy(prop('x'))

  const { totals } = dataStore

  dataStore.chartPercent = sortByDate(
    dataStore.chartNumber.map(course => (
      course.map(data => (
        {
          x: data.x,
          y: Math.round((data.y / totals[data.x]) * 100)
        }
      ))
    ))
  )

  return dataStore
}

const getDataProp = data => {
  if (!isEmpty(data)) {
    return groupByMonth(data)
  }
}

function GroupChart (props) {
  const { data } = props

  if (isEmpty(data)) {
    return (<div />)
  }

  const { chartNumber, chartPercent, courses, colors, totals } = data

  const usePercent = Object.keys(courses).length >= 3
  const chartProp = usePercent ? chartPercent : chartNumber

  return (
    <Grid container spacing={0}>
      <Grid item xs={9}>
        <VictoryChart height={400} width={1200} domainPadding={{ x: 100, y: 20 }}>
          <VictoryStack colorScale={colors}>
            {
              chartProp.map((course, i) => <VictoryBar key={i} data={course} />)
            }
          </VictoryStack>
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => usePercent ? `${tick}%` : tick}
          />
          <VictoryAxis
            tickFormat={Object.keys(totals).sort()}
          />
        </VictoryChart>
      </Grid>
      <Grid item xs={3}>
        <Legend courses={courses} colors={colors} />
      </Grid>
    </Grid>
  )
}

function Legend ({ courses, colors }) {
  const keys = Object.keys(courses)
  return (
    <VictoryLegend
      title='Courses'
      centerTitle
      gutter={20}
      data={
        keys.map((course, i) => (
          {
            name: course,
            symbol: { fill: colors[i] }
          }
        ))
      }
    />
  )
}

const GroupChartCard = ChartCard(GroupChart)

function ToolActivity (props) {
  const { classes, startDate, endDate, searchValue } = props
  const [graphData, setGraphData] = useState({})

  const { loading, error, data } = useQuery(GET_TOOL_ACTIVITY(searchValue, startDate, endDate))

  useEffect(() => {
    const eventData = getDataProp(extractQuery(TABLE, data))
    if (eventData) {
      setGraphData(eventData)
    }
  }, [data])

  return (
    <GroupChartCard
      classes={classes}
      data={graphData}
      error={error}
      loading={loading ? isEmpty(graphData) : loading}
      title='Course Activity'
      sm={false}
      md={false}
      xs={12}
    />
  )
}

ToolActivity.propTypes = {
  classes: PropTypes.object
}

export default ToolActivity
