import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";
import api from "./api.js";

function StudentForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const studentData = {
        ...values,
        roleNumber: Number(values.roleNumber),
        class: Number(values.class),
        marks: Number(values.marks),
      };
      const response = await api.post("/student", studentData);
      message.success(response.data.message);
      form.resetFields(); 
      navigate("/home");
    } catch (error) {
      message.error("Error creating student!");
    }
  };

  return (
    <Card title="Create Student" style={{ width:"400px", margin: "50px auto", maxWidth:"400px"}}>
      <Form 
        form={form} 
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item 
          label="Name" 
          name="name" 
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Enter student name" />
        </Form.Item>

        <Form.Item 
          label="Roll Number" 
          name="roleNumber" 
          rules={[{ required: true, message: "Please enter roll number" }]}
        >
          <Input type="number" placeholder="Enter roll number" />
        </Form.Item>

        <Form.Item 
          label="Class" 
          name="class" 
          rules={[{ required: true, message: "Please enter class" }]}
        >
          <Input type="number" placeholder="Enter class" />
        </Form.Item>

        <Form.Item 
          label="Gender" 
          name="gender" 
          rules={[{ required: true, message: "Please enter gender" }]}
        >
          <Input placeholder="Enter gender" />
        </Form.Item>

        <Form.Item 
          label="Marks" 
          name="marks" 
          rules={[{ required: true, message: "Please enter marks" }]}
        >
          <Input type="number" placeholder="Enter marks" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Create Student
        </Button>
      </Form>
    </Card>
  );
}

export default StudentForm;
