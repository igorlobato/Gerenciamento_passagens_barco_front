import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Navbar from './Navbar';
import SearchForm from './SearchForm';
import OfferCarousel from './OfferCarousel';
import Footer from './Footer';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        const userData = await authService.getUser();
        if (mounted) {
          setUser(userData);
        }
      } catch (err) {
        if (mounted) {
          setError(err.error || 'Erro ao carregar usuário.');
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchUser();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleResendActivation = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!user || !user.email) {
      setError('Usuário não carregado. Tente novamente.');
      return;
    }
    try {
      const response = await authService.resendActivation(user.email);
      setMessage(response.message || 'Novo link de ativação enviado para seu e-mail.');
    } catch (err) {
      setError(err.error || 'Erro ao reenviar link de ativação.');
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

  if (!user) {
    return (
      <div className="dashboard">
        <p className="dashboard-loading">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="dashboard-main">
        {!user.ativo ? (
          <div className="dashboard-activation">
            <h1 className="dashboard-activation-title">Conta não ativada</h1>
            <p className="dashboard-activation-text">
              Sua conta ainda não está ativada. Verifique seu e-mail ou clique abaixo para reenviar o link.
            </p>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleResendActivation}>
              <div className="login-input-wrap" data-validate="E-mail é obrigatório">
                <span className="login-input-label">E-mail</span>
                <input
                  className="login-input"
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                  required
                />
                <span className="login-input-focus"></span>
              </div>
              <button
                type="submit"
                className="dashboard-activation-button"
              >
                Reenviar Link
              </button>
            </form>
          </div>
        ) : (
          <>
          <div>
            
          </div>
            <SearchForm />
            <OfferCarousel />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;