module.exports = {
  eventTypeCountQuery: `{
        event_toollaunch_aggregate {
          aggregate {
            count
          }
        }
        event_tooluse_aggregate {
          aggregate {
            count
          }
        }
      }`,
  uniqueCourseToolUsage: `{
    tools_usage {
      object_id
      count
    }
  }`
}
