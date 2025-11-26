import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
  // Use the configured API base (build-time or runtime override)
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor to handle errors globally or log them
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    if (error.code === "ERR_NETWORK") {
      console.error(`Network Error: Unable to connect to backend at ${API_BASE_URL}`);
    }
    return Promise.reject(error);
  }
);

export default api;
