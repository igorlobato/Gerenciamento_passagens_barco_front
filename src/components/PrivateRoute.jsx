import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

function PrivateRoute({ children, adminOnly = false }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        const userData = await authService.getUser();
        if (mounted) {
          setUser(userData);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          localStorage.removeItem('token');
          setLoading(false);
        }
      }
    };
    fetchUser();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div className="dashboard"><p className="dashboard-loading">Carregando...</p></div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user.permissions.includes('papel_permissao')) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default PrivateRoute;