import { format } from 'date-fns'

export const formatDate = (prevDate, newDate) => {
  try {
    const date = format(newDate, 'yyyy-MM-dd')
    return date
  } catch (error) {
    return format(prevDate, 'yyyy-MM-dd')
  }
}

export const partition = (array, compare) => {
  return array.reduce(([pass, fail], element) => {
    return compare(element) ? [[...pass, element], fail] : [pass, [...fail, element]]
  }, [[], []])
}
