import { getProfileEvents } from './API'
import { PROFILE_EVENTS, TOOL_LAUNCH_EVENT, TOOL_USE_EVENT } from './constants'
import cache from '../../utils/cache'
import {partition} from '../../utils/array'

export default class ProfileEvents {
  static async getData () {
    const store = cache.get(PROFILE_EVENTS)
    if (store) {
      return store
    }
    const data = await this.fetchData()
    return data
  }

  static async fetchData () {
    const data = await getProfileEvents()
    cache.set(PROFILE_EVENTS, data)
    return data
  }

  static async parseData () {
    const store = await this.getData()
    const { data } = store

    if (data) {
      const [pass, fail] = partition(data, (event) => event.type === TOOL_LAUNCH_EVENT)
      return { [TOOL_LAUNCH_EVENT]: pass, [TOOL_USE_EVENT]: fail }
    }

    return { [TOOL_LAUNCH_EVENT]: {}, [TOOL_USE_EVENT]: {} }
  }
}
