import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'ramda'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

function MaterialTable (props) {
  const { data } = props
  const headers = isEmpty(data) ? [] : Object.keys(data[0])

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header, index) => (
            <TableCell key={index}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow hover key={index}>
            {Object.keys(item).map(key => (
              <TableCell key={`${item[key]}-${index}`}>{item[key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
};

MaterialTable.defaultProps = {
  data: []
}

MaterialTable.propTypes = {
  data: PropTypes.array
}

export default memo(MaterialTable)
