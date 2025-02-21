import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/front.css';
function Front(){
    const navigate = useNavigate();
    return(
        
            <div>
                <h1>Front Page</h1>
            
            <div className="buttonalignment">
                <button onClick={()=>navigate("/signup")}>signup</button>
                <button onClick={()=>navigate("/login")}>login</button>
            </div>
            
            </div>
    );
};

export default Front;