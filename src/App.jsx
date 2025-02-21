import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from "./components/front.jsx";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Home from "./components/home.jsx";
import PrivateRoute from "./components/privateroute.jsx";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
