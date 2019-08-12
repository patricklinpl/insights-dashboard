export const getAggCount = result => {
  return Object.keys(result).map((key, index) => {
    const value = result[key]['aggregate']['count']
    return {
      x: index,
      label: `${key} (${value})`,
      y: value
    }
  })
}
