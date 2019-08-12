import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}))

function Course () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <div className='spinner' />
      </Grid>
    </div>
  )
}

export default Course
