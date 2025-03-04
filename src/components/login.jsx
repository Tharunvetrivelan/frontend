import React, { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import api from "./api";

const { Title, Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.password) {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/login", {
        name: formData.name,
        password: formData.password,
      });
      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1 });
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="login-container">
        <div>
        <Title className="login-title">Log In</Title>
          <Text className="login-text">Welcome back! Enter your details to log in.</Text>
        </div>
        <br></br>
        <Form layout="vertical" onSubmitCapture={handleLogin}>
          <Form.Item name="name" rules={[{ required: true, message: "Please enter your email!" }]}>
            <Input className="login-title"
              prefix={<MailOutlined />}
              placeholder="Email"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
                
            <a className="forgot-password" onClick={() => navigate("/forgotpassword")}>
              Forgot password?
            </a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>
        </Form>
        <Button onClick={()=> navigate("/signup")}>
            Sign Up
        </Button>
      </div>
    </section>
  );
}
