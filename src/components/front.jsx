import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd'; 
import '../css/front.css';

function Front() {
    const navigate = useNavigate();
    return (
        <div className="container">
            <h1 style={{placeSelf:"center"}}>Front Page</h1>
            <div className="buttonalignment">
                <Button onClick={() => navigate("/signup")} className="front-button">
                Sign Up
                </Button>
                <Button  onClick={() => navigate("/login")} className="front-button">
                Log In
                </Button>
            </div>
        </div>
    );
}

export default Front;