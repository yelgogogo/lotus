import axios from 'axios'

const ajaxUrl = 'http://localhost:8090'
const service = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
})

export default service