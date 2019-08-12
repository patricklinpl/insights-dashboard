import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { ChartCard, PieChart } from '../../components'
import { getAggCount } from '../../services/caliper/parsers/aggregation'
import { eventTypeCountQuery } from '../../services/caliper/query'

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

function Graph () {
  const classes = useStyles()

  const { loading, error, data } = useQuery(gql`${eventTypeCountQuery}`)
  if (error) {
    console.log(error)
  }

  const eventTypeData = getAggCount(data)

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <PieChartCard
          classes={classes}
          data={eventTypeData}
          loaded={!loading}
          title={'# of tool use vs launch events'} />
      </Grid>
    </div>
  )
}

export default Graph
