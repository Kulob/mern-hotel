import axios from 'axios';
export const url = 'http://localhost:7777/api';

const instance = axios.create({
  baseURL: 'http://localhost:7777',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});
export default instance;
