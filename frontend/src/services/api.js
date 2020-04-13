import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', //url base da api (backend)
})

export default api;