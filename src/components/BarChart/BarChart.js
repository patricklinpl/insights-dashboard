import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'

function BarChart (props) {
  const { element } = props
  const chartRef = React.createRef()

  useEffect(() => {
    if (element) {
      const ctx = chartRef.current.getContext('2d')
      const { title, data } = element

      new Chart(ctx, { // eslint-disable-line
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: title,
              data: Object.values(data)
            }
          ]
        },
        options: { }
      })
    }
  }, [element])

  return (
    <div>
      <canvas
        id='myChart'
        ref={chartRef}
      />
    </div>
  )
}

BarChart.propTypes = {
  element: PropTypes.object
}

export default memo(BarChart)
