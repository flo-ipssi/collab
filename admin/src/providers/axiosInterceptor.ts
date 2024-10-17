import axios, { InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api';

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    
    if (token) {
      if (config.headers instanceof AxiosHeaders) {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        config.headers = new AxiosHeaders();
        config.headers.set('Authorization', `Bearer ${token}`);
      }
    }
    
    return config;
  },
  (error) => {
    
      if (error.response.status === 401 || error.response.status === 403) {
        console.error('Non autorisé ou accès refusé.');
        // Rediriger l'utilisateur vers la page de connexion
      }
    return Promise.reject(error);
  }
);

export default axiosInstance;
