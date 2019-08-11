import axios from 'axios'

const get = async request => {
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

export default get
