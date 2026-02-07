import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({ baseURL: API_BASE });

export const todoApi = {
  getAll: (params) => api.get('/todos', { params }),
  getById: (id) => api.get(`/todos/${id}`),
  create: (data) => api.post('/todos', data),
  update: (id, data) => api.put(`/todos/${id}`, data),
  toggle: (id) => api.patch(`/todos/${id}/toggle`),
  delete: (id) => api.delete(`/todos/${id}`),
  getStats: () => api.get('/todos/stats'),
};

export const categoryApi = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};
