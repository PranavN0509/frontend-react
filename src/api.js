import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';
const mybaseURL = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOYMENT;


export const api = axios.create({
  baseURL: "https://backend-django-6qcx.onrender.com/api",
});
