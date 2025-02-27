import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api.js';
import '../css/forgotpassword.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState('');

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data) {
      alert("Enter your Gmail");
      return;
    }
    try {
      const response = await api.post('/login/forgot', { email: data });
      if (response.status === 200) {
        navigate('/resetpassword', { state: { email: data } });
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response?.status === 404) {
        alert("Email not found");
      } else {
        alert("Failed to request password reset");
      }
    }
  };

  return (
    <section className="forgot-section">
      <div className="forgot-container">
        <h2 className="forgot-title">Forgot Password</h2>
        <p className="forgot-text">Enter your email to reset your password.</p>
        
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="forgot-input"
            placeholder="Enter your email"
            value={data}
            onChange={handleChange}
            required
          />
          <button type="submit" className="forgot-btn">Reset Password</button>
        </form>

      </div>
    </section>
  );
}

export default ForgotPassword;
