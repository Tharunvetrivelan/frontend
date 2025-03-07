import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Home from "./components/home.jsx";
import PrivateRoute from "./components/privateroute.jsx";
import StudentForm from "./components/StudentForm";
import EditStudent from "./components/EditStudent";
import StudentDetails from "./components/StudentDetails";
import ForgotPassword from "./components/forgotPassword.jsx";
import ResetPassword from "./components/resetPassword.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        
        <Route
          path="/*" 
          element={
            <PrivateRoute>
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="create-student" element={<StudentForm />} />
                <Route path="edit-student/:id" element={<EditStudent />} />
                <Route path="student/:id" element={<StudentDetails />} />
              </Routes>
            </PrivateRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;