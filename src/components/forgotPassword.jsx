import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api.js';
import '../css/forgotpassword.css';
import { Modal } from 'antd';

function ForgotPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [errorVisible, setErrorVisible] = useState(false); // State for error Modal
  const [errorMessage, setErrorMessage] = useState(''); // Store error message

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const showErrorDialog = (message) => {
    setErrorMessage(message); // Set the message
    setErrorVisible(true); // Show the Modal
  };

  const handleErrorOk = () => {
    setErrorVisible(false); // Close the Modal
  };

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

        
        <Modal
          title="Error"
          open={errorVisible} 
          onOk={handleErrorOk}
          onCancel={handleErrorOk} 
          okText="OK"
          cancelButtonProps={{ style: { display: 'none' } }} 
        >
          <p>{errorMessage}</p>
        </Modal>
      </div>
    </section>
  );
}

export default ForgotPassword;