import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auto-attach JWT token from cookie on client-side requests
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    // Dynamic import avoids SSR issues with js-cookie
    try {
      const raw = document.cookie
        .split('; ')
        .find((row) => row.startsWith('authToken='));
      const token = raw?.split('=')[1];
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // silently ignore cookie read errors
    }
  }
  return config;
});

// Normalise error responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
