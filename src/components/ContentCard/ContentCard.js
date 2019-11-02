import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import {
  CardContent,
  Grid,
  Typography,
  Avatar
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}))

function ContentCard (props) {
  const { Icon, data, label } = props

  const classes = useStyles()

  return (
    <CardContent>
      <Grid
        container
        justify='space-between'
      >
        <Grid item>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
            variant='body2'
          >
            {label}
          </Typography>
          <Typography variant='h3'>{data}</Typography>
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>
            <Icon className={classes.icon} />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  )
}

ContentCard.defaultProp = {
  data: 0,
  label: ''
}

ContentCard.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  label: PropTypes.string
}

export default memo(ContentCard)
