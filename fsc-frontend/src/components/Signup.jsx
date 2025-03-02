import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [farmerData, setFarmerData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
  });

  const [customerData, setCustomerData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
  });

  const handleChange = (e, role) => {
    if (role === 'farmer') {
      setFarmerData({ ...farmerData, [e.target.name]: e.target.value });
    } else {
      setCustomerData({ ...customerData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e, role) => {
    e.preventDefault();
    const formToSend = role === 'farmer' ? farmerData : customerData;

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formToSend, role }),
      });

      if (response.ok) {
        alert(`Signup successful as ${role}! You can now log in.`);
        if (role === 'farmer') {
          setFarmerData({ fullName: '', email: '', password: '', mobile: '' });
        } else {
          setCustomerData({ fullName: '', email: '', password: '', mobile: '' });
        }
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
        <form onSubmit={(e) => handleSubmit(e, 'farmer')}>
          <input type="text" name="fullName" placeholder="Full Name" value={farmerData.fullName} onChange={(e) => handleChange(e, 'farmer')} required />
          <input type="email" name="email" placeholder="Email" value={farmerData.email} onChange={(e) => handleChange(e, 'farmer')} required />
          <input type="password" name="password" placeholder="Password" value={farmerData.password} onChange={(e) => handleChange(e, 'farmer')} required />
          <input type="text" name="mobile" placeholder="Mobile Number" value={farmerData.mobile} onChange={(e) => handleChange(e, 'farmer')} required />
          <button type="submit" className="btn">Signup as Farmer</button>
        </form>
      </div>

      <div className="signup-form right">
        <h2>Customer Signup</h2>
        <form onSubmit={(e) => handleSubmit(e, 'customer')}>
          <input type="text" name="fullName" placeholder="Full Name" value={customerData.fullName} onChange={(e) => handleChange(e, 'customer')} required />
          <input type="email" name="email" placeholder="Email" value={customerData.email} onChange={(e) => handleChange(e, 'customer')} required />
          <input type="password" name="password" placeholder="Password" value={customerData.password} onChange={(e) => handleChange(e, 'customer')} required />
          <input type="text" name="mobile" placeholder="Mobile Number" value={customerData.mobile} onChange={(e) => handleChange(e, 'customer')} required />
          <button type="submit" className="btn">Signup as Customer</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
