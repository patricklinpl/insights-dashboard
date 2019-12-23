import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Drawer } from '@material-ui/core'
import {
  Book as BookIcon,
  Build as BuildIcon,
  Dashboard as DashboardIcon,
  DataUsage as DataUsageIcon,
  Search as SearchIcon
} from '@material-ui/icons'

import { SidebarNav } from './components'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}))

function Sidebar (props) {
  const { open, variant, onClose, className, ...rest } = props

  const classes = useStyles()

  const pages = [
    {
      title: 'Overview',
      href: '/overview',
      icon: <DashboardIcon />
    },
    {
      title: 'Search',
      href: '/search',
      icon: <SearchIcon />
    },
    {
      title: 'Search by Course',
      href: '/course',
      icon: <BookIcon />
    },
    {
      title: 'Search by Tool',
      href: '/tools',
      icon: <BuildIcon />
    },
    {
      title: 'Total Tool Usage',
      href: '/usage',
      icon: <DataUsageIcon />
    }
  ]

  return (
    <Drawer
      anchor='left'
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  )
}

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
}

export default Sidebar
