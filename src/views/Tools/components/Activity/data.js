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
    title: 'Courses',
    totals: {},
    usePercent: false
  }

  const { chartNumber, colors, elements, totals } = dataStore

  data.forEach(event => {
    const { eventtime, group_coursenumber } = event // eslint-disable-line camelcase
    const date = new Date(eventtime)
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}`

    totals[dateKey] ? totals[dateKey]++ : totals[dateKey] = 1

    if (!elements[group_coursenumber]) {
      elements[group_coursenumber] = {}
      chartNumber[group_coursenumber] = []
      colors.push(getRandomColor())
    }

    if (elements[group_coursenumber][dateKey]) {
      elements[group_coursenumber][dateKey].y++
    } else {
      elements[group_coursenumber][dateKey] = {
        x: dateKey,
        y: 1
      }
    }
  })

  return normalizeDateRanges(dataStore)
}

const normalizeDateRanges = dataStore => {
  const { elements, totals } = dataStore

  Object.keys(elements).forEach(course => {
    Object.keys(totals).forEach(date => {
      if (!elements[course][date]) {
        elements[course][date] = {
          label: `${course}: 0`,
          x: date,
          y: 0
        }
      } else {
        elements[course][date].label = `${course}: ${elements[course][date].y}`
      }
    })
    dataStore.chartNumber.push(sortByDate(Object.values(elements[course])))
  })

  dataStore.usePercent = Object.keys(elements).length >= USE_PERCENT_NUM

  return dataStore.usePercent ? calculatePercentage(dataStore) : dataStore
}

const calculatePercentage = dataStore => {
  const { elements, totals } = dataStore

  dataStore.chartPercent = sortByDate(
    dataStore.chartNumber.map((course, i) => (
      course.map(data => (
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
