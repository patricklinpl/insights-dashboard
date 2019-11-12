import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  TablePagination
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
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const {
    className,
    data = [],
    error,
    headers = [],
    loading = true,
    paginate = false,
    ...rest
  } = props

  const classes = useStyles()

  const handlePageChange = (event, page) => {
    setPage(page)
  }

  const handleRowsPerPageChange = event => {
    setPage(0)
    setRowsPerPage(event.target.value)
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <div className={classes.inner}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <Error />
          ) : (
            <MaterialTable
              data={
                paginate ? (
                  data.slice((page * rowsPerPage), (rowsPerPage * (page + 1)))
                ) : (data)
              }
              headers={headers}
            />
          )}
        </div>
      </CardContent>

      {paginate ? (
        <CardActions className={classes.actions}>
          <TablePagination
            component='div'
            count={data.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      ) : (
        <div />
      )}

      <Divider />
    </Card>
  )
}

TableCard.defaultProp = {
  data: [],
  headers: [],
  loading: true,
  paginate: false
}

TableCard.propTypes = {
  className: PropTypes.string,
  error: PropTypes.any,
  headers: PropTypes.array,
  loading: PropTypes.bool,
  data: PropTypes.array,
  paginate: PropTypes.bool
}

export default TableCard
