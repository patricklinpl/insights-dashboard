import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import { SearchInput } from '../../../../components'

const useStyles = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    justify: 'center',
    padding: theme.spacing(3),
    spacing: 3
  },
  dropdown: {
    margin: theme.spacing(1),
    minWidth: 180
  },
  searchInput: {
    margin: theme.spacing(1),
    marginTop: 23,
    minWidth: 510
  }
}))

function SearchBar (props) {
  const classes = useStyles()
  const { searchError, searchLoad, setSearchValue, setType, suggestions, type } = props

  const types = ['Courses', 'Tools']

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={3}>
        <FormControl className={classes.dropdown}>
          <InputLabel id='type'>Type</InputLabel>
          <Select
            labelId='type-select-label'
            id='type-select'
            value={type}
            onChange={event => {
              setType(event.target.value)
              setSearchValue('')
            }}
          >
            {types.map((type, i) => (<MenuItem key={i} value={type}>{type}</MenuItem>))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={8} className={classes.searchInput}>
        <SearchInput
          error={searchError}
          loading={searchLoad}
          setSearchValue={setSearchValue}
          suggestions={suggestions}
        />
      </Grid>
    </Grid>
  )
}

SearchBar.propTypes = {
  searchError: PropTypes.any,
  searchLoad: PropTypes.bool.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
}

export default SearchBar
