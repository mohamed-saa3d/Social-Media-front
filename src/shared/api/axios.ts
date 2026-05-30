import axios from 'axios';

// Minimal axios instance. Keep logic in interceptors and shared/api/request.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  withCredentials: true,
});
