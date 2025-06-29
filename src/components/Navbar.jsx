import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import authService from '../services/authService';

function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await onLogout();
      setIsDropdownOpen(false);
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="navbar-logo">BarcoPass</span>
        </div>
        <div className="navbar-menu">
          <a href="/dashboard" className="navbar-link">Home</a>
          <a href="#" className="navbar-link">Passagens</a>
          <a href="#" className="navbar-link">Sobre</a>
          {user && (
            <div className="navbar-user">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="navbar-user-button"
              >
                <FaUserCircle className="navbar-user-icon" />
                <span>{user.name}</span>
              </button>
              {isDropdownOpen && (
                <div className="navbar-dropdown">
                  <a href="#" className="navbar-dropdown-item">Perfil</a>
                  <a href="#" className="navbar-dropdown-item">Minhas Compras</a>
                  <a href="/redefinir" className="navbar-dropdown-item">Redefinir Senha</a>
                  <button
                    onClick={handleLogout}
                    className="navbar-dropdown-item navbar-dropdown-button"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="navbar-toggle">
          <button onClick={() => setIsOpen(!isOpen)} className="navbar-toggle-button">
            {isOpen ? <FaTimes className="navbar-icon" /> : <FaBars className="navbar-icon" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="navbar-mobile-menu">
          <a href="/dashboard" className="navbar-mobile-link">Home</a>
          <a href="#" className="navbar-mobile-link">Passagens</a>
          <a href="#" className="navbar-mobile-link">Sobre</a>
          {user && (
            <>
              <a href="#" className="navbar-mobile-link">Perfil</a>
              <a href="#" className="navbar-mobile-link">Minhas Compras</a>
              <a href="/redefinir" className="navbar-mobile-link">Redefinir Senha</a>
              <button
                onClick={handleLogout}
                className="navbar-mobile-link navbar-mobile-button"
              >
                Sair
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;