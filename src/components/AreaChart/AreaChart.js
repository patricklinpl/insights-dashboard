import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { VictoryArea, VictoryChart, VictoryTheme } from 'victory'

function AreaChart (props) {
  const { data, chartProp } = props

  return (
    <div>
      <VictoryChart theme={VictoryTheme.material} >
        <VictoryArea
          {...chartProp}
          data={data}
        />
      </VictoryChart>
    </div>
  )
}

AreaChart.propTypes = {
  chartProp: PropTypes.object,
  data: PropTypes.array.isRequired
}

export default memo(AreaChart)
