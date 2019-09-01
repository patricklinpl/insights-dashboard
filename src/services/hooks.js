import { useState, useEffect } from 'react'
import get from './client'
import cache from '../utils/cache'

export const useFetch = dataURL => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const store = cache.get(dataURL)
    if (store) {
      setData(store)
      setLoading(false)
    } else {
      setLoading(true)
      const getData = async () => {
        try {
          const data = await get(dataURL)
          cache.set(dataURL, data)
          setData(data)
          setLoading(false)
        } catch (error) {
          setError(true)
        } finally {
          setLoading(false)
        }
      }
      getData()
    }
  }, [dataURL])

  return [data, error, loading]
}

export default useFetch
