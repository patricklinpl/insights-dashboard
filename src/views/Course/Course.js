import React, { useEffect, useState, useRef } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { isEmpty } from 'ramda'
import { format } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid } from '@material-ui/core'
import { DatePicker, SearchInput, TableCard } from '../../components'
import { formatDate } from '../../utils/utilities'
import { getAllCourses, getToolsByCourse } from './queries'

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

function usePrevious (date) {
  const ref = useRef()
  useEffect(() => {
    try {
      format(date, 'yyyy-MM-dd')
      ref.current = date
    } catch (error) { }
  })
  return ref.current
}

function Course () {
  const [searchValue, setSearchValue] = useState('')
  const [startDate, setStartDate] = useState(new Date('2018-08-02'))
  const [endDate, setEndDate] = useState(new Date())

  const prevStartDate = usePrevious(startDate)
  const prevEndDate = usePrevious(endDate)

  const classes = useStyles()

  const { loading: searchLoad, error: searchError, data: searchData } = useQuery(gql`${getAllCourses}`)

  const suggestions = searchLoad ? [] : searchData['event_toollaunch'].map(suggestion => ({
    label: suggestion.membership_coursenumber
  }))

  const { loading, error, data } = useQuery(gql`${getToolsByCourse(searchValue, formatDate(prevStartDate, startDate), formatDate(prevEndDate, endDate))}`)

  const waiting = loading && isEmpty(data)

  const tools = waiting ? [] : data['event_toollaunch'].map(tool => ({
    Tool: tool.object_id
  }))

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
            label={'Course Tools'}
            loading={waiting}
          />

        </div>
      </Card>
    </div>
  )
}

export default Course
