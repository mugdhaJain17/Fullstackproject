import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import './Header.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">AGROMART</Link>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          {!isAuthenticated ? (
            <>
              <button className="btn login-btn" onClick={() => setShowLogin(true)}>Login</button>
              <Link to="/signup">
                <button className="btn signup-btn">Signup</button>
              </Link>
            </>
          ) : (
            <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </header>

      {showLogin && <Login onClose={() => setShowLogin(false)} onLoginSuccess={() => setIsAuthenticated(true)} />}
    </>
  );
};

export default Header;

