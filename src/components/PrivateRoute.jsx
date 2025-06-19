// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

function PrivateRoute({ children }) {
  const token = authService.getToken();
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;