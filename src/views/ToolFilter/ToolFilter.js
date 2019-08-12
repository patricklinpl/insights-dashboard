import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import {
  Card,
  Select,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

import { Spinner } from '../../components'
import { uniquetools } from '../../services/caliper/query'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(8)
  },
  inner: {
    minWidth: 1050
  },
  formControl: {
    margin: theme.spacing(),
    minWidth: 120
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  }
}))

function ToolFilter () {
  const classes = useStyles()
  const [tool, setTool] = useState('')

  const { loading, error, data } = useQuery(gql`${uniquetools}`)
  if (error) {
    console.log(error)
  }

  const { loading: tableLoading, error: tableError, data: tableData } = useQuery(gql`{event_toollaunch(where: {object_id: {_eq: "${tool}"}}, distinct_on: group_coursenumber) {group_coursenumber}}`)
  if (error) {
    console.log(tableError)
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.inner}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {loading ? <Spinner />
                : <FormControl className={classes.formControl}>
                  <InputLabel>Tool</InputLabel>
                  <Select
                    value={tool}
                    onChange={event => setTool(event.target.value)}
                  >
                    {data['event_toollaunch'].map(obj => {
                      return <MenuItem key={obj['object_id']} value={obj['object_id']}>{obj['object_id']}</MenuItem>
                    })}
                  </Select>

                </FormControl>
              }
            </Grid>
          </Grid>
        </div>

        <div className={classes.content}>
          <br />
          {tableLoading ? <Spinner />
            : <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData['event_toollaunch'].map(tool => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={tool.group_coursenumber}
                  >
                    <TableCell>
                      {tool.group_coursenumber}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>}
        </div>
      </Card>
    </div>
  )
}

export default ToolFilter
