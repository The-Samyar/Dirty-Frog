import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:8000/api'})

export const fetchStats = () => API.get('/Stats/');
export const fetchFeaturedRooms = () => API.get('/FeaturedRooms/');
export const fetchTestimonials = () => API.get('/Testimonials/');
export const fetchBookNow = (data) => API.post('/BookNow/' , data);
export const getBookNow = () => API.get('/BookNow/');
export const reserveBookNow = (data) => API.post('/BookNow/' , data);
export const sendSignUpData = (data) => API.post('/SignUp/', data);
export const sendSignInData = (data) => API.post('/SignIn/', data);
export const getRoomsSummary = () => API.get('/Rooms/');
export const getRoomDetails = (data) => API.get(`/Rooms/${data}/`)