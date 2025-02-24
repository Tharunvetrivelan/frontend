import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
const PrivateRoute = ({ children }) => {
    const token = Cookies.get("token"); 
    const isAuthenticated = !!token; 
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
