import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './components/Login.jsx';
import Redefinir from './components/Redefinir.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import Activation from './components/Activation.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="reenviarsenha" element={<Redefinir />} />
        <Route path="reset-password" element={<ResetPassword />} />

        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/activate" element={<Activation />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
