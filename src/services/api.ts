import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('@ClickBeard:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError<any>) => {

    if (error.response) {
      const status  = error.response.status;
      const message =
        error.response.data?.message || 'Erro inesperado. Tente novamente.';

      if (status === 401) {
        toast.error('Sessão expirada. Faça login novamente.');
        localStorage.removeItem('@ClickBeard:token');
        window.location.href = '/login';
      } else {
        toast.error(message);
      }
    } else {
      
      toast.error('Falha de conexão com o servidor.');
    }

    return Promise.reject(error);
  }
);

export default api;
