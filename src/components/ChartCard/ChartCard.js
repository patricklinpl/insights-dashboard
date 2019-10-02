import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Paper, Typography } from '@material-ui/core'
import { Error, Spinner } from '../../components'

const ChartCard = ChartComponent => props => {
  const {
    classes,
    error,
    loading,
    title,
    xs = 12,
    sm = 6,
    md = 4
  } = props

  return (
    <Grid item xs={xs} sm={sm} md={md}>
      <Paper className={classes.paper}>
        {props.children}
        <Grid item xs={xs}>
          <Typography gutterBottom variant='h6'>{title}</Typography>
          {error ? (
            <Error />
          ) : loading ? (
            <Spinner />
          ) : (
            <ChartComponent {...props} />
          )}
        </Grid>
      </Paper>
    </Grid>
  )
}

ChartCard.defaultProp = {
  loading: true,
  title: ''
}

ChartCard.propTypes = {
  classes: PropTypes.object,
  error: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string,
  md: PropTypes.number,
  sm: PropTypes.number,
  xs: PropTypes.number
}

export default ChartCard
