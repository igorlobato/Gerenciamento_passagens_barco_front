import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    numero: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.register(formData);
      navigate('/login', { state: { message: 'Cadastro realizado! Verifique seu e-mail.' } });
    } catch (err) {
      setError(err.error || 'Erro ao cadastrar.');
    }
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="12345678901"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numero">Número</label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            placeholder="(99)99999-9999"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">Confirmar Senha</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">
          Cadastrar
        </button>
      </form>
      <div className="toggle-form">
        <a href="/login">Já tem uma conta? Faça login</a>
      </div>
    </div>
  );
}

export default Register;