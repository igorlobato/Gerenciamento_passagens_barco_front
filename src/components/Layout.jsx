import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Navbar from './Navbar';
import SearchForm from './SearchForm';
import OfferCarousel from './OfferCarousel';
import Footer from './Footer';

function Layout({ children, showSearchAndCarousel = true }) {
  const [user, setUser] = useState(null);
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
      <div className="dashboard">
        <p className="dashboard-loading">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="dashboard-main">
        {error && <div className="error">{error}</div>}
        {children({ user })}
        {showSearchAndCarousel && (
          <>
            <SearchForm />
            <OfferCarousel />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;