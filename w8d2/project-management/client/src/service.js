import axios from 'axios'

const service = axios.create()

const errorHandler = (err) => {
  throw err
}
const storedToken = localStorage.getItem('authToken')
const uploadImage = (file) => {
  return service
    .post('/api/dishes/upload', file, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => res.data)
    .catch(errorHandler)
}

export default {
  service,
  uploadImage,
}
