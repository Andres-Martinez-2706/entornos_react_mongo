import api from './api';

export const authService = {
  async login(username, password) {
    const response = await api.post('/api/auth/login', { username, password });
    const { token } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', username);
    
    return token;
  },

  async register(username, password) {
    const response = await api.post('/api/auth/register', { username, password });
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  getUser() {
    return localStorage.getItem('user');
  },
};