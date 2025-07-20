// src/api/axios.js

import axios from 'axios';

const api = axios.create({
baseURL: 'https://cricbuddy-backend.onrender.com/api',
  withCredentials: true, 
});

export default api;
