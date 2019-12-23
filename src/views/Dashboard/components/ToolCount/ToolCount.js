import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import BuildIcon from '@material-ui/icons/Build'

import { ContentCard, TextCard } from '../../../../components'
import { getAggCount } from '../../../../utils/parser'
import { AGGREGATE_TABLE } from '../../../../utils/constants'

const GET_UNIQUE_TOOL_COUNT = gql`
{
  ${AGGREGATE_TABLE}(distinct_on: object_id, where: {object_id: {_is_null: false}}) {
    aggregate {
      count
    }
  }
}
`

const TextContent = TextCard(BuildIcon, ContentCard)

function ToolCount (props) {
  const { loading, error, data } = useQuery(GET_UNIQUE_TOOL_COUNT)

  return (
    <TextContent
      data={getAggCount(data)}
      loading={loading}
      error={error}
      label='Unique Tools'
      {...props}
    />
  )
}

export default ToolCount
