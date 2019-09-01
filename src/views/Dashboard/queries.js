export const eventTypeCountQuery = `{
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
}`
