import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Error, Spinner } from '../../components'

const ChartCard = ChartComponent => props => {
  const {
    classes,
    loaded,
    data,
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
          {loaded ? (data ? <ChartComponent {...props} /> : <Error />) : <Spinner />}
        </Grid>
      </Paper>
    </Grid>
  )
}

ChartCard.propTypes = {
  classes: PropTypes.object,
  loaded: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number
}

export default ChartCard
