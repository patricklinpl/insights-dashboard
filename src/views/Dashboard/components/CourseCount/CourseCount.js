import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import BookIcon from '@material-ui/icons/Book'

import { ContentCard, TextCard } from '../../../../components'
import { getAggCount } from '../../../../utils/parser'
import { AGGREGATE_TABLE } from '../../../../utils/constants'

const GET_UNIQUE_COURSE_COUNT = gql`
{
    ${AGGREGATE_TABLE}(distinct_on: group_coursenumber, where: {group_coursenumber: {_is_null: false}}) {
        aggregate {
            count
        }
    }
}
`

const TextContent = TextCard(BookIcon, ContentCard)

function CourseCount (props) {
  const { loading, error, data } = useQuery(GET_UNIQUE_COURSE_COUNT)

  return (
    <TextContent
      data={getAggCount(data)}
      loading={loading}
      error={error}
      label='Unique Courses'
      {...props}
    />
  )
}

CourseCount.propTypes = {
  classes: PropTypes.object
}

export default CourseCount
