import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      if (err.needs_activation) {
        setError('Sua conta precisa ser ativada. Verifique seu e-mail.');
        navigate('/dashboard');
      } else if (err.message) {
        // Alguns backends podem usar 'message' em vez de 'error'
        setError(err.message);
      } else {
        // Mensagem genérica para qualquer outro erro inesperado
        setError('Ocorreu um erro desconhecido ao tentar logar. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Entrar
        </button>
      </form>
      <div className="toggle-form">
        <a href="/register">Não tem uma conta? Cadastre-se</a>
        <br />
        <a href="/reenviarsenha">Esqueci minha senha.</a>
      </div>
    </div>
  );
}

export default Login;