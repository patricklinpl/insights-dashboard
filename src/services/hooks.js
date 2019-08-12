import { useState, useEffect } from 'react'
import get from './client'
import cache from '../utils/cache'

export const useFetch = dataURL => {
  const [ data, setData ] = useState(null)
  const [ loaded, setLoaded ] = useState(false)

  useEffect(() => {
    const store = cache.get(dataURL)
    if (store) {
      setData(store)
      setLoaded(true)
    } else {
      setLoaded(false)
      const getData = async () => {
        const data = await get(dataURL)
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
