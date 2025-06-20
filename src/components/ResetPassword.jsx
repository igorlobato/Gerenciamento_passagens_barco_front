import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../services/authService';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('email');
    if (tokenParam && emailParam) {
      setToken(tokenParam);
      setEmail(emailParam);
    } else {
      setError('Link inválido. Solicite um novo link de redefinição.');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (password !== passwordConfirmation) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      const response = await authService.resetPassword({
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setMessage(response.message || 'Senha redefinida com sucesso. Faça login com sua nova senha.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      console.error('Erro ao redefinir senha:', err);
      setError(err.error || 'Erro ao redefinir senha.');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Redefinir Senha</h1>
      <p>Digite sua nova senha abaixo.</p>
      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}
      <form className="activation-form" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">E-mail: </label>
            <input type="email" id="email" value={email} readOnly />
        </div>
        <br />
        <div>
            <label htmlFor="password">Nova Senha: </label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <br />
        <div>
            <label htmlFor="password_confirmation">Confirmar Senha: </label>
            <input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            />
        </div>
        <br />
        <div>
            <button type="submit" disabled={!token || !email}>
            Confirmar Nova Senha
            </button>
        </div>
      </form>
      <br />
      <div className="toggle-form">
        <a href="/login">Voltar para o login</a>
      </div>
    </div>
  );
}

export default ResetPassword;