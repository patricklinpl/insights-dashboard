import { isEmpty } from 'ramda'

export const getAggCount = result => {
  if (result && !isEmpty(result)) {
    return Object.keys(result).map((key, index) => {
      const value = result[key]['aggregate']['count']
      return {
        x: index,
        label: `${key} (${value})`,
        y: value
      }
    })
  }
  return null
}

export const parseToolUse = result => {
  if (result && !isEmpty(result)) {
    return Object.values(result)[0]
  }
  return null
}
