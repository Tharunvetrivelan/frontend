import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import api from "./api"; 

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    const validateToken = async () => {
      try {
        const response = await api.get("/student/validate");
        
      } catch (error) {
        navigate("/", { replace: true });
      }
    };

    validateToken();
  }, [token, navigate]);

  return token ? children : null;
};

export default PrivateRoute;

// const PrivateRoute = ({ children }) => {
//     const token = Cookies.get("token");
//     const navigate = useNavigate();
  
//     const validateToken = async () => { 
//       try {
//         await api.get("/auth/validate");
//       } catch (error) {
//         navigate("/", { replace: true });
//       }
//     };
//     validateToken(); 
  
//     return token ? children : <Navigate to="/" replace />;
//   };