import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { VictoryBar, VictoryTheme, VictoryGroup } from 'victory'

function BarChartNoAxes (props) {
  const { data, chartProp, chartContainerProp } = props
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <VictoryGroup
        {...chartContainerProp}
        style={{ parent: { maxWidth: '70%', margin: '0 auto' } }}
        theme={VictoryTheme.material}
      >
        <VictoryBar
          {...chartProp}
          data={data}
          style={{ data: {
            fill: (d) => d.fill
          }}}
        />
      </VictoryGroup>
    </div>
  )
}

BarChartNoAxes.defaultProp = {
  data: []
}

BarChartNoAxes.propTypes = {
  chartProp: PropTypes.object,
  data: PropTypes.array
}

export default memo(BarChartNoAxes)
