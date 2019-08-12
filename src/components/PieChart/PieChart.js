import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { VictoryPie, VictoryTheme } from 'victory'

function PieChart (props) {
  const { data, chartProp } = props

  return (
    <VictoryPie
      {...chartProp}
      data={data}
      padding={70}
      theme={VictoryTheme.material}
      style={{ labels: { fill: 'black', fontSize: 10, fontWeight: 'bold' } }}
    />
  )
}

PieChart.propTypes = {
  chartProp: PropTypes.object,
  data: PropTypes.array.isRequired
}

export default memo(PieChart)
