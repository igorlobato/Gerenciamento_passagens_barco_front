import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Navbar from './Navbar';
import SearchForm from './SearchForm';
import OfferCarousel from './OfferCarousel';
import Footer from './Footer';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        const userData = await authService.getUser();
        if (mounted) {
          setUser(userData);
        }
      } catch (err) {
        if (mounted) {
          setError(err.error || 'Erro ao carregar usuário.');
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchUser();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleResendActivation = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!user || !user.email) {
      setError('Usuário não carregado. Tente novamente.');
      return;
    }
    try {
      const response = await authService.resendActivation(user.email);
      setMessage(response.message || 'Novo link de ativação enviado para seu e-mail.');
    } catch (err) {
      setError(err.error || 'Erro ao reenviar link de ativação.');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (err) {
      setError(err.error || 'Erro ao fazer logout.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="flex-grow">
        {!user.ativo ? (
          <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Conta não ativada</h1>
            <p className="text-gray-600 mb-4">
              Sua conta ainda não está ativada. Verifique seu e-mail ou clique abaixo para reenviar o link.
            </p>
            {message && <p className="text-green-600 mb-4">{message}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleResendActivation}>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full px-4 py-2 mb-4 border rounded-md text-gray-700"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Reenviar Link
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="relative bg-blue-800 h-48 flex items-center justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Bem-vindo(a), {user.name}!
              </h1>
            </div>
            <SearchForm />
            <OfferCarousel />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;