import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api.js';
import '../css/forgotpassword.css';
import Errorbox from '../components/errorbox.jsx';
import useErrorbox from '../hooks/useErrorBox.jsx';
function ForgotPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState('');
 
  const handleChange = (e) => {
    setData(e.target.value);
  };

  const {errorVisible,errorMessage,showErrorDialog,handleErrorOk} = useErrorbox();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data) {
      showErrorDialog('Enter your Gmail');
      return;
    }
    try {
      const response = await api.post('/login/forgot', { email: data });
      if (response.status === 200) {
        navigate('/resetpassword', { state: { email: data } });
      }
    } catch (error) {
      console.log('Error:', error);
      if (error.response?.status === 404 || error.response?.status === 400) {
        showErrorDialog('Email not found. Please enter a registered email.');
      } else {
        showErrorDialog('Failed to request password reset. Try again later.');
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
        <Errorbox
    visible={errorVisible}
    message={errorMessage}
    onClose={handleErrorOk}
  />
      </div>
    </section>
  );
}

export default ForgotPassword;