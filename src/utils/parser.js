import { isEmpty, pathOr } from 'ramda'

import {
  AGGREGATE,
  AGGREGATE_TABLE,
  COUNT
} from './constants'

export const extractQuery = (table, data) => pathOr([], [table], data)

export const getAggCount = pathOr(0, [AGGREGATE_TABLE, AGGREGATE, COUNT])

export const getValue = (value, data) => pathOr('', [value], data)

export const makeChartProp = arr => {
  if (!arr || isEmpty(arr)) {
    return []
  }

  return arr.map((obj, index) => {
    if (isEmpty(obj)) {
      return obj
    }

    const key = Object.keys(obj)[0]
    const value = obj[key]

    return {
      x: index,
      label: `${key} (${value})`,
      y: value
    }
  })
}
