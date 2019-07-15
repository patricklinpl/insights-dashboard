import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { dataURL } from '../../utils/data'

function LaunchEvent () {
  const [error] = useState(null)
  const [items] = useState([])

  useEffect(() => {
      console.log(dataURL)
    axios.get(`/api/events`, {
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
      }
    })
    .then(function (response) {
        // handle success
        console.log(response);
      })
  })

  return [items, error]
}

LaunchEvent.propTypes = {
    render: PropTypes.func.isRequired
}

export default LaunchEvent
