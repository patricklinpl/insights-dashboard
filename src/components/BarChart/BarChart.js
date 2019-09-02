import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory'

function BarChart (props) {
  const { data, chartProp } = props

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <VictoryChart
        style={{ parent: { maxWidth: '70%', margin: '0 auto' } }}
        theme={VictoryTheme.material}
      >
        <VictoryBar
          {...chartProp}
          data={data}
        />
      </VictoryChart>
    </div>
  )
}

BarChart.defaultProp = {
  data: []
}

BarChart.propTypes = {
  chartProp: PropTypes.object,
  data: PropTypes.array
}

export default memo(BarChart)
