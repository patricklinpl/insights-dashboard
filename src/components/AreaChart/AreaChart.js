import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { VictoryArea, VictoryChart, VictoryTheme, VictoryTooltip } from 'victory'

function AreaChart (props) {
  const { data, chartProp } = props

  return (
    <div>
      <VictoryChart theme={VictoryTheme.material} >
        <VictoryArea
          labelComponent={<VictoryTooltip />}
          {...chartProp}
          data={data}
        />
      </VictoryChart>
    </div>
  )
}

AreaChart.defaultProp = {
  data: []
}

AreaChart.propTypes = {
  chartProp: PropTypes.object,
  data: PropTypes.array
}

export default memo(AreaChart)
