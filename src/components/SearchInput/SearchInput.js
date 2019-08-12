import React from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { renderInput, renderSuggestion } from './components'
import { Error, Spinner } from '../../components'

function getSuggestions (value, suggestions, { showEmpty = false } = {}) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
      const keep = count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue
      if (keep) {
        count += 1
      }
      return keep
    })
}

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  inputRoot: {
    flexWrap: 'wrap'
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1
  }
}))

function SearchInput (props) {
  const { label, loading, error, setSearchValue, suggestions } = props
  const classes = useStyles()

  return (
    <Downshift onChange={selection => setSearchValue(selection)} id={`downshift-${label}`}>
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        inputValue,
        isOpen,
        selectedItem
      }) => {
        const { onBlur, onFocus, ...inputProps } = getInputProps({
          placeholder: `Search for a ${label} (start with a)`
        })

        return (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              label,
              InputLabelProps: getLabelProps({ shrink: true }),
              InputProps: { onBlur, onFocus },
              inputProps
            })}
            <div {...getMenuProps()}>
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {loading ? (
                    <Spinner />
                  ) : error ? (
                    <Error />
                  ) : (
                    getSuggestions(inputValue, suggestions).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.label }),
                        highlightedIndex,
                        selectedItem
                      })
                    )
                  )}
                </Paper>
              ) : null}
            </div>
          </div>
        )
      }}
    </Downshift>
  )
}

SearchInput.defaultProps = {
  label: '',
  loading: false,
  suggestions: []
}

SearchInput.propTypes = {
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  setSearchValue: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired
}

export default SearchInput
