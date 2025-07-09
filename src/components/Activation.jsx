import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Activation() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setError('Token inválido.');
        return;
      }

      try {
        const response = await axios.get(`/api/activate?token=${token}`);
        setMessage(response.data.message || 'Conta ativada com sucesso.');
        setTimeout(() => navigate('/login'), 3000);
      } catch (err) {
        setError(err.response?.data.error || 'Erro ao ativar conta.');
      }
    };
    activateAccount();
  }, [searchParams, navigate]);

  return (
    <div className="container">
      <h2>Ativação de Conta</h2>
      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Activation;