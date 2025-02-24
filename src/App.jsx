import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from "./components/front.jsx";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Home from "./components/home.jsx";
import PrivateRoute from "./components/privateroute.jsx";
import StudentForm from './components/StudentForm';
import EditStudent from './components/EditStudent';
import StudentDetails from './components/StudentDetails';
import './App.css';

import api from './components/api'; 
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/create-student" element={<PrivateRoute><StudentForm /></PrivateRoute>} />
        <Route path="/edit-student/:id" element={<PrivateRoute><EditStudent /></PrivateRoute>} />
        <Route path="/student/:id" element={<PrivateRoute><StudentDetails /></PrivateRoute>} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
