import api from './api';

export const dishService = {
  async getAllDishes(category = '', search = '') {
    const params = {};
    if (category) params.category = category;
    if (search) params.search = search;
    
    const response = await api.get('/api/dishes', { params });
    return response.data;
  },

  async getDishById(id) {
    const response = await api.get(`/api/dishes/${id}`);
    return response.data;
  },

  async createDish(dishData) {
    const response = await api.post('/api/dishes', dishData);
    return response.data;
  },

  async updateDish(id, dishData) {
    const response = await api.put(`/api/dishes/${id}`, dishData);
    return response.data;
  },

  async deleteDish(id) {
    await api.delete(`/api/dishes/${id}`);
  },
};