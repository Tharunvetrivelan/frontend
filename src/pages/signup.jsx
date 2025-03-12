import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/signup.css";
import { Button, Form, Input, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import api from "./api";
const { Title, Text } = Typography;

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/signup", {
        name: formData.name,
        password: formData.password,
      });
      if (response) {
        navigate("/");
      }
      setFormData({ name: "", password: "" });
    } catch (error) {
      console.error("Error");
      alert("Failed to connect to the server");
    }
  };

  return (
    <section className="signup-section">
      <div className="signup-container">
        <div className="signup-header">
          <Title className="signup-text">Sign Up</Title>
          <Text className="signup-text">
            Create an account to get started!
          </Text>
        </div>
        <Form layout="vertical" className="" onSubmitCapture={handleSubmit}>
          <Form.Item name="name" rules={[{ required: true, message: "Please enter your email!" }]}>
            <Input
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
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default Signup;
