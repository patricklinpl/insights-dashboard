import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'ramda'
import { Grid } from '@material-ui/core'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack } from 'victory'

import Legend from './Legend'

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
          <VictoryAxis dependentAxis tickFormat={(tick) => usePercent ? `${tick}%` : tick} />
          <VictoryAxis tickFormat={Object.keys(totals).sort()} />
        </VictoryChart>
      </Grid>
      <Grid item xs={3}>
        <Legend courses={courses} colors={colors} />
      </Grid>
    </Grid>
  )
}

GroupChart.propTypes = {
  data: PropTypes.shape({
    chartNumber: PropTypes.array,
    chartPercent: PropTypes.array,
    courses: PropTypes.object,
    colors: PropTypes.array,
    totals: PropTypes.object
  }).isRequired
}

export default GroupChart
