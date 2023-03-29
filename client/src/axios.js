import axios from 'axios';
export const url = 'https://mern-hotel-api.vercel.app/api';

const instance = axios.create({
  baseURL: 'https://mern-hotel-api.vercel.app/',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});
export default instance;
