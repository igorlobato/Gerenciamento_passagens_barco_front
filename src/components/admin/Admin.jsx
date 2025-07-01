import { useState, useEffect } from 'react';
import authService from '../../services/authService';
import adminService from '../../services/adminService'
import Swal from 'sweetalert2';

function Admin() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [newPermission, setNewPermission] = useState('');
  const [error, setError] = useState('');

  // Carregar roles e permissões
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesResponse, permissionsResponse] = await Promise.all([
          adminService.getRoles(),
          adminService.getPermissions(),
        ]);
        setRoles(rolesResponse.data);
        setPermissions(permissionsResponse.data);
      } catch (err) {
        if (err.message) {
            // Alguns backends podem usar 'message' em vez de 'error'
            setError(err.message);
        } 
      }
    };
    fetchData();
  }, []);

  // Criar nova role
  const handleCreateRole = async (e) => {
    e.preventDefault();
    try {
      await authService.createRole({ name: newRole });
      const response = await authService.getRoles();
      setRoles(response.data);
      setNewRole('');
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Role criada com sucesso!',
      });
    } catch (err) {
      setError('Erro ao criar role.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao criar role.',
      });
    }
  };

  // Criar nova permissão
  const handleCreatePermission = async (e) => {
    e.preventDefault();
    try {
      await authService.createPermission({ name: newPermission });
      const response = await authService.getPermissions();
      setPermissions(response.data);
      setNewPermission('');
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Permissão criada com sucesso!',
      });
    } catch (err) {
      setError('Erro ao criar permissão.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao criar permissão.',
      });
    }
  };

  return (
    <div className="login-background">
      <div className="login-wrap">
        <div className="login-form">
          <span className="login-form-title">Gerenciar Roles e Permissões</span>
          {error && <div className="error">{error}</div>}
          
          <h3>Roles</h3>
          <ul>
            {roles.map((role) => (
              <li key={role.id}>{role.name}</li>
            ))}
          </ul>
          <form onSubmit={handleCreateRole}>
            <div className="login-input-wrap" data-validate="Nome da role é obrigatório">
              <span className="login-input-label">Nova Role</span>
              <input
                className="login-input"
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="Digite o nome da role"
                required
              />
              <span className="login-input-focus"></span>
            </div>
            <div className="login-btn-container">
              <div className="login-btn-wrap">
                <div className="login-btn-bg"></div>
                <button className="login-btn" type="submit">
                  Criar Role
                </button>
              </div>
            </div>
          </form>

          <h3>Permissões</h3>
          <ul>
            {/* {permissions.map((permission) => (
              <li key={permission.id}>{permission.name}</li>
            ))} */}
          </ul>
          <form onSubmit={handleCreatePermission}>
            <div className="login-input-wrap" data-validate="Nome da permissão é obrigatório">
              <span className="login-input-label">Nova Permissão</span>
              <input
                className="login-input"
                type="text"
                value={newPermission}
                onChange={(e) => setNewPermission(e.target.value)}
                placeholder="Digite o nome da permissão"
                required
              />
              <span className="login-input-focus"></span>
            </div>
            <div className="login-btn-container">
              <div className="login-btn-wrap">
                <div className="login-btn-bg"></div>
                <button className="login-btn" type="submit">
                  Criar Permissão
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;