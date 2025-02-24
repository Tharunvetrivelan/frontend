import React from 'react'
import '../css/home.css'
import Cookies from 'js-cookie'; 
const handleLogout = () => {
    Cookies.remove("token"); 
    navigate("/login"); 
};

export default function Home() {
  return (
    <div>
            <h1>Welcome to the Home Page</h1>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
           
        </div>
  )
}
