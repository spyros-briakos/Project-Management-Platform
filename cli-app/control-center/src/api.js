import axios from 'axios';

const baseURL = 'http://127.0.0.1:3000/api-control';

const getAPI = axios.create({
  baseURL: baseURL,
  timeout: 10000,               // Wait 10 seconds max.
})

export { getAPI }