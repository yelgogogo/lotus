import axios from 'axios'
export const baseUrl = 'http://localhost'
// export const baseUrl = 'http://vvzv.nstart.cc'
const ajaxUrl = baseUrl + ':8090'
const Service = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
})

export default Service