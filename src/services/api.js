import axios from 'axios';

const api = axios.create({
  withCredentials: true, // required for cookie-based auth
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized globally
    if (error.response && error.response.status === 401) {
      window.dispatchEvent(new Event('auth-error'));
    }
    return Promise.reject(error);
  }
);

export default api;
