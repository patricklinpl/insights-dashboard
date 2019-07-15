import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'

function BarChart () {
  const [error] = useState(null)
  const [items] = useState([])

  const chartRef = React.createRef()

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d')
    new Chart(ctx, {
      type: 'line',
      data: {
        // Bring in data
        labels: ['Jan', 'Feb', 'March'],
        datasets: [
          {
            label: 'Sales',
            data: [86, 67, 91]
          }
        ]
      },
      options: {
        // Customize chart options
      }
    })
  })

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

}

export default BarChart
