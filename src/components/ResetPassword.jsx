import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../services/authService';
import Swal from 'sweetalert2';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
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
      Swal.fire({
        icon: 'error',
        title: 'Link Inválido',
        text: 'Link inválido. Solicite um novo link de redefinição.',
        confirmButtonText: 'Ok'
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError('As senhas não coincidem.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'As senhas não coincidem.',
        confirmButtonText: 'Ok'
      });
      return;
    }

    // Validação de senha forte (alinhada com Register.jsx)
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      const message = 'A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.';
      setError(message);
      Swal.fire({
        icon: 'error',
        title: 'Senha Fraca',
        text: message,
        confirmButtonText: 'Ok'
      });
      return;
    }

    try {
      const response = await authService.resetPassword({
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: response.message || 'Senha redefinida com sucesso. Faça login com sua nova senha.',
        confirmButtonText: 'Ok'
      }).then(() => {
        navigate('/login');
      });
    } catch (err) {
      const errorMessage = err.error || 'Erro ao redefinir senha.';
      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
        confirmButtonText: 'Ok'
      });
    }
  };

  return (
    <div className="login-background">
      <div className="login-wrap">
        <form className="login-form" onSubmit={handleSubmit}>
          <span className="login-form-title">Redefinir Senha</span>
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
            <span className="login-input-label">Nova Senha</span>
            <input
              className="login-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua nova senha"
              required
            />
            <span className="login-input-focus"></span>
          </div>
          <div className="login-input-wrap" data-validate="Confirmação de senha é obrigatória">
            <span className="login-input-label">Confirmar Senha</span>
            <input
              className="login-input"
              type="password"
              id="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Confirme sua nova senha"
              required
            />
            <span className="login-input-focus"></span>
          </div>
          <div className="login-btn-container">
            <div className="login-btn-wrap">
              <div className="login-btn-bg"></div>
              <button className="login-btn" type="submit" disabled={!token || !email}>
                Confirmar Nova Senha
              </button>
            </div>
          </div>
          <div className="login-signup">
            <span className="login-signup-text">Já tem uma conta?</span>
            <a href="/login" className="login-signup-link">Voltar para o login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;