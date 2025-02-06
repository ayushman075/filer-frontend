import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://filer-backend.onrender.com/api/v1/',
  timeout: 500000, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export const axiosInstanceFile = axios.create({
  baseURL: 'https://filer-backend.onrender.com/api/v1/',
  timeout: 500000, 
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  withCredentials: true, 
});


export default axiosInstance;
