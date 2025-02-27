import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from './api';
import '../css/resetpassword.css';

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [formData, setFormData] = useState({
    password: "",
    confirmpassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords don't match");
      return;
    }
    if (!email) {
      alert("Email not provided, please go back and provide email.");
      navigate('/forgotpassword');
      return;
    }
    try {
      const response = await api.put('/login/reset', {
        email,
        password: formData.password
      });
      if (response.status === 200) {
        alert("Password changed successfully!");
        navigate('/login');
      }
    } catch (e) {
      alert("Error: " + (e.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <section className="reset-section">
      <div className="reset-container">
        <h2 className="reset-title">Reset Password</h2>
        <p className="reset-text">Resetting for: <strong>{email || "No email provided"}</strong></p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="reset-input"
            placeholder="New Password"
            required
          />
          <input
            type="password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            className="reset-input"
            placeholder="Confirm Password"
            required
          />
          <button type="submit" className="reset-btn">Reset Password</button>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
