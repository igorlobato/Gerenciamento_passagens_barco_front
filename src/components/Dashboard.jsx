import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getUser();
        setUser(userData);
      } catch (err) {
        setError(err.error || 'Erro ao carregar usuário.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleResendActivation = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await authService.resendActivation(user.email);
      setMessage(response.message || 'Novo link de ativação enviado para seu e-mail.');
    } catch (err) {
      setError(err.error || 'Erro ao reenviar link.');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (err) {
      setError(err.error || 'Erro ao fazer logout.');
    }
  };

  if (!user) return <div>Carregando...</div>;

  return (
    <div className="dashboard-container">
      {user.ativo ? (
        <>
          <h1>Bem-vindo ao sistema!</h1>
          <p>Você está logado com sucesso.</p>
        </>
      ) : (
        <>
          <h1>Conta não ativada</h1>
          <p>Usuário não está ativo. Verifique seu e-mail ou clique abaixo para reenviar o link de ativação.</p>
          {message && <div className="message">{message}</div>}
          {error && <div className="error">{error}</div>}
          <form className="activation-form" onSubmit={handleResendActivation}>
            <input type="email" value={user.email} readOnly />
            <button type="submit">Reenviar Link</button>
          </form>
        </>
      )}
      <a href="#" className="logout-btn" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i> Sair
      </a>
    </div>
  );
}

export default Dashboard;