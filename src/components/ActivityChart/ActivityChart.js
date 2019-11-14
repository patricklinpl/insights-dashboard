import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'ramda'
import { Grid } from '@material-ui/core'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack } from 'victory'

import Legend from './Legend'

function ActivityChart (props) {
  const { data } = props

  if (isEmpty(data)) {
    return (<div />)
  }

  const { chartNumber, chartPercent, elements, colors, title, totals, usePercent } = data

  const chartProp = usePercent ? chartPercent : chartNumber

  return (
    <Grid container spacing={0}>
      <Grid item xs={9}>
        <VictoryChart height={450} width={1000} domainPadding={{ x: 75 }}>
          <VictoryStack colorScale={colors}>
            {
              chartProp.map((element, i) => <VictoryBar key={i} data={element} />)
            }
          </VictoryStack>
          <VictoryAxis dependentAxis tickFormat={(tick) => usePercent ? `${tick}%` : tick} />
          <VictoryAxis tickFormat={Object.keys(totals).sort()} />
        </VictoryChart>
      </Grid>
      <Grid item xs={3}>
        <Legend colors={colors} elements={elements} title={title} />
      </Grid>
    </Grid>
  )
}

ActivityChart.defaultProp = {
  data: {}
}

ActivityChart.propTypes = {
  data: PropTypes.shape({
    chartNumber: PropTypes.array,
    chartPercent: PropTypes.array,
    elements: PropTypes.object,
    colors: PropTypes.array,
    title: PropTypes.string,
    totals: PropTypes.object,
    usePercent: PropTypes.bool
  }).isRequired
}

export default ActivityChart
