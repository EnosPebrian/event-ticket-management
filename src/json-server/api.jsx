import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fomophobia-api.crystalux.web.id',
  // baseURL: 'http://localhost:8002',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('auth')}`,
    'api-key': 'fomophobic',
  },
});

export default api;
