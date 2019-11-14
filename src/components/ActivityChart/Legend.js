import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { VictoryLegend } from 'victory'

const getData = (colors, elements) => (
  Object.keys(elements).map((element, i) => (
    {
      name: element,
      symbol: {
        fill: colors[i]
      }
    }
  ))
)

function Legend (props) {
  const { colors, elements, title } = props
  return (
    <VictoryLegend
      title={title}
      centerTitle
      gutter={20}
      data={getData(colors, elements)}
    />
  )
}

Legend.defaultProp = {
  colors: [],
  elements: {},
  title: ''
}

Legend.propTypes = {
  colors: PropTypes.array.isRequired,
  elements: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}

export default memo(Legend)
