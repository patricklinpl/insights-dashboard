import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { isEmpty } from 'ramda'
import queryString from 'query-string'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

import { TABLE } from '../../utils/constants'
import { TableCard } from '../../components'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(8)
  },
  divider: {
    height: theme.spacing(2)
  }
}))

const GET_TYPE_VIEW = (type, value) => gql`
{
  ${TABLE}(where: {${type === 'Courses' ? 'group_coursenumber' : 'object_id'}: {_eq: "${value}"}}) {
    eventtime
    ${type === 'Courses' ? 'object_id' : 'group_coursenumber'}
    action
    actor_id
    actor_type
    context
    edapp_type
    type
  }
}
`

function Results (props) {
  const classes = useStyles()

  const { location } = props
  const { type, searchValue } = queryString.parse(location.search)

  const { loading, error, data } = useQuery(GET_TYPE_VIEW(type, searchValue))

  const content = data ? data.raw_events : []

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.inner}>
          <div>
            <Typography variant='h1' color='inherit'>Results for: {searchValue}</Typography>
          </div>
          <div className={classes.divider} />
          <TableCard
            data={content}
            error={error}
            headers={['Event Time', 'Type', 'Action', 'Actor ID', 'Actor Type', 'Context', 'Edapp Type', 'Type', 'Table']}
            loading={loading ? isEmpty(content) : loading}
            paginate
          />
        </div>
      </Card>
    </div>
  )
}

Results.propTypes = {
  location: PropTypes.object.isRequired
}

export default memo(Results)
