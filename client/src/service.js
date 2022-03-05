import axios from 'axios'

const service = axios.create()

const errorHandler = (err) => {
  throw err
}

const uploadImage = (file) => {
  const storedToken = localStorage.getItem('authToken')
  return service
    .post('/upload', file, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => res.data)
    .catch(errorHandler)
}

export default {
  service,
  uploadImage,
}
