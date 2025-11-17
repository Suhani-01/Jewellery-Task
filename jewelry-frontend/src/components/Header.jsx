import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header(){
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-wide hover:opacity-80 transition">
          Jewelry
        </Link>

        {/* Nav Items */}
        <nav className="flex items-center gap-6">
          <Link 
            to="/products" 
            className="text-gray-700 hover:text-black transition font-medium">
            Products
          </Link>

          <Link 
            to="/categories" 
            className="text-gray-700 hover:text-black transition font-medium">
            Categories
          </Link>

          {/* Admin Only: Edit Database */}
          {user?.role === "admin" && (
            <Link
              to="/admin/database"
              className="text-sm px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm"
            >
              Edit Database
            </Link>
          )}

          {user ? (
            <>
              <span className="text-sm text-gray-600">Hi, {user.name}</span>

              <button
                className="text-sm px-4 py-1.5 border rounded-lg hover:bg-gray-100 transition shadow-sm"
                onClick={() => { logout(); nav('/'); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm px-4 py-1.5 border rounded-lg hover:bg-gray-100 transition shadow-sm">
                Login
              </Link>

              <Link 
                to="/register" 
                className="text-sm px-4 py-1.5 bg-black text-white rounded-lg hover:bg-gray-900 transition shadow-sm">
                Register
              </Link>
            </>
          )}
        </nav>

      </div>
    </header>
  );
}
