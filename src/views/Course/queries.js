export const getAllCourses = `{
  event_toollaunch(distinct_on: membership_coursenumber) {
    membership_coursenumber
  }
}`

export const getToolsByCourse = (courseId, startDate, endDate) => `{
  event_toollaunch(distinct_on: object_id, where: {membership_coursenumber: {_eq: "${courseId}"}, eventtime: {_gte: "${startDate}", _lte: "${endDate}"}}) {
    object_id
  }
}`
