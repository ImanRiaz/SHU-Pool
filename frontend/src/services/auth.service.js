import axios from 'axios';

const API_URL = '/api/auth/';

const register = (data) => {
    return axios.post(API_URL + 'signup', data);
};

const login = (email, password) => {
    return axios.post(API_URL + 'signin', {
        email,
        password,
    })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
