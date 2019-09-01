import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { isEmpty } from 'ramda'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid } from '@material-ui/core'
import { DatePicker, SearchInput, TableCard, usePreviousDate } from '../../components'
import { uniquetools, getCoursesByTool } from './queries'
import { formatDate } from '../../utils/utilities'

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
  }
}))

function Tools () {
  const [searchValue, setSearchValue] = useState('')
  const [startDate, setStartDate] = useState(new Date('2018-08-02'))
  const [endDate, setEndDate] = useState(new Date())

  const prevStartDate = usePreviousDate(startDate)
  const prevEndDate = usePreviousDate(endDate)

  const classes = useStyles()

  const { loading: searchLoad, error: searchError, data: searchData } = useQuery(gql`${uniquetools}`)

  const suggestions = searchLoad ? [] : searchData['event_toollaunch'].map(suggestion => ({
    label: suggestion.object_id
  }))

  const { loading, error, data } = useQuery(gql`${getCoursesByTool(searchValue, formatDate(prevStartDate, startDate), formatDate(prevEndDate, endDate))}`)

  const waiting = loading && isEmpty(data)

  const tools = waiting ? [] : data['event_toollaunch'].map(tool => ({
    Tool: tool.membership_coursenumber
  }))

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.inner}>

          <Grid container className={classes.container}>
            <Grid item xs={12} sm={6}>
              <SearchInput
                error={searchError}
                label='Tool'
                loading={searchLoad}
                setSearchValue={setSearchValue}
                suggestions={suggestions}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <DatePicker state={{ date: [startDate, setStartDate], label: 'Start Date' }} />
            </Grid>
            <Grid item xs={12} sm={3} >
              <DatePicker state={{ date: [endDate, setEndDate], label: 'End Date' }} />
            </Grid>
          </Grid>

          <div className={classes.divider} />

          <TableCard
            data={tools}
            error={error}
            label={searchValue ? `Courses using ${searchValue}` : ''}
            loading={waiting}
          />

        </div>
      </Card>
    </div>
  )
}

export default Tools
