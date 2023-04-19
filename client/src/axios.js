import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:7777/',
  baseURL: 'https://mern-hotel-api.vercel.app/',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  // config.headers = JSON.parse(localStorage.getItem('user'));
  return config;
});
export default instance;
