import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { VictoryLine } from 'victory'

import { extractQuery } from '../../../../utils/parser'
import { TOP_TOOLS_EVENT_COUNT_TABLE } from '../../../../utils/constants'

const GET_TOTAL_TOOL_USAGE = gql`
{
  ${}
}
`

function TotalToolUsage (props) {
  const { classes } = props

  const { loading, error, data } = useQuery(GET_TOOL_EVENT_COUNT)
}

TotalToolUsage.PropTypes = {
  classes: PropTypes.object
}

export default TotalToolUsage
