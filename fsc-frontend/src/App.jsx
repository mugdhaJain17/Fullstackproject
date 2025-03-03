import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import ContactPage from './pages/ContactPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './pages/Profile';
import AddProduct from './pages/AddProduct';

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <Router>
      <Header onLoginOpen={() => setIsLoginOpen(true)} />
      
      {isLoginOpen && (
        <Login 
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={() => {
            setIsLoginOpen(false);
            window.location.reload();
          }}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route 
          path="/profile" 
          element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated() ? <Navigate to="/profile" /> : <Login onLoginSuccess={() => window.location.reload()} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
