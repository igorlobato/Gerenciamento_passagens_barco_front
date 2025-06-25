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
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold">BarcoPass</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded-md">Home</a>
            <a href="#" className="hover:bg-blue-700 px-3 py-2 rounded-md">Passagens</a>
            <a href="#" className="hover:bg-blue-700 px-3 py-2 rounded-md">Sobre</a>
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 hover:bg-blue-700 px-3 py-2 rounded-md"
                >
                  <FaUserCircle className="h-6 w-6" />
                  <span>{user.name}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Perfil</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Minhas Compras</a>
                    <a href="/redefinir" className="block px-4 py-2 hover:bg-gray-100">Redefinir Senha</a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/dashboard" className="block hover:bg-blue-700 px-3 py-2 rounded-md">Home</a>
            <a href="#" className="block hover:bg-blue-700 px-3 py-2 rounded-md">Passagens</a>
            <a href="#" className="block hover:bg-blue-700 px-3 py-2 rounded-md">Sobre</a>
            {user && (
              <>
                <a href="#" className="block hover:bg-blue-700 px-3 py-2 rounded-md">Perfil</a>
                <a href="#" className="block hover:bg-blue-700 px-3 py-2 rounded-md">Minhas Compras</a>
                <a href="/redefinir" className="block hover:bg-blue-700 px-3 py-2 rounded-md">Redefinir Senha</a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left hover:bg-blue-700 px-3 py-2 rounded-md"
                >
                  Sair
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;