import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory'

function BarChart (props) {
  const { data, chartProp } = props

  return (
    <div>
      <VictoryChart
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

BarChart.propTypes = {
  input: PropTypes.object
}

export default memo(BarChart)
