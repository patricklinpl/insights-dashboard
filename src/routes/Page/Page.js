import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ChartCard from '../../components/ChartCard'
import PieChart from '../../components/PieChart'
import ProfileEvents from '../../services/caliper/profileEvents'
import endpoints from '../../services/caliper/endpoints'
import useFetch from '../../services/caliper/hooks'

const { PROFILE_EVENTS_URL } = endpoints

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 8
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  }
})

const PieChartCard = ChartCard(PieChart)

function Page (props) {
  const { classes } = props

  const [pEventsLoaded, pEventsLoadedData] = useFetch({ dataURL: PROFILE_EVENTS_URL })

  const profileEventsData = ProfileEvents.countEventType(pEventsLoadedData)

  return (
    <div className='App'>
      <PieChartCard
        classes={classes}
        data={profileEventsData}
        loaded={pEventsLoaded}
        title={'Pie Chart'} />
    </div>
  )
}

export default withStyles(styles)(Page)
