import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { isEmpty, innerJoin } from 'ramda'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid } from '@material-ui/core'

import { DatePicker, TableCard } from '../../components'
import { usePreviousDate } from '../../hooks'
import { COUNT, TABLE, TOOL, TOOLS_USAGE_TABLE } from '../../utils/constants'
import { extractQuery, getValue } from '../../utils/parser'
import { formatDate } from '../../utils/utilities'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  container: {
    alignItems: 'center',
    justify: 'center',
    padding: theme.spacing(3),
    spacing: 3
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(8)
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

const GET_TOOL_USAGE_COUNT = gql`
{
  tools_usage(order_by: {count: desc}) {
    count
    object_id
  }
}
`

const GET_TOOLS_WITHIN_RANGE = (startDate, endDate) => gql`
{
  ${TABLE}(distinct_on: object_id, where: {eventtime: {_gte: "${startDate}", _lte: "${endDate}"}}) {
    object_id
  }
}
`

function Usage () {
  const [startDate, setStartDate] = useState(new Date('2018-12-02'))
  const [endDate, setEndDate] = useState(new Date())

  const classes = useStyles()

  const startDateResolver = formatDate(usePreviousDate(startDate), startDate)
  const endDateResolver = formatDate(usePreviousDate(endDate), endDate)

  const { loading, error, data } = useQuery(GET_TOOLS_WITHIN_RANGE(startDateResolver, endDateResolver))
  const { data: usageData } = useQuery(GET_TOOL_USAGE_COUNT)

  const filteredTools = extractQuery(TABLE, data).map(tool => ({
    Tool: getValue(TOOL, tool)
  }))

  const parseUsageData = extractQuery(TOOLS_USAGE_TABLE, usageData).map(tool => ({
    Tool: getValue(TOOL, tool),
    Count: getValue(COUNT, tool)
  }))

  const filterUsageData = innerJoin(
    (tool, filterTool) => tool.Tool === filterTool.Tool,
    parseUsageData,
    filteredTools
  )

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.inner}>

          <Grid container className={classes.container}>
            <Grid item xs={12} sm={3}>
              <DatePicker state={{ date: [startDate, setStartDate], label: 'Start Date' }} />
            </Grid>
            <Grid item xs={12} sm={3} >
              <DatePicker state={{ date: [endDate, setEndDate], label: 'End Date' }} />
            </Grid>
          </Grid>

          <div className={classes.divider} />

          <TableCard
            data={filterUsageData}
            error={error}
            label={'Most used tools'}
            loading={loading ? isEmpty(filterUsageData) : loading}
            paginate
          />

        </div>
      </Card>
    </div>
  )
}

export default Usage
