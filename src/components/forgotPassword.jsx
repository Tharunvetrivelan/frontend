import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api.js'; 

function ForgotPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState('');

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleClick = async (e) => {
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
    <div>
      forgot? 😂😂
      <br />
      <label htmlFor="existingmail">Enter Mail:</label>
      <input
        type="email"
        value={data} 
        onChange={handleChange}
      />
      <br />
      <button onClick={handleClick}>Reset password</button>
    </div>
  );
}

export default ForgotPassword;