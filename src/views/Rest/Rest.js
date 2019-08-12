import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { ChartCard, PieChart } from '../../components'
import ProfileEvents from '../../services/caliper/parsers/profileEvents'
import endpoints from '../../services/caliper/endpoints'
import useFetch from '../../services/hooks'

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

function Rest () {
  const classes = useStyles()

  const { PROFILE_EVENTS_URL } = endpoints
  const [loaded, data] = useFetch(PROFILE_EVENTS_URL)

  const profileEventsData = ProfileEvents.countEventType(data)

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <PieChartCard
          classes={classes}
          data={profileEventsData}
          loaded={loaded}
          title={'Profile Event Types'} />
      </Grid>
    </div>
  )
}

export default Rest
