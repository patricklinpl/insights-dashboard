import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { makeStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'

import { Activity } from './components'
import { SearchWithDate } from '../../components'
import { TABLE, TOOL } from '../../utils/constants'
import { usePreviousDate } from '../../hooks'
import { extractQuery, getValue } from '../../utils/parser'
import { formatDate } from '../../utils/utilities'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(8)
  },
  paper: {
    color: theme.palette.text.secondary,
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  divider: {
    height: theme.spacing(2)
  }
}))

const GET_ALL_TOOLS = gql`
{
  ${TABLE}(distinct_on: object_id, where: {object_id: {_is_null: false}}) {
    object_id
  }
}
`

function Tools () {
  const [searchValue, setSearchValue] = useState('')
  const [startDate, setStartDate] = useState(new Date('2018-08-02'))
  const [endDate, setEndDate] = useState(new Date())

  const classes = useStyles()

  const startDateResolver = formatDate(usePreviousDate(startDate), startDate)
  const endDateResolver = formatDate(usePreviousDate(endDate), endDate)

  const { loading, error, data } = useQuery(GET_ALL_TOOLS)

  const suggestions = extractQuery(TABLE, data).map(suggestion => ({
    label: getValue(TOOL, suggestion)
  }))

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.inner}>

          <SearchWithDate
            endDate={endDate}
            searchError={error}
            searchLoad={loading}
            setEndDate={setEndDate}
            setSearchValue={setSearchValue}
            setStartDate={setStartDate}
            startDate={startDate}
            suggestions={suggestions}
          />

          <div className={classes.divider} />

          <Activity
            classes={classes}
            startDate={startDateResolver}
            endDate={endDateResolver}
            searchValue={searchValue}
          />

        </div>
      </Card>
    </div>
  )
}

export default Tools
