import axios from 'axios'
export let baseUrl
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost'
} else {
  baseUrl = 'http://vvzv.nstart.cc'
}
const ajaxUrl = baseUrl + ':8090'
const Service = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
})

export default Service