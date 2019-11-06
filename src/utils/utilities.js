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

export const aggregateToolUsageCount = tools => tools
  .reduce((acc, tool) => {
    const toolIndex = acc.findIndex(x => x.Tool === tool.Tool)
    if (toolIndex !== -1) {
      acc[toolIndex].Count++
    } else {
      acc.push({ Tool: tool.Tool, Count: 1 })
    }
    return acc
  }, [])
  .sort((a, b) => b.Count - a.Count)
