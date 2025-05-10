import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from './api';
import '../css/resetpassword.css';
import { Modal } from 'antd';

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [formData, setFormData] = useState({
    password: '',
    confirmpassword: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showModal = (message, success = false) => {
    setModalMessage(message);
    setIsSuccess(success);
    setModalVisible(true);
  };

  const handleModalOk = () => {
    setModalVisible(false);
    if (isSuccess) {
      navigate('/login');
    } else if (modalMessage.includes('Email not provided')) {
      navigate('/forgotpassword');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      showModal("Passwords don't match");
      return;
    }
    if (!email) {
      showModal('Email not provided, please go back and provide email.');
      return;
    }
    try {
      const response = await api.put('/login/reset', {
        email,
        password: formData.password,
      });
      if (response.status === 200) {
        showModal('Password changed successfully!', true);
      }
    } catch (e) {
      showModal(`Error: ${e.response?.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <section className="reset-section">
      <div className="reset-container">
        <h2 className="reset-title">Reset Password</h2>
        <p className="reset-text">
          Resetting for: <strong>{email || 'No email provided'}</strong>
        </p>

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

        <Modal
          title={isSuccess ? 'Success' : 'Error'}
          open={modalVisible}
          onOk={handleModalOk}
          onCancel={handleModalOk}
          okText="OK"
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <p>{modalMessage}</p>
        </Modal>
      </div>
    </section>
  );
}

export default ResetPassword;