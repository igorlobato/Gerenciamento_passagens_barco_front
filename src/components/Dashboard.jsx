import { useState } from 'react';
import authService from '../services/authService';
import Layout from './Layout';
import SearchForm from './SearchForm';
import OfferCarousel from './OfferCarousel';

function Dashboard() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResendActivation = async (e, user) => {
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

  return (
    <Layout>
      {({ user }) => (
        <>
          {!user.ativo ? (
            <div className="dashboard-activation">
              <h1 className="dashboard-activation-title">Conta não ativada</h1>
              <p className="dashboard-activation-text">
                Sua conta ainda não está ativada. Verifique seu e-mail ou clique abaixo para reenviar o link.
              </p>
              {message && <p className="message">{message}</p>}
              {error && <p className="error">{error}</p>}
              <form onSubmit={(e) => handleResendActivation(e, user)}>
                <div className="login-input-wrap" data-validate="E-mail é obrigatório">
                  <span className="login-input-label">E-mail</span>
                  <input
                    className="login-input"
                    type="email"
                    id="email"
                    value={user.email}
                    readOnly
                    placeholder="Digite seu e-mail"
                    required
                  />
                  <span className="login-input-focus"></span>
                </div>
                <button type="submit" className="dashboard-activation-button">
                  Reenviar Link
                </button>
              </form>
            </div>
          ) : (
            <>
              <SearchForm />
              <OfferCarousel />
            </>
          )}
        </>
      )}
    </Layout>
  );
}

export default Dashboard;