import { useEffect, useRef } from 'react'
import { format } from 'date-fns'

function usePreviousDate (date) {
  const ref = useRef()
  useEffect(() => {
    try {
      format(date, 'yyyy-MM-dd')
      ref.current = date
    } catch (error) { }
  })
  return ref.current
}

export default usePreviousDate
