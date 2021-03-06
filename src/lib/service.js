import axios from 'axios'

const ajaxUrl = 'http://localhost:8090'
const Service = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
})

export default Service