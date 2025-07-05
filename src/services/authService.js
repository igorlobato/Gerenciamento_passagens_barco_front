import axios from 'axios';

const API_URL = '/api'; // Proxy lida com http://localhost:8000/api

function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Erro ao decodificar token:', e);
    return null;
  }
}

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
        localStorage.setItem('user_id', response.data.user_id);
      }
      return response.data;
    } catch (error) {
      console.error('Erro de login (authService):', error.response);
      throw error.response?.data || { error: 'Erro ao fazer login.' };
    }
  },

  verifyCaptcha: async (token) => {
    try {
      const response = await axios.post(`${API_URL}/verify-captcha`, {
        'g-recaptcha-response': token,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao verificar CAPTCHA (authService):', error.response);
      throw error.response?.data || { error: 'Erro ao verificar CAPTCHA.' };
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
      localStorage.removeItem('user_id');
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      throw error.response?.data || { error: 'Erro ao fazer logout.' };
    }
  },

  async getUser() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Não autenticado.');
        const decoded = decodeToken(token);
        console.log('Token decodificado:', decoded); // Log pra debug
        if (!decoded || !decoded.sub) throw new Error('ID do usuário não encontrado no token.');
        const response = await axios.get(`${API_URL}/users/${decoded.sub}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('User data:', response.data); // Log pra debug
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar usuário:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
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

  async resendPassword(email) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/reset-password`,
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

  async resetPassword(data) {
    try {
      const response = await axios.post(`${API_URL}/reset-password/confirm`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao redefinir senha:', {
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error.response?.data || { error: 'Erro ao redefinir senha.' };
    }
  },

  getToken() {
    return localStorage.getItem('token');
  },
};

export default authService;