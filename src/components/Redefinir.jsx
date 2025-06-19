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
    <div className="dashboard-container">
          <h1>Redefinir senha</h1>
          <p>Para redefinir sua senha digite seu e-mail no campo abaixo e clique em redefinir senha.</p>
          {message && <div className="message">{message}</div>}
          {error && <div className="error">{error}</div>}
          <form className="activation-form" onSubmit={redefinir}>
            <label htmlFor="email">E-mail: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Redefinir Senha</button>
          </form>
    </div>
  );
}

export default Redefinir;