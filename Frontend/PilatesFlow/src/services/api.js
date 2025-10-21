import axios from 'axios';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const api = axios.create({
  baseURL: 'http://localhost:3001', // URL da API em produção
});

export default api;