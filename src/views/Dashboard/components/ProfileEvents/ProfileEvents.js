import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'ramda'

import { ChartCard, PieChart } from '../../../../components'
import { partition } from '../../../../utils/utilities'
import { TOOL_LAUNCH_EVENT, TOOL_USE_EVENT } from '../../../../utils/constants'
import endpoints from '../../../../services/caliper/endpoints'
import useFetch from '../../../../services/hooks'

const PieChartCard = ChartCard(PieChart)

const countEventType = (rsp) => {
  if (!isEmpty(rsp)) {
    const { data } = rsp
    const [pass, fail] = partition(data, (event) => event.type === TOOL_LAUNCH_EVENT)
    return [
      { x: 1, label: [ TOOL_LAUNCH_EVENT ], y: pass.length },
      { x: 2, label: [ TOOL_USE_EVENT ], y: fail.length }
    ]
  }
  return []
}

function ProfileEvents (props) {
  const { classes } = props

  const { PROFILE_EVENTS_URL } = endpoints
  const [data, error, loading] = useFetch(PROFILE_EVENTS_URL)
  const profileEventsData = countEventType(data)

  return (
    <PieChartCard
      classes={classes}
      data={profileEventsData}
      error={error}
      loading={loading}
      title={'Profile Event Types'}
    />
  )
}

ProfileEvents.propTypes = {
  classes: PropTypes.object
}

export default ProfileEvents
