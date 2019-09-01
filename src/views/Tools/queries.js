export const uniquetools = `{
    event_toollaunch(distinct_on: object_id) {
      object_id
    }
  }`

export const getCoursesByTool = (tool, startDate, endDate) => `{
  event_toollaunch(distinct_on: membership_coursenumber, where: {eventtime: {_gte: "${startDate}", _lte: "${endDate}"}, object_id: {_eq: "${tool}"}}) {
    membership_coursenumber
  }
}
`
