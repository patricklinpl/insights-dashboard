import { API, PROFILE_EVENTS } from './constants'

const urlConstructor = path => `${API}/${path}`

export default {
  PROFILE_EVENTS_URL: urlConstructor(PROFILE_EVENTS)
}
