import axios from 'axios';

const baseURL = 'http://127.0.0.1:3000/api-control'; //? CHECK THTAT IS VALID

const getAPI = axios.create({
  baseURL: baseURL,
  timeout: 15000,
})

export { getAPI }