import axios from 'axios'

const service = axios.create()

const errorHandler = (err) => {
  throw err
}

const uploadImage = (file) => {
  return service
    .post('/upload', file)
    .then((res) => res.data)
    .catch(errorHandler)
}

export default {
  service,
  uploadImage,
}
