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
    <div className="login-background">
      <div className="login-wrap">
        <form className="login-form" onSubmit={handleSubmit}>
          <span className="login-form-title">Login</span>
          {error && <div className="error">{error}</div>}
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
          <div className="login-input-wrap" data-validate="Senha é obrigatória">
            <span className="login-input-label">Senha</span>
            <input
              className="login-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
            <span className="login-input-focus"></span>
          </div>
          <div className="login-forgot">
            <a href="/reenviarsenha">Esqueceu a senha?</a>
          </div>
          <div className="login-btn-container">
            <div className="login-btn-wrap">
              <div className="login-btn-bg"></div>
              <button className="login-btn" type="submit">
                Entrar
              </button>
            </div>
          </div>
          <div className="login-signup">
            <span className="login-signup-text">Não tem uma conta?</span>
            <a href="/register" className="login-signup-link">Cadastre-se</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;