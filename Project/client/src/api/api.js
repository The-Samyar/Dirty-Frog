import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:8080/api'})

export const fetch = () => API.get('/Stats');