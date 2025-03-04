import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
const PrivateRoute = ({ children }) => {
    const token = Cookies.get("token"); 
    if(!token){
        return <Navigate to="/login"/>
    }
    
    try{
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if(isExpired){
            Cookies.remove("token");
            return <Navigate to="/login"/>
        }
        return children;
    }catch(e){
        Cookies.remove("token");
        return <Navigate to="/login"/>
    }
};

export default PrivateRoute;
