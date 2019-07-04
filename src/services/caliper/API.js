import axios from 'axios'
import { API, EVENTS, PROFILE_EVENTS } from './constants'

const urlConstructor = path => `${API}/${path}`

const get = async (request) => {
  const response = await axios.get(request)
    .then(rsp => {
      const { data } = rsp
      return data
    })
    .catch(error => {
      console.log(error)
    })
  return response
}

export const getEvent = id => get(urlConstructor(`${EVENTS}/${id}`))

export const getProfileEvents = () => get(urlConstructor(PROFILE_EVENTS))
