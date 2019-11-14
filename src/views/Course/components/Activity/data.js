import { isEmpty, sortBy, prop } from 'ramda'

import { getRandomColor } from '../../../../utils/utilities'

const USE_PERCENT_NUM = 3

const sortByDate = sortBy(prop('x'))

const getDataProp = data => !isEmpty(data) ? groupByMonth(data) : {}

const groupByMonth = data => {
  const dataStore = {
    chartNumber: [],
    chartPercent: [],
    colors: [],
    elements: {},
    title: 'Tools',
    totals: {},
    usePercent: false
  }

  const { chartNumber, colors, elements, totals } = dataStore

  data.forEach(event => {
    const { eventtime, object_id } = event // eslint-disable-line camelcase
    const date = new Date(eventtime)
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}`

    totals[dateKey] ? totals[dateKey]++ : totals[dateKey] = 1

    if (!elements[object_id]) {
      elements[object_id] = {}
      chartNumber[object_id] = []
      colors.push(getRandomColor())
    }

    if (elements[object_id][dateKey]) {
      elements[object_id][dateKey].y++
    } else {
      elements[object_id][dateKey] = {
        x: dateKey,
        y: 1
      }
    }
  })

  return normalizeDateRanges(dataStore)
}

const normalizeDateRanges = dataStore => {
  const { elements, totals } = dataStore

  Object.keys(elements).forEach(tool => {
    Object.keys(totals).forEach(date => {
      if (!elements[tool][date]) {
        elements[tool][date] = {
          label: `${tool}: 0`,
          x: date,
          y: 0
        }
      } else {
        elements[tool][date].label = `${tool}: ${elements[tool][date].y}`
      }
    })
    dataStore.chartNumber.push(sortByDate(Object.values(elements[tool])))
  })

  dataStore.usePercent = Object.keys(elements).length >= USE_PERCENT_NUM

  return dataStore.usePercent ? calculatePercentage(dataStore) : dataStore
}

const calculatePercentage = dataStore => {
  const { elements, totals } = dataStore

  dataStore.chartPercent = sortByDate(
    dataStore.chartNumber.map((tool, i) => (
      tool.map(data => (
        {
          label: `${Object.keys(elements)[i]}: ${data.y}`,
          x: data.x,
          y: Math.round((data.y / totals[data.x]) * 100)
        }
      ))
    ))
  )

  return dataStore
}

export default getDataProp
