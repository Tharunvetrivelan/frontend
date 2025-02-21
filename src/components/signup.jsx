import {React, userState, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/signup.css';

function Signup(){
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        name:"",
        password:""
    });

const handleChange =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
};

const handleSubmit =async (e)=>{
    e.preventDefault();
    try{
        const response = await axios.post("http://localhost:3000/signup",{
            name:formData.name,
            password:formData.password
        });
        if(response){navigate("/login");};
        setFormData({name:"",password:""});
    }
    catch(error){
        console.error("Error");
        alert("Failed to connect to the server");
    }
};

    return(
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="username" name="name" value={formData.name} onChange={handleChange} required/>
                <input placeholder="password" name="password" value={formData.password} onChange={handleChange} required/>
                <button type="submit"></button>
            </form>
        </div>
    );

};
export default Signup;