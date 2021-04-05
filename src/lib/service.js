import axios from 'axios'

const ajaxUrl = 'http://121.89.217.223:8090'
const Service = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
})

export default Service