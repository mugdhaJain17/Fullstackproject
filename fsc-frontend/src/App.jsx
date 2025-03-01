import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ContactPage from './pages/ContactPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './pages/Profile';
import AddProduct from './pages/AddProduct';

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // ✅ Manage login modal state

  return (
    <Router>
      <Header onLoginOpen={() => setIsLoginOpen(true)} /> {/* Pass function to open login modal */}
      
      {isLoginOpen && (
        <Login 
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={() => {
            setIsLoginOpen(false); // ✅ Close modal
          }}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/profile" 
          element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />} 
        />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
