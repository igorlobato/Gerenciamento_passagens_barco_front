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
        try{
        return await axios.post(`${API_URL}/roles`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });}
        catch(error){
            throw error.response?.data || { error: 'Erro ao cadastrar perfil.' };
        }
    },

    createPermission: async (data) => {
        try{
        return await axios.post(`${API_URL}/permissions`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });}
        catch(error){
            throw error.response?.data || { error: 'Erro ao cadastrar permissão.' };
        }
    },

    getPermissions: async () => {
        return await axios.get(`${API_URL}/permissions`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
    },

    getRolePermissions: async (roleId) => {
        return await axios.get(`${API_URL}/roles/${roleId}/permissions`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
    },

    assignRole: async (data) => {
        try {
        return await axios.post(`${API_URL}/roles/assign-role`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        } catch (error) {
        throw error.response?.data || { error: 'Erro ao atribuir papel.' };
        }
    },

    revokeRole: async (data) => {
        try {
        return await axios.post(`${API_URL}/roles/revoke-role`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        } catch (error) {
        throw error.response?.data || { error: 'Erro ao revogar papel.' };
        }
    },

    assignPermission: async (data) => {
        try {
        return await axios.post(`${API_URL}/roles/assign-permission`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        } catch (error) {
        throw error.response?.data || { error: 'Erro ao atribuir permissão.' };
        }
    },

    revokePermission: async (data) => {
        try {
        return await axios.post(`${API_URL}/roles/revoke-permission`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        } catch (error) {
        throw error.response?.data || { error: 'Erro ao revogar permissão.' };
        }
    },

    getUsers: async () => {
        try {
        return await axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        } catch (error) {
        throw error.response?.data || { error: 'Erro ao obter usuários.' };
        }
    },

    getLogs: async () => {
        try{
            return await axios.get(`${API_URL}/logs`,{
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }); 
        }catch (error) {
            throw error.response?.data || { error: 'Erro ao obter logs.' };
        }
    },
};

export default adminService;