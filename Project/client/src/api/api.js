import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:8000/api'})

export const fetchStats = () => API.get('/Stats/');
export const fetchFeaturedRooms = () => API.get('/FeaturedRooms/');
export const post = (data) => API.post('/HeaderForm/' , data)