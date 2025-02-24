import React, { useState } from 'react';
import '../css/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login() {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
            name:"",
            password:""
        });
    const [loading, setLoading] = useState(false);
    
        const handleChange =(e)=>{
          setFormData({...formData,[e.target.name]:e.target.value});
      };
      
    const handleLogin = async(e) =>{
        e.preventDefault();
        if(!formData.name || !formData.password){
          alert("Please fill all the fields");
          return;
        }
        setLoading(true);
        try {
          const response = await axios.post("http://localhost:3000/login", {
              name: formData.name,
              password: formData.password,
          });
          if (response.data.token) {
              Cookies.set("token", response.data.token, { expires: 1 });
              navigate("/home");
          }
      } catch (error) {
          console.log(error);
          alert("Failed to login");
      } finally {
          setLoading(false);
      }
    };
    
  return (
    <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="email" name="name" value={formData.name} onChange={handleChange} required/>
                <input type="password" placeholder="password" name="password" value={formData.password} onChange={handleChange} required/>
                <button type="submit" disabled={loading}>
    {loading ? "Logging in..." : "Login"}
</button>
            </form>
        </div>
  )
}
