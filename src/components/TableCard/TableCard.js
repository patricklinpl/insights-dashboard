import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'ramda'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardContent,
  CardHeader,
  Divider
} from '@material-ui/core'
import { Error, MaterialTable, Spinner } from '../../components'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0,
    overflowX: 'auto'
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}))

function TableCard (props) {
  const { className, data, error, label, loading, ...rest } = props
  const classes = useStyles()

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title={label} />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.inner}>
          {loading && isEmpty(data) ? (
            <Spinner />
          ) : error ? (
            <Error />
          ) : (
            <MaterialTable {...props} />
          )}
        </div>
      </CardContent>
      <Divider />
    </Card>
  )
}

TableCard.defaultProp = {
  data: [],
  label: '',
  loading: true
}

TableCard.propTypes = {
  className: PropTypes.string,
  error: PropTypes.any,
  label: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired
}

export default TableCard
