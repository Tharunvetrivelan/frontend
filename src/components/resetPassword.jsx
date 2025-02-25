import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import api from './api';

function ResetPassword() {
const navigate = useNavigate();
const location = useLocation();
const email = location.state?.email || '';
const [formData,setFormData] = useState({
            password:"",
            confirmpassword:""
        });
const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}
const handleSubmit=async(e)=>{
    e.preventDefault();
    if(formData.password!== formData.confirmpassword){
        alert("Passwords don't match");
        return;
    }
    if(!email){
        alert("email not provided please go back and provide email");
        navigate('/forgotpassword');
        return;
    }
    try{
    const response = await api.put('/login/reset',{
        email,password: formData.password
    }); 
    if(response.status === 200){
        alert("Password changed!!");
        navigate('/login');
    }
}
    catch(e){
        alert("error:"+(e.response?.data?.message || "error unknown"));
    }
}
return (
    <div>
      <h2>Reset Password</h2>
      <p>Resetting for: {email || "No email provided"}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password"
          required
        />
        <input
          type="password"
          name="confirmpassword"
          value={formData.confirmpassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
