import '@ant-design/v5-patch-for-react-19';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import PrivateRoute from "./pages/privateroute.jsx";
import StudentForm from "./pages/StudentForm";
import EditStudent from "./pages/EditStudent";
import StudentDetails from "./pages/StudentDetails";
import ForgotPassword from "./pages/forgotPassword.jsx";
import ResetPassword from "./pages/resetPassword.jsx";
import INFINITESCROLL from './pages/InfiniteScroll.jsx';
import HomePage from './pages/HomePage.jsx';
import "./App.css";
import AdoptionForm from './pages/AdoptionForm.jsx';




class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Something went wrong. Please try again.</h1>;
    }
    return this.props.children;
  }
}
function App() {
  const location = window.location.pathname;
  return (
    <BrowserRouter>
      <div data-route={location}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/adoption" element={<AdoptionForm />} />  
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/create-student" element={<StudentForm />} />
                  <Route path="/edit-student/:id" element={<EditStudent />} />
                  <Route path="/student/:id" element={<StudentDetails />} />
                  <Route path="/infiniteScroll" element={<INFINITESCROLL/>} />
                </Routes>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;