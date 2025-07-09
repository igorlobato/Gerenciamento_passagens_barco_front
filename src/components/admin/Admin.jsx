import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import Layout from '../Layout';
import Swal from 'sweetalert2';

function Admin() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [newPermission, setNewPermission] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPermission, setSelectedPermission] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserRole, setSelectedUserRole] = useState('');
  const [rolePermissions, setRolePermissions] = useState({});
  const [userRoles, setUserRoles] = useState({});
  const [error, setError] = useState('');

  // Carregar roles, permissões e usuários
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesResponse, permissionsResponse, usersResponse] = await Promise.all([
          adminService.getRoles(),
          adminService.getPermissions(),
          adminService.getUsers(),
        ]);
        setRoles(rolesResponse.data || []);
        setPermissions(permissionsResponse.data || []);
        setUsers(usersResponse.data || []);

        // Carregar permissões de cada papel
        const rolePerms = {};
        for (const role of rolesResponse.data) {
          const permsResponse = await adminService.getRolePermissions(role.id);
          rolePerms[role.id] = permsResponse.data.permissions || [];
        }
        setRolePermissions(rolePerms);

        // Carregar papéis de cada usuário
        const userRolesData = {};
        for (const user of usersResponse.data) {
          userRolesData[user.id] = user.roles || [];
        }
        setUserRoles(userRolesData);
      } catch (err) {
        const errorMessage = err.message || err.response?.data?.message || 'Erro ao carregar dados.';
        setError(errorMessage);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: errorMessage,
        });
      }
    };
    fetchData();
  }, []);

  // Criar nova role
  const handleCreateRole = async (e) => {
    e.preventDefault();
    try {
      await adminService.createRole({ name: newRole });
      const response = await adminService.getRoles();
      setRoles(response.data || []);
      setNewRole('');
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Role criada com sucesso!',
      });
    } catch (err) {
      const errorMessage = err.error || err.response?.data?.message || 'Erro ao criar role.';
      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
      });
    }
  };

  // Criar nova permissão
  const handleCreatePermission = async (e) => {
    e.preventDefault();
    try {
      await adminService.createPermission({ name: newPermission });
      const response = await adminService.getPermissions();
      setPermissions(response.data || []);
      setNewPermission('');
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Permissão criada com sucesso!',
      });
    } catch (err) {
      const errorMessage = err.error || err.response?.data?.message || 'Erro ao criar permissão.';
      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
      });
    }
  };

  // Atribuir permissão a um papel
  const handleAssignPermission = async (e) => {
    e.preventDefault();
    if (!selectedRole || !selectedPermission) {
      setError('Selecione um papel e uma permissão.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Selecione um papel e uma permissão.',
      });
      return;
    }
    try {
      await adminService.assignPermission({
        role_id: selectedRole,
        permission_id: selectedPermission,
      });
      const permsResponse = await adminService.getRolePermissions(selectedRole);
      setRolePermissions((prev) => ({
        ...prev,
        [selectedRole]: permsResponse.data.permissions || [],
      }));
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Permissão atribuída com sucesso!',
      });
    } catch (err) {
      const errorMessage = err.message || err.response?.data?.message || 'Erro ao atribuir permissão.';
      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: err.message,
      });
    }
  };

  // Revogar permissão de um papel
  const handleRevokePermission = async (e) => {
    e.preventDefault();
    if (!selectedRole || !selectedPermission) {
      setError('Selecione um papel e uma permissão.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Selecione um papel e uma permissão.',
      });
      return;
    }
    try {
      await adminService.revokePermission({
        role_id: selectedRole,
        permission_id: selectedPermission,
      });
      const permsResponse = await adminService.getRolePermissions(selectedRole);
      setRolePermissions((prev) => ({
        ...prev,
        [selectedRole]: permsResponse.data.permissions || [],
      }));
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Permissão removida com sucesso!',
      });
    } catch (err) {
      const errorMessage = err.message || err.response?.data?.message || 'Erro ao revogar permissão.';
      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
      });
    }
  };

  // Atribuir papel a um usuário
  const handleAssignRole = async (e) => {
    e.preventDefault();
    if (!selectedUser || !selectedUserRole) {
      setError('Selecione um usuário e um papel.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Selecione um usuário e um papel.',
      });
      return;
    }
    try {
      await adminService.assignRole({
        user_id: selectedUser,
        role_id: selectedUserRole,
      });
      const user = users.find((u) => u.id === parseInt(selectedUser));
      userRoles[selectedUser] = userRoles[selectedUser] || [];
      if (!userRoles[selectedUser].some((r) => r.id === parseInt(selectedUserRole))) {
        const role = roles.find((r) => r.id === parseInt(selectedUserRole));
        userRoles[selectedUser].push(role);
        setUserRoles({ ...userRoles });
      }
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Papel atribuído com sucesso!',
      });
    } catch (err) {
      const errorMessage = err.error || err.response?.data?.message || 'Erro ao atribuir papel.';
      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: err.message,
      });
    }
  };

  // Revogar papel de um usuário
  const handleRevokeRole = async (e) => {
    e.preventDefault();
    if (!selectedUser || !selectedUserRole) {
      setError('Selecione um usuário e um papel.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Selecione um usuário e um papel.',
      });
      return;
    }
    try {
      await adminService.revokeRole({
        user_id: selectedUser,
        role_id: selectedUserRole,
      });
      userRoles[selectedUser] = userRoles[selectedUser].filter(
        (r) => r.id !== parseInt(selectedUserRole)
      );
      setUserRoles({ ...userRoles });
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Papel removido com sucesso!',
      });
    } catch (err) {
      const errorMessage = err.error || err.response?.data?.message || 'Erro ao revogar papel.';
      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
      });
    }
  };

  return (
    <Layout showSearchAndCarousel={false}>
      {({ user }) => (
        <div className="dashboard-activation admin">
          <h1 className="dashboard-activation-title">Gerenciar Roles e Permissões</h1>
          {error && <div className="error">{error}</div>}
          <div className="admin-containers">
            <div className="admin-container">
              <h3>Roles</h3>
              <ul>
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <li key={role.id}>{role.name}</li>
                  ))
                ) : (
                  <p>Nenhuma role encontrada.</p>
                )}
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
                {permissions.length > 0 ? (
                  permissions.map((permission) => (
                    <li key={permission.id}>{permission.name}</li>
                  ))
                ) : (
                  <p>Nenhuma permissão encontrada.</p>
                )}
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

            <div className="admin-container">
              <h3>Atribuir Permissões a Papéis</h3>
              <form onSubmit={handleAssignPermission}>
                <div className="login-input-wrap">
                  <span className="login-input-label">Papel</span>
                  <select
                    className="login-input"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    required
                  >
                    <option value="">Selecione um papel</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="login-input-wrap">
                  <span className="login-input-label">Permissão</span>
                  <select
                    className="login-input"
                    value={selectedPermission}
                    onChange={(e) => setSelectedPermission(e.target.value)}
                    required
                  >
                    <option value="">Selecione uma permissão</option>
                    {permissions.map((permission) => (
                      <option key={permission.id} value={permission.id}>
                        {permission.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="login-btn-container">
                  <div className="login-btn-wrap">
                    <div className="login-btn-bg"></div>
                    <button className="login-btn" type="submit">
                      Atribuir Permissão
                    </button>
                  </div>
                </div>
              </form>
              <form onSubmit={handleRevokePermission}>
                <div className="login-btn-container">
                  <div className="login-btn-wrap">
                    <div className="login-btn-bg"></div>
                    <button className="login-btn" type="submit">
                      Revogar Permissão
                    </button>
                  </div>
                </div>
              </form>
              {selectedRole && (
                <div>
                  <h4>Permissões do Papel Selecionado</h4>
                  <ul>
                    {rolePermissions[selectedRole]?.length > 0 ? (
                      rolePermissions[selectedRole].map((permission) => (
                        <li key={permission.id}>{permission.name}</li>
                      ))
                    ) : (
                      <p>Nenhuma permissão atribuída.</p>
                    )}
                  </ul>
                </div>
              )}

              <h3>Atribuir Papéis a Usuários</h3>
              <form onSubmit={handleAssignRole}>
                <div className="login-input-wrap">
                  <span className="login-input-label">Usuário</span>
                  <select
                    className="login-input"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    required
                  >
                    <option value="">Selecione um usuário</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="login-input-wrap">
                  <span className="login-input-label">Papel</span>
                  <select
                    className="login-input"
                    value={selectedUserRole}
                    onChange={(e) => setSelectedUserRole(e.target.value)}
                    required
                  >
                    <option value="">Selecione um papel</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="login-btn-container">
                  <div className="login-btn-wrap">
                    <div className="login-btn-bg"></div>
                    <button className="login-btn" type="submit">
                      Atribuir Papel
                    </button>
                  </div>
                </div>
              </form>
              <form onSubmit={handleRevokeRole}>
                <div className="login-btn-container">
                  <div className="login-btn-wrap">
                    <div className="login-btn-bg"></div>
                    <button className="login-btn" type="submit">
                      Revogar Papel
                    </button>
                  </div>
                </div>
              </form>
              {selectedUser && (
                <div>
                  <h4>Papéis do Usuário Selecionado</h4>
                  <ul>
                    {userRoles[selectedUser]?.length > 0 ? (
                      userRoles[selectedUser].map((role) => (
                        <li key={role.id}>{role.name}</li>
                      ))
                    ) : (
                      <p>Nenhum papel atribuído.</p>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Admin;