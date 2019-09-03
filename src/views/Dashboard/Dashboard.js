import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

import {
  CourseCount,
  EventCompare,
  ToolCount,
  TopTenTools
} from './components'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  }
}))

function Dashboard () {
  const classes = useStyles()

  return (
    <div className={classes.root}>

      <Grid container spacing={4}>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <ToolCount />
        </Grid>

        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <CourseCount />
        </Grid>

      </Grid>

      <Grid container spacing={4}>

        <TopTenTools classes={classes} />

        <EventCompare classes={classes} />

      </Grid>
    </div>
  )
}

export default Dashboard
