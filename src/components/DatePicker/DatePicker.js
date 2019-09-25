import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardDatePicker } from '@material-ui/pickers'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  }
}))

function DatePicker (props) {
  const { className } = props
  const {
    date: [date, setDate],
    label
  } = {
    date: useState(new Date()),
    label: '',
    ...(props.state || {})
  }

  const classes = useStyles()

  return (
    <KeyboardDatePicker
      clearable
      className={clsx(classes.root, className)}
      format='yyyy-MM-dd'
      label={label}
      onChange={date => setDate(date)}
      value={date}
    />
  )
}

DatePicker.propTypes = {
  className: PropTypes.string,
  state: PropTypes.shape({
    date: PropTypes.array,
    label: PropTypes.string
  })
}

export default memo(DatePicker)
