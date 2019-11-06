import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

function MaterialTable (props) {
  const { data, headers = [] } = props

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
