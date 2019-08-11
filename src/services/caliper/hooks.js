import { useState, useEffect } from 'react'
import get from './client'
import cache from '../../utils/cache'

export const useFetch = request => {
  const [ data, setData ] = useState(null)
  const [ loaded, setLoaded ] = useState(false)

  const { dataURL, query } = request

  useEffect(() => {
    const store = cache.get(dataURL)
    if (store) {
      setData(store)
      setLoaded(true)
    } else {
      setLoaded(false)
      const getData = async () => {
        const data = query ? null : await get(dataURL)
        cache.set(dataURL, data)
        setData(data)
        setLoaded(true)
      }
      getData()
    }
  }, [dataURL])

  return [loaded, data]
}

export default useFetch
