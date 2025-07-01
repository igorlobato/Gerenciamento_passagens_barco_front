import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Swal from 'sweetalert2';

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

  const handleCpfChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');

    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    if (value.length > 14) {
      value = value.substring(0, 14);
    }
    
    setFormData({ ...formData, cpf: value });
  }

  const handleNumeroChange = (e) => {
    let value = e.target.value;
    // Remove tudo que não é dígito
    value = value.replace(/\D/g, ''); 

    // Aplica a máscara para telefone (com ou sem 9º dígito)
    // (99)9999-9999 ou (99)99999-9999
    if (value.length > 10) { // Se tiver 11 dígitos (com 9º dígito)
      value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 6) { // Se tiver 10 dígitos (sem 9º dígito)
      value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) { // Se tiver mais de 2 dígitos
      value = value.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
    }

    // Limita o tamanho do número (com máscara)
    if (value.length > 16) { // Ex: (99) 99999-9999 tem 15 caracteres
      value = value.substring(0, 16);
    }

    setFormData({ ...formData, numero: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.register(formData); // Use os dados sem máscara aqui

      // Exibe o SweetAlert2 de sucesso
      Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado!',
        text: 'Sua conta foi criada com sucesso. Por favor, verifique seu e-mail para ativá-la.',
        confirmButtonText: 'Ok'
      }).then(() => {
        // Redireciona para a página de login após o usuário fechar o alerta
        navigate('/login');
      });

    } catch (err) {
      // Extrair mensagem de erro
      let errorMessage = 'Erro ao cadastrar. Tente novamente.';
      if (err.errors) {
        // Erros de validação do Laravel
        errorMessage = Object.values(err.errors).flat().join(' ');
      } else if (err.error) {
        // Erro genérico da API
        errorMessage = err.error;
      } else if (err.message) {
        // Erro genérico do Axios
        errorMessage = err.message;
      }
      setError(errorMessage);
        // Opcional: Mostrar um alerta de erro também
        Swal.fire({
            icon: 'error',
            title: 'Erro no Cadastro',
            text: errorMessage,
            confirmButtonText: 'Ok'
        });
    };
  };

  return (
    <div className="login-background">
      <div className="login-wrap">
        <form onSubmit={handleSubmit}>
          <span className="login-form-title">Cadastro</span>
          <div className="login-input-wrap">
            <span className="login-input-label">Nome</span>
            <input
              className="login-input"
              placeholder="Digite seu nome"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <span className="login-input-focus"></span>
          </div>
          <div className="login-input-wrap" data-validate="E-mail é obrigatório">
            <span className="login-input-label">E-mail</span>
            <input
              className="login-input"
              placeholder="Digite seu e-mail"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span className="login-input-focus"></span>
          </div>
          <div className="login-input-wrap">
            <span className="login-input-label">CPF</span>
            <input
              className="login-input"
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleCpfChange}
              placeholder="123.456.789-01"
              maxLength={14}
              required
            />
            <span className="login-input-focus"></span>
          </div>
          <div className="login-input-wrap">
            <span className="login-input-label">Número</span>
            <input
              className="login-input"
              type="text"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleNumeroChange}
              placeholder="(99)99999-9999"
              maxLength={16}
              required
            />
            <span className="login-input-focus"></span>
          </div>
          <div className="login-input-wrap">
            <span className="login-input-label">Senha</span>
            <input
              className="login-input"
              placeholder='Digite sua senha'
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="login-input-focus"></span>
          </div>
          <div className="login-input-wrap">
            <span className="login-input-label">Confirmar Senha</span>
            <input
              className="login-input"
              placeholder='Digite novamente sua senha'
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
            <span className="login-input-focus"></span>
          </div>
          <button type="submit" className="btn">
            Cadastrar
          </button>
        </form>
        <div className="login-signup">
          <span className="login-signup-text">Já tem uma conta?</span>
          <a href="/login" className="login-signup-link">Faça Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;