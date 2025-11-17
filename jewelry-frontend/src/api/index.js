import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
});

// attach token if present
api.interceptors.request.use((config) => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    const token = JSON.parse(auth).token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
