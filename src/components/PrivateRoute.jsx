// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

function PrivateRoute({ children, adminOnly = false }) {
  const user = authService.getUser();
  const isAdmin = user && user.roles && user.roles.includes('admin');

  const token = authService.getToken();
  if (!user && !token) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin && !token) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default PrivateRoute;