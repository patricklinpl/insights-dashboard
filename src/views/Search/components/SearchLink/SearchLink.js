import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

import { TableCard } from '../../../../components'

function SearchLink (props) {
  const { searchError, searchLoad, searchType, searchValue } = props

  const searchData = searchValue === '' ? [] : [{
    'Search Value': searchValue,
    Href: `/results?type=${searchType}&searchValue=${searchValue}`,
    Link: <Button variant='contained' color='primary' href={`/results?type=${searchType}&searchValue=${searchValue}`}> Link </Button>
  }]

  return (
    <div>
      {searchValue !== '' ? (
        <TableCard
          data={searchData}
          error={searchError}
          headers={['Search Value', 'Href', 'Link']}
          loading={searchLoad}
        />) : <div />}
    </div>
  )
}

SearchLink.propTypes = {
  searchError: PropTypes.any,
  searchLoad: PropTypes.bool.isRequired,
  searchType: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired
}

export default SearchLink
