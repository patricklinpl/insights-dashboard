import { isEmpty, sortBy, prop } from 'ramda'

import { getRandomColor } from '../../../../utils/utilities'

const sortByDate = sortBy(prop('x'))

const getDataProp = data => {
  if (!isEmpty(data)) {
    return groupByMonth(data)
  }
}

const groupByMonth = data => {
  const dataStore = {
    chartNumber: [],
    chartPercent: [],
    colors: [],
    courses: {},
    totals: {}
  }

  const { chartNumber, colors, courses, totals } = dataStore

  data.forEach(event => {
    const { eventtime, group_coursenumber } = event // eslint-disable-line camelcase
    const date = new Date(eventtime)
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}`

    totals[dateKey] ? totals[dateKey]++ : totals[dateKey] = 1

    if (!courses[group_coursenumber]) {
      courses[group_coursenumber] = {}
      chartNumber[group_coursenumber] = []
      colors.push(getRandomColor())
    }

    if (courses[group_coursenumber][dateKey]) {
      courses[group_coursenumber][dateKey].y++
    } else {
      courses[group_coursenumber][dateKey] = {
        x: dateKey,
        y: 1
      }
    }
  })

  return normalizeDateRanges(dataStore)
}

const normalizeDateRanges = dataStore => {
  const { courses, totals } = dataStore

  Object.keys(courses).forEach(course => {
    Object.keys(totals).forEach(date => {
      if (!courses[course][date]) {
        courses[course][date] = {
          x: date,
          y: 0
        }
      }
    })
    dataStore.chartNumber.push(sortByDate(Object.values(courses[course])))
  })

  return Object.keys(courses).length >= 3 ? calculatePercentage(dataStore) : dataStore
}

const calculatePercentage = dataStore => {
  const { totals } = dataStore

  dataStore.chartPercent = sortByDate(
    dataStore.chartNumber.map(course => (
      course.map(data => (
        {
          x: data.x,
          y: Math.round((data.y / totals[data.x]) * 100)
        }
      ))
    ))
  )

  return dataStore
}

export default getDataProp
