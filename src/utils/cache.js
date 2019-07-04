/* global localStorage */

const cache = {
  get: key => {
    const data = JSON.parse(localStorage.getItem(key.toString()))
    if (data) {
      const { value, expiration } = data
      if (expiration && expiration < new Date().getTime()) {
        localStorage.removeItem(key.toString())
      } else {
        return value
      }
    }
    return undefined
  },
  set: (key, value) => {
    const time = 600000 // ten minutes
    const data = { value, expiration: new Date().getTime() + time / 1 }
    localStorage.setItem(key.toString(), JSON.stringify(data))
  }
}

export default cache
