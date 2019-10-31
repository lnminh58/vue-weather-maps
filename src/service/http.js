import axios from 'axios'
import { API_BASE_URL } from '../config/api'

axios.defaults.baseURL = API_BASE_URL

axios.defaults.timeout = 30000

axios.interceptors.request.use(config => config, error => Promise.reject(error))

axios.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response || error.request || error.message)
)

const http = {
  request(config = {}) {
    return axios.request(config)
  },
  get(url, config = {}) {
    return axios.get(url, config)
  },
};

export default http
