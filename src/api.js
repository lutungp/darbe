import axios from 'axios';
import store from './store/store.js';
import router from './Routes';

const $axios = axios.create({
    baseURL: process.env.VUE_APP_APIURL + 'api/',
    headers: {
        'Authorization': localStorage.getItem('token') != 'null' ? 'Bearer ' + localStorage.getItem('token') : '',
    }
});

$axios.interceptors.request.use (
    function (config) {
        const token = store.state.token
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        return Promise.reject (error);
    }
);

$axios.interceptors.response.use(
    (response) => {
        if (response.data.status == 'Token is Invalid' || response.data.status == 'Token is Expired') {
            store.commit('SET_TOKEN', null);
            router.push('/login');
        } else {
            return response
        }
  },
    (error) => {
        const originalRequest = error.config
        if (error.response.status === 401) {
            store.commit('SET_TOKEN', null);
            router.push('/login');
        }
        return Promise.reject(error)
    }
)

export default $axios;