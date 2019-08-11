import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory'

function BarChart (props) {
  const { input } = props
  const { data, name } = input

  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
      >
        <VictoryBar
          data={data}
          name={name}
        />
      </VictoryChart>
    </div>
  )
}

BarChart.propTypes = {
  input: PropTypes.object
}

export default memo(BarChart)
