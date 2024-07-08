import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'https://16.24.112.93/', // replace with your API base URL
  timeout: 10000, // optional timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (e.g., for adding auth tokens)
api.interceptors.request.use(
  (config) => {
    // You can modify the request here, for example, by adding an authorization token
    const token =JSON.parse(localStorage.getItem('userData'))?.data?.accessToken ;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (e.g., for handling global errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here, for example, logging out on 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Perform logout or redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
