import React, { useState, useEffect } from 'react'
import BarChart from '../../components/BarChart'
import ProfileEvents from '../../services/caliper/profileEvents'
import { PROFILE_EVENTS, TOOL_LAUNCH_EVENT, TOOL_USE_EVENT } from '../../services/caliper/constants'

function Page () {
  // const [error] = useState(null)
  const [pEvents, setPEvents] = useState(null)

  useEffect(() => {
    const fetchProfileEvents = async () => {
      const data = await ProfileEvents.parseData()
      setPEvents({
        title: [PROFILE_EVENTS],
        data: {
          [TOOL_LAUNCH_EVENT]: data[TOOL_LAUNCH_EVENT].length,
          [TOOL_USE_EVENT]: data[TOOL_USE_EVENT].length
        }
      })
    }
    fetchProfileEvents()
  }, [])

  return (
    <div className='App'>
      {pEvents ? <BarChart element={pEvents} /> : 'Loading..'}
    </div>
  )
}

export default Page
