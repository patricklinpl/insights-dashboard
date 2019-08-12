import React from 'react'
import ErrorIcon from '@material-ui/icons/Error'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  text: {
    color: theme.palette.error.main
  }
}))

function Error () {
  const classes = useStyles()

  return (
    <div>
      <Typography variant='h3' className={classes.text}>
        <ErrorIcon /> {' '}
        Something Went Wrong!
      </Typography>
    </div>
  )
}

export default Error
