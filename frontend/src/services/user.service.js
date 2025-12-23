import axios from 'axios';
import AuthService from './auth.service';

const API_URL = '/api/users/';

const authHeader = () => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const getProfile = () => {
    return axios.get(API_URL + 'profile', { headers: authHeader() });
};

const updateProfile = (data) => {
    return axios.put(API_URL + 'profile', data, { headers: authHeader() });
};

const getUserById = (id) => {
    return axios.get(API_URL + id, { headers: authHeader() });
};

const UserService = {
    getProfile,
    updateProfile,
    getUserById
};

export default UserService;
