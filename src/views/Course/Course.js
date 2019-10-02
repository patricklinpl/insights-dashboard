import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { isEmpty } from 'ramda'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid } from '@material-ui/core'

import { DatePicker, SearchInput, TableCard } from '../../components'
import { usePreviousDate } from '../../hooks'
import { COURSE, TABLE, TOOL } from '../../utils/constants'
import { extractQuery, getValue } from '../../utils/parser'
import { formatDate, aggregateToolUsageCount } from '../../utils/utilities'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  container: {
    alignItems: 'center',
    justify: 'center',
    padding: theme.spacing(3),
    spacing: 3
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
  },
  datePicker: {
    float: 'right'
  }
}))

const GET_ALL_COURSES = gql`
{
  ${TABLE}(distinct_on: group_coursenumber, where: {group_coursenumber: {_is_null: false}}) {
    group_coursenumber
  }
}
`

const GET_TOOLS_BY_COURSE = (courseId, startDate, endDate) => gql`
{
  ${TABLE}(where: {group_coursenumber: {_eq: "${courseId}", _is_null: false}, eventtime: {_gte: "${startDate}", _lte: "${endDate}"}}) {
    object_id
  }
}
`

function Course () {
  const [searchValue, setSearchValue] = useState('')
  const [startDate, setStartDate] = useState(new Date('2018-08-02'))
  const [endDate, setEndDate] = useState(new Date())

  const classes = useStyles()

  const startDateResolver = formatDate(usePreviousDate(startDate), startDate)
  const endDateResolver = formatDate(usePreviousDate(endDate), endDate)

  const { loading: searchLoad, error: searchError, data: searchData } = useQuery(GET_ALL_COURSES)
  const { loading, error, data } = useQuery(GET_TOOLS_BY_COURSE(searchValue, startDateResolver, endDateResolver), { skip: !searchValue })

  const suggestions = extractQuery(TABLE, searchData).map(suggestion => ({
    label: getValue(COURSE, suggestion)
  }))

  const tools = aggregateToolUsageCount(extractQuery(TABLE, data).map(tool => ({
    Tool: getValue(TOOL, tool)
  })))

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.inner}>

          <Grid container className={classes.container}>
            <Grid item xs={12} sm={6}>
              <SearchInput
                error={searchError}
                label='Course'
                loading={searchLoad}
                setSearchValue={setSearchValue}
                suggestions={suggestions}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <DatePicker
                className={classes.datePicker}
                state={{ date: [startDate, setStartDate], label: 'Start Date' }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <DatePicker
                className={classes.datePicker}
                state={{ date: [endDate, setEndDate], label: 'End Date' }}
              />
            </Grid>
          </Grid>

          <div className={classes.divider} />

          <TableCard
            data={tools}
            error={error}
            headers={searchValue ? [`Tools being used by ${searchValue}`, 'Count'] : ['Tools', 'Count']}
            loading={loading ? isEmpty(tools) : loading}
          />

        </div>
      </Card>
    </div>
  )
}

export default Course
