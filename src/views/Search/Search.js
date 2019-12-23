import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { makeStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'

import { SearchBar, SearchLink } from './components'
import { COURSE, TABLE, TOOL } from '../../utils/constants'
import { extractQuery, getValue } from '../../utils/parser'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(8),
    minHeight: 500
  },
  paper: {
    color: theme.palette.text.secondary,
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  divider: {
    height: theme.spacing(2)
  }
}))

const GET_ALL_COURSES = gql`
{
  ${TABLE}(distinct_on: group_coursenumber, where: {group_coursenumber: {_is_null: false}}) {
    group_coursenumber
  }
}
`

const GET_ALL_TOOLS = gql`
{
  ${TABLE}(distinct_on: object_id, where: {object_id: {_is_null: false}}) {
    object_id
  }
}
`

function Search () {
  const [type, setType] = useState('Courses')
  const [searchValue, setSearchValue] = useState('')

  const classes = useStyles()

  const { loading, error, data } = useQuery(type === 'Tools' ? GET_ALL_TOOLS : GET_ALL_COURSES)

  const suggestions = extractQuery(TABLE, data).map(suggestion => (
    { label: getValue(type === 'Tools' ? TOOL : COURSE, suggestion) }
  ))

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div>
          <SearchBar
            searchError={error}
            searchLoad={loading}
            type={type}
            setType={setType}
            searchValue={searchValue}
            suggestions={suggestions}
            setSearchValue={setSearchValue}
          />
          <div className={classes.divider} />
          <SearchLink
            searchError={error}
            searchLoad={loading}
            searchType={type}
            searchValue={searchValue}
          />
        </div>
      </Card>
    </div>
  )
}

export default Search
