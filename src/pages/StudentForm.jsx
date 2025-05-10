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
      message.error("Donot repeat existing credentials");
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
  rules={[
    { required: true, message: "Name is required" },
    {
      validator: (_, value) =>
        value && value.trim()
          ? Promise.resolve()
          : Promise.reject(new Error("Name cannot be empty or spaces only")),
    },
  ]}
>
  <Input />
</Form.Item>

<Form.Item
  label="Roll Number"
  name="roleNumber"
  rules={[
    { required: true, message: "Roll Number is required" },
    {
      validator: (_, value) =>
        value && Number(value) >= 0
          ? Promise.resolve()
          : Promise.reject(new Error("Roll Number must be a non-negative number")),
    },
  ]}
>
  <Input type="number" />
</Form.Item>

<Form.Item
  label="Class"
  name="class"
  rules={[
    { required: true, message: "Class is required" },
    {
      validator: (_, value) =>
        value && Number(value) >= 1 && Number(value) <= 12
          ? Promise.resolve()
          : Promise.reject(new Error("Class must be between 1 and 12")),
    },
  ]}
>
  <Input type="number" />
</Form.Item>

<Form.Item
  label="Gender"
  name="gender"
  rules={[
    { required: true, message: "Gender is required" },
    {
      validator: (_, value) =>
        value && ["male", "female"].includes(value.trim().toLowerCase())
          ? Promise.resolve()
          : Promise.reject(new Error("Gender must be Male or Female")),
    },
  ]}
>
  <Input />
</Form.Item>

<Form.Item
  label="Marks"
  name="marks"
  rules={[
    { required: true, message: "Marks are required" },
    {
      validator: (_, value) =>
        value && Number(value) >= 0 && Number(value) <= 500
          ? Promise.resolve()
          : Promise.reject(new Error("Marks must be between 0 and 500")),
    },
  ]}
>
  <Input type="number" />
</Form.Item>

        <Button type="primary" htmlType="submit" block>
          Create Student
        </Button>
      </Form>
    </Card>
  );
}

export default StudentForm;
