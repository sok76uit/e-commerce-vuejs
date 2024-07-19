import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://localhost:7269/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default apiClient
