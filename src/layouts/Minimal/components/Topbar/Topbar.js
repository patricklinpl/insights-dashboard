import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  },
  homeButton: {
    textDecoration: 'none',
    color: 'white'
  }
}))

function Topbar (props) {
  const { className, ...rest } = props

  const classes = useStyles()

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color='primary'
      position='fixed'
    >
      <Toolbar>
        <Typography variant='h3' color='inherit' className={classes.grow}>
          <RouterLink to='/' className={classes.homeButton}>Insights Dashboard</RouterLink>
        </Typography>
      </Toolbar>
    </AppBar>
  )
};

Topbar.propTypes = {
  className: PropTypes.string
}

export default Topbar
