import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEntities = async () => {
  const response = await apiClient.get('/entities');
  return response.data;
};
