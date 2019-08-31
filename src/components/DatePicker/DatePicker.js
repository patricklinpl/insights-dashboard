import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardDatePicker } from '@material-ui/pickers'

const useStyles = makeStyles(theme => ({
  datePicker: {
    float: 'right'
  }
}))

function DatePicker (props) {
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
      className={classes.datePicker}
      format='yyyy-MM-dd'
      label={label}
      onChange={date => setDate(date)}
      value={date}
    />
  )
}

DatePicker.propTypes = {
  state: PropTypes.shape({
    date: PropTypes.array,
    label: PropTypes.string
  })
}

export default memo(DatePicker)
