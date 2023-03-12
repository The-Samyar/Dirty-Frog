import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:8000/api'})
API.interceptors.request.use(req => {
    if(localStorage.getItem('authTokens')?.access){
        req.headers.Authorization = `Bearer ${localStorage.getItem('authTokens')?.access}`;
    }
    return req;
})

export const fetchStats = () => API.get('/Stats/');
export const fetchFeaturedRooms = () => API.get('/FeaturedRooms/');
export const fetchTestimonials = () => API.get('/Testimonials/');
export const fetchBookNow = (data) => API.post('/BookNow/' , data);
export const getBookNow = () => API.get('/BookNow/' , {headers: {'Cache-Control': 'max-age=3000'}});
export const reserveBookNow = (data) => API.post('/BookNow/' , data);
export const sendSignUpData = (data) => API.post('/SignUp/', data);
export const sendSignInData = (data) => API.post('/SignIn/', data);
export const getRoomsSummary = () => API.get('/Rooms/');
export const getRoomDetails = (data) => API.get(`/Rooms/${data}/`)
export const fetchReserveInfo = (data) => API.post('/BookingInfo/' , data);
export const sendReservationData = (data) => API.post('/Booking/' , data);
export const getUserData = () => API.get('/profile/data/');
export const ChangeUserData = (data) => API.post('/profile/data/' , data);
export const sendChangePassData = (data) => API.post('/profile/change-password/' , data);
export const sendProfileChange = (data) => API.post('/profile/' , data);
export const sendProfileImage = (data) => API.post('/profile/data/image' , data);
export const getReservationHistory = () => API.get('/profile/reserve-history/');
export const refreshToken = (refresh) => API.post('/token/refresh' , refresh);
export const addReviewToUser = (data) => API.post('/profile/addReview' , data);