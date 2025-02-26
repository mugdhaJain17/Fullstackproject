import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [isFarmer, setIsFarmer] = useState(true);

  return (
    <div className="signup-container">
      <div className="signup-form left">
        <h2>Farmer Signup</h2>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="btn">Signup as Farmer</button>
      </div>

      <div className="signup-form right">
        <h2>Customer Signup</h2>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="btn">Signup as Customer</button>
      </div>
    </div>
  );
};

export default Signup;
