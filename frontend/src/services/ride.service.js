import axios from 'axios';
import AuthService from './auth.service';

const API_URL = '/api/';

// Helper to get header
const authHeader = () => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const getOpenRides = () => {
    return axios.get(API_URL + 'rides', { headers: authHeader() });
};

const searchRides = (origin, destination) => {
    return axios.get(API_URL + `rides/search?origin=${origin}&destination=${destination}`, { headers: authHeader() });
};

const offerRide = (rideData) => {
    return axios.post(API_URL + 'rides/offer', rideData, { headers: authHeader() });
};

const bookRide = (rideId, seats) => {
    return axios.post(API_URL + `bookings/book/${rideId}?seats=${seats}`, {}, { headers: authHeader() });
};

const getMyBookings = () => {
    return axios.get(API_URL + 'bookings/my-bookings', { headers: authHeader() });
};

const updateRideStatus = (rideId, status) => {
    return axios.put(API_URL + `rides/${rideId}/status?status=${status}`, {}, { headers: authHeader() });
};

const cancelBooking = (bookingId) => {
    return axios.post(API_URL + `bookings/cancel/${bookingId}`, {}, { headers: authHeader() });
};

const RideService = {
    getOpenRides,
    searchRides,
    offerRide,
    bookRide,
    getMyBookings,
    updateRideStatus,
    cancelBooking
};

export default RideService;
