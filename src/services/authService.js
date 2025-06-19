import axios from 'axios';

const API_URL = '/api'; // Proxy lida com http://localhost:8000/api

const authService = {
  async register(data) {
    try {
      const response = await axios.post(`${API_URL}/register`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao cadastrar.' };
    }
  },

  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao fazer login.' };
    }
  },

  async logout() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem('token');
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      throw error.response?.data || { error: 'Erro ao fazer logout.' };
    }
  },

  async getUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Não autenticado.');
      const response = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao buscar usuário.' };
    }
  },

  async resendActivation(email) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/resend-activation`,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao reenviar link.' };
    }
  },

  getToken() {
    return localStorage.getItem('token');
  },
};

export default authService;