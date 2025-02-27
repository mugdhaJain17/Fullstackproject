import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    role: 'farmer' // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Signup successful! You can now log in.');
      } else {
        const result = await response.json();
        alert(result.error || 'Signup failed');
      }
    } catch (error) {
      alert('Error connecting to server');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form left">
        <h2>Farmer Signup</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
          <button type="submit" className="btn" onClick={() => handleRoleChange('farmer')}>
            Signup as Farmer
          </button>
        </form>
      </div>

      <div className="signup-form right">
        <h2>Customer Signup</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
          <button type="submit" className="btn" onClick={() => handleRoleChange('customer')}>
            Signup as Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
