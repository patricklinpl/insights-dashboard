import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import ChartCard from '../../components/ChartCard'
import PieChart from '../../components/PieChart'
import ProfileEvents from '../../services/caliper/profileEvents'
import endpoints from '../../services/caliper/endpoints'
import useFetch from '../../services/caliper/hooks'

const { PROFILE_EVENTS_URL } = endpoints

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

function Rest (props) {
  const classes = useStyles()

  const [pEventsLoaded, pEventsLoadedData] = useFetch({ dataURL: PROFILE_EVENTS_URL })

  const profileEventsData = ProfileEvents.countEventType(pEventsLoadedData)

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <PieChartCard
          classes={classes}
          data={profileEventsData}
          loaded={pEventsLoaded}
          title={'Pie Chart'} />
      </Grid>
    </div>
  )
}

export default Rest
