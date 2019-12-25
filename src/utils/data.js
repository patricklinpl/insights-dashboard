import { isEmpty, sortBy, prop } from 'ramda'

import { USE_PERCENT_NUM } from './constants'
import { getRandomColor } from './utilities'

const sortByDate = sortBy(prop('x'))

const getDataProp = data => !isEmpty(data) ? groupByMonth(data) : {}

const groupByMonth = (data) => {
  const dataStore = {
    chartNumber: [],
    chartPercent: [],
    colors: [],
    elements: {},
    title: '',
    totals: {},
    usePercent: false
  }

  const { chartNumber, colors, elements, totals } = dataStore

  data.forEach(event => {
    const { eventtime, group_coursenumber, object_id } = event // eslint-disable-line camelcase
    const date = new Date(eventtime)
    const dateKey = `${date.getFullYear()}-${date.getMonth() < 9 ? 0 : ''}${date.getMonth() + 1}`

    const objKey = typeof object_id === 'undefined' ? group_coursenumber : object_id // eslint-disable-line camelcase

    totals[dateKey] ? totals[dateKey]++ : totals[dateKey] = 1

    if (!elements[objKey]) {
      elements[objKey] = {}
      chartNumber[objKey] = []
      colors.push(getRandomColor())
    }

    if (elements[objKey][dateKey]) {
      elements[objKey][dateKey].y++
    } else {
      elements[objKey][dateKey] = {
        x: dateKey,
        y: 1
      }
    }
  })

  return normalizeDateRanges(dataStore)
}

const normalizeDateRanges = dataStore => {
  const { elements, totals } = dataStore

  Object.keys(elements).forEach(obj => {
    Object.keys(totals).forEach(date => {
      if (!elements[obj][date]) {
        elements[obj][date] = {
          label: `${obj}: 0`,
          x: date,
          y: 0
        }
      } else {
        elements[obj][date].label = `${obj}: ${elements[obj][date].y}`
      }
    })
    dataStore.chartNumber.push(sortByDate(Object.values(elements[obj])))
  })

  dataStore.usePercent = Object.keys(elements).length >= USE_PERCENT_NUM

  return dataStore.usePercent ? calculatePercentage(dataStore) : dataStore
}

const calculatePercentage = dataStore => {
  const { elements, totals } = dataStore

  dataStore.chartPercent = sortByDate(
    dataStore.chartNumber.map((obj, i) => (
      obj.map(data => (
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
