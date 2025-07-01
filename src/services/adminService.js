import axios from "axios";

const API_URL = '/api';

const adminService = {
    async getRoles() {
        try{
            return await axios.get(`${API_URL}/roles`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        }catch(error){
            throw error.response?.data || { error: 'Erro ao obter perfis.' };
        }
    },

    // getRoles: async () => {
    //     return await axios.get(`${API_URL}/roles`, {
    //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    //     });
    // },

    createRole: async (data) => {
        return await axios.post(`${API_URL}/roles`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
    },

    getPermissions: async () => {
        return await axios.get(`${API_URL}/permissions`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
    },

    createPermission: async (data) => {
        return await axios.post(`${API_URL}/permissions`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
    },
};

export default adminService;