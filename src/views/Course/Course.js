import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Card } from '@material-ui/core'

import { ChartCard, AreaChart } from '../../components'
import { parseToolUse } from '../../services/caliper/parsers/aggregation'
import { uniqueCourseToolUsage } from '../../services/caliper/query'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(8)
  },
  inner: {
    minWidth: 1050
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  }
}))

const BarChartCard = ChartCard(AreaChart)

function Course () {
  const classes = useStyles()

  const { loading, error, data } = useQuery(gql`${uniqueCourseToolUsage}`)
  if (error) {
    console.log(error)
  }

  const toolUseData = parseToolUse(data)
  console.log(toolUseData)

  const toolUseProp = {
    interpolation:'natural',
    y: 'count'
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.inner}>
          <BarChartCard
            classes={classes}
            data={toolUseData}
            chartProp={
              toolUseProp
            }
            md={6}
            sm={4}
            loaded={!loading}
            title={'In how many unique courses is X tool being used?'} />
        </div>
      </Card>
    </div>
  )
}

export default Course
