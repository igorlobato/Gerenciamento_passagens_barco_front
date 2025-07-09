import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Redefinir() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const redefinir = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await authService.resendPassword(email);
      setMessage(response.message || 'Link de ativação enviado para seu e-mail.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-background">
      <div className="login-wrap">
          {message && <div className="message">{message}</div>}
          {error && <div className="error">{error}</div>}
          <form className="activation-form" onSubmit={redefinir}>
            <span className="login-form-title">Redefinir senha</span>
            <p>Para redefinir sua senha digite seu e-mail no campo abaixo e clique em redefinir senha.</p>
            <div className="login-input-wrap" data-validate="E-mail é obrigatório">
              <span className="login-input-label">E-mail</span>
              <input
                className="login-input"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
              />
              <span className="login-input-focus"></span>
            </div>
            <div className="login-btn-container">
              <div className="login-btn-wrap">
                <div className="login-btn-bg"></div>
                <button className="login-btn" type="submit">
                  Redefinir Senha
                </button>
              </div>
            </div>
          </form>
        <br />
        <div className="toggle-form">
          <a href="/login">Voltar para o login</a>
        </div>
      </div>
    </div>
  );
}

export default Redefinir;