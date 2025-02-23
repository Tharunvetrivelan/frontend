import React, { useState } from 'react';
import '../css/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
            name:"",
            password:""
        });
    
        const handleChange =(e)=>{
          setFormData({...formData,[e.target.name]:e.target.value});
      };
      
    const handleLogin = async(e) =>{
        e.preventDefault();
        try{
          const response = await axios.post("http://localhost:3000/login",{
              name:formData.name,
              password:formData.password
          });
          console.log(response);
          if (response.data.token) {
            localStorage.setItem("token", response.data.token); // Store token
            navigate("/home");
        }
      }
      catch(error){
        console.log(error);
        alert("failed to login");
      };
    };
    
  return (
    <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input placeholder="email" name="name" value={formData.name} onChange={handleChange} required/>
                <input placeholder="password" name="password" value={formData.password} onChange={handleChange} required/>
                <button type="submit"></button>
            </form>
        </div>
  )
}
