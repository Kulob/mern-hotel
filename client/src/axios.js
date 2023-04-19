import axios from 'axios';
// export const url = 'https://mern-hotel-api.vercel.app/api';
export const url = 'https://mern-hotel-api.vercel.app/api';

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
