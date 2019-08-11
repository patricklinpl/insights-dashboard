import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { Typography, Link } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}))

function Footer (props) {
  const { className, ...rest } = props

  const classes = useStyles()

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant='body1'>
        &copy;{' '} 2019 {' '}
        <Link
          component='a'
          href='https://learninganalytics.ubc.ca/'
          target='_blank'
        >
          UBC’s Learning Analytics Project
        </Link>
      </Typography>
    </div>
  )
}

Footer.propTypes = {
  className: PropTypes.string
}

export default Footer
