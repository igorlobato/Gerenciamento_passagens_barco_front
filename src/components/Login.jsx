import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();
  const API_URL = '/api';

  useEffect(() => {
    const checkLoginRequirements = async () => {
      try {
        const response = await axios.get(`${API_URL}/check-login-requirements`);
        if (response.data.show_captcha) {
          setShowCaptcha(true);
        }
      } catch (error) {
        console.error('Erro ao verificar necessidade de CAPTCHA:', error);
      }
    };

    checkLoginRequirements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const credentials = { email, password };
      if (showCaptcha) {
        if (!captchaToken) {
          setError('Por favor, complete o CAPTCHA.');
          return;
        }
        credentials['g-recaptcha-response'] = captchaToken;
      }

      await authService.login(credentials);
      navigate('/dashboard');
    } catch (err) {
      if (err.needs_activation) {
        setError('Sua conta precisa ser ativada. Verifique seu e-mail.');
        navigate('/dashboard');
      } else if (err.attempts_remaining !== undefined) {
        setError(`Credenciais inválidas. Tentativas restantes: ${err.attempts_remaining}`);
        if (err.attempts_remaining === 0 || err.show_captcha) {
          setShowCaptcha(true);
        }
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido ao tentar logar. Tente novamente mais tarde.');
      }

      if (showCaptcha) {
        recaptchaRef.current.reset();
        setCaptchaToken(null);
      }
    }
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
    if (token) {
      authService.verifyCaptcha(token)
        .then(() => {
          setShowCaptcha(false);
          setCaptchaToken(null);
          recaptchaRef.current.reset();
        })
        .catch((err) => {
          setError(err.message || 'Erro ao verificar CAPTCHA.');
          recaptchaRef.current.reset();
          setCaptchaToken(null);
        });
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
          {showCaptcha && (
            <div className="captcha-wrap">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
              />
            </div>
          )}
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