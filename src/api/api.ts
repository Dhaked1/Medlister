import axios from 'axios';

const api = axios.create({
  baseURL: 'https://meditrack-backend-murex.vercel.app', // Deployed backend on Vercel
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
      console.error("Network Error: Unable to connect to backend at https://meditrack-backend-murex.vercel.app");
    }
    return Promise.reject(error);
  }
);

export default api;
