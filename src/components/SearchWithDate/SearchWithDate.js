import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { DatePicker, SearchInput } from '../index'

const useStyles = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    justify: 'center',
    padding: theme.spacing(3),
    spacing: 3
  },
  datePicker: {
    float: 'right'
  }
}))

function SearchWithDate (props) {
  const { searchError, searchLoad, setSearchValue, suggestions, startDate, endDate, setStartDate, setEndDate } = props

  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={6}>
        <SearchInput
          error={searchError}
          label='Tool'
          loading={searchLoad}
          setSearchValue={setSearchValue}
          suggestions={suggestions}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <DatePicker
          className={classes.datePicker}
          state={{ date: [startDate, setStartDate], label: 'Start Date' }}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <DatePicker
          className={classes.datePicker}
          state={{ date: [endDate, setEndDate], label: 'End Date' }}
        />
      </Grid>
    </Grid>
  )
}

SearchWithDate.propTypes = {
  searchError: PropTypes.any,
  searchLoad: PropTypes.bool.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired
}

export default memo(SearchWithDate)
