import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { ChartCard, PieChart } from '../../components'
import ProfileEvents from '../../services/caliper/parsers/profileEvents'
import endpoints from '../../services/caliper/endpoints'
import useFetch from '../../services/hooks'
import { getAggCount } from '../../services/caliper/parsers/aggregation'
import { eventTypeCountQuery } from './queries'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  }
}))

const PieChartCard = ChartCard(PieChart)

function Dashboard () {
  const classes = useStyles()

  const { PROFILE_EVENTS_URL } = endpoints
  const [ data, error, loading ] = useFetch(PROFILE_EVENTS_URL)
  const profileEventsData = ProfileEvents.countEventType(data)

  const { loading: eventLoading, error: eventError, data: eventData } = useQuery(gql`${eventTypeCountQuery}`)
  const eventTypeData = getAggCount(eventData)

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <PieChartCard
          classes={classes}
          data={eventTypeData}
          error={eventError}
          loaded={eventLoading}
          title={'# of tool use vs launch events'} />

        <PieChartCard
          classes={classes}
          data={profileEventsData}
          error={error}
          loading={loading}
          title={'Profile Event Types'} />
      </Grid>
    </div>
  )
}

export default Dashboard
